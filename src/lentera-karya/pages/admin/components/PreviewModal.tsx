import { memo, useEffect } from 'react';
import type { Karya } from '../../../types/karya';

interface PreviewModalProps {
  karya: Karya;
  onClose: () => void;
}

/**
 * Preview Modal Component
 * Displays a modal with karya details and file preview
 */
const PreviewModal = memo(({ karya, onClose }: PreviewModalProps) => {
  // ✅ STEP 5: Get API base URL for file display
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  // Build full URLs for files
  const fileUrl = karya.fileUrl 
    ? (karya.fileUrl.startsWith('http') 
        ? karya.fileUrl 
        : `${API_BASE_URL.replace('/api', '')}${karya.fileUrl}`)
    : '';

  const coverUrl = karya.coverUrl
    ? (karya.coverUrl.startsWith('http')
        ? karya.coverUrl
        : `${API_BASE_URL.replace('/api', '')}${karya.coverUrl}`)
    : '';

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Pratinjau Karya</h2>
              <p className="text-sm text-gray-600">Detail lengkap karya yang diupload</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Close preview"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-600" 
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

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Status and Category Badges */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadge(karya.status)}`}>
              {karya.status === 'pending' && '⏳ Menunggu Persetujuan'}
              {karya.status === 'approved' && '✅ Disetujui'}
              {karya.status === 'rejected' && '❌ Ditolak'}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-300 capitalize">
              📂 {karya.category}
            </span>
          </div>

          {/* Title and ID */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{karya.title}</h3>
            <p className="text-sm text-gray-500">ID: <span className="font-mono font-semibold">{karya.id}</span></p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Deskripsi</h4>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
              {karya.description || 'Tidak ada deskripsi'}
            </p>
          </div>

          {/* Note for Admin */}
          {karya.noteForAdmin && (
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Catatan untuk Admin</h4>
              <p className="text-gray-700 leading-relaxed bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                💬 {karya.noteForAdmin}
              </p>
            </div>
          )}

          {/* File Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Main File */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                File Karya Utama
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-medium">Nama File:</span>
                  <span className="text-gray-900 font-semibold truncate max-w-[200px]" title={karya.fileName}>
                    {karya.fileName || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-medium">Ukuran:</span>
                  <span className="text-gray-900 font-semibold">{formatFileSize(karya.fileSize)}</span>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <h4 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Cover Image
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-medium">Nama File:</span>
                  <span className="text-gray-900 font-semibold truncate max-w-[200px]" title={karya.coverName}>
                    {karya.coverName || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-medium">Ukuran:</span>
                  <span className="text-gray-900 font-semibold">{formatFileSize(karya.coverSize)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ STEP 5: Cover Image Preview */}
          {coverUrl && (
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Cover Image Preview</h4>
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                <img
                  src={coverUrl}
                  alt={`Cover ${karya.title}`}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-cover.jpg';
                    e.currentTarget.alt = 'Cover tidak dapat dimuat';
                  }}
                />
              </div>
            </div>
          )}

          {/* ✅ STEP 5: File Preview */}
          {fileUrl && (
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center justify-between">
                <span>File Preview</span>
                <a
                  href={fileUrl}
                  download={karya.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download
                </a>
              </h4>
              
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                {/* PDF Preview */}
                {karya.fileName.toLowerCase().endsWith('.pdf') && (
                  <iframe
                    src={fileUrl}
                    className="w-full h-96 border-0"
                    title={`Preview ${karya.title}`}
                  />
                )}
                
                {/* Image Preview */}
                {/\.(jpg|jpeg|png|gif|webp)$/i.test(karya.fileName) && (
                  <img
                    src={fileUrl}
                    alt={karya.title}
                    className="w-full rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                      e.currentTarget.alt = 'Gambar tidak dapat dimuat';
                    }}
                  />
                )}
                
                {/* Video Preview */}
                {/\.(mp4|avi|mov|wmv)$/i.test(karya.fileName) && (
                  <video
                    src={fileUrl}
                    controls
                    className="w-full rounded-lg"
                  >
                    Browser Anda tidak mendukung video player.
                  </video>
                )}

                {/* Word/Doc files - Download only */}
                {/\.(doc|docx)$/i.test(karya.fileName) && (
                  <div className="p-8 text-center bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500 mb-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700 font-medium mb-2">File Word</p>
                    <p className="text-sm text-gray-500 mb-4">Klik tombol download untuk melihat file</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Timeline</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Diupload pada:</span>
                <span className="text-gray-900 font-semibold">{formatDate(karya.uploadedAt)}</span>
              </div>
              {karya.approvedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-medium">Disetujui pada:</span>
                  <span className="text-gray-900 font-semibold">{formatDate(karya.approvedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={() => window.open(`/detail/${karya.id}`, '_blank')}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Lihat Halaman Lengkap
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
});

PreviewModal.displayName = 'PreviewModal';

export default PreviewModal;
