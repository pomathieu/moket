import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

type SearchParams = {
  q?: string;
  status?: string;
  page?: string;
};

export default async function page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const q = (sp.q ?? '').trim();
  const status = (sp.status ?? '').trim();
  const pageNum = Math.max(1, Number(sp.page ?? '1') || 1);
  const pageSize = 20;
  const from = (pageNum - 1) * pageSize;
  const to = from + pageSize - 1;

  // Base query
  let query = supabaseAdmin
    .from('quotes')
    .select('id, created_at, updated_at, status, status_updated_at, service, city, postal_code, address, name, email, phone, photos', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);

  if (q) {
    // Recherche simple sur quelques champs (OR)
    // NB: `ilike` OK sur text, attention à l’indexation si gros volume.
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

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const baseParams = new URLSearchParams();
  if (q) baseParams.set('q', q);
  if (status) baseParams.set('status', status);

  function pageLink(n: number) {
    const p = new URLSearchParams(baseParams);
    p.set('page', String(n));
    return `/admin/quotes?${p.toString()}`;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Devis</h1>
          <p className="text-sm text-zinc-500">
            Inbox & suivi — {total} résultat{total > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <form
            action="/admin/quotes"
            className="flex w-full gap-2 md:w-130">
            <Input
              name="q"
              defaultValue={q}
              placeholder="Rechercher (nom, email, tel, ville, CP, adresse)…"
              className="h-10"
            />
            <Input
              name="status"
              defaultValue={status}
              placeholder="status (new, contacted, …)"
              className="h-10 w-42.5"
            />
            <Button
              type="submit"
              className="h-10">
              Filtrer
            </Button>
          </form>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Derniers devis</CardTitle>
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
              Page {pageNum} / {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                disabled={pageNum <= 1}
                className="h-9">
                <Link href={pageLink(pageNum - 1)}>Précédent</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                disabled={pageNum >= totalPages}
                className="h-9">
                <Link href={pageLink(pageNum + 1)}>Suivant</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
