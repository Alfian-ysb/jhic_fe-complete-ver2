import React, { useState, useEffect } from 'react'
import Button from '../button'
import NewsItems from './newsItems'
import Berita from '../../data/beritaData.json'

// Interface untuk berita
interface NewsArticle {
  source: { name: string }
  title: string
  description?: string
  content: string[]
  url: string
  urlToImage?: string
  publishedAt: string
}

const newsFeed: React.FC = () => {
  // State untuk menyimpan semua berita
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  // Async fetch berita
  async function fetchNews() {
    try { 
      setLoading(true)
      // Simulasi fetch dari local JSON
      const data = await Promise.resolve(Berita.articles as NewsArticle[])
      setArticles(data)
    }
    catch (error) {
      console.error('Error fetching news:', error)
      setArticles([])
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
  
  // Empty state
  if (!articles || articles.length === 0) {
    return <div className="text-center py-20 text-gray-500">No news available at the moment</div>
  }
  
  const getNews = (index: number) => articles[index]
  const publishedDate = (index: number) => getNews(index)?.publishedAt?.slice(0, 10) || 'N/A'

  return (
    <div className="w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-10 lg:px-24">
      {/* Title */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
        <div className='flex flex-col'>
          <h1 className="w-full text-lg sm:text-xl text-left text-gray-500">BERITA TERKINI</h1>
          <h1 className="w-full text-3xl sm:text-4xl lg:text-5xl font-bold text-[#063852]">SMKN 1 BANTUL</h1>
        </div>
        <div className="w-full sm:w-auto">
          <Button buttonText='Lihat Semua' url='/berita'/>
        </div>
      </div>

      {/* Mobile: Stack vertikal, Tablet: 2 kolom, Desktop: Layout grid asli */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-6 gap-6">
        
        {/* Latest News - Featured */}
        {getNews(0) && (
          <div className="flex flex-col md:col-span-2 lg:col-span-2 lg:row-span-6 bg-white rounded-xl shadow-md hover:scale-101 hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-150 overflow-hidden">
            {getNews(0).urlToImage ? (
              <img 
                src={getNews(0).urlToImage} 
                alt={getNews(0).title}
                className="w-full h-64 md:h-96 lg:h-2/3 object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%25" height="100%25" fill="%23e5e7eb"/><text x="50%25" y="50%25" font-size="20" fill="%236b7280" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>' }}
              />
            ) : (
              <div className="w-full h-64 md:h-96 lg:h-2/3 bg-gray-200 flex items-center justify-center text-gray-500">
                Gambar tidak tersedia
              </div>
            )}
            <div className="px-4 md:px-6 flex flex-col gap-4 md:gap-6 h-full pt-6 md:pt-12 pb-4 md:pb-6">
              <h3 className="text-lg md:text-xl font-bold line-clamp-2">{getNews(0).title}</h3>
              <p className="text-sm md:text-md text-gray-600 line-clamp-2">
                {getNews(0).description}
              </p>
              <Button buttonText='Read More' url={getNews(0).url} />
            </div>
            <p className="w-full text-right py-2 px-4 text-sm md:text-base text-neutral-500 font-medium">{publishedDate(0)}</p>
          </div>
        )}
        {/* end of latest news */}


        {getNews(1) && (
          <NewsItems 
            gridTemplate='md:col-span-2 lg:col-span-3 lg:row-span-2 lg:col-start-3'
            imgSource={getNews(1).urlToImage}
            newstitle={getNews(1).title}
            newsDesc={getNews(1).description}
            published={publishedDate(1)}
            newsUrl={getNews(1).url}
          />
        )}

        {getNews(2) && (
          <NewsItems 
            gridTemplate='md:col-span-2 lg:col-span-3 lg:row-span-2 lg:col-start-3 lg:row-start-3'
            imgSource={getNews(2).urlToImage}
            newstitle={getNews(2).title}
            newsDesc={getNews(2).description}
            published={publishedDate(2)}
            newsUrl={getNews(2).url}
          />
        )}

        {getNews(3) && (
          <NewsItems 
            gridTemplate='md:col-span-2 lg:col-span-3 lg:row-span-2 lg:col-start-3 lg:row-start-5'
            imgSource={getNews(3).urlToImage}
            newstitle={getNews(3).title}
            newsDesc={getNews(3).description}
            published={publishedDate(3)}
            newsUrl={getNews(3).url}
          />
        )}

      </div>
    </div>


  )
}

export default newsFeed
