'use client';

import { PageTitle } from '@/components/page-title';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { ProductProps, ProductsFilterProps } from '@/types/product.types';
import { Box } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { ProductCard } from './ProductCard';

export default function Dashboard() {
  const defaultFilter: ProductsFilterProps = {
    page: 1,
    pageSize: 20,
  };

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [productFilters, setProductFilters] =
    useState<ProductsFilterProps>(defaultFilter);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { data: dataCategories } = useCategories();
  const { data: dataProducts } = useProducts(productFilters);

  useEffect(() => {
    if (dataProducts) {
      const page = dataProducts.page;
      setHasNextPage(page < dataProducts.totalPages);

      if (page === 1) {
        setProducts(dataProducts?.data || []);
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...(dataProducts?.data || []),
        ]);
      }
    }
  }, [dataProducts]);

  useEffect(() => {
    if (!loadMoreRef.current || !dataProducts) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setProductFilters((prev: ProductsFilterProps) => ({
            ...prev,
            page: prev.page + 1,
          }));
        }
      },
      { threshold: 1 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [dataCategories, dataProducts, hasNextPage]);

  return (
    <Box className="flex w-full flex-1 flex-col gap-2">
      <PageTitle title="Products" />
      <Box className="flex-1 w-full flex flex-wrap gap-6 overflow-auto max-h-[calc(100vh-190px)] pr-3">
        {products?.map((product: ProductProps) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="h-10 flex justify-center items-center"
          >
            asdas
          </div>
        )}
      </Box>
    </Box>
  );
}
