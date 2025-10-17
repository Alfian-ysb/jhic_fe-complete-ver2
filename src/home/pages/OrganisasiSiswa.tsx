import React from  'react'
import Navbar from '../components/navbar'
import Title from '../components/tiltle';
import OrganisasiSiswaContent from '../components/organisasisiswa/OrganisasiSiswaContent';

const OrganisasiSiswa: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="py-10 lg:py-16 px-6 lg:px-16">
                <Title text="Organisasi Siswa" />
                <div className="mt-12">
                    <OrganisasiSiswaContent />
                </div>
            </main>
        </div>
    )
}

export default OrganisasiSiswa
