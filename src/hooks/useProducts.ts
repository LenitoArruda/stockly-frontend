import { api } from '@/lib/api';
import {
  CreateProductProps,
  CreateVariantProps,
  ProductsFilterProps,
  UpdateProductProps,
} from '@/types/product.types';
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';

export function useProducts(params: ProductsFilterProps) {
  return useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get('/products/paginated', { params: { ...params, page: pageParam } });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}

export function useProductById(id: number | string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/by-id/${id}`);
      return data;
    },
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (newProduct: CreateProductProps) => {
      const { data } = await api.post('/products', newProduct);
      return data;
    },
  });
}

export function useCreateVariant() {
  return useMutation({
    mutationFn: async (newProduct: CreateVariantProps) => {
      const { data } = await api.post('/products/variant', newProduct);
      return data;
    },
  });
}

export function useUpdateProduct() {
  return useMutation({
    mutationFn: async ({ id, ...rest }: UpdateProductProps) => {
      const { data } = await api.patch(`/products/${id}`, rest);
      return data;
    },
  });
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/products/${id}`);
    },
  });
}
