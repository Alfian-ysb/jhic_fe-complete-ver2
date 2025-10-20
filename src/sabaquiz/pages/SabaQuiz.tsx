
import React from 'react'
import Navbar from '../components/navbar'
import SabaQuizContent from '../components/SabaQuizContent'

const SabaQuiz: React.FC = () => {
  return (
    <div className="w-full bg-gray-50">
      <Navbar />
      <SabaQuizContent />
    </div>
  )
}

export default SabaQuiz