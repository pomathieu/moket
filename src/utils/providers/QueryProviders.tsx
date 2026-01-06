// app/providers.tsx  – client component
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProviders({ children }: { children: React.ReactNode }) {
  // un seul client pour toute la session navigateur
  const [qc] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
      })
  );

  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
