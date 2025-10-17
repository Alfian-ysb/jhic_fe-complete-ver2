// src/components/CreateQuiz/QuestionForm.tsx
import React from "react";
import type { QuizQuestion } from './types';

interface Props {
  currentQuestion: QuizQuestion;
  onTypeChange: (type: 'single' | 'multiple') => void;
  onQuestionChange: (value: string) => void;
  onOptionChange: (index: number, value: string) => void;
  onCorrectAnswerChange: (index: number) => void;
  onMultipleAnswerChange: (index: number) => void;
  onAddQuestion: () => void;
}

const QuestionForm: React.FC<Props> = ({
  currentQuestion,
  onTypeChange,
  onQuestionChange,
  onOptionChange,
  onCorrectAnswerChange,
  onMultipleAnswerChange,
  onAddQuestion,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Menambah Pertanyaan #{/* displayed in parent */''}</h2>
      <div className="space-y-4">
        {/* Question Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Pertanyaan *</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="questionType"
                checked={currentQuestion.type === 'single'}
                onChange={() => onTypeChange('single')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Pilihan Ganda</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="questionType"
                checked={currentQuestion.type === 'multiple'}
                onChange={() => onTypeChange('multiple')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Lebih dari Satu Jawaban</span>
            </label>
          </div>
        </div>

        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pertanyaan *</label>
          <textarea
            value={currentQuestion.question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder="Klik Pertanyaan Anda"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opsi Jawaban {currentQuestion.type === 'single' ? '(pilih satu yang benar)' : '(pilih semua yang benar)'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Single Choice */}
                {currentQuestion.type === 'single' ? (
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuestion.correctAnswer === index}
                    onChange={() => onCorrectAnswerChange(index)}
                    className="w-4 h-4 text-blue-600"
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={
                      Array.isArray(currentQuestion.correctAnswer) &&
                      currentQuestion.correctAnswer.includes(index)
                    }
                    onChange={() => onMultipleAnswerChange(index)}
                    className="w-4 h-4 text-blue-600"
                  />
                )}
                <input
                  type="text"
                  value={option}
                  onChange={(e) => onOptionChange(index, e.target.value)}
                  placeholder={`Opsi Jawaban ${String.fromCharCode(65 + index)}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * {currentQuestion.type === 'single' ? 'Klik untuk menandai jawaban benar' : 'Centang semua kotak yang benar'}
          </p>
        </div>

        {/* Add Question Button */}
        <button
          onClick={onAddQuestion}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Tambahkan Pertanyaan
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
