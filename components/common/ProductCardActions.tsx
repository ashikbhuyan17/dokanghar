'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProductCardActionsProps = {
  slug: string;
};

export default function ProductCardActions({ slug }: ProductCardActionsProps) {
  const productHref = `/product/${slug}`;

  return (
    <div className="flex gap-2 pt-0.5">
      <Button
        asChild
        size="sm"
        className="h-9 min-w-0 flex-1 rounded-lg text-xs font-semibold shadow-sm sm:text-sm"
      >
        <Link href={productHref} prefetch>
          Buy Now
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="icon"
        className="size-9 shrink-0 rounded-lg border-primary/35 bg-white text-primary shadow-sm hover:bg-primary/10 hover:text-primary"
        title="Add to cart"
      >
        <Link
          href={productHref}
          prefetch
          aria-label={`Add to cart: open product to choose options`}
        >
          <ShoppingCart className="size-4" strokeWidth={2.25} />
        </Link>
      </Button>
    </div>
  );
}
