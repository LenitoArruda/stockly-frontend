'use client';
import { DefaultButton } from '@/components/default-button';
import { ErrorMessage } from '@/components/error-message';
import { ModalDefault } from '@/components/modal-default';
import { useCategories, useCreateCategory } from '@/hooks/useCategories';
import { CategoryProps } from '@/types/categories.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface ModalCategoryProps {
  category: CategoryProps | null;
  modalCategory: boolean;
  onClose: () => void;
}

export function ModalCategory(props: ModalCategoryProps) {
  const { category, modalCategory, onClose } = props;

  const categorySchema = z.object({
    name: z.string().min(2, 'Name is required'),
  });

  type CategoryFormData = z.infer<typeof categorySchema>;

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate, isPending, isSuccess } = useCreateCategory();
  const { data: categories } = useCategories();

  const queryClient = useQueryClient();

  const onCloseModal = () => {
    onClose();
    reset();
    setError(null);
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  const onSubmit = (data: CategoryFormData) => {
    const nameExists = categories?.some(
      (categoryItem: CategoryProps) => categoryItem.name === data.name,
    );
    if (nameExists) {
      setError('Category already exists');
      return;
    }
    mutate({
      name: data.name,
    });
  };

  useEffect(() => {
    if (modalCategory) {
      reset({
        name: category?.name || '',
      });
    } else {
      reset();
      setError(null);
    }
  }, [modalCategory, reset, category]);

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <ModalDefault
      open={modalCategory}
      onClose={onClose}
      title={'Create Category'}
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
        </Box>
        <Box className="w-full flex justify-center">
          <DefaultButton type="submit" disabled={isSubmitting || isPending}>
            Save Category
          </DefaultButton>
        </Box>
        <ErrorMessage message={error || ''} visible={!!error} />
      </form>
    </ModalDefault>
  );
}
