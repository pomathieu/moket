'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
// Remplace par ton Select shadcn si tu l'as déjà
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function QuotesFilters({ defaultQ, defaultStatus }: { defaultQ: string; defaultStatus: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = React.useTransition();

  const [q, setQ] = React.useState(defaultQ);
  const [status, setStatus] = React.useState(defaultStatus);

  // Si navigation via back/forward, on resync
  React.useEffect(() => setQ(defaultQ), [defaultQ]);
  React.useEffect(() => setStatus(defaultStatus), [defaultStatus]);

  function apply(next: { q: string; status: string }) {
    const p = new URLSearchParams(searchParams?.toString());

    if (next.q) p.set('q', next.q);
    else p.delete('q');

    if (next.status) p.set('status', next.status);
    else p.delete('status');

    // reset page dès qu'on change les filtres
    p.delete('page');

    startTransition(() => {
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher…"
          className="h-10 w-64 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200">
          <option value="">Tous</option>
          <option value="new">Nouveau</option>
          <option value="contacted">Contacté</option>
          <option value="scheduled">Planifié</option>
          <option value="quoted">Devisé</option>
          <option value="won">Gagné</option>
          <option value="lost">Perdu</option>
          <option value="archived">Archivé</option>
        </select>

        <Button
          variant="secondary"
          className="h-10"
          disabled={isPending}
          onClick={() => apply({ q: q.trim(), status })}>
          {isPending ? '…' : 'Filtrer'}
        </Button>
      </div>
    </div>
  );
}
