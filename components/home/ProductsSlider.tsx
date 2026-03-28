import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "../common/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductsSlider({
  title,
  image,
  categorySlug,
  products,
}: {
  title: string;
  image: string;
  /** Same slug as category carousel / menu — encodes to `/category/...` */
  categorySlug?: string | null;
  products: any;
}) {
  const categoryHref = categorySlug
    ? `/category/${encodeURIComponent(categorySlug)}`
    : null;

  return (
    <div className="bg-white px-4 py-2 pb-4 rounded-sm border-border max-w-[94vw] select-none">
      <div className="mx-2 my-4 flex flex-wrap items-center gap-2 gap-y-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-primary">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${image}`}
            alt={title}
            width={28}
            height={28}
            className="size-7 shrink-0 rounded object-cover"
          />
          <h2 className="min-w-0 truncate text-base font-bold sm:text-lg">
            {title}
          </h2>
        </div>
        {categoryHref ? (
          <Link
            href={categoryHref}
            prefetch
            className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
          >
            VIEW ALL
            <ArrowRight className="size-3.5 shrink-0 opacity-95 sm:size-4" strokeWidth={2.25} aria-hidden />
          </Link>
        ) : null}
      </div>
      <Carousel>
        <CarouselContent>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {products?.map((product: any) => (
            <CarouselItem
              className="basis-1/2 sm:basis-1/4 lg:basis-1/6"
              key={product?.id}
            >
              <ProductCard
                title={product?.name}
                slug={product?.slug}
                image={product?.image?.image}
                newPrice={product?.new_price}
                oldPrice={product?.old_price}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default ProductsSlider;
