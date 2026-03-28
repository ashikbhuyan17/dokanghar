'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { Category } from '@/lib/schemas/category';
import HomeCategory from '@/components/home/HomeCategory';

const AUTOPLAY_MS = 2000;

type CategoryCarouselProps = {
  categories: Category[];
  imageBaseUrl: string;
};

export default function CategoryCarousel({
  categories,
  imageBaseUrl,
}: CategoryCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false }),
  );

  if (!categories.length) return null;

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        dragFree: false,
      }}
      plugins={[plugin.current]}
      className="w-full"
      aria-label="Product categories"
    >
      <CarouselContent className="ml-0 gap-3">
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="min-w-0 shrink-0 grow-0 pl-0 basis-[calc((100%-1.5rem)/3)] md:basis-[calc((100%-3.75rem)/6)] lg:basis-[calc((100%-5.25rem)/8)]"
          >
            <HomeCategory category={category} imageBaseUrl={imageBaseUrl} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
