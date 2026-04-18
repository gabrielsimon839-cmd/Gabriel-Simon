import React, { useState } from 'react';
import { UserProfile, UserPersona } from '../types';
import { ChevronRight, Briefcase, GraduationCap, Building2, Search } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    currentRole: '',
    goal: '',
    experience: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const determinePersona = (): UserPersona => {
    const { experience, currentRole, goal } = formData;
    const roleLower = currentRole.toLowerCase();
    const goalLower = goal.toLowerCase();

    if (roleLower.includes('student') || roleLower.includes('university') || experience === '0-2 years') {
      return UserPersona.STUDENT;
    }
    if (goalLower.includes('hire') || goalLower.includes('team') || roleLower.includes('founder') || roleLower.includes('manager')) {
      return UserPersona.BUSINESS_OWNER;
    }
    if (goalLower.includes('job') || goalLower.includes('opportunity') || roleLower === 'unemployed') {
      return UserPersona.JOB_SEEKER;
    }
    return UserPersona.PROFESSIONAL;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const persona = determinePersona();
    onComplete({
      name: formData.name,
      ageRange: formData.ageRange,
      currentRole: formData.currentRole,
      goal: formData.goal,
      persona: persona
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Let's build your profile</h2>
          <p className="text-slate-500">Answer a few questions so our AI can customize your assessment.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="e.g. Alex"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age Range</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={formData.ageRange}
                  onChange={(e) => handleChange('ageRange', e.target.value)}
                >
                  <option value="">Select range</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45+">45+</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => formData.name && formData.ageRange ? setStep(2) : null}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  formData.name && formData.ageRange
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Role / Status</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Marketing Manager, Student, Unemployed"
                  value={formData.currentRole}
                  onChange={(e) => handleChange('currentRole', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
                 <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                >
                  <option value="">Select experience</option>
                  <option value="0-2 years">0-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Goal</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Get promoted, Learn Python, Hire a team"
                  value={formData.goal}
                  onChange={(e) => handleChange('goal', e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                 <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Start Assessment <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
           <p className="text-xs text-center text-slate-400 font-medium uppercase tracking-wider mb-4">We cater to</p>
           <div className="grid grid-cols-4 gap-2 text-center">
              <div className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                 <GraduationCap className="w-5 h-5 text-indigo-500" />
                 <span className="text-xs text-slate-600">Students</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                 <Briefcase className="w-5 h-5 text-indigo-500" />
                 <span className="text-xs text-slate-600">Pros</span>
              </div>
               <div className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                 <Search className="w-5 h-5 text-indigo-500" />
                 <span className="text-xs text-slate-600">Job Seekers</span>
              </div>
               <div className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                 <Building2 className="w-5 h-5 text-indigo-500" />
                 <span className="text-xs text-slate-600">Business</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;