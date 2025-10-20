// src/components/CreateQuiz/types.ts
export interface QuizQuestion {
  id: number;
  question: string;
  type: 'single' | 'multiple';
  options: string[];
  correctAnswer: number | number[] | null;
}

export interface QuizData {
  title: string;
  description: string;
  questions: QuizQuestion[];
}
