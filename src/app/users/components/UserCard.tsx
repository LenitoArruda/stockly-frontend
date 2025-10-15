'use client';

import { Box, Card } from '@radix-ui/themes';
import { User } from '@/types/user.types';
interface UserCardProps {
  user: User;
}

export function UserCard(props: UserCardProps) {
  const { user } = props;

  return (
    <Card
      className={`flex flex-col justify-between gap-4 p-4 bg-white rounded-xl shadow-xl border-b-4 border-blue-300 h-fit w-[300px] transform transition duration-300 hover:scale-102 overflow-hidden`}
    >
      <Box className="w-full flex justify-between">
        <Box className="flex gap-1">
          <p className="text-xs font-bold text-gray-500">Name:</p>

          <p className="text-xs italic text-gray-500 truncate">{user?.name}</p>
        </Box>

        <Box className="flex gap-1">
          <p className="text-xs font-bold text-gray-500">Role:</p>

          <p className="text-xs italic text-gray-500 truncate">{user?.role}</p>
        </Box>
      </Box>

      <Box className="w-full flex justify-between">
        <Box className="flex gap-1">
          <p className="text-xs font-bold text-gray-500">Email:</p>

          <p className="text-xs italic text-gray-500 truncate">{user?.email}</p>
        </Box>
      </Box>
    </Card>
  );
}
