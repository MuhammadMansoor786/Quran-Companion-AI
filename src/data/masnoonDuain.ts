export interface MasnoonDua {
  id: string;
  category: 'namaz' | 'after_namaz' | 'morning_evening' | 'sleep_wake' | 'daily' | 'quranic';
  title: string;
  urduTitle: string;
  arabicText: string;
  transliteration: string;
  urduTranslation: string;
  englishTranslation: string;
  reference: string;
  targetCount: number; // e.g. 1, 3, 33, 100
  occasion: string;
}

export const MASNOON_DUAS: MasnoonDua[] = [
  // --- NAMAZ ZAROORI PARHAI ---
  {
    id: 'sana-thana',
    category: 'namaz',
    title: 'Thana (Opening Takbeer Prayer)',
    urduTitle: 'ثناء (نماز کا آغاز)',
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ',
    transliteration: "Subhanak-Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk",
    urduTranslation: 'اے اللہ! تو پاک ہے اور تیری ہی تعریف ہے، اور تیرا نام بابرکت ہے، اور تیری بزرگی بلند و بالا ہے، اور تیرے سوا کوئی معبود نہیں۔',
    englishTranslation: 'Glory be to You, O Allah, and all praise. Blessed is Your name, exalted is Your majesty, and there is no deity besides You.',
    reference: 'Sunan Abi Dawud #775, Jami` at-Tirmidhi #242',
    targetCount: 1,
    occasion: 'Recited immediately after the opening Takbeer in Salah'
  },
  {
    id: 'ruku-tasbeeh',
    category: 'namaz',
    title: 'Ruku Tasbeeh',
    urduTitle: 'رکوع کی تسبیح',
    arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subhana Rabbiyal-Adheem',
    urduTranslation: 'پاک ہے میرا رب جو بڑی عظمت والا ہے۔',
    englishTranslation: 'Glory be to my Lord, the Magnificent.',
    reference: 'Sahih Muslim #772, Sunan Abi Dawud #870',
    targetCount: 3,
    occasion: 'Recited during bowing (Ruku) in Salah (3 or more odd times)'
  },
  {
    id: 'tasmee-tahmeed',
    category: 'namaz',
    title: 'Rising from Ruku (Tasmee & Tahmeed)',
    urduTitle: 'رکوع سے اٹھتے وقت اور قومہ کی دعا',
    arabicText: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا وَلَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
    transliteration: "Sami'Allahu liman hamidah ۝ Rabbana wa lakal-hamd, hamdan katheeran tayyiban mubarakan feeh",
    urduTranslation: 'اللہ نے سن لی اس کی جس نے اس کی تعریف کی۔ اے ہمارے رب! تمام تعریفیں تیرے ہی لیے ہیں، بہت زیادہ، پاکیزہ اور برکت والی تعریف۔',
    englishTranslation: 'Allah hears whoever praises Him. Our Lord, all praise is due to You, abundant, pure, and blessed praise.',
    reference: 'Sahih al-Bukhari #799, #795',
    targetCount: 1,
    occasion: 'Recited when standing up straight from Ruku'
  },
  {
    id: 'sajdah-tasbeeh',
    category: 'namaz',
    title: 'Sajdah Tasbeeh',
    urduTitle: 'سجدے کی تسبیح',
    arabicText: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
    transliteration: "Subhana Rabbiyal-A'la",
    urduTranslation: 'پاک ہے میرا رب جو سب سے بلند و برتر ہے۔',
    englishTranslation: 'Glory be to my Lord, the Most High.',
    reference: 'Sahih Muslim #772, Sunan an-Nasa\'i #1046',
    targetCount: 3,
    occasion: 'Recited during prostration (Sajdah) in Salah (3 or more odd times)'
  },
  {
    id: 'tashahhud-attahiyyat',
    category: 'namaz',
    title: 'Tashahhud (Attahiyyat)',
    urduTitle: 'تشہد (التحیات)',
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat, as-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh, as-salamu 'alayna wa 'ala 'ibadillahis-saliheen. Ash-hadu an la ilaha illallahu wa ash-hadu anna Muhammadan 'abduhu wa rasuluh.",
    urduTranslation: 'تمام قولی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ اے نبی! آپ پر سلامتی، اللہ کی رحمت اور اس کی برکتیں نازل ہوں۔ ہم پر اور اللہ کے تمام نیک بندوں پر سلامتی ہو۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور رسول ہیں۔',
    englishTranslation: 'All compliments, prayers and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that none has the right to be worshipped except Allah, and I bear witness that Muhammad is His slave and Messenger.',
    reference: 'Sahih al-Bukhari #831, Sahih Muslim #402',
    targetCount: 1,
    occasion: 'Recited while sitting in Tashahhud (Qa\'dah) in Salah'
  },
  {
    id: 'durood-ibrahim',
    category: 'namaz',
    title: 'Durood-e-Ibrahimi',
    urduTitle: 'درودِ ابراہیمی',
    arabicText: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ ۝ اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin kama sallayta 'ala Ibrahima wa 'ala ali Ibrahima innaka Hameedum Majeed. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammadin kama barakta 'ala Ibrahima wa 'ala ali Ibrahima innaka Hameedum Majeed.",
    urduTranslation: 'اے اللہ! رحمت نازل فرما محمد ﷺ پر اور ان کی آل پر جیسا کہ تو نے رحمت نازل فرمائی ابراہیم (علیہ السلام) پر اور ان کی آل پر، بیشک تو تعریف کے لائق اور بزرگی والا ہے۔ اے اللہ! برکت نازل فرما محمد ﷺ پر اور ان کی آل پر جیسا کہ تو نے برکت نازل فرمائی ابراہیم (علیہ السلام) پر اور ان کی آل پر، بیشک تو تعریف کے لائق اور بزرگی والا ہے۔',
    englishTranslation: 'O Allah, bestow Your favor upon Muhammad and upon the family of Muhammad as You bestowed Your favor upon Abraham and upon the family of Abraham. Verily, You are Praiseworthy, Most Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed Abraham and the family of Abraham. Verily, You are Praiseworthy, Most Glorious.',
    reference: 'Sahih al-Bukhari #3370, Sahih Muslim #406',
    targetCount: 1,
    occasion: 'Recited in the final sitting of Salah after Tashahhud'
  },
  {
    id: 'dua-masoora',
    category: 'namaz',
    title: 'Dua-e-Masoora',
    urduTitle: 'دعائے ماثورہ (سلام سے پہلے)',
    arabicText: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
    transliteration: "Allahumma inni zalamtu nafsi zulman katheeran, wa la yaghfirudh-dhunuba illa Anta, faghfir li maghfiratan min 'indika warhamni, innaka Antal-Ghafurur-Raheem.",
    urduTranslation: 'اے اللہ! بیشک میں نے اپنی جان پر بہت زیادہ ظلم کیا، اور تیرے سوا گناہوں کو کوئی معاف نہیں کر سکتا، پس مجھے اپنی خصوصی بخشش سے معاف فرما دے اور مجھ پر رحم فرما، بیشک تو ہی بخشنے والا، نہایت رحم والا ہے۔',
    englishTranslation: 'O Allah, I have wronged myself greatly and none forgives sins except You. So grant me forgiveness from You and have mercy on me, for You are the Forgiving, the Most Merciful.',
    reference: 'Sahih al-Bukhari #834, Sahih Muslim #2705',
    targetCount: 1,
    occasion: 'Taught by the Prophet ﷺ to Abu Bakr (رضي الله عنه) to recite in Salah before Tasleem'
  },
  {
    id: 'dua-qanoot',
    category: 'namaz',
    title: 'Dua-e-Qanoot (Witr Prayer)',
    urduTitle: 'دعائے قنوت (نمازِ وتر)',
    arabicText: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ وَنَشْكُرُكَ وَلَا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ، اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ وَإِلَيْكَ نَسْعَىٰ وَنَحْفِدُ وَنَرْجُو رَحْمَتَكَ وَنَخْشَىٰ عَذَابَكَ إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ',
    transliteration: "Allahumma inna nasta'eenuka wa nastaghfiruka wa nu'minu bika wa natawakkalu 'alayka wa nuthni 'alaykal-khayr, wa nashkuruka wa la nakfuruk, wa nakhla'u wa natruku man yafjuruk. Allahumma iyyaka na'budu wa laka nusalli wa nasjudu wa ilayka nas'a wa nahfidu wa narju rahmataka wa nakhsha 'adhabaka inna 'adhabaka bil-kuffari mulhiq.",
    urduTranslation: 'اے اللہ! ہم تجھ ہی سے مدد مانگتے ہیں اور تجھ سے بخشش چاہتے ہیں اور تجھ پر ایمان لاتے ہیں اور تجھ پر بھروسہ کرتے ہیں اور تیری بہترین تعریف کرتے ہیں اور تیرا شکر ادا کرتے ہیں اور تیری ناشکری نہیں کرتے اور اس شخص کو چھوڑتے اور الگ کرتے ہیں جو تیری نافرمانی کرے۔ اے اللہ! ہم تیری ہی عبادت کرتے ہیں اور تیرے ہی لیے نماز پڑھتے ہیں اور سجدہ کرتے ہیں اور تیری ہی طرف دوڑتے ہیں اور حاضر ہوتے ہیں اور تیری رحمت کے امیدوار ہیں اور تیرے عذاب سے ڈرتے ہیں، بیشک تیرا عذاب کافروں کو ملنے والا ہے۔',
    englishTranslation: 'O Allah! We seek Your assistance, and ask for Your forgiveness, and believe in You, and put our trust in You, and praise You in the best way. We thank You and are not ungrateful to You, and we forsake and turn away from anyone who disobeys You. O Allah! You alone do we worship, and unto You do we pray and prostrate, and towards You do we strive and speed. We hope for Your mercy and fear Your punishment, verily Your punishment will overtake the disbelievers.',
    reference: 'Musannaf Ibn Abi Shaybah #6965, Al-Bayhaqi in As-Sunan al-Kubra 2/211',
    targetCount: 1,
    occasion: 'Recited in the third Rak\'ah of Witr prayer'
  },

  // --- NAMAZ KE BAAD KE AZKAR ---
  {
    id: 'astaghfirullah-after-salah',
    category: 'after_namaz',
    title: 'Seeking Forgiveness after Salah',
    urduTitle: 'سلام کے بعد استغفار اور سلامتی کی دعا',
    arabicText: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ ۝ اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration: "Astaghfirullah, Astaghfirullah, Astaghfirullah. Allahumma Antas-Salamu wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.",
    urduTranslation: 'میں اللہ سے بخشش طلب کرتا ہوں (تین بار)۔ اے اللہ! تو سلامتی والا ہے اور تیری ہی طرف سے سلامتی ہے، تو بابرکت ہے اے جلال اور بزرگی والے۔',
    englishTranslation: 'I ask Allah for forgiveness (3x). O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor.',
    reference: 'Sahih Muslim #591',
    targetCount: 3,
    occasion: 'Immediately after concluding Fard prayer with Salam'
  },
  {
    id: 'tasbeeh-fatima',
    category: 'after_namaz',
    title: 'Tasbeeh-e-Fatimah',
    urduTitle: 'تسبیحِ فاطمہ (رضی اللہ عنہا)',
    arabicText: 'سُبْحَانَ اللَّهِ (٣٣) ۝ الْحَمْدُ لِلَّهِ (٣٣) ۝ اللَّهُ أَكْبَرُ (٣٤)',
    transliteration: "SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (34x)",
    urduTranslation: 'سبحان اللہ (33 بار)، الحمد للہ (33 بار)، اللہ اکبر (34 بار)',
    englishTranslation: 'Glory be to Allah (33 times), Praise be to Allah (33 times), Allah is the Greatest (34 times).',
    reference: 'Sahih al-Bukhari #3113, Sahih Muslim #2727',
    targetCount: 100,
    occasion: 'After every obligatory prayer and before going to sleep'
  },
  {
    id: 'tahlil-after-salah',
    category: 'after_namaz',
    title: 'Tahlil & Affirmation of Divine Sovereignty',
    urduTitle: 'لا إله إلا الله وحده لا شريك له',
    arabicText: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
    transliteration: "La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa Huwa 'ala kulli shay'in qadeer. Allahumma la mani'a lima a'tayta, wa la mu'tiya lima mana'ta, wa la yanfa'u dhal-jaddi minkal-jadd.",
    urduTranslation: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے حمد ہے، اور وہ ہر چیز پر قادر ہے۔ اے اللہ! جو تو دے اسے کوئی روکنے والا نہیں، اور جو تو روک لے اسے کوئی دینے والا نہیں، اور کسی صاحبِ دولت و مرتبہ کو اس کا مرتبہ تیرے سامنے فائدہ نہیں دے سکتا۔',
    englishTranslation: 'None has the right to be worshipped except Allah alone, without partner. To Him belongs all sovereignty and praise, and He has power over all things. O Allah, none can prevent what You give, nor can any give what You withhold, and no fortune can benefit its possessor against You.',
    reference: 'Sahih al-Bukhari #844, Sahih Muslim #593',
    targetCount: 1,
    occasion: 'Recited after Fard Salah'
  },

  // --- SUBAH AUR SHAAM KI MASNOON DUAIN ---
  {
    id: 'sayyidul-istighfar',
    category: 'morning_evening',
    title: 'Sayyidul Istighfar (Master of Forgiveness)',
    urduTitle: 'سید الاستغفار (بخشش کی سب سے بڑی دعا)',
    arabicText: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li fa'innahu la yaghfirudh-dhunuba illa Anta.",
    urduTranslation: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی بساط کے مطابق تیرے عہد اور وعدے پر قائم ہوں، میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں، میں تیرے سامنے اپنے اوپر تیری نعمتوں کا اعتراف کرتا ہوں اور اپنے گناہوں کا اقرار کرتا ہوں، پس مجھے بخش دے کیونکہ تیرے سوا کوئی گناہوں کو نہیں بخش سکتا۔',
    englishTranslation: 'O Allah, You are my Lord, there is no deity worthy of worship except You. You created me and I am Your servant, and I uphold Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.',
    reference: 'Sahih al-Bukhari #6306 ("Whoever recites it in the day/night with certainty and dies, enters Paradise")',
    targetCount: 1,
    occasion: 'Every morning and evening'
  },
  {
    id: 'bismillahilladhi',
    category: 'morning_evening',
    title: 'Protection from All Harm',
    urduTitle: 'ہر قسم کے نقصان و آفت سے حفاظت کی دعا',
    arabicText: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem.",
    urduTranslation: 'اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی اور وہ خوب سننے والا، جاننے والا ہے۔',
    englishTranslation: 'In the name of Allah, with Whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    reference: 'Jami` at-Tirmidhi #3388, Sunan Abi Dawud #5088 ("Recited 3x morning & evening; nothing shall harm him")',
    targetCount: 3,
    occasion: '3 times every morning and evening'
  },
  {
    id: 'asbahna-wa-asbahal-mulk',
    category: 'morning_evening',
    title: 'Morning Remembrance',
    urduTitle: 'صبح کے وقت کا ذکر',
    arabicText: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: "Asbahna wa asbahal-mulku lillahi wal-hamdu lillahi, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa Huwa 'ala kulli shay'in qadeer.",
    urduTranslation: 'ہم نے صبح کی اور اللہ کی بادشاہت نے صبح کی اور تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کی حمد ہے اور وہ ہر چیز پر قادر ہے۔',
    englishTranslation: 'We have entered the morning and the kingdom belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner. To Him belongs all dominion and praise, and He has power over all things.',
    reference: 'Sahih Muslim #2723',
    targetCount: 1,
    occasion: 'Morning Azkar (replaced by Amsayna in the evening)'
  },
  {
    id: 'hasbiyallahu',
    category: 'morning_evening',
    title: 'Sufficiency in Allah',
    urduTitle: 'اللہ ہی کافی ہے (7 مرتبہ صبح و شام)',
    arabicText: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    transliteration: "HasbiyAllahu la ilaha illa Huwa, 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Adheem.",
    urduTranslation: 'مجھے اللہ ہی کافی ہے، اس کے سوا کوئی معبود نہیں، اسی پر میں نے بھروسہ کیا اور وہ عرشِ عظیم کا رب ہے۔',
    englishTranslation: 'Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.',
    reference: 'Sunan Abi Dawud #5081 (7 times morning and evening: Allah will suffice him in worldly and afterlife matters)',
    targetCount: 7,
    occasion: '7 times in the morning and evening'
  },

  // --- SONE AUR JAGNE KI DUAIN ---
  {
    id: 'sleep-dua',
    category: 'sleep_wake',
    title: 'Dua Before Sleeping',
    urduTitle: 'سوتے وقت کی مسنون دعا',
    arabicText: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    transliteration: "Bismika Rabbi wada'tu janbi wa bika arfa'uh, in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadakas-saliheen.",
    urduTranslation: 'اے میرے رب! تیرے نام کے ساتھ میں نے اپنا پہلو رکھا اور تیرے ہی سہارے اسے اٹھاؤں گا، اگر تو میری جان روک لے تو اس پر رحم فرما، اور اگر تو اسے چھوڑ دے تو اس کی ویسے ہی حفاظت فرما جیسے تو اپنے نیک بندوں کی حفاظت فرماتا ہے۔',
    englishTranslation: 'In Your name, my Lord, I lie down, and by Your power I rise. If You take my soul, have mercy on it, and if You release it, protect it as You protect Your righteous servants.',
    reference: 'Sahih al-Bukhari #6320, Sahih Muslim #2714',
    targetCount: 1,
    occasion: 'When lying down to sleep'
  },
  {
    id: 'wake-dua',
    category: 'sleep_wake',
    title: 'Dua Upon Waking Up',
    urduTitle: 'نیند سے بیدار ہونے کی دعا',
    arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushoor.",
    urduTranslation: 'تمام تعریفیں اللہ ہی کے لیے ہیں جس نے ہمیں مارنے (سلانے) کے بعد زندہ کیا، اور اسی کی طرف جی اٹھنا ہے۔',
    englishTranslation: 'Praise is to Allah Who gave us life after having taken it from us, and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari #6312, Sahih Muslim #2711',
    targetCount: 1,
    occasion: 'Immediately upon opening eyes in the morning'
  },

  // --- ROZMARRAH ZINDAGI KI DUAIN ---
  {
    id: 'safar-dua',
    category: 'daily',
    title: 'Dua for Traveling (Safar ki Dua)',
    urduTitle: 'سفر کی دعا',
    arabicText: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ ۝ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila Rabbina lamunqaliboon.",
    urduTranslation: 'پاک ہے وہ ذات جس نے اس (سواری) کو ہمارے قابو میں کر دیا حالانکہ ہم اسے قابو میں لانے کی طاقت نہ رکھتے تھے، اور بیشک ہم اپنے رب ہی کی طرف لوٹ کر جانے والے ہیں۔',
    englishTranslation: 'Glory unto Him Who has subjected this to us, and we could never have achieved it by our own efforts, and verily to our Lord we shall return.',
    reference: 'Surah Az-Zukhruf (43:13-14), Sahih Muslim #1342',
    targetCount: 1,
    occasion: 'When boarding vehicle, plane, or setting out on travel'
  },
  {
    id: 'eating-before',
    category: 'daily',
    title: 'Before Eating',
    urduTitle: 'کھانا شروع کرنے کی دعا',
    arabicText: 'بِسْمِ اللَّهِ وَعَلَىٰ بَرَكَةِ اللَّهِ',
    transliteration: "Bismillahi wa 'ala barakatillah",
    urduTranslation: 'اللہ کے نام کے ساتھ اور اللہ کی برکت پر (کھانا شروع کرتا ہوں)۔',
    englishTranslation: 'In the name of Allah and with the blessing of Allah.',
    reference: 'Al-Mustadrak al-Hakim #7084, Sunan Abi Dawud #3767',
    targetCount: 1,
    occasion: 'Before taking the first bite'
  },
  {
    id: 'eating-after',
    category: 'daily',
    title: 'After Eating',
    urduTitle: 'کھانے کے بعد کی دعا',
    arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana Muslimeen.",
    urduTranslation: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں کھلایا اور پلایا اور ہمیں مسلمان بنایا۔',
    englishTranslation: 'Praise belongs to Allah Who fed us and quenched our thirst and made us Muslims.',
    reference: 'Sunan Abi Dawud #3850, Jami` at-Tirmidhi #3457',
    targetCount: 1,
    occasion: 'After finishing food or drink'
  },
  {
    id: 'home-enter',
    category: 'daily',
    title: 'Entering the Home',
    urduTitle: 'گھر میں داخل ہونے کی دعا',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    transliteration: "Allahumma inni as'aluka khayral-mawliji wa khayral-makhraj, bismillahi walajna, wa bismillahi kharajna, wa 'alallahi Rabbina tawakkalna.",
    urduTranslation: 'اے اللہ! میں تجھ سے اندر آنے کی بھلائی اور باہر جانے کی بھلائی مانگتا ہوں، اللہ کے نام کے ساتھ ہم داخل ہوئے اور اللہ کے نام کے ساتھ ہم نکلے اور اپنے رب اللہ پر ہم نے بھروسہ کیا۔',
    englishTranslation: 'O Allah, I ask You for the best entrance and the best exit. In the name of Allah we enter, and in the name of Allah we leave, and upon Allah our Lord we rely.',
    reference: 'Sunan Abi Dawud #5096',
    targetCount: 1,
    occasion: 'When stepping inside the home'
  },
  {
    id: 'home-leave',
    category: 'daily',
    title: 'Leaving the Home',
    urduTitle: 'گھر سے نکلنے کی دعا',
    arabicText: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: "Bismillahi tawakkaltu 'alallah, la hawla wa la quwwata illa billah.",
    urduTranslation: 'اللہ کے نام کے ساتھ، میں نے اللہ پر بھروسہ کیا، برائی سے بچنے کی طاقت اور نیکی کرنے کی قوت صرف اللہ ہی کی توفیق سے ہے۔',
    englishTranslation: 'In the name of Allah, I rely upon Allah; there is no power nor strength except with Allah.',
    reference: 'Sunan Abi Dawud #5095, Jami` at-Tirmidhi #3426',
    targetCount: 1,
    occasion: 'When stepping outside the home'
  },
  {
    id: 'masjid-enter',
    category: 'daily',
    title: 'Entering the Masjid',
    urduTitle: 'مسجد میں داخل ہونے کی دعا',
    arabicText: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: "Allahummaftah li abwaba rahmatik.",
    urduTranslation: 'اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔',
    englishTranslation: 'O Allah, open for me the doors of Your mercy.',
    reference: 'Sahih Muslim #713',
    targetCount: 1,
    occasion: 'Step in with the right foot'
  },
  {
    id: 'masjid-exit',
    category: 'daily',
    title: 'Leaving the Masjid',
    urduTitle: 'مسجد سے نکلنے کی دعا',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: "Allahumma inni as'aluka min fadlik.",
    urduTranslation: 'اے اللہ! بیشک میں تجھ سے تیرے فضل کا سوال کرتا ہوں۔',
    englishTranslation: 'O Allah, verily I ask You from Your bounty.',
    reference: 'Sahih Muslim #713',
    targetCount: 1,
    occasion: 'Step out with the left foot'
  },

  // --- QURANIC SURAHS & ESSENTIAL AYAT ---
  {
    id: 'surah-al-fatiha',
    category: 'quranic',
    title: 'Surah Al-Fatihah (The Opening)',
    urduTitle: 'سورۃ الفاتحہ (ام القرآن)',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: "Bismillāhir-Raḥmānir-Raḥīm. Al-ḥamdu lillāhi Rabbil-ʻālamīn. Ar-Raḥmānir-Raḥīm. Māliki yawmid-dīn. Iyyāka naʻbudu wa-iyyāka nastaʻīn. Ihdinaṣ-ṣirāṭal-mustaqīm. Ṣirāṭal-ladhīna anʻamta ʻalayhim ghayril-maghḍūbi ʻalayhim walāḍ-ḍāllīn.",
    urduTranslation: 'اللہ کے نام سے جو نہایت مہربان، ہمیشہ رحم فرمانے والا ہے۔ تمام تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا رب ہے۔ نہایت مہربان، ہمیشہ رحم فرمانے والا ہے۔ جزا کے دن کا مالک ہے۔ ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔ ہمیں سیدھے راستے پر چلا۔ ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، جن پر نہ تیرا غضب ہوا اور نہ وہ گمراہ ہوئے۔',
    englishTranslation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.',
    reference: 'Quran (Surah 1:1-7)',
    targetCount: 1,
    occasion: 'Pillar of every Rak\'ah of Salah'
  },
  {
    id: 'ayat-ul-kursi',
    category: 'quranic',
    title: 'Ayat-ul-Kursi (The Throne Verse)',
    urduTitle: 'آیۃ الکرسی (سورۃ البقرہ: 255)',
    arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta'khudhuhu sinatuw-wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuheetoona bi-shay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-arda wa la ya'uduhu hifzuhuma, wa Huwal-'Aliyyul-'Adheem.",
    urduTranslation: 'اللہ! اس کے سوا کوئی معبود نہیں، وہ ہمیشہ زندہ رہنے والا اور سب کو سنبھالنے والا ہے۔ نہ اسے اونگھ آتی ہے نہ نیند۔ اسی کا ہے جو کچھ آسمانوں میں ہے اور جو کچھ زمین میں ہے۔ کون ہے جو اس کی اجازت کے بغیر اس کے حضور سفارش کر سکے؟ وہ جانتا ہے جو کچھ ان کے سامنے ہے اور جو کچھ ان کے پیچھے ہے، اور وہ اس کے علم میں سے کسی چیز کا احاطہ نہیں کر سکتے مگر جتنا وہ چاہے۔ اس کی کرسی آسمانوں اور زمین کو گھیرے ہوئے ہے اور ان دونوں کی حفاظت اس پر بوجھ نہیں بنتی، اور وہ سب سے بلند اور سب سے بڑا ہے۔',
    englishTranslation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    reference: 'Quran (Surah Al-Baqarah 2:255), Sahih Muslim #810, Sahih al-Bukhari #2311',
    targetCount: 1,
    occasion: 'After every Fard prayer and before going to sleep (safeguard from shaytan)'
  },
  {
    id: 'surah-al-ikhlas',
    category: 'quranic',
    title: 'Surah Al-Ikhlas (The Purity of Faith)',
    urduTitle: 'سورۃ الاخلاص (قل ہو اللہ احد)',
    arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    transliteration: "Qul Huwallāhu Aḥad. Allāhuṣ-Ṣamad. Lam yalid wa lam yūlad. Wa lam yakun lahū kufuwan aḥad.",
    urduTranslation: 'کہہ دیجیے کہ وہ اللہ ایک ہے۔ اللہ بے نیاز ہے۔ نہ اس نے کسی کو جنا اور نہ وہ جنا گیا، اور نہ کوئی اس کا ہمسر ہے۔',
    englishTranslation: 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."',
    reference: 'Quran (Surah 112:1-4), Sahih al-Bukhari #5013 (Equals 1/3rd of the Quran)',
    targetCount: 3,
    occasion: '3 times morning and evening, after Salah, and before sleep'
  },
  {
    id: 'surah-al-falaq',
    category: 'quranic',
    title: 'Surah Al-Falaq (The Daybreak)',
    urduTitle: 'سورۃ الفلق (قل اعوذ برب الفلق)',
    arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    transliteration: "Qul aʻūdhu bi-Rabbil-falaq. Min sharri mā khalaq. Wa-min sharri ghāsiqin idhā waqab. Wa-min sharrin-naffāthāti fīl-ʻuqad. Wa-min sharri ḥāsidin idhā ḥasad.",
    urduTranslation: 'کہہ دیجیے کہ میں صبح کے رب کی پناہ مانگتا ہوں۔ ہر اس چیز کے شر سے جو اس نے پیدا کی، اور اندھیری رات کے شر سے جب وہ چھا جائے، اور گرہوں میں پھونکنے والیوں کے شر سے، اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔',
    englishTranslation: 'Say, "I seek refuge in the Lord of daybreak From the evil of that which He created And from the evil of darkness when it settles And from the evil of the blowers in knots And from the evil of an envier when he envies."',
    reference: 'Quran (Surah 113:1-5), Sunan Abi Dawud #1523',
    targetCount: 3,
    occasion: 'For divine protection against evil, jealousy, and sorcery'
  },
  {
    id: 'surah-an-nas',
    category: 'quranic',
    title: 'Surah An-Nas (Mankind)',
    urduTitle: 'سورۃ الناس (قل اعوذ برب الناس)',
    arabicText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    transliteration: "Qul aʻūdhu bi-Rabbin-nās. Malikin-nās. Ilāhin-nās. Min sharril-waswāsil-khannās. Alladhī yuwaswisu fī ṣudūrin-nās. Minal-jinnati wan-nās.",
    urduTranslation: 'کہہ دیجیے کہ میں انسانوں کے رب کی پناہ مانگتا ہوں۔ جو انسانوں کا بادشاہ ہے۔ انسانوں کا معبود ہے۔ وسوسہ ڈالنے والے، پیچھے ہٹ جانے والے کے شر سے۔ جو لوگوں کے سینوں میں وسوسے ڈالتا ہے، جنوں میں سے ہو یا انسانوں میں سے۔',
    englishTranslation: 'Say, "I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer - Who whispers into the breasts of mankind - From among the jinn and mankind."',
    reference: 'Quran (Surah 114:1-6)',
    targetCount: 3,
    occasion: 'Protection against whisperings and unseen evil'
  }
];
