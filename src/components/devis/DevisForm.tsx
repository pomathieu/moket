'use client';

import * as React from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FileImage, Trash2, Plus, Loader2, MapPin, User, Mail, Phone, Sofa, BedDouble, RectangleHorizontal, Grid3X3, HelpCircle, Check, Camera, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

type Service = 'matelas' | 'canape' | 'tapis' | 'moquette' | 'autre';

type Item = {
  service: Service;
  size?: string; // For matelas/canape: specific size option
  surface?: string; // For tapis/moquette: m² value
  details?: string;
};

type FormValues = {
  items: Item[];
  city: string;
  postalCode: string;
  name: string;
  contact: string;
  address?: string;
};

const MAX_FILES = 6;
const MAX_BYTES_PER_FILE = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 25 * 1024 * 1024;

const SERVICE_OPTIONS = [
  { value: 'canape', label: 'Canapé', icon: Sofa, color: 'emerald' },
  { value: 'matelas', label: 'Matelas', icon: BedDouble, color: 'teal' },
  { value: 'tapis', label: 'Tapis', icon: RectangleHorizontal, color: 'cyan' },
  { value: 'moquette', label: 'Moquette', icon: Grid3X3, color: 'sky' },
  { value: 'autre', label: 'Autre', icon: HelpCircle, color: 'slate' },
] as const;

// Size options aligned with pricing
const SIZE_OPTIONS = {
  matelas: [
    { value: '1-place', label: '1 place', price: '90 €' },
    { value: '2-places', label: '2 places', price: '120 €' },
  ],
  canape: [
    { value: '2-3-places', label: '2–3 places', price: '140 €' },
    { value: '4-5-places', label: '4–5 places', price: '190 €' },
  ],
  tapis: [{ value: 'per-sqm', label: 'Prix au m²', price: '30 €/m²', note: 'Minimum 150€ (IDF) / 120€ (Normandie)' }],
  moquette: [{ value: 'per-sqm', label: 'Prix au m²', price: '12 €/m²', note: 'Minimum 150€' }],
} as const;

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

// Step indicator component
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const steps = ['Service', 'Localisation', 'Photos', 'Contact'];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                  isActive && 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-110',
                  isCompleted && 'bg-emerald-100 text-emerald-700',
                  !isActive && !isCompleted && 'bg-slate-100 text-slate-400',
                )}>
                {isCompleted ? <Check className="h-5 w-5" /> : idx + 1}
              </div>
              <span className={cn('mt-2 text-xs font-medium hidden sm:block', isActive && 'text-emerald-700', isCompleted && 'text-emerald-600', !isActive && !isCompleted && 'text-slate-400')}>
                {label}
              </span>
            </div>
            {idx < steps.length - 1 && <div className={cn('flex-1 h-1 mx-2 rounded-full transition-all duration-300', idx < currentStep ? 'bg-emerald-400' : 'bg-slate-200')} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Service card component
function ServiceCard({ service, isSelected, onClick }: { service: (typeof SERVICE_OPTIONS)[number]; isSelected: boolean; onClick: () => void }) {
  const Icon = service.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative p-4 rounded-2xl border-2 transition-all duration-200 text-left w-full',
        'hover:shadow-lg hover:-translate-y-0.5',
        isSelected ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/20' : 'border-slate-200 bg-white hover:border-slate-300',
      )}>
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors', isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600')}>
        <Icon className="h-6 w-6" />
      </div>
      <span className={cn('font-semibold', isSelected ? 'text-emerald-700' : 'text-foreground')}>{service.label}</span>
    </button>
  );
}

