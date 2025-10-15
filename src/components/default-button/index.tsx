'use client';

import { Button, ButtonProps } from '@radix-ui/themes';

interface DefaultButtonProps extends ButtonProps {
  children: React.ReactNode;
  buttonColor?: string;
}

export function DefaultButton(props: DefaultButtonProps) {
  const { children, buttonColor, ...buttonProps } = props;

  const classNameDisable = props.disabled
    ? 'border bg-gray-300 text-white transition-colors cursor-default rounded-md px-4 py-[3px] w-fit'
    : 'border text-white transition-colors cursor-pointer rounded-md px-4 py-[3px] w-fit ' +
      (buttonColor || 'bg-blue-500 hover:bg-[#2773e5]');

  return (
    <Button className={classNameDisable} {...buttonProps}>
      {children}
    </Button>
  );
}
