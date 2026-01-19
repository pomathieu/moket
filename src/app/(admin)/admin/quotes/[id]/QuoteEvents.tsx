// app/admin/quotes/[id]/QuoteEvents.tsx
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getQuoteEventsCached } from '@/lib/quotes/cached';

function fmt(dt: string | null | undefined) {
  if (!dt) return '—';
  const d = new Date(dt);
  return d.toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' });
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

export default async function QuoteEvents({ id }: { id: string }) {
  const { events } = await getQuoteEventsCached(id);

  return (
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
  );
}
