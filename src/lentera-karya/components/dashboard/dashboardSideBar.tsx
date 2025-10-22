type MenuType = 'overview' | 'karya' ;

interface DashboardSideBarProps {
  activeMenu: MenuType;
  onMenuChange: (menu: MenuType) => void;
}

const DashboardSideBar = ({ activeMenu, onMenuChange }: DashboardSideBarProps) => {
  const menuItems = [
    { id: 'overview' as MenuType, label: 'Dashboard' },
    { id: 'karya' as MenuType, label: 'Karya Saya' },
  ];

  return (
    <div className="w-full h-fit bg-white">
      {/* User Profile Section */}
      <div className="p-6 ">
        <div className="flex items-center border-b pb-4 gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <div>
            <p className="font-semibold">Siswa1</p>
            <p className="text-sm text-gray-500">Siswa</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onMenuChange(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeMenu === item.id
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
