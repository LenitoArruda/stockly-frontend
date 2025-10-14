'use client';
import { Header } from '../header';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer(props: PageContainerProps) {
  const { children } = props;
  const user = useSelector((state: RootState) => state.userReducer.user);

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Header />}

      <main className="bg-gray-100 p-6 flex-1 flex overflow-auto">
        {children}
      </main>
    </div>
  );
}
