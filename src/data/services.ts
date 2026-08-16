// Single source of truth for the 5 Martinhago Pinturas & Coberturas services.
// Used by: home page Services overview, every dynamic [city].astro
// location page, footer/nav.

import pinturaImg from '@assets/images/pinturas/fachadas-coloridas-ceu.jpg';
import telhadosImg from '@assets/images/pinturas/trabalhadores-telhas-instalacao.jpg';
import impermeabilizacaoImg from '@assets/images/pinturas/chuva-telhado-terracota.jpg';
import algerozesImg from '@assets/images/pinturas/algeroz-branco-parede.jpg';
import claraboiaImg from '@assets/images/pinturas/claraboia-telhado-terracota.jpg';

export type ServiceSummary = {
  slug: string;
  title: string;
  href: string;
  image: ImageMetadata;
  tagline: string;
  description: string;
};

export const SERVICES: ServiceSummary[] = [
  {
    slug: 'pintura-interior-exterior',
    title: 'Pintura Interior e Exterior',
    href: '/services/pintura-interior-exterior/',
    image: pinturaImg,
    tagline: 'Fachadas, interiores e detalhes acabados com cuidado.',
    description:
      'Pintura de interiores e exteriores para casas, apartamentos e espaços comerciais. Preparação da superfície, tintas de qualidade e acabamento cuidado do início ao fim.',
  },
  {
    slug: 'lavagem-pintura-telhados',
    title: 'Lavagem e Pintura de Telhados',
    href: '/services/lavagem-pintura-telhados/',
    image: telhadosImg,
    tagline: 'Telhas limpas, tratadas e pintadas para durarem mais.',
    description:
      'Lavagem profissional de telhados e pintura de telhas com produtos próprios para exterior. Remove musgo e sujidade acumulada e protege a cobertura da chuva e do sol.',
  },
  {
    slug: 'impermeabilizacao-vedacao',
    title: 'Impermeabilização e Vedação Especializada',
    href: '/services/impermeabilizacao-vedacao/',
    image: impermeabilizacaoImg,
    tagline: 'Vedação de infiltrações antes que se tornem um problema maior.',
    description:
      'Impermeabilização de telhados, terraços e zonas de infiltração, com vedação especializada de juntas e remates. Resolve humidades na origem, não só na superfície.',
  },
  {
    slug: 'recuperacao-algerozes',
    title: 'Recuperação de Algerozes',
    href: '/services/recuperacao-algerozes/',
    image: algerozesImg,
    tagline: 'Algerozes desentupidos e reparados para escoar a água certa.',
    description:
      'Reparação e recuperação de algerozes entupidos, deformados ou com fugas. Um algeroz mal escoado é uma das causas mais comuns de infiltração em paredes e tetos.',
  },
  {
    slug: 'substituicao-vidros-claraboia',
    title: 'Substituição de Vidros de Claraboia',
    href: '/services/substituicao-vidros-claraboia/',
    image: claraboiaImg,
    tagline: 'Vidros de claraboia partidos ou baços substituídos com segurança.',
    description:
      'Substituição de vidros de claraboia partidos, riscados ou com infiltração na vedação. Trabalho em altura feito com o equipamento de segurança adequado.',
  },
];
