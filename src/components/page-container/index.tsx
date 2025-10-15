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

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.userReducer.user);

  const { data: dataAuthUser, isError } = useAuthUser();

  const userLocalStorage: User = JSON.parse(
    localStorage?.getItem('user') || '{}',
  );

  useEffect(() => {
    if (dataAuthUser) {
      dispatch(setUser(dataAuthUser as unknown as User));
    }
    if (isError) {
      localStorage.removeItem('user');
      dispatch(setUser({} as User));
    }
  }, [dataAuthUser, dispatch, isError]);

  const classNameMain =
    userLocalStorage.id || user?.id
      ? 'bg-gray-100 m-6 p-5 pr-2 flex-1 flex overflow-auto bg-white rounded-xl'
      : 'bg-white flex-1 flex overflow-auto bg-gradient-to-r from-white via-blue-100 to-blue-200';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {(userLocalStorage.id || user?.id) && <Header />}

      <main className={classNameMain}>{children}</main>
    </div>
  );
}
