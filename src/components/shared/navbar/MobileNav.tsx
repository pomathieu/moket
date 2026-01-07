'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, Sparkles, MapPin, Info, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';

const items = [
  { label: 'Devis', href: '/devis' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Notre méthode', href: '/notre-methode' },
  { label: 'Pourquoi MOKET', href: '/pourquoi-moket' },
];

const services = [
  { label: 'Matelas', href: '/services/matelas' },
  { label: 'Canapé en tissu', href: '/services/canape-tissu' },
  { label: 'Tapis', href: '/services/tapis' },
  { label: 'Moquette', href: '/services/moquette' },
  { label: 'Tous les services', href: '/services' },
];

const zones = [
  { label: 'Paris', href: '/zones/paris' },
  { label: 'Hauts-de-Seine', href: '/zones/hauts-de-seine' },
  { label: 'Val-de-Marne', href: '/zones/val-de-marne' },
  { label: 'Yvelines', href: '/zones/yvelines' },
  { label: 'Seine-Maritime', href: '/zones/seine-maritime' },
  { label: 'Calvados', href: '/zones/calvados' },
  { label: 'Toutes les zones', href: '/zones' },
];

export default function MobileNav() {
  const pathname = usePathname();

  // ✅ contrôle du Sheet
  const [open, setOpen] = React.useState(false);

  // ✅ ferme automatiquement dès que la route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ✅ ferme aussi sur click (utile si href = même page, ancres, etc.)
  const close = React.useCallback(() => setOpen(false), []);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="sm"
          variant="accent"
          className="rounded-full cursor-pointer"
          aria-label="Ouvrir le menu">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={['w-screen sm:w-105 bg-[#F7F7F5] p-0 scrollbar-none', 'flex flex-col', 'max-h-dvh'].join(' ')}>
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-4">
          <SheetTitle className="text-left">
            <div className="text-3xl pl-2 font-black tracking-tight text-primary">MOKET</div>
          </SheetTitle>

          <SheetClose asChild>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full cursor-pointer absolute top-6 right-4"
              aria-label="Fermer le menu">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <Separator className="bg-slate-200/70" />

        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-5 py-5">
          <div className="space-y-5">
            {/* Quick links */}
            <SectionTitle
              icon={<Info className="h-4 w-4" />}
              label="Accès rapide"
            />
            <div className="grid grid-cols-2 gap-2">
              <QuickPill
                href="/devis"
                label="Devis"
                active={pathname === '/devis'}
                onNavigate={close}
              />
              <QuickPill
                href="/tarifs"
                label="Tarifs"
                active={pathname === '/tarifs'}
                onNavigate={close}
              />
              <QuickPill
                href="/notre-methode"
                label="Méthode"
                active={pathname === '/notre-methode'}
                onNavigate={close}
              />
              <QuickPill
                href="/pourquoi-moket"
                label="Pourquoi"
                active={pathname === '/pourquoi-moket'}
                onNavigate={close}
              />
            </div>

            <Separator className="bg-slate-200/70" />

            {/* Services */}
            <SectionTitle
              icon={<Sparkles className="h-4 w-4" />}
              label="Services"
            />
            <div className="space-y-1">
              {services.map((s) => (
                <NavRow
                  key={s.href}
                  href={s.href}
                  label={s.label}
                  active={pathname === s.href}
                  onNavigate={close}
                />
              ))}
            </div>

            <Separator className="bg-accent-200/70" />

            {/* Zones */}
            <SectionTitle
              icon={<MapPin className="h-4 w-4" />}
              label="Zones"
            />
            <div className="space-y-1">
              {zones.map((z) => (
                <NavRow
                  key={z.href}
                  href={z.href}
                  label={z.label}
                  active={pathname === z.href}
                  onNavigate={close}
                />
              ))}
            </div>

            <Separator className="bg-slate-200/70" />

            {/* Infos */}
            <SectionTitle
              icon={<Info className="h-4 w-4" />}
              label="Infos"
            />
            <div className="space-y-1">
              {items.map((i) => (
                <NavRow
                  key={i.href}
                  href={i.href}
                  label={i.label}
                  active={pathname === i.href}
                  onNavigate={close}
                />
              ))}
            </div>

            <div className="h-24" />
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div className="sticky bottom-0 bg-[#F7F7F5] px-5 py-4 border-t border-slate-200/70">
          <div className="grid grid-cols-2 gap-2">
            <Button
              asChild
              variant="accent"
              className="rounded-xl">
              <Link
                href="/devis"
                onClick={close}>
                Devis
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl">
              <a
                href="tel:+33635090095"
                className="inline-flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </Button>
          </div>
          <p className="mt-2 text-[11px] text-center text-slate-600">Réponse rapide. Intervention à domicile — Paris, Île-de-France, Normandie.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">{label}</div>;
}

function QuickPill({ href, label, active, onNavigate }: { href: string; label: string; active: boolean; onNavigate?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={[
        'rounded-xl border px-3 py-2 text-sm shadow-sm transition',
        active ? 'bg-white border-slate-200/70 text-slate-900' : 'bg-white/70 border-slate-200/50 text-slate-700 hover:bg-white',
      ].join(' ')}>
      {label}
    </Link>
  );
}

function NavRow({ href, label, active, onNavigate }: { href: string; label: string; active: boolean; onNavigate?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={['flex items-center justify-between rounded-xl px-3 py-2 text-sm transition', active ? 'bg-white border border-slate-200/70 text-slate-900' : 'text-slate-700 hover:bg-white/70'].join(
        ' '
      )}>
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}
