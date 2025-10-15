'use client';
import { DefaultButton } from '@/components/default-button';
import { PageTitle } from '@/components/page-title';
import { Box, Tooltip } from '@radix-ui/themes';
import { CategoryCard } from './components/CategoryCard';
import { useState } from 'react';
import { ModalCategory } from './components/ModalCategory';
import { CategoryProps } from '@/types/categories.types';
import { useCategories } from '@/hooks/useCategories';

export default function Dashboard() {
  const { data: categories } = useCategories();

  const [modalCategory, setModalCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);

  const onClose = () => {
    setModalCategory(false);
    setSelectedCategory(null);
  };

  return (
    <Box className="flex w-full flex-1 flex-col gap-2">
      <Box className="flex items-center justify-between mr-3">
        <PageTitle title="Categories" />
        <Tooltip
          content="New Category"
          className="bg-black/50 p-1 rounded text-white text-xs"
        >
          <DefaultButton onClick={() => setModalCategory(true)}>
            +
          </DefaultButton>
        </Tooltip>
      </Box>

      <Box className="flex-1 w-full flex flex-wrap gap-6 overflow-auto max-h-[calc(100vh-190px)] pr-3 content-start">
        {categories?.map((category: CategoryProps) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Box>
      <ModalCategory
        category={selectedCategory}
        modalCategory={modalCategory}
        onClose={onClose}
      />
    </Box>
  );
}
