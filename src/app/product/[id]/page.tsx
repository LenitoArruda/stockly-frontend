'use client';

import { DefaultButton } from '@/components/default-button';
import { PageTitle } from '@/components/page-title';
import { useDeleteProduct, useProductById } from '@/hooks/useProducts';
import { ProductProps, ProductVariantProps } from '@/types/product.types';
import { Box, IconButton, Tooltip } from '@radix-ui/themes';
import { Field } from '../components/Field';
import { formatUsd } from '@/lib/utils';
import Skeleton from 'react-loading-skeleton';
import { redirect } from 'next/navigation';
import { ProductCard } from '@/app/products/components/ProductCard';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { ModalProduct } from '@/app/products/components/ModalProduct';
import { ModalConfirmation } from '@/components/modal-confirmation';

export default function Product({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: dataProduct, isLoading, refetch } = useProductById(id);
  const product: ProductProps = dataProduct || {};
  const convertToProduct = (data: ProductVariantProps): ProductProps => {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      sku: data.sku,
      stock: data.stock,
      categoryId: product.categoryId,
      categoryName: product.categoryName,
    };
  };

  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const [modalProduct, setModalProduct] = useState(false);
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null,
  );

  const handleEditProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setModalProduct(true);
  };

  const handleBackButton = () => {
    redirect('/products');
  };

  const handleDeleteProduct = async () => {
    deleteProduct(Number(product.id));
    handleBackButton();
  };

  const handleDeleteVariant = async () => {
    deleteProduct(Number(selectedProduct?.id));
    refetch();
    handleCloseModalConfirmation();
  };

  const handleCloseModalConfirmation = () => {
    setModalConfirmationOpen(false);
  };

  const handleOpenModalConfirmation = () => {
    setSelectedProduct(null);
    setModalConfirmationOpen(true);
  };

  return (
    <Box className="flex w-full flex-1 flex-col gap-6 max-h-[calc(100vh-150px)] overflow-auto">
      <Box className="flex items-center justify-between mr-3">
        <Box className="flex gap-4">
          <PageTitle title="Product" />
          <Tooltip
            content={'Edit product'}
            className="bg-black/50 p-1 rounded text-white text-xs"
          >
            <IconButton className="cursor-pointer" onClick={handleEditProduct}>
              <PencilIcon size={17} />
            </IconButton>
          </Tooltip>

          <Tooltip
            content={'Delete product'}
            className="bg-black/50 p-1 rounded text-white text-xs"
          >
            <IconButton
              className="cursor-pointer"
              onClick={handleOpenModalConfirmation}
            >
              <TrashIcon color="#dd6363" size={17} />
            </IconButton>
          </Tooltip>
        </Box>

        <DefaultButton onClick={handleBackButton}>Back</DefaultButton>
      </Box>

      <Box className="flex gap-20 flex-wrap mr-3">
        <Field title="Name" value={product.name} isLoading={isLoading} />
        <Field title="SKU" value={product.sku} isLoading={isLoading} />
        <Field
          title="Price"
          value={formatUsd(product.price)}
          isLoading={isLoading}
        />
        <Field title="Stock" value={product.stock} isLoading={isLoading} />
        <Field
          title="Category"
          value={product.categoryName}
          isLoading={isLoading}
        />
      </Box>

      <Box className="flex w-full">
        <PageTitle title="Variants" />
      </Box>

      {isLoading ? (
        <Box className="flex-1 w-full flex flex-wrap gap-6 pr-3 content-start pr-3">
          {[...Array(3)].map((_, index) => (
            <Skeleton height={150} width={300} key={index} />
          ))}
        </Box>
      ) : (
        <Box className="flex-1 w-full flex flex-wrap gap-6 pr-3 content-start pr-3">
          {product?.variants &&
            product?.variants.length > 0 &&
            product.variants.map((variant) => (
              <ProductCard
                isVariant
                key={variant.id}
                product={convertToProduct(variant)}
                setSelectedProduct={setSelectedProduct}
                setModalProduct={setModalProduct}
                setModalConfirmationOpen={setModalConfirmationOpen}
              />
            ))}
          {product?.variants?.length === 0 && <Box>No variants found.</Box>}
        </Box>
      )}

      <ModalProduct
        product={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        modalProduct={modalProduct}
        setModalProduct={setModalProduct}
      />

      <ModalConfirmation
        open={modalConfirmationOpen}
        handleCancel={handleCloseModalConfirmation}
        handleConfirm={
          selectedProduct ? handleDeleteVariant : handleDeleteProduct
        }
        title={`Delete ${
          selectedProduct ? selectedProduct?.sku : product?.sku
        }`}
        message="Are you sure you want to delete this product? All variants will also be deleted."
        isLoading={isPending}
      />
    </Box>
  );
}
