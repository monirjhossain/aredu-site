export const HOME_SECTIONS_DEFAULTS = {
  visibility: {
    hero: true,
    stats: true,
    popular_courses: true,
    popular_universities: true,
    tools: true,
    tools_banner: true,
    ask_experts: true,
    services: true,
    degrees: true,
    fields: true,
    scholarships: true,
    mid_cta: true,
    why: true,
    how: true,
    gallery: true,
    videos: true,
    faq: true,
    final_cta: true,
  },
  hero: {
    headline: 'Study in China,\nguided from Bangladesh.',
    subheadline:
      'Universities, scholarships and real costs in Taka — with step-by-step help from admission to visa.',
    primary_cta_label: 'Find my university',
    primary_cta_url: '/tools/find-university',
    secondary_cta_label: 'Browse scholarships',
    secondary_cta_url: '/scholarships',
    search_placeholder: 'Search universities, majors…',
    slides: [
      '/images/hero-bg-1.jpg',
      '/images/hero-bg-2.jpg',
      '/images/hero-bg-3.jpg',
      '/images/hero-bg-4.jpg',
      '/images/hero-bg-5.jpg',
      '/images/hero-bg-6.jpg',
    ],
  },
  stats: {
    eyebrow: 'AR Education',
    intro: 'Numbers that matter for your China journey.',
    items: [
      { value: 98, label: 'Universities' },
      { value: 9, label: 'Scholarships' },
      { value: 52, label: 'Cities' },
      { value: 121, label: 'Majors' },
      { value: 2000, label: 'Students' },
    ],
  },
  why: {
    eyebrow: 'Why China',
    title: 'Why Bangladeshi students choose China.',
    subtitle:
      'Affordable education, scholarship access and a faster path to globally relevant degrees make China one of the strongest options for Bangladeshi students.',
    summary_label: 'Fast summary',
    summary_title: 'Lower cost, better options, clearer support.',
    summary_text:
      'Students can compare tuition in Taka, aim for funded routes and get end-to-end help from Bangladesh.',
    items: [
      {
        num: '01',
        title: 'Affordable in Taka',
        desc: 'See the full cost in BDT before you apply — tuition, living, visa and flights.',
        icon: 'ti-wallet',
      },
      {
        num: '02',
        title: 'Scholarships that pay you',
        desc: 'CSC and provincial awards can cover tuition, dorm, insurance and a monthly stipend.',
        icon: 'ti-rosette-discount-check',
      },
      {
        num: '03',
        title: 'World-ranked degrees',
        desc: '985 & 211 universities with strong engineering, medical and business programmes.',
        icon: 'ti-building-bank',
      },
      {
        num: '04',
        title: 'Guided end-to-end',
        desc: 'From shortlist to student visa — free counselling on WhatsApp, in Bangla.',
        icon: 'ti-users-group',
      },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Your path from first search to class day.',
    subtitle:
      'A simple four-step process for Bangladeshi students planning admission, scholarship and visa support for China.',
    items: [
      {
        step: '01',
        title: 'Discover',
        desc: 'Convert grades, estimate costs in Taka, and shortlist universities.',
        icon: 'ti-search',
      },
      {
        step: '02',
        title: 'Shortlist',
        desc: 'Check scholarship eligibility and compare best-fit options.',
        icon: 'ti-list-check',
      },
      {
        step: '03',
        title: 'Apply',
        desc: 'We prepare your file and submit to your chosen universities.',
        icon: 'ti-file-check',
      },
      {
        step: '04',
        title: 'Fly',
        desc: 'Admission, JW202, student visa — then depart Dhaka ready.',
        icon: 'ti-plane-departure',
      },
    ],
  },
  tools_banner: {
    enabled: true,
    eyebrow: 'Study in China',
    title: 'Free counselling for your China admission',
    subtitle:
      'Shortlist universities, check scholarships and start your file with AR Education — guided in Bangla.',
    cta_label: 'Talk to a counsellor',
    cta_url: '/contact',
    image: '/images/hero-bg-3.jpg',
    mobile_image: '',
  },
  mid_cta: {
    title: 'Not sure where to start?',
    subtitle: "Answer a few questions — we'll match universities and scholarships free, in minutes.",
    primary_cta_label: 'Find my university →',
    primary_cta_url: '/tools/find-university',
    secondary_cta_label: 'WhatsApp us',
  },
  final_cta: {
    title: 'Ready to study in China?',
    subtitle:
      'Free counselling in Bangla — pick a university, apply, win a scholarship, reach class day one.',
    primary_cta_label: 'Chat on WhatsApp',
    secondary_cta_label: 'Find my university',
    secondary_cta_url: '/tools/find-university',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    subtitle:
      'Quick answers to the questions Bangladeshi students ask most about universities, scholarships, costs and admission in China.',
    help_label: 'Need a direct answer?',
    help_text: 'If your question is not listed here, our team can guide you directly in Bangla.',
    help_cta_label: 'Ask on WhatsApp',
  },
  ask_experts: {
    eyebrow: 'Live question desk',
    title: 'Ask our experts like a real conversation.',
    subtitle:
      'Scholarship, budget, documents or visa confusion? Start with one message and our team will guide your next step.',
    quick_questions: [
      'Can I get a full CSC scholarship?',
      'Do I need IELTS for China?',
      'What is the total cost in Taka?',
      'Which university is best for MBBS?',
      'How long does admission take?',
      'Is halal food available on campus?',
    ],
    experts: [
      { initials: 'AR', name: 'Admission Desk', role: 'University matching', color: '#E11D2E' },
      { initials: 'SC', name: 'Scholarship Coach', role: 'CSC & funding', color: '#0F766E' },
      { initials: 'VS', name: 'Visa Support', role: 'X1 / X2 guidance', color: '#0A1628' },
    ],
  },
  tools: [
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
  ],
  degrees: [
    { slug: 'bachelor', name: 'Bachelor', letter: 'B', label: 'Bachelor Programmes in China' },
    { slug: 'master', name: 'Master', letter: 'M', label: 'Master Programmes in China' },
    { slug: 'phd', name: 'PhD', letter: 'P', label: 'PhD Programmes in China' },
    { slug: 'mbbs', name: 'MBBS', letter: 'M', label: 'MBBS Programmes in China' },
    { slug: 'diploma', name: 'Diploma', letter: 'D', label: 'Diploma Programmes in China' },
    { slug: 'foundation', name: 'Foundation', letter: 'F', label: 'Foundation Programmes in China' },
    { slug: 'language', name: 'Language', letter: 'L', label: 'Language Programmes in China' },
  ],
  field_groups: [
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
  ],
  services_catalog: [
    {
      slug: 'application-documents-ready',
      name: 'Application & Documents Ready',
      short: 'We prepare your complete application file and submit it to your chosen universities.',
      icon: 'ti-file-description',
      color: '#E11D2E',
      bg: '#FCE8EA',
    },
    {
      slug: 'visa-process-visa-fee',
      name: 'Visa Process & Visa Fee',
      short: 'Complete X1/X2 student-visa support handled from Dhaka.',
      icon: 'ti-plane-departure',
      color: '#0F766E',
      bg: '#E6F4F2',
    },
    {
      slug: 'medical-in-bangladesh',
      name: 'Medical (in Bangladesh)',
      short: 'Guidance for the required medical examination, done in Bangladesh.',
      icon: 'ti-heartbeat',
      color: '#B45309',
      bg: '#FEF3C7',
    },
    {
      slug: 'pickup-drop-and-china-facilities',
      name: 'Pickup & Drop and China Facilities',
      short: 'Airport pickup, drop and settling-in support after you land in China.',
      icon: 'ti-car',
      color: '#0A1628',
      bg: '#E8EEF4',
    },
    {
      slug: 'csca-university-interview-duolingo-support',
      name: 'CSCA, University Interview & Duolingo Support',
      short: 'Preparation for CSCA, university interviews and the Duolingo English Test.',
      icon: 'ti-microphone',
      color: '#0F766E',
      bg: '#E6F4F2',
    },
  ],
}

const LIST_KEYS = ['tools', 'degrees', 'field_groups', 'services_catalog']

export function mergeHomeSections(input = {}) {
  const out = structuredClone
    ? structuredClone(HOME_SECTIONS_DEFAULTS)
    : JSON.parse(JSON.stringify(HOME_SECTIONS_DEFAULTS))

  for (const key of Object.keys(HOME_SECTIONS_DEFAULTS)) {
    const incoming = input?.[key]
    if (incoming == null) continue

    if (LIST_KEYS.includes(key)) {
      if (Array.isArray(incoming)) out[key] = incoming
      continue
    }

    if (!incoming || typeof incoming !== 'object') continue
    out[key] = { ...out[key], ...incoming }

    if (key === 'visibility') {
      for (const visKey of Object.keys(HOME_SECTIONS_DEFAULTS.visibility)) {
        if (Object.prototype.hasOwnProperty.call(incoming, visKey)) {
          out.visibility[visKey] = Boolean(incoming[visKey])
        }
      }
      continue
    }

    if (Array.isArray(incoming.items)) {
      out[key].items = incoming.items
    }
    if (Array.isArray(incoming.slides)) {
      out[key].slides = incoming.slides
    }
    if (Array.isArray(incoming.quick_questions)) {
      out[key].quick_questions = incoming.quick_questions
    }
    if (Array.isArray(incoming.experts)) {
      out[key].experts = incoming.experts
    }
  }

  if (Object.prototype.hasOwnProperty.call(out.tools_banner || {}, 'enabled')) {
    out.visibility.tools_banner = out.tools_banner.enabled !== false
  }

  return out
}
