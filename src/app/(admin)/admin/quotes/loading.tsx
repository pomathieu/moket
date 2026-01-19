// app/admin/quotes/loading.tsx
import { QuotesTableSkeleton } from './QuotesTableSkeleton';

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="h-6 w-24 rounded bg-zinc-200" />
          <div className="mt-2 h-4 w-40 rounded bg-zinc-200" />
        </div>

        <div className="h-10 w-72 rounded bg-zinc-200" />
      </div>

      <QuotesTableSkeleton />
    </div>
  );
}
