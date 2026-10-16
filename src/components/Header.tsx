import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext.tsx';
import {
  Mic,
  Headphones,
  BarChart3,
  Sparkles,
  Award,
  Flame,
  User,
  BookOpen,
  Volume2,
  CheckCircle2,
  X
} from 'lucide-react';
import { AUTHENTIC_RECITERS } from '../data/quranAyatData.ts';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, user, updateUser, memorizedAyahs, selectedReciter, setSelectedReciter } = useQuran();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState(user.name);
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoalAyat);
  const [level, setLevel] = useState(user.level);

  const memorizedCount = Object.keys(memorizedAyahs).length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: profileName,
      dailyGoalAyat: dailyGoal,
      level,
    });
    setShowProfileModal(false);
  };

  const navItems = [
    {
      id: 'recite' as const,
      label: 'Recite & Check',
      urdu: 'تلاوت و تصحیح',
      phase: 'Phase 1',
      icon: Mic,
    },
    {
      id: 'listen' as const,
      label: 'Listen & Memorize',
      urdu: 'استماع و حفظ',
      phase: 'Phase 2',
      icon: Headphones,
    },
    {
      id: 'stats' as const,
      label: 'Quran Statistics',
      urdu: 'قرآنی معلومات و شماریات',
      phase: 'Phase 3',
      icon: BarChart3,
    },
    {
      id: 'duas' as const,
      label: 'Masnoon Duain',
      urdu: 'مسنون دعائیں و اذکار',
      phase: 'Phase 4',
      icon: Sparkles,
    },
    {
      id: 'dashboard' as const,
      label: 'My Hifz Dashboard',
      urdu: 'میرا ڈیش بورڈ',
      phase: 'Phase 5',
      icon: Award,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
      {/* Top Banner with branding and quick stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('recite')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Quran Companion <span className="text-emerald-400 font-extrabold text-sm sm:text-base px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">AI</span>
                </span>
              </div>
              <p className="text-xs text-stone-400 font-arabic hidden sm:block">
                رَفِيقُ الْقُرْآنِ الذَّكِيُّ — حفظ، تلاوت، اور مسنون دعائیں
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Streak Counter */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-medium">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse fill-amber-400" />
              <span>{user.streakDays} Day Streak</span>
            </div>

            {/* Memorized counter badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{memorizedCount} Ayat Memorized</span>
            </div>

            {/* Profile Button */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700/80 border border-stone-700 text-stone-200 transition-all text-xs sm:text-sm"
              aria-label="User Profile and Settings"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline font-medium text-stone-200">{user.name}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-stone-950/60 border-t border-stone-800/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-start space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-1.5">
                    <span>{item.label}</span>
                    <span className={`text-[10px] px-1 py-0.2 rounded ${isActive ? 'bg-emerald-700/80 text-emerald-100' : 'bg-stone-800 text-stone-400'}`}>
                      {item.phase}
                    </span>
                  </div>
                  <span className={`text-[10px] font-urdu hidden md:block -mt-0.5 ${isActive ? 'text-emerald-100' : 'text-stone-500'}`}>
                    {item.urdu}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile & Settings Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-stone-100">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Learner Profile</h3>
                <p className="text-xs text-stone-400">Manage your Quran memorization preferences</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Memorization Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Beginner">Beginner (Starting with short Surahs)</option>
                  <option value="Intermediate">Intermediate (Memorizing Juz 30 / Tabarak)</option>
                  <option value="Advanced / Hafiz">Advanced / Hafiz (Revision & Full Quran)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Daily Memorization Goal (Ayat / Day)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setDailyGoal(num)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        dailyGoal === num
                          ? 'bg-emerald-600 text-white border border-emerald-400'
                          : 'bg-stone-800 text-stone-300 border border-stone-700 hover:bg-stone-750'
                      }`}
                    >
                      {num} {num === 1 ? 'Ayah' : 'Ayat'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Default Authentic Reciter</label>
                <div className="space-y-1.5">
                  {AUTHENTIC_RECITERS.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReciter(r)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedReciter.id === r.id
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                          : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800/40'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Volume2 className={`w-4 h-4 ${selectedReciter.id === r.id ? 'text-emerald-400' : 'text-stone-500'}`} />
                        <div>
                          <div className="text-xs font-semibold">{r.name}</div>
                          <div className="text-[11px] text-stone-400 font-arabic">{r.subname}</div>
                        </div>
                      </div>
                      {selectedReciter.id === r.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-900/30"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
