export const WHATSAPP = 'https://wa.me/8801756502004'
export const PHONE = '+8801756502004'
export const EMAIL = 'info@areducation.net'
export const ADDRESS =
  '10th floor, Tropical Tower, Bata Signal, Elephant Road, Dhaka, Bangladesh'
export const FACEBOOK = 'https://www.facebook.com/chinaedubangladesh'
export const YOUTUBE = 'https://www.youtube.com/@chinaedubangladesh'

export const BRAND = 'AR Education'

export const REGIONS = [
  { slug: 'central-china', name: 'Central China' },
  { slug: 'east-china', name: 'East China' },
  { slug: 'north-china', name: 'North China' },
  { slug: 'northeast-china', name: 'Northeast China' },
  { slug: 'northwest-china', name: 'Northwest China' },
  { slug: 'south-china', name: 'South China' },
  { slug: 'southwest-china', name: 'Southwest China' },
]

export const DEGREES = [
  { slug: 'bachelor', name: 'Bachelor', letter: 'B', label: 'Bachelor Programmes in China' },
  { slug: 'master', name: 'Master', letter: 'M', label: 'Master Programmes in China' },
  { slug: 'phd', name: 'PhD', letter: 'P', label: 'PhD Programmes in China' },
  { slug: 'mbbs', name: 'MBBS', letter: 'M', label: 'MBBS Programmes in China' },
  { slug: 'diploma', name: 'Diploma', letter: 'D', label: 'Diploma Programmes in China' },
  { slug: 'foundation', name: 'Foundation', letter: 'F', label: 'Foundation Programmes in China' },
  { slug: 'language', name: 'Language', letter: 'L', label: 'Language Programmes in China' },
]

