export type QuestionType = 'multiple_choice' | 'written';

export type MultipleChoiceQuestion = {
  type: 'multiple_choice';
  question: string;
  options: string[];
  answer?: string;
};

export type WrittenQuestion = {
  type: 'written';
  question: string;
  expected_keywords?: string[];
};

export type AdaptiveQuestion = MultipleChoiceQuestion | WrittenQuestion;

export type StudentProgress = Record<string, 'strong' | 'average' | 'weak'>;

export type GeminiAdaptiveResponse = {
  next_question: AdaptiveQuestion;
  student_progress?: StudentProgress;
  recommended_path?: string[];
};

export type StudentAnswer = {
  question: AdaptiveQuestion;
  response: string;
  correct?: boolean;
};


