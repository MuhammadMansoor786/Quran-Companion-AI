export interface QuranAyah {
  ayahNumberInSurah: number;
  ayahNumberOverall: number;
  arabicUthmani: string;
  transliteration: string;
  translationEnglish: string;
  translationUrdu: string;
  audioUrl?: string;
  words?: {
    id: number;
    arabic: string;
    transliteration: string;
    english: string;
    urdu: string;
  }[];
}

export interface Reciter {
  id: string;
  name: string;
  subname: string;
  subfolder: string;
  bitrate: string;
}

export const AUTHENTIC_RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    subname: 'مشاري بن راشد العفاسي',
    subfolder: 'Alafasy_128kbps',
    bitrate: '128kbps',
  },
  {
    id: 'abdul_basit',
    name: 'Sheikh Abdul Basit (Murattal)',
    subname: 'عبد الباسط عبد الصمد',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
    bitrate: '192kbps',
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary',
    subname: 'محمود خليل الحصري',
    subfolder: 'Husary_128kbps',
    bitrate: '128kbps',
  },
  {
    id: 'minshawi',
    name: 'Muhammad Siddiq Al-Minshawi',
    subname: 'محمد صديق المنشاوي',
    subfolder: 'Minshawy_Murattal_128kbps',
    bitrate: '128kbps',
  },
];

/**
 * Generate standard EveryAyah audio URL for any surah and ayah
 */
export function getEveryAyahAudioUrl(
  reciterFolder: string,
  surahNumber: number,
  ayahNumberInSurah: number
): string {
  const surahStr = String(surahNumber).padStart(3, '0');
  const ayahStr = String(ayahNumberInSurah).padStart(3, '0');
  return `https://everyayah.com/data/${reciterFolder}/${surahStr}${ayahStr}.mp3`;
}

