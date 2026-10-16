import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext.tsx';
import {
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  RotateCcw,
  BookOpen,
  TrendingUp,
  Target,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Clock,
  Layers,
  AlertCircle
} from 'lucide-react';

export const Phase5UserDashboard: React.FC = () => {
  const {
    user,
    updateUser,
    memorizedAyahs,
    practiceHistory,
    revisionPlan,
    updateRevisionStatus,
    startRecitationTarget,
    setActiveTab,
  } = useQuran();

  const [activeTab, setActiveDashboardTab] = useState<'overview' | 'revision' | 'history'>('overview');

  const memorizedCount = Object.keys(memorizedAyahs).length;
  const TOTAL_QURAN_AYAT = 6236;
  const JUZ_30_AYAT = 564;

  const juz30Percentage = Math.min(100, Math.round((memorizedCount / JUZ_30_AYAT) * 100));
  const fullQuranPercentage = ((memorizedCount / TOTAL_QURAN_AYAT) * 100).toFixed(2);

  // Compute average recitation accuracy
  const averageAccuracy = practiceHistory.length
    ? Math.round(
        practiceHistory.reduce((acc, curr) => acc + curr.accuracyScore, 0) /
          practiceHistory.length
      )
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Profile Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-stone-900 to-teal-950/70 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-950/60 border-2 border-emerald-400/40">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                  {user.level}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Daily Goal: <span className="text-emerald-400 font-semibold">{user.dailyGoalAyat} Ayat / day</span> • Active Streak: <span className="text-amber-400 font-semibold">{user.streakDays} Days</span>
              </p>
            </div>
          </div>

          {/* Quick Hifz Streak & Accuracy Card */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3.5 flex-1 md:flex-none text-center min-w-[120px]">
              <div className="flex items-center justify-center space-x-1 text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span className="text-xl font-black">{user.streakDays}</span>
              </div>
              <span className="text-[11px] text-stone-400 block mt-0.5">Day Streak</span>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3.5 flex-1 md:flex-none text-center min-w-[120px]">
              <div className="text-xl font-black text-emerald-400">
                {averageAccuracy}%
              </div>
              <span className="text-[11px] text-stone-400 block mt-0.5">Avg Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-800 pb-2">
        <button
          onClick={() => setActiveDashboardTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          Progress & Memorization
        </button>
        <button
          onClick={() => setActiveDashboardTab('revision')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'revision'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <span>Hifz Revision Schedule </span>
          <span className="font-urdu text-xs opacity-90">(سبق، سبقی، منزل)</span>
        </button>
        <button
          onClick={() => setActiveDashboardTab('history')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'history'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          Practice & Mistakes History ({practiceHistory.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & PROGRESS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Progress Meters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Memorized Total */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Memorized Ayat
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {memorizedCount}{' '}
                <span className="text-xs font-normal text-stone-400">/ {TOTAL_QURAN_AYAT}</span>
              </div>
              <div className="w-full bg-stone-950 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(2, (memorizedCount / TOTAL_QURAN_AYAT) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-400 font-urdu">
                کل حفظ شدہ آیات کی تعداد
              </p>
            </div>

            {/* Juz 30 Progress */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Juz 30 (Amma) Progress
                </span>
                <Target className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {juz30Percentage}%
              </div>
              <div className="w-full bg-stone-950 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-teal-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(2, juz30Percentage)}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-400">
                {memorizedCount} of {JUZ_30_AYAT} verses in Juz 30
              </p>
            </div>

            {/* Total Practice Sessions */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Tilawat Check Sessions
                </span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {practiceHistory.length}{' '}
                <span className="text-xs font-normal text-stone-400">sessions</span>
              </div>
              <div className="text-xs text-stone-300">
                Average Score:{' '}
                <span className="text-emerald-400 font-bold">{averageAccuracy}%</span>
              </div>
              <button
                onClick={() => setActiveTab('recite')}
                className="w-full py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1"
              >
                <span>Start New Practice Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Memorized Verses Showcase */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Memorized Verses Registry ({memorizedCount})</span>
                </h3>
                <p className="text-xs text-stone-400">
                  Click any verse to practice recitation or listen to authentic audio
                </p>
              </div>

              <button
                onClick={() => setActiveTab('listen')}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold"
              >
                Add More from Audio Player
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-60 overflow-y-auto p-1">
              {Object.entries(memorizedAyahs).map(([key, record]) => (
                <div
                  key={key}
                  className="bg-stone-950 border border-stone-800 hover:border-emerald-500/40 rounded-xl p-3 text-center space-y-1 transition-all group"
                >
                  <div className="font-bold text-sm text-white">
                    Surah {record.surahNumber}
                  </div>
                  <div className="text-xs text-emerald-400">
                    Ayah {record.ayahNumber}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Reviewed {record.reviewCount}x
                  </div>
                  <button
                    onClick={() => startRecitationTarget(record.surahNumber, record.ayahNumber, record.ayahNumber)}
                    className="w-full text-[10px] py-1 rounded bg-stone-900 hover:bg-emerald-600 text-stone-300 hover:text-white transition-all mt-1"
                  >
                    Test Recitation
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRADITIONAL HIFZ REVISION SCHEDULE */}
      {activeTab === 'revision' && (
        <div className="space-y-5">
          <div className="bg-stone-900 border border-emerald-500/30 rounded-2xl p-6 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Classical Three-Tier Hifz System (سبق، سبقی، منزل)</span>
            </h3>
            <p className="text-xs text-stone-300 font-urdu leading-relaxed">
              روایتی حفظِ قرآن کا سنہرا اصول: "سبق" (روزانہ کا نیا سبق)، "سبقی" (پچھلے چند اسباق کا اعادہ)، اور "منزل" (پرانے حفظ شدہ حصوں کا ہفتہ وار دور)۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sabaq (New Lesson) */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    1. Sabaq (سبق - New Lesson)
                  </span>
                  <span className={`text-xs font-semibold ${revisionPlan.sabaq.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {revisionPlan.sabaq.status === 'completed' ? '✓ Completed' : 'Pending'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Surah {revisionPlan.sabaq.surahName}
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Ayat {revisionPlan.sabaq.fromAyah} to {revisionPlan.sabaq.toAyah}
                </p>
                <p className="text-xs text-stone-300 mt-2">
                  Today's new target. Listen 5x in Phase 2, then recite and check mistakes in Phase 1.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-800">
                <button
                  onClick={() => startRecitationTarget(revisionPlan.sabaq.surahNumber, revisionPlan.sabaq.fromAyah, revisionPlan.sabaq.toAyah)}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1"
                >
                  <span>Recite Sabaq Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => updateRevisionStatus('sabaq', revisionPlan.sabaq.status === 'completed' ? 'pending' : 'completed')}
                  className="w-full py-1.5 rounded-xl bg-stone-950 text-stone-400 hover:text-white border border-stone-800 text-xs"
                >
                  Toggle Mark as {revisionPlan.sabaq.status === 'completed' ? 'Incomplete' : 'Completed'}
                </button>
              </div>
            </div>

            {/* Sabqi (Recent Revision) */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-950 text-teal-300 border border-teal-500/40 text-xs font-bold">
                    2. Sabqi (سبقی - Recent Review)
                  </span>
                  <span className={`text-xs font-semibold ${revisionPlan.sabqi.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {revisionPlan.sabqi.status === 'completed' ? '✓ Completed' : 'Pending'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Surah {revisionPlan.sabqi.surahName}
                </h4>
                <p className="text-xs text-stone-300 mt-2">
                  {revisionPlan.sabqi.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-800">
                <button
                  onClick={() => startRecitationTarget(revisionPlan.sabqi.surahNumber, 1, 5)}
                  className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1"
                >
                  <span>Review Sabqi Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => updateRevisionStatus('sabqi', revisionPlan.sabqi.status === 'completed' ? 'pending' : 'completed')}
                  className="w-full py-1.5 rounded-xl bg-stone-950 text-stone-400 hover:text-white border border-stone-800 text-xs"
                >
                  Toggle Mark as {revisionPlan.sabqi.status === 'completed' ? 'Incomplete' : 'Completed'}
                </button>
              </div>
            </div>

            {/* Manzil (Old Memorization Revision) */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/40 text-xs font-bold">
                    3. Manzil (منزل - Cycle Revision)
                  </span>
                  <span className={`text-xs font-semibold ${revisionPlan.manzil.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {revisionPlan.manzil.status === 'completed' ? '✓ Completed' : 'Pending'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {revisionPlan.manzil.juzName}
                </h4>
                <p className="text-xs text-stone-300 mt-2">
                  {revisionPlan.manzil.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-800">
                <button
                  onClick={() => {
                    startRecitationTarget(1, 1, 7);
                    setActiveTab('listen');
                  }}
                  className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1"
                >
                  <span>Listen Manzil Portion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => updateRevisionStatus('manzil', revisionPlan.manzil.status === 'completed' ? 'pending' : 'completed')}
                  className="w-full py-1.5 rounded-xl bg-stone-950 text-stone-400 hover:text-white border border-stone-800 text-xs"
                >
                  Toggle Mark as {revisionPlan.manzil.status === 'completed' ? 'Incomplete' : 'Completed'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRACTICE HISTORY & MISTAKES LOG */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {practiceHistory.length === 0 ? (
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-12 text-center text-stone-400 space-y-2">
              <Clock className="w-8 h-8 text-stone-500 mx-auto" />
              <h4 className="text-sm font-bold text-stone-300">No Recitation History Yet</h4>
              <p className="text-xs">Head to Phase 1 and record your first recitation!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {practiceHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
                        item.accuracyScore >= 90
                          ? 'bg-emerald-600 text-white'
                          : item.accuracyScore >= 75
                          ? 'bg-amber-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {item.accuracyScore}%
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-sm text-white">
                          Surah {item.surahNameEnglish} (Ayat {item.ayahRange})
                        </h4>
                        <span className="font-arabic text-emerald-400 text-base">
                          {item.surahNameArabic}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mt-1">
                        <span className="text-emerald-400 font-semibold">{item.correctWords} Correct</span>
                        <span>•</span>
                        <span className="text-amber-400">{item.omissions} Missed</span>
                        <span>•</span>
                        <span className="text-rose-400">{item.substitutions} Mistakes</span>
                        <span>•</span>
                        <span>Duration: {item.durationSeconds}s</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end md:self-auto">
                    <span className="text-[11px] text-stone-500 mr-2">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => startRecitationTarget(item.surahNumber, 1, 5)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Re-test</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
