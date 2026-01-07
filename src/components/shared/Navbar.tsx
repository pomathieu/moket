import Link from 'next/link';
import NavbarWrapper from './NavbarWrapper';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import DesktopNavMenu from './navbar/DesktopNavMenu';
import MobileNav from './navbar/MobileNav';

export default function Navbar() {
  return (
    <NavbarWrapper>
      <div className="mx-auto max-w-7xl px-4 py-3">
        <nav className="flex h-14 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90">
            <div className="leading-tight">
              <div className="text-2xl pl-2 font-black tracking-tight text-primary">MOKET</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <DesktopNavMenu />
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-full">
              <a
                href="tel:+33635090095"
                className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </Button>

            <Button
              asChild
              variant="accent"
              className="rounded-full">
              <Link href="/devis">Demander un devis</Link>
            </Button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full">
              <a
                href="tel:+33635090095"
                aria-label="Appeler MOKET">
                <Phone className="h-4 w-4" />
              </a>
            </Button>
            <MobileNav />
          </div>
        </nav>
      </div>
    </NavbarWrapper>
  );
}
