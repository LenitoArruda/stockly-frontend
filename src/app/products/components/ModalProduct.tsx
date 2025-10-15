'use client';

import { DefaultButton } from '@/components/default-button';
import { ErrorMessage } from '@/components/error-message';
import { ModalDefault } from '@/components/modal-default';
import { useCategories } from '@/hooks/useCategories';
import {
  useCreateProduct,
  useCreateVariant,
  useUpdateProduct,
} from '@/hooks/useProducts';
import { convertDataToSelectOptions, createSku } from '@/lib/utils';
import {
  CreateProductProps,
  CreateVariantProps,
  ProductProps,
  ProductsFilterProps,
  UpdateProductProps,
} from '@/types/product.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { defaultFilter } from '../page';
import { AttributeCard } from './AttributeCard';

interface ModalProductProps {
  product: ProductProps | null;
  modalProduct: boolean;
  setModalProduct: (modalProduct: boolean) => void;
  setSelectedProduct: (selectedProduct: ProductProps | null) => void;
  setProductFilters?: (filters: ProductsFilterProps) => void;
  createVariant?: boolean;
}

export function ModalProduct(props: ModalProductProps) {
  const {
    product,
    setSelectedProduct,
    setModalProduct,
    modalProduct,
    setProductFilters,
    createVariant,
  } = props;

  const { data: dataCategories } = useCategories();

  const onClose = () => {
    setSelectedProduct(null);
    setModalProduct(false);
    setErrorAttributes(false);
    queryClient.invalidateQueries({ queryKey: ['products'] });
    setAttributes({});
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
    categoryId: z.string().min(1, 'Category is required'),
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

  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [errorAttributes, setErrorAttributes] = useState<boolean>(false);
  const [addAttribute, setAddAttribute] = useState<{
    title: string;
    value: string;
  }>({ title: '', value: '' });

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useCreateProduct();
  const {
    mutate: mutateVariant,
    isPending: isPendingVariant,
    isSuccess: isSuccessVariant,
  } = useCreateVariant();
  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateProduct();

  const onSubmit = (data: ProductFormData) => {
    if (createVariant) {
      if (Object.keys(attributes).length === 0) {
        setErrorAttributes(true);
        return;
      }
      const bodyUpdateRequest: CreateVariantProps = {
        parentId: Number(product?.id),
        name: data.name,
        price: data.price,
        stock: data.stock,
        sku: createSku(data.name),
        attributes,
      };
      mutateVariant(bodyUpdateRequest);
      return;
    }
    if (product) {
      const bodyUpdateRequest: UpdateProductProps = {
        id: Number(product?.id),
        name: data.name,
        price: data.price,
        stock: data.stock,
        categoryId: Number(data.categoryId),
        attributes,
      };
      if (setProductFilters) setProductFilters(defaultFilter);
      mutateUpdate(bodyUpdateRequest);
    } else {
      const bodyRequest: CreateProductProps = {
        name: data.name,
        price: data.price,
        stock: data.stock,
        sku: createSku(data.name),
        categoryId: Number(data.categoryId),
      };
      if (setProductFilters) setProductFilters(defaultFilter);
      mutate(bodyRequest);
    }
  };

  const removeAttribute = (id: number) => {
    const newAttributes = { ...attributes };
    const key = Object.keys(attributes)[id];
    delete newAttributes[key];
    setAttributes(newAttributes);
  };

  const handleAddAttribute = () => {
    if (addAttribute.title && addAttribute.value) {
      setAttributes((prev) => ({
        ...prev,
        [addAttribute.title]: addAttribute.value,
      }));
      setAddAttribute({ title: '', value: '' });
      setErrorAttributes(false);
    }
  };

  const productVariant =
    product?.parentId || createVariant || Object.keys(attributes).length > 0;

  useEffect(() => {
    if (isSuccess || isSuccessUpdate || isSuccessVariant) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isSuccessUpdate, isSuccessVariant]);

  useEffect(() => {
    if (product && !productVariant) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: String(product.categoryId),
      });
      setAttributes(product.attributes || {});
    }
    if (!modalProduct) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalProduct, product, productVariant, reset]);

  return (
    <ModalDefault
      open={modalProduct}
      onClose={onClose}
      title={
        createVariant
          ? `Create Variant | ${product?.sku}`
          : product
          ? `Edit Product | ${product.sku}`
          : 'New Product'
      }
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
            <label className="block font-medium">Price (USD)</label>

            <input
              type="number"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
              className="w-[270px] md:w-[200px] border p-2 rounded"
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
              className="w-[270px] md:w-[200px] border p-2 rounded"
            />

            <ErrorMessage
              message={errors?.stock?.message || ''}
              visible={!!errors.stock}
            />
          </div>
          {!productVariant && (
            <div>
              <label className="block font-medium">Category</label>

              <select
                {...register('categoryId')}
                className="w-[270px] md:w-[200px] border p-2 rounded"
              >
                <option value="">Select category</option>
                {convertDataToSelectOptions(dataCategories).map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>

              <ErrorMessage
                message={errors?.categoryId?.message || ''}
                visible={!!errors.categoryId}
              />
            </div>
          )}
          {productVariant && (
            <Box className="w-full flex flex-col gap-2">
              <b>Attributes</b>

              <Box className="flex gap-4 mb-2">
                <div>
                  <label className="block font-medium">Title</label>

                  <input
                    type="text"
                    value={addAttribute.title}
                    className="w-[100px] border p-2 rounded"
                    onChange={(e) =>
                      setAddAttribute((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block font-medium">Value</label>

                  <input
                    type="text"
                    value={addAttribute.value}
                    className="w-[100px] border p-2 rounded"
                    onChange={(e) =>
                      setAddAttribute((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                </div>
                <Box className="flex  items-end mb-2">
                  <DefaultButton onClick={handleAddAttribute} type="button">
                    +
                  </DefaultButton>
                </Box>
              </Box>

              <Box className="flex flex-wrap gap-4">
                {Object.entries(attributes).map(([key, value], index) => (
                  <AttributeCard
                    key={index}
                    title={key}
                    value={value}
                    index={index}
                    handleRemove={removeAttribute}
                  />
                ))}
              </Box>
              <ErrorMessage
                message="At least one attribute is required"
                visible={errorAttributes}
              />
            </Box>
          )}
        </Box>

        <Box className="w-full flex justify-center">
          <DefaultButton
            type="submit"
            disabled={
              isSubmitting || isPending || isPendingUpdate || isPendingVariant
            }
          >
            Save Product
          </DefaultButton>
        </Box>
      </form>
    </ModalDefault>
  );
}
