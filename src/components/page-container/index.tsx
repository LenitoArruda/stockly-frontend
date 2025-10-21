'use client';
import { Header } from '../header';
import { useEffect, useState } from 'react';
import { safeLocalStorage } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/hooks/useAuth';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer(props: PageContainerProps) {
  const { children } = props;

  const router = useRouter();

  const { data, isPending } = useAuthUser();

  const userData = data || undefined

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem('token');
    if (!tokenLocalStorage) {
      localStorage?.clear();
      router.push('/login');
      return;
    }
    setToken(tokenLocalStorage);
  }, [router]);

  useEffect(() => {
    if (!data && token && !isPending) {
      alert('Your session has expired. Please log in again.');
      localStorage?.clear();
      router.push('/login');
    }
  }, [token, isPending, userData, router]);

  const classNameMain = token
    ? 'bg-gray-100 m-6 p-5 pr-2 flex-1 flex overflow-auto bg-white rounded-xl mt-[80px]'
    : 'bg-white flex-1 flex overflow-auto bg-gradient-to-r from-white via-blue-100 to-blue-200';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className='h-[60px] absolute top-0 w-full'>
        {token && <Header />}
      </header>

      <main className={classNameMain}>{children}</main>
    </div>
  );
}
