'use client';
import { Header } from '../header';
import { useEffect, useState } from 'react';
import { safeLocalStorage } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer(props: PageContainerProps) {
  const { children } = props;

  const ls = safeLocalStorage();

  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem('token');
    if (!tokenLocalStorage) {
      localStorage?.clear();
      router.push('/login');
    }
    setToken(tokenLocalStorage);
  }, [ls, router]);

  const classNameMain = token
    ? 'bg-gray-100 m-6 p-5 pr-2 flex-1 flex overflow-auto bg-white rounded-xl'
    : 'bg-white flex-1 flex overflow-auto bg-gradient-to-r from-white via-blue-100 to-blue-200';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {token && <Header />}

      <main className={classNameMain}>{children}</main>
    </div>
  );
}
