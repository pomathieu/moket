// lib/quotes/cached.ts
import { unstable_cache } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/admin';

export type QuoteRow = any;
export type QuoteEventRow = {
  id: string;
  created_at: string | null;
  event_type: string;
  actor_type: string | null;
  source: string | null;
  request_id: string | null;
  diff: any;
};

export const quoteTags = {
  quote: (id: string) => `quote:${id}`,
  quoteEvents: (id: string) => `quote:${id}:events`,
  quotesList: () => `quotes:list`,
};

// ✅ Quote (détail)
export const getQuoteCached = (id: string) =>
  unstable_cache(
    async () => {
      const { data, error } = await supabaseAdmin
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return { quote: null as QuoteRow | null, error };
      return { quote: data as QuoteRow, error: null as any };
    },
    ['quote', id],
    {
      tags: [quoteTags.quote(id)],
      revalidate: 60, // ajuste : 0 (pas de cache) / 10 / 60 / etc.
    }
  )();

// ✅ Events
export const getQuoteEventsCached = (id: string) =>
  unstable_cache(
    async () => {
      const { data, error } = await supabaseAdmin
        .from('quote_events')
        .select('id, created_at, event_type, actor_type, source, request_id, diff')
        .eq('quote_id', id)
        .order('created_at', { ascending: false });

      if (error) return { events: [] as QuoteEventRow[], error };
      return { events: (data ?? []) as QuoteEventRow[], error: null as any };
    },
    ['quote_events', id],
    {
      tags: [quoteTags.quoteEvents(id)],
      revalidate: 60,
    }
  )();
