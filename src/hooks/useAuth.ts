import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { UserRoleProps } from '@/types/user.types';

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
