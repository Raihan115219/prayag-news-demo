/* ==================================================================
   seed-data.js — DEMONSTRATION CONTENT ONLY.
   Every article below is fictional sample copy written for the client
   demo. Names, figures and quotes are invented and are not real news.
   Photos are free Unsplash images, hot-linked at reduced size.
   ================================================================== */

const U = (id) => `https://images.unsplash.com/photo-${id}`;

const REPORTERS = {
  ankit: { author: 'Ankit Srivastava', authorEmail: 'reporter@prayagnews.demo' },
  neha: { author: 'Neha Tripathi', authorEmail: 'neha.tripathi@prayagnews.demo' },
  faizan: { author: 'Mohd. Faizan Ali', authorEmail: 'faizan.ali@prayagnews.demo' },
  ritu: { author: 'Ritu Kesarwani', authorEmail: 'ritu.kesarwani@prayagnews.demo' },
  saurabh: { author: 'Saurabh Pandey', authorEmail: 'saurabh.pandey@prayagnews.demo' },
  priya: { author: 'Priya Yadav', authorEmail: 'priya.yadav@prayagnews.demo' },
};

const p = (...paras) => paras.map((t) => (t.startsWith('<') ? t : `<p>${t}</p>`)).join('');

/* h = hours before seeding the article was published (or submitted). */
const SEED = [
  /* ------------------------------ PRAYAGRAJ ------------------------------ */
  {
    id: 'article-001', by: 'ankit', h: 2, category: 'Prayagraj', isTopStory: true,
    title: 'माघ मेले की तैयारी तेज़: संगम क्षेत्र में पांटून पुलों का काम अंतिम चरण में',
    subtitle: 'मेला प्रशासन के अनुसार इस बार श्रद्धालुओं की सुविधा के लिए अतिरिक्त घाट, चेंजिंग रूम और खोया-पाया केंद्र बनाए जा रहे हैं।',
    location: 'संगम, प्रयागराज', image: U('1742316963892-2b6fee25dfc5'),
    body: p(
      'संगम तट पर माघ मेले की तैयारियां अब अंतिम चरण में पहुंच गई हैं। मेला क्षेत्र को जोड़ने वाले पांटून पुलों पर लोहे की चादरें बिछाने का काम तेज़ी से चल रहा है और अधिकारियों का कहना है कि अगले दस दिनों में सभी पुल आवागमन के लिए खोल दिए जाएंगे।',
      'मेला प्रशासन के एक अधिकारी ने बताया कि इस बार भीड़ प्रबंधन पर विशेष ध्यान दिया जा रहा है। प्रमुख स्नान पर्वों के दिन आने और जाने के लिए अलग-अलग पुल तय किए जाएंगे, ताकि किसी एक मार्ग पर दबाव न बढ़े।',
      '<h2>घाटों पर नई सुविधाएं</h2>',
      'घाटों पर महिलाओं के लिए अतिरिक्त चेंजिंग रूम, पीने के पानी के स्टैंड और प्राथमिक चिकित्सा शिविर लगाए जा रहे हैं। बुज़ुर्ग श्रद्धालुओं के लिए ई-रिक्शा की निःशुल्क सेवा पर भी विचार किया जा रहा है।',
      '<blockquote>“हमारा लक्ष्य है कि हर श्रद्धालु सुरक्षित स्नान करे और बिना परेशानी घर लौटे।” — मेला प्रशासन (डेमो उद्धरण)</blockquote>',
      'खोया-पाया केंद्रों को इस बार डिजिटल डिस्प्ले बोर्ड से जोड़ा जाएगा, जिससे बिछड़े लोगों की जानकारी पूरे मेला क्षेत्र में एक साथ दिखाई दे सकेगी। स्थानीय नाविकों और स्वयंसेवी संगठनों के साथ भी समन्वय बैठकें की जा रही हैं।',
    ),
  },
  {
    id: 'article-002', by: 'neha', h: 4, category: 'Prayagraj', isFeatured: true,
    title: 'Sangam Boat Operators to Get Mandatory Life-Jacket Kits Before Winter Rush',
    subtitle: 'A new safety drive will cover registered boats operating between Qila Ghat and Arail, with spot checks planned on bathing days.',
    location: 'Qila Ghat, Prayagraj', image: U('1645344273898-7fd1e33803c2'),
    body: p(
      'Every registered boat ferrying pilgrims at the Sangam will have to carry a full set of life jackets before the winter bathing season begins, under a safety drive announced by district officials this week.',
      'Boat operators will receive kits at subsidised rates through their local associations, and each boat will be marked with a numbered sticker once it passes inspection. Officials said teams from the water police would carry out spot checks on major bathing days.',
      '<h2>What changes for passengers</h2>',
      '<ul><li>Every passenger must wear a life jacket for the full ride.</li><li>Fares and the maximum number of passengers will be displayed on each boat.</li><li>A helpline number will be painted on the side of every registered boat.</li></ul>',
      'Several boatmen welcomed the move but asked for help with storage space at the ghats. “We want our passengers to feel safe — that is good for our business too,” said one operator who has worked at Qila Ghat for two decades.',
    ),
  },
  {
    id: 'article-003', by: 'ritu', h: 9, category: 'Prayagraj',
    title: 'नैनी पुल पर नई एलईडी लाइटिंग, रात में आवागमन होगा और सुरक्षित',
    subtitle: 'पुराने बल्बों की जगह ऊर्जा-कुशल एलईडी लगाए गए, बिजली की खपत में बड़ी कमी का अनुमान।',
    location: 'नैनी, प्रयागराज', image: U('1742316963440-88d2bc1c7b2e'),
    body: p(
      'यमुना पर बने पुल पर अब रात के समय पहले से कहीं ज़्यादा रोशनी दिखाई देगी। नगर निगम ने पुराने सोडियम बल्बों को हटाकर ऊर्जा-कुशल एलईडी लाइटें लगाने का काम पूरा कर लिया है।',
      'अधिकारियों के अनुसार नई लाइटों से बिजली की खपत में लगभग आधी कमी आएगी। साथ ही दोपहिया वाहन चालकों और पैदल चलने वालों के लिए रात का सफ़र अधिक सुरक्षित होगा।',
      'स्थानीय निवासियों ने बताया कि पहले कई हिस्सों में अंधेरा रहने से दुर्घटनाओं का डर बना रहता था। अब पुल की सजावटी रोशनी शहर की एक नई पहचान भी बन रही है और शाम को लोग तस्वीरें लेने पहुंच रहे हैं।',
    ),
  },
  {
    id: 'article-004', by: 'ankit', h: 20, category: 'Prayagraj', isFeatured: true,
    title: 'Civil Lines Gets a Pedestrian-First Makeover with Wider Footpaths and Seating',
    subtitle: 'The first phase of the redesign adds shaded seating, raised crossings and a no-parking stretch near the main market.',
    location: 'Civil Lines, Prayagraj', image: U('1742316963396-165fc4ee1bd1'),
    body: p(
      'Shoppers in Civil Lines will soon find it easier to walk between the main market and the bus stand, as the first phase of a pedestrian-first redesign nears completion.',
      'Footpaths along the central stretch have been widened, broken paving has been replaced and raised zebra crossings have been added at three busy junctions. Benches with shade are being installed outside the market, along with new dustbins and signage in Hindi and English.',
      '<blockquote>“If people can walk comfortably, they stay longer and shop more,” said a member of the local traders’ association.</blockquote>',
      'A no-parking stretch near the market gate will be enforced from next month. Officials said two-wheeler parking would shift to a designated lot behind the main road, and the change would be reviewed after a month based on feedback from residents and shopkeepers.',
    ),
  },
  {
    id: 'article-005', by: 'priya', h: 30, category: 'Prayagraj',
    title: 'घाटों पर स्वच्छता अभियान: रविवार को 500 से अधिक स्वयंसेवकों ने की सफ़ाई',
    subtitle: 'छात्रों, नाविकों और स्थानीय संस्थाओं ने मिलकर दारागंज से अरैल तक प्लास्टिक कचरा हटाया।',
    location: 'दारागंज, प्रयागराज', image: U('1743332509532-f4c6a854f3c9'),
    body: p(
      'रविवार सुबह घाटों पर एक अलग ही नज़ारा देखने को मिला। कॉलेज के छात्रों, नाविकों और स्थानीय सामाजिक संस्थाओं के 500 से अधिक स्वयंसेवकों ने मिलकर दारागंज से अरैल तक सफ़ाई अभियान चलाया।',
      'अभियान के दौरान प्लास्टिक की बोतलें, पॉलीथीन और पूजा सामग्री के अवशेष अलग-अलग इकट्ठा किए गए। आयोजकों ने बताया कि फूल-मालाओं से जैविक खाद बनाने की योजना भी तैयार की जा रही है।',
      'आयोजन से जुड़ी एक छात्रा ने कहा, “गंगा हमारी पहचान है। अगर हर मोहल्ला महीने में एक दिन दे, तो घाट हमेशा साफ़ रह सकते हैं।” अगला अभियान अगले महीने के पहले रविवार को प्रस्तावित है।',
    ),
  },
  {
    id: 'article-006', by: 'saurabh', h: 50, category: 'Prayagraj',
    title: "City's Oldest Public Library Begins Digitising Rare Hindi Manuscripts",
    subtitle: 'Volunteers and archivists will scan fragile pages over the next year so students can read them online.',
    location: 'Prayagraj', image: U('1585484173186-5f2df1a5ef34'),
    body: p(
      'One of the city’s oldest public libraries has started digitising its collection of rare Hindi manuscripts and early printed books, some of them more than a century old.',
      'A small team of archivists, helped by student volunteers, is photographing each page in a controlled-light room. The scans will be catalogued and made available on a public website, so that researchers no longer need to handle the fragile originals.',
      'Library staff said the first batch would include literary magazines, handwritten letters and local history records. Readers will be able to request scans of specific titles through the library’s front desk.',
    ),
  },
  {
    id: 'article-007', by: 'neha', h: 70, category: 'Prayagraj',
    title: 'संगम के नाविकों ने बनाई सहकारी समिति, बीमा और प्रशिक्षण की मिलेगी सुविधा',
    subtitle: 'समिति के ज़रिए नाविक परिवारों को दुर्घटना बीमा, तैराकी प्रशिक्षण और नाव मरम्मत के लिए आसान ऋण मिलेगा।',
    location: 'संगम, प्रयागराज', image: U('1601750059072-b0faf504853e'),
    body: p(
      'संगम पर नाव चलाने वाले परिवारों ने अपनी आजीविका को सुरक्षित बनाने के लिए एक सहकारी समिति का गठन किया है। समिति में फ़िलहाल 300 से अधिक नाविक जुड़ चुके हैं।',
      'समिति के पदाधिकारियों ने बताया कि सदस्यों को दुर्घटना बीमा, तैराकी और प्राथमिक उपचार का प्रशिक्षण और नाव मरम्मत के लिए कम ब्याज पर ऋण दिलाने की व्यवस्था की जाएगी।',
      'एक बुज़ुर्ग नाविक ने कहा कि मेले के दिनों को छोड़कर साल भर की कमाई अनिश्चित रहती है, ऐसे में सामूहिक प्रयास से परिवारों को स्थिरता मिलेगी।',
    ),
  },
  {
    id: 'article-008', by: 'priya', h: 26, category: 'Prayagraj',
    title: 'Board Exam Prep: Government Schools Start Free Weekend Doubt-Clearing Classes',
    subtitle: 'Senior teachers will run Saturday sessions in maths, science and English for Class 10 and 12 students.',
    location: 'Prayagraj', image: U('1709290749293-c6152a187b14'),
    body: p(
      'Students preparing for board exams in government schools across the district can now attend free weekend sessions to clear doubts in their toughest subjects.',
      'The classes, run by senior subject teachers on Saturdays, will focus on maths, science and English. Each session ends with a short practice test, and students who miss a class can collect printed notes from their school office.',
      'Teachers said the idea came from students themselves, many of whom cannot afford private coaching. Attendance on the first weekend crossed expectations at several centres, and organisers are now planning to add Hindi and social science.',
    ),
  },

  /* ---------------------------- UTTAR PRADESH ---------------------------- */
  {
    id: 'article-010', by: 'saurabh', h: 6, category: 'Uttar Pradesh',
    title: 'लखनऊ में युवाओं के लिए नए कौशल विकास केंद्र, पहले बैच में 600 सीटें',
    subtitle: 'इलेक्ट्रिशियन, मोबाइल रिपेयरिंग, डेटा एंट्री और नर्सिंग असिस्टेंट जैसे कोर्स में मुफ़्त प्रशिक्षण।',
    location: 'लखनऊ', image: U('1688287580970-70fe8e0f4bef'),
    body: p(
      'राजधानी लखनऊ में युवाओं के लिए नए कौशल विकास केंद्रों की शुरुआत की गई है। पहले बैच में 600 सीटों पर दाख़िले होंगे और प्रशिक्षण पूरी तरह निःशुल्क रहेगा।',
      'केंद्रों पर इलेक्ट्रिशियन, मोबाइल रिपेयरिंग, डेटा एंट्री, सिलाई और नर्सिंग असिस्टेंट जैसे व्यावहारिक कोर्स चलाए जाएंगे। कोर्स पूरा करने वाले प्रशिक्षुओं को स्थानीय उद्योगों में इंटर्नशिप दिलाने की भी योजना है।',
      'अधिकारियों ने बताया कि सफल रहने पर इसी मॉडल को प्रयागराज, कानपुर और वाराणसी जैसे शहरों में भी लागू किया जा सकता है।',
    ),
  },
  {
    id: 'article-011', by: 'ritu', h: 28, category: 'Uttar Pradesh',
    title: 'Heritage Walk Circuit Proposed to Link Old Lucknow Monuments',
    subtitle: 'The plan includes signboards, trained local guides and a single ticket covering multiple sites.',
    location: 'Lucknow', image: U('1770915252472-71c8b2c16d10'),
    body: p(
      'A heritage walking circuit connecting several historic monuments in old Lucknow has been proposed by the state tourism department, aiming to keep visitors in the city for longer.',
      'The draft plan includes illustrated signboards, trained local guides from nearby neighbourhoods and a single ticket that covers multiple sites. Food stalls serving local dishes would be set up at designated points along the route.',
      'Heritage enthusiasts welcomed the idea but stressed that conservation work must come before crowds. The department said a public consultation would be held before the final route is announced.',
    ),
  },
  {
    id: 'article-012', by: 'ankit', h: 45, category: 'Uttar Pradesh',
    title: 'New Expressway Link Expected to Cut Prayagraj–Lucknow Travel Time',
    subtitle: 'Planners say the proposed connector could bring the journey under three hours once complete.',
    location: 'Prayagraj', image: U('1708357997379-e55c1636e0d7'),
    body: p(
      'Daily commuters between Prayagraj and Lucknow could save more than an hour on each trip if a proposed expressway connector is built as planned, according to a feasibility note reviewed by Prayag News.',
      'The connector would link the city’s outer ring road with an existing expressway, bypassing several congested market towns. Planners estimate the journey could come down to under three hours.',
      'Transport operators said faster connectivity would help students, patients travelling for treatment and traders. Land surveys are expected to begin after the detailed project report is approved.',
    ),
  },
  {
    id: 'article-013', by: 'faizan', h: 12, category: 'Uttar Pradesh', isFeatured: true,
    title: 'प्रदेश के 20 रेलवे स्टेशनों पर यात्री सुविधाओं का विस्तार, नए वेटिंग हॉल बनेंगे',
    subtitle: 'डिजिटल डिस्प्ले बोर्ड, स्वच्छ शौचालय, दिव्यांगजनों के लिए रैंप और बेहतर पेयजल व्यवस्था पर ज़ोर।',
    location: 'उत्तर प्रदेश', image: U('1639494095806-1680b909cb33'),
    body: p(
      'प्रदेश के 20 प्रमुख रेलवे स्टेशनों पर यात्री सुविधाओं के विस्तार का काम शुरू होने जा रहा है। इनमें प्रयागराज, कानपुर, गोरखपुर और झांसी जैसे बड़े स्टेशन शामिल हैं।',
      'योजना के तहत नए वातानुकूलित वेटिंग हॉल, प्लेटफ़ॉर्म पर डिजिटल डिस्प्ले बोर्ड, स्वच्छ शौचालय और दिव्यांगजनों के लिए रैंप बनाए जाएंगे। पेयजल के लिए नए वॉटर एटीएम भी लगाए जाएंगे।',
      'रेलवे अधिकारियों के अनुसार काम इस तरह किया जाएगा कि ट्रेनों के संचालन और यात्रियों की आवाजाही पर कम से कम असर पड़े।',
    ),
  },

  /* ------------------------------- NATIONAL ------------------------------ */
  {
    id: 'article-020', by: 'saurabh', h: 8, category: 'National',
    title: 'Pilot for Unified Digital Health Records to Cover 50 Districts',
    subtitle: 'Patients would be able to carry prescriptions and test reports between government hospitals with a single ID.',
    location: 'New Delhi', image: U('1710074213374-e68503a1b795'),
    body: p(
      'A pilot programme for unified digital health records is set to cover 50 districts in its first phase, allowing patients to carry prescriptions and test reports between government hospitals using a single health ID.',
      'Doctors participating in the pilot said a shared record could save time in emergencies and reduce repeated tests. Patients will need to give consent before any hospital can view their history.',
      'Privacy experts have asked for clear rules on who can access the data and for how long. Officials said the pilot would be reviewed after six months before any wider rollout.',
    ),
  },
  {
    id: 'article-021', by: 'faizan', h: 16, category: 'National',
    title: 'त्योहारी सीज़न में चलेंगी अतिरिक्त ट्रेनें, पूर्वांचल के यात्रियों को राहत',
    subtitle: 'दिल्ली, मुंबई और कोलकाता से पूर्वांचल की ओर आने वाले रूटों पर विशेष ट्रेनों के फेरे बढ़ाए गए।',
    location: 'नई दिल्ली', image: U('1637995735729-c43250f1ef47'),
    body: p(
      'त्योहारी सीज़न में घर लौटने वाले यात्रियों की भीड़ को देखते हुए कई रूटों पर अतिरिक्त ट्रेनें चलाने का निर्णय लिया गया है। इसका सबसे ज़्यादा फ़ायदा पूर्वांचल और बिहार की ओर जाने वाले यात्रियों को मिलेगा।',
      'दिल्ली, मुंबई और कोलकाता से आने वाली विशेष ट्रेनों के फेरे बढ़ाए गए हैं। प्रयागराज होकर गुज़रने वाली कई ट्रेनों में अतिरिक्त सामान्य डिब्बे भी जोड़े जाएंगे।',
      'यात्रियों से अपील की गई है कि वे टिकट केवल अधिकृत माध्यमों से ही बुक करें और स्टेशन पर समय से पहुंचें।',
    ),
  },
  {
    id: 'article-022', by: 'ritu', h: 40, category: 'National',
    title: 'States Asked to Submit Flood-Preparedness Plans Ahead of Next Monsoon',
    subtitle: 'Early planning is meant to speed up embankment repairs and the stocking of relief material.',
    location: 'New Delhi', image: U('1760872645826-ff7a32cd59bf'),
    body: p(
      'States have been asked to submit detailed flood-preparedness plans well ahead of the next monsoon, so that embankment repairs and the stocking of relief material can start earlier than usual.',
      'The plans are expected to list vulnerable villages, evacuation routes, shelter locations and the status of drainage channels. Districts along major rivers have been asked to run mock drills before the rains.',
      'Disaster-management experts said earlier planning could make a real difference in river towns such as Prayagraj, where low-lying neighbourhoods are affected almost every year.',
    ),
  },

  /* ------------------------------- POLITICS ------------------------------ */
  {
    id: 'article-030', by: 'ankit', h: 10, category: 'Politics',
    title: 'नगर निगम की बैठक में सड़क और जलभराव के मुद्दे छाए, पार्षदों ने मांगी समय-सीमा',
    subtitle: 'कई वार्डों के पार्षदों ने अधूरे नाला निर्माण और टूटी सड़कों पर अधिकारियों से जवाब मांगा।',
    location: 'प्रयागराज', image: U('1643173880819-442db8808fd3'),
    body: p(
      'नगर निगम की मासिक बैठक में इस बार सड़क और जलभराव के मुद्दे सबसे ज़्यादा चर्चा में रहे। कई वार्डों के पार्षदों ने अधूरे नाला निर्माण और टूटी सड़कों को लेकर अधिकारियों से स्पष्ट समय-सीमा मांगी।',
      'पार्षदों का कहना था कि बरसात के बाद से कई मोहल्लों में सड़कें चलने लायक नहीं बची हैं। अधिकारियों ने आश्वासन दिया कि प्राथमिकता वाली सड़कों की मरम्मत अगले महीने तक शुरू कर दी जाएगी।',
      'बैठक में यह भी तय हुआ कि हर वार्ड में शिकायतों की स्थिति ऑनलाइन दिखाने की व्यवस्था पर विचार किया जाएगा, ताकि नागरिक काम की प्रगति ख़ुद देख सकें।',
    ),
  },
  {
    id: 'article-031', by: 'neha', h: 34, category: 'Politics',
    title: 'Councillors Push for Ward-Level Grievance Desks Ahead of Budget Session',
    subtitle: 'A cross-party group wants a staffed desk in every ward office to log and track civic complaints.',
    location: 'Prayagraj', image: U('1775879983930-44ac90a162da'),
    body: p(
      'A cross-party group of councillors has proposed that every ward office get a staffed grievance desk, ahead of the municipal budget session later this month.',
      'Under the proposal, each complaint about water supply, sanitation, streetlights or roads would receive a tracking number by SMS. Residents could then follow its status without visiting the office again.',
      'Supporters said the desks would cost little compared with the time citizens lose chasing complaints. The proposal will be tabled for discussion during the budget session.',
    ),
  },
  {
    id: 'article-032', by: 'priya', h: 60, category: 'Politics',
    title: 'युवा मतदाता जागरूकता रैली में हज़ारों छात्रों ने लिया हिस्सा',
    subtitle: 'पहली बार वोट डालने वाले युवाओं को मतदाता पहचान पत्र बनवाने की प्रक्रिया की जानकारी दी गई।',
    location: 'प्रयागराज', image: U('1695042849689-f682ec337576'),
    body: p(
      'शहर में आयोजित युवा मतदाता जागरूकता रैली में विभिन्न कॉलेजों के हज़ारों छात्रों ने हिस्सा लिया। रैली का उद्देश्य पहली बार वोट डालने वाले युवाओं को मतदान के महत्व के बारे में जागरूक करना था।',
      'रैली के समापन पर लगे शिविर में छात्रों को मतदाता पहचान पत्र बनवाने और सूची में नाम जांचने की प्रक्रिया समझाई गई। कई छात्रों ने मौके पर ही ऑनलाइन आवेदन भी किया।',
    ),
  },

  /* -------------------------------- CRIME -------------------------------- */
  {
    id: 'article-040', by: 'faizan', h: 5, category: 'Crime',
    title: 'Cyber Cell Busts Fake Job Racket That Targeted Students Across Prayagraj',
    subtitle: 'Police say the gang collected “registration fees” through messaging apps by promising work-from-home jobs.',
    location: 'Prayagraj', image: U('1557081999-0ea3e23579d2'),
    body: p(
      'The district cyber cell has busted a racket that allegedly duped students with fake work-from-home job offers, collecting small “registration fees” from hundreds of applicants through messaging apps.',
      'According to police, the gang posted attractive job adverts on social media and asked applicants to pay for training material and ID verification. Once paid, the numbers would stop responding.',
      '<h2>How to stay safe</h2>',
      '<ul><li>No genuine employer asks for money to offer you a job.</li><li>Verify the company’s address and website before sharing documents.</li><li>Report suspicious offers on the national cyber-crime helpline 1930.</li></ul>',
      'Police said further investigation was under way to identify more victims and trace the money trail.',
    ),
  },
  {
    id: 'article-041', by: 'ritu', h: 22, category: 'Crime',
    title: 'चेन स्नैचिंग पर लगाम के लिए शहर में रात्रि गश्त बढ़ी, 12 नई पिंक बूथ टीमें तैनात',
    subtitle: 'बाज़ारों, कोचिंग क्षेत्रों और पार्कों के आसपास महिला पुलिसकर्मियों की विशेष टीमें शाम से देर रात तक रहेंगी तैनात।',
    location: 'प्रयागराज', image: U('1589820745206-c6b6d3602361'),
    body: p(
      'शहर में हाल के दिनों में चेन स्नैचिंग की घटनाओं को देखते हुए पुलिस ने रात्रि गश्त बढ़ा दी है। बाज़ारों, कोचिंग क्षेत्रों और पार्कों के आसपास 12 नई पिंक बूथ टीमें तैनात की गई हैं।',
      'पुलिस अधिकारियों ने बताया कि हर टीम के पास दोपहिया वाहन और वायरलेस सेट रहेगा। संवेदनशील स्थानों पर सीसीटीवी कैमरों की संख्या भी बढ़ाई जा रही है।',
      'नागरिकों से अपील की गई है कि किसी भी संदिग्ध गतिविधि की सूचना तुरंत 112 पर दें।',
    ),
  },
  {
    id: 'article-042', by: 'saurabh', h: 55, category: 'Crime',
    title: 'Police Launch Helpline and Weekly Visits for Senior Citizens Living Alone',
    subtitle: 'Beat constables will register elderly residents and check on them at least once a week.',
    location: 'Prayagraj', image: U('1615482316958-4684ed0899a8'),
    body: p(
      'Senior citizens who live alone can now register with their local police station for weekly check-in visits and a dedicated helpline, under a new community policing initiative.',
      'Beat constables will note each resident’s emergency contacts and medical needs. Officers said the scheme was meant both to prevent crimes targeting the elderly and to make sure help reaches them quickly in an emergency.',
      'Residents’ welfare associations have been asked to help identify elderly neighbours who may not know about the scheme.',
    ),
  },

  /* -------------------------------- SPORTS ------------------------------- */
  {
    id: 'article-050', by: 'faizan', h: 7, category: 'Sports',
    title: 'Prayagraj Clinch Inter-District U-19 Cricket Title in Last-Over Thriller',
    subtitle: 'Needing nine off the final over, the hosts got home with a ball to spare in front of a packed stadium.',
    location: 'Prayagraj', image: U('1730739463889-34c7279277a9'),
    body: p(
      'Prayagraj won the inter-district under-19 cricket title on Sunday, chasing down the target with one ball to spare in a final that went down to the last over.',
      'Needing nine runs from the final over, the hosts’ number seven struck a boundary off the third ball before scampering two quick singles to seal the win. Supporters packed the stands for the evening final.',
      'The team’s coach said several players had come through local club cricket and summer camps. “This group trained through the heat all summer. They deserve every bit of this,” he said.',
    ),
  },
  {
    id: 'article-051', by: 'priya', h: 18, category: 'Sports',
    title: 'शहर के स्टेडियम में राज्य स्तरीय एथलेटिक्स ट्रायल्स शुरू, 400 से अधिक खिलाड़ी पहुंचे',
    subtitle: 'दौड़, लंबी कूद और भाला फेंक जैसे इवेंट्स में चयनित खिलाड़ी राष्ट्रीय प्रतियोगिता में प्रदेश का प्रतिनिधित्व करेंगे।',
    location: 'प्रयागराज', image: U('1607734834519-d8576ae60ea6'),
    body: p(
      'शहर के स्टेडियम में राज्य स्तरीय एथलेटिक्स ट्रायल्स की शुरुआत हुई, जिसमें प्रदेश भर से 400 से अधिक खिलाड़ी हिस्सा ले रहे हैं।',
      'दौड़, लंबी कूद, ऊंची कूद और भाला फेंक जैसे इवेंट्स में चयनित खिलाड़ी आगामी राष्ट्रीय प्रतियोगिता में प्रदेश का प्रतिनिधित्व करेंगे। पहले दिन 100 मीटर दौड़ के मुक़ाबले सबसे रोमांचक रहे।',
    ),
  },
  {
    id: 'article-052', by: 'neha', h: 38, category: 'Sports',
    title: 'Grassroots Football League Returns with 32 Neighbourhood Teams',
    subtitle: 'Matches will be played on weekend evenings across four school grounds, with a separate girls’ division.',
    location: 'Prayagraj', image: U('1622225074638-1d80c0388697'),
    body: p(
      'The city’s grassroots football league is back for a new season with 32 neighbourhood teams, including a separate division for girls for the first time.',
      'Matches will be played on weekend evenings across four school grounds. Organisers said entry was free for spectators and that local coaches would scout promising players for district-level camps.',
    ),
  },
  {
    id: 'article-053', by: 'ankit', h: 64, category: 'Sports',
    title: 'गली क्रिकेट से राज्य टीम तक: झूंसी के 17 वर्षीय ऑलराउंडर की कहानी',
    subtitle: 'टेनिस बॉल से शुरुआत करने वाले युवा खिलाड़ी का चयन राज्य की अंडर-19 टीम के संभावितों में हुआ।',
    location: 'झूंसी, प्रयागराज', image: U('1565787154274-c8d076ad34e7'),
    body: p(
      'झूंसी की तंग गलियों में टेनिस बॉल से क्रिकेट खेलना शुरू करने वाले 17 वर्षीय ऑलराउंडर का चयन राज्य की अंडर-19 टीम के संभावित खिलाड़ियों में हुआ है।',
      'पिता की छोटी-सी दुकान से घर चलता है, लेकिन परिवार ने कभी उसके अभ्यास में कमी नहीं आने दी। सुबह पांच बजे मैदान पहुंचना उसकी आदत बन चुकी है।',
      '<blockquote>“मैं चाहता हूं कि मेरे मोहल्ले के बच्चे भी बड़े सपने देखें।”</blockquote>',
    ),
  },

  /* ---------------------------- ENTERTAINMENT ---------------------------- */
  {
    id: 'article-060', by: 'ritu', h: 14, category: 'Entertainment',
    title: 'Three-Day Classical Dance Festival to Light Up the City’s Cultural Centre',
    subtitle: 'Kathak, Bharatanatyam and folk performances are lined up, with free entry for students on the opening evening.',
    location: 'Prayagraj', image: U('1463592177119-bab2a00f3ccb'),
    body: p(
      'A three-day classical dance festival opens at the city’s cultural centre this weekend, bringing together Kathak, Bharatanatyam and folk troupes from across the region.',
      'Organisers said the opening evening would be free for students with a valid ID card. Morning workshops for young dancers will run alongside the main performances.',
    ),
  },
  {
    id: 'article-061', by: 'priya', h: 48, category: 'Entertainment',
    title: 'शहर की पहली ओपन-एयर म्यूज़िक नाइट, स्थानीय बैंड्स ने बांधा समां',
    subtitle: 'लोक संगीत से लेकर इंडी रॉक तक, युवा कलाकारों ने दर्शकों को देर रात तक थिरकाया।',
    location: 'प्रयागराज', image: U('1774177615013-b935ff9a03f1'),
    body: p(
      'शहर में पहली बार आयोजित ओपन-एयर म्यूज़िक नाइट में स्थानीय बैंड्स ने ऐसा समां बांधा कि दर्शक देर रात तक झूमते रहे।',
      'कार्यक्रम में लोक संगीत, ग़ज़ल और इंडी रॉक की प्रस्तुतियां हुईं। आयोजकों ने बताया कि हर तीन महीने में ऐसा आयोजन करने की योजना है, ताकि स्थानीय प्रतिभाओं को मंच मिल सके।',
    ),
  },

  /* ------------------------------- BUSINESS ------------------------------ */
  {
    id: 'article-070', by: 'saurabh', h: 11, category: 'Business',
    title: 'त्योहारों से पहले चौक बाज़ार में रौनक, व्यापारियों को अच्छी बिक्री की उम्मीद',
    subtitle: 'कपड़े, बर्तन और सजावटी सामान की दुकानों पर ग्राहकों की भीड़, पार्किंग बनी बड़ी चुनौती।',
    location: 'चौक, प्रयागराज', image: U('1760262492679-0b6d4744bf89'),
    body: p(
      'त्योहारों से पहले शहर के पुराने चौक बाज़ार में रौनक लौट आई है। कपड़े, बर्तन, मिठाई और सजावटी सामान की दुकानों पर सुबह से देर शाम तक ग्राहकों की भीड़ देखी जा रही है।',
      'व्यापारियों का कहना है कि इस बार बिक्री पिछले साल से बेहतर रहने की उम्मीद है। हालांकि संकरी गलियों में पार्किंग की कमी बड़ी चुनौती बनी हुई है।',
      'व्यापार मंडल ने प्रशासन से मांग की है कि त्योहारी सीज़न में बाज़ार के बाहर अस्थायी पार्किंग और ई-रिक्शा स्टैंड की व्यवस्था की जाए।',
    ),
  },
  {
    id: 'article-071', by: 'neha', h: 42, category: 'Business',
    title: 'Small Traders Embrace QR Code Payments, Survey of 400 Shops Finds',
    subtitle: 'Most shopkeepers in the sample now accept digital payments, but many still worry about failed transactions.',
    location: 'Prayagraj', image: U('1612687286248-9811801bd618'),
    body: p(
      'A large majority of small shopkeepers in a survey of 400 city shops now accept QR code payments, according to a study conducted by a local commerce college.',
      'Grocery stores and tea stalls reported the fastest switch, while some older traders said they still preferred cash. Failed transactions and delayed credits were the most common complaints.',
      'Researchers recommended short training camps on handling refunds and spotting payment fraud.',
    ),
  },

  /* ---------- Workflow examples (not public): pending / rejected / draft ---------- */
  {
    id: 'article-080', by: 'ankit', h: 1, category: 'Prayagraj', status: 'Pending Approval',
    title: '40 Government Schools in Prayagraj to Get Smart Classrooms This Term',
    subtitle: 'Each school will receive a projector, a digital board and teacher training under the first phase.',
    location: 'Prayagraj', image: U('1719159381916-062fa9f435a6'),
    body: p(
      'Forty government schools in the district will get smart classrooms this term, with each school receiving a projector, a digital board and preloaded lessons in Hindi and English.',
      'Teachers will attend a two-day training session before the equipment is installed. School principals said the biggest challenge would be a steady power supply, and inverters are being included in the kits.',
    ),
  },
  {
    id: 'article-081', by: 'ankit', h: 27, category: 'Prayagraj', status: 'Rejected',
    rejectionNote: 'Please add a comment from the municipal corporation’s engineering department and confirm how many households are affected before resubmitting.',
    title: 'जलभराव से परेशान राजापुर के निवासी, नालों की सफ़ाई की मांग',
    subtitle: 'हल्की बारिश में भी गलियों में पानी भरने से स्कूली बच्चों और बुज़ुर्गों को सबसे ज़्यादा दिक्कत।',
    location: 'राजापुर, प्रयागराज', image: U('1676830857523-48166e9ac61e'),
    body: p(
      'राजापुर के कई मोहल्लों में हल्की बारिश के बाद भी गलियों में पानी भर जाता है। निवासियों का कहना है कि नालों की नियमित सफ़ाई न होने से समस्या हर साल बढ़ रही है।',
      'स्थानीय लोगों ने बताया कि स्कूल जाने वाले बच्चों और बुज़ुर्गों को सबसे ज़्यादा परेशानी होती है। उन्होंने जल्द से जल्द नालों की सफ़ाई कराने की मांग की है।',
    ),
  },
  {
    id: 'article-082', by: 'ankit', h: 3, category: 'Prayagraj', status: 'Draft',
    title: 'Winter Night Shelters: Volunteers Map Gaps Across the City',
    subtitle: 'A student group is surveying shelters near the railway station and bus stands.',
    location: 'Prayagraj', image: U('1783101187442-1ec881adb206'),
    body: p('Draft notes — volunteers visited six shelters on Friday night. Need numbers on bed capacity and blankets. Follow up with the shelter supervisor near the railway station.'),
  },
  {
    id: 'article-083', by: 'neha', h: 3, category: 'Uttar Pradesh', status: 'Pending Approval',
    title: 'प्रदेश के शहरों में 100 नए ई-बस रूट प्रस्तावित, प्रयागराज को मिलेंगे 12 रूट',
    subtitle: 'नए रूटों से शहर के बाहरी इलाक़ों और कॉलेज क्षेत्रों को सीधी बस सेवा मिलने की उम्मीद।',
    location: 'प्रयागराज', image: U('1708067296955-fd3ee1ac02ce'),
    body: p(
      'प्रदेश के प्रमुख शहरों में 100 नए ई-बस रूट शुरू करने का प्रस्ताव तैयार किया गया है। इनमें से 12 रूट प्रयागराज के लिए प्रस्तावित हैं।',
      'नए रूटों से फाफामऊ, झूंसी और नैनी जैसे बाहरी इलाक़ों को शहर के कॉलेज क्षेत्रों और रेलवे स्टेशन से सीधी बस सेवा मिलने की उम्मीद है।',
    ),
  },
  {
    id: 'article-084', by: 'ankit', h: 90, category: 'Prayagraj', status: 'Unpublished',
    title: 'Road Repair Work on MG Marg to Begin Next Week',
    subtitle: 'Traffic will be diverted through side lanes during night-time resurfacing.',
    location: 'Civil Lines, Prayagraj', image: U('1708358121090-55d0faf76d31'),
    body: p('Resurfacing work on MG Marg will begin next week and continue for ten nights. Traffic will be diverted through side lanes between 10 pm and 6 am.'),
  },
];

/** Builds the initial article list with timestamps relative to `now`. */
export function buildSeedArticles(now = Date.now()) {
  return SEED.map(({ by, h, status = 'Published', rejectionNote = '', isTopStory = false, isFeatured = false, ...rest }) => {
    const t = new Date(now - h * 3600_000).toISOString();
    const created = new Date(now - (h + 3) * 3600_000).toISOString();
    const published = status === 'Published' || status === 'Unpublished';
    return {
      ...rest,
      ...REPORTERS[by],
      status,
      rejectionNote,
      isTopStory,
      isFeatured,
      createdAt: created,
      updatedAt: t,
      submittedAt: status === 'Draft' ? '' : t,
      publishedAt: published ? t : '',
      reviewedBy: status === 'Draft' || status === 'Pending Approval' ? '' : 'Meenakshi Dwivedi',
      reviewedAt: status === 'Draft' || status === 'Pending Approval' ? '' : t,
      isDemo: true,
    };
  });
}
