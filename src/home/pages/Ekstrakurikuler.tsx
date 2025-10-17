import React from 'react';
import Navbar from '../components/navbar'
import Title from '../components/tiltle';
import EkstrakurikulerContent from '../components/ekstrakurikuler/EkstrakurikulerContent';

const Ekstrakurikuler: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="py-10 lg:py-16 px-6 lg:px-16">
                <Title text="EkstraKurikuler" />
                <div className="mt-12">
                    <EkstrakurikulerContent />
                    </div>
            </main>
            </div>
    )
}

export default Ekstrakurikuler