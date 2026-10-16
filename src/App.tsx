import React from 'react';
import { QuranProvider, useQuran } from './context/QuranContext.tsx';
import { Header } from './components/Header.tsx';
import { Phase1RecitationChecker } from './components/Phase1RecitationChecker.tsx';
import { Phase2AudioListening } from './components/Phase2AudioListening.tsx';
import { Phase3QuranStatistics } from './components/Phase3QuranStatistics.tsx';
import { Phase4MasnoonDuain } from './components/Phase4MasnoonDuain.tsx';
import { Phase5UserDashboard } from './components/Phase5UserDashboard.tsx';
import { BookOpen, Heart, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useQuran();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Sticky Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'recite' && <Phase1RecitationChecker />}
        {activeTab === 'listen' && <Phase2AudioListening />}
        {activeTab === 'stats' && <Phase3QuranStatistics />}
        {activeTab === 'duas' && <Phase4MasnoonDuain />}
        {activeTab === 'dashboard' && <Phase5UserDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800/80 py-8 px-4 text-center text-xs text-stone-400 mt-12">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center space-x-2 text-emerald-400 font-arabic text-base">
            <span>رَبِّ زِدْنِي عِلْمًا — "My Lord, increase me in knowledge." (Surah Ta-Ha 20:114)</span>
          </div>

          <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">
            Quran Companion AI is dedicated to authentic Quran memorization, recitation correction, listening, and Islamic knowledge.
          </p>

          <div className="flex items-center justify-center space-x-4 pt-2 text-[11px] text-stone-500">
            <span>114 Verified Surahs</span>
            <span>•</span>
            <span>Hafs 'an 'Asim Standard</span>
            <span>•</span>
            <span>Authentic Hadith References</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <QuranProvider>
      <AppContent />
    </QuranProvider>
  );
}
