import * as React from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const services = [
  { title: 'Matelas', href: '/services/matelas', desc: 'Anti-odeurs, anti-acariens, taches.' },
  { title: 'Canapé en tissu', href: '/services/canape-tissu', desc: 'Extraction profonde, finition nette.' },
  { title: 'Tapis', href: '/services/tapis', desc: 'Ravive les fibres, enlève les salissures.' },
  { title: 'Moquette', href: '/services/moquette', desc: 'Nettoyage en profondeur, rendu uniforme.' },
];

const zones = [
  { title: 'Paris', href: '/zones/paris' },
  { title: 'Hauts-de-Seine', href: '/zones/hauts-de-seine' },
  { title: 'Val-de-Marne', href: '/zones/val-de-marne' },
  { title: 'Yvelines', href: '/zones/yvelines' },
  { title: 'Toutes les zones', href: '/zones' },
  { title: 'Seine-Maritime', href: '/zones/seine-maritime' },
  { title: 'Calvados', href: '/zones/calvados' },
];

export default function DesktopNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        {/* Services */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" text-sm text-slate-700 hover:text-slate-900">
            <span className="inline-flex items-center gap-2">Services</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-130 p-4">
              <div className="mb-3">
                <Link
                  href="/services"
                  className="text-sm font-semibold text-slate-900 hover:underline">
                  Tous les services
                </Link>
                <p className="text-xs text-slate-600 mt-1">Nettoyage textile profond par injecteur-extracteur professionnel.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {services.map((item) => (
                  <NavCard
                    key={item.href}
                    title={item.title}
                    href={item.href}
                    desc={item.desc}
                  />
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Zones */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm text-slate-700 hover:text-slate-900">
            <span className="inline-flex items-center gap-2">Zones</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-105 p-4">
              <div className="mb-3">
                <Link
                  href="/zones"
                  className="text-sm font-semibold text-slate-900 hover:underline">
                  Zones d’intervention
                </Link>
                <p className="text-xs text-slate-600 mt-1">Paris & Île-de-France — déplacement à domicile.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {zones.map((z) => (
                  <SimpleLink
                    key={z.href}
                    href={z.href}
                    label={z.title}
                  />
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Liens simples */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/tarifs"
            className={linkClassName}>
            Tarifs
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/notre-methode"
            className={linkClassName}>
            Notre méthode
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/pourquoi-moket"
            className={linkClassName}>
            <span className="inline-flex items-center gap-2">Pourquoi MOKET</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const linkClassName = 'text-sm text-slate-700 hover:text-slate-900 rounded-md px-3 py-2 transition-colors';

function NavCard({ title, href, desc }: { title: string; href: string; desc: string }) {
  return (
    <Link
      href={href}
      className={cn('group rounded-xl border border-slate-200/70 bg-white p-3 shadow-sm transition hover:bg-accent  ', 'hover:border-slate-300 hover:shadow')}>
      <div className="text-sm font-semibold text-slate-900 group-hover:text-background">{title}</div>
      <div className="mt-1 text-xs text-slate-600 group-hover:text-background">{desc}</div>
    </Link>
  );
}

function SimpleLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-slate-200/70 bg-white px-3 hover:bg-accent  py-2 text-sm text-slate-700 shadow-sm hover:border-slate-300 hover:text-background transition">
      {label}
    </Link>
  );
}
