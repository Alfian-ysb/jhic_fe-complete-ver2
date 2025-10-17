import { useEffect } from 'react'
import Navbar from '../components/navbar'
import { useParams, useNavigate } from 'react-router-dom'
import detailSaranaPrasaranaData from '../data/detailSaranaPrasarana.json'

const detailSaranaPrasarana = () => {
    const data = detailSaranaPrasaranaData;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const content = data.find(item => item.id === id);

    useEffect(() => {
        if (!content) {
            navigate('/notfound', { replace: true });
        }
    }, [content, navigate]
    );

    if (!content) {
        return null;
    }
    
  return (
    <div>
        <Navbar />
        <main className='w-full flex justify-center'>
            <div className='max-w-7xl w-full h-auto flex flex-col items-center'>
                <h1 className='w-full text-left text-4xl font-inter font-bold py-4'>{content.title}</h1>
                <div className="w-full h-auto max-w-7xl items-center rounded-2xl overflow-clip bg-[#EDF0F8]">
                    <div className='w-full min-h-[300px]'>
                        <img className='w-full h-[45rem] object-center object-cover rounded-2xl' src={content.images} alt={content.title} />
                    </div>
                    <p className="text-xl text-neutral-600 px-4 py-10">{content.description}</p>
                </div>
            </div>
        </main>
    </div>
  )
}

export default detailSaranaPrasarana