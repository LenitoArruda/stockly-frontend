'use client';

import { DefaultButton } from '@/components/default-button';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <DefaultButton type="submit" disabled={pending}>
      Login
    </DefaultButton>
  );
}
