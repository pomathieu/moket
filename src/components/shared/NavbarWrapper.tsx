'use client';

import { useEffect, useRef, PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function NavbarWrapper({ children }: PropsWithChildren) {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Fonction unique pour appliquer l'état de la navbar selon le scroll
  function applyState(header: HTMLElement, currentScrollY: number) {
    if (currentScrollY < 10) {
      header.classList.remove('shadow-sm', 'border-b');
      header.classList.add('bg-transparent');
      header.classList.remove('-translate-y-full');
    } else {
      header.classList.remove('-translate-y-full');
      header.classList.add('shadow-sm', 'border-b');
      header.classList.remove('bg-transparent');
    }
  }

  // 1) Scroll behavior
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const current = window.scrollY;

      // Toujours visible près du top
      if (current < 10) {
        header.classList.remove('shadow-sm', 'border-b');
        header.classList.add('bg-transparent');
        header.classList.remove('-translate-y-full');
      } else if (current > lastScrollY && current > 40) {
        // scroll down => hide
        header.classList.add('-translate-y-full');
      } else {
        // scroll up => show
        header.classList.remove('-translate-y-full');
        header.classList.add('shadow-sm', 'border-b');
        header.classList.remove('bg-transparent');
      }

      lastScrollY = current;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // init (au montage)
    applyState(header, window.scrollY);

    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) ✅ Reset à chaque navigation (changement de page)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Force navbar visible immédiatement
    header.classList.remove('-translate-y-full');

    // Recalcule l'état (shadow/bg) selon la position actuelle
    applyState(header, window.scrollY);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={cn('fixed top-0 z-50 w-full transition-all duration-300 ease-out', 'bg-[#F7F7F5]/80 backdrop-blur-xl border-slate-200/70')}>
      {children}
    </header>
  );
}