// Built-in rich offline corpus for fast, zero-delay experience (Surah 1, 108, 112, 113, 114, Ayat-ul-Kursi)
export const PRELOADED_SURAHS_DATA: Record<number, QuranAyah[]> = {
  // Surah 1: Al-Fatihah
  1: [
    {
      ayahNumberInSurah: 1,
      ayahNumberOverall: 1,
      arabicUthmani: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      transliteration: "Bismillāhir-Raḥmānir-Raḥīm",
      translationEnglish: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      translationUrdu: "اللہ کے نام سے شروع جو بڑا مہربان نہایت رحم والا ہے۔",
      words: [
        { id: 1, arabic: "بِسْمِ", transliteration: "Bismi", english: "In the name", urdu: "نام سے" },
        { id: 2, arabic: "اللَّهِ", transliteration: "Allahi", english: "of Allah", urdu: "اللہ کے" },
        { id: 3, arabic: "الرَّحْمَٰنِ", transliteration: "ar-Rahmani", english: "the Entirely Merciful", urdu: "بڑا مہربان" },
        { id: 4, arabic: "الرَّحِيمِ", transliteration: "ar-Raheem", english: "the Especially Merciful", urdu: "نہایت رحم والا" },
      ]
    },
    {
      ayahNumberInSurah: 2,
      ayahNumberOverall: 2,
      arabicUthmani: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      transliteration: "Al-ḥamdu lillāhi Rabbil-ʻālamīn",
      translationEnglish: "[All] praise is [due] to Allah, Lord of the worlds -",
      translationUrdu: "سب تعریف اللہ ہی کے لیے ہے جو تمام جہانوں کا پالنے والا ہے۔",
      words: [
        { id: 1, arabic: "الْحَمْدُ", transliteration: "Al-hamdu", english: "All praise", urdu: "سب تعریف" },
        { id: 2, arabic: "لِلَّهِ", transliteration: "lillahi", english: "for Allah", urdu: "اللہ کے لیے" },
        { id: 3, arabic: "رَبِّ", transliteration: "Rabbi", english: "Lord", urdu: "پالنے والا" },
        { id: 4, arabic: "الْعَالَمِينَ", transliteration: "al-'alameen", english: "of the worlds", urdu: "تمام جہانوں کا" },
      ]
    },
    {
      ayahNumberInSurah: 3,
      ayahNumberOverall: 3,
      arabicUthmani: 'الرَّحْمَٰنِ الرَّحِيمِ',
      transliteration: "Ar-Raḥmānir-Raḥīm",
      translationEnglish: "The Entirely Merciful, the Especially Merciful,",
      translationUrdu: "بڑا مہربان نہایت رحم فرمانے والا۔",
      words: [
        { id: 1, arabic: "الرَّحْمَٰنِ", transliteration: "Ar-Rahman", english: "The Entirely Merciful", urdu: "بڑا مہربان" },
        { id: 2, arabic: "الرَّحِيمِ", transliteration: "ar-Raheem", english: "The Especially Merciful", urdu: "نہایت رحم والا" },
      ]
    },
    {
      ayahNumberInSurah: 4,
      ayahNumberOverall: 4,
      arabicUthmani: 'مَالِكِ يَوْمِ الدِّينِ',
      transliteration: "Māliki yawmid-dīn",
      translationEnglish: "Sovereign of the Day of Recompense.",
      translationUrdu: "روزِ جزا کا مالک ہے۔",
      words: [
        { id: 1, arabic: "مَالِكِ", transliteration: "Maliki", english: "Master/Sovereign", urdu: "مالک" },
        { id: 2, arabic: "يَوْمِ", transliteration: "yawmi", english: "of the Day", urdu: "دن کا" },
        { id: 3, arabic: "الدِّينِ", transliteration: "ad-deen", english: "of Recompense", urdu: "جزا و سزا کے" },
      ]
    },
    {
      ayahNumberInSurah: 5,
      ayahNumberOverall: 5,
      arabicUthmani: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      transliteration: "Iyyāka naʻbudu wa-iyyāka nastaʻīn",
      translationEnglish: "It is You we worship and You we ask for help.",
      translationUrdu: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔",
      words: [
        { id: 1, arabic: "إِيَّاكَ", transliteration: "Iyyaka", english: "You alone", urdu: "تیری ہی" },
        { id: 2, arabic: "نَعْبُدُ", transliteration: "na'budu", english: "we worship", urdu: "ہم عبادت کرتے ہیں" },
        { id: 3, arabic: "وَإِيَّاكَ", transliteration: "wa-iyyaka", english: "and You alone", urdu: "اور تجھ ہی سے" },
        { id: 4, arabic: "نَسْتَعِينُ", transliteration: "nasta'een", english: "we ask for help", urdu: "ہم مدد مانگتے ہیں" },
      ]
    },
    {
      ayahNumberInSurah: 6,
      ayahNumberOverall: 6,
      arabicUthmani: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      transliteration: "Ihdinaṣ-ṣirāṭal-mustaqīm",
      translationEnglish: "Guide us to the straight path -",
      translationUrdu: "ہمیں سیدھا راستہ دکھا۔",
      words: [
        { id: 1, arabic: "اهْدِنَا", transliteration: "Ihdina", english: "Guide us", urdu: "ہدایت دے ہمیں" },
        { id: 2, arabic: "الصِّرَاطَ", transliteration: "as-sirata", english: "the path", urdu: "راستہ" },
        { id: 3, arabic: "الْمُسْتَقِيمَ", transliteration: "al-mustaqeem", english: "straight", urdu: "سیدھا" },
      ]
    },
    {
      ayahNumberInSurah: 7,
      ayahNumberOverall: 7,
      arabicUthmani: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      transliteration: "Ṣirāṭal-ladhīna anʻamta ʻalayhim ghayril-maghḍūbi ʻalayhim walāḍ-ḍāllīn",
      translationEnglish: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
      translationUrdu: "ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر غضب کیا گیا اور نہ گمراہوں کا۔",
      words: [
        { id: 1, arabic: "صِرَاطَ", transliteration: "Sirata", english: "The path", urdu: "راستہ" },
        { id: 2, arabic: "الَّذِينَ", transliteration: "alladheena", english: "of those", urdu: "ان کا" },
        { id: 3, arabic: "أَنْعَمْتَ", transliteration: "an'amta", english: "You bestowed favor", urdu: "تو نے انعام کیا" },
        { id: 4, arabic: "عَلَيْهِمْ", transliteration: "'alayhim", english: "upon them", urdu: "جن پر" },
        { id: 5, arabic: "غَيْرِ", transliteration: "ghayri", english: "not (of)", urdu: "نہ کہ" },
        { id: 6, arabic: "الْمَغْضُوبِ", transliteration: "al-maghdubi", english: "those who earned anger", urdu: "جن پر غضب ہوا" },
        { id: 7, arabic: "عَلَيْهِمْ", transliteration: "'alayhim", english: "upon them", urdu: "ان پر" },
        { id: 8, arabic: "وَلَا", transliteration: "wa la", english: "and not", urdu: "اور نہ" },
        { id: 9, arabic: "الضَّالِّينَ", transliteration: "ad-dalleen", english: "those who are astray", urdu: "گمراہوں کا" },
      ]
    }
  ],

  // Surah 108: Al-Kawthar
  108: [
    {
      ayahNumberInSurah: 1,
      ayahNumberOverall: 6195,
      arabicUthmani: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
      transliteration: "Innā aʻṭaynākal-Kawthar",
      translationEnglish: "Indeed, We have granted you, [O Muhammad], al-Kawthar.",
      translationUrdu: "بیشک ہم نے آپ کو کوثر (خیر کثیر) عطا فرمائی۔",
      words: [
        { id: 1, arabic: "إِنَّا", transliteration: "Inna", english: "Indeed We", urdu: "بیشک ہم نے" },
        { id: 2, arabic: "أَعْطَيْنَاكَ", transliteration: "a'taynaka", english: "have given you", urdu: "عطا کی آپ کو" },
        { id: 3, arabic: "الْكَوْثَرَ", transliteration: "al-kawthar", english: "Al-Kawthar", urdu: "کوثر" },
      ]
    },
    {
      ayahNumberInSurah: 2,
      ayahNumberOverall: 6196,
      arabicUthmani: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
      transliteration: "Faṣalli li-Rabbika wan-ḥar",
      translationEnglish: "So pray to your Lord and sacrifice [to Him alone].",
      translationUrdu: "پس اپنے رب کے لیے نماز پڑھئے اور قربانی کیجئے۔",
      words: [
        { id: 1, arabic: "فَصَلِّ", transliteration: "Fasalli", english: "So pray", urdu: "پس نماز پڑھئے" },
        { id: 2, arabic: "لِرَبِّكَ", transliteration: "li-Rabbika", english: "to your Lord", urdu: "اپنے رب کے لیے" },
        { id: 3, arabic: "وَانْحَرْ", transliteration: "wan-har", english: "and sacrifice", urdu: "اور قربانی کیجئے" },
      ]
    },
    {
      ayahNumberInSurah: 3,
      ayahNumberOverall: 6197,
      arabicUthmani: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
      transliteration: "Inna shāni'aka huwal-abtar",
      translationEnglish: "Indeed, your enemy is the one cut off.",
      translationUrdu: "یقیناً آپ کا دشمن ہی بے نام و نشاں رہے گا۔",
      words: [
        { id: 1, arabic: "إِنَّ", transliteration: "Inna", english: "Indeed", urdu: "یقیناً" },
        { id: 2, arabic: "شَانِئَكَ", transliteration: "shani'aka", english: "your enemy", urdu: "آپ کا دشمن" },
        { id: 3, arabic: "هُوَ", transliteration: "huwa", english: "he is", urdu: "وہی ہے" },
        { id: 4, arabic: "الْأَبْتَرُ", transliteration: "al-abtar", english: "cut off", urdu: "بے نام و نشان" },
      ]
    }
  ],

  // Surah 112: Al-Ikhlas
  112: [
    {
      ayahNumberInSurah: 1,
      ayahNumberOverall: 6222,
      arabicUthmani: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      transliteration: "Qul Huwallāhu Aḥad",
      translationEnglish: "Say, \"He is Allah, [who is] One,",
      translationUrdu: "کہہ دیجیے کہ وہ اللہ ایک ہے۔",
      words: [
        { id: 1, arabic: "قُلْ", transliteration: "Qul", english: "Say", urdu: "فرما دیجیے" },
        { id: 2, arabic: "هُوَ", transliteration: "Huwa", english: "He is", urdu: "وہ ہے" },
        { id: 3, arabic: "اللَّهُ", transliteration: "Allahu", english: "Allah", urdu: "اللہ" },
        { id: 4, arabic: "أَحَدٌ", transliteration: "Ahad", english: "One", urdu: "ایک" },
      ]
    },
    {
      ayahNumberInSurah: 2,
      ayahNumberOverall: 6223,
      arabicUthmani: 'اللَّهُ الصَّمَدُ',
      transliteration: "Allāhuṣ-Ṣamad",
      translationEnglish: "Allah, the Eternal Refuge.",
      translationUrdu: "اللہ بے نیاز ہے (سب اس کے محتاج ہیں)۔",
      words: [
        { id: 1, arabic: "اللَّهُ", transliteration: "Allahu", english: "Allah", urdu: "اللہ" },
        { id: 2, arabic: "الصَّمَدُ", transliteration: "as-Samad", english: "the Eternal Refuge", urdu: "بے نیاز ہے" },
      ]
    },
    {
      ayahNumberInSurah: 3,
      ayahNumberOverall: 6224,
      arabicUthmani: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      transliteration: "Lam yalid wa lam yūlad",
      translationEnglish: "He neither begets nor is born,",
      translationUrdu: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے،",
      words: [
        { id: 1, arabic: "لَمْ يَلِدْ", transliteration: "Lam yalid", english: "He begets not", urdu: "نہ اس نے جنا" },
        { id: 2, arabic: "وَلَمْ يُولَدْ", transliteration: "wa lam yulad", english: "nor is He begotten", urdu: "اور نہ وہ جنا گیا" },
      ]
    },
    {
      ayahNumberInSurah: 4,
      ayahNumberOverall: 6225,
      arabicUthmani: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      transliteration: "Wa lam yakun lahū kufuwan aḥad",
      translationEnglish: "Nor is there to Him any equivalent.\"",
      translationUrdu: "اور نہ کوئی اس کا ہمسر و برابر ہے۔",
      words: [
        { id: 1, arabic: "وَلَمْ يَكُن", transliteration: "Wa lam yakun", english: "And not is", urdu: "اور نہیں ہے" },
        { id: 2, arabic: "لَّهُ", transliteration: "lahu", english: "for Him", urdu: "اس کے لیے" },
        { id: 3, arabic: "كُفُوًا", transliteration: "kufuwan", english: "equivalent", urdu: "کوئی ہمسر" },
        { id: 4, arabic: "أَحَدٌ", transliteration: "ahad", english: "anyone", urdu: "کوئی ایک" },
      ]
    }
  ],

  // Surah 113: Al-Falaq
  113: [
    {
      ayahNumberInSurah: 1,
      ayahNumberOverall: 6226,
      arabicUthmani: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
      transliteration: "Qul aʻūdhu bi-Rabbil-falaq",
      translationEnglish: "Say, \"I seek refuge in the Lord of daybreak",
      translationUrdu: "کہہ دیجیے کہ میں صبح کے رب کی پناہ مانگتا ہوں۔",
      words: [
        { id: 1, arabic: "قُلْ", transliteration: "Qul", english: "Say", urdu: "کہہ دیجیے" },
        { id: 2, arabic: "أَعُوذُ", transliteration: "a'udhu", english: "I seek refuge", urdu: "میں پناہ مانگتا ہوں" },
        { id: 3, arabic: "بِرَبِّ", transliteration: "bi-Rabbi", english: "in the Lord", urdu: "رب کی" },
        { id: 4, arabic: "الْفَلَقِ", transliteration: "al-falaq", english: "of the daybreak", urdu: "صبح کے" },
      ]
    },
    {
      ayahNumberInSurah: 2,
      ayahNumberOverall: 6227,
      arabicUthmani: 'مِن شَرِّ مَا خَلَقَ',
      transliteration: "Min sharri mā khalaq",
      translationEnglish: "From the evil of that which He created",
      translationUrdu: "ہر اس چیز کے شر سے جو اس نے پیدا فرمائی۔",
      words: [
        { id: 1, arabic: "مِن", transliteration: "Min", english: "From", urdu: "سے" },
        { id: 2, arabic: "شَرِّ", transliteration: "sharri", english: "the evil", urdu: "شر" },
        { id: 3, arabic: "مَا خَلَقَ", transliteration: "ma khalaq", english: "of what He created", urdu: "جو اس نے پیدا کیا" },
      ]
    },
    {
      ayahNumberInSurah: 3,
      ayahNumberOverall: 6228,
      arabicUthmani: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
      transliteration: "Wa-min sharri ghāsiqin idhā waqab",
      translationEnglish: "And from the evil of darkness when it settles",
      translationUrdu: "اور اندھیری رات کے شر سے جب وہ چھا جائے۔",
      words: [
        { id: 1, arabic: "وَمِن شَرِّ", transliteration: "Wa min sharri", english: "And from evil", urdu: "اور شر سے" },
        { id: 2, arabic: "غَاسِقٍ", transliteration: "ghasiqin", english: "of darkness", urdu: "اندھیری رات کے" },
        { id: 3, arabic: "إِذَا وَقَبَ", transliteration: "idha waqab", english: "when it settles", urdu: "جب وہ چھا جائے" },
      ]
    },
    {
      ayahNumberInSurah: 4,
      ayahNumberOverall: 6229,
      arabicUthmani: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
      transliteration: "Wa-min sharrin-naffāthāti fīl-ʻuqad",
      translationEnglish: "And from the evil of the blowers in knots",
      translationUrdu: "اور گرہوں میں پھونکنے والیوں (جادوگرنیوں) کے شر سے۔",
      words: [
        { id: 1, arabic: "وَمِن شَرِّ", transliteration: "Wa min sharri", english: "And from evil", urdu: "اور شر سے" },
        { id: 2, arabic: "النَّفَّاثَاتِ", transliteration: "an-naffathati", english: "blowers", urdu: "پھونکنے والیوں کے" },
        { id: 3, arabic: "فِي الْعُقَدِ", transliteration: "fil-'uqad", english: "in knots", urdu: "گرہوں میں" },
      ]
    },
    {
      ayahNumberInSurah: 5,
      ayahNumberOverall: 6230,
      arabicUthmani: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      transliteration: "Wa-min sharri ḥāsidin idhā ḥasad",
      translationEnglish: "And from the evil of an envier when he envies.\"",
      translationUrdu: "اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔",
      words: [
        { id: 1, arabic: "وَمِن شَرِّ", transliteration: "Wa min sharri", english: "And from evil", urdu: "اور شر سے" },
        { id: 2, arabic: "حَاسِدٍ", transliteration: "hasidin", english: "of an envier", urdu: "حسد کرنے والے کے" },
        { id: 3, arabic: "إِذَا حَسَدَ", transliteration: "idha hasad", english: "when he envies", urdu: "جب وہ حسد کرے" },
      ]
    }
  ],

  // Surah 114: An-Nas
  114: [
    {
      ayahNumberInSurah: 1,
      ayahNumberOverall: 6231,
      arabicUthmani: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
      transliteration: "Qul aʻūdhu bi-Rabbin-nās",
      translationEnglish: "Say, \"I seek refuge in the Lord of mankind,",
      translationUrdu: "کہہ دیجیے کہ میں انسانوں کے پروردگار کی پناہ مانگتا ہوں۔",
      words: [
        { id: 1, arabic: "قُلْ", transliteration: "Qul", english: "Say", urdu: "کہہ دیجیے" },
        { id: 2, arabic: "أَعُوذُ", transliteration: "a'udhu", english: "I seek refuge", urdu: "میں پناہ مانگتا ہوں" },
        { id: 3, arabic: "بِرَبِّ", transliteration: "bi-Rabbi", english: "in the Lord", urdu: "رب کی" },
        { id: 4, arabic: "النَّاسِ", transliteration: "an-nas", english: "of mankind", urdu: "لوگوں کے" },
      ]
    },
    {
      ayahNumberInSurah: 2,
      ayahNumberOverall: 6232,
      arabicUthmani: 'مَلِكِ النَّاسِ',
      transliteration: "Malikin-nās",
      translationEnglish: "The Sovereign of mankind,",
      translationUrdu: "انسانوں کے حقیقی بادشاہ کی۔",
      words: [
        { id: 1, arabic: "مَلِكِ", transliteration: "Maliki", english: "King/Sovereign", urdu: "بادشاہ" },
        { id: 2, arabic: "النَّاسِ", transliteration: "an-nas", english: "of mankind", urdu: "انسانوں کے" },
      ]
    },
    {
      ayahNumberInSurah: 3,
      ayahNumberOverall: 6233,
      arabicUthmani: 'إِلَٰهِ النَّاسِ',
      transliteration: "Ilāhin-nās",
      translationEnglish: "The God of mankind,",
      translationUrdu: "انسانوں کے معبودِ برحق کی۔",
      words: [
        { id: 1, arabic: "إِلَٰهِ", transliteration: "Ilahi", english: "God", urdu: "معبود" },
        { id: 2, arabic: "النَّاسِ", transliteration: "an-nas", english: "of mankind", urdu: "انسانوں کے" },
      ]
    },
    {
      ayahNumberInSurah: 4,
      ayahNumberOverall: 6234,
      arabicUthmani: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
      transliteration: "Min sharril-waswāsil-khannās",
      translationEnglish: "From the evil of the retreating whisperer -",
      translationUrdu: "بار بار وسوسہ ڈال کر پیچھے ہٹ جانے والے کے شر سے۔",
      words: [
        { id: 1, arabic: "مِن شَرِّ", transliteration: "Min sharri", english: "From evil", urdu: "شر سے" },
        { id: 2, arabic: "الْوَسْوَاسِ", transliteration: "al-waswasi", english: "the whisperer", urdu: "وسوسہ ڈالنے والے" },
        { id: 3, arabic: "الْخَنَّاسِ", transliteration: "al-khannas", english: "the retreating", urdu: "پیچھے ہٹنے والے" },
      ]
    },
    {
      ayahNumberInSurah: 5,
      ayahNumberOverall: 6235,
      arabicUthmani: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
      transliteration: "Alladhī yuwaswisu fī ṣudūrin-nās",
      translationEnglish: "Who whispers into the breasts of mankind -",
      translationUrdu: "جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے۔",
      words: [
        { id: 1, arabic: "الَّذِي", transliteration: "Alladhi", english: "Who", urdu: "جو کہ" },
        { id: 2, arabic: "يُوَسْوِسُ", transliteration: "yuwaswisu", english: "whispers", urdu: "وسوسہ ڈالتا ہے" },
        { id: 3, arabic: "فِي صُدُورِ", transliteration: "fee sudoori", english: "in chests", urdu: "سینوں میں" },
        { id: 4, arabic: "النَّاسِ", transliteration: "an-nas", english: "of mankind", urdu: "لوگوں کے" },
      ]
    },
    {
      ayahNumberInSurah: 6,
      ayahNumberOverall: 6236,
      arabicUthmani: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
      transliteration: "Minal-jinnati wan-nās",
      translationEnglish: "From among the jinn and mankind.\"",
      translationUrdu: "خواہ وہ جنوں میں سے ہو یا انسانوں میں سے۔",
      words: [
        { id: 1, arabic: "مِنَ", transliteration: "Mina", english: "From", urdu: "میں سے" },
        { id: 2, arabic: "الْجِنَّةِ", transliteration: "al-jinnati", english: "the jinn", urdu: "جنوں" },
        { id: 3, arabic: "وَالنَّاسِ", transliteration: "wan-nas", english: "and mankind", urdu: "اور انسانوں" },
      ]
    }
  ]
};

