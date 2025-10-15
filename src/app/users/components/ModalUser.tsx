'use client';
import { DefaultButton } from '@/components/default-button';
import { ErrorMessage } from '@/components/error-message';
import { ModalDefault } from '@/components/modal-default';
import { useCreateUser, useUsers } from '@/hooks/useUsers';
import { User } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface ModalUserProps {
  user: User | null;
  modalUser: boolean;
  onClose: () => void;
}

export function ModalUser(props: ModalUserProps) {
  const { user, modalUser, onClose } = props;

  const userSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });

  type UserFormData = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const { mutate, isPending, isSuccess } = useCreateUser();
  const { data: users } = useUsers();
  const queryClient = useQueryClient();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onCloseModal = () => {
    onClose();
    reset();
    setIsAdmin(false);
    setError(null);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const onSubmit = (data: UserFormData) => {
    const emailExists = users?.some(
      (userItem: User) => userItem.email === data.email,
    );
    if (emailExists) {
      setError('Email already exists');
      return;
    }
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      role: isAdmin ? 'admin' : 'manager',
    });
  };

  useEffect(() => {
    if (modalUser) {
      reset({
        name: user?.name || '',
        email: user?.email || '',
      });
    } else {
      reset();
      setIsAdmin(false);
      setError(null);
    }
  }, [modalUser, reset, user]);

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <ModalDefault
      open={modalUser}
      onClose={onClose}
      title={'Create User'}
      className="w-[90vw] lg:w-[70vw]  xl:w-[50vw]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col align-between  gap-2 w-full h-[calc(100vh-200px)] md:h-fit overflow-y-auto "
      >
        <Box className="flex flex-wrap gap-5 w-full">
          <div>
            <label className="block font-medium">Name</label>

            <input
              type="text"
              {...register('name')}
              className="w-[270px] border p-2 rounded"
            />

            <ErrorMessage
              message={errors?.name?.message || ''}
              visible={!!errors.name}
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>

            <input
              type="text"
              {...register('email')}
              className="w-[270px] border p-2 rounded"
            />

            <ErrorMessage
              message={errors?.email?.message || ''}
              visible={!!errors.email}
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>

            <input
              type="password"
              {...register('password')}
              className="w-[270px] border p-2 rounded"
            />

            <ErrorMessage
              message={errors?.password?.message || ''}
              visible={!!errors.password}
            />
          </div>
          <div className="w-full">
            <div className="flex gap-2 justify-start items-center">
              <label className="block font-medium">Make user admin</label>

              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>

            <ErrorMessage message="" visible={false} />
          </div>
        </Box>
        <Box className="w-full flex justify-center">
          <DefaultButton type="submit" disabled={isSubmitting || isPending}>
            Save User
          </DefaultButton>
        </Box>
        <ErrorMessage message={error || ''} visible={!!error} />
      </form>
    </ModalDefault>
  );
}
