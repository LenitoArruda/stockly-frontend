'use client';

import { login } from '../actions';
import { useActionState, useEffect } from 'react';
import { Box } from '@radix-ui/themes';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/slice';
import { SubmitButton } from './SubmitButton';

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state?.user) {
      const login = async () => {
        dispatch(setUser(state.user));
        localStorage?.setItem('user', JSON.stringify(state.user));
        redirect('/products');
      };
      login();
    }
  }, [dispatch, state]);

  return (
    <form
      action={loginAction}
      className="flex flex-col gap-6 h-full align-center justify-center"
    >
      <h1 className="text-2xl font-bold text-center ">Login</h1>

      <Box>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
      </Box>

      <Box>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
      </Box>

      <Box className="flex justify-center w-full">
        <SubmitButton />
      </Box>
      {state?.error && <p className="text-red-500 text-sm">{state?.error}</p>}
    </form>
  );
}
