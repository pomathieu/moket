// app/admin/quotes/[id]/QuoteSkeletons.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function QuoteHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 rounded bg-zinc-200" />
          <div className="h-4 w-28 rounded bg-zinc-200" />
          <div className="h-5 w-20 rounded bg-zinc-200" />
        </div>
        <div className="mt-2 h-4 w-96 rounded bg-zinc-200" />
      </div>
      <div className="flex gap-2">
        <div className="h-10 w-24 rounded bg-zinc-200" />
        <div className="h-10 w-24 rounded bg-zinc-200" />
        <div className="h-10 w-24 rounded bg-zinc-200" />
      </div>
    </div>
  );
}

export function QuoteMainSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base">Infos client</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-4 md:p-6">
            <div className="grid gap-3 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="space-y-2">
                  <div className="h-3 w-16 rounded bg-zinc-200" />
                  <div className="h-4 w-40 rounded bg-zinc-200" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base">Prestations</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-4 md:p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded bg-zinc-200"
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base">Photos</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-4 md:p-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-zinc-200"
              />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base">Historique</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-4 md:p-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-2xl bg-zinc-200"
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base">Meta</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-4 md:p-6">
            <div className="h-40 rounded-xl bg-zinc-200" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function EventsSkeleton() {
  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-base">Historique</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 md:p-6 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-2xl bg-zinc-200"
          />
        ))}
      </CardContent>
    </Card>
  );
}
