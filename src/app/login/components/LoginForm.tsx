'use client';

import { login } from '../actions';
import { useActionState, useEffect } from 'react';
import { Box } from '@radix-ui/themes';
import { SubmitButton } from './SubmitButton';
import router from 'next/router';

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.token) {
      localStorage?.setItem('token', state.token);
    }

    if (state?.user) {
      const login = async () => {
        localStorage?.setItem('user', JSON.stringify(state.user));
        window.location.href = '/products';
      };
      login();
    }
  }, [state]);

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
