'use server';

import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: z.treeifyError(result.error) };
  }

  const { email, password } = result.data;

  let invalidCredentials = false;

  const res = await api
    .post('/auth/login', { email, password })
    .catch((err) => {
      if (err.status === 401) {
        invalidCredentials = true;
      }
    });

  const data = res?.data || null;

  if (invalidCredentials) {
    return {
      success: false,
      errors: { email: ['Invalid email or password'] },
    };
  }

  if (!invalidCredentials && !data) {
    return {
      success: false,
      errors: { email: ['Something went wrong'] },
    };
  }

  const token = data.access_token;

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  redirect('/dashboard');
}

export async function logout() {}
