import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswers: number[] // bisa lebih dari satu
  type: 'single' | 'multiple' // jenis quiz
}

const MiniGameContent: React.FC = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)

  const questions: Question[] = [
    {
      id: 1,
      question:
        'Pilih semua pernyataan yang benar tentang lorem ipsum?',
      options: [
        'Lorem ipsum adalah teks contoh dalam percetaka.',
        'Lorem ipsum digunakan sejak abad ke-16.',
        'Lorem ipsum berarti “teks nyata” dalam bahasa Latin.',
        'Lorem ipsum berasal dari naskah Cicero.',
      ],
      correctAnswers: [0, 1, 3],
      type: 'multiple', // check box
    },
    {
      id: 2,
      question: 'Siapakah Bapak Koperasi Indonesia?',
      options: ['Mohammad Hatta', 'Ahmad Soebarjo', 'Ir Soekarno', 'Alfian Yofa Setya Budi'],
      correctAnswers: [1],
      type: 'single', // pilihan ganda
    },
    {
      id: 3,
      question: 'Pilih dua framework JavaScript yang populer:',
      options: ['React', 'Laravel', 'Vue', 'Tailwind CSS'],
      correctAnswers: [0, 2],
      type: 'multiple',
    },
    {
      id: 4,
      question: 'HTML digunakan untuk?',
      options: [
        'Mendesain tampilan antarmuka aplikasi',
        'Mengatur struktur halaman web',
        'Menulis logika backend server',
        'Membuat animasi interaktif',
      ],
      correctAnswers: [1],
      type: 'single',
    },
  ]

  const handleAnswerToggle = (index: number) => {
    const current = questions[currentQuestion]
    if (current.type === 'single') {
      // pilihan ganda → hanya satu yang bisa dipilih
      setSelectedAnswers([index])
    } else {
      // checkbox → bisa pilih lebih dari satu
      setSelectedAnswers((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      )
    }
  }

  const handleNext = () => {
    const correctSet = new Set(questions[currentQuestion].correctAnswers)
    const selectedSet = new Set(selectedAnswers)

    const isCorrect =
      correctSet.size === selectedSet.size &&
      [...correctSet].every((x) => selectedSet.has(x))

    if (isCorrect) setScore(score + 1)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswers([])
    } else {
      alert(
        `Quiz selesai! Skor kamu: ${
          score + (isCorrect ? 1 : 0)
        } / ${questions.length}`
      )
      navigate('/sabaquiz')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Quiz"
                className="w-6 h-6 object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Quiz
            </h1>
          </div>
          <button
            onClick={() => navigate('/sabaquiz')}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl border-4 border-blue-500 p-6 sm:p-8 mb-8 relative">
          <div className="mt-8 mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Question{' '}
              <span className="text-blue-400">
                {String(currentQuestion + 1).padStart(2, '0')}
              </span>{' '}
              <span className="text-gray-500 text-sm">
                ({questions[currentQuestion].type === 'multiple'
                  ? 'Checkbox'
                  : 'Pilihan Ganda'}
                )
              </span>
            </h2>
            <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <p className="text-gray-800 text-base sm:text-lg leading-relaxed text-center">
            {questions[currentQuestion].question}
          </p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerToggle(index)}
              className={`bg-blue-100 hover:bg-blue-200 rounded-2xl p-4 sm:p-6 text-left transition-all duration-200 border-2 ${
                selectedAnswers.includes(index)
                  ? 'border-blue-500 bg-blue-200'
                  : 'border-transparent'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-gray-800 text-sm sm:text-base flex-1">
                  {option}
                </p>
                <div
                  className={`${
                    questions[currentQuestion].type === 'multiple'
                      ? 'w-6 h-6 rounded-md' // checkbox
                      : 'w-6 h-6 rounded-full' // radio
                  } border-2 flex items-center justify-center ${
                    selectedAnswers.includes(index)
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-400'
                  }`}
                >
                  {selectedAnswers.includes(index) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      {questions[currentQuestion].type === 'multiple' ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <circle cx="12" cy="12" r="4" fill="white" />
                      )}
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-300 mb-8"></div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedAnswers.length === 0}
            className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 ${
              selectedAnswers.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  )
}

export default MiniGameContent
