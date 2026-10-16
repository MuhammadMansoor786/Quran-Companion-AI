import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, PracticeSessionRecord, MemorizedAyahRecord, RevisionPlan } from '../types.ts';
import { AUTHENTIC_RECITERS, Reciter } from '../data/quranAyatData.ts';

interface QuranContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  memorizedAyahs: Record<string, MemorizedAyahRecord>;
  toggleMemorizedAyah: (surahNumber: number, ayahNumber: number) => void;
  isAyahMemorized: (surahNumber: number, ayahNumber: number) => boolean;
  practiceHistory: PracticeSessionRecord[];
  addPracticeSession: (session: Omit<PracticeSessionRecord, 'id' | 'date'>) => void;
  favoriteDuas: string[];
  toggleFavoriteDua: (duaId: string) => void;
  isDuaFavorite: (duaId: string) => boolean;
  selectedReciter: Reciter;
  setSelectedReciter: (reciter: Reciter) => void;
  revisionPlan: RevisionPlan;
  updateRevisionStatus: (type: 'sabaq' | 'sabqi' | 'manzil', status: 'pending' | 'completed') => void;
  activeTab: 'recite' | 'listen' | 'stats' | 'duas' | 'dashboard';
  setActiveTab: (tab: 'recite' | 'listen' | 'stats' | 'duas' | 'dashboard') => void;
  // Quick pre-selected recitation trigger from other tabs
  startRecitationTarget: (surahNum: number, fromAyah?: number, toAyah?: number) => void;
  recitationTarget: { surahNum: number; fromAyah: number; toAyah: number } | null;
}

const DEFAULT_USER: UserProfile = {
  name: 'Talib al-Ilm',
  email: 'learner@qurancompanion.ai',
  level: 'Beginner',
  dailyGoalAyat: 3,
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  preferredReciterId: 'alafasy',
  targetSurahNumber: 1,
};

const DEFAULT_MEMORIZED: Record<string, MemorizedAyahRecord> = {
  '1:1': { surahNumber: 1, ayahNumber: 1, dateMemorized: '2026-10-10', reviewCount: 8, retentionScore: 100 },
  '1:2': { surahNumber: 1, ayahNumber: 2, dateMemorized: '2026-10-10', reviewCount: 8, retentionScore: 100 },
  '1:3': { surahNumber: 1, ayahNumber: 3, dateMemorized: '2026-10-11', reviewCount: 7, retentionScore: 98 },
  '1:4': { surahNumber: 1, ayahNumber: 4, dateMemorized: '2026-10-11', reviewCount: 7, retentionScore: 96 },
  '1:5': { surahNumber: 1, ayahNumber: 5, dateMemorized: '2026-10-12', reviewCount: 6, retentionScore: 95 },
  '1:6': { surahNumber: 1, ayahNumber: 6, dateMemorized: '2026-10-13', reviewCount: 5, retentionScore: 94 },
  '1:7': { surahNumber: 1, ayahNumber: 7, dateMemorized: '2026-10-14', reviewCount: 5, retentionScore: 95 },
  '112:1': { surahNumber: 112, ayahNumber: 1, dateMemorized: '2026-10-15', reviewCount: 4, retentionScore: 100 },
  '112:2': { surahNumber: 112, ayahNumber: 2, dateMemorized: '2026-10-15', reviewCount: 4, retentionScore: 100 },
  '112:3': { surahNumber: 112, ayahNumber: 3, dateMemorized: '2026-10-15', reviewCount: 4, retentionScore: 98 },
  '112:4': { surahNumber: 112, ayahNumber: 4, dateMemorized: '2026-10-15', reviewCount: 4, retentionScore: 98 },
};

const DEFAULT_PRACTICE_HISTORY: PracticeSessionRecord[] = [
  {
    id: 'rec-1',
    date: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    surahNumber: 1,
    surahNameArabic: 'الفاتحة',
    surahNameEnglish: 'Al-Fatihah',
    ayahRange: '1 - 7',
    expectedText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...',
    transcribedText: 'بسم الله الرحمن الرحيم الحمد لله رب العالمين...',
    accuracyScore: 96,
    correctWords: 28,
    omissions: 1,
    substitutions: 0,
    additions: 0,
    durationSeconds: 32,
  },
  {
    id: 'rec-2',
    date: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    surahNumber: 112,
    surahNameArabic: 'الإخلاص',
    surahNameEnglish: 'Al-Ikhlas',
    ayahRange: '1 - 4',
    expectedText: 'قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    transcribedText: 'قل هو الله احد الله الصمد لم يلد ولم يولد ولم يكن له كفوا احد',
    accuracyScore: 100,
    correctWords: 15,
    omissions: 0,
    substitutions: 0,
    additions: 0,
    durationSeconds: 18,
  },
];

const QuranContext = createContext<QuranContextType | undefined>(undefined);

