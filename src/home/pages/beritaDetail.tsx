import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import slugify from '../utils/slugify'
import Navbar from '../components/navbar'

interface BeritaArticle {
  title: string;
  description?: string | null;
  urlToImage?: string | null;
  publishedAt?: string;
  content?: string | null;
  url?: string | null;
  author?: string | null;
}

const BeritaDetail: React.FC = () => {
  const params = useParams()
  const slugParam = params.slug
  const navigate = useNavigate()
  const location = useLocation()

  // Expect article passed via location.state
  const state = location.state as { article?: BeritaArticle, slug?: string } | null
  const passedArticle = state?.article

  const [article, setArticle] = useState<BeritaArticle | null>(passedArticle ?? null)
  const [loading, setLoading] = useState(!passedArticle)

  useEffect(() => {
    if (passedArticle) return

    // if no article provided, fetch list and try to match by slug
    async function fetchAndFind() {
      try {
        setLoading(true)
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=1ef2239cd4ce426ebdb044d8dfe9fdfd'
        )
        const data = await response.json()
        const found = (data.articles || []).find((a: BeritaArticle) => slugify(a.title) === slugParam)
        if (found) {
          setArticle(found)
        } else {
          // jika tidak ditemukan, kembali ke daftar
          navigate('/berita', { replace: true })
        }
      } catch (err) {
        console.error(err)
        navigate('/berita', { replace: true })
      } finally {
        setLoading(false)
      }
    }

    fetchAndFind()
  }, [passedArticle, slugParam, navigate])

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!article) return null

  return (
    <div className="w-screen mx-auto">
        <Navbar />
        <main className='px-40 py-20'>
        <Link to="/berita" className="text-sm text-blue-600">&larr; Kembali ke Berita</Link>
            <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
            <div className='w-full flex justify-between items-baseline'>
                <p className="text-sm text-gray-500 mt-2">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleString() : ''}
                </p>
                <p className='text-neutral-400 font-medium'>Author : {article.author}</p>
            </div>
            {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full object-cover my-6"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400"><rect width="100%25" height="100%25" fill="%23e5e7eb"/><text x="50%25" y="50%25" font-size="20" fill="%236b7280" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>' }}
                />
            ) : (
                <div className="w-full h-64 bg-gray-200 my-6 flex items-center justify-center text-gray-500">
                    <h1 className="text-lg font-semibold">Gambar tidak tersedia</h1>
                </div>
            )}

            <p className="text-xl text-gray-800">
                {article.description}
            </p>
            {article.content && (
                <div className="mt-6 text-gray-700">
                      <p>
                          {article.content}
                      </p>
                </div>
                )}
        </main>
    </div>
  )
}

export default BeritaDetail