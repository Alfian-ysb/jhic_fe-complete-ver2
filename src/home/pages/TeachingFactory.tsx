import Navbar from '../components/navbar'
import Title from '../components/tiltle';
import TeachingFactoryContent from '../components/TeachingFactory/TeachingFactoryContent';

const TeachingFactory: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="py-10 lg:py-16 px-6 lg:px-16">
                <Title text="Teaching Factory" />
                <div className="mt-12">
                    <TeachingFactoryContent />
                </div>
            </main>
        </div>
    )
}

export default TeachingFactory