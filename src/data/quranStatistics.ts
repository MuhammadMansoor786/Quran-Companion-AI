export interface QuranStatistic {
  label: string;
  value: string | number;
  urduLabel: string;
  subtext: string;
  category: 'general' | 'verses' | 'divisions';
}

export interface JuzDetail {
  juzNumber: number;
  nameArabic: string;
  nameTransliterated: string;
  nameUrdu: string;
  startSurahName: string;
  startAyah: number;
  endSurahName: string;
  endAyah: number;
}

export interface SajdahDetail {
  number: number;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  ayahNumber: number;
  arabicAyahSnippet: string;
  fiqhNote: string;
  type: 'Wajib' | 'Sunnah Muakkadah';
}

export interface ManzilDetail {
  number: number;
  nameArabic: string;
  startSurah: string;
  endSurah: string;
  dayRecommended: string;
}

export const QURAN_GENERAL_STATS: QuranStatistic[] = [
  { label: "Total Surahs", value: 114, urduLabel: "کل سورتیں", subtext: "86 Makki (مکی) & 28 Madani (مدنی)", category: "general" },
  { label: "Total Ayat (Kufic standard)", value: "6,236", urduLabel: "کل آیاتِ قرآنی", subtext: "According to the Kufic (Hafs 'an 'Asim) consensus", category: "verses" },
  { label: "Paras / Juz", value: 30, urduLabel: "کل پارے / اجزاء", subtext: "Standard 30 divisions for monthly recitation", category: "divisions" },
  { label: "Rukus (Sections)", value: 558, urduLabel: "کل رکوعات", subtext: "Divisions marked with 'Ain (ع) in subcontinental Mushafs", category: "divisions" },
  { label: "Sajdah-e-Tilawat", value: "14 / 15", urduLabel: "سجدہ تلاوت", subtext: "14 agreed upon; 15th in Surah Al-Hajj (Ayah 77) according to Shafi'i/Hanbali", category: "verses" },
  { label: "Manzils", value: 7, urduLabel: "منزلیں", subtext: "Weekly Quran completion portions (Fami Bi Shawq)", category: "divisions" },
  { label: "Total Words", value: "~77,430", urduLabel: "کل الفاظ", subtext: "Counts vary slightly by orthography (~77,430 to 77,439)", category: "verses" },
  { label: "Total Letters", value: "~323,015", urduLabel: "کل حروف", subtext: "Scholarly tradition of Mujahid & Ibn Kathir", category: "verses" },
  { label: "Hizb Quarters", value: 240, urduLabel: "احزاب و ارباع", subtext: "60 Ahzab divided into 4 quarters (Rub' al-Hizb ۞)", category: "divisions" },
];

export const AYAT_COUNTING_CONVENTIONS = [
  {
    convention: "Kufic (الكوفي)",
    totalAyat: 6236,
    authority: "Ali ibn Abi Talib through Abu Abdur-Rahman as-Sulami and Hafs",
    usage: "The standard across 95%+ of contemporary world Mushafs (King Fahd Complex, Cairo edition, South Asia)",
    notes: "Considers Bismillah in Al-Fatiha as verse 1; divides various long verses with distinct waqf."
  },
  {
    convention: "Basran (البصري)",
    totalAyat: 6214,
    authority: "Aasim al-Jahdari and Ayyub ibn al-Mutawakkil (Basra, Iraq)",
    usage: "Documented in classical Tajweed & Qira'at works",
    notes: "Differences arise solely from where a verse end (Fasilah) is marked, not any missing/extra text."
  },
  {
    convention: "Shami / Damascene (الشامي)",
    totalAyat: 6226,
    authority: "Yahya ibn al-Harith adh-Dhimari (Damascus, Syria)",
    usage: "Historical Levant usage",
    notes: "Different verse boundaries in several Surahs such as Al-Baqarah and Al-Anfal."
  },
  {
    convention: "Medinan First (المدني الأول)",
    totalAyat: 6217,
    authority: "Nafi' and the elders of Madinah",
    usage: "Ancient transmission of Madinah Munawwarah",
    notes: "Earlier Madinan census recorded before Imam Nafi'."
  },
  {
    convention: "Medinan Second (المدني الأخير)",
    totalAyat: 6214,
    authority: "Ismail ibn Ja'far and Nafi' ibn Abi Nu'aym",
    usage: "Used in Warsh & Qalun Mushafs of North & West Africa",
    notes: "Does not count Bismillah as verse 1 in Al-Fatiha, but splits 'Sirat alladhina...'"
  },
  {
    convention: "Meccan (المكي)",
    totalAyat: 6210,
    authority: "Mujahid ibn Jabr and Abdullah ibn Kathir al-Makki",
    usage: "Classical Makkah tradition",
    notes: "Identical revelation; differing solely on verse-end stops (Fawasil)."
  }
];

