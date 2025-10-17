// Dashboard Karya List
import { useState, useEffect } from 'react';
import { approveKarya, rejectKarya, getAllKarya } from '../../../api/karyaServices';
import { useKaryaFilter } from '../../../hooks/useKaryaFilter';
import type { Karya } from '../../../types/karya';

// components
import Alert from './Alert';
import KaryaFilterSort from './KaryaFilterSort';
import KaryaTable from './KaryaTable';
import MessageModal from './MessageModal';

/**
 * Main Dashboard Karya List Component (ADMIN)
 * Displays all karya with filter, sort, delete, and approve functionality
 */
const DashboardKaryaList = () => {
  // State management
  const [karyaList, setKaryaList] = useState<Karya[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState<string>("");
  const [approveSuccess, setApproveSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>("");
  
  // Modal state for viewing admin message
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedKarya, setSelectedKarya] = useState<Karya | null>(null);

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
   * Handle reject karya with confirmation
   */
  const handleRejectKarya = async (id: string, title: string) => {
    // ✅ STEP 6: Ask for rejection reason
    const reason = window.prompt(
      `Mengapa karya "${title}" ditolak?\n\nBerikan alasan penolakan:`,
      ''
    );

    if (!reason || !reason.trim()) {
      alert('Alasan penolakan harus diisi');
      return;
    }

    setIsDeleting(id);
    setDeleteError("");
    setDeleteSuccess("");

    try {
      const adminId = 'admin-123'; // TODO: Get from auth context
      await rejectKarya(id, adminId, reason);
      
      // Refresh data from server
      const updatedData = await getAllKarya();
      setKaryaList(updatedData as Karya[]);
      
      setDeleteSuccess(`Karya "${title}" berhasil ditolak`);
      
      setTimeout(() => setDeleteSuccess(""), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menolak karya';
      setDeleteError(errorMessage);
      
      setTimeout(() => setDeleteError(""), 5000);
    } finally {
      setIsDeleting(null);
    }
  };

  /**
   * Handle approve karya with confirmation (ADMIN)
   */
  const handleApproveKarya = async (id: string, title: string) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menyetujui karya "${title}"?`
    );

    if (!isConfirmed) return;

    setIsApproving(id);
    setDeleteError("");
    setApproveSuccess("");

    try {
      const adminId = 'admin-123'; // TODO: Get from auth context
      await approveKarya(id, adminId);
      
      // Refresh data from server
      const updatedData = await getAllKarya();
      setKaryaList(updatedData as Karya[]);
      
      setApproveSuccess(`Karya "${title}" berhasil disetujui`);
      
      setTimeout(() => setApproveSuccess(""), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menyetujui karya';
      setDeleteError(errorMessage);
      
      setTimeout(() => setDeleteError(""), 5000);
    } finally {
      setIsApproving(null);
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

  /**
   * Handle open message modal
   */
  const handleOpenMessage = (karya: Karya) => {
    setSelectedKarya(karya);
    setModalOpen(true);
  };

  /**
   * Handle close message modal
   */
  const handleCloseMessage = () => {
    setModalOpen(false);
    setSelectedKarya(null);
  };
  
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Karya Siswa</h2>
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

      {/* Approve Success Alert */}
      {approveSuccess && (
        <Alert 
          type="success" 
          message={approveSuccess}
          onClose={() => setApproveSuccess("")}
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
            isApproving={isApproving}
            onDelete={handleRejectKarya}
            onApprove={handleApproveKarya}
            onViewMessage={handleOpenMessage}
            emptyMessage={getEmptyMessage()}
          />
        </>
      )}

      {/* Message Modal */}
      {selectedKarya && (
        <MessageModal
          isOpen={modalOpen}
          onClose={handleCloseMessage}
          karyaTitle={selectedKarya.title}
          noteForAdmin={selectedKarya.noteForAdmin || ""}
        />
      )}
    </div>
  );
};

export default DashboardKaryaList;
