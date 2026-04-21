'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/schemas/category';
import HomeCategory from '@/components/home/HomeCategory';

const NAV_BTN =
  'size-9 border border-gray-200/90 bg-white text-emerald-600 shadow-md transition-colors hover:bg-gray-50 hover:text-emerald-700 disabled:pointer-events-none disabled:opacity-35 sm:size-10';

type CategoryCarouselProps = {
  categories: Category[];
  imageBaseUrl: string;
};

export default function CategoryCarousel({
  categories,
  imageBaseUrl,
}: CategoryCarouselProps) {
  if (!categories.length) return null;

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        dragFree: false,
      }}
      className="w-full"
      aria-label="Popular categories"
    >
      <CarouselPrevious
        className={cn(
          NAV_BTN,
          'z-10 -left-1 top-1/2 -translate-y-1/2 sm:left-0',
        )}
      />
      <CarouselContent className="ml-0 gap-5 py-2 pl-9 pr-9 sm:gap-6 sm:py-2.5 sm:pl-12 sm:pr-12 md:gap-7 lg:gap-8">
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="basis-auto shrink-0 grow-0 self-center pl-0"
          >
            <HomeCategory category={category} imageBaseUrl={imageBaseUrl} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext
        className={cn(
          NAV_BTN,
          'z-10 -right-1 top-1/2 -translate-y-1/2 sm:right-0',
        )}
      />
    </Carousel>
  );
}
