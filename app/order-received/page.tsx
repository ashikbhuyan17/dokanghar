import type { Metadata } from 'next';
import OrderReceivedView from '@/components/order-received/OrderReceivedView';

export const metadata: Metadata = {
  title: 'Order received',
  description: 'Your order has been placed successfully.',
};

export default function OrderReceivedPage() {
  return (
    <main className="min-h-[80vh] bg-background">
      <OrderReceivedView />
    </main>
  );
}
