'use client';

import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';

const emailSchema = z.string().trim().email({ message: 'Enter a valid email' });

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? 'Invalid email';
      toast.error(msg);
      return;
    }

    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) {
      toast.error('Newsletter is not configured.');
      return;
    }

    const path =
      process.env.NEXT_PUBLIC_NEWSLETTER_PATH ?? '/newsletter-subscribe';

    setLoading(true);
    try {
      const res = await fetch(
        `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ email: parsed.data }),
        },
      );

      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        status?: string | boolean;
      };

      if (!res.ok) {
        toast.error(
          typeof data?.message === 'string'
            ? data.message
            : 'Could not subscribe. Try again later.',
        );
        return;
      }

      const failed = data?.status === false || data?.status === 'error';

      if (failed) {
        toast.error(
          typeof data?.message === 'string'
            ? data.message
            : 'Could not subscribe. Try again later.',
        );
        return;
      }

      toast.success(
        typeof data?.message === 'string' && data.message
          ? data.message
          : 'Thanks for subscribing!',
      );
      setEmail('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 w-full min-w-0 border-t border-border pt-3">
      <h4 className="mb-0.5 text-sm font-semibold text-foreground">
        Newsletter
      </h4>
      <p className="mb-2 text-xs leading-snug text-muted-foreground">
        Subscribe for offers and new arrivals.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex w-full min-w-0 flex-col gap-1.5 sm:flex-row sm:items-stretch"
      >
        <Input
          type="email"
          name="newsletter-email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 w-full min-w-0 flex-1 rounded-lg border-border bg-background text-sm shadow-sm"
          disabled={loading}
          autoComplete="email"
          inputMode="email"
          aria-label="Email for newsletter"
        />
        <Button
          type="submit"
          className="h-9 shrink-0 gap-1.5 self-stretch sm:self-auto sm:min-w-30"
          disabled={loading}
        >
          <SendHorizontal className="h-4 w-4" aria-hidden />
          {loading ? '…' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
}
