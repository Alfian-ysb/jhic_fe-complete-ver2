// Karya Management Component - Admin can manage approved karya
import { useState, useEffect } from 'react';
import { getKaryaApproved, deleteKarya } from '../../../api/karyaServices';
import type { Karya } from '../../../types/karya';

// components
import Alert from './Alert';
import KaryaManagementTable from './karyaManagementTable';

/**
 * Karya Management Component (ADMIN)
 * Displays approved karya with delete functionality
 */
const KaryaManagement = () => {
  // State management
  const [karyaList, setKaryaList] = useState<Karya[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Fetch approved karya on mount
  useEffect(() => {
    loadApprovedKarya();
  }, []);

  /**
   * Load all approved karya from API
   */
  const loadApprovedKarya = async () => {
    try {
      setLoading(true);
      const approvedKarya = await getKaryaApproved();
      setKaryaList(approvedKarya);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal memuat data karya';
      setDeleteError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle delete karya with confirmation
   */
  const handleDeleteKarya = async (id: string, title: string) => {
    const isConfirmed = window.confirm(
      `⚠️ PERHATIAN!\n\nAnda akan menghapus karya yang sudah disetujui:\n"${title}"\n\nKarya ini akan dihapus PERMANEN dari sistem (termasuk file di server) dan tidak dapat dikembalikan.\n\nApakah Anda yakin ingin melanjutkan?`
    );

    if (!isConfirmed) return;

    setIsDeleting(id);
    setDeleteError("");
    setDeleteSuccess("");

    try {
      // ✅ STEP 6: Delete karya (removes files from server too)
      await deleteKarya(id);
      
      // Refresh data from server
      const updatedData = await getKaryaApproved();
      setKaryaList(updatedData as Karya[]);
      
      setDeleteSuccess(`Karya "${title}" dan file-nya berhasil dihapus dari server`);
      
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
   * Filter karya based on search and category
   */
  const getFilteredKarya = () => {
    return karyaList.filter(karya => {
      const matchesSearch = karya.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (karya.description && karya.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = filterCategory === "all" || karya.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  /**
   * Sort karya based on sortBy option
   */
  const getSortedKarya = (karyas: Karya[]) => {
    const sorted = [...karyas];
    
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
      case "oldest":
        return sorted.sort((a, b) => 
          new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
        );
      case "title-asc":
        return sorted.sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      case "title-desc":
        return sorted.sort((a, b) => 
          b.title.localeCompare(a.title)
        );
      case "category":
        return sorted.sort((a, b) => 
          a.category.localeCompare(b.category)
        );
      default:
        return sorted;
    }
  };

  /**
   * Get filtered and sorted karya
   */
  const filteredKarya = getSortedKarya(getFilteredKarya());

  /**
   * Get unique categories for filter
   */
  const categories = Array.from(new Set(karyaList.map(k => k.category)));
  
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Management Karya Yang Sudah Di-Approve</h2>
      </div>

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

      {/* Filter and Search Controls */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Cari Karya:
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan judul atau deskripsi..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
              📊 Urutkan Berdasarkan:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="newest">📅 Terbaru</option>
              <option value="oldest">📅 Terlama</option>
              <option value="title-asc">🔤 Judul (A-Z)</option>
              <option value="title-desc">🔤 Judul (Z-A)</option>
              <option value="category">📁 Kategori</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              📁 Filter Kategori:
            </label>
            <select
              id="category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="all">Semua Kategori</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm text-gray-600">
          <div>
            Total Karya Approved: <span className="font-semibold text-blue-600">{karyaList.length}</span>
          </div>
          <div>
            Ditampilkan: <span className="font-semibold text-blue-600">{filteredKarya.length}</span>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Memuat data karya...</p>
        </div>
      ) : (
        /* Karya Table */
        <KaryaManagementTable
          karya={filteredKarya}
          isDeleting={isDeleting}
          onDelete={handleDeleteKarya}
          emptyMessage={
            searchQuery || filterCategory !== "all"
              ? "Tidak ada karya yang sesuai dengan filter"
              : "Belum ada karya yang di-approve"
          }
        />
      )}
    </div>
  );
};

export default KaryaManagement;
