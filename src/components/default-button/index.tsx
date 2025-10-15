'use client';

import { Button, ButtonProps } from '@radix-ui/themes';

interface DefaultButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function DefaultButton(props: DefaultButtonProps) {
  const { children, ...buttonProps } = props;

  const classNameDisable = props.disabled
    ? 'border bg-gray-300 text-white transition-colors cursor-default rounded-md px-4 py-[3px] w-fit'
    : 'border border-blue-500 bg-blue-500 hover:bg-[#2773e5] text-white transition-colors cursor-pointer rounded-md px-4 py-[3px] w-fit';

  return (
    <Button className={classNameDisable} {...buttonProps}>
      {children}
    </Button>
  );
}
