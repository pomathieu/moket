'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);

type NavItem = { href: string; label: string; desc?: string };

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const nav: NavItem[] = useMemo(
    () => [
      { href: '/admin', label: 'Dashboard', desc: 'Vue d’ensemble' },
      { href: '/admin/quotes', label: 'Devis', desc: 'Inbox & suivi' },
      { href: '/admin/settings', label: 'Réglages', desc: 'Accès & config' },
    ],
    [],
  );

  async function signOut() {
    // Déconnexion Supabase (supprime la session)
    await supabase.auth.signOut();

    // Redirection home
    router.replace('/');
    router.refresh();
  }

  function NavLinks({ compact = false }: { compact?: boolean }) {
    return (
      <nav className={cn('flex flex-col gap-1', compact && 'gap-0.5')}>
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/')) || (item.href === '/admin' && pathname === '/admin');

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn('group rounded-xl px-3 py-2 transition', active ? 'bg-accent text-white' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900')}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                {active ? <span className="text-[11px] rounded-full bg-white/15 px-2 py-0.5">actif</span> : null}
              </div>
              {!compact && item.desc ? <div className={cn('text-xs mt-0.5', active ? 'text-white/70' : 'text-zinc-500 group-hover:text-zinc-600')}>{item.desc}</div> : null}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Topbar mobile */}
      <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur md:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            aria-label="Ouvrir le menu">
            Menu
          </button>

          <Link
            href="/admin"
            className="text-sm font-semibold">
            Admin
          </Link>

          <button
            type="button"
            onClick={signOut}
            className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            Déconnexion
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[84%] max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <div className="text-sm font-semibold">Admin</div>
                <div className="text-xs text-zinc-500">Navigation</div>
              </div>
              <button
                className="rounded-xl border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
                onClick={() => setOpen(false)}>
                Fermer
              </button>
            </div>

            <div className="p-3">
              <NavLinks />
              <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                <button
                  type="button"
                  onClick={signOut}
                  className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                  Déconnexion
                </button>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="mt-2 block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-center text-sm hover:bg-zinc-50">
                  Retour au site
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shell desktop */}
      <div className="mx-auto grid w-full grid-cols-1 gap-0 md:grid-cols-[260px_1fr]">
        {/* Sidebar desktop */}
        <aside className="hidden md:sticky md:top-0 md:block md:h-screen md:border-r md:bg-white">
          <div className="flex h-full flex-col">
            <div className="px-5 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Admin</div>
                  <div className="text-xs text-zinc-500">MOKET</div>
                </div>
                <Link
                  href="/"
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs hover:bg-zinc-50">
                  Site
                </Link>
              </div>

              <div className="mt-5">
                <NavLinks />
              </div>
            </div>

            <div className="mt-auto border-t p-5">
              <button
                type="button"
                onClick={signOut}
                className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                Déconnexion
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-h-[calc(100vh-56px)] md:min-h-screen">
          <div className="mx-auto w-full px-4 py-6 md:px-6 md:py-8">
            {/* Header desktop (optionnel) */}
            <div className="mb-6 hidden md:flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Admin</div>
                <div className="text-sm text-zinc-500">Gestion & suivi</div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
                  Retour au site
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                  Déconnexion
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div className="p-4 md:p-6">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
