export interface UserProfile {
  name: string;
  email: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced / Hafiz';
  dailyGoalAyat: number;
  streakDays: number;
  lastActiveDate: string;
  preferredReciterId: string;
  targetSurahNumber: number;
}

export interface PracticeSessionRecord {
  id: string;
  date: string;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  ayahRange: string;
  expectedText: string;
  transcribedText: string;
  accuracyScore: number;
  correctWords: number;
  omissions: number;
  substitutions: number;
  additions: number;
  durationSeconds: number;
}

export interface MemorizedAyahRecord {
  surahNumber: number;
  ayahNumber: number;
  dateMemorized: string;
  reviewCount: number;
  lastReviewedDate?: string;
  retentionScore?: number; // 0-100
}

export interface RevisionPlan {
  sabaq: {
    surahNumber: number;
    surahName: string;
    fromAyah: number;
    toAyah: number;
    status: 'pending' | 'completed';
  };
  sabqi: {
    surahNumber: number;
    surahName: string;
    description: string;
    status: 'pending' | 'completed';
  };
  manzil: {
    juzNumber: number;
    juzName: string;
    description: string;
    status: 'pending' | 'completed';
  };
}
