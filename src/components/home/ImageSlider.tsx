'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type ImageItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type Props = {
  images: ImageItem[];
  autoPlayActive?: boolean;
  intervalMs?: number;
  /** Contrôle la "hauteur" visuelle du slider */
  heightClass?: string; // ex: "h-[360px] md:h-[520px]"
};

export function ImageSlider({ images, autoPlayActive = true, intervalMs = 3500, heightClass = 'h-[320px] md:h-[460px]' }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const timerRef = useRef<number | null>(null);
  const isHoverRef = useRef(false);
  const isPointerDownRef = useRef(false);

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (!autoPlayActive || !emblaApi) return;
    if (timerRef.current) return;

    timerRef.current = window.setInterval(() => {
      // pause si hover ou drag
      if (isHoverRef.current || isPointerDownRef.current) return;
      emblaApi.scrollNext();
    }, intervalMs);
  }, [autoPlayActive, emblaApi, intervalMs]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // détecte drag
    emblaApi.on('pointerDown', () => {
      isPointerDownRef.current = true;
    });
    emblaApi.on('pointerUp', () => {
      isPointerDownRef.current = false;
    });

    return () => {
      stop();
    };
  }, [emblaApi, onSelect, stop]);

  useEffect(() => {
    // relance autoplay si embla dispo
    stop();
    start();
    return () => stop();
  }, [start, stop, autoPlayActive, intervalMs, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const canScrollPrev = emblaApi?.canScrollPrev() ?? true;
  const canScrollNext = emblaApi?.canScrollNext() ?? true;

  return (
    <div
      className="relative rounded-2xl"
      onMouseEnter={() => {
        isHoverRef.current = true;
      }}
      onMouseLeave={() => {
        isHoverRef.current = false;
      }}>
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl">
        <div className="flex touch-pan-y">
          {images.map((img, i) => {
            const isActive = i === selectedIndex;

            return (
              <div
                key={img.src}
                className="min-w-0 flex-[0_0_100%]"
                aria-hidden={!isActive}>
                {/* Ici on contrôle la hauteur */}
                <div className={`relative overflow-hidden rounded-xl ${heightClass}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        type="button"
        onClick={() => {
          stop();
          scrollPrev();
          start();
        }}
        disabled={!canScrollPrev}
        className="absolute hidden md:block cursor-pointer left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 px-3 py-2 text-sm shadow-sm backdrop-blur disabled:opacity-40"
        aria-label="Previous image">
        <ArrowLeft className="text-black" />
      </Button>

      <Button
        type="button"
        onClick={() => {
          stop();
          scrollNext();
          start();
        }}
        disabled={!canScrollNext}
        className="absolute hidden md:block cursor-pointer right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 px-3 py-2 text-sm shadow-sm backdrop-blur disabled:opacity-40"
        aria-label="Next image">
        <ArrowRight className="text-black" />
      </Button>

      <div className="flex justify-center gap-2 pt-3 pb-3">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              stop();
              emblaApi?.scrollTo(i);
              start();
            }}
            className={['h-2.5 w-2.5 rounded-full transition', i === selectedIndex ? 'bg-foreground' : 'border border-border bg-transparent'].join(' ')}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
}
