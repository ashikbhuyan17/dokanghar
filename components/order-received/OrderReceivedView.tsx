import Link from 'next/link';
import Image from 'next/image';
import { Noto_Sans_Bengali } from 'next/font/google';
import { CheckCircle2, Lock, Smile, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatPriceInt } from '@/lib/utils';

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ORDER_STEPS = [
  { key: 'pending', label: 'Pending', active: true },
  { key: 'confirmed', label: 'Confirmed', active: false },
  { key: 'ongoing', label: 'On Going', active: false },
  { key: 'canceled', label: 'Canceled', active: false },
] as const;

/** Demo payload — replace with API data later */
const demo = {
  orderId: 'DG0050913',
  statusLabel: 'Order has been Pending',
  customer: {
    name: 'test',
    phone: '01647368141',
    address: 'dhaka',
  },
  lines: [
    {
      name: 'Electric Chainsaw',
      qty: 2,
      unitPrice: 3900,
      image:
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=160&h=160&fit=crop',
    },
  ],
  courier: 60,
  discount: 0,
  paid: 0,
  vat: 0,
};

function subtotal(lines: typeof demo.lines) {
  return lines.reduce((s, l) => s + l.qty * l.unitPrice, 0);
}

export default function OrderReceivedView() {
  const sub = subtotal(demo.lines);
  const total = sub + demo.courier - demo.discount + demo.vat;
  const cod = total - demo.paid;

  return (
    <div
      className={cn(
        notoBengali.className,
        ' px-4 pb-16 pt-8 md:max-w-5xl mx-auto md:pt-12',
      )}
    >
      {/* Success */}
      <section className="flex flex-col items-center text-center">
        <div
          className="mb-5 flex size-16 items-center justify-center rounded-full bg-emerald-500 shadow-md shadow-emerald-500/25 ring-4 ring-emerald-500/15 md:size-[72px]"
          aria-hidden
        >
          <CheckCircle2
            className="size-9 text-white md:size-10"
            strokeWidth={2.25}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          অভিনন্দন !!!
        </h1>
        <p className="mt-2 text-base font-semibold text-emerald-600 md:text-lg">
          আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          কিছুক্ষণের মধ্যেই আপনাকে মেসেজ অথবা কল করা হবে |
        </p>
        <Button
          asChild
          size="lg"
          className="mt-6 rounded-full px-8 font-semibold shadow-md"
        >
          <Link href="/">Shop More</Link>
        </Button>
      </section>

      {/* Order card */}
      <section className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:mt-12">
        <div className="bg-rose-600 px-4 py-3 text-center text-sm font-semibold text-white md:text-base">
          Current Status : {demo.statusLabel}
        </div>

        {/* Customer grid */}
        <div className="divide-y divide-border border-b border-border">
          {(
            [
              ['Order ID', demo.orderId],
              ['Order Status', demo.statusLabel],
              ['Customer Name', demo.customer.name],
              ['Customer Phone', demo.customer.phone],
              ['Customer address', demo.customer.address],
            ] as const
          ).map(([label, value], i) => (
            <div
              key={label}
              className={cn(
                'grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[minmax(0,200px)_1fr] sm:gap-6',
                i % 2 === 0 ? 'bg-muted/35' : 'bg-card',
              )}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">
                {label}
              </span>
              <span className="text-sm font-medium text-foreground sm:text-base">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Stepper — only Pending visually active */}
        <div className="border-b border-border px-3 py-6 md:px-6">
          <div className="flex items-start justify-between gap-1 md:gap-2">
            {ORDER_STEPS.map((step, i) => {
              const active = step.active;
              const isLast = i === ORDER_STEPS.length - 1;
              return (
                <div
                  key={step.key}
                  className="relative flex min-w-0 flex-1 flex-col items-center"
                >
                  {!isLast && (
                    <div
                      className="absolute left-[calc(50%+14px)] top-[14px] z-0 hidden h-0.5 w-[calc(100%-28px)] bg-border sm:block"
                      aria-hidden
                    />
                  )}
                  <div
                    className={cn(
                      'relative z-1 flex size-7 items-center justify-center rounded-full text-xs font-bold tabular-nums sm:size-9 sm:text-sm',
                      active
                        ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-600/20'
                        : 'cursor-not-allowed bg-muted text-muted-foreground opacity-55 ring-1 ring-border',
                    )}
                    aria-current={active ? 'step' : undefined}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={cn(
                      'mt-2 max-w-18 text-center text-[10px] font-medium leading-tight sm:max-w-none sm:text-xs',
                      active
                        ? 'font-semibold text-rose-600'
                        : 'text-muted-foreground opacity-60',
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products */}
        <div className="px-4 py-5 md:px-6">
          <div className="hidden grid-cols-[1fr_80px_100px] gap-3 border-b border-border pb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground sm:grid">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Price</span>
          </div>
          <ul className="divide-y divide-border">
            {demo.lines.map((line, idx) => (
              <li
                key={idx}
                className="flex flex-col gap-3 py-4 first:pt-2 sm:grid sm:grid-cols-[1fr_80px_100px] sm:items-center sm:gap-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-medium leading-snug text-foreground sm:text-base">
                    {line.name}
                  </span>
                </div>
                <span className="text-sm sm:text-center sm:text-base">
                  {line.qty}
                </span>
                <span className="text-sm font-semibold tabular-nums sm:text-right sm:text-base">
                  {formatPriceInt(line.unitPrice)} Tk
                </span>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <dl className="ml-auto mt-4 max-w-xs space-y-2 border-t border-border pt-4 text-sm">
            {(
              [
                ['Courier Charge', `${formatPriceInt(demo.courier)} Tk`],
                ['Total', `${formatPriceInt(total)} Tk`],
                ['Discount', `${formatPriceInt(demo.discount)} Tk`],
                ['Paid', `${formatPriceInt(demo.paid)} Tk`],
                ['Vat', `${formatPriceInt(demo.vat)} Tk`],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium tabular-nums text-foreground">
                  {v}
                </dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 rounded-lg bg-muted/60 px-3 py-2.5 font-semibold">
              <dt>Cash On Delivery</dt>
              <dd className="tabular-nums">{formatPriceInt(cod)} Tk</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Trust */}
      <section className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-3 md:gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Lock className="size-6" strokeWidth={2} />
          </div>
          <h3 className="text-sm font-semibold text-foreground md:text-base">
            All secure payment methods
          </h3>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground md:text-sm">
            Bkash, Nagad, Rocket, Bank
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Smile className="size-6" strokeWidth={2} />
          </div>
          <h3 className="text-sm font-semibold text-foreground md:text-base">
            Satisfaction guaranteed
          </h3>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground md:text-sm">
            Made with premium quality materials.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Truck className="size-6" strokeWidth={2} />
          </div>
          <h3 className="text-sm font-semibold text-foreground md:text-base">
            All Bangladesh Delivery
          </h3>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground md:text-sm">
            We use trusted couriers to deliver your products nationwide.
          </p>
        </div>
      </section>
    </div>
  );
}
