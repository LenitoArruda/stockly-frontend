'use client';
import { DefaultButton } from '@/components/default-button';
import { PageTitle } from '@/components/page-title';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/user.types';
import { Box, Tooltip } from '@radix-ui/themes';
import { UserCard } from './components/UserCard';
import { useState } from 'react';
import { ModalUser } from './components/ModalUser';

export default function Dashboard() {
  const { data: users } = useUsers();

  const [modalUser, setModalUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onClose = () => {
    setModalUser(false);
    setSelectedUser(null);
  };

  return (
    <Box className="flex w-full flex-1 flex-col gap-2">
      <Box className="flex items-center justify-between mr-3">
        <PageTitle title="Users" />
        <Tooltip
          content="New User"
          className="bg-black/50 p-1 rounded text-white text-xs"
        >
          <DefaultButton onClick={() => setModalUser(true)}>+</DefaultButton>
        </Tooltip>
      </Box>

      <Box className="flex-1 w-full flex flex-wrap gap-6 overflow-auto max-h-[calc(100vh-190px)] pr-3 content-start">
        {users?.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>
      <ModalUser user={selectedUser} modalUser={modalUser} onClose={onClose} />
    </Box>
  );
}
