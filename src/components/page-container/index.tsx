'use client';
import { Header } from '../header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { setUser } from '@/redux/user/slice';
import { useEffect } from 'react';
import { useAuthUser } from '@/hooks/useAuth';
import { User } from '@/types/user.types';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer(props: PageContainerProps) {
  const { children } = props;

  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch<AppDispatch>();

  const { data: dataAuthUser } = useAuthUser();

  useEffect(() => {
    if (dataAuthUser) dispatch(setUser(dataAuthUser as unknown as User));
  }, [dataAuthUser, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Header />}

      <main className="bg-gray-100 p-6 flex-1 flex overflow-auto">
        {children}
      </main>
    </div>
  );
}
