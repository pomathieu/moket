import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_NAME = 'MOKET';
const SITE_URL = 'https://moket.fr';

const LEGAL_ENTITY = {
  name: 'The Trade Copilot',
  address: '26 rue charles baudelaire, 75012 Paris France',
  email: 'devis@moket.fr',
  phone: '+33635090095',
};

// Hébergeur (Vercel) — infos vérifiées via la politique de confidentialité Vercel
const HOSTING = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Avenue #4133, Covina, CA 91723, United States',
  website: 'https://vercel.com',
};

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${SITE_NAME}`,
  description: `Politique de confidentialité et information RGPD du site ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/politique-de-confidentialite` },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Politique de confidentialité</h1>
        <p className="text-sm text-muted-foreground">
          Cette page explique comment {LEGAL_ENTITY.name} collecte et traite vos données personnelles lors de l’utilisation du site {SITE_NAME}, conformément au RGPD.
        </p>
      </header>

      <section className="mt-10 space-y-8">
        <Block title="1) Responsable du traitement">
          <p>
            Le responsable du traitement est <span className="font-medium text-foreground">{LEGAL_ENTITY.name}</span>.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Adresse : {LEGAL_ENTITY.address}</li>
            <li>
              Email :{' '}
              <a
                className="underline underline-offset-4"
                href={`mailto:${LEGAL_ENTITY.email}`}>
                {LEGAL_ENTITY.email}
              </a>
            </li>
            <li>
              Téléphone :{' '}
              <a
                className="underline underline-offset-4"
                href={`tel:${LEGAL_ENTITY.phone}`}>
                {LEGAL_ENTITY.phone}
              </a>
            </li>
          </ul>
        </Block>

        <Block title="2) Données collectées">
          <p>Selon votre usage du site, nous pouvons collecter :</p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium text-foreground">Données d’identification et de contact</span> : nom, prénom, email, téléphone.
            </li>
            <li>
              <span className="font-medium text-foreground">Données liées à votre demande</span> : informations fournies via formulaire (message, description), et éventuellement photos si vous les
              transmettez pour une estimation.
            </li>
            <li>
              <span className="font-medium text-foreground">Données techniques</span> : adresse IP, journaux techniques, informations de navigateur/appareil (notamment via l’hébergeur).
            </li>
            <li>
              <span className="font-medium text-foreground">Cookies et traceurs</span> : selon vos choix (mesure d’audience, fonctionnement).
            </li>
          </ul>
        </Block>

        <Block title="3) Finalités et bases légales">
          <div className="space-y-3">
            <Purpose
              title="Répondre à vos demandes (contact / devis)"
              legal="Mesures précontractuelles / exécution d’un contrat"
            />
            <Purpose
              title="Gestion de la relation client (suivi, planification, facturation)"
              legal="Exécution d’un contrat / obligation légale"
            />
            <Purpose
              title="Sécurité et fonctionnement du site"
              legal="Intérêt légitime (sécurisation, prévention des abus)"
            />
            <Purpose
              title="Mesure d’audience et amélioration du site (si activée)"
              legal="Consentement (cookies), le cas échéant"
            />
          </div>
        </Block>

        <Block title="4) Durées de conservation">
          <ul className="list-disc pl-5 space-y-1">
            <li>Données de contact / demandes : durée nécessaire au traitement de la demande, puis archivage raisonnable pour suivi (à définir selon votre process).</li>
            <li>Données clients (facturation / comptabilité) : durées légales applicables (obligations comptables et fiscales).</li>
            <li>Cookies / traceurs : durée variable selon le type, et selon vos paramétrages (souvent 6 à 13 mois pour l’audience, selon l’outil et la configuration).</li>
          </ul>
          <p className="mt-3">Nous appliquons le principe de minimisation : nous conservons les données uniquement le temps nécessaire à la finalité poursuivie.</p>
        </Block>

        <Block title="5) Destinataires et sous-traitants">
          <p>
            Vos données sont accessibles uniquement aux personnes habilitées au sein de {LEGAL_ENTITY.name}, et, le cas échéant, à nos prestataires techniques (sous-traitants) strictement nécessaires
            au fonctionnement du site et au traitement des demandes (hébergement, outils techniques).
          </p>

          <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4 text-sm">
            <p className="font-medium text-foreground">Hébergement</p>
            <p className="mt-1 text-muted-foreground">
              {HOSTING.name} — {HOSTING.address} —{' '}
              <a
                className="underline underline-offset-4"
                href={HOSTING.website}
                target="_blank"
                rel="noreferrer">
                {HOSTING.website}
              </a>
            </p>
          </div>

          <p className="mt-4">
            Si vous utilisez des outils additionnels (ex : analytics, CRM, emailing), listez-les ici avec leur rôle (mesure d’audience, envoi d’emails, gestion commerciale), et configurez la collecte
            conformément au RGPD.
          </p>
        </Block>

        <Block title="6) Transferts hors UE">
          <p>
            Certains prestataires peuvent traiter des données en dehors de l’Union européenne (ex : hébergeur ou outils techniques). Dans ce cas, nous veillons à ce que des garanties appropriées
            soient mises en place (ex : clauses contractuelles types, mesures supplémentaires, selon les cas).
          </p>
        </Block>

        <Block title="7) Sécurité">
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données (contrôle d’accès, mesures de sécurité de l’hébergement, bonnes pratiques de
            développement, etc.).
          </p>
        </Block>

        <Block title="8) Vos droits">
          <p>Conformément au RGPD, vous disposez notamment des droits suivants :</p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>droit d’accès, de rectification, d’effacement ;</li>
            <li>droit à la limitation et d’opposition ;</li>
            <li>droit à la portabilité (selon les cas) ;</li>
            <li>droit de retirer votre consentement (si un traitement est fondé sur le consentement).</li>
          </ul>
          <p className="mt-3">
            Pour exercer vos droits :{' '}
            <a
              className="underline underline-offset-4"
              href={`mailto:${LEGAL_ENTITY.email}`}>
              {LEGAL_ENTITY.email}
            </a>
            .
          </p>
          <p className="mt-2">Vous pouvez également introduire une réclamation auprès de la CNIL (autorité de contrôle française).</p>
        </Block>

        <Block title="9) Cookies et traceurs">
          <p>
            Le site peut utiliser des cookies nécessaires à son fonctionnement et, le cas échéant, des cookies de mesure d’audience ou d’amélioration. Selon votre configuration, ces cookies peuvent
            nécessiter votre consentement.
          </p>
          <p className="mt-3">
            Conseil : ajoutez un mécanisme de gestion des cookies (bannière + préférences) et documentez ici les catégories (nécessaires / mesure d’audience / marketing), ainsi que les outils
            utilisés.
          </p>
        </Block>

        <Block title="10) Contact et documents liés">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Contact RGPD :{' '}
              <a
                className="underline underline-offset-4"
                href={`mailto:${LEGAL_ENTITY.email}`}>
                {LEGAL_ENTITY.email}
              </a>
            </li>
            <li>
              Mentions légales :{' '}
              <Link
                className="underline underline-offset-4"
                href="/mentions-legales">
                voir la page
              </Link>
            </li>
          </ul>
        </Block>

        <div className="text-xs text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</div>
      </section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function Purpose({ title, legal }: { title: string; legal: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Base légale : <span className="font-medium text-foreground">{legal}</span>
      </p>
    </div>
  );
}
