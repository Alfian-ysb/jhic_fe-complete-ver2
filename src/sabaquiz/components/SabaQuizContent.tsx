import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS, apiCall } from '../utils/api'
import QuizIcon from '../assets/img/quizIcon.svg'
import LeagueIcon from '../assets/img/leagueIcon.svg'
import LeaderboardIcon from '../assets/img/leaderboardIcon.svg'

interface QuizItem {
  id: number
  title: string
  description: string
}

const SabaQuizContent: React.FC = () => {
  const [quizList, setQuizList] = useState<QuizItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✨ FETCH QUIZZES - GET /quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await apiCall(API_ENDPOINTS.quizzes)
        if (!response.ok) throw new Error('Failed to fetch quizzes')
        const data = await response.json()
        setQuizList(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading quizzes...</p>
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-red-600 text-lg mb-4">{error}</p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
        {/* Top Cards */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 w-full">
          
          {/* Quiz Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-[#99ddff] rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <img 
                src={QuizIcon}
                alt="Quiz Icon" 
                className="w-10 h-10 object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz</h3>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet</p>
          </div>

          {/* League Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => window.location.href = '/sabaquiz/league'}
          >
            <div className="w-16 h-16 bg-[#ffff99] rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <img 
                src={LeagueIcon}
                alt="League Icon" 
                className="w-10 h-10 object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">League</h3>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet</p>
          </div>

          {/* Leaderboard Card */}
          <button 
            onClick={() => window.location.href = '/sabaquiz/leaderboard'}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#b0eeb0] rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <img 
                src={LeaderboardIcon}
                alt="Leaderboard Icon" 
                className="w-10 h-10 object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Leaderboard</h3>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet</p>
          </button>
        </div>

        {/* Quiz List */}
        <div className="space-y-4 w-full">
          {quizList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada quiz tersedia</p>
            </div>
          ) : (
            quizList.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => window.location.href = '/sabaquiz//minigame'}
                className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between hover:shadow-lg transition-all cursor-pointer border border-gray-200 w-full hover:border-blue-300 active:scale-[0.99]"
              >
                <div className="flex items-center text-left gap-4 w-full">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#99ddff] rounded-xl flex items-center justify-center flex-shrink-0">
                    <img 
                      src="/images/puzzle.svg" 
                      alt="Quiz" 
                      className="w-6 h-6 object-contain"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                  {/* Content */}
                  <div className="w-full">
                    <h4 className="text-sm text-gray-500 mb-1">{quiz.title}</h4>
                    <p className="text-base sm:text-lg font-medium text-gray-900 break-words">
                      {quiz.description}
                    </p>
                  </div>
                </div>
                {/* Arrow Icon */}
                <div className="mt-4 sm:mt-0 text-gray-400 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SabaQuizContent