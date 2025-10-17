// src/components/CreateQuiz/QuizInfoForm.tsx
import React from "react";
import type { QuizData } from './types';

interface Props {
  quizData: QuizData;
  onChange: (field: keyof Omit<QuizData, 'questions'>, value: string | number) => void;
}

const QuizInfoForm: React.FC<Props> = ({ quizData, onChange }) => (
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Quiz</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Judul Quiz</label>
        <input
          type="text"
          value={quizData.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Klik Judul Quiz"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
);

export default QuizInfoForm;
