// src/components/CreateQuiz/QuestionList.tsx
import React from "react";
import type { QuizQuestion } from './types';

interface Props {
  questions: QuizQuestion[];
  onRemove: (index: number) => void;
  showPreviewState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const QuestionList: React.FC<Props> = ({ questions, onRemove, showPreviewState }) => {
  const [showPreview, setShowPreview] = showPreviewState;

  if (questions.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-900">Pertanyaan ({questions.length})</h2>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {showPreview ? 'Sembunyikan Pratinjau' : 'Tampilkan Pratinjau'}
        </button>
      </div>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-gray-900">Pertanyaan {index + 1}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${q.type === 'single' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {q.type === 'single' ? 'Single' : 'Multiple'}
                  </span>
                </div>
                {showPreview ? (
                  <div>
                    <p className="text-gray-700">{q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {q.options.map((opt, optIndex) => {
                        const isCorrect = Array.isArray(q.correctAnswer)
                          ? q.correctAnswer.includes(optIndex)
                          : q.correctAnswer === optIndex;
                        return (
                          <div
                            key={optIndex}
                            className={`px-3 py-2 rounded-lg text-sm ${
                              isCorrect
                                ? 'bg-green-100 text-green-700 font-semibold'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}. {opt}
                            {isCorrect && ' ✓'}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">{q.question.substring(0, 100)}...</p>
                )}
              </div>
              <button
                onClick={() => onRemove(index)}
                className="text-red-600 hover:text-red-700 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
