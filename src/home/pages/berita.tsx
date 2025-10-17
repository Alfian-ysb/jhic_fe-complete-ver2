import React, { useState, useEffect } from 'react'
import Navbar  from '../components/navbar'
import { Link } from 'react-router-dom'
import slugify from '../utils/slugify'
import Title from '../components/tiltle'

interface News {
  title: string;
  description: string;
  // NewsAPI returns `urlToImage` (may be null)
  urlToImage?: string | null;
  publishedAt: string;
}

const news: React.FC = () => {
    const [articles, setArticles] = useState<News[]>([])
    const [loading, setLoading] = useState(true)
    
    // Async fetch berita
    async function fetchNews() {
      try {
        setLoading(true)
        const response = await fetch(
            'https://newsapi.org/v2/top-headlines?' +
            'sources=bbc-news&' +
            'apiKey=1ef2239cd4ce426ebdb044d8dfe9fdfd'
        )
        const data = await response.json()
        setArticles(data.articles)
        console.log(data.articles)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchNews()
    }, [])
  
    // Loading state
    if (loading) {
      return <div className="text-center py-20">Loading...</div>
    }
      
      
    return (
      <div className='w-screen'>
        <Navbar />
        <main>
            <Title text='BERITA TERKINI' />
            <div className='mt-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 mb-20'>
          {articles.map((article, index) => {
            const slug = slugify(article.title)
            return (
              <Link
                key={slug || index}
                to={`/berita/${slug}`}
                state={{ article, slug }}
                className='block h-full'
              >
              <div className='h-full bg-neutral-50 shadow-sm  rounded-lg overflow-clip hover:shadow-lg hover:scale-101 transition-all duration-150'>
                    {article.urlToImage ? (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full object-cover h-48 mb-4"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%25" height="100%25" fill="%23e5e7eb"/><text x="50%25" y="50%25" font-size="20" fill="%236b7280" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>' }}
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
                            Gambar tidak tersedia
                        </div>
                    )}
                    <div className='flex flex-col gap-2.5 h-full p-4'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-xl font-semibold'>{article.title}</h2>
                            <p className='text-gray-600'>{article.description}</p>
                        </div>
                        <p className='text-sm text-gray-500'>{new Date(article.publishedAt).toLocaleDateString()}</p>
                    </div>
              </div>
              </Link>
            )
          })}
                </div>
            </div>
        </main>
      </div>
    )
}

export default news