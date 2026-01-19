// app/admin/quotes/QuotesTable.tsx
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

function serviceLabel(v: string) {
  switch (v) {
    case 'matelas':
      return 'Matelas';
    case 'canape':
      return 'Canapé';
    case 'tapis':
      return 'Tapis';
    case 'moquette':
      return 'Moquette';
    default:
      return v || '—';
  }
}

function statusBadge(status: string) {
  switch (status) {
    case 'new':
      return <Badge>nouveau</Badge>;
    case 'contacted':
      return <Badge variant="secondary">contacté</Badge>;
    case 'scheduled':
      return <Badge variant="secondary">planifié</Badge>;
    case 'quoted':
      return <Badge variant="secondary">devisé</Badge>;
    case 'won':
      return <Badge variant="outline">gagné</Badge>;
    case 'lost':
      return <Badge variant="destructive">perdu</Badge>;
    case 'archived':
      return <Badge variant="outline">archivé</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function fmt(dt: string | null | undefined) {
  if (!dt) return '—';
  const d = new Date(dt);
  return d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
}

function buildPageLink(base: { q: string; status: string }, n: number) {
  const p = new URLSearchParams();
  if (base.q) p.set('q', base.q);
  if (base.status) p.set('status', base.status);
  p.set('page', String(n));
  return `/admin/quotes?${p.toString()}`;
}

export default async function QuotesTable({ q, status, pageNum }: { q: string; status: string; pageNum: number }) {
  const pageSize = 20;
  const from = (pageNum - 1) * pageSize;
  const to = from + pageSize - 1;

  // PERF: on évite count exact quand il y a une recherche texte (souvent coûteux)
  const wantCount = !q;

  let query = supabaseAdmin
    .from('quotes')
    .select('id, created_at, updated_at, status, status_updated_at, service, city, postal_code, address, name, email, phone, photos', wantCount ? { count: 'estimated' } : {})
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);

  if (q) {
    const like = `%${q}%`;
    query = query.or([`name.ilike.${like}`, `email.ilike.${like}`, `phone.ilike.${like}`, `city.ilike.${like}`, `postal_code.ilike.${like}`, `address.ilike.${like}`].join(','));
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Devis</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-red-600">Erreur DB: {error.message}</CardContent>
      </Card>
    );
  }

  const total = wantCount ? (count ?? 0) : (data?.length ?? 0);
  const totalPages = wantCount ? Math.max(1, Math.ceil(total / pageSize)) : pageNum;

  const base = { q, status };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-4">
        <div className="flex items-baseline justify-between gap-3">
          <CardTitle className="text-base">Derniers devis</CardTitle>

          <div className="text-xs text-zinc-500">
            {total} résultat{total > 1 ? 's' : ''}
            {!wantCount && <span className="ml-2">(count désactivé pendant la recherche)</span>}
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Prestation</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(data ?? []).map((r) => {
              const photosCount = Array.isArray(r.photos) ? r.photos.length : 0;

              return (
                <TableRow
                  key={r.id}
                  className="hover:bg-zinc-50">
                  <TableCell className="whitespace-nowrap text-sm">
                    <div className="font-medium">{fmt(r.created_at)}</div>
                    <div className="text-xs text-zinc-500">maj {fmt(r.updated_at)}</div>
                  </TableCell>

                  <TableCell className="text-sm">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-zinc-500">{[r.email || null, r.phone || null].filter(Boolean).join(' • ') || '—'}</div>
                  </TableCell>

                  <TableCell className="text-sm">
                    <div className="font-medium">{serviceLabel(r.service)}</div>
                    <div className="text-xs text-zinc-500">
                      {photosCount} photo{photosCount > 1 ? 's' : ''}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">
                    <div className="font-medium">
                      {r.city} ({r.postal_code})
                    </div>
                    <div className="text-xs text-zinc-500 line-clamp-1">{r.address || '—'}</div>
                  </TableCell>

                  <TableCell className="text-sm">{statusBadge(r.status)}</TableCell>

                  <TableCell className="text-right">
                    <Button
                      asChild
                      variant="secondary"
                      className="h-9">
                      <Link href={`/admin/quotes/${r.id}`}>Ouvrir</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}

            {(!data || data.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-zinc-500">
                  Aucun devis.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Separator />

        <div className="flex items-center justify-between p-4">
          <div className="text-xs text-zinc-500">
            Page {pageNum}
            {wantCount ? ` / ${totalPages}` : ''}
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              disabled={pageNum <= 1}
              className="h-9">
              <Link href={buildPageLink(base, pageNum - 1)}>Précédent</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              disabled={wantCount ? pageNum >= totalPages : false}
              className="h-9">
              <Link href={buildPageLink(base, pageNum + 1)}>Suivant</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
