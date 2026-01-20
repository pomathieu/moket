'use client';

import * as React from 'react';
import Link from 'next/link';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, PhoneCall, FileText, Plus, Clock, Trash2 } from 'lucide-react';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

type Service = 'canape' | 'matelas' | 'tapis' | 'moquette';

type Item = {
  service: Service;
  // canapé/matelas
  sizePreset?: 'small' | 'large';
  // tapis/moquette
  areaM2?: string;
};

type FormValues = {
  items: Item[];
  urgency: 'normal' | 'weekend';
  notes: string;
};

type Step = 0 | 1 | 2;

/**
 * Tarifs
 * - Matelas : 90€ (1 place) / 120€ (2 places)
 * - Canapé tissu : 140€ (2–3 places) / 190€ (4–5 places)
 * - Tapis : 30€/m² (minimum 120€ Normandie / 150€ IDF)
 * - Moquette : 12€/m² (minimum 150€)
 */
const PRICES = {
  matelas: { small: 90, large: 120 },
  canape: { small: 140, large: 190 },
  tapis: { perM2: 30 },
  moquette: { perM2: 12 },
} as const;

// Minimums d’intervention (tapis/moquette)
const MINIMUMS_EUR = {
  tapis: { idf: 150, normandie: 120 },
  moquette: { idf: 150, normandie: 150 },
} as const;

// Si tu n'as pas la zone ici, on applique un minimum "safe" (IDF).
const DEFAULT_ZONE: 'idf' | 'normandie' = 'idf';

const WEEKEND_SURCHARGE_EUR = 20;

function inputBase(hasError?: boolean) {
  return [
    'h-10 rounded-2xl border bg-background px-3 placeholder:text-xs text-base outline-none',
    'focus:ring-2 focus:ring-ring/20',
    hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border',
  ].join(' ');
}

function textareaBase(hasError?: boolean) {
  return [
    'min-h-24 rounded-2xl border placeholder:text-xs bg-background px-3 py-2 text-base outline-none',
    'focus:ring-2 focus:ring-ring/20',
    hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border',
  ].join(' ');
}

