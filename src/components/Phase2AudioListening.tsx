import React, { useState, useEffect, useRef } from 'react';
import { useQuran } from '../context/QuranContext.tsx';
import { SURAHS_LIST } from '../data/quranSurahs.ts';
import {
  fetchSurahAyat,
  QuranAyah,
  AUTHENTIC_RECITERS,
  Reciter,
  getEveryAyahAudioUrl
} from '../data/quranAyatData.ts';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  CheckCircle,
  Bookmark,
  Sparkles,
  Layers,
  Gauge,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const Phase2AudioListening: React.FC = () => {
  const {
    selectedReciter,
    setSelectedReciter,
    toggleMemorizedAyah,
    isAyahMemorized,
    startRecitationTarget,
  } = useQuran();

  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [ayahsList, setAyahsList] = useState<QuranAyah[]>([]);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState(false);

  // Playback state
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [repeatTarget, setRepeatTarget] = useState<number>(1); // 1, 3, 5, 10, or 999 (infinite)
  const [repeatCounter, setRepeatCounter] = useState<number>(1);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Display toggles
  const [showUrdu, setShowUrdu] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(false);
  const [wordByWordMode, setWordByWordMode] = useState<boolean>(false);

  // Audio HTML element ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Active word index for word-by-word visual animation
  const [activeWordId, setActiveWordId] = useState<number | null>(null);

  // Load ayahs when selected Surah changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingAyahs(true);
    fetchSurahAyat(selectedSurahNumber)
      .then((data) => {
        if (isMounted) {
          setAyahsList(data);
          setCurrentAyahIndex(0);
          setRepeatCounter(1);
          setIsLoadingAyahs(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setIsLoadingAyahs(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSurahNumber]);

  // Audio URL for active Ayah
  const activeAyah = ayahsList[currentAyahIndex];
  const audioUrl = activeAyah
    ? getEveryAyahAudioUrl(
        selectedReciter.subfolder,
        selectedSurahNumber,
        activeAyah.ayahNumberInSurah
      )
    : '';

  // Synchronize playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Handle Play / Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error:', err);
          setAudioError('Audio playback was interrupted. Trying alternative connection...');
        });
    }
  };

  // Handle audio end: either repeat current ayah or proceed to next
  const handleAudioEnded = () => {
    if (repeatCounter < repeatTarget) {
      // Repeat the same ayah
      setRepeatCounter((prev) => prev + 1);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.warn);
      }
    } else {
      // Advance to next ayah if available
      setRepeatCounter(1);
      if (currentAyahIndex < ayahsList.length - 1) {
        setCurrentAyahIndex((prev) => prev + 1);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.warn);
          }
        }, 300);
      } else {
        setIsPlaying(false);
      }
    }
  };

  // Next / Previous Ayah
  const goToNextAyah = () => {
    if (currentAyahIndex < ayahsList.length - 1) {
      setCurrentAyahIndex((prev) => prev + 1);
      setRepeatCounter(1);
      if (isPlaying) {
        setTimeout(() => {
          audioRef.current?.play().catch(console.warn);
        }, 150);
      }
    }
  };

  const goToPrevAyah = () => {
    if (currentAyahIndex > 0) {
      setCurrentAyahIndex((prev) => prev - 1);
      setRepeatCounter(1);
      if (isPlaying) {
        setTimeout(() => {
          audioRef.current?.play().catch(console.warn);
        }, 150);
      }
    }
  };

  const currentSurah = SURAHS_LIST.find((s) => s.number === selectedSurahNumber) || SURAHS_LIST[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950/60 via-stone-900 to-emerald-950/60 border border-teal-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2 border border-teal-500/30">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Phase 2 — AI Quran Recitation & Listening Companion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Listen, Repeat & Memorize (Hifz Companion)
            </h1>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl font-urdu leading-relaxed">
              معروف قراء کرام کی تلاوت سنیں، ایک ایک آیت کو بار بار دہرائیں (3، 5، یا 10 بار) اور لفظ بہ لفظ حفظ مکمل کریں۔
            </p>
          </div>

          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 text-xs w-full md:w-auto">
            <span className="text-stone-400 block mb-1">Current Reciter:</span>
            <div className="font-bold text-white flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>{selectedReciter.name}</span>
            </div>
            <span className="text-[11px] text-stone-400 font-arabic">{selectedReciter.subname}</span>
          </div>
        </div>
      </div>

      {/* Surah & Reciter Selector Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Surah Dropdown */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              Select Surah ({SURAHS_LIST.length} Available)
            </label>
            <select
              value={selectedSurahNumber}
              onChange={(e) => {
                setSelectedSurahNumber(Number(e.target.value));
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              {SURAHS_LIST.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.nameTransliterated} ({s.englishMeaning})
                </option>
              ))}
            </select>
          </div>

          {/* Reciter Selector */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              Select Authentic Qari (Reciter)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AUTHENTIC_RECITERS.map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => setSelectedReciter(rec)}
                  className={`p-2 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    selectedReciter.id === rec.id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="truncate">
                    <div className="truncate font-semibold">{rec.name.split(' ')[0]} {rec.name.split(' ')[1]}</div>
                    <div className="text-[10px] text-stone-400 font-arabic truncate">{rec.subname}</div>
                  </div>
                  {selectedReciter.id === rec.id && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Toggles */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-stone-800 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-stone-400 font-semibold">Display:</span>
            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className={`px-2.5 py-1 rounded-lg border font-medium ${
                showUrdu ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-300' : 'bg-stone-950 border-stone-800 text-stone-400'
              }`}
            >
              Urdu اردو
            </button>
            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className={`px-2.5 py-1 rounded-lg border font-medium ${
                showEnglish ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-300' : 'bg-stone-950 border-stone-800 text-stone-400'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className={`px-2.5 py-1 rounded-lg border font-medium ${
                showTransliteration ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-300' : 'bg-stone-950 border-stone-800 text-stone-400'
              }`}
            >
              Transliteration
            </button>
            <button
              onClick={() => setWordByWordMode(!wordByWordMode)}
              className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 ${
                wordByWordMode ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-stone-950 border-stone-800 text-stone-400'
              }`}
            >
              <Layers className="w-3 h-3" /> Word-by-Word
            </button>
          </div>

          <div className="text-stone-400 text-xs">
            Ayah {currentAyahIndex + 1} of {ayahsList.length}
          </div>
        </div>
      </div>

      {/* Main Active Ayah Player Card */}
      {activeAyah && (
        <div className="bg-stone-900 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6">
          {/* Header of Ayah */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xs">
                {activeAyah.ayahNumberInSurah}
              </span>
              <span className="text-xs font-semibold text-stone-300">
                Surah {currentSurah.nameTransliterated} • Verse {activeAyah.ayahNumberInSurah}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Mark as Memorized Toggle */}
              <button
                onClick={() => toggleMemorizedAyah(selectedSurahNumber, activeAyah.ayahNumberInSurah)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isAyahMemorized(selectedSurahNumber, activeAyah.ayahNumberInSurah)
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/40'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>
                  {isAyahMemorized(selectedSurahNumber, activeAyah.ayahNumberInSurah)
                    ? 'Memorized ✓'
                    : 'Mark as Memorized'}
                </span>
              </button>

              {/* Practice in Phase 1 directly */}
              <button
                onClick={() => startRecitationTarget(selectedSurahNumber, activeAyah.ayahNumberInSurah, activeAyah.ayahNumberInSurah)}
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-emerald-900/40 border border-stone-700 hover:border-emerald-500/40 text-xs text-stone-300 hover:text-emerald-300"
                title="Practice reciting this ayah in Phase 1 AI Checker"
              >
                <span>Test Recitation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hidden HTML Audio element */}
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={handleAudioEnded}
            onError={() => {
              setAudioError('Audio link loading or temporarily buffering. Please retry.');
              setIsPlaying(false);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Arabic Text Display */}
          <div className="space-y-4">
            {!wordByWordMode ? (
              <div
                dir="rtl"
                className="py-8 px-4 text-center font-quran text-3xl sm:text-4xl lg:text-5xl leading-[2.6] sm:leading-[2.8] text-amber-100 select-text bg-stone-950/70 rounded-2xl border border-stone-800 shadow-inner"
              >
                {activeAyah.arabicUthmani}
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-base font-sans mx-2 align-middle">
                  {activeAyah.ayahNumberInSurah}
                </span>
              </div>
            ) : (
              /* Word-by-word interactive tile layout */
              <div
                dir="rtl"
                className="p-6 bg-stone-950/70 rounded-2xl border border-stone-800 flex flex-wrap items-center justify-center gap-3"
              >
                {activeAyah.words && activeAyah.words.length > 0 ? (
                  activeAyah.words.map((w) => (
                    <div
                      key={w.id}
                      onClick={() => setActiveWordId(w.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        activeWordId === w.id
                          ? 'bg-emerald-900/60 border-emerald-400 text-white scale-105'
                          : 'bg-stone-900 border-stone-800 text-amber-100 hover:border-stone-700'
                      }`}
                    >
                      <div className="font-quran text-2xl mb-1">{w.arabic}</div>
                      {w.transliteration && (
                        <div className="text-[10px] text-stone-400 font-sans">{w.transliteration}</div>
                      )}
                      {w.urdu && (
                        <div className="text-[11px] text-emerald-300 font-urdu">{w.urdu}</div>
                      )}
                      {w.english && (
                        <div className="text-[10px] text-stone-400 font-sans">{w.english}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="font-quran text-3xl text-amber-100">
                    {activeAyah.arabicUthmani}
                  </div>
                )}
              </div>
            )}

            {/* Transliteration */}
            {showTransliteration && activeAyah.transliteration && (
              <div className="text-center text-xs sm:text-sm text-stone-400 italic">
                {activeAyah.transliteration}
              </div>
            )}

            {/* Urdu Translation */}
            {showUrdu && activeAyah.translationUrdu && (
              <div className="text-center font-urdu text-base sm:text-lg text-emerald-200/90 leading-relaxed bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/30">
                {activeAyah.translationUrdu}
              </div>
            )}

            {/* English Translation */}
            {showEnglish && activeAyah.translationEnglish && (
              <div className="text-center text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl mx-auto">
                "{activeAyah.translationEnglish}"
              </div>
            )}
          </div>

          {/* Memorization Audio Controls Dock */}
          <div className="bg-stone-950 rounded-2xl p-4 sm:p-5 border border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Repeat Mode Selector */}
              <div className="flex items-center space-x-2 text-xs">
                <Repeat className="w-4 h-4 text-emerald-400" />
                <span className="text-stone-300 font-semibold">Repeat Ayah:</span>
                <div className="flex items-center space-x-1">
                  {[1, 3, 5, 10].map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        setRepeatTarget(count);
                        setRepeatCounter(1);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        repeatTarget === count
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {count}x
                    </button>
                  ))}
                </div>
                {repeatTarget > 1 && (
                  <span className="text-[11px] text-amber-400 font-mono ml-2">
                    (Repetition {repeatCounter}/{repeatTarget})
                  </span>
                )}
              </div>

              {/* Speed Selector */}
              <div className="flex items-center space-x-2 text-xs">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span className="text-stone-300 font-semibold">Speed:</span>
                <div className="flex items-center space-x-1">
                  {[0.75, 1.0, 1.25].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        playbackSpeed === spd
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Player Buttons */}
            <div className="flex items-center justify-center space-x-6 pt-2">
              <button
                onClick={goToPrevAyah}
                disabled={currentAyahIndex === 0}
                className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 disabled:opacity-40"
                aria-label="Previous Ayah"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/60 transition-transform active:scale-95"
                aria-label={isPlaying ? 'Pause recitation' : 'Play recitation'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={goToNextAyah}
                disabled={currentAyahIndex === ayahsList.length - 1}
                className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 disabled:opacity-40"
                aria-label="Next Ayah"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playlist / Verses Quick Navigator */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Verses in Surah {currentSurah.nameTransliterated}</span>
          </h3>
          <span className="text-xs text-stone-400">
            Click any verse to listen directly
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-56 overflow-y-auto p-1">
          {ayahsList.map((ayah, idx) => {
            const isMemorized = isAyahMemorized(selectedSurahNumber, ayah.ayahNumberInSurah);
            const isCurrent = currentAyahIndex === idx;

            return (
              <button
                key={ayah.ayahNumberInSurah}
                onClick={() => {
                  setCurrentAyahIndex(idx);
                  setRepeatCounter(1);
                  if (isPlaying) {
                    setTimeout(() => audioRef.current?.play().catch(console.warn), 150);
                  }
                }}
                className={`p-2 rounded-xl text-xs font-bold border flex flex-col items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/40'
                    : isMemorized
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/40'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
                }`}
              >
                <span>Ayah {ayah.ayahNumberInSurah}</span>
                {isMemorized && (
                  <span className="text-[10px] text-emerald-400">✓ Memorized</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