export const SERVICES = [
  {
    slug: 'application-documents-ready',
    name: 'Application & Documents Ready',
    short: 'We prepare your complete application file and submit it to your chosen universities.',
    icon: 'ti-file-description',
    color: '#E11D2E',
    bg: '#FCE8EA',
    long: 'From transcripts and recommendation letters to online portals — we assemble a complete, university-ready application package and submit it on time.',
    includes: [
      'Document checklist tailored to your universities',
      'File preparation & quality check',
      'Online application submission support',
      'Follow-up until admission decision',
    ],
    steps: [
      { title: 'Profile review', desc: 'We assess your academics and shortlist suitable programmes.' },
      { title: 'Document prep', desc: 'Gather, format and verify every required file.' },
      { title: 'Submit & track', desc: 'Apply online and track status with you.' },
    ],
  },
  {
    slug: 'visa-process-visa-fee',
    name: 'Visa Process & Visa Fee',
    short: 'Complete X1/X2 student-visa support handled from Dhaka.',
    icon: 'ti-plane-departure',
    color: '#0F766E',
    bg: '#E6F4F2',
    long: 'Once you have admission and JW202/JW201, we guide the full China student visa process from Dhaka — forms, appointments and fee clarity.',
    includes: [
      'X1 / X2 visa guidance',
      'Document list for visa centre',
      'Appointment & form support',
      'Clear fee breakdown',
    ],
    steps: [
      { title: 'Admission ready', desc: 'Confirm JW form and admission letter.' },
      { title: 'Visa file', desc: 'Prepare photos, forms and supporting docs.' },
      { title: 'Submit in Dhaka', desc: 'Guide you through the visa centre process.' },
    ],
  },
  {
    slug: 'medical-in-bangladesh',
    name: 'Medical (in Bangladesh)',
    short: 'Guidance for the required medical examination, done in Bangladesh.',
    icon: 'ti-heartbeat',
    color: '#B45309',
    bg: '#FEF3C7',
    long: 'Chinese universities often require a physical examination record. We guide you to complete the medical properly in Bangladesh before departure.',
    includes: [
      'Approved medical checklist',
      'Clinic guidance in Bangladesh',
      'Form filling support',
      'Pre-departure verification',
    ],
    steps: [
      { title: 'Know requirements', desc: 'Confirm what your university needs.' },
      { title: 'Book medical', desc: 'Complete tests at a suitable clinic.' },
      { title: 'Review report', desc: 'We help check the form before you fly.' },
    ],
  },
  {
    slug: 'pickup-drop-and-china-facilities',
    name: 'Pickup & Drop and China Facilities',
    short: 'Airport pickup, drop and settling-in support after you land in China.',
    icon: 'ti-car',
    color: '#0A1628',
    bg: '#E8EEF4',
    long: 'Landing in a new country is easier with support. We arrange airport pickup and help you settle into dorms and campus life.',
    includes: [
      'Airport pickup coordination',
      'Campus / dorm settling support',
      'SIM, banking & basics guidance',
      'Local orientation tips',
    ],
    steps: [
      { title: 'Share flight', desc: 'Send arrival details before you depart.' },
      { title: 'Meet on landing', desc: 'Pickup arranged at the airport.' },
      { title: 'Settle in', desc: 'Reach campus and get basic setup help.' },
    ],
  },
  {
    slug: 'csca-university-interview-duolingo-support',
    name: 'CSCA, University Interview & Duolingo Support',
    short: 'Preparation for CSCA, university interviews and the Duolingo English Test.',
    icon: 'ti-microphone',
    color: '#0F766E',
    bg: '#E6F4F2',
    long: 'Many Chinese universities now ask for CSCA scores, interview rounds and English proof. We prepare you step-by-step — practice sessions, mock interviews and Duolingo strategies — so you walk in confident.',
    includes: [
      'CSCA syllabus orientation & practice plan',
      'Mock university interviews (Bangla + English)',
      'Duolingo English Test tips & drills',
      'Feedback on speaking & common Q&A',
      'Timeline aligned with your intake',
    ],
    steps: [
      { title: 'Assess your level', desc: 'Quick review of English, academics and target universities.' },
      { title: 'Train with mocks', desc: 'CSCA practice, interview drills and Duolingo prep.' },
      { title: 'Sit the real tests', desc: 'Go prepared — we stay available for last-minute tips.' },
    ],
    pillars: [
      {
        title: 'CSCA Prep',
        desc: 'Understand the exam format, focus areas and a realistic study plan for Bangladeshi students.',
        icon: 'ti-notebook',
      },
      {
        title: 'University Interview',
        desc: 'Mock sessions covering motivation, major choice, scholarship intent and confidence.',
        icon: 'ti-messages',
      },
      {
        title: 'Duolingo Support',
        desc: 'Score-focused practice for reading, listening, speaking and writing sections.',
        icon: 'ti-language',
      },
    ],
  },
]


export const TOOLS = [
  {
    to: '/tools/find-university',
    title: 'Find my university',
    desc: 'Answer a few questions and get your best-fit matches, ranked.',
    bg: '#FCE8EA',
    color: '#E11D2E',
    icon: 'ti-search',
  },
  {
    to: '/tools/scholarship-checker',
    title: 'Scholarship checker',
    desc: 'See which CSC, provincial and university scholarships fit you.',
    bg: '#FEF3C7',
    color: '#B45309',
    icon: 'ti-award',
  },
  {
    to: '/tools/cost-calculator',
    title: 'Cost calculator',
    desc: 'Tuition, living, visa and flights from Dhaka — totalled in Taka.',
    bg: '#E8EEF4',
    color: '#0A1628',
    icon: 'ti-calculator',
  },
  {
    to: '/tools/gpa-converter',
    title: 'GPA converter',
    desc: 'Turn SSC/HSC or CGPA into the China 100-point score & grade.',
    bg: '#E6F4F2',
    color: '#0F766E',
    icon: 'ti-chart-arrows',
  },
]

export const FIELD_GROUPS = [
  'Agriculture & Life Sciences',
  'Architecture & Urban Planning',
  'Arts, Design & Media',
  'Business & Economics',
  'Chinese Language & Preparatory',
  'Computer Science & IT',
  'Education',
  'Engineering & Technology',
  'Humanities & Languages',
  'Natural Sciences',
  'Social Sciences & Law',
]

