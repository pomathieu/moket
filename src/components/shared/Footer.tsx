import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone } from 'lucide-react';
import { ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-slate-200/70 bg-[#F7F7F5]">
      {/* Upper */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Brand */}
        <div className="mb-10 text-center space-y-3">
          <div className="text-2xl font-extrabold tracking-tight text-[#0B1F3B]">MOKET</div>
          <p className="text-sm text-slate-600">Nettoyage textile profond à domicile — Paris, Île-de-France et Normandie.</p>
        </div>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Services */}
          <nav
            aria-label="Services"
            className="space-y-3 text-center lg:text-left">
            <h4 className="font-medium text-slate-900">Services</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:underline">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Zones */}
          <nav
            aria-label="Zones d'intervention"
            className="space-y-3 text-center lg:text-left">
            <h4 className="font-medium text-slate-900">Zones</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              {ZONES.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={`/zones/${zone.slug}`}
                    className="hover:underline">
                    {zone.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* À propos / Ressources */}
          <nav
            aria-label="À propos"
            className="space-y-3 text-center lg:text-left">
            <h4 className="font-medium text-slate-900">À propos</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <Link
                  href="/notre-methode"
                  className="hover:underline">
                  Notre méthode
                </Link>
              </li>
              <li>
                <Link
                  href="/pourquoi-moket"
                  className="hover:underline">
                  Pourquoi MOKET
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifs"
                  className="hover:underline">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/devis"
                  className="hover:underline">
                  Demander un devis
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <nav
            aria-label="Contact"
            className="space-y-3 text-center lg:text-left">
            <h4 className="font-medium text-slate-900">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <a
                  href="mailto:contact@moket.fr"
                  className="inline-flex items-center justify-center lg:justify-start gap-2 hover:underline">
                  <Mail className="h-4 w-4" />
                  <span>contact@moket.fr</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+33635090095"
                  className="inline-flex items-center justify-center lg:justify-start gap-2 hover:underline">
                  <Phone className="h-4 w-4" />
                  <span>06 35 09 00 95</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/mentions-legales"
                  className="hover:underline">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="hover:underline">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <Separator className="mx-auto bg-slate-200/70" />

      {/* Lower */}
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-slate-600">© {year} MOKET. Tous droits réservés.</p>
        <div className="flex items-center gap-4 text-xs text-slate-700">
          <Link
            href="/mentions-legales"
            className="hover:underline">
            Mentions légales
          </Link>
          <Link
            href="/politique-confidentialite"
            className="hover:underline">
            Confidentialité
          </Link>
          <Link
            href="/tarifs"
            className="hover:underline">
            Tarifs
          </Link>
        </div>
      </div>
    </footer>
  );
}
