import test from 'node:test';
import assert from 'node:assert/strict';
import {
  removeDiacritics,
  normalizeArabic,
  splitArabicWords,
  stringSimilarity,
  evaluateRecitation
} from './quranArabicCompare.ts';

test('removeDiacritics removes harakat and Quranic marks', () => {
  const fatihaWithHarakat = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
  const cleaned = removeDiacritics(fatihaWithHarakat);
  assert.equal(cleaned, 'بسم الله الرحمن الرحيم');
});

test('normalizeArabic standardizes alef, taa marbutah, and yaa forms', () => {
  const input = 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ';
  const normalized = normalizeArabic(input);
  assert.equal(normalized, 'اياك نعبد واياك نستعين');
});

test('stringSimilarity returns 1.0 for exact matches and handles small diffs', () => {
  assert.equal(stringSimilarity('الله', 'الله'), 1.0);
  assert.ok(stringSimilarity('الرحمن', 'الرحمان') > 0.8);
  assert.equal(stringSimilarity('قل', 'صراط'), 0);
});

test('evaluateRecitation identifies perfect recitation', () => {
  const expected = 'قُلْ هُوَ اللَّهُ أَحَدٌ';
  const recited = 'قل هو الله احد';
  const result = evaluateRecitation(expected, recited);

  assert.equal(result.totalExpectedWords, 4);
  assert.equal(result.correctWordsCount, 4);
  assert.equal(result.omissionsCount, 0);
  assert.equal(result.substitutionsCount, 0);
  assert.ok(result.accuracyScore >= 95);
});

test('evaluateRecitation detects omitted / missing words', () => {
  const expected = 'قُلْ هُوَ اللَّهُ أَحَدٌ';
  // User skips "الله"
  const recited = 'قل هو احد';
  const result = evaluateRecitation(expected, recited);

  assert.equal(result.correctWordsCount, 3);
  assert.equal(result.omissionsCount, 1);
  const omittedWord = result.words.find(w => w.status === 'omission');
  assert.ok(omittedWord, 'Should flag omitted word');
  assert.equal(omittedWord?.expectedWord, 'الله');
  assert.ok(result.accuracyScore < 95);
});

test('evaluateRecitation detects substituted words', () => {
  const expected = 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ';
  // User says "نحمد" instead of "نعبد"
  const recited = 'اياك نحمد واياك نستعين';
  const result = evaluateRecitation(expected, recited);

  const subWord = result.words.find(w => w.status === 'substitution');
  assert.ok(subWord, 'Should flag substituted word');
  assert.equal(subWord?.transcribedWord, 'نحمد');
});
