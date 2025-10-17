// src/components/CreateQuiz/CreateQuizContent.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizData, QuizQuestion } from './types';
import QuizInfoForm from './QuizInfoForm';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
// import QuizPreview from './QuizPreview';
import { showToast } from '../ui/toast';
import { Toaster } from 'react-hot-toast';

const CreateQuizContent: React.FC = () => {
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState<QuizData>({
    title: '',
    description: '',
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    id: 1,
    question: '',
    type: 'single',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle Quiz Info Change
  const handleQuizInfoChange = (field: keyof Omit<QuizData, 'questions'>, value: string | number) => {
    setQuizData({ ...quizData, [field]: value });
  };

  // Handle Question Type Change
  const handleQuestionTypeChange = (type: 'single' | 'multiple') => {
    setCurrentQuestion({
      ...currentQuestion,
      type: type,
      correctAnswer: type === 'single' ? 0 : []
    });
  };

  // Handle Question Change
  const handleQuestionChange = (value: string) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: value
    });
  };

  // Handle Option Change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions
    });
  };

  // Handle Correct Answer Change (Radio - Single)
  const handleCorrectAnswerChange = (index: number) => {
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: index
    });
  };

  // Handle Multiple Answer Change (Checkbox - Multiple)
  const handleMultipleAnswerChange = (index: number) => {
    const currentAnswers = Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer
      : [];

    if (currentAnswers.includes(index)) {
      setCurrentQuestion({
        ...currentQuestion,
        correctAnswer: currentAnswers.filter(i => i !== index)
      });
    } else {
      setCurrentQuestion({
        ...currentQuestion,
        correctAnswer: [...currentAnswers, index]
      });
    }
  };

  // Add Question to Quiz
  const handleAddQuestion = () => {
    if (!currentQuestion.question || currentQuestion.options.some(opt => !opt)) {
      showToast("error", "tollong isi quiznya untuk mengirim")
      return;
    }
    if(currentQuestion.type === 'single'){
      const answers = currentQuestion.correctAnswer as number;
      if(answers === null || answers === undefined){
        showToast("error", "pilih 1 jawaban benar")
        return;
      }
    }

    if (currentQuestion.type === 'multiple') {
      const answers = currentQuestion.correctAnswer as number[] | null;
      if (!answers || answers.length === 0) {
        showToast("error", "Pilih lebih dari 1 jawaban")
        return;
      }
    }

    setQuizData({
      ...quizData,
      questions: [...quizData.questions, currentQuestion]
    });

    // Reset for next question
    setCurrentQuestion({
      id: quizData.questions.length + 2,
      question: '',
      type: 'single',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  // Remove Question
  const handleRemoveQuestion = (index: number) => {
    const newQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData({
      ...quizData,
      questions: newQuestions
    });
  };

  // ✨ CREATE QUIZ - POST /quizzes
  const handleCreateQuiz = async (payload: QuizData) => {
    try {
      const response = await fetch('http://localhost:8080/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create quiz');
      const data = await response.json();
      showToast("success", "Quiz berhasil dibuat!");
      return data;
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Error creating quiz");
      return null;
    }
  };

  // TODO: Implement these functions when needed
  // - PUT /quizzes/:id
  // const handleUpdateQuiz = async (quizId: string, payload: QuizData) => { ... };
  
  // DELETE /quizzes/:id
  // const handleDeleteQuiz = async (quizId: string) => { ... };
  
  // PATCH /quizzes/:id/publish
  // const handlePublishQuiz = async (quizId: string) => { ... };
  
  // PATCH /quizzes/:id/unpublish
  // const handleUnpublishQuiz = async (quizId: string) => { ... };

  // Save Quiz - Updated with API call
  const handleSaveQuiz = async () => {
    if (!quizData.title) {
      showToast("warning", "tolong isi judul dan desk")
      return;
    }
    if (quizData.questions.length === 0) {
      showToast("warning", "berikan pertanyaan")
      return;
    }

    setIsSaving(true);
    const result = await handleCreateQuiz(quizData);
    setIsSaving(false);

    if (result) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Buat Quiz Baru</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quiz Information Card */}
        <QuizInfoForm quizData={quizData} onChange={handleQuizInfoChange} />

        {/* Add Question Form */}
        <QuestionForm
          currentQuestion={currentQuestion}
          onTypeChange={handleQuestionTypeChange}
          onQuestionChange={handleQuestionChange}
          onOptionChange={handleOptionChange}
          onCorrectAnswerChange={handleCorrectAnswerChange}
          onMultipleAnswerChange={handleMultipleAnswerChange}
          onAddQuestion={handleAddQuestion}
        />

        {/* Questions List */}
        <QuestionList
          questions={quizData.questions}
          onRemove={handleRemoveQuestion}
          showPreviewState={[showPreview, setShowPreview]}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
          >
            Batalkan
          </button>
          <button
            onClick={handleSaveQuiz}
            disabled={isSaving}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow hover:shadow-xl disabled:opacity-50"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Quiz'}
          </button>
          <Toaster position='top-right'/>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizContent;