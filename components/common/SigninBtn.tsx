'use client';

import { User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/fetcher';

function SigninBtn() {
  const pathname = usePathname();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userData: any = await fetcher('/user-profile');
      if (userData?.data?.email) {
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch {
      // User not logged in
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Refresh user data when pathname changes (e.g., after login/logout)
  useEffect(() => {
    if (!loading) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handlePush = () => {
    if (user?.data?.email) {
      router.push('/account');
    } else {
      if (pathname === '/signin') {
        return;
      } else {
        const signinUrl = `/signin?redirect=${encodeURIComponent(pathname || '/')}`;
        router.push(signinUrl);
      }
    }
  };

  const avatarBtn =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-border transition-all hover:bg-white hover:shadow-md hover:ring-primary/30 active:scale-[0.97]';

  if (loading) {
    return (
      <button
        className={`${avatarBtn} cursor-wait opacity-80`}
        disabled
        aria-label="Loading"
      >
        <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePush}
      aria-label={user?.data?.name ? 'Account menu' : 'Sign in'}
      className="flex h-10 items-center gap-2.5 rounded-full outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
    >
      {user?.data?.name ? (
        <div className={avatarBtn}>
          <span className="text-base font-bold">
            {user?.data?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
      ) : (
        <div className={avatarBtn}>
          <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} />
        </div>
      )}

      {user?.data?.name && (
        <div className="hidden min-w-0 flex-col items-start text-left text-foreground lg:flex">
          <p className="max-w-[140px] truncate text-sm font-semibold leading-tight">
            {user.data.name}
          </p>
          <p className="max-w-[140px] truncate text-xs font-medium text-muted-foreground">
            {user.data.email}
          </p>
        </div>
      )}
    </button>
  );
}

export default SigninBtn;
