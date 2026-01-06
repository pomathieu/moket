'use client';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center">
      <section className="w-full px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-heading tracking-[-0.02em]">Page introuvable</h1>
          <p className="text-slate-600">Désolé, la page que vous cherchez n’existe pas ou a été déplacée.</p>
          <div className="flex flex-wrap items-center justify-center gap-3"></div>

          <div className="pt-6 text-sm text-slate-500">
            <p>Vous pouvez aussi explorer :</p>
            <div className="flex flex-wrap justify-center gap-3 mt-2"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
