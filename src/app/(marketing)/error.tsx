'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body>
        <main className="min-h-[70vh] flex items-center">
          <section className="w-full px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl font-heading tracking-[-0.02em]">Oups… erreur inattendue</h1>
              <p className="text-slate-600">Un incident est survenu. Vous pouvez réessayer ou revenir à l’accueil.</p>
              {error?.digest && <p className="text-xs text-slate-400">Code : {error.digest}</p>}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
