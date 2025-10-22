import { useState } from "react";
import Navbar from "../components/navbar";
import DashboardSideBar from "../components/dashboard/dashboardSideBar";
import DashboardOverview from "../components/dashboard/dashboardOverview";
import DashboardKaryaList from "../components/dashboard/dashboardKaryaList";

// Type untuk menu yang tersedia
type MenuType = 'overview' | 'karya';

const Dashboard = () => {
  // State untuk track menu yang aktif
  const [activeMenu, setActiveMenu] = useState<MenuType>('overview');

  // Function untuk render content berdasarkan menu aktif
  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return <DashboardOverview />;
      case 'karya':
        return <DashboardKaryaList />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
        <Navbar position=""/>

      <div className="flex-1 min-h-0 box-border py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Sidebar - Fixed, tidak scroll */}
        <aside className="rounded-xl bg-white shadow-md overflow-y-auto">
          <DashboardSideBar 
            activeMenu={activeMenu} 
            onMenuChange={setActiveMenu} 
          />
        </aside>

        {/* Main Content - Scrollable */}
        <main className="box-border p-4 md:p-6 rounded-2xl bg-white shadow-lg lg:col-span-4 overflow-y-auto min-h-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
