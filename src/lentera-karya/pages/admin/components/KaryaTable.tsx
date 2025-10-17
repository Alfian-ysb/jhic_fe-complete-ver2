import { memo, useState } from "react";
import type { Karya } from "../../../types/karya";
import PreviewModal from "./PreviewModal";

interface KaryaTableProps {
  karya: Karya[];
  isDeleting: string | null;
  isApproving?: string | null;
  onDelete: (id: string, title: string) => void;
  onApprove?: (id: string, title: string) => void;
  onViewMessage?: (karya: Karya) => void;
  emptyMessage?: string;
}

/**
 * Karya Table Component
 * Displays list of karya in a table format
 */
const KaryaTable = memo(
  ({
    karya,
    isDeleting,
    isApproving,
    onDelete,
    onApprove,
    onViewMessage,
    emptyMessage,
  }: KaryaTableProps) => {
    const [previewKarya, setPreviewKarya] = useState<Karya | null>(null);

    return (
      <>
        {/* Horizontal Scrollable Container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Judul</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Kategori</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Status</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Pesan Admin</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Tanggal Upload</th>
                  <th className="text-left p-4 font-semibold whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {karya.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      {emptyMessage || "Belum ada karya yang diupload"}
                    </td>
                  </tr>
                ) : (
                  karya.map((item) => (
                    <KaryaTableRow
                      key={item.id}
                      karya={item}
                      isDeleting={isDeleting === item.id}
                      isApproving={isApproving === item.id}
                      onDelete={onDelete}
                      onApprove={onApprove}
                      onViewMessage={onViewMessage}
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

KaryaTable.displayName = "KaryaTable";

/**
 * Individual Table Row Component
 */
const KaryaTableRow = memo(
  ({
    karya,
    isDeleting,
    isApproving,
    onDelete,
    onApprove,
    onViewMessage,
    onPreview,
  }: {
    karya: Karya;
    isDeleting: boolean;
    isApproving?: boolean;
    onDelete: (id: string, title: string) => void;
    onApprove?: (id: string, title: string) => void;
    onViewMessage?: (karya: Karya) => void;
    onPreview: () => void;
  }) => {
    return (
      <tr className="border-b hover:bg-gray-50 transition-colors">
        <td className="p-4 whitespace-nowrap">
          <div className="min-w-[150px]">
            <div className="font-medium">{karya.title}</div>
            {karya.description && (
              <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                {karya.description.slice(0, 40)}...
              </div>
            )}
          </div>
        </td>
        <td className="p-4 capitalize whitespace-nowrap">{karya.category}</td>
        <td className="p-4 whitespace-nowrap">
          <StatusBadge status={karya.status} />
        </td>
        <td className="p-4 whitespace-nowrap">
          {/* Message Button/Badge */}
          {karya.noteForAdmin ? (
            <button
              onClick={() => onViewMessage && onViewMessage(karya)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium"
              title="Klik untuk melihat pesan"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Lihat Pesan</span>
            </button>
          ) : (
            <span className="text-gray-400 text-sm italic">Tidak ada pesan</span>
          )}
        </td>
        <td className="p-4 whitespace-nowrap text-sm">
          {new Date(karya.uploadedAt).toLocaleDateString("id-ID")}
        </td>
        <td className="p-4 whitespace-nowrap">
          <div className="flex gap-2">
            {/* Preview Button */}
            <PreviewButton onClick={onPreview} />
            
            {/* Show Approve button only if status is pending and onApprove is provided */}
            {karya.status === "pending" && onApprove && (
              <ApproveButton
                isApproving={isApproving || false}
                onClick={() => onApprove(karya.id, karya.title)}
              />
            )}
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
      className="px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700"
      aria-label="Preview karya"
      title="Pratinjau detail karya"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4" 
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
      <span className="hidden xl:inline">Preview</span>
    </button>
  );
});

PreviewButton.displayName = "PreviewButton";

/**
 * Status Badge Component
 */
const StatusBadge = memo(({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
        status
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
});

StatusBadge.displayName = "StatusBadge";

/**
 * Delete Button Component
 */
const DeleteButton = memo(
  ({ isDeleting, onClick }: { isDeleting: boolean; onClick: () => void }) => {
    return (
      <button
        onClick={onClick}
        disabled={isDeleting}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          isDeleting
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
        aria-label={isDeleting ? "Deleting..." : "Delete karya"}
      >
        {isDeleting ? (
          <span className="flex items-center">
            <LoadingSpinner />
            Menghapus...
          </span>
        ) : (
          "Reject"
        )}
      </button>
    );
  }
);

DeleteButton.displayName = "DeleteButton";

/**
 * Approve Button Component
 */
const ApproveButton = memo(
  ({ isApproving, onClick }: { isApproving: boolean; onClick: () => void }) => {
    return (
      <button
        onClick={onClick}
        disabled={isApproving}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          isApproving
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
        aria-label={isApproving ? "Approving..." : "Approve karya"}
      >
        {isApproving ? (
          <span className="flex items-center">
            <LoadingSpinner />
            Menyetujui...
          </span>
        ) : (
          "Approve"
        )}
      </button>
    );
  }
);

ApproveButton.displayName = "ApproveButton";

/**
 * Loading Spinner Component
 */
const LoadingSpinner = memo(() => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
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
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
));

LoadingSpinner.displayName = "LoadingSpinner";

export default KaryaTable;
