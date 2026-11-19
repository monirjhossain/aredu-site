export const ABOUT_DEFAULTS = {
  visibility: {
    stats: true,
    story: true,
    values: true,
    journey: true,
    team: false,
    trust: true,
    cta: true,
  },
  hero: {
    eyebrow: 'About us',
    title: 'AR Education — study in China from Bangladesh',
    subtitle:
      'A trusted study-in-China consultancy for Bangladeshi students — end-to-end support from university shortlist and scholarships to admission, visa and pre-departure.',
    primary_cta_label: 'Talk to a counsellor',
    primary_cta_url: '/contact',
    secondary_cta_label: 'WhatsApp us',
    image_1: '',
    image_2: '',
    image_3: '',
  },
  stats: [
    { value: '2000+', label: 'Students guided' },
    { value: '5+', label: 'Years experience' },
    { value: '98+', label: 'Partner universities' },
    { value: 'Bangla', label: 'Counselling language' },
  ],
  story: {
    eyebrow: 'Our story',
    title: 'Built for Bangladeshi students aiming for China.',
    body: "AR Education started with a simple goal: make studying in China clearer, safer and more affordable for students and families in Bangladesh.\n\nToday we help applicants compare universities, chase the right scholarships, complete admission files and prepare for visa and departure — with counselling in Bangla at every step.",
    image: '',
    quote: 'Clear guidance beats guesswork — especially when your future is on the line.',
    quote_author: 'AR Education team',
  },
  values: {
    eyebrow: 'What we stand for',
    title: 'Principles that guide every counselling session.',
    subtitle: 'We measure success by clarity, honesty and outcomes — not by pressure or empty promises.',
    items: [
      {
        title: 'Honest advice',
        description: 'We recommend fits you can actually afford and qualify for — not the loudest option.',
        icon: 'ti-shield-check',
      },
      {
        title: 'End-to-end care',
        description: 'From shortlist to scholarship, admission, visa and packing — one team stays with you.',
        icon: 'ti-route',
      },
      {
        title: 'Bangla-first support',
        description: 'Complex China processes explained simply in Bangla for students and parents.',
        icon: 'ti-messages',
      },
      {
        title: 'Scholarship focus',
        description: 'We actively map CSC and university funding routes that match your profile.',
        icon: 'ti-rosette-discount-check',
      },
    ],
  },
  journey: {
    eyebrow: 'How we help',
    title: 'A clear path from first call to campus.',
    subtitle: 'Four practical stages — so families always know what comes next.',
    steps: [
      {
        title: 'Profile & goals',
        description: 'Understand budget, grades, preferred cities and degree level in one counselling call.',
        icon: 'ti-user-search',
      },
      {
        title: 'University shortlist',
        description: 'Compare realistic options by tuition in Taka, major, language and scholarship chance.',
        icon: 'ti-building-community',
      },
      {
        title: 'Admission & funding',
        description: 'Prepare documents, apply for seats and pursue CSC or university scholarships.',
        icon: 'ti-file-check',
      },
      {
        title: 'Visa & departure',
        description: 'JW202, medical, embassy steps and pre-departure briefing before you fly.',
        icon: 'ti-plane-departure',
      },
    ],
  },
  team: {
    eyebrow: 'Our team',
    title: 'Meet the people who guide you',
    subtitle: 'Counsellors and leadership focused on Bangladeshi applicants to China.',
    members: [],
  },
  trust: {
    eyebrow: 'Why students choose us',
    title: 'Trust built on process, not promises.',
    subtitle: 'Practical support families can verify at every stage of the China journey.',
    items: [
      {
        title: 'Free expert counselling',
        description: 'No pressure sales — clear options before you spend money.',
        icon: 'ti-message-circle',
      },
      {
        title: 'Scholarship application support',
        description: 'Document checklists and timelines for CSC and university awards.',
        icon: 'ti-rosette-discount-check',
      },
      {
        title: 'Visa & pre-departure guidance',
        description: 'Embassy steps, medicals and packing lists explained in Bangla.',
        icon: 'ti-plane-departure',
      },
      {
        title: 'Transparent cost planning',
        description: 'Tuition and living estimates in Taka so budgets stay realistic.',
        icon: 'ti-currency-taka',
      },
    ],
  },
  cta: {
    title: 'Ready to start your China journey?',
    subtitle: "Free counselling in Bangla — we'll guide every step.",
    button_label: 'Get free counselling →',
    button_url: '/contact',
    secondary_label: 'Chat on WhatsApp',
  },
}

function cloneDefaults() {
  return structuredClone ? structuredClone(ABOUT_DEFAULTS) : JSON.parse(JSON.stringify(ABOUT_DEFAULTS))
}

export function mergeAboutContent(input = {}) {
  const out = cloneDefaults()
  if (!input || typeof input !== 'object') return out

  if (input.visibility && typeof input.visibility === 'object') {
    out.visibility = { ...out.visibility, ...input.visibility }
  }

  for (const key of ['hero', 'story', 'values', 'journey', 'team', 'trust', 'cta']) {
    if (input[key] && typeof input[key] === 'object') {
      out[key] = { ...out[key], ...input[key] }
    }
  }

  if (Array.isArray(input.stats)) out.stats = input.stats
  if (Array.isArray(input.values?.items)) out.values.items = input.values.items
  if (Array.isArray(input.journey?.steps)) out.journey.steps = input.journey.steps
  if (Array.isArray(input.team?.members)) out.team.members = input.team.members
  if (Array.isArray(input.trust?.items)) out.trust.items = input.trust.items

  return out
}
