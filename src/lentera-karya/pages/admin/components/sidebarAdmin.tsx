type AdminDashboardProps = 'dataKarya' | 'manageKarya' | 'kategoriKarya';

interface SidebarAdminProps {
  activeTab?: AdminDashboardProps;
  onTabChange: (tab: AdminDashboardProps) => void;
} 

const DashboardSideBar = ({ activeTab, onTabChange }: SidebarAdminProps) => {
  const menuItems = [
    { id: 'dataKarya' as AdminDashboardProps, label: 'Karya Siswa' },
    { id: 'manageKarya' as AdminDashboardProps, label: 'Manage Karya' },
    { id: 'kategoriKarya' as AdminDashboardProps, label: 'Kategori Karya' }
  ];
  return (
    <div className="w-full h-screen bg-white">
      {/* User Profile Section */}
      <div className="p-6 ">
        <div className="flex items-center border-b pb-4 gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div>
            <p className="font-semibold">Admin Sekolah</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === item.id
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSideBar;
