'use client';
import { Box } from '@radix-ui/themes';
import Image from 'next/image';

export function Header() {
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <header className="h-[60px] bg-white flex items-center px-6 shadow-md">
      <Box className="cursor-pointer" onClick={handleLogoClick}>
        <Image src="/stockly-full-logo.svg" alt="Stockly Logo" width={120} height={120} />
      </Box>
    </header>
  );
}
