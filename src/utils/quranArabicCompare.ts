/**
 * Quran Arabic Recitation Comparison and Alignment Engine
 * Normalizes Arabic text, performs word-level alignment,
 * detects omissions, additions, and substitutions, and calculates scores.
 */

export interface AlignmentWord {
  expectedWord?: string;
  transcribedWord?: string;
  status: 'correct' | 'omission' | 'substitution' | 'addition';
  confidence?: number;
  expectedTashkeel?: string;
}

export interface EvaluationResult {
  accuracyScore: number;
  totalExpectedWords: number;
  correctWordsCount: number;
  omissionsCount: number;
  substitutionsCount: number;
  additionsCount: number;
  fluencyScore: number;
  words: AlignmentWord[];
  feedbackNotes: string[];
  tajweedNotes: string[];
}

/**
 * Remove Arabic diacritics (harakat/tashkeel), Quranic stop signs, and punctuation.
 */
export function removeDiacritics(text: string): string {
  if (!text) return '';
  return text
    // Arabic diacritics
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    // Quranic stop signs and annotation marks
    .replace(/[\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '')
    // Tatweel / Kashida
    .replace(/\u0640/g, '')
    // Common punctuation
    .replace(/[.,/#!$%^&*;:{}=\-_`~()؟،؛«»"']/g, '')
    // Trim extra spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalize Arabic characters for robust comparison (e.g., standardizing alif forms, taa marbuta, etc.)
 */
export function normalizeArabic(text: string): string {
  let cleaned = removeDiacritics(text);
  
  // Standardize Alif forms
  cleaned = cleaned.replace(/[إأآٱ]/g, 'ا');
  // Standardize Taa Marbutah to Haa (often pronounced as Haa or Taa depending on stop)
  cleaned = cleaned.replace(/ة/g, 'ه');
  // Standardize Alif Maqsura to Yaa
  cleaned = cleaned.replace(/ى/g, 'ي');
  // Standardize Persian/Urdu Yeh to Arabic Yaa
  cleaned = cleaned.replace(/ے/g, 'ي');
  // Standardize Persian Kaf / Keheh to Arabic Kaaf
  cleaned = cleaned.replace(/ک/g, 'ك');
  // Standardize Hamza on Waw or Yaa
  cleaned = cleaned.replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');

  return cleaned.trim();
}

/**
 * Split Arabic text into words while keeping both raw (with harakat) and normalized forms.
 */
export function splitArabicWords(text: string): { original: string; normalized: string }[] {
  // Strip numbers (like verse numbers e.g. ﴿١﴾ or (1))
  const stripped = text.replace(/[\u0660-\u06690-9﴿﴾()]/g, '');
  const tokens = stripped.trim().split(/\s+/).filter(Boolean);
  
  return tokens.map(token => ({
    original: token,
    normalized: normalizeArabic(token),
  })).filter(t => t.normalized.length > 0);
}

/**
 * Compute Levenshtein distance between two strings
 */
export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }
  return dp[m][n];
}

/**
 * String similarity ratio between 0 and 1
 */
export function stringSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(s1, s2);
  return Math.max(0, (maxLen - dist) / maxLen);
}

/**
 * Needleman-Wunsch / Dynamic Programming alignment between expected words and transcribed words
 */
export function alignRecitationWords(
  expectedList: { original: string; normalized: string }[],
  transcribedList: { original: string; normalized: string }[]
): AlignmentWord[] {
  const n = expectedList.length;
  const m = transcribedList.length;

  if (n === 0 && m === 0) return [];
  if (n === 0) {
    return transcribedList.map(t => ({
      transcribedWord: t.original,
      status: 'addition',
    }));
  }
  if (m === 0) {
    return expectedList.map(e => ({
      expectedWord: e.normalized,
      expectedTashkeel: e.original,
      status: 'omission',
    }));
  }

  // Cost matrix
  // match: positive score, mismatch/gap: penalty
  const MATCH_SCORE = 3;
  const GAP_PENALTY = -2;
  const MISMATCH_PENALTY = -1;

  const scoreMatrix: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 0; i <= n; i++) scoreMatrix[i][0] = i * GAP_PENALTY;
  for (let j = 0; j <= m; j++) scoreMatrix[0][j] = j * GAP_PENALTY;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const expNorm = expectedList[i - 1].normalized;
      const transNorm = transcribedList[j - 1].normalized;
      const sim = stringSimilarity(expNorm, transNorm);

      let matchOrSub = 0;
      if (sim >= 0.75) {
        matchOrSub = MATCH_SCORE * sim;
      } else {
        matchOrSub = MISMATCH_PENALTY;
      }

      scoreMatrix[i][j] = Math.max(
        scoreMatrix[i - 1][j - 1] + matchOrSub, // match or substitution
        scoreMatrix[i - 1][j] + GAP_PENALTY,     // omission (expected word missing)
        scoreMatrix[i][j - 1] + GAP_PENALTY      // addition (extra transcribed word)
      );
    }
  }

  // Backtracking
  const result: AlignmentWord[] = [];
  let i = n;
  let j = m;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const exp = expectedList[i - 1];
      const trans = transcribedList[j - 1];
      const sim = stringSimilarity(exp.normalized, trans.normalized);
      const matchScore = (sim >= 0.75 ? MATCH_SCORE * sim : MISMATCH_PENALTY);

      if (scoreMatrix[i][j] === scoreMatrix[i - 1][j - 1] + matchScore) {
        if (sim >= 0.75) {
          result.unshift({
            expectedWord: exp.normalized,
            expectedTashkeel: exp.original,
            transcribedWord: trans.original,
            status: 'correct',
            confidence: sim,
          });
        } else {
          result.unshift({
            expectedWord: exp.normalized,
            expectedTashkeel: exp.original,
            transcribedWord: trans.original,
            status: 'substitution',
            confidence: sim,
          });
        }
        i--;
        j--;
        continue;
      }
    }

    if (i > 0 && scoreMatrix[i][j] === scoreMatrix[i - 1][j] + GAP_PENALTY) {
      const exp = expectedList[i - 1];
      result.unshift({
        expectedWord: exp.normalized,
        expectedTashkeel: exp.original,
        status: 'omission',
      });
      i--;
    } else {
      const trans = transcribedList[j - 1];
      result.unshift({
        transcribedWord: trans.original,
        status: 'addition',
      });
      j--;
    }
  }

  return result;
}

