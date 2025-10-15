import { Box } from '@radix-ui/themes';

interface ErrorMessageProps {
  message: string;
  visible?: boolean;
}

export function ErrorMessage(props: ErrorMessageProps) {
  const { message, visible } = props;

  return (
    <Box className="min-h-[20px]">
      {visible && <p className="text-red-500 text-sm">{message}</p>}
    </Box>
  );
}
