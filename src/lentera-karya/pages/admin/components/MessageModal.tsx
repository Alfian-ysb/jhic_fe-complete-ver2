import { memo } from "react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  karyaTitle: string;
  noteForAdmin: string;
}

/**
 * Modal Component to display admin message
 * Shows noteForAdmin field in a popup
 */
const MessageModal = memo(({ isOpen, onClose, karyaTitle, noteForAdmin }: MessageModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">💬 Pesan untuk Admin</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Karya Title */}
          <div className="mb-4 pb-4 border-b">
            <label className="text-sm font-medium text-gray-500 block mb-1">
              Judul Karya:
            </label>
            <p className="text-lg font-semibold text-gray-800">{karyaTitle}</p>
          </div>

          {/* Note for Admin */}
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-2">
              Catatan dari Siswa:
            </label>
            {noteForAdmin ? (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {noteForAdmin}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <p className="text-gray-400 italic">
                  Tidak ada catatan khusus dari siswa
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
});

MessageModal.displayName = "MessageModal";

export default MessageModal;
