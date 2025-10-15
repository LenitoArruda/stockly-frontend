'use client';

import { Box, Card } from '@radix-ui/themes';
import { CategoryProps } from '@/types/categories.types';
interface CategoryCardProps {
  category: CategoryProps;
}

export function CategoryCard(props: CategoryCardProps) {
  const { category } = props;

  return (
    <Card
      className={`flex flex-col justify-between gap-4 p-4 bg-white rounded-xl shadow-xl border-b-4 border-blue-300 h-fit w-[300px] transform transition duration-300 hover:scale-102 overflow-hidden`}
    >
      <Box className="flex gap-1">
        <p className="text-xs font-bold text-gray-500">Name:</p>

        <p className="text-xs italic text-gray-500 truncate">
          {category?.name}
        </p>
      </Box>
    </Card>
  );
}