export const JUZ_LIST: JuzDetail[] = [
  { juzNumber: 1, nameArabic: "الم", nameTransliterated: "Alif-Lam-Meem", nameUrdu: "الم", startSurahName: "Al-Fatihah", startAyah: 1, endSurahName: "Al-Baqarah", endAyah: 141 },
  { juzNumber: 2, nameArabic: "سيقول", nameTransliterated: "Sayaqulu", nameUrdu: "سیقول", startSurahName: "Al-Baqarah", startAyah: 142, endSurahName: "Al-Baqarah", endAyah: 252 },
  { juzNumber: 3, nameArabic: "تلك الرسل", nameTransliterated: "Tilka ar-Rusul", nameUrdu: "تلک الرسل", startSurahName: "Al-Baqarah", startAyah: 253, endSurahName: "Ali 'Imran", endAyah: 92 },
  { juzNumber: 4, nameArabic: "لن تنالوا", nameTransliterated: "Lan Tanalu", nameUrdu: "لن تنالوا", startSurahName: "Ali 'Imran", startAyah: 93, endSurahName: "An-Nisa", endAyah: 23 },
  { juzNumber: 5, nameArabic: "والمحصنات", nameTransliterated: "Wal-Muhsanat", nameUrdu: "والمحصنت", startSurahName: "An-Nisa", startAyah: 24, endSurahName: "An-Nisa", endAyah: 147 },
  { juzNumber: 6, nameArabic: "لا يحب الله", nameTransliterated: "La Yuhibbullahu", nameUrdu: "لا یحب اللہ", startSurahName: "An-Nisa", startAyah: 148, endSurahName: "Al-Ma'idah", endAyah: 81 },
  { juzNumber: 7, nameArabic: "وإذا سمعوا", nameTransliterated: "Wa Idha Sami'u", nameUrdu: "واذا سمعوا", startSurahName: "Al-Ma'idah", startAyah: 82, endSurahName: "Al-An'am", endAyah: 110 },
  { juzNumber: 8, nameArabic: "ولو أننا", nameTransliterated: "Wa Law Annana", nameUrdu: "ولو اننا", startSurahName: "Al-An'am", startAyah: 111, endSurahName: "Al-A'raf", endAyah: 87 },
  { juzNumber: 9, nameArabic: "قال الملأ", nameTransliterated: "Qalal-Mala'u", nameUrdu: "قال الملا", startSurahName: "Al-A'raf", startAyah: 88, endSurahName: "Al-Anfal", endAyah: 40 },
  { juzNumber: 10, nameArabic: "واعلموا", nameTransliterated: "Wa'lamu", nameUrdu: "واعلموا", startSurahName: "Al-Anfal", startAyah: 41, endSurahName: "At-Tawbah", endAyah: 92 },
  { juzNumber: 11, nameArabic: "يعتذرون", nameTransliterated: "Ya'tadhiruna", nameUrdu: "یعتذرون", startSurahName: "At-Tawbah", startAyah: 93, endSurahName: "Hud", endAyah: 5 },
  { juzNumber: 12, nameArabic: "وما من دابة", nameTransliterated: "Wa Ma Min Dabbah", nameUrdu: "وما من دابۃ", startSurahName: "Hud", startAyah: 6, endSurahName: "Yusuf", endAyah: 52 },
  { juzNumber: 13, nameArabic: "وما أبرئ", nameTransliterated: "Wa Ma Ubarri'u", nameUrdu: "وما ابری", startSurahName: "Yusuf", startAyah: 53, endSurahName: "Ibrahim", endAyah: 52 },
  { juzNumber: 14, nameArabic: "ربما", nameTransliterated: "Rubama", nameUrdu: "ربما", startSurahName: "Al-Hijr", startAyah: 1, endSurahName: "An-Nahl", endAyah: 128 },
  { juzNumber: 15, nameArabic: "سبحان الذي", nameTransliterated: "Subhanal-Ladhi", nameUrdu: "سبحٰن الذی", startSurahName: "Al-Isra", startAyah: 1, endSurahName: "Al-Kahf", endAyah: 74 },
  { juzNumber: 16, nameArabic: "قال ألم", nameTransliterated: "Qala Alam", nameUrdu: "قال الم", startSurahName: "Al-Kahf", startAyah: 75, endSurahName: "Ta-Ha", endAyah: 135 },
  { juzNumber: 17, nameArabic: "اقترب للناس", nameTransliterated: "Iqtaraba Lin-Nasi", nameUrdu: "اقترب للناس", startSurahName: "Al-Anbiya", startAyah: 1, endSurahName: "Al-Hajj", endAyah: 78 },
  { juzNumber: 18, nameArabic: "قد أفلح", nameTransliterated: "Qad Aflaha", nameUrdu: "قد افلح", startSurahName: "Al-Mu'minun", startAyah: 1, endSurahName: "Al-Furqan", endAyah: 20 },
  { juzNumber: 19, nameArabic: "وقال الذين", nameTransliterated: "Wa Qalal-Ladhina", nameUrdu: "وقال الذین", startSurahName: "Al-Furqan", startAyah: 21, endSurahName: "An-Naml", endAyah: 55 },
  { juzNumber: 20, nameArabic: "أمن خلق", nameTransliterated: "Amman Khalaqa", nameUrdu: "امن خلق", startSurahName: "An-Naml", startAyah: 56, endSurahName: "Al-'Ankabut", endAyah: 45 },
  { juzNumber: 21, nameArabic: "اتل ما أوحي", nameTransliterated: "Utlu Ma Uhiya", nameUrdu: "اتل ما اوحی", startSurahName: "Al-'Ankabut", startAyah: 46, endSurahName: "Al-Ahzab", endAyah: 30 },
  { juzNumber: 22, nameArabic: "ومن يقنت", nameTransliterated: "Wa Man Yaqnut", nameUrdu: "ومن یقنت", startSurahName: "Al-Ahzab", startAyah: 31, endSurahName: "Ya-Sin", endAyah: 27 },
  { juzNumber: 23, nameArabic: "وما أنزلنا", nameTransliterated: "Wa Ma Anzalna", nameUrdu: "وما انزلنا", startSurahName: "Ya-Sin", startAyah: 28, endSurahName: "Az-Zumar", endAyah: 31 },
  { juzNumber: 24, nameArabic: "فمن أظلم", nameTransliterated: "Faman Azlamu", nameUrdu: "فمن اظلم", startSurahName: "Az-Zumar", startAyah: 32, endSurahName: "Fussilat", endAyah: 46 },
  { juzNumber: 25, nameArabic: "إليه يرد", nameTransliterated: "Ilayhi Yuraddu", nameUrdu: "الیہ یرد", startSurahName: "Fussilat", startAyah: 47, endSurahName: "Al-Jathiyah", endAyah: 37 },
  { juzNumber: 26, nameArabic: "حم", nameTransliterated: "Ha-Meem", nameUrdu: "حمٓ", startSurahName: "Al-Ahqaf", startAyah: 1, endSurahName: "Adh-Dhariyat", endAyah: 30 },
  { juzNumber: 27, nameArabic: "قال فما خطبكم", nameTransliterated: "Qala Fama Khatbukum", nameUrdu: "قال فما خطبکم", startSurahName: "Adh-Dhariyat", startAyah: 31, endSurahName: "Al-Hadid", endAyah: 29 },
  { juzNumber: 28, nameArabic: "قد سمع الله", nameTransliterated: "Qad Sami'Allahu", nameUrdu: "قد سمع اللہ", startSurahName: "Al-Mujadila", startAyah: 1, endSurahName: "At-Tahrim", endAyah: 12 },
  { juzNumber: 29, nameArabic: "تبارك الذي", nameTransliterated: "Tabarakal-Ladhi", nameUrdu: "تبارک الذی", startSurahName: "Al-Mulk", startAyah: 1, endSurahName: "Al-Mursalat", endAyah: 50 },
  { juzNumber: 30, nameArabic: "عم يتساءلون", nameTransliterated: "'Amma Yatasa'alun", nameUrdu: "عمّ یتساءلون (عم پارہ)", startSurahName: "An-Naba", startAyah: 1, endSurahName: "An-Nas", endAyah: 6 },
];

