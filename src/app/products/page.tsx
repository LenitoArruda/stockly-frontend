'use client';

import { PageTitle } from '@/components/page-title';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { ProductProps, ProductsFilterProps } from '@/types/product.types';
import { Box } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const defaultFilter: ProductsFilterProps = {
    page: 1,
    pageSize: 10,
  };

  const [productFilters, setProductFilters] =
    useState<ProductsFilterProps>(defaultFilter);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const { data: dataCategories } = useCategories();
  const { data: dataProducts } = useProducts(productFilters);

  console.log(products);

  useEffect(() => {
    if (dataProducts) {
      setProducts(dataProducts?.data || []);
    }
  }, [dataProducts]);

  return (
    <Box className="flex w-full flex-1 flex-col gap-2">
      <PageTitle title="Products" />
      <Box className="flex-1 w-full flex wrap"></Box>
      {products?.map((product: ProductProps) => (
        <Box key={product.id} className="p-4 border-b">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">${product.price}</p>
        </Box>
      ))}
    </Box>
  );
}
