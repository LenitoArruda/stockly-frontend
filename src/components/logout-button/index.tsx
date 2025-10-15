'use client';

import { useLogoutUser } from '@/hooks/useAuth';
import { DefaultButton } from '../default-button';

export function LogoutButton() {
  const { mutate: logout } = useLogoutUser();

  const handleLogout = async () => {
    logout();
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.clear();
    window.location.reload();
  };

  return <DefaultButton onClick={handleLogout}>Logout</DefaultButton>;
}