function selectBase(hasError?: boolean) {
  return ['h-10 rounded-2xl border bg-background px-3 text-base outline-none', 'focus:ring-2 focus:ring-ring/20', hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border'].join(' ');
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function parseM2(raw?: string) {
  const s = (raw ?? '').trim().replace(',', '.');
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return n;
}

function formatEUR(n: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

function serviceLabel(s: Service) {
  if (s === 'canape') return 'Canapé en tissu';
  if (s === 'matelas') return 'Matelas';
  if (s === 'tapis') return 'Tapis';
  return 'Moquette';
}

function sizeLabel(service: Service, p: 'small' | 'large') {
  if (service === 'matelas') return p === 'small' ? '1 place' : '2 places';
  if (service === 'canape') return p === 'small' ? '2–3 places' : '4–5 places';
  return p === 'small' ? 'Petit' : 'Grand';
}

function itemNeedsArea(service: Service) {
  return service === 'tapis' || service === 'moquette';
}
function itemNeedsSize(service: Service) {
  return service === 'canape' || service === 'matelas';
}

function buildItemPrice(item: Item) {
  const service = item.service;

  if (itemNeedsSize(service)) {
    const sizePreset = (item.sizePreset ?? 'small') as 'small' | 'large';
    const base = PRICES[service][sizePreset];
    return {
      ok: true,
      base,
      details: `${serviceLabel(service)} • ${sizeLabel(service, sizePreset)}`,
    };
  }

  const m2 = parseM2(item.areaM2);
  const safeM2 = m2 === null ? 0 : clamp(m2, 0, 999);
  const computed = Math.round(safeM2 * PRICES[service].perM2);

  const min = service === 'tapis' ? MINIMUMS_EUR.tapis[DEFAULT_ZONE] : service === 'moquette' ? MINIMUMS_EUR.moquette[DEFAULT_ZONE] : 0;

  const ok = safeM2 > 0;
  const base = ok ? Math.max(computed, min) : 0;

  return {
    ok,
    base,
    details: `${serviceLabel(service)} • ${ok ? `${safeM2} m²` : 'surface à préciser'} • ${PRICES[service].perM2}€/m²${min ? ` (min. ${min}€)` : ''}`,
  };
}

function pushAnalytics(evt: string, payload: Record<string, any> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: evt, ...payload });
}

export function PriceCalculator({ phone = '+33635090095', className = '', onCTAClick }: { phone?: string; className?: string; onCTAClick?: () => void }) {
  const {
    register,
    control,
    setValue,
    trigger,
    formState: { errors, submitCount },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      items: [{ service: 'canape', sizePreset: 'small', areaM2: '' }],
      urgency: 'normal',
      notes: '',
    },
  });

  const { fields, append, remove, update } = useFieldArray({ control, name: 'items' });
  const values = useWatch({ control });

  const [step, setStep] = React.useState<Step>(0);
  const showInlineErrors = submitCount > 0;

  const computed = React.useMemo(() => {
    const items = (values.items ?? []).filter((it): it is Item => typeof it.service === 'string').map((it) => buildItemPrice(it));

    const base = items.reduce((acc, x) => acc + x.base, 0);
    const weekend = values.urgency === 'weekend' ? WEEKEND_SURCHARGE_EUR : 0;
    const total = base + weekend;
    const allOk = items.every((x) => x.ok);

    return { items, base, weekend, total, allOk };
  }, [values.items, values.urgency]);

  async function goNext() {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1) {
      const ok = await trigger((values.items ?? []).flatMap((it, idx) => (typeof it.service === 'string' && itemNeedsArea(it.service as Service) ? ([`items.${idx}.areaM2`] as const) : [])));
      if (!ok) return;

      setStep(2);
      pushAnalytics('calc_view_result', { items_count: values.items?.length ?? 1 });
    }
  }

  function goPrev() {
    setStep((s) => (s > 0 ? ((s - 1) as Step) : s));
  }

  function addItem() {
    append({ service: 'canape', sizePreset: 'small', areaM2: '' });
    pushAnalytics('calc_add_item', { items_count: (values.items?.length ?? 1) + 1 });
  }

  function normalizeItemOnServiceChange(idx: number, service: Service) {
    const curr = values.items?.[idx] ?? { service: 'canape' as Service };

    if (itemNeedsSize(service)) {
      update(idx, { service, sizePreset: curr.sizePreset ?? 'small', areaM2: '' });
    } else {
      update(idx, { service, sizePreset: 'small', areaM2: curr.areaM2 ?? '' });
    }
  }

  const primaryCTA = computed.allOk ? 'Recevoir un devis précis (photos)' : 'Compléter les surfaces';

  return (
    <section className={['rounded-2xl bg-card/50 ', className].join(' ')}>
      <div className="mt-4 rounded-2xl p-3 sm:p-5">
        {/* STEP 0: Items */}
        {step === 0 && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">Quels éléments nettoyer ?</p>
                <p className="mt-1 text-xs text-muted-foreground">Tu peux en ajouter plusieurs.</p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((f, idx) => {
                const serviceName = `items.${idx}.service` as const;
                const sizeName = `items.${idx}.sizePreset` as const;
                const areaName = `items.${idx}.areaM2` as const;

                const service = (values.items?.[idx]?.service ?? f.service) as Service;
                const currentItem = (values.items?.[idx] ?? { service: 'canape', sizePreset: 'small', areaM2: '' }) as Item;
                const preview = buildItemPrice(currentItem);

                return (
                  <div
                    key={f.id}
                    className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-sm">Article {idx + 1}</p>

                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => {
                            remove(idx);
                            pushAnalytics('calc_remove_item', { items_count: (values.items?.length ?? 1) - 1 });
                          }}
                          aria-label="Supprimer">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="mt-3 grid gap-3 ">
                      {/* Service */}
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Type</label>
                        <select
                          {...register(serviceName, { required: true })}
                          className={selectBase(false)}
                          onChange={(e) => {
                            const v = e.target.value as Service;
                            setValue(serviceName, v, { shouldDirty: true, shouldValidate: true });
                            normalizeItemOnServiceChange(idx, v);
                            pushAnalytics('calc_select_service', { idx, service: v });
                          }}>
                          <option value="canape">Nettoyage canapé en tissu</option>
                          <option value="matelas">Nettoyage matelas</option>
                          <option value="tapis">Nettoyage tapis</option>
                          <option value="moquette">Nettoyage moquette</option>
                        </select>
                      </div>

                      {/* Size or Area */}
                      {itemNeedsSize(service) ? (
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Taille</label>
                          <select
                            {...register(sizeName, { required: true })}
                            className={selectBase(false)}
                            onChange={(e) => {
                              const v = e.target.value as 'small' | 'large';
                              setValue(sizeName, v, { shouldDirty: true, shouldValidate: true });
                              pushAnalytics('calc_select_size', { idx, service, sizePreset: v });
                            }}>
                            <option value="small">{sizeLabel(service, 'small')}</option>
                            <option value="large">{sizeLabel(service, 'large')}</option>
                          </select>
                        </div>
                      ) : (
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">
                            Surface (m²) <span className="text-rose-500">*</span>
                          </label>
                          <input
                            {...register(areaName, {
                              required: 'Surface requise',
                              validate: (v) => {
                                const n = parseM2(v);
                                if (n === null) return 'Surface invalide';
                                if (n <= 0) return 'Surface > 0';
                                if (n > 999) return 'Surface trop grande';
                                return true;
                              },
                            })}
                            placeholder="Ex : 12"
                            inputMode="decimal"
                            className={inputBase(Boolean((errors.items?.[idx] as any)?.areaM2 && showInlineErrors))}
                            onBlur={(e) => {
                              const n = parseM2(e.target.value);
                              if (n !== null) {
                                setValue(areaName, String(n).replace('.', ','), { shouldValidate: true, shouldDirty: true });
                                pushAnalytics('calc_enter_area', { idx, service, area: n });
                              }
                            }}
                          />
                          {(errors.items?.[idx] as any)?.areaM2 && showInlineErrors && <p className="text-xs text-rose-600">{(errors.items?.[idx] as any)?.areaM2?.message as string}</p>}
                          <p className="text-xs text-muted-foreground">Astuce : longueur × largeur.</p>
                        </div>
                      )}
                    </div>

                    {/* mini estim item */}
                    <div className="mt-3 rounded-2xl border border-border bg-muted/20 p-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Estimation article :</span> {formatEUR(preview.base)}
                      <span className="ml-2">•</span> {preview.details}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 1: Options */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Options (facultatif)</p>
              <p className="mt-1 text-xs text-muted-foreground">Le week-end ajoute un forfait si sélectionné.</p>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Créneau souhaité</label>
              <select
                {...register('urgency')}
                className={selectBase(false)}
                onChange={(e) => {
                  const v = e.target.value as FormValues['urgency'];
                  setValue('urgency', v, { shouldDirty: true });
                  pushAnalytics('calc_select_urgency', { urgency: v, items_count: values.items?.length ?? 1 });
                }}>
                <option value="normal">En semaine / peu importe</option>
                <option value="weekend">Week-end (selon dispo)</option>
              </select>

              <p className="text-xs text-muted-foreground inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Séchage souvent en quelques heures (selon matière + aération).
              </p>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Détails (optionnel)</label>
              <textarea
                {...register('notes')}
                placeholder="Ex : tache, odeur, auréole, poils d’animaux…"
                className={textareaBase(false)}
                onBlur={(e) => {
                  if ((e.target.value ?? '').trim().length > 0) {
                    pushAnalytics('calc_add_notes', { items_count: values.items?.length ?? 1 });
                  }
                }}
              />
            </div>

            {!computed.allOk && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                <p className="font-semibold">Il manque des surfaces</p>
                <p className="mt-1 text-xs">Pour tapis/moquette, renseigne une surface en m² sur chaque article.</p>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Result */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Estimation totale</p>
              <p className="mt-1 text-xs text-muted-foreground">Estimation basée sur tes infos. Pour un prix exact : 2–3 photos sur la page Devis.</p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/20 p-4">
              <p className="text-sm font-semibold">Détail</p>

              <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                {computed.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-3">
                    <span>• {it.details}</span>
                    <span className="tabular-nums text-foreground">{formatEUR(it.base)}</span>
                  </li>
                ))}

                {values.urgency === 'weekend' && WEEKEND_SURCHARGE_EUR > 0 && (
                  <li className="flex items-start justify-between gap-3">
                    <span>• Option week-end</span>
                    <span className="tabular-nums text-foreground">+{formatEUR(WEEKEND_SURCHARGE_EUR)}</span>
                  </li>
                )}
              </ul>

              <Separator className="my-3" />

              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total estimé</p>
                  <p className="text-2xl font-extrabold">{formatEUR(computed.total)}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Hors brûlures/décolorations. Les taches anciennes peuvent être limitées. Tapis/moquette : minimum d’intervention appliqué.</p>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-2">
                  <Button
                    asChild
                    variant="accent"
                    className="rounded-full"
                    onClick={() => {
                      pushAnalytics('calc_click_devis', { items_count: values.items?.length ?? 1, total: computed.total });
                      onCTAClick?.();
                    }}>
                    <Link href="/devis">
                      <span className="inline-flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Demander un devis
                      </span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full">
                    <a
                      href={`tel:${phone}`}
                      onClick={() => pushAnalytics('calc_click_call', { items_count: values.items?.length ?? 1 })}>
                      <span className="inline-flex items-center gap-2">
                        <PhoneCall className="h-4 w-4" />
                        Appeler
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="sm:hidden grid grid-cols-2 gap-3">
              <Button
                asChild
                variant="accent"
                className="rounded-full w-full"
                onClick={() => {
                  pushAnalytics('calc_click_devis', { items_count: values.items?.length ?? 1, total: computed.total });
                  onCTAClick?.();
                }}>
                <Link href="/devis">
                  <span className="inline-flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Devis
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full w-full">
                <a
                  href={`tel:${phone}`}
                  onClick={() => pushAnalytics('calc_click_call', { items_count: values.items?.length ?? 1 })}>
                  <span className="inline-flex items-center justify-center gap-2">
                    <PhoneCall className="h-4 w-4" />
                    Appeler
                  </span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer controls */}
      <div className="mt-4 rounded-2xl px-3 py-3 sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={goPrev}
            disabled={step === 0}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>

          <div className="flex-1" />

          {step < 2 ? (
            <Button
              type="button"
              variant="accent"
              className="rounded-full"
              onClick={goNext}>
              Continuer
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="accent"
              className="rounded-full"
              asChild
              onClick={() => {
                pushAnalytics('calc_click_devis', { items_count: values.items?.length ?? 1, total: computed.total });
                onCTAClick?.();
              }}>
              <Link href="/devis">{primaryCTA}</Link>
            </Button>
          )}
        </div>

        <div className="mt-1 text-[11px] text-center text-muted-foreground">
          {step === 0 && 'Ajoute 1 ou plusieurs articles (canapé, matelas, tapis, moquette).'}
          {step === 1 && 'Option week-end + détails si besoin.'}
          {step === 2 && 'Pour un prix exact : envoie 2–3 photos sur la page Devis.'}
        </div>
      </div>
    </section>
  );
}
