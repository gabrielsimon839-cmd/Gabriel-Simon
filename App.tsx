import React, { useState } from 'react';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Assessment from './components/Assessment';
import Dashboard from './components/Dashboard';
import { UserProfile, Question, Answer, AnalysisResult } from './types';
import { generateAssessment, analyzeResults } from './services/geminiService';
import { Loader2 } from 'lucide-react';

enum AppView {
  ONBOARDING = 'onboarding',
  LOADING_ASSESSMENT = 'loading_assessment',
  ASSESSMENT = 'assessment',
  LOADING_ANALYSIS = 'loading_analysis',
  DASHBOARD = 'dashboard',
}

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.ONBOARDING);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleOnboardingComplete = async (userProfile: UserProfile) => {
    setProfile(userProfile);
    setView(AppView.LOADING_ASSESSMENT);
    
    // Generate questions using Gemini
    try {
      const generatedQuestions = await generateAssessment(userProfile);
      setQuestions(generatedQuestions);
      setView(AppView.ASSESSMENT);
    } catch (error) {
      console.error("Failed to generate assessment", error);
      // Ideally handle error state here
      setView(AppView.ONBOARDING);
    }
  };

  const handleAssessmentComplete = async (answers: Answer[]) => {
    if (!profile) return;
    setView(AppView.LOADING_ANALYSIS);

    try {
      const result = await analyzeResults(profile, answers);
      setAnalysis(result);
      setView(AppView.DASHBOARD);
    } catch (error) {
      console.error("Failed to analyze results", error);
      setView(AppView.ASSESSMENT);
    }
  };

  const LoadingScreen = ({ text }: { text: string }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-pulse" />
        </div>
      </div>
      <h2 className="mt-8 text-xl font-semibold text-slate-800">{text}</h2>
      <p className="text-slate-500 mt-2 text-sm max-w-xs text-center">
        Our AI is crunching the data to personalize your experience.
      </p>
    </div>
  );

  return (
    <Layout showNav={view !== AppView.ONBOARDING}>
      {view === AppView.ONBOARDING && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {view === AppView.LOADING_ASSESSMENT && (
        <LoadingScreen text="Generating your personalized assessment..." />
      )}

      {view === AppView.ASSESSMENT && (
        <Assessment questions={questions} onComplete={handleAssessmentComplete} />
      )}

      {view === AppView.LOADING_ANALYSIS && (
        <LoadingScreen text="Analyzing your skill gaps..." />
      )}

      {view === AppView.DASHBOARD && analysis && profile && (
        <Dashboard result={analysis} profile={profile} />
      )}
    </Layout>
  );
};

export default App;