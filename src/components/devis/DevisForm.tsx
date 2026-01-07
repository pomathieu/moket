'use client';

import * as React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Check, FileImage, Sparkles, Trash2, Plus, Minus } from 'lucide-react';

type Props = { phone: string };

type Service = 'matelas' | 'canape' | 'tapis' | 'moquette' | 'autre';

type Item = {
  service: Service;
  dimensions?: string;
  details?: string;
};

type FormValues = {
  name: string;
  city: string;
  postalCode: string;
  email?: string;
  phone?: string;
  items: Item[];
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
  return ['h-11 rounded-xl border bg-background px-3 text-sm outline-none', 'focus:ring-2 focus:ring-ring/20', hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border'].join(' ');
}

function textareaBase(hasError?: boolean) {
  return ['min-h-28 rounded-xl border bg-background px-3 py-2 text-sm outline-none', 'focus:ring-2 focus:ring-ring/20', hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border'].join(' ');
}

function selectBase(hasError?: boolean) {
  return ['h-11 rounded-xl border bg-background px-3 text-sm outline-none', 'focus:ring-2 focus:ring-ring/20', hasError ? 'border-rose-400 focus:ring-rose-200' : 'border-border'].join(' ');
}

export function DevisForm({ phone }: Props) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting, isValid, submitCount },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      items: [{ service: 'canape', dimensions: '', details: '' }],
      name: '',
      city: '',
      postalCode: '',
      email: '',
      phone: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // files (hors RHF : plus simple + meilleur contrôle)
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [fileError, setFileError] = React.useState<string | null>(null);

  const [sent, setSent] = React.useState<null | { ok: boolean; message: string }>(null);

  // watch contact for custom validation (email OR phone)
  const wEmail = watch('email');
  const wPhone = watch('phone');

  React.useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  // custom rule: require email or phone
  const contactOk = (wEmail?.trim()?.length ?? 0) >= 5 || (wPhone?.trim()?.length ?? 0) >= 8;

  React.useEffect(() => {
    if (contactOk) {
      clearErrors('email');
      clearErrors('phone');
    }
  }, [contactOk, clearErrors]);

  // missing list (UX: checklist)
  const missing = React.useMemo(() => {
    const m: string[] = [];
    if ((watch('name')?.trim()?.length ?? 0) < 2) m.push('Nom');
    if ((watch('city')?.trim()?.length ?? 0) < 2) m.push('Ville');
    if ((watch('postalCode')?.trim()?.length ?? 0) < 4) m.push('Code postal');
    if (!contactOk) m.push('Email ou téléphone');
    if (files.length < 1) m.push('Au moins 1 photo');
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('name'), watch('city'), watch('postalCode'), contactOk, files.length]);

  const canSubmit = missing.length === 0 && isValid && files.length >= 1 && !isSubmitting;

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(null);

    const picked = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (picked.length === 0) return;

    // 1) images only
    const onlyImages = picked.filter((f) => f.type?.startsWith('image/'));
    const rejectedType = picked.length - onlyImages.length;

    // 2) max per file
    const withinSize = onlyImages.filter((f) => f.size <= MAX_BYTES_PER_FILE);
    const rejectedSize = onlyImages.length - withinSize.length;

    // 3) merge + max files
    let merged = [...files, ...withinSize].slice(0, MAX_FILES);

    // 4) max total bytes
    while (totalSize(merged) > MAX_TOTAL_BYTES && merged.length > 0) {
      merged = merged.slice(0, -1);
    }

    setFiles(merged);

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

  async function onSubmit(values: FormValues) {
    setSent(null);

    // contact rule
    if (!contactOk) {
      setError('email', { type: 'manual', message: 'Email ou téléphone requis.' });
      setError('phone', { type: 'manual', message: 'Email ou téléphone requis.' });
      setSent({
        ok: false,
        message: 'Ajoute un email ou un téléphone pour être recontacté.',
      });
      return;
    }

    // photo rule
    if (files.length < 1) {
      setSent({
        ok: false,
        message: 'Ajoute au moins 1 photo (idéalement 2–3).',
      });
      return;
    }

    // UX: si submit alors qu'il manque des champs => message clair
    if (missing.length > 0) {
      setSent({
        ok: false,
        message: `Il manque : ${missing.join(', ')}.`,
      });
      return;
    }

    try {
      const form = new FormData();

      // backend actuel attend des champs plats service/city/etc.
      // => On envoie le 1er item dans "service", et on envoie tous les items en JSON (optionnel)
      const primary = values.items?.[0] ?? { service: 'autre' as Service };

      form.append('service', primary.service);
      form.append('city', values.city.trim());
      form.append('postalCode', values.postalCode.trim());
      form.append('dimensions', primary.dimensions?.trim() ?? '');
      form.append('details', primary.details?.trim() ?? '');
      form.append('name', values.name.trim());
      form.append('email', values.email?.trim() ?? '');
      form.append('phone', values.phone?.trim() ?? '');

      // bonus: envoyer le détail multiprestations au serveur (pour email owner)
      form.append('items_json', JSON.stringify(values.items));

      files.forEach((f) => form.append('photos', f));

      const res = await fetch('/api/devis', { method: 'POST', body: form });
      const data = (await res.json()) as { ok: boolean; message?: string };

      setSent({
        ok: res.ok && data.ok,
        message: data.message ?? (res.ok ? 'Demande envoyée. On revient vers toi rapidement avec un devis clair.' : 'Impossible d’envoyer pour le moment. Réessaie ou appelle-nous.'),
      });

      if (res.ok) {
        clearErrors();
        setFileError(null);
        setFiles([]);
        reset({
          items: [{ service: 'canape', dimensions: '', details: '' }],
          name: values.name,
          city: values.city,
          postalCode: values.postalCode,
          email: values.email ?? '',
          phone: values.phone ?? '',
        });
      }
    } catch {
      setSent({
        ok: false,
        message: 'Erreur réseau. Réessaie ou appelle-nous directement.',
      });
    }
  }

  const showInlineErrors = submitCount > 0 && !sent?.ok;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-6">
      {/* GLOBAL CHECKLIST */}
      {missing.length > 0 && showInlineErrors && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          <p className="font-semibold">À compléter</p>
          <p className="mt-1">Il manque : {missing.join(', ')}.</p>
        </div>
      )}

      {/* PRESTATIONS (multiproduits) */}
      <div className="rounded-2xl border border-border bg-card p-2 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">Prestations</p>
            <p className="mt-1 text-xs text-muted-foreground">Ajoute plusieurs éléments si besoin (ex : canapé + tapis + matelas).</p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => append({ service: 'canape', dimensions: '', details: '' })}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          {fields.map((field, idx) => {
            const serviceName = `items.${idx}.service` as const;
            const dimName = `items.${idx}.dimensions` as const;
            const detName = `items.${idx}.details` as const;

            return (
              <div
                key={field.id}
                className="rounded-2xl border border-border bg-background p-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid gap-2 w-full">
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

                <div className="mt-4 grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-base font-medium">
                      Dimensions / surface <span className="text-muted-foreground">(optionnel)</span>
                    </label>
                    <input
                      {...register(dimName)}
                      placeholder="Ex : canapé 3 places / tapis 2m x 3m / moquette 18 m²"
                      className={inputBase(false)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-base font-medium">Détails</label>
                    <textarea
                      {...register(detName)}
                      placeholder="Ex : tache de café, odeur animal, auréole ancienne, textile fragile…"
                      className={textareaBase(false)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ZONE */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <p className="font-semibold">Zone d’intervention</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>

      {/* CONTACT */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <p className="font-semibold">Contact</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Email <strong>ou</strong> téléphone (au choix).
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="grid gap-2 sm:col-span-1">
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

          <div className="grid gap-2 sm:col-span-1">
            <label className="text-sm font-medium">Email</label>
            <input
              {...register('email', {
                validate: (v) => {
                  const email = (v ?? '').trim();
                  const phone = (watch('phone') ?? '').trim();
                  const ok = email.length >= 5 || phone.length >= 8;
                  return ok || 'Renseigne un email ou un téléphone.';
                },
              })}
              placeholder="Ex : vous@domaine.fr"
              type="email"
              className={inputBase(Boolean((!contactOk && showInlineErrors) || errors.email))}
            />
          </div>

          <div className="grid gap-2 sm:col-span-1">
            <label className="text-sm font-medium">Téléphone</label>
            <input
              {...register('phone', {
                validate: (v) => {
                  const phone = (v ?? '').trim();
                  const email = (watch('email') ?? '').trim();
                  const ok = phone.length >= 8 || email.length >= 5;
                  return ok || 'Renseigne un email ou un téléphone.';
                },
              })}
              placeholder="Ex : 06..."
              inputMode="tel"
              className={inputBase(Boolean((!contactOk && showInlineErrors) || errors.phone))}
            />
          </div>
        </div>
        {!contactOk && showInlineErrors && <p className="mt-2 text-xs text-rose-600">Renseigne un email ou un téléphone.</p>}{' '}
      </div>

      {/* PHOTOS */}
      <div className="rounded-2xl border border-border bg-muted/40 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold flex items-center gap-2">
              <FileImage className="h-4 w-4 text-primary" />
              Photos <span className="text-rose-500">*</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Min 1 • Idéal 2–3 • Max {MAX_FILES} • {humanFileSize(MAX_BYTES_PER_FILE)} / photo • ~{humanFileSize(MAX_TOTAL_BYTES)} au total
            </p>
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

        {fileError && <p className="mt-3 text-xs rounded-xl border border-amber-200 bg-amber-50 text-amber-900 px-3 py-2">{fileError}</p>}

        {files.length < 1 && showInlineErrors && <p className="mt-3 text-xs rounded-xl border border-rose-200 bg-rose-50 text-rose-900 px-3 py-2">Ajoute au moins 1 photo (vue d’ensemble + zone).</p>}

        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {files.map((f, idx) => (
              <div
                key={`${f.name}-${idx}`}
                className="rounded-xl border border-border bg-background p-2">
                <div className="aspect-square overflow-hidden rounded-lg border border-border/60">
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
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted transition"
                    aria-label="Supprimer">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SUBMIT */}
      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          variant="accent"
          className="rounded-full w-full sm:w-fit"
          disabled={!canSubmit}>
          {isSubmitting ? 'Envoi...' : 'Envoyer ma demande de devis'}
        </Button>
      </div>

      {/* STATUS */}
      {sent && (
        <div className={['rounded-2xl border p-4 text-sm', sent.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'].join(' ')}>
          <p className="font-semibold flex items-center gap-2">
            {sent.ok ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {sent.ok ? 'Demande envoyée' : 'À compléter'}
          </p>
          <p className="mt-1">{sent.message}</p>
        </div>
      )}

      <p className="text-xs text-muted-foreground">En envoyant ce formulaire, tu acceptes d’être recontacté pour établir le devis et planifier l’intervention.</p>
    </form>
  );
}
