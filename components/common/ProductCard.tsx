import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { formatPriceInt, getDiscountPercent } from '@/lib/utils';
import ProductCardActions from '@/components/common/ProductCardActions';

export default function ProductCard({
  slug,
  image,
  title,
  newPrice,
  oldPrice,
  discountPercent,
}: {
  slug: string;
  image: string;
  title: string;
  newPrice: number;
  oldPrice?: number;
  discountPercent?: number;
}) {
  const newP = Number(newPrice);
  const oldP = oldPrice != null ? Number(oldPrice) : 0;
  const discount =
    discountPercent != null ? discountPercent : getDiscountPercent(newP, oldP);

  const productHref = `/product/${slug}`;
  const imgSrc = `${process.env.NEXT_PUBLIC_IMG_URL}/${image}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-0 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardContent className="flex flex-1 flex-col gap-0 p-0">
        <Link
          href={productHref}
          prefetch
          className="relative block aspect-square w-full overflow-hidden bg-neutral-50 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label={`View product: ${title}`}
        >
          {discount > 0 && (
            <span className="absolute right-2 top-2 z-10 rounded-md bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              −{discount}%
            </span>
          )}
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 180px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-2 p-3 pt-2.5">
          <Link
            href={productHref}
            prefetch
            className="line-clamp-2 min-h-10 text-left text-sm font-semibold leading-snug tracking-tight text-neutral-900 transition-colors hover:text-primary"
          >
            {title}
          </Link>

          <div className="mt-auto space-y-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-base font-bold tabular-nums text-primary sm:text-lg">
                ৳{formatPriceInt(newP)}
              </span>
              {oldP > 0 && oldP > newP && (
                <span className="text-xs font-medium tabular-nums text-neutral-400 line-through sm:text-sm">
                  ৳{formatPriceInt(oldP)}
                </span>
              )}
            </div>

            <ProductCardActions slug={slug} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
