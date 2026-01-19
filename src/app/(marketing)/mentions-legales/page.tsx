import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_NAME = 'MOKET';
const SITE_URL = 'https://moket.fr';

// Société qui porte l’activité (éditeur)
const LEGAL_ENTITY = {
  name: 'The Trade Copilot', // ✅ info fournie
  legalForm: 'SAS THE TRADE COPILOT',
  capital: '1500 €',
  rcsCity: 'Paris',
  rcsNumber: '948597554',
  siret: '94859755400021',
  vatNumber: 'FR78948597554',
  address: '26 rue charles baudelaire, 75012 Paris France',
  email: 'devis@moket.fr',
  phone: '+33635090095',
  publicationDirector: 'Mathieu Pierre-Olivier',
};

// Hébergeur (Vercel) — infos vérifiées via la politique de confidentialité Vercel
const HOSTING = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Avenue #4133, Covina, CA 91723, United States',
  website: 'https://vercel.com',
};

export const metadata: Metadata = {
  title: `Mentions légales | ${SITE_NAME}`,
  description: `Mentions légales du site ${SITE_NAME} édité par ${LEGAL_ENTITY.name}.`,
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Mentions légales</h1>
        <p className="text-sm text-muted-foreground">
          Conformément à la loi pour la confiance dans l’économie numérique (LCEN), vous trouverez ci-dessous les informations relatives à l’éditeur et à l’hébergement du site.
        </p>
      </header>

      <section className="mt-10 space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Éditeur du site</h2>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">{LEGAL_ENTITY.name}</span> — {LEGAL_ENTITY.legalForm}
            </p>

            <p>Siège social : {LEGAL_ENTITY.address}</p>

            <p>
              RCS : {LEGAL_ENTITY.rcsCity} {LEGAL_ENTITY.rcsNumber} — SIRET : {LEGAL_ENTITY.siret}
            </p>

            <p>Capital social : {LEGAL_ENTITY.capital}</p>

            <p>TVA intracommunautaire : {LEGAL_ENTITY.vatNumber}</p>

            <p>
              Contact :{' '}
              <a
                className="underline underline-offset-4"
                href={`mailto:${LEGAL_ENTITY.email}`}>
                {LEGAL_ENTITY.email}
              </a>{' '}
              —{' '}
              <a
                className="underline underline-offset-4"
                href={`tel:${LEGAL_ENTITY.phone}`}>
                {LEGAL_ENTITY.phone}
              </a>
            </p>

            <p>Directeur de la publication : {LEGAL_ENTITY.publicationDirector}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Hébergement</h2>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>
              Hébergeur : <span className="font-medium text-foreground">{HOSTING.name}</span>
            </p>
            <p>Adresse : {HOSTING.address}</p>
            <p>
              Site :{' '}
              <a
                className="underline underline-offset-4"
                href={HOSTING.website}
                target="_blank"
                rel="noreferrer">
                {HOSTING.website}
              </a>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            L’ensemble des contenus présents sur ce site (textes, visuels, logos, vidéos, éléments graphiques, structure) est protégé par le droit de la propriété intellectuelle. Toute reproduction,
            représentation, adaptation ou exploitation, totale ou partielle, sans autorisation préalable écrite, est interdite.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Responsabilité</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Les informations diffusées sur ce site le sont à titre indicatif. {LEGAL_ENTITY.name} s’efforce d’en assurer l’exactitude et la mise à jour, mais ne saurait garantir l’absence d’erreurs ou
            d’omissions. L’utilisateur demeure responsable de l’usage qu’il fait des informations.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Données personnelles</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Pour en savoir plus sur la collecte et le traitement de vos données personnelles, consultez notre{' '}
            <Link
              className="underline underline-offset-4"
              href="/politique-de-confidentialite">
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>

        <div className="text-xs text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</div>
      </section>
    </main>
  );
}
