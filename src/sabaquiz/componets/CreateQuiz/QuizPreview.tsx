// src/components/CreateQuiz/QuizPreview.tsx
import React from "react";
import type { QuizData } from './types';

interface Props {
  quizData: QuizData;
  onSave: () => void;
  onCancel: () => void;
}

const QuizPreview: React.FC<Props> = ({ quizData, onSave, onCancel }) => (
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pratinjau Kuis</h2>
    <p><strong>Judul:</strong> {quizData.title}</p>
    <p><strong>Deskripsi:</strong> {quizData.description}</p>

    <div className="mt-4">
      {quizData.questions.map((q, i) => (
        <div key={q.id} className="mb-3 border p-3 rounded-lg">
          <p className="font-semibold">
            {i + 1}. {q.question}
          </p>
          <ul className="ml-5 list-disc">
            {q.options.map((opt, j) => (
              <li
                key={j}
                className={
                  q.type === "single"
                    ? q.correctAnswer === j
                      ? "text-green-600"
                      : ""
                    : (q.correctAnswer as number[] | null)?.includes(j)
                    ? "text-green-600"
                    : ""
                }
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="flex gap-3 mt-4">
      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Simpan Kuis
      </button>
      <button
        onClick={onCancel}
        className="border border-gray-400 px-4 py-2 rounded-lg"
      >
        Kembali
      </button>
    </div>
  </div>
);

export default QuizPreview;
