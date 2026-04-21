import Link from 'next/link';
import { Mail, Phone, MapPin, MapPinned } from 'lucide-react';
import Image from 'next/image';
import { fetcher } from '@/lib/fetcher';
import FooterNewsletter from '@/components/common/FooterNewsletter';

type PageRow = { id?: number | string; name?: string; slug?: string };

function splitFooterPages(pages: PageRow[] | undefined): {
  about: PageRow[];
  help: PageRow[];
} {
  const list = pages ?? [];
  const about: PageRow[] = [];
  const help: PageRow[] = [];
  const other: PageRow[] = [];
  const aboutRe =
    /about|term|privacy|refund|return|policy|condition|shipping|warranty/i;
  const helpRe =
    /contact|faq|how\s*to|sell\s*on|university|help|support|career|buy/i;

  for (const p of list) {
    const hay = `${p.slug ?? ''} ${p.name ?? ''}`;
    if (aboutRe.test(hay)) about.push(p);
    else if (helpRe.test(hay)) help.push(p);
    else other.push(p);
  }

  const aboutAll = [...about, ...other];

  if (help.length === 0 && aboutAll.length >= 2) {
    const half = Math.ceil(aboutAll.length / 2);
    return {
      about: aboutAll.slice(0, half),
      help: aboutAll.slice(half),
    };
  }

  return { about: aboutAll, help };
}

