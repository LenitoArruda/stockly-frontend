import { api } from '@/lib/api';
import { ProductsFilterProps } from '@/types/product.types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useProducts(params: ProductsFilterProps) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get('/products/paginated', { params });
      return data;
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: { name: string; price: number }) => {
      const { data } = await api.post('/products', newProduct);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...rest
    }: {
      id: number;
      name?: string;
      price?: number;
    }) => {
      const { data } = await api.patch(`/products/${id}`, rest);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