export const SAJDAH_LIST: SajdahDetail[] = [
  { number: 1, surahNumber: 7, surahNameArabic: "الأعراف", surahNameEnglish: "Al-A'raf", ayahNumber: 206, arabicAyahSnippet: "إِنَّ الَّذِينَ عِندَ رَبِّكَ لَا يَسْتَكْبِرُونَ عَنْ عِبَادَتِهِ وَيُسَبِّحُونَهُ وَلَهُ يَسْجُدُونَ ۩", fiqhNote: "Agreed upon by all 4 madhhabs", type: "Wajib" },
  { number: 2, surahNumber: 13, surahNameArabic: "الرعد", surahNameEnglish: "Ar-Ra'd", ayahNumber: 15, arabicAyahSnippet: "وَلِلَّهِ يَسْجُدُ مَن فِي السَّمَاوَاتِ وَالْأَرْضِ طَوْعًا وَكَرْهًا وَظِلَالُهُم بِالْغُدُوِّ وَالْآصَالِ ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 3, surahNumber: 16, surahNameArabic: "النحل", surahNameEnglish: "An-Nahl", ayahNumber: 50, arabicAyahSnippet: "يَخَافُونَ رَبَّهُم مِّن فَوْقِهِمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 4, surahNumber: 17, surahNameArabic: "الإسراء", surahNameEnglish: "Al-Isra", ayahNumber: 109, arabicAyahSnippet: "وَيَخِرُّونَ لِلْأَذْقَانِ يَبْكُونَ وَيَزِيدُهُمْ خُشُوعًا ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 5, surahNumber: 19, surahNameArabic: "مريم", surahNameEnglish: "Maryam", ayahNumber: 58, arabicAyahSnippet: "إِذَا تُتْلَىٰ عَلَيْهِمْ آيَاتُ الرَّحْمَٰنِ خَرُّوا سُجَّدًا وَبُكِيًّا ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 6, surahNumber: 22, surahNameArabic: "الحج (السجدة الأولى)", surahNameEnglish: "Al-Hajj (1st)", ayahNumber: 18, arabicAyahSnippet: "أَلَمْ تَرَ أَنَّ اللَّهَ يَسْجُدُ لَهُ مَن فِي السَّمَاوَاتِ وَمَن فِي الْأَرْضِ... ۩", fiqhNote: "Agreed upon by all madhhabs", type: "Wajib" },
  { number: 7, surahNumber: 22, surahNameArabic: "الحج (السجدة الثانية)", surahNameEnglish: "Al-Hajj (2nd)", ayahNumber: 77, arabicAyahSnippet: "يَا أَيُّهَا الَّذِينَ آمَنُوا ارْكَعُوا وَاسْجُدُوا وَاعْبُدُوا رَبَّكُمْ وَافْعَلُوا الْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ ۩", fiqhNote: "Sajdah in Shafi'i, Hanbali & Maliki. Not considered Tilawat Sajdah in Hanafi (considered ruku/salah prayer sajdah).", type: "Sunnah Muakkadah" },
  { number: 8, surahNumber: 25, surahNameArabic: "الفرقان", surahNameEnglish: "Al-Furqan", ayahNumber: 60, arabicAyahSnippet: "وَإِذَا قِيلَ لَهُمُ اسْجُدُوا لِلرَّحْمَٰنِ قَالُوا وَمَا الرَّحْمَٰنُ... ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 9, surahNumber: 27, surahNameArabic: "النمل", surahNameEnglish: "An-Naml", ayahNumber: 26, arabicAyahSnippet: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ رَبُّ الْعَرْشِ الْعَظِيمِ ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 10, surahNumber: 32, surahNameArabic: "السجدة", surahNameEnglish: "As-Sajdah", ayahNumber: 15, arabicAyahSnippet: "إِنَّمَا يُؤْمِنُ بِآيَاتِنَا الَّذِينَ إِذَا ذُكِّرُوا بِهَا خَرُّوا سُجَّدًا وَسَبَّحُوا بِحَمْدِ رَبِّهِمْ... ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 11, surahNumber: 38, surahNameArabic: "ص", surahNameEnglish: "Sad", ayahNumber: 24, arabicAyahSnippet: "وَظَنَّ دَاوُودُ أَنَّمَا فَتَنَّاهُ فَاسْتَغْفَرَ رَبَّهُ وَخَرَّ رَاكِعًا وَأَنَابَ ۩", fiqhNote: "Hanafi: Wajib Tilawat. Shafi'i: Sajdah Shukr (prostration of thanks).", type: "Wajib" },
  { number: 12, surahNumber: 41, surahNameArabic: "فصلت", surahNameEnglish: "Fussilat", ayahNumber: 38, arabicAyahSnippet: "فَإِنِ اسْتَكْبَرُوا فَالَّذِينَ عِندَ رَبِّكَ يُسَبِّحُونَ لَهُ بِاللَّيْلِ وَالنَّهَارِ وَهُمْ لَا يَسْأَمُونَ ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 13, surahNumber: 53, surahNameArabic: "النجم", surahNameEnglish: "An-Najm", ayahNumber: 62, arabicAyahSnippet: "فَاسْجُدُوا لِلَّهِ وَاعْبُدُوا ۩", fiqhNote: "Agreed upon (first sajdah revealed publicly in Makkah)", type: "Wajib" },
  { number: 14, surahNumber: 84, surahNameArabic: "الانشقاق", surahNameEnglish: "Al-Inshiqaq", ayahNumber: 21, arabicAyahSnippet: "وَإِذَا قُرِئَ عَلَيْهِمُ الْقُرْآنُ لَا يَسْجُدُونَ ۩", fiqhNote: "Agreed upon", type: "Wajib" },
  { number: 15, surahNumber: 96, surahNameArabic: "العلق", surahNameEnglish: "Al-'Alaq", ayahNumber: 19, arabicAyahSnippet: "كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب ۩", fiqhNote: "Agreed upon (closing verse of the first revealed Surah)", type: "Wajib" },
];

export const MANZILS: ManzilDetail[] = [
  { number: 1, nameArabic: "المنزل الأول", startSurah: "Al-Fatihah (1)", endSurah: "An-Nisa (4)", dayRecommended: "Friday / Day 1" },
  { number: 2, nameArabic: "المنزل الثاني", startSurah: "Al-Ma'idah (5)", endSurah: "At-Tawbah (9)", dayRecommended: "Saturday / Day 2" },
  { number: 3, nameArabic: "المنزل الثالث", startSurah: "Yunus (10)", endSurah: "An-Nahl (16)", dayRecommended: "Sunday / Day 3" },
  { number: 4, nameArabic: "المنزل الرابع", startSurah: "Al-Isra (17)", endSurah: "Al-Furqan (25)", dayRecommended: "Monday / Day 4" },
  { number: 5, nameArabic: "المنزل الخامس", startSurah: "Ash-Shu'ara (26)", endSurah: "Ya-Sin (36)", dayRecommended: "Tuesday / Day 5" },
  { number: 6, nameArabic: "المنزل السادس", startSurah: "As-Saffat (37)", endSurah: "Al-Hujurat (49)", dayRecommended: "Wednesday / Day 6" },
  { number: 7, nameArabic: "المنزل السابع", startSurah: "Qaf (50)", endSurah: "An-Nas (114)", dayRecommended: "Thursday / Day 7" },
];

export const QURANIC_FACTS = [
  {
    title: "Longest Surah & Longest Verse",
    urduTitle: "طویل ترین سورت اور طویل ترین آیت",
    content: "Surah Al-Baqarah (286 ayat) is the longest Surah. Its 282nd Ayah (آية المداينة - The Verse of Loan/Debt) is the longest single ayah in the entire Quran, spanning an entire page.",
    reference: "Al-Baqarah 2:282"
  },
  {
    title: "Shortest Surah & Shortest Verse",
    urduTitle: "مختصر ترین سورت",
    content: "Surah Al-Kawthar (Surah 108) is the shortest Surah with only 3 verses, 10 words, and 42 letters.",
    reference: "Surah Al-Kawthar (108:1-3)"
  },
  {
    title: "Surah with Two Bismillahs",
    urduTitle: "وہ سورت جس میں دو بار بسم اللہ ہے",
    content: "Surah An-Naml (Chapter 27) contains two Bismillahs: one at its beginning, and one inside verse 30 in the letter of Prophet Sulayman (ع): إِنَّهُ مِن سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.",
    reference: "Surah An-Naml 27:30"
  },
  {
    title: "Surah without Opening Bismillah",
    urduTitle: "وہ سورت جس کے آغاز میں بسم اللہ نہیں",
    content: "Surah At-Tawbah (Chapter 9) does not begin with Bismillah. The companions recorded that it is closely connected with Al-Anfal, and because Bismillah signifies peace and mercy, while At-Tawbah was revealed regarding the nullification of treaties with pagans.",
    reference: "Sunan at-Tirmidhi #3086"
  },
  {
    title: "The Heart of the Quran",
    urduTitle: "قرآن پاک کا دل",
    content: "Prophet Muhammad ﷺ said: 'Indeed everything has a heart, and the heart of the Quran is Ya-Sin.'",
    reference: "Sunan at-Tirmidhi #2887"
  },
  {
    title: "The Greatest Verse: Ayat-ul-Kursi",
    urduTitle: "قرآن مجید کی سب سے عظیم آیت",
    content: "When the Prophet ﷺ asked Ubayy ibn Ka'b: 'Which verse in the Book of Allah with you is the greatest?', he replied: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum (Ayat-ul-Kursi).' The Prophet tapped his chest and said: 'Congratulations on your knowledge, Abu al-Mundhir!'",
    reference: "Sahih Muslim #810"
  },
  {
    title: "First & Final Revelations",
    urduTitle: "پہلی اور آخری وحی",
    content: "The first revealed verses were the opening 5 verses of Surah Al-'Alaq (اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ) in Cave Hira. The final revealed verse according to Ibn Abbas is: وَاتَّقُوا يَوْمًا تُرْجَعُونَ فِيهِ إِلَى اللَّهِ (Al-Baqarah 2:281).",
    reference: "Sahih al-Bukhari #4953, #4605"
  },
  {
    title: "Exact Central Word of the Quran",
    urduTitle: "قرآن پاک کا درمیانی لفظ",
    content: "According to the classical Kufic letter count, the central word is 'وَلْيَتَلَطَّفْ' (And let him be gentle/cautious) in Surah Al-Kahf (18:19), marked in bold red in many Mushafs.",
    reference: "Surah Al-Kahf 18:19"
  }
];
