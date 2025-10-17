import React from  'react'
import Navbar from '../components/navbar'
import Title from '../components/tiltle';
import PrestasiContent from '../components/prestasi/PrestasiContent';

const PrestasiSiswa: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="py-10 lg:py-16 px-6 lg:px-16">
                <Title text="Prestasi Siswa dan Siswi" />
                <div className="mt-12">
                    <PrestasiContent />
                </div>
            </main>
        </div>
    )
}

export default PrestasiSiswa
