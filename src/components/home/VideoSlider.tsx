'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type VideoItem = {
  src: string;
  poster?: string;
};

type Props = {
  videos: VideoItem[];
  autoPlayActive?: boolean;
  /** Démarre l’autoplay après que le LCP soit probable (évite de perturber le rendu initial) */
  startAfterLcpMs?: number;
};

export function VideoSlider({ videos, autoPlayActive = true, startAfterLcpMs = 1200 }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Autoplay "gated" : false au tout début → true après LCP window
  const [autoplayReady, setAutoplayReady] = useState(false);

  useEffect(() => {
    if (!autoPlayActive) return;

    // On attend un peu + un frame, pour laisser le navigateur peindre le poster (LCP friendly)
    const t = window.setTimeout(() => {
      requestAnimationFrame(() => setAutoplayReady(true));
    }, startAfterLcpMs);

    return () => window.clearTimeout(t);
  }, [autoPlayActive, startAfterLcpMs]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Play uniquement la vidéo du slide actif, pause les autres
  useEffect(() => {
    if (!emblaApi) return;

    const slides = emblaApi.slideNodes();
    slides.forEach((slideEl, i) => {
      const video = slideEl.querySelector('video') as HTMLVideoElement | null;
      if (!video) return;

      if (i === selectedIndex) {
        if (autoPlayActive && autoplayReady) {
          video.muted = true;
          video.playsInline = true;
          void video.play().catch(() => {});
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [emblaApi, selectedIndex, autoPlayActive, autoplayReady]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const canScrollPrev = emblaApi?.canScrollPrev() ?? true;
  const canScrollNext = emblaApi?.canScrollNext() ?? true;

  return (
    <div className="relative rounded-2xl">
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl">
        <div className="flex touch-pan-y">
          {videos.map((v, i) => {
            const isActive = i === selectedIndex;

            return (
              <div
                key={v.src}
                className="min-w-0 flex-[0_0_100%]"
                aria-hidden={!isActive}>
                <div className="aspect-video overflow-hidden rounded-xl">
                  <video
                    className="h-full w-full object-cover"
                    // Important : l’attribut autoplay seul ne suffit pas; on gate via JS
                    autoPlay={false}
                    muted
                    loop
                    playsInline
                    // Critique LCP : ne pas précharger la vidéo avant autoplayReady
                    preload={autoPlayActive && autoplayReady && isActive ? 'metadata' : 'none'}
                    poster={v.poster}
                    controls={false}>
                    <source
                      src={v.src}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute hidden md:block cursor-pointer left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 px-3 py-2 text-sm shadow-sm backdrop-blur disabled:opacity-40"
        aria-label="Previous video">
        <ArrowLeft className="text-black" />
      </Button>

      <Button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute hidden md:block cursor-pointer right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 px-3 py-2 text-sm shadow-sm backdrop-blur disabled:opacity-40"
        aria-label="Next video">
        <ArrowRight className="text-black" />
      </Button>

      <div className="flex justify-center gap-2 pt-3 pb-3">
        {videos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className={['h-2.5 w-2.5 rounded-full border border-border transition', i === selectedIndex ? 'bg-foreground' : 'bg-transparent'].join(' ')}
            aria-label={`Go to video ${i + 1}`}
            aria-current={i === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
}
