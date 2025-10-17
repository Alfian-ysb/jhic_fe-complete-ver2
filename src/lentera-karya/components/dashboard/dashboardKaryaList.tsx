// Dashboard Karya List
import { useState, useEffect } from 'react';
import { deleteKarya, getAllKarya } from '../../api/karyaServices';
import { useKaryaFilter } from '../../hooks/useKaryaFilter';
import type { Karya } from '../../types/karya';

// components
import Alert from './Alert';
import KaryaFilterSort from './KaryaFilterSort';
import KaryaTable from './KaryaTable';

/**
 * Main Dashboard Karya List Component
 * Displays user's uploaded karya with filter, sort, and delete functionality
 */
const DashboardKaryaList = () => {
  // State management
  const [karyaList, setKaryaList] = useState<Karya[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>("");

  // Filter and sort logic (custom hook)
  const { 
    sortBy, 
    filterStatus, 
    filteredKarya, 
    setSortBy, 
    setFilterStatus 
  } = useKaryaFilter(karyaList);

  /**
   * Fetch karya data on component mount
   */
  useEffect(() => {
    const fetchKaryaData = async () => {
      try {
        setIsLoading(true);
        setFetchError("");
        
        const data = await getAllKarya();
        setKaryaList(data as Karya[]);
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Gagal memuat data karya';
        setFetchError(errorMessage);
        console.error('Error fetching karya:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKaryaData();
  }, []); // Empty dependency array - fetch only on mount

  /**
   * Handle delete karya with confirmation
   */
  const handleDeleteKarya = async (id: string, title: string) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus karya "${title}"?\n\nTindakan ini tidak dapat dibatalkan.`
    );

    if (!isConfirmed) return;

    setIsDeleting(id);
    setDeleteError("");
    setDeleteSuccess("");

    try {
      await deleteKarya(id);
      setKaryaList(prevList => prevList.filter(karya => karya.id !== id));
      setDeleteSuccess(`Karya "${title}" berhasil dihapus`);
      
      setTimeout(() => setDeleteSuccess(""), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menghapus karya';
      setDeleteError(errorMessage);
      
      setTimeout(() => setDeleteError(""), 5000);
    } finally {
      setIsDeleting(null);
    }
  };

  /**
   * Get empty message based on filter status
   */
  const getEmptyMessage = () => {
    return filterStatus !== "all" 
      ? `Tidak ada karya dengan status "${filterStatus}"`
      : "Belum ada karya yang diupload";
  };
  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Karya Saya</h2>
        <button 
          onClick={() => window.location.href="/upload"} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Upload Karya Baru
        </button>
      </div>

      {/* Fetch Error Alert */}
      {fetchError && (
        <Alert 
          type="error" 
          message={fetchError}
          onClose={() => setFetchError("")}
        />
      )}

      {/* Success Alert */}
      {deleteSuccess && (
        <Alert 
          type="success" 
          message={deleteSuccess}
          onClose={() => setDeleteSuccess("")}
        />
      )}

      {/* Error Alert */}
      {deleteError && (
        <Alert 
          type="error" 
          message={deleteError}
          onClose={() => setDeleteError("")}
        />
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Memuat data karya...</p>
        </div>
      ) : (
        <>
          {/* Filter and Sort Controls */}
          <KaryaFilterSort
            sortBy={sortBy}
            filterStatus={filterStatus}
            onSortChange={setSortBy}
            onFilterChange={setFilterStatus}
            karyaList={karyaList}
            filteredCount={filteredKarya.length}
          />

          {/* Karya Table */}
          <KaryaTable
            karya={filteredKarya}
            isDeleting={isDeleting}
            onDelete={handleDeleteKarya}
            emptyMessage={getEmptyMessage()}
          />
        </>
      )}
    </div>
  );
};

export default DashboardKaryaList;
