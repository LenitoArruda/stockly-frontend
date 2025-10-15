interface ModalDefaultProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ModalDefault(props: ModalDefaultProps) {
  const { open, title, onClose, children, className } = props;

  const classNameParent = open
    ? 'fixed inset-0 flex items-center justify-center bg-black/60  z-50'
    : 'hidden';

  return (
    <div className={classNameParent} onClick={onClose}>
      <div
        className={
          'flex flex-col py-4 px-5 bg-white align-center rounded-lg shadow-2xl relative transform transition-all duration-300 scale-100 ' +
          (className ?? 'w-[400px]')
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex justify-between w-full mb-2"
          onClick={(e) => e.stopPropagation()}
        >
          {title ? (
            <p className="text-lg font-semibold">{title}</p>
          ) : (
            <div className="w-[10px]"></div>
          )}
          <button
            className="text-gray-500 hover:text-gray-800 cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
