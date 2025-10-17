import React from 'react'
import SabaQuizNavbar from '../componets/navbar'
import CreateQuizContent from '../componets/CreateQuiz/CreateQuizContent'

const CreateQuiz: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SabaQuizNavbar />
      <CreateQuizContent />
    </div>
  )
}

export default CreateQuiz