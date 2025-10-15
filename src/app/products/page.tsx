'use client';

import { PageTitle } from '@/components/page-title';
import { useProducts } from '@/hooks/useProducts';
import { ProductProps, ProductsFilterProps } from '@/types/product.types';
import { Box, Tooltip } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { ModalProduct } from './components/ModalProduct';
import { DefaultButton } from '@/components/default-button';
import { Filters } from './components/Filters';

export const defaultFilter: ProductsFilterProps = {
  page: 1,
  pageSize: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export default function Dashboard() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [productFilters, setProductFilters] =
    useState<ProductsFilterProps>(defaultFilter);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [modalProduct, setModalProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductProps | null>(
    null,
  );
  const [hasNextPage, setHasNextPage] = useState(false);

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
  }, [dataProducts, hasNextPage]);

  return (
    <Box className="flex w-full flex-1 flex-col gap-2">
      <Box className="flex items-center justify-between mr-3">
        <Box className="flex gap-3">
          <PageTitle title="Products" />
          <Filters filters={productFilters} setFilters={setProductFilters} />
        </Box>
        <Tooltip
          content="New Product"
          className="bg-black/50 p-1 rounded text-white text-xs"
        >
          <DefaultButton onClick={() => setModalProduct(true)}>+</DefaultButton>
        </Tooltip>
      </Box>
      <Box className="flex-1 w-full flex flex-wrap gap-6 overflow-auto max-h-[calc(100vh-190px)] pr-3">
        {products?.map((product: ProductProps) => (
          <ProductCard
            key={product.id}
            product={product}
            setSelectedProduct={setSelectedProducts}
            setModalProduct={setModalProduct}
          />
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
      <ModalProduct
        product={selectedProducts}
        setSelectedProduct={setSelectedProducts}
        modalProduct={modalProduct}
        setModalProduct={setModalProduct}
      />
    </Box>
  );
}
