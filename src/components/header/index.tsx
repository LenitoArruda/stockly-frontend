'use client';
import { Box, DropdownMenu, Avatar } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import { LogoutButton } from '../logout-button';
import { useState } from 'react';
import { ListIcon } from '@phosphor-icons/react';
import { User } from '@/types/user.types';

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogoClick = () => {
    window.location.href = '/products';
  };

  const userLocalStorage: User = JSON.parse(
    localStorage?.getItem('user') || '{}',
  );

  const user: User = userLocalStorage;

  return (
    <div className="h-full bg-white flex items-center px-6 shadow-md justify-between">
      <div className="md:hidden">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="cursor-pointer"
        >
          <ListIcon size={24} />
        </button>

        {openMenu && (
          <div className="absolute top-[60px] left-0 bg-white shadow-md border rounded w-40 flex flex-col z-50">
            <Link
              href="/products"
              className="px-4 py-2 hover:bg-blue-100 transition"
              onClick={() => setOpenMenu(false)}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="px-4 py-2 hover:bg-blue-100 transition"
              onClick={() => setOpenMenu(false)}
            >
              Categories
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/users"
                className="px-4 py-2 hover:bg-blue-100 transition"
                onClick={() => setOpenMenu(false)}
              >
                Users
              </Link>
            )}
          </div>
        )}
      </div>

      <Box className="cursor-pointer hidden md:block" onClick={handleLogoClick}>
        <Image
          src="/stockly-full-logo.svg"
          alt="Stockly Logo"
          width={120}
          height={120}
        />
      </Box>

      <div className="flex items-center gap-6 ml-auto">
        <nav className="hidden md:flex gap-4 font-medium text-gray-600">
          <Link
            href="/products"
            className="hover:text-blue-500 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="hover:text-blue-500 transition-colors"
          >
            Categories
          </Link>
          {user?.role === 'admin' && (
            <Link
              href="/users"
              className="hover:text-blue-500 transition-colors"
            >
              Users
            </Link>
          )}
        </nav>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-1 hover:bg-gray-50">
              <Avatar
                size="2"
                src="/default-avatar.png"
                fallback={user?.name.charAt(0).toUpperCase() || 'U'}
                radius="full"
              />
              <span className="hidden sm:inline font-medium text-sm">
                {user?.name}
              </span>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="min-w-[200px] bg-white p-2 rounded shadow p-4 ">
            <DropdownMenu.Label className="font-medium">
              User Info
            </DropdownMenu.Label>
            <DropdownMenu.Item>Email: {user?.email}</DropdownMenu.Item>
            <DropdownMenu.Item>Role: {user?.role}</DropdownMenu.Item>
            <DropdownMenu.Item>
              <LogoutButton />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Box className="cursor-pointer md:hidden" onClick={handleLogoClick}>
          <Image
            src="/stockly-full-logo.svg"
            alt="Stockly Logo"
            width={100}
            height={100}
          />
        </Box>
      </div>
    </div>
  );
}
