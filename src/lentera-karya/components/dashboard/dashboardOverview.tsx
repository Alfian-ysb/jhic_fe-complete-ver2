import { useState, useEffect } from "react";
import { getAllKarya } from "../../api/karyaServices";
import type { Karya } from "../../types/karya";

const dashboardOverview = () => {
  const [karyaData, setKaryaData] = useState<Karya[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getAllKarya();
        setKaryaData(data as Karya[]);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Gagal memuat data';
        setError(errorMessage);
        console.error('Error fetching karya:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = {
    totalKarya: karyaData.length,
    pending: karyaData.filter(k => k.status === 'pending').length,
    approved: karyaData.filter(k => k.status === 'approved').length,
    rejected: karyaData.filter(k => k.status === 'rejected').length,
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const recentActivities = {
    total: 5,
    items: karyaData
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(0, 5)
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-semibold mb-2">Error</p>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Total Karya</div>
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalKarya}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">
            {stats.pending}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Approved</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.approved}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Rejected</div>
          <div className="text-3xl font-bold text-red-600">
            {stats.rejected}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        {recentActivities.items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Belum ada aktivitas</p>
        ) : (
          recentActivities.items.map((karya) => (
            <div key={karya.id} className="flex items-center justify-between border-b pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
              <div>
                <p className="font-medium text-[1rem]">Karya "{karya.title}" diupload</p>
                <p className="text-sm text-gray-500">{new Date(karya.uploadedAt).toLocaleString()}</p>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusColors[karya.status]}`}>
                {karya.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default dashboardOverview;
