import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "../common/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <Button
            asChild
            variant="outline"
            className="ml-auto h-auto shrink-0 whitespace-nowrap rounded-lg border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <Link
              href={categoryHref}
              prefetch
              className="flex items-center gap-2"
            >
              <LayoutGrid className="size-4 shrink-0 text-primary" aria-hidden />
              <span className="text-sm font-medium">View all</span>
              <ArrowRight className="size-4 shrink-0 text-gray-600" aria-hidden />
            </Link>
          </Button>
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