/**
 * Full evaluation of recitation against expected text.
 */
export function evaluateRecitation(
  expectedArabicText: string,
  transcribedArabicText: string
): EvaluationResult {
  const expectedWords = splitArabicWords(expectedArabicText);
  const transcribedWords = splitArabicWords(transcribedArabicText);

  const alignment = alignRecitationWords(expectedWords, transcribedWords);

  let correctCount = 0;
  let omissionsCount = 0;
  let substitutionsCount = 0;
  let additionsCount = 0;

  for (const item of alignment) {
    if (item.status === 'correct') correctCount++;
    else if (item.status === 'omission') omissionsCount++;
    else if (item.status === 'substitution') substitutionsCount++;
    else if (item.status === 'addition') additionsCount++;
  }

  const totalExpected = expectedWords.length || 1;
  // Calculate accuracy score
  const accuracyScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(((correctCount - (omissionsCount * 0.7) - (substitutionsCount * 0.5) - (additionsCount * 0.3)) / totalExpected) * 100)
    )
  );

  const fluencyScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(((correctCount / (correctCount + omissionsCount + substitutionsCount || 1)) * 100))
    )
  );

  const feedbackNotes: string[] = [];
  const tajweedNotes: string[] = [];

  if (accuracyScore >= 95) {
    feedbackNotes.push('ما شاء الله! Excellent recitation with high precision.');
    tajweedNotes.push('Your words align accurately with the Quranic passage. Continue practicing with Tajweed and proper Waqf (pauses).');
  } else if (accuracyScore >= 80) {
    feedbackNotes.push('جيد جداً! Very good effort. A few words need attention.');
    if (omissionsCount > 0) {
      feedbackNotes.push(`You missed ${omissionsCount} word(s). Look closely at highlighted skipped portions.`);
    }
    if (substitutionsCount > 0) {
      feedbackNotes.push(`Pay attention to ${substitutionsCount} word(s) that were recited with different pronunciation or replaced.`);
    }
  } else {
    feedbackNotes.push('Keep practicing! Memorization requires steady repetition.');
    if (omissionsCount > 0) {
      feedbackNotes.push(`Missing words detected: ${omissionsCount}. Try listening to the reciter in Phase 2 first.`);
    }
    if (substitutionsCount > 0) {
      feedbackNotes.push(`Substituted words detected: ${substitutionsCount}. Review the exact Arabic script.`);
    }
  }

  // Tajweed pedagogical reminder
  tajweedNotes.push('Note: AI provides word-level verification. For complete Tajweed rules (Madd, Ghunnah, Qalqalah, Makharij), recite before a certified Qari/Muallim.');

  return {
    accuracyScore,
    totalExpectedWords: totalExpected,
    correctWordsCount: correctCount,
    omissionsCount,
    substitutionsCount,
    additionsCount,
    fluencyScore,
    words: alignment,
    feedbackNotes,
    tajweedNotes,
  };
}