export const QuranProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'recite' | 'listen' | 'stats' | 'duas' | 'dashboard'>('recite');
  
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('quran_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [memorizedAyahs, setMemorizedAyahs] = useState<Record<string, MemorizedAyahRecord>>(() => {
    try {
      const saved = localStorage.getItem('quran_memorized');
      return saved ? JSON.parse(saved) : DEFAULT_MEMORIZED;
    } catch {
      return DEFAULT_MEMORIZED;
    }
  });

  const [practiceHistory, setPracticeHistory] = useState<PracticeSessionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('quran_history');
      return saved ? JSON.parse(saved) : DEFAULT_PRACTICE_HISTORY;
    } catch {
      return DEFAULT_PRACTICE_HISTORY;
    }
  });

  const [favoriteDuas, setFavoriteDuas] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('quran_favorites');
      return saved ? JSON.parse(saved) : ['ayat-ul-kursi', 'sayyidul-istighfar', 'tasbeeh-fatima', 'sana-thana'];
    } catch {
      return ['ayat-ul-kursi', 'sayyidul-istighfar', 'tasbeeh-fatima', 'sana-thana'];
    }
  });

  const [selectedReciter, setSelectedReciter] = useState<Reciter>(() => {
    return AUTHENTIC_RECITERS.find(r => r.id === user.preferredReciterId) || AUTHENTIC_RECITERS[0];
  });

  const [recitationTarget, setRecitationTarget] = useState<{ surahNum: number; fromAyah: number; toAyah: number } | null>(null);

  const [revisionPlan, setRevisionPlan] = useState<RevisionPlan>({
    sabaq: {
      surahNumber: 114,
      surahName: 'An-Nas',
      fromAyah: 1,
      toAyah: 6,
      status: 'pending',
    },
    sabqi: {
      surahNumber: 113,
      surahName: 'Al-Falaq',
      description: 'Review Surah Al-Falaq & Al-Ikhlas (last 2 lessons)',
      status: 'completed',
    },
    manzil: {
      juzNumber: 30,
      juzName: 'Juz 30 (Amma)',
      description: 'Recite first quarter of Juz 30 (Al-Naba to Al-Mutaffifin)',
      status: 'pending',
    },
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quran_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to save user', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('quran_memorized', JSON.stringify(memorizedAyahs));
    } catch (e) {
      console.warn('Failed to save memorized', e);
    }
  }, [memorizedAyahs]);

  useEffect(() => {
    try {
      localStorage.setItem('quran_history', JSON.stringify(practiceHistory));
    } catch (e) {
      console.warn('Failed to save history', e);
    }
  }, [practiceHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('quran_favorites', JSON.stringify(favoriteDuas));
    } catch (e) {
      console.warn('Failed to save favorites', e);
    }
  }, [favoriteDuas]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const toggleMemorizedAyah = (surahNumber: number, ayahNumber: number) => {
    const key = `${surahNumber}:${ayahNumber}`;
    setMemorizedAyahs(prev => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = {
          surahNumber,
          ayahNumber,
          dateMemorized: new Date().toISOString().split('T')[0],
          reviewCount: 1,
          retentionScore: 100,
        };
      }
      return next;
    });
  };

  const isAyahMemorized = (surahNumber: number, ayahNumber: number): boolean => {
    return Boolean(memorizedAyahs[`${surahNumber}:${ayahNumber}`]);
  };

  const addPracticeSession = (session: Omit<PracticeSessionRecord, 'id' | 'date'>) => {
    const newRecord: PracticeSessionRecord = {
      ...session,
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setPracticeHistory(prev => [newRecord, ...prev]);

    // Update streak if today was active
    const today = new Date().toISOString().split('T')[0];
    if (user.lastActiveDate !== today) {
      setUser(prev => ({
        ...prev,
        streakDays: prev.streakDays + 1,
        lastActiveDate: today,
      }));
    }
  };

  const toggleFavoriteDua = (duaId: string) => {
    setFavoriteDuas(prev =>
      prev.includes(duaId) ? prev.filter(id => id !== duaId) : [...prev, duaId]
    );
  };

  const isDuaFavorite = (duaId: string): boolean => {
    return favoriteDuas.includes(duaId);
  };

  const updateRevisionStatus = (type: 'sabaq' | 'sabqi' | 'manzil', status: 'pending' | 'completed') => {
    setRevisionPlan(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        status,
      },
    }));
  };

  const startRecitationTarget = (surahNum: number, fromAyah = 1, toAyah = 7) => {
    setRecitationTarget({ surahNum, fromAyah, toAyah });
    setActiveTab('recite');
  };

  return (
    <QuranContext.Provider
      value={{
        user,
        updateUser,
        memorizedAyahs,
        toggleMemorizedAyah,
        isAyahMemorized,
        practiceHistory,
        addPracticeSession,
        favoriteDuas,
        toggleFavoriteDua,
        isDuaFavorite,
        selectedReciter,
        setSelectedReciter,
        revisionPlan,
        updateRevisionStatus,
        activeTab,
        setActiveTab,
        startRecitationTarget,
        recitationTarget,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = (): QuranContextType => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};
