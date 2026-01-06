import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MOKET',
  url: 'https://moket.fr',
  telephone: '+33635090095',
  areaServed: ['Paris', 'Île-de-France'],
  description: 'Nettoyage textile profond à domicile : matelas, tapis, moquettes, canapés. Injecteur-extracteur professionnel.',
  image: 'https://moket.fr/og.jpg',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://moket.fr'),
  title: {
    default: 'MOKET — Nettoyage textile profond à domicile (Paris & Île-de-France)',
    template: '%s — MOKET',
  },
  description: 'Nettoyage textile profond à domicile : matelas, tapis, moquettes, canapés. Injecteur-extracteur professionnel. Intervention premium à Paris & Île-de-France.',
  applicationName: 'MOKET',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://moket.fr',
    siteName: 'MOKET',
    title: 'MOKET — Nettoyage textile profond à domicile',
    description: 'Matelas, tapis, moquettes, canapés — Injecteur-extracteur professionnel — Paris & Île-de-France.',
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
    description: 'Matelas, tapis, moquettes, canapés — Injecteur-extracteur professionnel — Paris & Île-de-France.',
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
        <script
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