function pickStoreUrl(data: unknown, keys: string[]): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const o = data as Record<string, unknown>;
  for (const k of keys) {
    const v = o[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return undefined;
}

export default async function Footer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const social: any = await fetcher('/social-media');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings: any = await fetcher('/settings');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages: any = await fetcher('/pages');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contact: any = await fetcher('/contact');

  const { about: aboutPages, help: helpPages } = splitFooterPages(
    pages?.data as PageRow[] | undefined,
  );

  const playStoreUrl = pickStoreUrl(settings?.data, [
    'play_store',
    'google_play',
    'android_app',
    'play_store_url',
    'android_app_link',
  ]);
  const appStoreUrl = pickStoreUrl(settings?.data, [
    'app_store',
    'ios_app',
    'app_store_url',
    'ios_app_link',
    'apple_app',
  ]);

  return (
    <footer className="mt-4 overflow-hidden rounded-t-2xl border border-border bg-card shadow-sm">
      <div className="bg-linear-to-r from-primary via-[#ff8f1a] to-primary px-4 py-2.5 sm:px-6 sm:py-3 lg:px-[60px]">
        <div className="flex w-full flex-col items-center justify-between gap-1.5 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-medium text-primary-foreground/95 sm:text-base">
            Trusted shopping · Secure checkout · Fast delivery
          </p>
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/90 underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
          >
            Continue shopping
          </Link>
        </div>
      </div>

      <div className="bg-white px-4 py-6 sm:px-5 sm:py-7 lg:px-[60px]">
        <div className="w-full">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-12 lg:gap-x-4 lg:gap-y-6 xl:gap-x-5">
            {/* Column 1 — brand, description, contact, follow */}
            <div className="flex w-full min-w-0 flex-col sm:col-span-2 lg:col-span-4">
              <div className="mb-3">
                <Link
                  href="/"
                  prefetch
                  aria-label="Go to homepage"
                  className="inline-block rounded-lg outline-none ring-offset-2 ring-offset-muted transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Image
                    alt="Logo"
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${settings?.data?.dark_logo}`}
                    width={400}
                    height={120}
                    className="h-auto w-40 max-w-full object-contain sm:w-44"
                  />
                </Link>
              </div>
              <p className="max-w-sm text-sm leading-snug text-muted-foreground">
                {settings?.data?.description}
              </p>

              <ul className="mt-4 flex flex-col gap-2">
                <li className="flex gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="pt-0.5 text-sm leading-snug text-muted-foreground">
                    {contact?.data?.address}
                  </p>
                </li>
                <li>
                  <Link
                    href={`tel:${contact?.data?.phone}`}
                    className="group flex items-center gap-2.5 rounded-lg py-0.5 transition-colors hover:text-primary"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Phone className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary">
                      {contact?.data?.phone}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`mailto:${contact?.data?.email}`}
                    className="group flex items-center gap-2.5 rounded-lg py-0.5 transition-colors hover:text-primary"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Mail className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary">
                      {contact?.data?.email}
                    </span>
                  </Link>
                </li>
              </ul>

              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Follow us on
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {social?.data?.map((item: any) => (
                      <Link
                        key={item?.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item?.link}
                        aria-label={`Visit our ${item?.title ?? 'social'} page`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-base shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
                      >
                        <i
                          className={`${item?.icon} fa-lg`}
                          style={{ color: item?.color }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 — About */}
            <div className="w-full min-w-0 sm:col-span-1 lg:col-span-2">
              <h3 className="mb-3 text-base font-semibold uppercase tracking-tight text-foreground">
                <span className="border-b-2 border-primary pb-0.5">About</span>
              </h3>
              <ul className="flex flex-col gap-1.5">
                {aboutPages.map((page) => (
                  <li key={page?.id}>
                    <Link
                      href={`/info/${page?.slug}`}
                      className="inline-flex text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {page?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Help */}
            <div className="w-full min-w-0 sm:col-span-1 lg:col-span-2">
              <h3 className="mb-5 text-base font-semibold uppercase tracking-tight text-foreground">
                <span className="border-b-2 border-primary pb-1">Help</span>
              </h3>
              <ul className="flex flex-col gap-2.5">
                {helpPages.map((page) => (
                  <li key={page?.id}>
                    <Link
                      href={`/info/${page?.slug}`}
                      className="inline-flex text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {page?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Support, newsletter, app downloads */}
            <div className="flex w-full min-w-0 flex-col sm:col-span-2 lg:col-span-4">
              <h3 className="mb-4 text-base font-semibold uppercase tracking-tight text-foreground">
                <span className="border-b-2 border-primary pb-0.5">
                  Need support?
                </span>
              </h3>
              <div className="mb-4 rounded-md border border-border px-2.5 py-2">
                <Link
                  href={`tel:${contact?.data?.phone}`}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {contact?.data?.phone}
                </Link>
              </div>

              <h3 className="mb-4 mt-4 text-base font-semibold uppercase tracking-tight text-foreground">
                <span className="border-b-2 border-primary pb-1">
                  Download app
                </span>
              </h3>
              <div className="flex  items-start gap-3">
                {playStoreUrl ? (
                  <Link
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex transition-opacity hover:opacity-90"
                  >
                    <Image
                      src="/PlayStoreButton.svg"
                      alt="Get it on Google Play"
                      width={160}
                      height={64}
                      className="h-9 w-auto"
                    />
                  </Link>
                ) : (
                  <Image
                    src="/PlayStoreButton.svg"
                    alt="Get it on Google Play"
                    width={160}
                    height={64}
                    className="h-9 w-auto opacity-60"
                  />
                )}
                {appStoreUrl ? (
                  <Link
                    href={appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex transition-opacity hover:opacity-90"
                  >
                    <Image
                      src="/AppStoreButton.svg"
                      alt="Download on the App Store"
                      width={160}
                      height={64}
                      className="h-9 w-auto"
                    />
                  </Link>
                ) : (
                  <Image
                    src="/AppStoreButton.svg"
                    alt="Download on the App Store"
                    width={160}
                    height={64}
                    className="h-9 w-auto opacity-60"
                  />
                )}
              </div>

              <FooterNewsletter />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800/20 bg-zinc-900 px-4 py-3 sm:px-6 lg:px-[60px]">
        <div className="w-full text-center text-sm text-zinc-400">
          <p>
            <span className="text-zinc-500">{settings?.data?.copyright}</span>
            <span className="mx-2 text-zinc-600" aria-hidden>
              |
            </span>
            <span>Developed by </span>
            <Link
              href="https://danpite.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary transition hover:text-[#ff9f33]"
            >
              Danpite.Tech
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
