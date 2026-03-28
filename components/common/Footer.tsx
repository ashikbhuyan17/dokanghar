import Link from 'next/link';
import { Mail, Phone, MapPin, MapPinned } from 'lucide-react';
import Image from 'next/image';
import { fetcher } from '@/lib/fetcher';
import FooterNewsletter from '@/components/common/FooterNewsletter';

export default async function Footer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const social: any = await fetcher('/social-media');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings: any = await fetcher('/settings');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages: any = await fetcher('/pages');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contact: any = await fetcher('/contact');

  return (
    <footer className="mt-6 overflow-hidden rounded-t-2xl border border-border bg-card shadow-sm">
      <div className="bg-linear-to-r from-primary via-[#ff8f1a] to-primary px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
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

      <div className="bg-linear-to-b from-muted/80 to-muted/40 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-10 xl:gap-12">
            <div className="flex flex-col">
              <div className="mb-5">
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
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {settings?.data?.description}
              </p>
            </div>

            <div>
              <h3 className="mb-5 text-base font-semibold tracking-tight text-foreground">
                <span className="border-b-2 border-primary pb-1">Contact</span>
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
                    {contact?.data?.address}
                  </p>
                </li>
                <li>
                  <Link
                    href={`mailto:${contact?.data?.email}`}
                    className="group flex items-center gap-3 rounded-lg py-0.5 transition-colors hover:text-primary"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary">
                      {contact?.data?.email}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`tel:${contact?.data?.phone}`}
                    className="group flex items-center gap-3 rounded-lg py-0.5 transition-colors hover:text-primary"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Phone className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary">
                      {contact?.data?.phone}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={contact?.data?.maplink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg py-0.5 transition-colors hover:text-primary"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                      <MapPinned className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                      Find us on map
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-base font-semibold tracking-tight text-foreground">
                <span className="border-b-2 border-primary pb-1">
                  Information
                </span>
              </h3>
              <ul className="flex flex-col gap-2.5">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {pages?.data?.map((page: any) => (
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

            <div className="w-full min-w-0 lg:col-span-2">
              <h3 className="mb-5 text-base font-semibold tracking-tight text-foreground">
                <span className="border-b-2 border-primary pb-1">
                  Follow us
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {social?.data?.map((item: any) => (
                  <Link
                    key={item?.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item?.link}
                    aria-label={`Visit our ${item?.title ?? 'social'} page`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-lg shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
                  >
                    <i
                      className={`${item?.icon} fa-lg`}
                      style={{ color: item?.color }}
                    />
                  </Link>
                ))}
              </div>
              <FooterNewsletter />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800/20 bg-zinc-900 px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-7xl text-center text-sm text-zinc-400">
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
