'use client';

import * as React from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FileImage, Trash2, Plus, Minus, ChevronLeft, ChevronRight, Loader2, MapPin } from 'lucide-react';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

type Props = { phone: string };

type Service = 'matelas' | 'canape' | 'tapis' | 'moquette' | 'autre';

type Item = {
  service: Service;
  dimensions?: string;
  details?: string;
};

type FormValues = {
  items: Item[];
  city: string;
  postalCode: string;
  name: string;
  contact: string; // email OU téléphone
};

const MAX_FILES = 6;
const MAX_BYTES_PER_FILE = 8 * 1024 * 1024; // 8MB/photo
const MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25MB total

function humanFileSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let b = bytes;
  let i = 0;
  while (b >= 1024 && i < units.length - 1) {
    b /= 1024;
    i++;
  }
  return `${b.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function totalSize(list: File[]) {
  return list.reduce((acc, f) => acc + (f?.size ?? 0), 0);
}

function inputBase(hasError?: boolean) {
  return [
    'h-10 rounded-2xl border bg-background px-3 placeholder:text-xs text-base outline-none',
    'focus:ring-2 focus:ring-ring/20',
    hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border',
  ].join(' ');
}

function textareaBase(hasError?: boolean) {
  return [
    'min-h-16 rounded-2xl border placeholder:text-xs bg-background px-3 py-2 text-base outline-none',
    'focus:ring-2 focus:ring-ring/20',
    hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border',
  ].join(' ');
}

function selectBase(hasError?: boolean) {
  return ['h-10 rounded-2xl border bg-background px-3 text-base outline-none', 'focus:ring-2 focus:ring-ring/20', hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border'].join(' ');
}

function normalizePhone(raw: string) {
  let v = raw.replace(/[^\d+]/g, '');
  if (v.startsWith('00')) v = `+${v.slice(2)}`;
  return v;
}

function isLikelyEmail(v: string) {
  return v.includes('@');
}

function validateContact(v: string) {
  const s = (v ?? '').trim();
  if (s.length < 5) return false;
  if (isLikelyEmail(s)) return s.includes('.') && !s.endsWith('.') && !s.startsWith('@');
  const p = normalizePhone(s);
  const digits = p.replace(/[^\d]/g, '');
  return digits.length >= 9;
}

// Compression client SANS dépendance (Canvas).
async function compressImageFile(file: File, maxDim = 1600, quality = 0.78): Promise<File> {
  try {
    if (!file.type.startsWith('image/')) return file;

    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    const scale = Math.min(1, maxDim / Math.max(width, height));
    const targetW = Math.max(1, Math.round(width * scale));
    const targetH = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext('2d');
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, targetW, targetH);

    const blob: Blob | null = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/webp', quality);
    });

    if (!blob) return file;

    const newName = file.name.replace(/\.(png|jpg|jpeg|heic|heif|webp)$/i, '.webp');
    return new File([blob], newName, { type: blob.type || 'image/webp' });
  } catch {
    return file;
  }
}

async function compressFiles(files: File[]) {
  const out: File[] = [];
  for (const f of files) out.push(await compressImageFile(f));
  return out;
}

type Step = 0 | 1 | 2 | 3;

type PlaceSuggestion = {
  place_id: string;
  description: string;
  main_text?: string;
  secondary_text?: string;
};

type PlacesApiResponse = {
  ok: boolean;
  predictions?: PlaceSuggestion[];
  error?: string;
};

type PlaceDetailsResponse = {
  ok: boolean;
  city?: string;
  postalCode?: string;
  error?: string;
};

function useDebouncedValue<T>(value: T, delay = 120) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function DevisForm({ phone }: Props) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting, submitCount },
    reset,
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      items: [{ service: 'canape', dimensions: '', details: '' }],
      city: '',
      postalCode: '',
      name: '',
      contact: phone?.trim() ? phone.trim() : '',
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const wName = useWatch({ control, name: 'name' });
  const wCity = useWatch({ control, name: 'city' });
  const wPostal = useWatch({ control, name: 'postalCode' });
  const wContact = useWatch({ control, name: 'contact' });

  const [step, setStep] = React.useState<Step>(0);

  // Step container for smooth scroll (no page jump)
  const stepRef = React.useRef<HTMLDivElement | null>(null);
  function scrollToStep() {
    const el = stepRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < 140) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // files hors RHF
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [compressing, setCompressing] = React.useState(false);

  React.useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const contactOk = validateContact(wContact ?? '');

  const missingByStep = React.useMemo(() => {
    const m0: string[] = [];
    const m1: string[] = [];
    const m2: string[] = [];
    const m3: string[] = [];

    if ((wCity?.trim()?.length ?? 0) < 2) m1.push('Ville');
    if ((wPostal?.trim()?.length ?? 0) < 4) m1.push('Code postal');

    if ((wName?.trim()?.length ?? 0) < 2) m3.push('Nom');
    if (!contactOk) m3.push('Email ou téléphone');

    return [m0, m1, m2, m3] as const;
  }, [wCity, wPostal, wName, contactOk]);

  const showInlineErrors = submitCount > 0;
  const stepsCount = 4;

  async function goNext() {
    if (step === 0) {
      setStep(1);
      scrollToStep();
      return;
    }
    if (step === 1) {
      const ok = await trigger(['city', 'postalCode']);
      if (!ok) return;
      // close suggestions when leaving step 1
      setOpenSug(false);
      setSuggestions([]);
      setActiveIndex(-1);

      setStep(2);
      scrollToStep();
      return;
    }
    if (step === 2) {
      if (fileError) return;
      setStep(3);
      scrollToStep();
      return;
    }
  }

  function goPrev() {
    setStep((s) => (s > 0 ? ((s - 1) as Step) : s));
    scrollToStep();
  }

  async function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(null);

    const picked = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (picked.length === 0) return;

    const onlyImages = picked.filter((f) => f.type?.startsWith('image/'));
    const rejectedType = picked.length - onlyImages.length;

    const withinSize = onlyImages.filter((f) => f.size <= MAX_BYTES_PER_FILE);
    const rejectedSize = onlyImages.length - withinSize.length;

    let merged = [...files, ...withinSize].slice(0, MAX_FILES);

    while (totalSize(merged) > MAX_TOTAL_BYTES && merged.length > 0) {
      merged = merged.slice(0, -1);
    }

    setCompressing(true);
    const compressed = await compressFiles(merged);
    setCompressing(false);

    setFiles(compressed);

    const msgs: string[] = [];
    if (rejectedType > 0) msgs.push(`${rejectedType} fichier(s) ignoré(s) (format non image).`);
    if (rejectedSize > 0) msgs.push(`${rejectedSize} photo(s) ignorée(s) (max ${humanFileSize(MAX_BYTES_PER_FILE)}).`);
    if ([...files, ...withinSize].length > MAX_FILES) msgs.push(`Max ${MAX_FILES} photos.`);
    if (totalSize(merged) >= MAX_TOTAL_BYTES) msgs.push(`Taille totale max ~${humanFileSize(MAX_TOTAL_BYTES)}.`);

    if (msgs.length) setFileError(msgs.join(' '));
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function parseContact(contact: string) {
    const raw = (contact ?? '').trim();
    if (isLikelyEmail(raw)) return { email: raw, phone: '' };
    return { email: '', phone: normalizePhone(raw) };
  }

  async function onSubmit(values: FormValues) {
    if ((values.name?.trim()?.length ?? 0) < 2) {
      setError('name', { type: 'manual', message: 'Nom requis' });
      setStep(3);
      scrollToStep();
      return;
    }
    if (!validateContact(values.contact)) {
      setError('contact', { type: 'manual', message: 'Renseigne un email ou un téléphone valide.' });
      setStep(3);
      scrollToStep();
      return;
    }

    try {
      const form = new FormData();
      const primary = values.items?.[0] ?? { service: 'autre' as Service };
      const { email, phone: phoneParsed } = parseContact(values.contact);

      form.append('service', primary.service);
      form.append('city', values.city.trim());
      form.append('postalCode', values.postalCode.trim());
      form.append('dimensions', primary.dimensions?.trim() ?? '');
      form.append('details', primary.details?.trim() ?? '');
      form.append('name', values.name.trim());
      form.append('email', email);
      form.append('phone', phoneParsed);

      form.append('items_json', JSON.stringify(values.items));
      files.forEach((f) => form.append('photos', f));

      const res = await fetch('/api/devis', { method: 'POST', body: form });
      const data = (await res.json()) as { ok: boolean; message?: string };

      const ok = res.ok && data.ok;
      toast(ok ? 'Devis envoyé ! Nous vous recontactons rapidement.' : 'Erreur serveur. Réessaie plus tard.');

      if (ok) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'submit_devis',
          service: primary.service,
          city: values.city?.trim(),
          postalCode: values.postalCode?.trim(),
          items_count: values.items?.length ?? 1,
          has_contact: Boolean(values.contact?.trim()),
          photos_count: files.length,
        });

        clearErrors();
        setFileError(null);
        setFiles([]);
        setStep(0);
        setAddressQuery('');
        setSuggestions([]);
        setOpenSug(false);
        reset({
          items: [{ service: 'canape', dimensions: '', details: '' }],
          city: '',
          postalCode: '',
          name: '',
          contact: phone?.trim() ? phone.trim() : '',
        });
      }
    } catch {
      toast('Erreur réseau. Réessaie ou appelle-nous directement.');
    }
  }

  const ctaLabel = React.useMemo(() => {
    if (step === 0) return 'Continuer';
    if (step === 1) return missingByStep[1].length ? `Compléter : ${missingByStep[1][0]}` : 'Continuer';
    if (step === 2) return 'Continuer';
    return isSubmitting ? 'Envoi...' : 'Envoyer ma demande';
  }, [step, missingByStep, isSubmitting]);

  const progressPct = Math.round(((step + 1) / stepsCount) * 100);

  // -----------------------------
  // Autocomplete via API routes (clé Google non publique)
  // -----------------------------
  const [addressQuery, setAddressQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<PlaceSuggestion[]>([]);
  const [openSug, setOpenSug] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [loadingSug, setLoadingSug] = React.useState(false);

  const cacheRef = React.useRef(new Map<string, PlaceSuggestion[]>());
  const reqIdRef = React.useRef(0);

  const debouncedQuery = useDebouncedValue(addressQuery, 120);

  // Fetch predictions (only on step 1)
  React.useEffect(() => {
    if (step !== 1) return;

    const q = debouncedQuery.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setOpenSug(false);
      setActiveIndex(-1);
      setLoadingSug(false);
      return;
    }

    const cached = cacheRef.current.get(q);
    if (cached) {
      setSuggestions(cached);
      setOpenSug(true);
      setLoadingSug(false);
      return;
    }

    setLoadingSug(true);
    const myReqId = ++reqIdRef.current;

    fetch(`/api/places/predict?q=${encodeURIComponent(q)}`, { method: 'GET' })
      .then((r) => r.json() as Promise<PlacesApiResponse>)
      .then((data) => {
        if (myReqId !== reqIdRef.current) return; // ignore stale
        setLoadingSug(false);

        if (!data.ok || !data.predictions?.length) {
          setSuggestions([]);
          setOpenSug(false);
          setActiveIndex(-1);
          return;
        }

        cacheRef.current.set(q, data.predictions);
        setSuggestions(data.predictions);
        setOpenSug(true);
        setActiveIndex(-1);
      })
      .catch(() => {
        if (myReqId !== reqIdRef.current) return;
        setLoadingSug(false);
        setSuggestions([]);
        setOpenSug(false);
        setActiveIndex(-1);
      });
  }, [debouncedQuery, step]);

  async function applyPlace(placeId: string, displayText: string) {
    setOpenSug(false);
    setSuggestions([]);
    setActiveIndex(-1);
    setAddressQuery(displayText);

    try {
      const r = await fetch(`/api/places/details?placeId=${encodeURIComponent(placeId)}`);
      const data = (await r.json()) as PlaceDetailsResponse;

      if (!data.ok) return;

      if (data.city) setValue('city', data.city, { shouldValidate: true, shouldDirty: true });
      if (data.postalCode) setValue('postalCode', data.postalCode, { shouldValidate: true, shouldDirty: true });

      await trigger(['city', 'postalCode']);
    } catch {
      // ignore
    }
  }

  function onAddressKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!openSug || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        const s = suggestions[activeIndex];
        applyPlace(s.place_id, s.description);
      }
    } else if (e.key === 'Escape') {
      setOpenSug(false);
    }
  }

  // Close suggestions on outside click
  const sugWrapRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!sugWrapRef.current) return;
      if (!sugWrapRef.current.contains(e.target as Node)) setOpenSug(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 space-y-4">
      {/* Progress */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Demande de devis</p>
            <p className="text-xs text-muted-foreground">
              Étape {step + 1}/{stepsCount}
            </p>
          </div>
          <div className="text-xs text-muted-foreground tabular-nums">{progressPct}%</div>
        </div>

        <div className="mt-3 h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* STEP CONTENT */}
      <div
        ref={stepRef}
        className="rounded-2xl bg-card p-2 sm:p-5">
        {/* Step 0: Prestations */}
        {step === 0 && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold">Que faut-il nettoyer ?</p>

              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => append({ service: 'canape', dimensions: '', details: '' })}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">Ajoute plusieurs éléments si besoin (ex : canapé + tapis).</p>

            <div className="space-y-4">
              {fields.map((field, idx) => {
                const serviceName = `items.${idx}.service` as const;
                const dimName = `items.${idx}.dimensions` as const;
                const detName = `items.${idx}.details` as const;

                return (
                  <div
                    key={field.id}
                    className="rounded-2xl bg-muted/50 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid gap-2 w-full">
                        <p className="font-semibold text-sm">Article {idx + 1}</p>

                        <label className="text-sm font-medium">Type</label>
                        <select
                          {...register(serviceName, { required: true })}
                          className={selectBase(false)}>
                          <option value="canape">Nettoyage canapé en tissu</option>
                          <option value="matelas">Nettoyage matelas</option>
                          <option value="tapis">Nettoyage tapis</option>
                          <option value="moquette">Nettoyage moquette</option>
                          <option value="autre">Autre / je ne sais pas</option>
                        </select>
                      </div>

                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full mt-6"
                          onClick={() => remove(idx)}
                          aria-label="Supprimer">
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="mt-4 grid lg:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Dimensions / surface <span className="text-muted-foreground">(optionnel)</span>
                        </label>
                        <input
                          {...register(dimName)}
                          placeholder="Ex : canapé 3 places / tapis 2m x 3m / moquette 18 m²"
                          className={inputBase(false)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Détails <span className="text-muted-foreground">(optionnel)</span>
                        </label>
                        <textarea
                          {...register(detName)}
                          placeholder="Ex : tache, odeur, auréole, textile fragile…"
                          className={textareaBase(false)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />
          </div>
        )}

        {/* Step 1: Zone (Autocomplete via API route) */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Où intervient-on ?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Tape une adresse : on remplit automatiquement <strong>Ville</strong> + <strong>Code postal</strong>.
              </p>
            </div>

            <div
              ref={sugWrapRef}
              className="relative">
              <label className="text-sm font-medium">Adresse (recommandé)</label>
              <div className="mt-2 flex items-center gap-2">
                <div className="relative w-full">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={addressQuery}
                    onChange={(e) => {
                      setAddressQuery(e.target.value);
                      setOpenSug(true);
                    }}
                    onFocus={() => {
                      if (suggestions.length > 0) setOpenSug(true);
                    }}
                    onKeyDown={onAddressKeyDown}
                    placeholder="Ex : 12 rue Charles Baudelaire, 75012 Paris"
                    className={[inputBase(false), 'w-full pl-10'].join(' ')}
                  />
                  {loadingSug && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
                </div>
              </div>

              {openSug && suggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
                  {suggestions.map((s, i) => (
                    <button
                      key={s.place_id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => applyPlace(s.place_id, s.description)}
                      className={['w-full text-left px-2 py-2 text-sm transition', i === activeIndex ? 'bg-muted' : 'bg-background hover:bg-muted/60'].join(' ')}>
                      <div className="font-medium">{s.main_text ?? s.description}</div>
                      {s.secondary_text && <div className="text-xs text-muted-foreground">{s.secondary_text}</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Ville <span className="text-rose-500">*</span>
                </label>
                <input
                  {...register('city', { required: 'Ville requise', minLength: 2 })}
                  placeholder="Ex : Paris"
                  className={inputBase(Boolean(errors.city && showInlineErrors))}
                />
                {errors.city && showInlineErrors && <p className="text-xs text-rose-600">{errors.city.message as string}</p>}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Code postal <span className="text-rose-500">*</span>
                </label>
                <input
                  {...register('postalCode', {
                    required: 'Code postal requis',
                    minLength: { value: 4, message: 'Code postal invalide' },
                  })}
                  placeholder="Ex : 75012"
                  inputMode="numeric"
                  className={inputBase(Boolean(errors.postalCode && showInlineErrors))}
                />
                {errors.postalCode && showInlineErrors && <p className="text-xs text-rose-600">{errors.postalCode.message as string}</p>}
              </div>
            </div>

            {showInlineErrors && missingByStep[1].length > 0 && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                <p className="font-semibold">À compléter</p>
                <p className="mt-1">Il manque : {missingByStep[1].join(', ')}.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <FileImage className="h-4 w-4 text-primary" />
                  Photos <span className="text-muted-foreground">(recommandé)</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Idéal 2–3 • Max {MAX_FILES}</p>
              </div>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onPickFiles}
                  className="hidden"
                />
                <span className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 h-10 text-sm hover:bg-muted transition">Ajouter</span>
              </label>
            </div>

            {compressing && (
              <div className="rounded-2xl border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Optimisation des photos…
              </div>
            )}

            {fileError && <p className="text-xs rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 px-3 py-2">{fileError}</p>}

            {files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {files.map((f, idx) => (
                  <div
                    key={`${f.name}-${idx}`}
                    className="rounded-2xl border border-border bg-background p-2">
                    <div className="aspect-square overflow-hidden rounded-xl border border-border/60">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previews[idx]}
                        alt={`Photo ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="mt-2 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{f.name}</p>
                        <p className="text-[11px] text-muted-foreground">{humanFileSize(f.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition"
                        aria-label="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {files.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">Ajoute 1–2 photos (vue d’ensemble + zone) pour un devis plus précis.</div>
            )}
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">On te recontacte où ?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Un seul champ : email <strong>ou</strong> téléphone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Nom <span className="text-rose-500">*</span>
                </label>
                <input
                  {...register('name', {
                    required: 'Nom requis',
                    minLength: { value: 2, message: 'Nom trop court' },
                  })}
                  placeholder="Ex : Pierre"
                  className={inputBase(Boolean(errors.name && showInlineErrors))}
                />
                {errors.name && showInlineErrors && <p className="text-xs text-rose-600">{errors.name.message as string}</p>}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Email ou téléphone <span className="text-rose-500">*</span>
                </label>
                <input
                  {...register('contact', {
                    validate: (v) => validateContact(v) || 'Renseigne un email ou un téléphone valide.',
                  })}
                  placeholder="Ex : vous@domaine.fr ou 06…"
                  inputMode="email"
                  className={inputBase(Boolean((!contactOk && showInlineErrors) || errors.contact))}
                  onBlur={(e) => {
                    const v = e.target.value ?? '';
                    if (!isLikelyEmail(v)) setValue('contact', normalizePhone(v), { shouldValidate: true });
                  }}
                />
                {errors.contact && showInlineErrors && <p className="text-xs text-rose-600">{errors.contact.message as string}</p>}
                {!errors.contact && (wContact?.trim()?.length ?? 0) > 0 && <p className="text-xs text-muted-foreground">Détecté : {isLikelyEmail((wContact ?? '').trim()) ? 'email' : 'téléphone'}</p>}
              </div>
            </div>

            <div className="rounded-2xl bg-muted/30 p-3 text-xs text-muted-foreground">En envoyant, tu acceptes d’être recontacté pour établir le devis et planifier l’intervention.</div>
          </div>
        )}
      </div>

      {/* Sticky footer */}
      <div className="z-50">
        <div className="rounded-2xl border border-border bg-background/95 backdrop-blur px-3 py-3 sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={goPrev}
              disabled={step === 0 || isSubmitting}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>

            <div className="flex-1" />

            {step < 3 ? (
              <Button
                type="button"
                variant="accent"
                className="rounded-full"
                onClick={goNext}
                disabled={isSubmitting}>
                {ctaLabel}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="accent"
                className="rounded-full"
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Envoi…
                  </>
                ) : (
                  ctaLabel
                )}
              </Button>
            )}
          </div>

          <div className="mt-1 text-[11px] text-center text-muted-foreground">
            {step === 0 && 'Tu peux passer vite : les détails sont optionnels.'}
            {step === 1 && (missingByStep[1].length ? `À compléter : ${missingByStep[1].join(', ')}` : 'Parfait.')}
            {step === 2 && 'Les photos augmentent la précision du devis (mais restent optionnelles).'}
            {step === 3 && 'Dernière étape : nom + email ou téléphone.'}
          </div>
        </div>
      </div>
    </form>
  );
}
