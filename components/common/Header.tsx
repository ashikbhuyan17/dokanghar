import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { fetcher } from '@/lib/fetcher';
import SearchBar from './SearchBar';
import SigninBtn from './SigninBtn';

export default async function Header({
  settings,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
}) {
  const data = settings;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cartProducts: any = null;
  try {
    cartProducts = await fetcher('/cart-products');
  } catch {
    // Handle error gracefully
  }
  const cartCount = cartProducts?.data?.length ?? 0;

  const iconBtn =
    'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-border transition-all hover:bg-white hover:shadow-md hover:ring-primary/30 active:scale-[0.97]';

  return (
    <header className="fixed top-0 z-40 w-full border-b border-primary/20 bg-linear-to-b from-muted/80 to-muted/40 shadow-sm backdrop-blur-md md:ml-56 md:w-[calc(100%-14rem)]">
      <div className="px-4 py-3 md:px-6 md:py-3.5">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-3 md:gap-5">
          <div className="flex shrink-0 items-center gap-2 md:w-2/12">
            <Link
              href="/"
              prefetch
              aria-label="Go to homepage"
              className="rounded-lg outline-none ring-offset-2 ring-offset-muted transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <Image
                alt="Logo"
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data?.data?.dark_logo ?? data?.data?.white_logo}`}
                width={200}
                height={64}
                className="h-9 w-auto max-w-[160px] object-contain md:h-11 md:max-w-[200px]"
                priority
              />
            </Link>
          </div>

          <div className="flex min-w-0 flex-1 items-center md:max-w-2/6">
            <SearchBar />
          </div>

          <div className="hidden items-center justify-end gap-2 md:flex md:w-2/6 md:gap-3 md:pr-6">
            <Link
              prefetch
              href="/cart"
              aria-label={
                cartCount > 0 ? `View cart (${cartCount} items)` : 'View cart'
              }
              className={iconBtn}
            >
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white shadow-sm">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <SigninBtn />
          </div>
        </div>
      </div>
    </header>
  );
}
