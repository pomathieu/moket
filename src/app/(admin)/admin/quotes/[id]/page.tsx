import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/admin';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function fmt(dt: string | null | undefined) {
  if (!dt) return '—';
  const d = new Date(dt);
  return d.toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' });
}

function serviceLabel(v: string) {
  switch (v) {
    case 'matelas':
      return 'Nettoyage matelas';
    case 'canape':
      return 'Nettoyage canapé';
    case 'tapis':
      return 'Nettoyage tapis';
    case 'moquette':
      return 'Nettoyage moquette';
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

function humanEventType(t: string) {
  switch (t) {
    case 'quote_created':
      return 'Création';
    case 'quote_updated':
      return 'Mise à jour';
    case 'status_changed':
      return 'Changement de statut';
    case 'quote_deleted':
      return 'Suppression';
    default:
      return t;
  }
}

type Item = { service?: string; dimensions?: string; details?: string };
type Photo = { path?: string; publicUrl?: string; filename?: string; contentType?: string; size?: number };

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Server action: update status
  async function setStatus(formData: FormData) {
    'use server';
    const nextStatus = String(formData.get('status') ?? '').trim();
    if (!nextStatus) return;

    // Optionnel : valider une liste de statuts
    const allowed = new Set(['new', 'contacted', 'scheduled', 'quoted', 'won', 'lost', 'archived']);
    if (!allowed.has(nextStatus)) return;

    const { error } = await supabaseAdmin.from('quotes').update({ status: nextStatus }).eq('id', id);

    if (error) {
      // en prod: log/monitoring
      console.error('setStatus error:', error);
      return;
    }

    revalidatePath(`/admin/quotes/${id}`);
    revalidatePath(`/admin/quotes`);
  }

  const { data: quote, error: quoteErr } = await supabaseAdmin.from('quotes').select('*').eq('id', id).single();

  if (quoteErr || !quote) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Devis introuvable</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-zinc-600">
          {quoteErr?.message ?? 'Aucun devis avec cet id.'}
          <div className="mt-4">
            <Button
              asChild
              variant="secondary">
              <Link href="/admin/quotes">Retour</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { data: events } = await supabaseAdmin
    .from('quote_events')
    .select('id, created_at, event_type, actor_type, source, request_id, diff')
    .eq('quote_id', id)
    .order('created_at', { ascending: false });

  const items: Item[] = Array.isArray(quote.items) ? quote.items : [];
  const photos: Photo[] = Array.isArray(quote.photos) ? quote.photos : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Devis</h1>
            <span className="text-xs text-zinc-500">#{quote.id}</span>
            {statusBadge(quote.status)}
          </div>
          <p className="text-sm text-zinc-500">
            Créé {fmt(quote.created_at)} • Dernière maj {fmt(quote.updated_at)} • Statut maj {fmt(quote.status_updated_at)}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            variant="outline">
            <Link href="/admin/quotes">Retour</Link>
          </Button>

          <form
            action={setStatus}
            className="flex gap-2">
            <input
              type="hidden"
              name="status"
              value="contacted"
            />
            <Button
              type="submit"
              variant="secondary">
              Contacté
            </Button>
          </form>

          <form
            action={setStatus}
            className="flex gap-2">
            <input
              type="hidden"
              name="status"
              value="quoted"
            />
            <Button
              type="submit"
              variant="secondary">
              Devisé
            </Button>
          </form>

          <form
            action={setStatus}
            className="flex gap-2">
            <input
              type="hidden"
              name="status"
              value="won"
            />
            <Button
              type="submit"
              variant="outline">
              Gagné
            </Button>
          </form>

          <form
            action={setStatus}
            className="flex gap-2">
            <input
              type="hidden"
              name="status"
              value="lost"
            />
            <Button
              type="submit"
              variant="destructive">
              Perdu
            </Button>
          </form>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Col gauche : infos */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base">Infos client</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-3 p-4 md:p-6 text-sm">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">Nom</div>
                  <div className="font-medium">{quote.name}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Prestation</div>
                  <div className="font-medium">{serviceLabel(quote.service)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Email</div>
                  <div className="font-medium">{quote.email || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Téléphone</div>
                  <div className="font-medium">{quote.phone || '—'}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-zinc-500">Adresse</div>
                  <div className="font-medium">{(quote.address?.trim() ? quote.address : `${quote.city} (${quote.postal_code})`) || '—'}</div>
                </div>
              </div>

              {(quote.details || quote.dimensions) && (
                <>
                  <Separator />
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div>
                      <div className="text-xs text-zinc-500">Dimensions (global)</div>
                      <div className="font-medium">{quote.dimensions || '—'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">Détails (global)</div>
                      <div className="font-medium">{quote.details || '—'}</div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base">Prestations</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Dimensions</TableHead>
                    <TableHead>Détails</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((it, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{serviceLabel(String(it.service ?? ''))}</TableCell>
                      <TableCell>{(it.dimensions ?? '').trim() || '—'}</TableCell>
                      <TableCell className="text-zinc-600">{(it.details ?? '').trim() || '—'}</TableCell>
                    </TableRow>
                  ))}

                  {items.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="py-8 text-center text-sm text-zinc-500">
                        Aucune prestation détaillée (items).
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base">Photos</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-4 md:p-6">
              {photos.length === 0 ? (
                <div className="text-sm text-zinc-500">Aucune photo.</div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {photos.map((p, i) => (
                    <a
                      key={i}
                      href={p.publicUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl border border-zinc-200 bg-white p-3 hover:bg-zinc-50">
                      <div className="text-sm font-medium line-clamp-1">{p.filename || p.path || `Photo ${i + 1}`}</div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {p.contentType || '—'} {typeof p.size === 'number' ? `• ${Math.round(p.size / 1024)} KB` : ''}
                      </div>
                      <div className="text-xs text-zinc-500 mt-2 line-clamp-2">{p.publicUrl ? 'Ouvrir' : 'URL non disponible (bucket privé ?)'}</div>
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Col droite : timeline */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base">Historique</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3">
                {(events ?? []).map((e) => (
                  <div
                    key={e.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium">{humanEventType(e.event_type)}</div>
                        <div className="text-xs text-zinc-500">
                          {fmt(e.created_at)} • {e.actor_type || 'system'} {e.source ? `• ${e.source}` : ''}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[11px]">
                        {e.event_type}
                      </Badge>
                    </div>

                    {e.diff && Object.keys(e.diff).length > 0 && <pre className="mt-2 overflow-auto rounded-xl bg-zinc-950 p-3 text-[11px] text-zinc-100">{JSON.stringify(e.diff, null, 2)}</pre>}
                  </div>
                ))}

                {(!events || events.length === 0) && <div className="text-sm text-zinc-500">Aucun event.</div>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
