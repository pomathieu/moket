// utils/formatPrice.ts
export function formatPrice(amountCents: number, currency: string, locale = 'fr-FR'): string {
  if (!Number.isFinite(amountCents)) {
    return '';
  }

  const amount = amountCents / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}
