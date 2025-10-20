import React from 'react'
import SabaQuizNavbar from '../components/navbar'
import CreateQuizContent from '../components/CreateQuiz/CreateQuizContent'

const CreateQuiz: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SabaQuizNavbar />
      <CreateQuizContent />
    </div>
  )
}

export default CreateQuiz