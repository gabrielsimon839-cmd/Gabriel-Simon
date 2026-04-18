import React from 'react';
import { Target, User, BarChart2, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNav = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {showNav && (
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">SkillGap AI</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Features</span>
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Enterprise</span>
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">About</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:block text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                <ShieldCheck className="w-3 h-3 inline mr-1" />
                Secure & Private
               </div>
            </div>
          </div>
        </header>
      )}
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Skill Gap Analyser. Powered by Gemini 2.5 Flash.</p>
      </footer>
    </div>
  );
};

export default Layout;