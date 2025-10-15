'use client';
import { Box } from '@radix-ui/themes';
import Image from 'next/image';
import { LogoutButton } from '../logout-button';

export function Header() {
  const handleLogoClick = () => {
    window.location.href = '/products';
  };

  return (
    <header className="h-[60px] bg-white flex items-center px-6 shadow-md justify-between">
      <Box className="cursor-pointer" onClick={handleLogoClick}>
        <Image
          src="/stockly-full-logo.svg"
          alt="Stockly Logo"
          width={120}
          height={120}
        />
      </Box>
      <LogoutButton />
    </header>
  );
}
