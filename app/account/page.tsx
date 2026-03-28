import { Button } from '@/components/ui/button';
import { fetcher } from '@/lib/fetcher';
import StatusCards from '@/components/account/StatusCards';
import Link from 'next/link';
import Image from 'next/image';

export default async function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dashboardOverview: any = await fetcher('/dashboard-overview');

  const pending = dashboardOverview?.data?.pendingOrders ?? 0;
  const processing = dashboardOverview?.data?.ProcessingOrders ?? 0;
  const completed = dashboardOverview?.data?.completeOrders ?? 0;

  return (
    <div className="w-full rounded space-y-4 px-2">
      <StatusCards
        pending={pending}
        processing={processing}
        completed={completed}
        rightSlot={
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center gap-3">
              <Image
                src="/chat-user.svg"
                width={60}
                height={60}
                alt="manager"
                className="object-contain shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm text-gray-800">
                  Open a Support Ticket
                </p>
                <p className="text-xs mt-1 text-gray-500">
                  Submit issues fast and get timely support through tickets.
                </p>
              </div>
            </div>
            <Link prefetch href="/account/support/create" className="mt-auto">
              <Button className="w-full">Get Help Now</Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
