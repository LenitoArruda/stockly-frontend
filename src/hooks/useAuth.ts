import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { UserRoleProps } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';

async function fetchMe(): Promise<UserRoleProps> {
  const { data } = await api.get('/auth/me');
  return data;
}

export function useAuthUser() {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: fetchMe,
    retry: false,
  });
}

async function logoutUser() {
  await api.post('/auth/logout', {}, { withCredentials: true });
}

export function useLogoutUser() {
  return useMutation({
    mutationFn: logoutUser,
  });
}
