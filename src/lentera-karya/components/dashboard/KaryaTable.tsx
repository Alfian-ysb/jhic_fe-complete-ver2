import { memo } from 'react';
import type { Karya } from '../../types/karya';

interface KaryaTableProps {
    karya: Karya[];
    isDeleting: string | null;
    onDelete: (id: string, title: string) => void;
    emptyMessage?: string;
}

/**
 * Karya Table Component
 * Displays list of karya in a table format
 */
const KaryaTable = memo(({ karya, isDeleting, onDelete, emptyMessage }: KaryaTableProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="text-left p-4 font-semibold">Judul</th>
                        <th className="text-left p-4 font-semibold">Kategori</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Tanggal Upload</th>
                        <th className="text-left p-4 font-semibold">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {karya.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">
                                {emptyMessage || "Belum ada karya yang diupload"}
                            </td>
                        </tr>
                    ) : (
                        karya.map((item) => (
                            <KaryaTableRow
                                key={item.id}
                                karya={item}
                                isDeleting={isDeleting === item.id}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
});

KaryaTable.displayName = 'KaryaTable';

/**
 * Individual Table Row Component
 */
const KaryaTableRow = memo(({ 
    karya, 
    isDeleting, 
    onDelete 
}: { 
    karya: Karya; 
    isDeleting: boolean; 
    onDelete: (id: string, title: string) => void;
}) => {
    return (
        <tr className="border-b hover:bg-gray-50 transition-colors">
            <td className="p-4">{karya.title}</td>
            <td className="p-4 capitalize">{karya.category}</td>
            <td className="p-4">
                <StatusBadge status={karya.status} />
            </td>
            <td className="p-4">
                {new Date(karya.uploadedAt).toLocaleDateString('id-ID')}
            </td>
            <td className="p-4">
                <DeleteButton
                    isDeleting={isDeleting}
                    onClick={() => onDelete(karya.id, karya.title)}
                />
            </td>
        </tr>
    );
});

KaryaTableRow.displayName = 'KaryaTableRow';

/**
 * Status Badge Component
 */
const StatusBadge = memo(({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'approved': return 'bg-green-100 text-green-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
});

StatusBadge.displayName = 'StatusBadge';

/**
 * Delete Button Component
 */
const DeleteButton = memo(({ isDeleting, onClick }: { isDeleting: boolean; onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            disabled={isDeleting}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDeleting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
            }`}
            aria-label={isDeleting ? 'Deleting...' : 'Delete karya'}
        >
            {isDeleting ? (
                <span className="flex items-center">
                    <LoadingSpinner />
                    Menghapus...
                </span>
            ) : (
                'Delete'
            )}
        </button>
    );
});

DeleteButton.displayName = 'DeleteButton';

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

LoadingSpinner.displayName = 'LoadingSpinner';

export default KaryaTable;