export const FAQS = [
  {
    q: 'Is studying in China affordable for Bangladeshi students?',
    a: 'Yes. Tuition at public universities and the cost of living are far lower than in the UK, USA or Australia. Many programmes cost a fraction of Western study, and our cost calculator shows the full amount in Taka — including flights from Dhaka.',
  },
  {
    q: 'Do I need IELTS to study in China?',
    a: 'Not always. Many English-taught programmes accept a range of English proof, and some do not require IELTS. Chinese-taught programmes usually need an HSK level. Our scholarship checker and counsellors confirm what each university requires.',
  },
  {
    q: 'Can I get a full scholarship?',
    a: 'Full scholarships such as the CSC (Chinese Government Scholarship), provincial and university scholarships can cover tuition, accommodation, insurance and a monthly stipend. Use our scholarship checker to see which ones you are likely to qualify for.',
  },
  {
    q: 'Is it safe, and is halal food available?',
    a: 'Chinese university cities are generally very safe, with halal canteens, mosques and active Bangladeshi student communities. Each city page covers safety, halal food and community details.',
  },
  {
    q: 'How do you convert my SSC, HSC or CGPA?',
    a: 'Our free GPA converter turns your SSC/HSC GPA (out of 5) or university CGPA (out of 4) into the China 100-point score, 4.0 GPA and grade — with an honest read on your admission and scholarship chances.',
  },
  {
    q: 'How long does the admission process take?',
    a: 'Most admissions take a few weeks to a couple of months depending on the university and intake. We prepare your file, submit to your chosen universities, and keep you updated at every step.',
  },
  {
    q: 'What documents do I need for a Chinese student visa (X1/X2)?',
    a: 'Typically your admission letter and JW202/JW201 form, passport, photos, physical examination record, and (for X1) a completed visa application — processed at the China visa centre in Dhaka. We guide you through each document.',
  },
  {
    q: 'Who is the best agency for studying in China from Bangladesh?',
    a: 'AR Education is a leading study-in-China consultancy for Bangladeshi students, offering end-to-end support from admission to visa with 5+ years of experience and 2000+ students helped.',
  },
  {
    q: 'Which agency should I trust for a China student visa?',
    a: 'Choose an agency that is transparent about fees, has verified success stories, and supports you from admission through the visa. AR Education offers free counselling in Bangla and end-to-end visa support.',
  },
]

export const SCHOLARSHIP_META = {
  'chinese-government-scholarship-csc': {
    coverage: 'Full',
    universities: 12,
    desc: 'The Chinese Government Scholarship (CSC) is a fully funded national award covering tuition, accommodation, insurance and a monthly stipend.',
  },
  'full-scholarship-tuition-stipend': {
    coverage: 'Full',
    universities: 12,
    desc: 'A full scholarship covering tuition fees plus a monthly living stipend, and usually free or subsidised accommodation.',
  },
  'fully-funded-with-stipend': {
    coverage: 'Full',
    universities: 20,
    desc: 'A fully funded award covering tuition and providing a monthly stipend for living costs.',
  },
  'half-tuition-50-scholarship': {
    coverage: 'Partial',
    universities: 19,
    desc: 'A partial scholarship that waives 50% of the tuition fee, reducing the overall cost of study.',
  },
  'partial-scholarship': {
    coverage: 'Partial',
    universities: 17,
    desc: 'A partial award covering part of the tuition or costs. The exact percentage varies by university.',
  },
  'tuition-free-scholarship': {
    coverage: 'Full tuition',
    universities: 37,
    desc: 'A scholarship that waives 100% of tuition fees. Living costs and accommodation are usually separate.',
  },
  'tuition-subsidy': {
    coverage: 'Partial',
    universities: 12,
    desc: 'A partial reduction of tuition fees offered by the university or a local government.',
  },
  'provincial-government-scholarship': {
    coverage: 'Varies',
    universities: 8,
    desc: 'Provincial government scholarships vary by province and may cover tuition, living costs or both.',
  },
  'confucius-institute-scholarship': {
    coverage: 'Varies',
    universities: 5,
    desc: 'Scholarships for Chinese language and culture study through Confucius Institute programmes.',
  },
}
