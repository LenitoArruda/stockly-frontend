import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface FieldProps {
  title: string;
  value: string | number;
  isLoading?: boolean;
}

export function Field({ title, value, isLoading }: FieldProps) {
  return (
    <Box className="flex flex-col w-fit py-2">
      <p className="text-sm font-medium">{title}</p>
      {isLoading ? (
        <Skeleton height={15} width={100} />
      ) : (
        <p className="text-sm text-gray-500">{value}</p>
      )}
    </Box>
  );
}
