import { ProductProps } from '@/types/product.types';
import { formatUsd } from '@/utils/numer';
import { Box, Card, Tooltip } from '@radix-ui/themes';

interface ProductCardProps {
  product: ProductProps;
}

export function ProductCard(props: ProductCardProps) {
  const { product } = props;

  return (
    <Card className="flex flex-col justify-between gap-4 p-4 bg-white rounded-xl shadow-xl border-b-4 border-blue-300 h-auto w-[300px] cursor-pointer transform transition duration-300 hover:scale-102 overflow-hidden">
      <Tooltip content={product.name}>
        <p className="text-xs font-bold text-gray-500 truncate w-[270px]">
          {product.name}
        </p>
      </Tooltip>

      <Box className="w-full flex justify-between">
        <Box className="flex gap-1">
          <p className="text-xs font-bold text-gray-500">Stock:</p>

          <p className="text-xs italic text-gray-500 truncate">
            {product.stock}
          </p>
        </Box>

        <p className="text-xs italic text-gray-500 truncate">
          {formatUsd(product.price)}
        </p>
      </Box>

      <Box className="flex gap-1">
        <p className="text-xs font-bold text-gray-500">Variants:</p>

        <p className="text-xs italic text-gray-500 truncate">
          {product?.variants?.length || 0}
        </p>
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
