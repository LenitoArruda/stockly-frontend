import { Box } from '@radix-ui/themes';
import { ModalDefault } from '../modal-default';
import { DefaultButton } from '../default-button';

interface ModalConfirmationProps {
  handleConfirm: () => void;
  handleCancel: () => void;
  open: boolean;
  title?: string;
  isLoading?: boolean;
  message: string;
}

export function ModalConfirmation(props: ModalConfirmationProps) {
  const { handleConfirm, handleCancel, open, title, message, isLoading } =
    props;

  return (
    <ModalDefault title={title} onClose={handleCancel} open={open}>
      <Box className="flex flex-col gap-3">
        {message}
        <Box className="flex justify-end gap-2 mt-4">
          <DefaultButton onClick={handleConfirm} disabled={isLoading}>
            Confirm
          </DefaultButton>
          <DefaultButton
            onClick={handleCancel}
            buttonColor="bg-red-400 hover:bg-[#e85c5f]"
            disabled={isLoading}
          >
            Cancel
          </DefaultButton>
        </Box>
      </Box>
    </ModalDefault>
  );
}
