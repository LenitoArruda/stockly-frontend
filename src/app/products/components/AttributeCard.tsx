import { Box } from '@radix-ui/themes';

interface AttributeCardProps {
  title: string;
  value: string;
  index: number;
  handleRemove: (id: number) => void;
}

export function AttributeCard(props: AttributeCardProps) {
  const { title, value, index, handleRemove } = props;

  return (
    <div className="border p-1 rounded flex justify-between items-center gap-3">
      <Box className="flex gap-1">
        <p className="text-xs font-bold text-gray-500">{title}:</p>
        <p className="text-xs italic text-gray-500 truncate">{value}</p>
      </Box>
      <button
        onClick={() => handleRemove(index)}
        type="button"
        className="text-gray-500 hover:text-gray-800 cursor-pointer text-xs"
      >
        X
      </button>
    </div>
  );
}
