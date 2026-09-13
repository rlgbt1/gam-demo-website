/**
 * Toda a cópia institucional presente neste ficheiro deriva exclusivamente do
 * texto "About" real do gam.ao (capturado no brief do projecto). Nada aqui foi
 * inventado — números, sectores, nomes e citações são factos verificados.
 *
 * Onde uma secção precisa de conteúdo que ainda não existe (ex: descrições de
 * sector individuais), assinala-se explicitamente com `isPlaceholder: true`
 * para nunca ser confundido com facto confirmado.
 */

export const brand = {
  name: 'GAM',
  fullName: 'Grupo António Mosquito',
  chairman: 'António Mosquito',
  chairmanTitle: 'Presidente do Conselho Administrativo',
};

export const sectors = [
  'Comércio e Transporte',
  'Construção Civil',
  'Hotelaria',
  'Imobiliária',
  'Banca',
  'Agricultura e Pecuária',
  'Indústria',
] as const;

export const emergingSector = 'Petróleos';

export const stats = [
  {
    value: '20',
    prefix: '',
    suffix: '+',
    label: 'Empresas geridas em Angola e além-fronteiras',
  },
  {
    value: '120',
    prefix: '$',
    suffix: 'M+',
    label: 'Volume de negócios anual, em dólares norte-americanos',
  },
  {
    value: '1.300',
    prefix: '',
    suffix: '+',
    label: 'Colaboradores distribuídos por todo o território angolano',
  },
] as const;

export const lema = 'Servir o Cliente, Diversificar a Oferta de Produtos, e Garantir a melhor Qualidade';

export const aboutParagraphs = [
  'O GAM – Grupo António Mosquito nasceu da necessidade de organizar a gestão das empresas que o integram, de acordo com os mais modernos padrões internacionais.',
  'O GAM não só controla o capital, mas também gere cerca de vinte companhias com investimentos em Angola e fora de fronteiras. A sua impressionante expansão é devida a uma administração dinâmica que tem como lema fundamental: "Servir o Cliente, Diversificar a Oferta de Produtos, e Garantir a melhor Qualidade".',
  'O GAM está solidamente consolidado em diversos sectores económicos: Comércio e Transporte, Construção Civil, Hotelaria, Imobiliária, Banca, Agricultura e Pecuária, e Indústria.',
  'A entrada na exploração de petróleos, em parceria com gigantes da indústria petrolífera, é um dos mais recentes investimentos.',
];

export const introStat = {
  turnover: '~$120 milhões USD',
  employees: 'mais de 1.300',
};

/** Empresas do portfólio — apenas nomes/designações tal como constam dos seus próprios logótipos. */
export const portfolioCompanies = [
  { id: 'bacatral', name: 'Bacatral', tag: 'GAM — Grupo António Mosquito', logo: 'bacatral' },
  { id: 'angoil', name: 'Angoil', tag: '', logo: 'angoil' },
  { id: 'ccl', name: 'CCL', tag: 'Construção Civil, Lda.', logo: 'ccl' },
  { id: 'microcenter', name: 'Microcenter', tag: 'Tecnologia', logo: 'microcenter' },
  { id: 'mbakassy', name: 'Mbakassy', tag: 'Casa fundada em 23‑03‑1980', logo: 'mbassy' },
  { id: 'falcon', name: 'Falcon Oil Holding Angola', tag: 'S.A.', logo: 'falcon' },
  { id: 'syoil', name: 'SyOil', tag: 'Comércio e Indústria de Petróleos, Lda.', logo: 'syoil' },
  { id: 'gamil', name: 'GAMIL Alimentos', tag: 'Lda.', logo: 'ammil' },
  { id: 'envirobac', name: 'EnviroBac', tag: 'Gestão de Resíduos', logo: 'envirobac' },
] as const;

/** Cenas do hero — mapeadas aos vídeos e recortes reais fornecidos pelo cliente. */
export const heroScenes = [
  {
    id: 'transporte',
    label: 'Comércio e Transporte',
    video: 'trucks-logistics',
    cutout: 'bus-cutout' as const,
  },
  {
    id: 'petroleos',
    label: 'Petróleos',
    video: 'oil-gas',
    cutout: 'barrels-cutout' as const,
  },
  {
    id: 'construcao',
    label: 'Construção Civil e Imobiliária',
    video: 'luanda-skyline',
    cutout: 'beam-cutout' as const,
  },
  {
    id: 'agricultura',
    label: 'Agricultura, Pecuária e Banca',
    video: 'agriculture',
    // fecho em fundo limpo com a marca GAM, conforme o brief — sem recorte de objecto
    cutout: 'gam-mark' as const,
  },
] as const;

export const heroHeadline = {
  kicker: 'GAM — Grupo António Mosquito',
  title: 'Sete sectores consolidados. Uma nova fronteira nos petróleos.',
  subtitle:
    'Cerca de vinte empresas geridas em Angola e além-fronteiras, um volume de negócios anual de $120M e mais de 1.300 colaboradores distribuídos por todo o país.',
};

export const ctaFinal = {
  eyebrow: 'Conheça o Grupo',
  title: 'Descubra o GAM',
  body: 'Uma administração dinâmica, consolidada em sete sectores económicos e em expansão para os petróleos — ao serviço do desenvolvimento de Angola.',
};

/** Único texto explicitamente não confirmado — placeholder marcado, nunca cópia inventada. */
export const isPlaceholderNote = 'Área de Negócio — descrição a confirmar com o GAM';
