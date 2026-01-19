'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Props = {
  defaultQ: string;
  defaultStatus: string; // "" ou un status ("new"...)
};

function normalizeStatus(v: string) {
  // côté UI on utilise "all" (Radix n'aime pas value="")
  return v && v !== 'all' ? v : '';
}

export function QuotesFilters({ defaultQ, defaultStatus }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(defaultQ);
  const [statusUI, setStatusUI] = useState(defaultStatus || 'all');

  // Si l'utilisateur navigue (back/forward), on resynchronise l'état local
  useEffect(() => {
    setQ(defaultQ);
    setStatusUI(defaultStatus || 'all');
  }, [defaultQ, defaultStatus]);

  const baseParams = useMemo(() => new URLSearchParams(sp.toString()), [sp]);

  function apply(nextQ: string, nextStatusUI: string) {
    const p = new URLSearchParams(baseParams);

    const qq = nextQ.trim();
    const st = normalizeStatus(nextStatusUI);

    if (qq) p.set('q', qq);
    else p.delete('q');

    if (st) p.set('status', st);
    else p.delete('status');

    // reset pagination quand filtre change
    p.delete('page');

    const url = p.toString() ? `${pathname}?${p.toString()}` : pathname;

    startTransition(() => {
      router.replace(url, { scroll: false });
    });
  }

  // debounce sur q
  useEffect(() => {
    const t = setTimeout(() => apply(q, statusUI), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher (nom, email, tel, ville, CP, adresse)…"
        className="h-10 md:w-105"
      />

      <Select
        value={statusUI}
        onValueChange={(v) => {
          setStatusUI(v);
          apply(q, v);
        }}>
        <SelectTrigger className="h-10 w-50">
          <SelectValue placeholder="Tous les statuts" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="new">Nouveau</SelectItem>
          <SelectItem value="contacted">Contacté</SelectItem>
          <SelectItem value="scheduled">Planifié</SelectItem>
          <SelectItem value="quoted">Devisé</SelectItem>
          <SelectItem value="won">Gagné</SelectItem>
          <SelectItem value="lost">Perdu</SelectItem>
          <SelectItem value="archived">Archivé</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="accent"
        className="h-10"
        disabled={isPending}
        onClick={() => apply(q, statusUI)}>
        {isPending ? '…' : 'Filtrer'}
      </Button>
    </div>
  );
}