export function DevisForm() {
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
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      items: [{ service: 'canape', size: '', surface: '', details: '' }],
      city: '',
      postalCode: '',
      name: '',
      contact: '',
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const wName = useWatch({ control, name: 'name' });
  const wCity = useWatch({ control, name: 'city' });
  const wPostal = useWatch({ control, name: 'postalCode' });
  const wContact = useWatch({ control, name: 'contact' });

  const [step, setStep] = React.useState<Step>(0);
  const stepRef = React.useRef<HTMLDivElement | null>(null);

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

  const showInlineErrors = submitCount > 0;

  async function goNext() {
    if (step === 0) {
      // Validate size/surface is selected for relevant services
      const service = firstItemService;
      const size = watch('items.0.size');
      const surface = watch('items.0.surface');

      if ((service === 'matelas' || service === 'canape') && !size) {
        toast.error('Veuillez sélectionner une taille');
        return;
      }
      if ((service === 'tapis' || service === 'moquette') && !surface) {
        toast.error('Veuillez indiquer la surface en m²');
        return;
      }

      setStep(1);
      return;
    }
    if (step === 1) {
      const ok = await trigger(['city', 'postalCode']);
      if (!ok) return;
      setOpenSug(false);
      setSuggestions([]);
      setActiveIndex(-1);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (fileError) return;
      setStep(3);
      return;
    }
  }

  function goPrev() {
    setStep((s) => (s > 0 ? ((s - 1) as Step) : s));
  }

  async function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(null);
    const picked = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (picked.length === 0) return;

    const onlyImages = picked.filter((f) => f.type?.startsWith('image/'));
    const withinSize = onlyImages.filter((f) => f.size <= MAX_BYTES_PER_FILE);
    let merged = [...files, ...withinSize].slice(0, MAX_FILES);

    while (totalSize(merged) > MAX_TOTAL_BYTES && merged.length > 0) {
      merged = merged.slice(0, -1);
    }

    setCompressing(true);
    const compressed = await compressFiles(merged);
    setCompressing(false);
    setFiles(compressed);
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
      return;
    }
    if (!validateContact(values.contact)) {
      setError('contact', { type: 'manual', message: 'Renseigne un email ou un téléphone valide.' });
      setStep(3);
      return;
    }

    try {
      const form = new FormData();
      const primary = values.items?.[0] ?? { service: 'autre' as Service };
      const { email, phone: phoneParsed } = parseContact(values.contact);

      form.append('service', primary.service);
      form.append('city', values.city.trim());
      form.append('postalCode', values.postalCode.trim());
      form.append('size', primary.size ?? '');
      form.append('surface', primary.surface ?? '');
      form.append('details', primary.details?.trim() ?? '');
      form.append('name', values.name.trim());
      form.append('email', email);
      form.append('phone', phoneParsed);
      form.append('address', addressQuery.trim());
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
          address: addressQuery?.trim(),
        });

        clearErrors();
        setFileError(null);
        setFiles([]);
        setStep(0);
        setAddressQuery('');
        setSuggestions([]);
        setOpenSug(false);
        reset({
          items: [{ service: 'canape', size: '', surface: '', details: '' }],
          city: '',
          postalCode: '',
          name: '',
          contact: '',
          address: '',
        });
      }
    } catch {
      toast('Erreur réseau. Réessaie ou appelle-nous directement.');
    }
  }

  // Autocomplete
  const [addressQuery, setAddressQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<PlaceSuggestion[]>([]);
  const [openSug, setOpenSug] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [loadingSug, setLoadingSug] = React.useState(false);

  const cacheRef = React.useRef(new Map<string, PlaceSuggestion[]>());
  const reqIdRef = React.useRef(0);
  const debouncedQuery = useDebouncedValue(addressQuery, 120);

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
        if (myReqId !== reqIdRef.current) return;
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

  const sugWrapRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!sugWrapRef.current) return;
      if (!sugWrapRef.current.contains(e.target as Node)) setOpenSug(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Watch first item service for card selection
  const firstItemService = watch('items.0.service');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6">
      {/* Step Indicator */}
      <StepIndicator
        currentStep={step}
        totalSteps={4}
      />

      {/* Step Content */}
      <div
        ref={stepRef}
        className="min-h-80">
        {/* STEP 0: Service Selection */}
        {step === 0 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-foreground">Que faut-il nettoyer ?</h3>
              <p className="text-sm text-muted-foreground mt-1">Sélectionnez le type de textile à traiter</p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {SERVICE_OPTIONS.map((service) => (
                <ServiceCard
                  key={service.value}
                  service={service}
                  isSelected={firstItemService === service.value}
                  onClick={() => {
                    setValue('items.0.service', service.value as Service);
                    setValue('items.0.size', '');
                    setValue('items.0.surface', '');
                  }}
                />
              ))}
            </div>

            {/* Size/Surface Selection based on service type */}
            {(firstItemService === 'matelas' || firstItemService === 'canape') && (
              <div className="space-y-3 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground">
                  Taille <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SIZE_OPTIONS[firstItemService].map((option) => {
                    const isSelected = watch('items.0.size') === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue('items.0.size', option.value)}
                        className={cn(
                          'relative p-4 rounded-xl border-2 transition-all duration-200 text-left',
                          'hover:shadow-md hover:-translate-y-0.5',
                          isSelected ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-500/20' : 'border-slate-200 bg-white hover:border-slate-300',
                        )}>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <span className={cn('font-semibold', isSelected ? 'text-emerald-700' : 'text-foreground')}>{option.label}</span>
                        <span className={cn('block text-lg font-bold mt-1', isSelected ? 'text-emerald-600' : 'text-slate-600')}>{option.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {(firstItemService === 'tapis' || firstItemService === 'moquette') && (
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Surface estimée <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-sm font-bold text-emerald-600">{firstItemService === 'tapis' ? '30 €/m²' : '12 €/m²'}</span>
                </div>
                <div className="relative">
                  <input
                    {...register('items.0.surface')}
                    type="number"
                    min="1"
                    placeholder="Ex : 15"
                    className="w-full h-12 rounded-xl border border-border bg-background pl-4 pr-12 text-lg font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">m²</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-slate-50 rounded-lg px-3 py-2">
                  <span className="font-medium text-slate-600">Minimum :</span>
                  {firstItemService === 'tapis' ? <span>150€ (IDF) / 120€ (Normandie)</span> : <span>150€</span>}
                </div>
              </div>
            )}

            {/* Details (optional) */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Détails supplémentaires <span className="text-muted-foreground">(optionnel)</span>
                </label>
                <textarea
                  {...register('items.0.details')}
                  placeholder="Ex : tache de vin sur l'assise, odeur d'animaux, textile fragile..."
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              {/* Add more items */}
              {fields.length > 1 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Éléments supplémentaires</p>
                  {fields.slice(1).map((field, idx) => {
                    const itemService = watch(`items.${idx + 1}.service`);
                    return (
                      <div
                        key={field.id}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center gap-3">
                          <select
                            {...register(`items.${idx + 1}.service`)}
                            onChange={(e) => {
                              setValue(`items.${idx + 1}.service`, e.target.value as Service);
                              setValue(`items.${idx + 1}.size`, '');
                              setValue(`items.${idx + 1}.surface`, '');
                            }}
                            className="flex-1 h-10 rounded-lg border border-border bg-background px-3 text-sm">
                            {SERVICE_OPTIONS.map((s) => (
                              <option
                                key={s.value}
                                value={s.value}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(idx + 1)}
                            className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Size/Surface for additional items */}
                        {(itemService === 'matelas' || itemService === 'canape') && (
                          <select
                            {...register(`items.${idx + 1}.size`)}
                            className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm">
                            <option value="">Sélectionner la taille</option>
                            {SIZE_OPTIONS[itemService]?.map((opt) => (
                              <option
                                key={opt.value}
                                value={opt.value}>
                                {opt.label} — {opt.price}
                              </option>
                            ))}
                          </select>
                        )}

                        {(itemService === 'tapis' || itemService === 'moquette') && (
                          <div className="relative">
                            <input
                              {...register(`items.${idx + 1}.surface`)}
                              type="number"
                              min="1"
                              placeholder="Surface en m²"
                              className="w-full h-10 rounded-lg border border-border bg-background pl-3 pr-10 text-sm"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">m²</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => append({ service: 'canape', size: '', surface: '', details: '' })}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un élément
              </Button>
            </div>
          </div>
        )}

        {/* STEP 1: Location */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-foreground">Où intervient-on ?</h3>
              <p className="text-sm text-muted-foreground mt-1">Entrez votre adresse pour un devis précis</p>
            </div>

            {/* Address autocomplete */}
            <div
              ref={sugWrapRef}
              className="relative">
              <label className="text-sm font-medium text-foreground">
                Adresse <span className="text-emerald-600">(recommandé)</span>
              </label>
              <div className="relative mt-2">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
                  className="w-full h-12 rounded-xl border border-border bg-background pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                {loadingSug && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />}
              </div>

              {/* Suggestions dropdown */}
              {openSug && suggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl">
                  {suggestions.map((s, i) => (
                    <button
                      key={s.place_id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => applyPlace(s.place_id, s.description)}
                      className={cn('w-full text-left px-4 py-3 text-sm transition-colors', i === activeIndex ? 'bg-emerald-50' : 'bg-background hover:bg-slate-50')}>
                      <div className="font-medium text-foreground">{s.main_text ?? s.description}</div>
                      {s.secondary_text && <div className="text-xs text-muted-foreground mt-0.5">{s.secondary_text}</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* City & Postal Code */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Ville <span className="text-rose-500">*</span>
                </label>
                <input
                  {...register('city', { required: 'Ville requise', minLength: 2 })}
                  placeholder="Ex : Paris"
                  className={cn(
                    'mt-2 w-full h-11 rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 transition-all',
                    errors.city && showInlineErrors ? 'border-rose-400 focus:ring-rose-200' : 'border-border focus:ring-emerald-500/20 focus:border-emerald-500',
                  )}
                />
                {errors.city && showInlineErrors && <p className="text-xs text-rose-600 mt-1">{errors.city.message as string}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Code postal <span className="text-rose-500">*</span>
                </label>
                <input
                  {...register('postalCode', {
                    required: 'Code postal requis',
                    minLength: { value: 4, message: 'Code postal invalide' },
                  })}
                  placeholder="Ex : 75012"
                  inputMode="numeric"
                  className={cn(
                    'mt-2 w-full h-11 rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 transition-all',
                    errors.postalCode && showInlineErrors ? 'border-rose-400 focus:ring-rose-200' : 'border-border focus:ring-emerald-500/20 focus:border-emerald-500',
                  )}
                />
                {errors.postalCode && showInlineErrors && <p className="text-xs text-rose-600 mt-1">{errors.postalCode.message as string}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Photos */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Camera className="h-5 w-5 text-emerald-600" />
                Ajoutez vos photos
              </h3>
              <p className="text-sm text-muted-foreground mt-1">2–3 photos pour un devis plus précis (optionnel mais recommandé)</p>
            </div>

            {/* Upload zone */}
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onPickFiles}
                className="hidden"
              />
              <div
                className={cn(
                  'border-2 border-dashed rounded-2xl p-8 text-center transition-all',
                  'hover:border-emerald-400 hover:bg-emerald-50/50',
                  files.length > 0 ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-300',
                )}>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                  <FileImage className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="font-semibold text-foreground">{files.length > 0 ? "Ajouter d'autres photos" : 'Cliquez pour ajouter des photos'}</p>
                <p className="text-sm text-muted-foreground mt-1">ou glissez-déposez vos images ici</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Max {MAX_FILES} photos • {humanFileSize(MAX_BYTES_PER_FILE)} par photo
                </p>
              </div>
            </label>

            {compressing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Optimisation des photos...
              </div>
            )}

            {fileError && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">{fileError}</p>}

            {/* Preview grid */}
            {files.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {files.map((f, idx) => (
                  <div
                    key={`${f.name}-${idx}`}
                    className="relative group">
                    <div className="aspect-square overflow-hidden rounded-xl border border-border">
                      <img
                        src={previews[idx]}
                        alt={`Photo ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-[10px] text-muted-foreground mt-1 truncate">{f.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Contact */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-foreground">Vos coordonnées</h3>
              <p className="text-sm text-muted-foreground mt-1">Pour vous envoyer le devis et vous recontacter</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Votre nom <span className="text-rose-500">*</span>
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    {...register('name', {
                      required: 'Nom requis',
                      minLength: { value: 2, message: 'Nom trop court' },
                    })}
                    placeholder="Ex : Pierre Dupont"
                    className={cn(
                      'w-full h-12 rounded-xl border bg-background pl-12 pr-4 text-sm outline-none focus:ring-2 transition-all',
                      errors.name && showInlineErrors ? 'border-rose-400 focus:ring-rose-200' : 'border-border focus:ring-emerald-500/20 focus:border-emerald-500',
                    )}
                  />
                </div>
                {errors.name && showInlineErrors && <p className="text-xs text-rose-600 mt-1">{errors.name.message as string}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Email ou téléphone <span className="text-rose-500">*</span>
                </label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    {...register('contact', {
                      validate: (v) => validateContact(v) || 'Email ou téléphone invalide',
                    })}
                    placeholder="Ex : vous@email.fr ou 06..."
                    className={cn(
                      'w-full h-12 rounded-xl border bg-background pl-12 pr-4 text-sm outline-none focus:ring-2 transition-all',
                      errors.contact && showInlineErrors ? 'border-rose-400 focus:ring-rose-200' : 'border-border focus:ring-emerald-500/20 focus:border-emerald-500',
                    )}
                    onBlur={(e) => {
                      const v = e.target.value ?? '';
                      if (!isLikelyEmail(v)) setValue('contact', normalizePhone(v), { shouldValidate: true });
                    }}
                  />
                </div>
                {errors.contact && showInlineErrors && <p className="text-xs text-rose-600 mt-1">{errors.contact.message as string}</p>}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <h4 className="font-semibold text-sm text-foreground mb-3">Récapitulatif</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">
                    {SERVICE_OPTIONS.find((s) => s.value === firstItemService)?.label}
                    {(firstItemService === 'matelas' || firstItemService === 'canape') && watch('items.0.size') && (
                      <span className="text-emerald-600 ml-1">({SIZE_OPTIONS[firstItemService]?.find((o) => o.value === watch('items.0.size'))?.label})</span>
                    )}
                    {(firstItemService === 'tapis' || firstItemService === 'moquette') && watch('items.0.surface') && <span className="text-emerald-600 ml-1">({watch('items.0.surface')} m²)</span>}
                    {fields.length > 1 && ` + ${fields.length - 1} autre(s)`}
                  </span>
                </div>
                {(firstItemService === 'matelas' || firstItemService === 'canape') && watch('items.0.size') && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tarif indicatif</span>
                    <span className="font-bold text-emerald-600">{SIZE_OPTIONS[firstItemService]?.find((o) => o.value === watch('items.0.size'))?.price}</span>
                  </div>
                )}
                {(firstItemService === 'tapis' || firstItemService === 'moquette') && watch('items.0.surface') && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimation</span>
                    <span className="font-bold text-emerald-600">~{Number(watch('items.0.surface')) * (firstItemService === 'tapis' ? 30 : 12)} €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Localisation</span>
                  <span className="font-medium">
                    {wCity || '—'} {wPostal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Photos</span>
                  <span className="font-medium">{files.length} photo(s)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">En envoyant, vous acceptez d'être recontacté pour établir le devis et planifier l'intervention.</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          type="button"
          variant="ghost"
          onClick={goPrev}
          disabled={step === 0 || isSubmitting}
          className="rounded-full">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Retour
        </Button>

        {step < 3 ? (
          <Button
            type="button"
            onClick={goNext}
            disabled={isSubmitting}
            className="rounded-full px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25">
            Continuer
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Envoi...
              </>
            ) : (
              <>
                Envoyer ma demande
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
