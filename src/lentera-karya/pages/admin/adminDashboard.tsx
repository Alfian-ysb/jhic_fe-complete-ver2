import React from 'react'
import SidebarAdmin from './components/sidebarAdmin'
import DataKarya from './components/DataKarya'
import CategoryKarya from './components/categoryKarya'
import KaryaManagement from './components/karyaManagement'

type AdminDashboardProps = 'dataKarya' | 'manageKarya' | 'kategoriKarya'

const adminDashboard = () => {

  const [activeTab, setActiveTab] = React.useState<AdminDashboardProps>('dataKarya');

  const rendercontent = () => {
    switch (activeTab) {
      case 'dataKarya':
        return <DataKarya />;
      case 'kategoriKarya':
        return <CategoryKarya />;
      case 'manageKarya':
        return <KaryaManagement />;
      default:
        return <DataKarya />;
    }
  }

  return (
    <div className='bg-[#EBEBEB] grid grid-cols-5 grid-rows-1'>
      <aside className='h-screen sticky top-0 col-span-1'>
        <SidebarAdmin activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>
      <main className='p-4 col-span-4'>
        {rendercontent()}
      </main>
    </div>
  )
}

export default adminDashboard