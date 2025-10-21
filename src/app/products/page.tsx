'use client';

import { PageTitle } from '@/components/page-title';
import { useDeleteProduct, useProducts } from '@/hooks/useProducts';
import { ProductProps, ProductsFilterProps } from '@/types/product.types';
import { Box, Spinner, Tooltip } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { ModalProduct } from './components/ModalProduct';
import { DefaultButton } from '@/components/default-button';
import { Filters } from './components/Filters';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { ModalConfirmation } from '@/components/modal-confirmation';
import { useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export const defaultFilter: ProductsFilterProps = {
  page: 1,
  name: undefined,
  sku: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  categoryId: undefined,
  pageSize: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export default function Products() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const [productFilters, setProductFilters] =
    useState<ProductsFilterProps>(defaultFilter);
  const [modalProduct, setModalProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductProps | null>(
    null,
  );

  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);

  const { data: dataProducts, isPending: isLoadingMore, fetchNextPage } = useProducts(productFilters);
  const { mutate: deleteProduct, isPending, isSuccess } = useDeleteProduct();

  const handleDeleteProduct = async () => {
    deleteProduct(Number(selectedProducts?.id));
  };

  const handleCloseModalConfirmation = () => {
    setModalConfirmationOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setProductFilters(defaultFilter);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      handleCloseModalConfirmation();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (inView) {
      setProductFilters(defaultFilter);
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setProductFilters((prev) => ({
            ...prev,
            page: prev.page + 1,
          }));
        }
      },
      { threshold: 1 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isLoadingMore]);

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
      {isLoadingMore && productFilters.page === 1 ? (
        <Box className="flex-1 w-full flex flex-wrap gap-6 overflow-auto max-h-[calc(100vh-190px)] pr-3 content-start">
          {[...Array(20)].map((_, index) => (
            <Skeleton height={150} width={300} key={index} />
          ))}
        </Box>
      ) : (
        <Box className="flex-1 w-full flex flex-wrap gap-6 overflow-auto max-h-[calc(100vh-190px)] pr-3 content-start">
          {
            dataProducts?.pages?.map((page) => {
              return (
                <Box key={page.currentPage} className='flex flex-wrap gap-6'>
                  {page?.data?.map((product: ProductProps) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      setSelectedProduct={setSelectedProducts}
                      setModalProduct={setModalProduct}
                      setModalConfirmationOpen={setModalConfirmationOpen}
                    />
                  ))}
                </Box>
              )
            })
          }
          {/* {products?.map((product: ProductProps) => (
            <ProductCard
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProducts}
              setModalProduct={setModalProduct}
              setModalConfirmationOpen={setModalConfirmationOpen}
            />
          ))} */}
          {!isLoadingMore && (
            <div
              ref={ref}
              className="h-10 flex justify-center items-center"
            >
              <Spinner />
            </div>
          )}
        </Box>
      )}

      <ModalProduct
        product={selectedProducts}
        setSelectedProduct={setSelectedProducts}
        modalProduct={modalProduct}
        setModalProduct={setModalProduct}
        setProductFilters={setProductFilters}
      />

      <ModalConfirmation
        open={modalConfirmationOpen}
        handleCancel={handleCloseModalConfirmation}
        handleConfirm={handleDeleteProduct}
        title={`Delete ${selectedProducts?.sku}`}
        message="Are you sure you want to delete this product? All variants will also be deleted."
        isLoading={isPending}
      />
    </Box>
  );
}
