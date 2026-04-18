import React from 'react';
import { AnalysisResult, UserProfile } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { Download, Share2, Award, ArrowRight, PlayCircle, BookOpen, Users, Layout as LayoutIcon } from 'lucide-react';

interface DashboardProps {
  result: AnalysisResult;
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ result, profile }) => {
  const chartData = result.skillGaps.map(gap => ({
    subject: gap.skill,
    A: gap.currentScore,
    B: gap.targetScore,
    fullMark: 100,
  }));

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white pt-12 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
                  {profile.persona}
                </span>
                <span className="text-slate-400 text-sm">Target: {profile.goal}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Hello, {profile.name}</h1>
              <p className="text-slate-400 max-w-xl">{result.summary}</p>
            </div>
            <div className="mt-6 md:mt-0 flex gap-3">
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-indigo-900/20 transition-all">
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Overlap the header */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Charts */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <div className="text-sm text-slate-500 font-medium mb-1">Overall Readiness</div>
              <div className="text-4xl font-bold text-indigo-600">{result.overallScore}%</div>
              <div className="w-full bg-slate-100 h-1.5 mt-4 rounded-full overflow-hidden">
                <div style={{ width: `${result.overallScore}%` }} className="h-full bg-indigo-600 rounded-full" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <div className="text-sm text-slate-500 font-medium mb-1">Current Level</div>
              <div className="text-3xl font-bold text-slate-800">{result.level}</div>
              <div className="text-xs text-indigo-600 mt-2 font-medium flex items-center gap-1">
                <Award className="w-3 h-3" /> Top 15% of peers
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <div className="text-sm text-slate-500 font-medium mb-1">Skills Identified</div>
              <div className="text-3xl font-bold text-slate-800">{result.skillGaps.length}</div>
              <div className="text-xs text-emerald-600 mt-2 font-medium">
                {result.skillGaps.filter(g => g.gapLevel === 'High').length} high priority
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Skill Gap Visualization</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                  <Radar
                    name="Current"
                    dataKey="A"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Target"
                    dataKey="B"
                    stroke="#cbd5e1"
                    strokeDasharray="4 4"
                    fill="transparent"
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500/30 border border-indigo-500"></span>
                <span className="text-slate-600">Your Score</span>
              </div>
               <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-slate-300 border-dashed"></span>
                <span className="text-slate-600">Industry Target</span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Detailed Analysis</h3>
            <div className="space-y-4">
              {result.skillGaps.map((gap, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="mb-2 sm:mb-0">
                    <div className="font-semibold text-slate-800">{gap.skill}</div>
                    <div className="text-xs text-slate-500">Gap: {gap.targetScore - gap.currentScore} points</div>
                  </div>
                  <div className="flex items-center gap-4 flex-1 sm:justify-end">
                    <div className="w-full sm:w-32 bg-white h-2 rounded-full border border-slate-200 overflow-hidden">
                       <div className="h-full bg-indigo-600" style={{ width: `${gap.currentScore}%` }}></div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${
                      gap.gapLevel === 'High' ? 'bg-red-100 text-red-700' :
                      gap.gapLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {gap.gapLevel} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations */}
        <div className="space-y-8">
          <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-indigo-100 text-sm mb-4">Get unlimited assessments, peer benchmarking, and certification tracking.</p>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors w-full">
                Start Free Trial
              </button>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-20">
              <Award className="w-32 h-32" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" /> 
              Recommended Learning
            </h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="group border border-slate-200 p-4 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase">
                      {rec.type}
                    </span>
                    {rec.duration && <span className="text-xs text-slate-400">{rec.duration}</span>}
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-indigo-700 transition-colors">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-slate-400">{rec.provider || 'AI Suggestion'}</span>
                    <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Social/Community Widget */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" /> 
              Community Pulse
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">JD</div>
                 <div className="text-sm">
                    <span className="font-semibold text-slate-800">Jane Doe</span> completed <span className="text-indigo-600">Advanced Python</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold">MK</div>
                 <div className="text-sm">
                    <span className="font-semibold text-slate-800">Mike K.</span> reached <span className="text-indigo-600">Expert Level</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;