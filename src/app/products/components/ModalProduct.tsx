'use client';

import { DefaultButton } from '@/components/default-button';
import { ErrorMessage } from '@/components/error-message';
import { ModalDefault } from '@/components/modal-default';
import { useCategories } from '@/hooks/useCategories';
import { useCreateProduct } from '@/hooks/useProducts';
import { convertDataToSelectOptions } from '@/lib/utils';
import { CreateProductProps, ProductProps } from '@/types/product.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface ModalProductProps {
  product: ProductProps | null;
  modalProduct: boolean;
  setModalProduct: (modalProduct: boolean) => void;
  setSelectedProduct: (selectedProduct: ProductProps | null) => void;
}

export function ModalProduct(props: ModalProductProps) {
  const { product, setSelectedProduct, setModalProduct, modalProduct } = props;

  const { data: dataCategories } = useCategories();

  const onClose = () => {
    setSelectedProduct(null);
    setModalProduct(false);
    reset();
  };

  const productSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    price: z
      .number({ error: 'Price is required' })
      .positive('Price must be greater than 0'),
    stock: z
      .number({ error: 'Stock is required' })
      .positive('Stock must be greater than 0'),
    category: z.string().min(1, 'Category is required'),
  });

  type ProductFormData = z.infer<typeof productSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const { mutate, isPending, isSuccess } = useCreateProduct();

  const onSubmit = (data: ProductFormData) => {
    const date = new Date();
    const bodyRequest: CreateProductProps = {
      name: data.name,
      price: data.price,
      stock: data.stock,
      sku: `SKU-${data.name.slice(0, 2).toUpperCase()}-${date.getTime()}`,
      categoryId: Number(data.category),
    };

    mutate(bodyRequest);
  };
  useEffect(() => {
    if (isSuccess) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <ModalDefault
      open={modalProduct}
      onClose={onClose}
      title={product ? 'Edit Product' : 'New Product'}
      className="w-[90vw] lg:w-[70vw]  xl:w-[50vw]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col align-between  gap-2 w-full"
      >
        <Box className="flex flex-wrap gap-5 w-full">
          <div>
            <label className="block font-medium">Name</label>

            <input
              type="text"
              {...register('name')}
              className="w-[300px] border p-2 rounded"
            />

            <ErrorMessage
              message={errors?.name?.message || ''}
              visible={!!errors.name}
            />
          </div>

          <div>
            <label className="block font-medium">Price (USD)</label>

            <input
              type="number"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
              className="w-[300px] md:w-[200px] border p-2 rounded"
            />

            <ErrorMessage
              message={errors?.price?.message || ''}
              visible={!!errors.price}
            />
          </div>

          <div>
            <label className="block font-medium">Stock</label>

            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              className="w-[300px] md:w-[200px] border p-2 rounded"
            />

            <ErrorMessage
              message={errors?.stock?.message || ''}
              visible={!!errors.stock}
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>

            <select
              {...register('category')}
              className="w-[300px] md:w-[200px] border p-2 rounded"
            >
              <option value="">Select category</option>
              {convertDataToSelectOptions(dataCategories).map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            <ErrorMessage
              message={errors?.category?.message || ''}
              visible={!!errors.category}
            />
          </div>
        </Box>

        <Box className="w-full flex justify-center">
          <DefaultButton type="submit" disabled={isSubmitting || isPending}>
            Save Product
          </DefaultButton>
        </Box>
      </form>
    </ModalDefault>
  );
}
