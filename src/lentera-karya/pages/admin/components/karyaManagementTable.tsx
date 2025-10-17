import { memo, useState } from "react";
import type { Karya } from "../../../types/karya";
import PreviewModal from "./PreviewModal";

interface KaryaTableProps {
  karya: Karya[];
  isDeleting: string | null;
  onDelete: (id: string, title: string) => void;
  emptyMessage?: string;
}

/**
 * Karya Management Table Component
 * Displays approved karya with delete functionality only
 */
const KaryaManagementTable = memo(
  ({
    karya,
    isDeleting,
    onDelete,
    emptyMessage,
  }: KaryaTableProps) => {
    const [previewKarya, setPreviewKarya] = useState<Karya | null>(null);

    return (
      <>
        {/* Horizontal Scrollable Container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Id</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Judul</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Kategori</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Tanggal Upload</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {karya.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      {emptyMessage || "Belum ada karya yang di-approve"}
                    </td>
                  </tr>
                ) : (
                  karya.map((item) => (
                    <KaryaTableRow
                      key={item.id}
                      karya={item}
                      isDeleting={isDeleting === item.id}
                      onDelete={onDelete}
                      onPreview={() => setPreviewKarya(item)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview Modal */}
        {previewKarya && (
          <PreviewModal
            karya={previewKarya}
            onClose={() => setPreviewKarya(null)}
          />
        )}
      </>
    );
  }
);

KaryaManagementTable.displayName = "KaryaManagementTable";

/**
 * Individual Table Row Component
 */
const KaryaTableRow = memo(
  ({
    karya,
    isDeleting,
    onDelete,
    onPreview,
  }: {
    karya: Karya;
    isDeleting: boolean;
    onDelete: (id: string, title: string) => void;
    onPreview: () => void;
  }) => {
    return (
      <tr className="border-b hover:bg-gray-50 transition-colors">
        <td className="p-4 whitespace-nowrap">
          <span className="font-mono text-sm">{karya.id}</span>
        </td>
        <td className="p-4">
          <div className="min-w-[200px]">
            <div className="font-medium">{karya.title}</div>
            {karya.description && (
              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                {karya.description.slice(0, 50)}...
              </div>
            )}
          </div>
        </td>
        <td className="p-4 whitespace-nowrap">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
            {karya.category}
          </span>
        </td>
        <td className="p-4 whitespace-nowrap text-sm text-gray-600">
          {new Date(karya.uploadedAt).toLocaleDateString("id-ID", {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </td>
        <td className="p-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <PreviewButton onClick={onPreview} />
            <DeleteButton
              isDeleting={isDeleting}
              onClick={() => onDelete(karya.id, karya.title)}
            />
          </div>
        </td>
      </tr>
    );
  }
);

KaryaTableRow.displayName = "KaryaTableRow";

/**
 * Preview Button Component
 */
const PreviewButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
      aria-label="Preview karya"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path 
          fillRule="evenodd" 
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
          clipRule="evenodd" 
        />
      </svg>
      <span>Pratinjau</span>
    </button>
  );
});

PreviewButton.displayName = "PreviewButton";

/**
 * Delete Button Component (Red Danger Button)
 */
const DeleteButton = memo(
  ({ isDeleting, onClick }: { isDeleting: boolean; onClick: () => void }) => {
    return (
      <button
        onClick={onClick}
        disabled={isDeleting}
        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
          isDeleting
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
        }`}
        aria-label={isDeleting ? "Deleting..." : "Delete karya"}
      >
        {isDeleting ? (
          <>
            <LoadingSpinner />
            <span>Menghapus...</span>
          </>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Hapus</span>
          </>
        )}
      </button>
    );
  }
);

DeleteButton.displayName = "DeleteButton";

/**
 * Loading Spinner Component
 */
const LoadingSpinner = memo(() => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
));

LoadingSpinner.displayName = "LoadingSpinner";

export default KaryaManagementTable;
