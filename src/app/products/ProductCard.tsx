import { Box, Card } from '@radix-ui/themes';

interface ProductCardProps {
  children: React.ReactNode;
}

export function ProductCard(props: ProductCardProps) {
  const { children } = props;

  return <Card className="">{children}</Card>;
}
