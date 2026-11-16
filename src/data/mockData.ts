import type {
  BrokerSummary,
  LeadCardData,
  NeighborhoodItem,
  PropertyCardData,
} from "@/types/realestate";

export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiMwQTFGNDQiLz48L3N2Zz4=";

export const HERO_BEIRA_MAR_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80";

export const MOCK_BROKERS: BrokerSummary[] = [
  {
    id: "b1",
    name: "Carlos Eduardo",
    creci: "15423-F",
    online: true,
    specialties: ["Meireles", "Beira-Mar"],
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "b2",
    name: "Mariana Vasconcelos",
    creci: "18910-F",
    online: true,
    specialties: ["Aldeota", "Dionísio Torres"],
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "b3",
    name: "Rafael Aragão",
    creci: "21045-F",
    online: true,
    specialties: ["Cocó", "Aldeota"],
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "b4",
    name: "Juliana Pontes",
    creci: "19332-F",
    online: true,
    specialties: ["Meireles", "Dionísio Torres"],
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
];

export const NEIGHBORHOOD_ITEMS: NeighborhoodItem[] = [
  {
    name: "TODOS",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Meireles",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Aldeota",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Cocó",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Dionísio Torres",
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Beira-Mar",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=120&q=80",
  },
];

export const MOCK_PROPERTIES: PropertyCardData[] = [
  {
    id: "prop-mei-001",
    code: "CP-MEI-001",
    slug: "apartamento-3-quartos-meireles-vista-mar",
    title: "Apartamento 3 Quartos no Meireles - Vista Mar",
    description:
      "Planta inteligente com varanda gourmet integrada, nascente total, a 200m da Av. Beira-Mar. Lazer completo com piscina borda infinita e academia.",
    price: 950000,
    neighborhood: "Meireles",
    address: "Rua Silva Jatahy, 850 - Meireles, Fortaleza - CE",
    latitude: -3.7269,
    longitude: -38.4978,
    bedrooms: 3,
    suites: 2,
    parkingSpots: 2,
    areaSqm: 118,
    oceanView: true,
    objective: "COMPRAR",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prop-bma-002",
    code: "CP-BMA-002",
    slug: "cobertura-duplex-frente-mar-beira-mar",
    title: "Cobertura Duplex Frente Mar - Av. Beira-Mar",
    description:
      "Exclusividade absoluta na orla de Fortaleza. Vista panorâmica 180° do oceano, deck privativo com jacuzzi, 4 suítes plenas e 4 vagas.",
    price: 3450000,
    neighborhood: "Beira-Mar",
    address: "Av. Beira-Mar, 3680 - Meireles, Fortaleza - CE",
    latitude: -3.7244,
    longitude: -38.4912,
    bedrooms: 4,
    suites: 4,
    parkingSpots: 4,
    areaSqm: 310,
    oceanView: true,
    objective: "COMPRAR",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prop-ald-003",
    code: "CP-ALD-003",
    slug: "residencial-praca-portugal-3-suites-aldeota",
    title: "Residencial Praça Portugal - 3 Suítes na Aldeota",
    description:
      "Localização nobre próximo ao Shopping Aldeota e Colégio Christus. Acabamento em mármore, automação residencial e 3 vagas cobertas.",
    price: 1280000,
    neighborhood: "Aldeota",
    address: "Rua Marcos Macêdo, 1120 - Aldeota, Fortaleza - CE",
    latitude: -3.7351,
    longitude: -38.5015,
    bedrooms: 3,
    suites: 3,
    parkingSpots: 3,
    areaSqm: 145,
    oceanView: false,
    objective: "COMPRAR",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prop-coc-004",
    code: "CP-COC-004",
    slug: "reserva-parque-do-coco-4-suites-alto-padrao",
    title: "Reserva Parque do Cocó - 4 Suítes Alto Padrão",
    description:
      "Vista definitiva para a área verde do Parque Estadual do Cocó. Elevador privativo, pé-direito duplo e clube resort completo.",
    price: 1850000,
    neighborhood: "Cocó",
    address: "Rua Bento Albuquerque, 2200 - Cocó, Fortaleza - CE",
    latitude: -3.7488,
    longitude: -38.4819,
    bedrooms: 4,
    suites: 4,
    parkingSpots: 3,
    areaSqm: 212,
    oceanView: false,
    objective: "COMPRAR",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prop-dio-005",
    code: "CP-DIO-005",
    slug: "apartamento-compacto-luxo-dionisio-torres",
    title: "Apartamento Compacto de Luxo - Dionísio Torres",
    description:
      "Ideal para investimento ou moradia. Próximo à Av. Desembargador Moreira, mobiliado com marcenaria planejada e alta rentabilidade.",
    price: 690000,
    neighborhood: "Dionísio Torres",
    address: "Rua Joaquim Nabuco, 2800 - Dionísio Torres, Fortaleza - CE",
    latitude: -3.7459,
    longitude: -38.5047,
    bedrooms: 2,
    suites: 2,
    parkingSpots: 2,
    areaSqm: 78,
    oceanView: false,
    objective: "INVESTIR",
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prop-mei-006",
    code: "CP-MEI-006",
    slug: "flat-mobiliado-beira-mar-locacao-executiva",
    title: "Flat Mobiliado Beira-Mar para Locação Executiva",
    description:
      "Locação premium no coração do Meireles com serviço de camareira, internet fibra dedicada e vista lateral mar.",
    price: 6500,
    neighborhood: "Meireles",
    address: "Av. Abolição, 2900 - Meireles, Fortaleza - CE",
    latitude: -3.7279,
    longitude: -38.4941,
    bedrooms: 2,
    suites: 1,
    parkingSpots: 1,
    areaSqm: 68,
    oceanView: true,
    objective: "ALUGAR",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export const NEIGHBORHOOD_GUIDES = [
  {
    name: "Meireles",
    description: "Gastronomia, calçadão da Beira-Mar e altíssima liquidez.",
    avgPrice: "R$ 900 mil – R$ 3,2 mi",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Beira-Mar",
    description: "Frente mar definitiva com vista panorâmica do Atlântico.",
    avgPrice: "R$ 2,2 mi – R$ 6,5 mi",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Aldeota",
    description: "Eixo empresarial, escolas tradicionais e praças arborizadas.",
    avgPrice: "R$ 850 mil – R$ 2,4 mi",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cocó",
    description: "Condomínios-clube com vista permanente para o Parque do Cocó.",
    avgPrice: "R$ 1,3 mi – R$ 3,8 mi",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dionísio Torres",
    description: "Tranquilidade residencial a minutos da Desembargador Moreira.",
    avgPrice: "R$ 650 mil – R$ 1,7 mi",
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
];

// CONTEÚDO FICTÍCIO DE DEMONSTRAÇÃO
export const DEMO_TESTIMONIALS = [
  {
    id: "t1",
    name: "Fernanda & Lucas Mendes (Demonstração)",
    neighborhood: "Meireles",
    quote:
      "Fomos atendidos pelo WhatsApp em segundos, recebemos 3 plantas perfeitas no Meireles e visitamos no dia seguinte com o Carlos Eduardo.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "t2",
    name: "Dr. Eduardo Cavalcante (Demonstração)",
    neighborhood: "Cocó",
    quote:
      "A agilidade na confirmação da visita e a transparência na documentação fizeram toda a diferença na compra do nosso 4 suítes no Cocó.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "t3",
    name: "Patrícia Vasconcelos (Demonstração)",
    neighborhood: "Aldeota",
    quote:
      "Buscava um apartamento compacto para rentabilidade em locação executiva. O Concierge IA filtrou exatamente o que cabia no meu orçamento.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    q: "Como funciona o atendimento instantâneo da Ceará Prime?",
    a: "Assim que você envia seus critérios pelo formulário ou Concierge IA, nossa automação consulta o portfólio atualizado em Fortaleza e envia opções compatíveis em segundos no seu WhatsApp.",
  },
  {
    q: "Quais formas de financiamento e pagamento são aceitas?",
    a: "Trabalhamos com financiamento bancário (Itaú, Bradesco, Santander, Caixa), consórcios contemplados, FGTS e pagamento à vista com assessoria jurídica completa.",
  },
  {
    q: "Como agendar uma visita presencial com segurança?",
    a: "Você escolhe o imóvel e um dos 3 horários disponíveis do corretor especialista no bairro. Enviamos confirmação em 1 clique e rota exata no Google Maps.",
  },
  {
    q: "Vocês atuam com locação executiva e gestão patrimonial?",
    a: "Sim. Temos uma carteira selecionada de flats e apartamentos mobiliados no Meireles, Beira-Mar e Aldeota, além de assessoria para investidores.",
  },
];

export const MOCK_LEADS: LeadCardData[] = [
  {
    id: "demo-1",
    name: "Henrique Albuquerque",
    phone: "5585988771101",
    source: "META_ADS",
    status: "QUALIFIED",
    objective: "COMPRAR",
    budgetMax: 950000,
    preferredNeighborhood: "Meireles",
    propertyTitle: "Apartamento 3 Quartos - Vista Mar",
    propertyThumbnail: MOCK_PROPERTIES[0].imageUrl,
    score: 92,
    slaBreached: true,
    handoffAt: new Date(Date.now() - 1000 * 134).toISOString(), // 2m 14s atrás
    assignedBroker: MOCK_BROKERS[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Camila Bezerra",
    phone: "5585988772202",
    source: "ZAP_IMOVEIS",
    status: "VISIT_SCHEDULED",
    objective: "COMPRAR",
    budgetMax: 1850000,
    preferredNeighborhood: "Cocó",
    propertyTitle: "Reserva Parque do Cocó - 4 Suítes",
    propertyThumbnail: MOCK_PROPERTIES[3].imageUrl,
    score: 95,
    slaBreached: false,
    handoffAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    assumedAt: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
    assignedBroker: MOCK_BROKERS[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-3",
    name: "Dr. Marcelo Sampaio",
    phone: "5585988773303",
    source: "META_ADS",
    status: "PROPOSAL",
    objective: "INVESTIR",
    budgetMax: 690000,
    preferredNeighborhood: "Dionísio Torres",
    propertyTitle: "Compacto de Luxo - Dionísio Torres",
    propertyThumbnail: MOCK_PROPERTIES[4].imageUrl,
    score: 88,
    slaBreached: false,
    handoffAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    assumedAt: new Date(Date.now() - 1000 * 60 * 119).toISOString(),
    assignedBroker: MOCK_BROKERS[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-4",
    name: "Beatriz Nogueira",
    phone: "5585988774404",
    source: "SITE_CHAT",
    status: "NEW",
    score: 38,
    slaBreached: false,
    createdAt: new Date(Date.now() - 1000 * 45).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-5",
    name: "Ricardo Fortaleza",
    phone: "5585988775505",
    source: "WHATSAPP",
    status: "CLOSED_WON",
    objective: "COMPRAR",
    budgetMax: 3450000,
    preferredNeighborhood: "Beira-Mar",
    propertyTitle: "Cobertura Duplex Frente Mar",
    propertyThumbnail: MOCK_PROPERTIES[1].imageUrl,
    score: 98,
    slaBreached: false,
    handoffAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    assumedAt: new Date(Date.now() - 1000 * 60 * 60 * 5 + 30000).toISOString(),
    assignedBroker: MOCK_BROKERS[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
