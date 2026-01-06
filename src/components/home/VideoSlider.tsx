'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '../ui/button';
import { ArrowBigLeft, ArrowLeft, ArrowRight } from 'lucide-react';

type VideoItem = {
  src: string;
  poster?: string;
};

export function VideoSlider({ videos, autoPlayActive = true }: { videos: VideoItem[]; autoPlayActive?: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

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
        if (autoPlayActive) {
          // Certains navigateurs exigent muted + playsInline pour autoplay
          video.muted = true;
          video.playsInline = true;
          void video.play().catch(() => {});
        }
      } else {
        video.pause();
        video.currentTime = 0; // optionnel: remet au début
      }
    });
  }, [emblaApi, selectedIndex, autoPlayActive]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const canScrollPrev = emblaApi?.canScrollPrev() ?? true;
  const canScrollNext = emblaApi?.canScrollNext() ?? true;

  return (
    <div className="relative rounded-2xl ">
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl">
        {/* Container */}
        <div className="flex touch-pan-y">
          {videos.map((v, i) => (
            <div
              key={v.src}
              className="min-w-0 flex-[0_0_100%] "
              aria-hidden={i !== selectedIndex}>
              <div className="aspect-video overflow-hidden rounded-xl ">
                <video
                  className="h-full w-full object-cover"
                  autoPlay={autoPlayActive && i === selectedIndex}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={v.poster}
                  controls={false}>
                  <source
                    src={v.src}
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
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

      {/* Dots */}
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
