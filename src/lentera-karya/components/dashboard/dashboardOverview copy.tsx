interface DashboardStats {
  totalKarya: number;
  pending: number;
  approved: number;
  rejected: number;
}

export default function DashboardOverview() {
  // Mock data - nanti ambil dari API
  const stats: DashboardStats = {
    totalKarya: 42,
    pending: 5,
    approved: 35,
    rejected: 2,
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Total Karya</div>
          <div className="text-3xl font-bold text-blue-600">{stats.totalKarya}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Approved</div>
          <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm mb-2">Rejected</div>
          <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Karya "Puisi Cinta" diupload</p>
              <p className="text-sm text-gray-500">2 jam yang lalu</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>
          </div>
          
          <div className="flex items-center justify-between border-b border-neutral-600 pb-3">
            <div>
              <p className="font-medium">Karya "Lukisan Pemandangan" disetujui</p>
              <p className="text-sm text-gray-500">5 jam yang lalu</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Approved</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Karya "Animasi gwe" ditolak</p>
              <p className="text-sm text-gray-500">1 hari yang lalu</p>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Rejected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
