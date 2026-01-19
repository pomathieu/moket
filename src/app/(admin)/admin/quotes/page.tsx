// app/admin/quotes/page.tsx
import { Suspense } from 'react';

import { QuotesFilters } from './QuotesFilters';
import QuotesTable from './QuotesTable';
import { QuotesTableSkeleton } from './QuotesTableSkeleton';

type SearchParams = {
  q?: string;
  status?: string;
  page?: string;
};

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;

  const q = (sp.q ?? '').trim();
  const status = (sp.status ?? '').trim();
  const pageNum = Math.max(1, Number(sp.page ?? '1') || 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Devis</h1>
          <p className="text-sm text-zinc-500">Inbox & suivi</p>
        </div>

        <QuotesFilters
          defaultQ={q}
          defaultStatus={status}
        />
      </div>

      {/* ✅ Streaming : le cadre s'affiche tout de suite, la table arrive ensuite */}
      <Suspense
        key={`${q}|${status}|${pageNum}`}
        fallback={<QuotesTableSkeleton />}>
        <QuotesTable
          q={q}
          status={status}
          pageNum={pageNum}
        />
      </Suspense>
    </div>
  );
}
