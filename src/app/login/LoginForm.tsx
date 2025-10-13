'use client';

import { login } from './actions';
import { useActionState } from 'react';
import { SubmitButton } from '@/components/submit-button';
import { Box } from '@radix-ui/themes';

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

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
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </Box>

      <Box>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state?.errors?.email}</p>
        )}
      </Box>

      <Box className="flex justify-center w-full">
        <SubmitButton />
      </Box>
    </form>
  );
}
