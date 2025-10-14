'use client';

import { AppDispatch } from '@/redux/store';
import { logoutUser } from '@/redux/user/slice';
import { useDispatch } from 'react-redux';

export function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
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
