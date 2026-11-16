import { PrismaClient, LeadObjective, LeadSource, LeadStatus, PropertyType, MessageSender, MessageChannel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌴 Iniciando seed da Ceará Prime Imóveis S.A. (Fortaleza-CE)...");

  // 1. Corretores Especialistas por Bairro Nobre
  const brokers = await Promise.all([
    prisma.broker.upsert({
      where: { creci: "15423-F" },
      update: {},
      create: {
        name: "Carlos Eduardo",
        creci: "15423-F",
        phone: "5585999110001",
        email: "carlos.eduardo@cearaprime.com.br",
        specialties: ["Meireles", "Beira-Mar"],
        isActive: true,
        lastAssignedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
        calendarId: "carlos.eduardo@cearaprime.com.br",
        avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      },
    }),
    prisma.broker.upsert({
      where: { creci: "18910-F" },
      update: {},
      create: {
        name: "Mariana Vasconcelos",
        creci: "18910-F",
        phone: "5585999110002",
        email: "mariana.vasconcelos@cearaprime.com.br",
        specialties: ["Aldeota", "Dionísio Torres"],
        isActive: true,
        lastAssignedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
        calendarId: "mariana.vasconcelos@cearaprime.com.br",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      },
    }),
    prisma.broker.upsert({
      where: { creci: "21045-F" },
      update: {},
      create: {
        name: "Rafael Aragão",
        creci: "21045-F",
        phone: "5585999110003",
        email: "rafael.aragao@cearaprime.com.br",
        specialties: ["Cocó", "Aldeota"],
        isActive: true,
        lastAssignedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        calendarId: "rafael.aragao@cearaprime.com.br",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      },
    }),
    prisma.broker.upsert({
      where: { creci: "19332-F" },
      update: {},
      create: {
        name: "Juliana Pontes",
        creci: "19332-F",
        phone: "5585999110004",
        email: "juliana.pontes@cearaprime.com.br",
        specialties: ["Meireles", "Dionísio Torres"],
        isActive: true,
        lastAssignedAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
        calendarId: "juliana.pontes@cearaprime.com.br",
        avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      },
    }),
  ]);

  // 2. Portfólio de Imóveis de Alto Padrão em Fortaleza-CE
  const properties = await Promise.all([
    prisma.property.upsert({
      where: { code: "CP-MEI-001" },
      update: {},
      create: {
        code: "CP-MEI-001",
        slug: "apartamento-3-quartos-meireles-vista-mar",
        title: "Apartamento 3 Quartos no Meireles - Vista Mar",
        description:
          "Planta inteligente com varanda gourmet integrada, nascente total, a 200m da Av. Beira-Mar. Lazer completo com piscina borda infinita e academia.",
        type: PropertyType.APARTAMENTO,
        objective: LeadObjective.COMPRAR,
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
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
      },
    }),
    prisma.property.upsert({
      where: { code: "CP-BMA-002" },
      update: {},
      create: {
        code: "CP-BMA-002",
        slug: "cobertura-duplex-frente-mar-beira-mar",
        title: "Cobertura Duplex Frente Mar - Av. Beira-Mar",
        description:
          "Exclusividade absoluta na orla de Fortaleza. Vista panorâmica 180° do oceano, deck privativo com jacuzzi, 4 suítes plenas e 4 vagas.",
        type: PropertyType.COBERTURA,
        objective: LeadObjective.COMPRAR,
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
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
      },
    }),
    prisma.property.upsert({
      where: { code: "CP-ALD-003" },
      update: {},
      create: {
        code: "CP-ALD-003",
        slug: "residencial-praca-portugal-3-suites-aldeota",
        title: "Residencial Praça Portugal - 3 Suítes na Aldeota",
        description:
          "Localização nobre próximo ao Shopping Aldeota e Colégio Christus. Acabamento em mármore, automação residencial e 3 vagas cobertas.",
        type: PropertyType.APARTAMENTO,
        objective: LeadObjective.COMPRAR,
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
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
      },
    }),
    prisma.property.upsert({
      where: { code: "CP-COC-004" },
      update: {},
      create: {
        code: "CP-COC-004",
        slug: "reserva-parque-do-coco-4-suites-alto-padrao",
        title: "Reserva Parque do Cocó - 4 Suítes Alto Padrão",
        description:
          "Vista definitiva para a área verde do Parque Estadual do Cocó. Elevador privativo, pé-direito duplo e clube resort completo.",
        type: PropertyType.APARTAMENTO,
        objective: LeadObjective.COMPRAR,
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
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      },
    }),
    prisma.property.upsert({
      where: { code: "CP-DIO-005" },
      update: {},
      create: {
        code: "CP-DIO-005",
        slug: "apartamento-compacto-luxo-dionisio-torres",
        title: "Apartamento Compacto de Luxo - Dionísio Torres",
        description:
          "Ideal para investimento ou moradia. Próximo à Av. Desembargador Moreira, mobiliado com marcenaria planejada e alta rentabilidade em locação.",
        type: PropertyType.APARTAMENTO,
        objective: LeadObjective.INVESTIR,
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
        imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
      },
    }),
    prisma.property.upsert({
      where: { code: "CP-MEI-006" },
      update: {},
      create: {
        code: "CP-MEI-006",
        slug: "flat-mobiliado-beira-mar-locacao-executiva",
        title: "Flat Mobiliado Beira-Mar para Locação Executiva",
        description:
          "Locação premium no coração do Meireles com serviço de camareira, internet fibra dedicada e vista lateral mar.",
        type: PropertyType.APARTAMENTO,
        objective: LeadObjective.ALUGAR,
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
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
      },
    }),
  ]);

  // 3. Leads de Teste em Diferentes Estágios do Kanban & SLA
  const lead1 = await prisma.lead.upsert({
    where: { phone: "5585988771101" },
    update: {},
    create: {
      name: "Henrique Albuquerque",
      phone: "5585988771101",
      email: "henrique.alb@gmail.com",
      source: LeadSource.META_ADS,
      status: LeadStatus.HANDOFF_PENDING,
      objective: LeadObjective.COMPRAR,
      budgetMin: 800000,
      budgetMax: 1200000,
      preferredNeighborhood: "Meireles",
      score: 92,
      assignedBrokerId: brokers[0].id, // Carlos Eduardo
      handoffAt: new Date(Date.now() - 1000 * 150), // 2m30s atrás -> SLA estourado para demonstração!
      slaBreached: true,
    },
  });

  const lead2 = await prisma.lead.upsert({
    where: { phone: "5585988772202" },
    update: {},
    create: {
      name: "Camila Bezerra",
      phone: "5585988772202",
      email: "camila.bezerra@outlook.com",
      source: LeadSource.ZAP_IMOVEIS,
      status: LeadStatus.VISIT_SCHEDULED,
      objective: LeadObjective.COMPRAR,
      budgetMin: 1200000,
      budgetMax: 2000000,
      preferredNeighborhood: "Cocó",
      score: 95,
      assignedBrokerId: brokers[2].id, // Rafael Aragão
      handoffAt: new Date(Date.now() - 1000 * 60 * 30),
      assumedAt: new Date(Date.now() - 1000 * 60 * 29),
    },
  });

  const lead3 = await prisma.lead.upsert({
    where: { phone: "5585988773303" },
    update: {},
    create: {
      name: "Dr. Marcelo Sampaio",
      phone: "5585988773303",
      source: LeadSource.META_ADS,
      status: LeadStatus.QUALIFYING,
      objective: LeadObjective.INVESTIR,
      budgetMax: 800000,
      preferredNeighborhood: "Dionísio Torres",
      score: 68,
    },
  });

  const lead4 = await prisma.lead.upsert({
    where: { phone: "5585988774404" },
    update: {},
    create: {
      name: "Beatriz Nogueira",
      phone: "5585988774404",
      source: LeadSource.SITE_CHAT,
      status: LeadStatus.NEW,
      score: 35,
    },
  });

  const lead5 = await prisma.lead.upsert({
    where: { phone: "5585988775505" },
    update: {},
    create: {
      name: "Ricardo Fortaleza",
      phone: "5585988775505",
      source: LeadSource.WHATSAPP,
      status: LeadStatus.IN_ATTENDANCE,
      objective: LeadObjective.COMPRAR,
      budgetMin: 2500000,
      budgetMax: 4000000,
      preferredNeighborhood: "Beira-Mar",
      score: 98,
      assignedBrokerId: brokers[0].id,
      handoffAt: new Date(Date.now() - 1000 * 60 * 15),
      assumedAt: new Date(Date.now() - 1000 * 60 * 14),
    },
  });

  // 4. Mensagens Iniciais do Chat para o Lead 1
  const existingMsgs = await prisma.chatMessage.count({ where: { leadId: lead1.id } });
  if (existingMsgs === 0) {
    await prisma.chatMessage.createMany({
      data: [
        {
          leadId: lead1.id,
          sender: MessageSender.AI,
          channel: MessageChannel.WHATSAPP,
          content:
            "Olá, Henrique! Sou a assistente virtual da Ceará Prime Imóveis. Vi seu interesse em imóveis em Fortaleza. Qual o seu principal objetivo hoje?",
        },
        {
          leadId: lead1.id,
          sender: MessageSender.USER,
          channel: MessageChannel.WHATSAPP,
          content: "Quero comprar um apartamento de 3 quartos no Meireles, até R$ 1.2 milhão.",
        },
        {
          leadId: lead1.id,
          sender: MessageSender.AI,
          channel: MessageChannel.WHATSAPP,
          content:
            "Excelente escolha! O Meireles é uma das regiões mais valorizadas de Fortaleza. Separei esta opção exclusiva com vista mar para você:",
          propertyCards: [
            {
              id: properties[0].id,
              code: properties[0].code,
              title: properties[0].title,
              price: properties[0].price,
              neighborhood: properties[0].neighborhood,
              bedrooms: properties[0].bedrooms,
              suites: properties[0].suites,
              areaSqm: properties[0].areaSqm,
              oceanView: properties[0].oceanView,
              imageUrl: properties[0].imageUrl,
            },
          ],
        },
      ],
    });
  }

  // 5. Visita Agendada para Lead 2
  const existingVisits = await prisma.visit.count({ where: { leadId: lead2.id } });
  if (existingVisits === 0) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 30, 0, 0);

    await prisma.visit.create({
      data: {
        leadId: lead2.id,
        propertyId: properties[3].id, // Reserva Parque do Cocó
        brokerId: brokers[2].id, // Rafael Aragão
        scheduledAt: tomorrow,
        googleMapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${properties[3].latitude},${properties[3].longitude}`,
      },
    });
  }

  console.log("✅ Seed concluído com sucesso: 4 corretores, 6 imóveis em Fortaleza e 5 leads.");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
