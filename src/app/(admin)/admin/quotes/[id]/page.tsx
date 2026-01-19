// app/admin/quotes/[id]/page.tsx
import { Suspense } from 'react';

import QuoteDetails from './QuoteDetails';
import QuoteEvents from './QuoteEvents';
import { EventsSkeleton } from './QuoteSkeletons';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      {/* Le détail s’affiche dès que quote est là */}
      <QuoteDetails id={id} />

      {/* ✅ Streaming : events en second */}
      <div className="-mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2" />
        <div className="space-y-4">
          <Suspense fallback={<EventsSkeleton />}>
            <QuoteEvents id={id} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
