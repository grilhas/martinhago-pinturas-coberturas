// ===== SITE CONSTANTS =====
export const SITE = {
  title: 'Martinhago Pinturas & Coberturas | Pinturas e Reparação de Telhados',
  tagline: 'Pinturas interiores e exteriores, telhados e impermeabilização em Lisboa',
  description:
    'A Martinhago Pinturas & Coberturas faz pinturas interiores e exteriores, lavagem e pintura de telhados, impermeabilização e reparação de algerozes em Lisboa e região. Orçamento rápido.',
  url: 'https://martinhagopinturas.example',
  author: 'Martinhago Pinturas & Coberturas',
  locale: 'pt-PT',
};

// ===== BUSINESS INFO =====
export const BUSINESS = {
  name: 'Martinhago Pinturas & Coberturas',
  // TODO: dados de contacto por confirmar com o cliente — nenhum foi fornecido no briefing
  email: 'geral@martinhagopinturas.example',
  phoneForTel: '+351210500000',
  phoneFormatted: '+351 21 050 0000',
  logo: '/assets/favicons/favicon.svg',
  address: {
    // TODO: morada exata por confirmar — só foi indicado "Lisboa e região"
    lineOne: 'Lisboa',
    lineTwo: '',
    city: 'Lisboa',
    state: 'Lisboa',
    zip: '',
    mapLink: 'https://maps.google.com/?q=Lisboa',
  },
  hours: {
    // TODO: confirmar horários com o cliente
    display: 'Segunda a sexta: 08:30 – 18:00',
    opens: '08:30',
    closes: '18:00',
    days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
  },
  serviceArea: [
    'Lisboa, Lisboa',
    'Amadora, Lisboa',
    'Odivelas, Lisboa',
    'Loures, Lisboa',
    'Oeiras, Lisboa',
    'Sintra, Lisboa',
  ],
  socials: {
    facebook: '',
    instagram: '',
    googleBusiness: '',
  },
};

// ===== SEO DEFAULTS =====
export const SEO = {
  title: SITE.title,
  description: SITE.description,
};

// ===== OPEN GRAPH DEFAULTS =====
export const OG = {
  locale: 'pt_PT',
  image: '/assets/social.jpg',
};
