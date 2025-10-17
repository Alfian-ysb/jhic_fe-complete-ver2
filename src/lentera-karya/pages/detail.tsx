import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getKaryaById } from '../api/karyaServices'
import type { Karya } from '../types/karya'
import Navbar from '../components/navbar'
import { LoadingState, ErrorState, Breadcrumb, KaryaDetailContent } from '../components/detail'

/**
 * Detail Page Component
 * Main page for displaying individual karya details
 */
const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [karya, setKarya] = useState<Karya | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      loadKaryaDetail(id);
    }
  }, [id]);

  /**
   * Load karya detail from API
   * Only shows approved karya to public
   */
  const loadKaryaDetail = async (karyaId: string) => {
    try {
      setLoading(true);
      const data = await getKaryaById(karyaId);
      
      // Security: Only show approved karya
      if (data.status === 'approved') {
        setKarya(data);
      } else {
        setError("Karya tidak ditemukan atau belum disetujui");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat detail karya';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if no ID
  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar position="sticky" />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Error State */}
          {error && !loading && <ErrorState message={error} />}

          {/* Karya Detail */}
          {karya && !loading && !error && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Breadcrumb category={karya.category} title={karya.title} />
              <KaryaDetailContent karya={karya} />
            </div>
          )}
          
        </div>
      </div>
    </>
  );
};

export default Detail;