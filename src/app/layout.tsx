import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
});

const base = 'https://moket.fr';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: base,
      name: 'MOKET',
      inLanguage: 'fr-FR',
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${base}/#localbusiness`,
      name: 'MOKET',
      url: base,
      telephone: '+33635090095',
      image: `${base}/og.jpg`,
      description: 'Nettoyage textile profond à domicile : matelas, canapé en tissu, tapis et moquette. Méthode injection-extraction.',
      openingHours: 'Mo-Sa 09:00-19:00',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Île-de-France' },
        { '@type': 'AdministrativeArea', name: 'Normandie' },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+33635090095',
          contactType: 'customer service',
          availableLanguage: ['fr'],
        },
      ],
      // Optionnel mais clean : rattache l’entreprise au website
      isPartOf: { '@id': `${base}/#website` },

      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Prestations MOKET',
        itemListElement: [
          { '@type': 'Offer', name: 'Nettoyage de matelas à domicile', priceCurrency: 'EUR', price: 90, url: `${base}/services/matelas` },
          { '@type': 'Offer', name: 'Nettoyage de canapé en tissu à domicile', priceCurrency: 'EUR', price: 120, url: `${base}/services/canape-tissu` },
          {
            '@type': 'Offer',
            name: 'Nettoyage de tapis à domicile',
            priceCurrency: 'EUR',
            priceSpecification: { '@type': 'UnitPriceSpecification', price: 30, priceCurrency: 'EUR', unitText: 'm²' },
            url: `${base}/services/tapis`,
          },
          {
            '@type': 'Offer',
            name: 'Nettoyage de moquette à domicile',
            priceCurrency: 'EUR',
            priceSpecification: { '@type': 'UnitPriceSpecification', price: 9, priceCurrency: 'EUR', unitText: 'm²' },
            url: `${base}/services/moquette`,
          },
        ],
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://moket.fr'),
  title: {
    default: 'MOKET — Nettoyage textile profond à domicile (Paris, Île-de-France & Normandie)',
    template: '%s — MOKET',
  },
  description: 'Nettoyage textile profond à domicile : matelas, tapis, moquettes, canapés. Injecteur-extracteur professionnel. Intervention premium à Paris, Île-de-France & Normandie.',
  applicationName: 'MOKET',
  alternates: {
    canonical: 'https://moket.fr/',
  },
  openGraph: {
    type: 'website',
    url: 'https://moket.fr',
    siteName: 'MOKET',
    title: 'MOKET — Nettoyage textile profond à domicile',
    description: 'Matelas, tapis, moquettes, canapés — Injecteur-extracteur professionnel — Paris, Île-de-France & Normandie.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'MOKET — Nettoyage textile profond à domicile',
      },
    ],
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOKET — Nettoyage textile profond à domicile',
    description: 'Matelas, tapis, moquettes, canapés — Injecteur-extracteur professionnel — Paris, Île-de-France & Normandie.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F7F7F5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {/* dans le JSX */}
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange>
          <div className="flex min-h-dvh flex-col">{children}</div>

          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast: 'bg-card text-foreground border border-border shadow-sm rounded-xl',
                title: 'font-medium',
                description: 'text-muted-foreground',
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
