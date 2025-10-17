
import React from 'react'
import Navbar from '../componets/navbar'
import SabaQuizContent from '../componets/SabaQuizContent'

const SabaQuiz: React.FC = () => {
  return (
    <div className="w-full bg-gray-50">
      <Navbar />
      <SabaQuizContent />
    </div>
  )
}

export default SabaQuiz