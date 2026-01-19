// app/admin/quotes/QuotesTableSkeleton.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function RowSkeleton() {
  return (
    <div className="grid grid-cols-6 gap-3 px-4 py-3">
      <div className="h-4 w-28 rounded bg-zinc-200" />
      <div className="h-4 w-40 rounded bg-zinc-200" />
      <div className="h-4 w-28 rounded bg-zinc-200" />
      <div className="h-4 w-44 rounded bg-zinc-200" />
      <div className="h-4 w-20 rounded bg-zinc-200" />
      <div className="ml-auto h-8 w-20 rounded bg-zinc-200" />
    </div>
  );
}

export function QuotesTableSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-4">
        <CardTitle className="text-base">Derniers devis</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <div className="px-4 py-3">
          <div className="h-4 w-40 rounded bg-zinc-200" />
        </div>

        <Separator />

        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <RowSkeleton />
            <Separator />
          </div>
        ))}

        <div className="flex items-center justify-between p-4">
          <div className="h-3 w-24 rounded bg-zinc-200" />
          <div className="flex gap-2">
            <div className="h-9 w-28 rounded bg-zinc-200" />
            <div className="h-9 w-28 rounded bg-zinc-200" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
