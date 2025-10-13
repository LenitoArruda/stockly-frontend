'use client';

import { Button } from '@radix-ui/themes';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="border border-blue-500 bg-blue-500 hover:bg-[#2773e5] text-white transition-colors cursor-pointer rounded-md p-2 w-[100px]"
    >
      Login
    </Button>
  );
}
