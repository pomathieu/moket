import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
