export enum UserPersona {
  STUDENT = 'Student',
  PROFESSIONAL = 'Professional',
  JOB_SEEKER = 'Job Seeker',
  BUSINESS_OWNER = 'Business Owner',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  RATING = 'rating',
}

export interface UserProfile {
  name: string;
  ageRange: string;
  currentRole: string;
  goal: string;
  persona: UserPersona;
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[]; // For multiple choice
}

export interface Answer {
  questionId: number;
  questionText: string;
  answer: string | number;
}

export interface SkillGap {
  skill: string;
  currentScore: number; // 0-100
  targetScore: number; // 0-100
  gapLevel: 'Low' | 'Medium' | 'High';
}

export interface Recommendation {
  title: string;
  description: string;
  type: 'Course' | 'Project' | 'Mentor' | 'Article';
  provider?: string;
  duration?: string;
}

export interface AnalysisResult {
  overallScore: number; // 0-100
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  skillGaps: SkillGap[];
  recommendations: Recommendation[];
  summary: string;
}