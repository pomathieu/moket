import Link from 'next/link';
import type { Metadata } from 'next';
import { ZONES } from '@/lib/zones';

export const metadata: Metadata = {
  title: 'Zones d’intervention | MOKET',
  description: 'Découvrez toutes les zones d’intervention MOKET : Île-de-France et Normandie. Consultez votre zone pour connaître les modalités et délais.',
};

export default function ZonesPage() {
  const idf = ZONES.filter((z) => z.regionLabel === 'Île-de-France');
  const normandie = ZONES.filter((z) => z.regionLabel === 'Normandie');

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Zones d’intervention</h1>
      <p className="mt-3 text-muted-foreground max-w-3xl">
        Intervention à domicile en <strong>Île-de-France</strong> et en <strong>Normandie</strong>. Consultez votre zone pour connaître les modalités et délais.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Île-de-France</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {idf.map((z) => (
            <Link
              key={z.slug}
              href={`/zones/${z.slug}`}
              className="rounded-xl border bg-white px-4 py-2 text-sm">
              {z.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Normandie</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {normandie.map((z) => (
            <Link
              key={z.slug}
              href={`/zones/${z.slug}`}
              className="rounded-xl border bg-white px-4 py-2 text-sm">
              {z.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Bonus SEO : texte explicatif */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold">Comment ça se passe ?</h2>
        <p className="mt-3 text-muted-foreground">
          Nous intervenons à domicile pour le nettoyage de matelas, canapés en tissu, tapis et moquettes avec une méthode d’extraction profonde. Les délais et créneaux varient selon la zone et la
          tournée.
        </p>
      </section>
    </main>
  );
}
