'use client';

import { useCategories } from '@/hooks/useCategories';

export default function Dashboard() {
  const { data: categories } = useCategories();

  console.log(categories);

  return <h1>Welcome to the Dashboard</h1>;
}
