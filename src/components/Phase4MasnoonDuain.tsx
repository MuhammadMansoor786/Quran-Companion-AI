import React, { useState } from 'react';
import { MASNOON_DUAS, MasnoonDua } from '../data/masnoonDuain.ts';
import { useQuran } from '../context/QuranContext.tsx';
import {
  Search,
  Sparkles,
  Heart,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  CheckCircle,
  Share2,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const Phase4MasnoonDuain: React.FC = () => {
  const { favoriteDuas, toggleFavoriteDua, isDuaFavorite } = useQuran();

  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'namaz' | 'after_namaz' | 'morning_evening' | 'sleep_wake' | 'daily' | 'quranic' | 'favorites'
  >('all');

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Digital Tasbeeh Counter state per Dua ID
  const [duaCounters, setDuaCounters] = useState<Record<string, number>>({});

  // Active audio reading (using browser SpeechSynthesis for Arabic/English pronunciation)
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const categories = [
    { id: 'all' as const, label: 'All Duas', urdu: 'تمام دعائیں' },
    { id: 'favorites' as const, label: 'Favorites', urdu: 'پسندیدہ' },
    { id: 'namaz' as const, label: 'Namaz Essentials', urdu: 'نماز کی ضروری پڑھائی' },
    { id: 'after_namaz' as const, label: 'After Salah Azkar', urdu: 'نماز کے بعد کے اذکار' },
    { id: 'morning_evening' as const, label: 'Morning & Evening', urdu: 'صبح و شام کے اذکار' },
    { id: 'sleep_wake' as const, label: 'Sleep & Wake', urdu: 'سونے اور جاگنے کی' },
    { id: 'daily' as const, label: 'Daily Life (Safar, Food)', urdu: 'روزمرہ زندگی و سفر' },
    { id: 'quranic' as const, label: 'Quranic Surahs & Ayat', urdu: 'قرآنی سورتیں و آیات' },
  ];

  const filteredDuas = MASNOON_DUAS.filter((dua) => {
    // Category match
    if (selectedCategory === 'favorites') {
      if (!isDuaFavorite(dua.id)) return false;
    } else if (selectedCategory !== 'all') {
      if (dua.category !== selectedCategory) return false;
    }

    // Search query match
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      dua.title.toLowerCase().includes(q) ||
      dua.urduTitle.includes(q) ||
      dua.arabicText.includes(q) ||
      dua.englishTranslation.toLowerCase().includes(q) ||
      dua.urduTranslation.includes(q) ||
      dua.reference.toLowerCase().includes(q)
    );
  });

  // Handle Tasbeeh counter click
  const incrementCounter = (dua: MasnoonDua) => {
    setDuaCounters((prev) => {
      const current = prev[dua.id] || 0;
      const next = current + 1;
      return { ...prev, [dua.id]: next };
    });
  };

  const resetCounter = (duaId: string) => {
    setDuaCounters((prev) => ({ ...prev, [duaId]: 0 }));
  };

  // Pronounce Arabic text via SpeechSynthesis
  const toggleSpeech = (dua: MasnoonDua) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (activeSpeechId === dua.id) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(dua.arabicText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);

    setActiveSpeechId(dua.id);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (dua: MasnoonDua) => {
    const text = `${dua.title} (${dua.urduTitle})\n\n${dua.arabicText}\n\nUrdu: ${dua.urduTranslation}\n\nEnglish: ${dua.englishTranslation}\n\nReference: ${dua.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950/60 via-stone-900 to-amber-950/60 border border-teal-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2 border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 4 — Masnoon Duain & Daily Quranic Adhkar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Authentic Masnoon Duas & Daily Adhkar
            </h1>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl font-urdu leading-relaxed">
              نماز کی تمام ضروری پڑھائی، نماز کے بعد کے اذکار، صبح و شام کی دعائیں، سفر اور کھانے کی دعائیں مع اعراب، اردو ترجمہ اور مستند حوالہ جات۔
            </p>
          </div>

          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 text-xs w-full md:w-auto">
            <span className="text-stone-400 block mb-1">Bookmarked Duas:</span>
            <div className="font-extrabold text-lg text-emerald-400">
              {favoriteDuas.length} Saved
            </div>
            <span className="text-[11px] text-stone-400">Digital Tasbeeh & Audio Included</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search duas by title, meaning, Urdu, Arabic or Hadith reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              <div>{cat.label}</div>
              <div className="text-[10px] font-urdu font-normal opacity-85 -mt-0.5">{cat.urdu}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Duas List */}
      <div className="space-y-5">
        {filteredDuas.length === 0 ? (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-12 text-center text-stone-400 space-y-2">
            <BookOpen className="w-8 h-8 text-stone-500 mx-auto" />
            <h4 className="text-sm font-bold text-stone-300">No Duas Found</h4>
            <p className="text-xs">Try adjusting your search query or selecting another category.</p>
          </div>
        ) : (
          filteredDuas.map((dua) => {
            const isFav = isDuaFavorite(dua.id);
            const count = duaCounters[dua.id] || 0;
            const isTargetReached = count >= dua.targetCount;
            const isSpeaking = activeSpeechId === dua.id;

            return (
              <div
                key={dua.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5 hover:border-stone-700 transition-all"
              >
                {/* Header: Title, Category, and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">{dua.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold">
                        {dua.targetCount}x
                      </span>
                    </div>
                    <div className="font-urdu text-sm text-emerald-400 mt-0.5">{dua.urduTitle}</div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    {/* Audio pronunciation */}
                    <button
                      onClick={() => toggleSpeech(dua)}
                      className={`p-2 rounded-xl border transition-all ${
                        isSpeaking
                          ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse'
                          : 'bg-stone-950 text-stone-400 hover:text-white border-stone-800'
                      }`}
                      title="Audio Pronunciation"
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Copy button */}
                    <button
                      onClick={() => copyToClipboard(dua)}
                      className="p-2 rounded-xl bg-stone-950 text-stone-400 hover:text-white border border-stone-800 transition-all"
                      title="Copy Dua & Translation"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Favorite toggle */}
                    <button
                      onClick={() => toggleFavoriteDua(dua.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        isFav
                          ? 'bg-rose-950/60 text-rose-400 border-rose-500/40'
                          : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Text with Harakat */}
                <div
                  dir="rtl"
                  className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800/80 text-center font-quran text-2xl sm:text-3xl leading-[2.6] text-amber-100 select-text shadow-inner"
                >
                  {dua.arabicText}
                </div>

                {/* Transliteration */}
                <div className="text-xs sm:text-sm text-stone-400 text-center italic">
                  {dua.transliteration}
                </div>

                {/* Translations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-950/50 p-4 rounded-xl border border-stone-800/60 text-xs sm:text-sm">
                  {/* Urdu Translation */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-emerald-400 block uppercase">
                      Urdu اردو ترجمہ:
                    </span>
                    <p className="font-urdu text-stone-200 leading-relaxed text-sm">
                      {dua.urduTranslation}
                    </p>
                  </div>

                  {/* English Translation */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-stone-400 block uppercase">
                      English Translation:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      "{dua.englishTranslation}"
                    </p>
                  </div>
                </div>

                {/* Footer: Tasbeeh Counter & Hadith Reference */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-stone-800 text-xs">
                  {/* Reference */}
                  <div className="text-stone-400">
                    <span className="font-semibold text-stone-300">Reference:</span> {dua.reference}
                  </div>

                  {/* Digital Tasbeeh Counter */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => incrementCounter(dua)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all active:scale-95 shadow-md ${
                        isTargetReached
                          ? 'bg-emerald-600 text-white shadow-emerald-950/50'
                          : 'bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        Count: {count} / {dua.targetCount}
                      </span>
                      {isTargetReached && <span>✓ Done</span>}
                    </button>

                    {count > 0 && (
                      <button
                        onClick={() => resetCounter(dua.id)}
                        className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200"
                        title="Reset counter"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
