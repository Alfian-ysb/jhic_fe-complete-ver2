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
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
        <Navbar position=""/>

      <div className="flex-1 px-16 box-border py-8 grid grid-cols-5 grid-rows-1 gap-4 overflow-hidden">
        {/* Sidebar - Fixed, tidak scroll */}
        <aside className="col-start-1 col-span-1 rounded-xl bg-white shadow-md overflow-y-auto">
          <DashboardSideBar 
            activeMenu={activeMenu} 
            onMenuChange={setActiveMenu} 
          />
        </aside>

        {/* Main Content - Scrollable */}
        <main className="box-border p-2 rounded-2xl bg-white shadow-lg col-start-2 col-span-4 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
