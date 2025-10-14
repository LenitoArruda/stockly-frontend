'use client';

import { useCategories } from '@/hooks/useCategories';
import { Box } from '@radix-ui/themes';

export default function Dashboard() {
  const { data: categories } = useCategories();

  console.log(categories);

  return (
    <Box className="bg-white w-full rounded-xl">Welcome to the Dashboard</Box>
  );
}
