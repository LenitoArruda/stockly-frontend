'use client';

import { useLogoutUser } from '@/hooks/useAuth';
import { DefaultButton } from '../default-button';

export function LogoutButton() {
  const { mutate: logout } = useLogoutUser();

  const handleLogout = async () => {
    logout();
    localStorage?.clear();
    window.location.href = '/login';
  };

  return <DefaultButton onClick={handleLogout}>Logout</DefaultButton>;
}