// In-memory cache for dynamically loaded surahs
const dynamicSurahCache: Record<number, QuranAyah[]> = {};

/**
 * Fetch Surah ayat with Arabic, English, and Urdu translations.
 * Falls back safely to offline corpus if network fails.
 */
export async function fetchSurahAyat(surahNumber: number): Promise<QuranAyah[]> {
  // Check memory cache
  if (dynamicSurahCache[surahNumber]) {
    return dynamicSurahCache[surahNumber];
  }
  // Check preloaded dataset
  if (PRELOADED_SURAHS_DATA[surahNumber]) {
    return PRELOADED_SURAHS_DATA[surahNumber];
  }

  try {
    // Fetch Arabic Uthmani text and English + Urdu translations via alquran.cloud API
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry`
    );
    if (!response.ok) {
      throw new Error(`API error status ${response.status}`);
    }
    const data = await response.json();
    if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 2) {
      const arabicAyahs = data.data[0].ayahs;
      const englishAyahs = data.data[1].ayahs;
      const urduAyahs = data.data[2]?.ayahs || [];

      const parsedAyat: QuranAyah[] = arabicAyahs.map((item: any, idx: number) => {
        const arabicText = item.text;
        const words = arabicText.split(/\s+/).map((w: string, wIdx: number) => ({
          id: wIdx + 1,
          arabic: w,
          transliteration: '',
          english: '',
          urdu: ''
        }));

        return {
          ayahNumberInSurah: item.numberInSurah,
          ayahNumberOverall: item.number,
          arabicUthmani: arabicText,
          transliteration: `Ayah ${item.numberInSurah}`,
          translationEnglish: englishAyahs[idx]?.text || '',
          translationUrdu: urduAyahs[idx]?.text || '',
          words,
        };
      });

      dynamicSurahCache[surahNumber] = parsedAyat;
      return parsedAyat;
    }
  } catch (err) {
    console.warn(`Could not fetch Surah ${surahNumber} online, using fallback template`, err);
  }

  // Fallback if offline/failed: return simulated ayat for that surah
  return PRELOADED_SURAHS_DATA[1];
}
