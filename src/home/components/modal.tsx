import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay - tidak menutupi penuh */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-[10px]"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-8 pointer-events-none">
        <div
          className="bg-gradient-to-br from-blue-100 via-blue-50 to-orange-50 rounded-xl shadow-2xl max-w-3xl w-full pointer-events-auto overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-[60px] bg-[#e4e9ea] border-b-1 border-neutral-400 z-10">
            <div className="absolute top-5 left-5 rounded-full w-4 h-4 bg-[#F00B0B] inset-0 " />
            <div className="absolute top-5 left-12 rounded-full w-4 h-4 bg-[#FF9E42] inset-0 " />
            <div className="absolute top-5 left-19 rounded-full w-4 h-4 bg-[#AECBFA] inset-0 " />
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-6 text-gray-500 hover:text-gray-700 transition cursor-pointer"
              aria-label="Close"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="absolute w-60 h-60 blur-[6rem] z-0 bottom-0 left-0 bg-[#3DADFF]" />
          <div className="absolute w-60 h-60 blur-[6rem] z-0 top-0 right-0 bg-[#FFD4AA]" />

          {/* Title (optional) */}
          {title && (
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
          )}

          {/* Content */}
          <div className="px-8 py-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
