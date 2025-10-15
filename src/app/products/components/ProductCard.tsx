'use client';

import { ProductProps } from '@/types/product.types';
import { Box, Card, IconButton, Tooltip } from '@radix-ui/themes';
import { PencilIcon } from '@phosphor-icons/react';
import { formatUsd } from '@/lib/utils';
import { redirect } from 'next/navigation';

interface ProductCardProps {
  product: ProductProps;
  setModalProduct: (modalProduct: boolean) => void;
  setSelectedProduct: (selectedProduct: ProductProps | null) => void;
  showEditButton?: boolean;
}

export function ProductCard(props: ProductCardProps) {
  const { product, setSelectedProduct, setModalProduct, showEditButton } =
    props;

  const handleEditProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setModalProduct(true);
  };

  const onCardClick = () => {
    redirect(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={onCardClick}
      className="flex flex-col justify-between gap-4 p-4 bg-white rounded-xl shadow-xl border-b-4 border-blue-300 h-fit w-[300px] cursor-pointer transform transition duration-300 hover:scale-102 overflow-hidden"
    >
      <Box className="w-full flex justify-between gap-2">
        <Tooltip
          content={product.name}
          className="bg-black/50 p-1 rounded text-white text-xs"
        >
          <p className="text-xs font-bold text-gray-500 truncate ">
            {product.name}
          </p>
        </Tooltip>
        {showEditButton && (
          <Tooltip
            content={'Edit product'}
            className="bg-black/50 p-1 rounded text-white text-xs"
          >
            <IconButton className="cursor-pointer" onClick={handleEditProduct}>
              <PencilIcon size={17} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box className="w-full flex justify-between">
        <Box className="flex gap-1">
          <p className="text-xs font-bold text-gray-500">Category:</p>

          <p className="text-xs italic text-gray-500 truncate">
            {product?.categoryName}
          </p>
        </Box>

        <Box className="flex gap-1">
          <p className="text-xs font-bold text-gray-500">Variants:</p>

          <p className="text-xs italic text-gray-500 truncate">
            {product?.variants?.length || 0}
          </p>
        </Box>
      </Box>

      <Box className="w-full flex justify-between">
        <Box className="flex gap-1">
          <p className="text-xs font-bold text-gray-500">Stock:</p>

          <p className="text-xs italic text-gray-500 truncate">
            {product.stock}
          </p>
        </Box>

        <Box className="flex gap-1">
          <p className="text-xs font-bold text-gray-500">Price:</p>

          <p className="text-xs italic text-gray-500 truncate">
            {formatUsd(product.price)}
          </p>
        </Box>
      </Box>

      <Box className="flex gap-1">
        <p className="text-xs font-bold text-gray-500">SKU:</p>

        <Tooltip
          content={product.sku}
          className="bg-black/50 p-1 rounded text-white text-xs"
        >
          <p className="text-xs italic text-gray-500 truncate w-[270px]">
            {product.sku}
          </p>
        </Tooltip>
      </Box>
    </Card>
  );
}
