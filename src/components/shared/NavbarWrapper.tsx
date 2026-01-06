'use client';

import { useEffect, useRef, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export default function NavbarWrapper({ children }: PropsWithChildren) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const current = window.scrollY;

      if (current < 10) {
        header.classList.remove('shadow-sm', 'border-b');
        header.classList.add('bg-transparent');
      } else if (current > lastScrollY && current > 40) {
        header.classList.add('-translate-y-full');
      } else {
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
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn('fixed top-0 z-50 w-full transition-all duration-300 ease-out', 'bg-[#F7F7F5]/80 backdrop-blur-xl border-slate-200/70')}>
      {children}
    </header>
  );
}
