'use client';

import { useLogoutUser } from '@/hooks/useAuth';

export function LogoutButton() {
  const { mutate: logout } = useLogoutUser();

  const handleLogout = async () => {
    logout();
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
