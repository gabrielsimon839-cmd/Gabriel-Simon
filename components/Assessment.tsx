import React, { useState } from 'react';
import { Question, QuestionType, Answer } from '../types';
import { CheckCircle, Circle, Star } from 'lucide-react';

interface AssessmentProps {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answer: selectedOption
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
          <span>Progress</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 min-h-[400px] flex flex-col">
        <div className="flex-grow">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
            Question {currentIndex + 1}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
            {currentQuestion.text}
          </h3>

          <div className="space-y-4">
            {currentQuestion.type === QuestionType.MULTIPLE_CHOICE && currentQuestion.options && (
              currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                    selectedOption === option
                      ? 'border-indigo-600 bg-indigo-50 shadow-md'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`font-medium ${selectedOption === option ? 'text-indigo-800' : 'text-slate-700'}`}>
                    {option}
                  </span>
                  {selectedOption === option ? (
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 group-hover:text-indigo-300" />
                  )}
                </button>
              ))
            )}

            {currentQuestion.type === QuestionType.RATING && (
              <div className="flex flex-col items-center py-8">
                <div className="flex gap-4 mb-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedOption(rating)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                        selectedOption === rating
                          ? 'bg-indigo-600 text-white shadow-lg transform scale-110'
                          : 'bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between w-full max-w-xs text-xs text-slate-400 font-medium uppercase">
                  <span>Novice</span>
                  <span>Expert</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedOption !== null
                ? 'bg-indigo-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;