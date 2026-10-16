import React, { useState, useEffect, useRef } from 'react';
import { useQuran } from '../context/QuranContext.tsx';
import { SURAHS_LIST, SurahMeta } from '../data/quranSurahs.ts';
import { fetchSurahAyat, QuranAyah } from '../data/quranAyatData.ts';
import { EvaluationResult, normalizeArabic } from '../utils/quranArabicCompare.ts';
import {
  Mic,
  Square,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Award,
  ChevronRight,
  BookmarkCheck,
  AlertTriangle,
  Info
} from 'lucide-react';

export const Phase1RecitationChecker: React.FC = () => {
  const { addPracticeSession, recitationTarget } = useQuran();

  // Selection states
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(recitationTarget?.surahNum || 1);
  const [ayahsList, setAyahsList] = useState<QuranAyah[]>([]);
  const [rangeMode, setRangeMode] = useState<'1_line' | '2_lines' | 'half_page' | 'full' | 'custom'>('1_line');
  const [fromAyah, setFromAyah] = useState<number>(recitationTarget?.fromAyah || 1);
  const [toAyah, setToAyah] = useState<number>(recitationTarget?.toAyah || 1);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState(false);

  // Target text computed from range
  const [targetArabicText, setTargetArabicText] = useState<string>('');
  const [selectedAyahsData, setSelectedAyahsData] = useState<QuranAyah[]>([]);

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Evaluation states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [evalError, setEvalError] = useState<string | null>(null);

  // User playback of recorded audio
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const recordedAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load ayahs when selected Surah changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingAyahs(true);
    fetchSurahAyat(selectedSurahNumber)
      .then((data) => {
        if (isMounted) {
          setAyahsList(data);
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

  // Adjust toAyah based on rangeMode
  useEffect(() => {
    if (!ayahsList.length) return;
    const maxAyah = ayahsList.length;

    let newTo = fromAyah;
    if (rangeMode === '1_line') {
      newTo = fromAyah;
    } else if (rangeMode === '2_lines') {
      newTo = Math.min(fromAyah + 1, maxAyah);
    } else if (rangeMode === 'half_page') {
      newTo = Math.min(fromAyah + 4, maxAyah);
    } else if (rangeMode === 'full') {
      newTo = maxAyah;
    }
    setToAyah(newTo);
  }, [rangeMode, fromAyah, ayahsList]);

  // Compute selected passage text
  useEffect(() => {
    if (!ayahsList.length) return;
    const filtered = ayahsList.filter(
      (a) => a.ayahNumberInSurah >= fromAyah && a.ayahNumberInSurah <= toAyah
    );
    setSelectedAyahsData(filtered);
    const combined = filtered.map((a) => a.arabicUthmani).join(' ۝ ');
    setTargetArabicText(combined);
  }, [ayahsList, fromAyah, toAyah]);

  // Synchronize target if triggered from context
  useEffect(() => {
    if (recitationTarget) {
      setSelectedSurahNumber(recitationTarget.surahNum);
      setFromAyah(recitationTarget.fromAyah);
      setToAyah(recitationTarget.toAyah);
      setRangeMode('custom');
    }
  }, [recitationTarget]);

  // Handle Recording
  const startRecording = async () => {
    setMicError(null);
    setEvaluationResult(null);
    setEvalError(null);
    setAudioBlob(null);
    setAudioUrl(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Stop all mic tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone permission error:', err);
      setMicError('Microphone access was denied or not available. Please allow mic permissions, or use the "Instant Demo Recitation" below to test.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setAudioBlob(null);
      setAudioUrl(null);
    }
  };

  // Run AI Recitation Verification
  const runEvaluation = async (overrideSimulatedText?: string) => {
    if (!targetArabicText) return;
    setIsEvaluating(true);
    setEvalError(null);

    try {
      let audioBase64 = '';
      if (audioBlob && !overrideSimulatedText) {
        const buffer = await audioBlob.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        audioBase64 = btoa(binary);
      }

      const currentSurah = SURAHS_LIST.find((s) => s.number === selectedSurahNumber);

      const response = await fetch('/api/check-recitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: audioBase64 || undefined,
          mimeType: audioBlob?.type || 'audio/webm',
          expectedText: targetArabicText,
          surahNumber: selectedSurahNumber,
          ayahRange: `${fromAyah}-${toAyah}`,
          simulatedTranscribedText: overrideSimulatedText || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.evaluation) {
        setEvaluationResult(data.evaluation);
        setTranscribedText(data.transcribedText);

        // Record to practice history
        addPracticeSession({
          surahNumber: selectedSurahNumber,
          surahNameArabic: currentSurah?.nameArabic || '',
          surahNameEnglish: currentSurah?.nameTransliterated || '',
          ayahRange: `${fromAyah} - ${toAyah}`,
          expectedText: targetArabicText,
          transcribedText: data.transcribedText,
          accuracyScore: data.evaluation.accuracyScore,
          correctWords: data.evaluation.correctWordsCount,
          omissions: data.evaluation.omissionsCount,
          substitutions: data.evaluation.substitutionsCount,
          additions: data.evaluation.additionsCount,
          durationSeconds: recordingSeconds || 15,
        });
      } else {
        throw new Error(data.error || 'Failed to evaluate recitation');
      }
    } catch (err: any) {
      console.error(err);
      setEvalError(err.message || 'Error communicating with AI verification service. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Demo recitation simulation
  const handleRunDemoCase = (type: 'perfect' | 'missing' | 'substitution') => {
    let simulated = '';
    const clean = normalizeArabic(targetArabicText);
    const words = clean.split(/\s+/).filter(Boolean);

    if (type === 'perfect') {
      simulated = clean;
    } else if (type === 'missing') {
      // Omit the 2nd or 3rd word
      if (words.length > 2) {
        simulated = words.filter((_, idx) => idx !== 1).join(' ');
      } else {
        simulated = words.slice(0, 1).join(' ');
      }
    } else if (type === 'substitution') {
      // Substitute a word with a phonetic alteration
      const modified = [...words];
      if (modified.length > 0) {
        modified[0] = modified[0] + 'ون'; // slight change
      }
      simulated = modified.join(' ');
    }

    runEvaluation(simulated);
  };

  const currentSurah = SURAHS_LIST.find((s) => s.number === selectedSurahNumber) || SURAHS_LIST[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-stone-900 to-teal-950/60 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 1 — AI Tilawat Checking Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Recitation & Memorization Checker
            </h1>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl font-urdu leading-relaxed">
              خود تلاوت کریں، مائیکروفون سے ریکارڈ کریں، اور اے آئی آپ کی چھوڑی ہوئی (Missing)، غلط (Substituted) اور اضافی الفاظ کی نشاندہی کرے گا۔
            </p>
          </div>

          {/* Quick preset selector button */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-xl p-3 text-xs text-stone-300 w-full md:w-auto">
            <div className="text-stone-400 font-medium mb-1">Selected Passage:</div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>Surah {currentSurah.nameTransliterated}</span>
              <span className="font-arabic text-emerald-400">({currentSurah.nameArabic})</span>
              <span className="text-emerald-400">Ayat {fromAyah}–{toAyah}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Passage Selector Controls */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>1. Select Surah & Memorization Range</span>
          </h2>
          <span className="text-xs text-stone-400">
            {currentSurah.versesCount} total verses • {currentSurah.revelationType}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Surah Dropdown */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              Select Surah (1 - 114)
            </label>
            <select
              value={selectedSurahNumber}
              onChange={(e) => {
                setSelectedSurahNumber(Number(e.target.value));
                setFromAyah(1);
                setRangeMode('1_line');
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

          {/* Range Presets */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              Memorization Range Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: '1_line', label: '1 Line (1 Ayah)' },
                { id: '2_lines', label: '2 Lines (2 Ayat)' },
                { id: 'half_page', label: 'Half Page (~5 Ayat)' },
                { id: 'full', label: 'Full Surah' },
                { id: 'custom', label: 'Custom Range' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setRangeMode(btn.id as any)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-center ${
                    rangeMode === btn.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-400'
                      : 'bg-stone-950 text-stone-300 border border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Range Sliders / Inputs if Custom mode */}
        {rangeMode === 'custom' && (
          <div className="flex items-center space-x-4 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
            <div className="flex-1">
              <label className="block text-[11px] text-stone-400 mb-1">From Ayah</label>
              <input
                type="number"
                min={1}
                max={currentSurah.versesCount}
                value={fromAyah}
                onChange={(e) => setFromAyah(Math.max(1, Math.min(currentSurah.versesCount, Number(e.target.value))))}
                className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white text-xs"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] text-stone-400 mb-1">To Ayah</label>
              <input
                type="number"
                min={fromAyah}
                max={currentSurah.versesCount}
                value={toAyah}
                onChange={(e) => setToAyah(Math.max(fromAyah, Math.min(currentSurah.versesCount, Number(e.target.value))))}
                className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-white text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Target Quran Text Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative">
        <div className="flex items-center justify-between mb-4 border-b border-stone-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Target Arabic Text to Recite
            </span>
          </div>
          <span className="text-xs text-stone-400 font-urdu">
            Surah {currentSurah.nameArabic} • آیات {fromAyah} تا {toAyah}
          </span>
        </div>

        {isLoadingAyahs ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-stone-400">Loading authentic Quranic script...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Arabic Uthmani text in large readable calligraphy font */}
            <div
              dir="rtl"
              className="p-6 rounded-2xl bg-stone-950/80 border border-emerald-500/20 text-center font-quran text-2xl sm:text-3xl lg:text-4xl leading-[2.6] text-amber-100 shadow-inner"
            >
              {targetArabicText || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
            </div>

            {/* Translation preview */}
            <div className="space-y-2 bg-stone-950/40 p-4 rounded-xl border border-stone-800/60 text-xs sm:text-sm">
              {selectedAyahsData.map((ayah) => (
                <div key={ayah.ayahNumberInSurah} className="space-y-1">
                  <div className="text-emerald-400/90 font-medium">
                    Ayah {ayah.ayahNumberInSurah}:
                  </div>
                  <div className="text-stone-300 font-urdu leading-relaxed text-sm">
                    {ayah.translationUrdu}
                  </div>
                  <div className="text-stone-400 italic">
                    "{ayah.translationEnglish}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recitation Recording Station */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>2. Recite with Microphone</span>
          </h2>
          {isRecording && (
            <span className="flex items-center space-x-1.5 text-xs text-red-400 font-bold animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>RECORDING ({recordingSeconds}s)</span>
            </span>
          )}
        </div>

        {/* Mic Error Notice */}
        {micError && (
          <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300">Microphone Notice</p>
              <p className="mt-0.5">{micError}</p>
            </div>
          </div>
        )}

        {/* Recording Controls */}
        <div className="flex flex-col items-center justify-center py-6 space-y-5">
          {!isRecording && !audioBlob && (
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={startRecording}
                disabled={isLoadingAyahs || isEvaluating}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white flex flex-col items-center justify-center shadow-xl shadow-emerald-950/60 transition-transform active:scale-95 border-4 border-stone-900 disabled:opacity-50"
                aria-label="Start recording tilawat"
              >
                <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </button>
              <div className="text-center">
                <span className="text-sm font-semibold text-white block">Tap to Start Tilawat</span>
                <span className="text-xs text-stone-400 font-urdu">مائیک بٹن دبائیں اور واضح آواز میں تلاوت کریں</span>
              </div>
            </div>
          )}

          {isRecording && (
            <div className="flex flex-col items-center space-y-5 w-full max-w-md">
              {/* Pulsing visualizer simulation */}
              <div className="flex items-center justify-center space-x-1 h-12 w-full">
                {[40, 70, 95, 60, 85, 100, 75, 45, 90, 65, 80, 50, 95, 70].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-emerald-400 transition-all duration-150 animate-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${(i % 5) * 100}ms`,
                    }}
                  />
                ))}
              </div>

              <div className="text-2xl font-mono font-bold text-emerald-400">
                00:{String(recordingSeconds).padStart(2, '0')}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={stopRecording}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-lg shadow-red-950/50"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Finish & Analyze</span>
                </button>
                <button
                  onClick={cancelRecording}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Recorded audio ready */}
          {!isRecording && audioBlob && (
            <div className="w-full max-w-lg bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-300">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Recitation Recorded ({recordingSeconds}s)
                </span>
                <button
                  onClick={startRecording}
                  className="text-stone-400 hover:text-white flex items-center gap-1 text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Re-record
                </button>
              </div>

              {audioUrl && (
                <div className="flex items-center space-x-3 bg-stone-900 p-2 rounded-lg">
                  <audio
                    ref={recordedAudioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlayingRecorded(false)}
                    className="hidden"
                  />
                  <button
                    onClick={() => {
                      if (!recordedAudioRef.current) return;
                      if (isPlayingRecorded) {
                        recordedAudioRef.current.pause();
                        setIsPlayingRecorded(false);
                      } else {
                        recordedAudioRef.current.play();
                        setIsPlayingRecorded(true);
                      }
                    }}
                    className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                    aria-label="Play recording"
                  >
                    {isPlayingRecorded ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="text-xs text-stone-300">Listen back to your recording</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => runEvaluation()}
                  disabled={isEvaluating}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40"
                >
                  {isEvaluating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>AI Analyzing Quran Recitation...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Check Recitation Errors with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Demo Recitation Buttons for Instant Testing */}
        <div className="border-t border-stone-800/80 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              Instant Demo Recitation Test (No microphone required):
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleRunDemoCase('perfect')}
              disabled={isEvaluating}
              className="px-3 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium text-left transition-all"
            >
              <div className="font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Test Perfect Recitation
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">100% accurate match</div>
            </button>

            <button
              onClick={() => handleRunDemoCase('missing')}
              disabled={isEvaluating}
              className="px-3 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-medium text-left transition-all"
            >
              <div className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Test Missed Word
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">Detects omitted words</div>
            </button>

            <button
              onClick={() => handleRunDemoCase('substitution')}
              disabled={isEvaluating}
              className="px-3 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-medium text-left transition-all"
            >
              <div className="font-bold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> Test Mistake / Substitution
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">Detects mispronounced words</div>
            </button>
          </div>
        </div>
      </div>

      {/* Evaluation Results Card */}
      {evaluationResult && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-lg ${
                  evaluationResult.accuracyScore >= 90
                    ? 'bg-emerald-600 text-white shadow-emerald-950/60'
                    : evaluationResult.accuracyScore >= 75
                    ? 'bg-amber-600 text-white shadow-amber-950/60'
                    : 'bg-rose-600 text-white shadow-rose-950/60'
                }`}
              >
                {evaluationResult.accuracyScore}%
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Recitation Accuracy Result</span>
                  {evaluationResult.accuracyScore >= 90 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                      Excellent Mumtaz
                    </span>
                  )}
                </h3>
                <p className="text-xs text-stone-400">
                  Evaluated against authentic Quranic Arabic text
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setEvaluationResult(null);
                  startRecording();
                }}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-950/80 border border-emerald-500/30 p-3 rounded-xl">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Correct Words</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {evaluationResult.correctWordsCount} / {evaluationResult.totalExpectedWords}
              </div>
              <span className="text-[10px] text-stone-500 font-urdu">صحیح الفاظ</span>
            </div>

            <div className="bg-stone-950/80 border border-amber-500/30 p-3 rounded-xl">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Missing (Omissions)</span>
              <div className="text-xl font-bold text-amber-400 mt-1">
                {evaluationResult.omissionsCount}
              </div>
              <span className="text-[10px] text-stone-500 font-urdu">چھوٹے ہوئے الفاظ</span>
            </div>

            <div className="bg-stone-950/80 border border-rose-500/30 p-3 rounded-xl">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Incorrect (Substitutions)</span>
              <div className="text-xl font-bold text-rose-400 mt-1">
                {evaluationResult.substitutionsCount}
              </div>
              <span className="text-[10px] text-stone-500 font-urdu">غلط یا تبدیل شدہ الفاظ</span>
            </div>

            <div className="bg-stone-950/80 border border-purple-500/30 p-3 rounded-xl">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Extra Words (Additions)</span>
              <div className="text-xl font-bold text-purple-400 mt-1">
                {evaluationResult.additionsCount}
              </div>
              <span className="text-[10px] text-stone-500 font-urdu">اضافی الفاظ</span>
            </div>
          </div>

          {/* Interactive Word-by-Word Diff View */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                Word-by-Word Alignment & Error Highlighting:
              </span>
              <div className="flex items-center space-x-3 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Missing
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Mistake
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Extra
                </span>
              </div>
            </div>

            {/* Word diff box */}
            <div
              dir="rtl"
              className="p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-wrap items-center justify-center gap-2.5 text-2xl font-quran leading-loose"
            >
              {evaluationResult.words.map((item, idx) => {
                if (item.status === 'correct') {
                  return (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:scale-105 transition-transform"
                      title="Correctly recited"
                    >
                      {item.expectedTashkeel || item.expectedWord}
                    </span>
                  );
                }

                if (item.status === 'omission') {
                  return (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-amber-950/70 text-amber-300 border border-amber-500/50 line-through decoration-amber-400 decoration-2 hover:scale-105 transition-transform"
                      title={`Missing word: was not heard in your recitation: ${item.expectedWord}`}
                    >
                      {item.expectedTashkeel || item.expectedWord}
                    </span>
                  );
                }

                if (item.status === 'substitution') {
                  return (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-rose-950/70 text-rose-300 border border-rose-500/60 hover:scale-105 transition-transform"
                      title={`Mistake: Expected "${item.expectedWord}", but heard "${item.transcribedWord}"`}
                    >
                      {item.expectedTashkeel || item.expectedWord}
                      <span className="text-[11px] block font-sans text-rose-400 -mt-1 font-normal">
                        ({item.transcribedWord})
                      </span>
                    </span>
                  );
                }

                if (item.status === 'addition') {
                  return (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-purple-950/70 text-purple-300 border border-purple-500/50 hover:scale-105 transition-transform"
                      title="Extra word recited"
                    >
                      +{item.transcribedWord}
                    </span>
                  );
                }

                return null;
              })}
            </div>
          </div>

          {/* Feedback & Tajweed Notes */}
          <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-2 text-xs">
            <span className="font-bold text-stone-300 uppercase tracking-wider block">
              Pedagogical Feedback & Tajweed Guidance:
            </span>
            <ul className="space-y-1.5 text-stone-300 list-disc list-inside">
              {evaluationResult.feedbackNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
              {evaluationResult.tajweedNotes.map((note, i) => (
                <li key={`tajweed-${i}`} className="text-stone-400 italic">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
