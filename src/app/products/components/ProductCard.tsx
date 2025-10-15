'use client';

import { ProductProps } from '@/types/product.types';
import { Box, Card, IconButton, Tooltip } from '@radix-ui/themes';
import { PencilIcon } from '@phosphor-icons/react';
import { formatUsd } from '@/lib/utils';

interface ProductCardProps {
  product: ProductProps;
  setModalProduct: (modalProduct: boolean) => void;
  setSelectedProduct: (selectedProduct: ProductProps | null) => void;
}

export function ProductCard(props: ProductCardProps) {
  const { product, setSelectedProduct, setModalProduct } = props;

  const handleEditProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setModalProduct(true);
  };

  return (
    <Card className="flex flex-col justify-between gap-4 p-4 bg-white rounded-xl shadow-xl border-b-4 border-blue-300 h-auto w-[300px] cursor-pointer transform transition duration-300 hover:scale-102 overflow-hidden">
      <Box className="w-full flex justify-between gap-2">
        <Tooltip content={product.name}>
          <p className="text-xs font-bold text-gray-500 truncate ">
            {product.name}
          </p>
        </Tooltip>

        <Tooltip content={'Edit product'}>
          <IconButton className="cursor-pointer" onClick={handleEditProduct}>
            <PencilIcon size={17} />
          </IconButton>
        </Tooltip>
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
          <p className="text-xs font-bold text-gray-500">Category:</p>

          <p className="text-xs italic text-gray-500 truncate">
            {formatUsd(product.price)}
          </p>
        </Box>
      </Box>

      <Box className="flex gap-1">
        <p className="text-xs font-bold text-gray-500">SKU:</p>

        <Tooltip content={product.sku}>
          <p className="text-xs italic text-gray-500 truncate w-[270px]">
            {product.sku}
          </p>
        </Tooltip>
      </Box>
    </Card>
  );
}
