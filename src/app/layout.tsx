import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Script from 'next/script';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
      email: 'contact@moket.fr',
      currenciesAccepted: 'EUR',
      priceRange: '€€',

      telephone: '+33635090095',
      image: `${base}/og.jpg`,
      description: 'Nettoyage professionnel de textiles à domicile : canapés, matelas, tapis et moquettes en Île-de-France et Normandie.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 48.8566,
        longitude: 2.3522,
      },

      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Île-de-France' },
        { '@type': 'AdministrativeArea', name: 'Paris' },
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
          { '@type': 'Offer', name: 'Nettoyage de canapé en tissu à domicile', priceCurrency: 'EUR', price: 140, url: `${base}/services/canape-tissu` },
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
            priceSpecification: { '@type': 'UnitPriceSpecification', price: 12, priceCurrency: 'EUR', unitText: 'm²' },
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
    default: 'Nettoyage canapé, matelas, tapis à domicile | MOKET',
    template: '%s — MOKET',
  },
  description: 'Nettoyage professionnel de canapé, matelas et tapis à domicile en Île-de-France et Normandie. Devis gratuit, résultat garanti.',
  applicationName: 'MOKET',
  alternates: {
    canonical: 'https://moket.fr/',
  },
  openGraph: {
    type: 'website',
    url: 'https://moket.fr',
    siteName: 'MOKET',
    title: 'Nettoyage canapé, matelas, tapis à domicile | MOKET',
    description: 'Matelas, tapis, moquettes, canapés — Injecteur-extracteur professionnel — Paris, Île-de-France & Normandie.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'MOKET — Nettoyage professionnel à domicile',
      },
    ],
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nettoyage canapé, matelas, tapis à domicile | MOKET',
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
      <head>
        {GTM_ID && (
          <Script
            id="gtm-head"
            strategy="beforeInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {/* dans le JSX */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
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
            position="bottom-right"
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
