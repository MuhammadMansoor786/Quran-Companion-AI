import React, { useState } from 'react';
import {
  QURAN_GENERAL_STATS,
  AYAT_COUNTING_CONVENTIONS,
  JUZ_LIST,
  SAJDAH_LIST,
  MANZILS,
  QURANIC_FACTS
} from '../data/quranStatistics.ts';
import { SURAHS_LIST, SurahMeta } from '../data/quranSurahs.ts';
import { useQuran } from '../context/QuranContext.tsx';
import {
  Search,
  BookOpen,
  Layers,
  Sparkles,
  Info,
  Calendar,
  Filter,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const Phase3QuranStatistics: React.FC = () => {
  const { startRecitationTarget, setActiveTab } = useQuran();

  // Tab inside Phase 3
  const [activeSubTab, setActiveSubTab] = useState<'surahs' | 'counting' | 'juz' | 'sajdah' | 'manzil' | 'facts'>('surahs');

  // Surahs directory search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan' | 'sajdah'>('all');

  const filteredSurahs = SURAHS_LIST.filter((s) => {
    const matchesSearch =
      s.nameTransliterated.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameArabic.includes(searchQuery) ||
      s.nameUrdu.includes(searchQuery) ||
      String(s.number) === searchQuery.trim();

    if (!matchesSearch) return false;
    if (filterType === 'Meccan') return s.revelationType === 'Meccan';
    if (filterType === 'Medinan') return s.revelationType === 'Medinan';
    if (filterType === 'sajdah') return s.hasSajdah;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/50 via-stone-900 to-emerald-950/50 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Phase 3 — Quran Encyclopedia & Comprehensive Statistics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Quranic Information, Statistics & Directory
            </h1>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl font-urdu leading-relaxed">
              قرآن مجید کے 114 سورتوں، 30 پاروں، آیات کی مستند تعداد اور علمی روایات (کوفی، بصری وغیرہ) اور سجدہ ہائے تلاوت کی مستند تفصیلات۔
            </p>
          </div>

          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 text-xs w-full md:w-auto">
            <span className="text-stone-400 block mb-1">Standard Kufic Hafs Count:</span>
            <div className="font-extrabold text-lg text-emerald-400">6,236 Ayat</div>
            <span className="text-[11px] text-stone-400">114 Surahs (86 Makki, 28 Madani)</span>
          </div>
        </div>
      </div>

      {/* High-Level Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {QURAN_GENERAL_STATS.slice(0, 5).map((stat, i) => (
          <div
            key={i}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                {stat.label}
              </span>
              <span className="text-[11px] font-urdu text-emerald-400/90 block">
                {stat.urduLabel}
              </span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="flex items-center space-x-1 sm:space-x-2 border-b border-stone-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'surahs', label: '114 Surahs Directory', urdu: 'تمام 114 سورتیں' },
          { id: 'counting', label: 'Ayat Counting Traditions', urdu: 'آیات کی تعداد اور روایات' },
          { id: 'juz', label: '30 Juz (Paras)', urdu: '30 پارے' },
          { id: 'sajdah', label: '14/15 Sajdah-e-Tilawat', urdu: 'سجدہ تلاوت' },
          { id: 'manzil', label: '7 Manzils (Weekly)', urdu: '7 منزلیں' },
          { id: 'facts', label: 'Quranic Facts', urdu: 'قرآنی حقائق' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeSubTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <div>{tab.label}</div>
            <div className="text-[10px] font-urdu font-normal opacity-80">{tab.urdu}</div>
          </button>
        ))}
      </div>

      {/* TAB 1: 114 SURAHS DIRECTORY */}
      {activeSubTab === 'surahs' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by name, meaning, or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All (114)' },
                { id: 'Meccan', label: 'Makki (86)' },
                { id: 'Medinan', label: 'Madani (28)' },
                { id: 'sajdah', label: 'With Sajdah (14)' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    filterType === f.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Surahs Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSurahs.map((surah) => (
              <div
                key={surah.number}
                className="bg-stone-900 border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all hover:bg-stone-850 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-8 h-8 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 font-bold text-xs flex items-center justify-center group-hover:border-emerald-500/50 group-hover:text-emerald-400">
                      {surah.number}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-white">{surah.nameTransliterated}</h4>
                      <p className="text-[11px] text-stone-400">{surah.englishMeaning}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-arabic text-xl font-bold text-emerald-400">
                      {surah.nameArabic}
                    </div>
                    <div className="font-urdu text-xs text-stone-400">
                      {surah.nameUrdu}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-800 text-stone-400">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${
                      surah.revelationType === 'Meccan'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                    }`}>
                      {surah.revelationType}
                    </span>
                    <span>{surah.versesCount} Ayat</span>
                    <span>• {surah.rukusCount} Ruku</span>
                  </div>

                  {surah.hasSajdah && (
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800/40">
                      ۩ Sajdah
                    </span>
                  )}
                </div>

                {/* Quick actions: recite or listen */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => startRecitationTarget(surah.number, 1, Math.min(surah.versesCount, 5))}
                    className="flex-1 py-1.5 rounded-lg bg-stone-950 hover:bg-emerald-950/50 text-stone-300 hover:text-emerald-300 border border-stone-800 hover:border-emerald-500/30 text-xs font-semibold text-center transition-all"
                  >
                    Check Recitation
                  </button>
                  <button
                    onClick={() => {
                      startRecitationTarget(surah.number, 1, 1);
                      setActiveTab('listen');
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold text-center transition-all"
                  >
                    Listen Audio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AYAT COUNTING CONVENTIONS (SCHOLARLY TRADITIONS) */}
      {activeSubTab === 'counting' && (
        <div className="space-y-5">
          <div className="bg-stone-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white flex items-center flex-wrap gap-2">
                  <span>Counting Methodologies & Reliable Scholarly Sources</span>
                  <span className="font-arabic text-emerald-400 font-normal">(علم فواصل الآيات)</span>
                </h3>
                <p className="text-xs text-stone-300 mt-1 font-urdu leading-relaxed">
                  قرآن پاک کی کل آیات کی تعداد میں مختلف اعداد (مثلاً 6236، 6214، 6226) کا تعلق قرآن کے متن سے ہرگز نہیں، بلکہ صرف اس بات سے ہے کہ رسول اللہ ﷺ کن مقامات پر تلاوت کے دوران وقف فرمایا کرتے تھے۔ متن، کلمات اور حروف تمام امت کے نزدیک متفقہ اور محفوظ ہیں۔
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {AYAT_COUNTING_CONVENTIONS.map((conv, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">{conv.convention}</span>
                      <span className="text-base font-extrabold text-emerald-400">
                        {conv.totalAyat.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-stone-400">
                      <strong className="text-stone-300">Scholarly Lineage:</strong> {conv.authority}
                    </div>
                    <div className="text-xs text-stone-400 mt-1">
                      <strong className="text-stone-300">Contemporary Usage:</strong> {conv.usage}
                    </div>
                  </div>
                  <div className="text-[11px] text-amber-200/80 bg-amber-950/30 p-2 rounded-lg border border-amber-900/30 mt-3">
                    {conv.notes}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-400 space-y-1">
              <div className="font-semibold text-stone-200">Key Scholarly References:</div>
              <div>• Imam ad-Dani (d. 444 AH): <em>Al-Bayan fi 'Add Ay al-Qur'an</em> (البيان في عد آي القرآن)</div>
              <div>• Imam Ash-Shatibi: <em>Nazimat az-Zahr</em> (ناظمة الزهر)</div>
              <div>• Imam as-Suyuti: <em>Al-Itqan fi 'Ulum al-Qur'an</em> (الإتقان في علوم القرآن)</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 30 JUZ (PARAS) */}
      {activeSubTab === 'juz' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {JUZ_LIST.map((juz) => (
              <div
                key={juz.juzNumber}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-extrabold text-sm flex items-center justify-center">
                    {juz.juzNumber}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">{juz.nameTransliterated}</h4>
                    <p className="text-xs text-stone-400">
                      {juz.startSurahName} ({juz.startAyah}) ➔ {juz.endSurahName} ({juz.endAyah})
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-arabic text-xl font-bold text-amber-300">
                    {juz.nameArabic}
                  </span>
                  <p className="font-urdu text-xs text-stone-400">{juz.nameUrdu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SAJDAH-E-TILAWAT (14 / 15) */}
      {activeSubTab === 'sajdah' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Sajdah-e-Tilawat (سجدہ تلاوت کی تفصیلات اور فقہی احکام)</span>
            </h3>
            <p className="text-xs text-stone-300 font-urdu leading-relaxed">
              14 سجدے تمام فقہاء کے نزدیک متفقہ ہیں؛ جبکہ سورۃ الحج کا دوسرا سجدہ (آیت 77) امام شافعی، امام احمد اور امام مالک کے نزدیک سجدہ تلاوت ہے، جبکہ حنفی فقہ میں نماز کے سجدے سے متعلق ہے۔
            </p>
          </div>

          <div className="space-y-3">
            {SAJDAH_LIST.map((s) => (
              <div
                key={s.number}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                    #{s.number}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">
                        Surah {s.surahNameEnglish} — Verse {s.ayahNumber}
                      </span>
                      <span className="font-arabic text-emerald-400">({s.surahNameArabic})</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 border border-stone-700 text-stone-300">
                        {s.type}
                      </span>
                    </div>
                    <div
                      dir="rtl"
                      className="font-quran text-lg text-amber-200/95 mt-2 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80"
                    >
                      {s.arabicAyahSnippet}
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <div className="text-xs text-stone-400 font-medium">Fiqh Commentary:</div>
                  <div className="text-xs text-purple-300 max-w-xs">{s.fiqhNote}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: 7 MANZILS (WEEKLY CYCLE) */}
      {activeSubTab === 'manzil' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-base font-bold text-white">
              7 Manzils for Weekly Quran Completion (فمي بشوق)
            </h3>
            <p className="text-xs text-stone-300 font-urdu leading-relaxed">
              صحابہ کرام رضوان اللہ علیہم اجمعین کا معمول تھا کہ وہ ایک ہفتے میں پورا قرآن مکمل فرماتے تھے۔ اسے یاد رکھنے کے لیے رمز "فمي بشوق" (Fami Bi Shawq) وضع کیا گیا ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MANZILS.map((m) => (
              <div
                key={m.number}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    #{m.number}
                  </span>
                  <span className="font-arabic text-lg font-bold text-amber-300">{m.nameArabic}</span>
                </div>
                <div>
                  <div className="text-xs text-stone-400">
                    <strong className="text-stone-300">Portion:</strong> {m.startSurah} ➔ {m.endSurah}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1">
                    <strong className="text-stone-300">Recitation Day:</strong> {m.dayRecommended}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: QURANIC FACTS */}
      {activeSubTab === 'facts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QURANIC_FACTS.map((fact, idx) => (
            <div
              key={idx}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-bold text-sm text-white">{fact.title}</h4>
                </div>
                <div className="text-xs font-urdu text-emerald-400/90 mt-0.5">{fact.urduTitle}</div>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">{fact.content}</p>
              </div>
              <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Reference:</span>
                <span className="text-emerald-400 font-semibold">{fact.reference}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
