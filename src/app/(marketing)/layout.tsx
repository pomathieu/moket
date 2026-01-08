import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Script from 'next/script';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MOKET',
    url: 'https://moket.fr',
    openingHours: ['Mo-Sa 09:00-19:00'],

    telephone: '+33635090095',
    areaServed: ['Île-de-France', 'Normandie'],
    serviceType: ['Nettoyage de canapé', 'Nettoyage de matelas', 'Nettoyage de tapis', 'Nettoyage de moquette'],
  };

  return (
    <>
      <Script
        id="localbusiness-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pt-(--nav-height)">
        {children}
      </main>
      <Footer />
    </>
  );
}
