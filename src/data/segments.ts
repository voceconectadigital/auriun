import type { SegmentItem } from './types'
import { segmentPath } from './types'

export const segments: SegmentItem[] = [
  {
    slug: 'mineracao',
    title: 'Mineração',
    shortTitle: 'Mineração',
    eyebrow: 'Segmentos',
    description:
      'Soluções voltadas a operações que exigem robustez, disponibilidade e suporte a materiais críticos.',
    introduction:
      'A mineração opera sob condições severas, com alta exigência de continuidade e segurança. A Auriun está preparada para apoiar o fornecimento direcionado a manutenção, utilidades e infraestrutura técnica dessas operações.\n\nO atendimento considera a criticidade dos itens e a necessidade de respostas objetivas para demandas de campo e de projeto.',
    context:
      'Plantas e frentes de mineração dependem de energia, automação, instrumentação e suprimentos de MRO para manter a disponibilidade dos ativos. Ambientes agressivos e ritmos operacionais intensos elevam o custo da falta de material.',
    challenges: [
      'Ambientes severos e desgaste acelerado de ativos',
      'Necessidade de continuidade em operações críticas',
      'Materiais especiais e de reposição difícil',
      'Coordenação entre manutenção, engenharia e compras',
    ],
    support: [
      'Fornecimento de materiais elétricos e de infraestrutura',
      'Apoio a automação e instrumentação de processo',
      'Sourcing para itens críticos e especiais',
      'Organização de demandas MRO, CAPEX e OPEX',
    ],
    image: '/images/segmentos/mineracao-900x900.webp',
    imageAlt:
      'Operação de mineração com equipamentos de grande porte e infraestrutura de processamento',
    cardImageAlt: 'Soluções industriais para operações de mineração',
    imageObjectPosition: {
      hero: 'center center',
      card: '42% 48%',
      panel: '68% 52%',
      mobile: '62% 48%',
    },
    relatedProducts: [
      'materiais-eletricos',
      'automacao-industrial',
      'instrumentacao-industrial',
      'mro-capex-e-opex',
      'ferramentas-epis-e-epcs',
    ],
    relatedServices: [
      'strategic-sourcing',
      'materiais-especiais-e-importados',
      'supply-chain-management',
      'projetos-greenfield-e-brownfield',
    ],
    benefits: [
      'Atendimento alinhado à criticidade operacional',
      'Portfólio aplicável a diferentes etapas da operação',
      'Apoio consultivo em especificações de campo',
      'Visão de continuidade — não apenas do item isolado',
    ],
    seoTitle: 'Soluções para mineração',
    seoDescription:
      'Fornecimento industrial para mineração: elétrica, automação, instrumentação, MRO e materiais críticos com atendimento consultivo.',
  },
  {
    slug: 'oleo-e-gas',
    title: 'Óleo e gás',
    shortTitle: 'Óleo e gás',
    eyebrow: 'Segmentos',
    description:
      'Fornecimento direcionado a operações que exigem confiabilidade, rastreabilidade e rigor técnico.',
    introduction:
      'O setor de óleo e gás demanda materiais e soluções com elevado rigor técnico. A Auriun apoia compras e engenharia com fornecimento orientado à especificação e ao contexto de operações críticas.\n\nSem apresentar garantias que não possam ser comprovadas, o foco é estruturar alternativas aderentes ao escopo informado.',
    context:
      'Exploração, produção, refino e infraestrutura associada dependem de instrumentação, elétrica, automação e suprimentos especiais. A rastreabilidade da especificação e a confiabilidade do fornecimento são critérios centrais.',
    challenges: [
      'Requisitos técnicos restritivos',
      'Operações críticas com baixo tolerância a falhas de abastecimento',
      'Necessidade de materiais especiais e importados',
      'Integração entre projetos e manutenção',
    ],
    support: [
      'Instrumentação e automação aplicáveis ao setor',
      'Materiais elétricos e de conectividade',
      'Localização de itens especiais',
      'Apoio a sourcing e projetos de expansão',
    ],
    image: '/images/segmentos/oleo-e-gas.webp',
    imageAlt: 'Ambiente ilustrativo do setor de óleo e gás',
    relatedProducts: [
      'instrumentacao-industrial',
      'automacao-industrial',
      'materiais-eletricos',
      'componentes-eletronicos',
      'mro-capex-e-opex',
    ],
    relatedServices: [
      'materiais-especiais-e-importados',
      'desenvolvimento-de-fornecedores',
      'strategic-sourcing',
      'consultoria-tecnica-e-comercial',
    ],
    benefits: [
      'Leitura cuidadosa da especificação',
      'Apoio a demandas de alta criticidade',
      'Rede ampliada para itens especiais',
      'Comunicação técnica e comercial alinhada',
    ],
    seoTitle: 'Soluções para óleo e gás',
    seoDescription:
      'Soluções industriais para óleo e gás com foco em confiabilidade, instrumentação, elétrica e materiais especiais.',
  },
  {
    slug: 'papel-e-celulose',
    title: 'Papel e celulose',
    shortTitle: 'Papel e celulose',
    eyebrow: 'Segmentos',
    description:
      'Soluções para continuidade produtiva, automação, instrumentação e manutenção industrial.',
    introduction:
      'Plantas de papel e celulose operam em regime contínuo, onde paradas não planejadas têm alto impacto. A Auriun está preparada para apoiar o fornecimento de materiais e soluções que sustentam manutenção e modernização desses processos.\n\nO atendimento combina visão de MRO com suporte a projetos de melhoria e expansão.',
    context:
      'Processos contínuos, utilidades e sistemas de controle exigem disponibilidade de componentes elétricos, de automação e de instrumentação, além de suprimentos recorrentes de manutenção.',
    challenges: [
      'Continuidade produtiva em processos 24/7',
      'Integração entre utilidades e linha de processo',
      'Modernização de sistemas de controle',
      'Gestão de itens críticos de reposição',
    ],
    support: [
      'Automação e instrumentação de processo',
      'Materiais elétricos e de infraestrutura',
      'Gestão estratégica de suprimentos de manutenção',
      'Apoio a projetos brownfield',
    ],
    image: '/images/segmentos/papel-e-celulose.webp',
    imageAlt: 'Ambiente ilustrativo do setor de papel e celulose',
    relatedProducts: [
      'automacao-industrial',
      'instrumentacao-industrial',
      'materiais-eletricos',
      'mro-capex-e-opex',
      'climatizacao-industrial',
    ],
    relatedServices: [
      'gestao-estrategica-de-suprimentos',
      'supply-chain-management',
      'projetos-greenfield-e-brownfield',
      'consultoria-tecnica-e-comercial',
    ],
    benefits: [
      'Foco em continuidade de processo',
      'Suporte a manutenção e modernização',
      'Portfólio alinhado a utilidades e controle',
      'Atendimento consultivo multidisciplinar',
    ],
    seoTitle: 'Soluções para papel e celulose',
    seoDescription:
      'Fornecimento industrial para papel e celulose: automação, instrumentação, elétrica e suprimentos para continuidade produtiva.',
  },
  {
    slug: 'siderurgia',
    title: 'Siderurgia',
    shortTitle: 'Siderurgia',
    eyebrow: 'Segmentos',
    description:
      'Apoio a plantas siderúrgicas com foco em energia, automação e ambientes operacionais agressivos.',
    introduction:
      'A siderurgia combina altas temperaturas, ambientes agressivos e elevada demanda energética. A Auriun apoia o fornecimento de soluções elétricas, de automação e de manutenção direcionadas a esse contexto.\n\nO portfólio aplica-se a diferentes frentes da planta, sempre a partir da especificação e da criticidade informadas.',
    context:
      'Áreas de redução, aciaria, laminação e utilidades exigem infraestrutura robusta, controle de processo e disponibilidade de materiais para manutenção corretiva e preventiva.',
    challenges: [
      'Ambientes agressivos e alta temperatura',
      'Demanda intensa de energia e proteção elétrica',
      'Automação de processos pesados',
      'Itens críticos com impacto direto na produção',
    ],
    support: [
      'Materiais elétricos e de proteção',
      'Automação e instrumentação aplicáveis',
      'Suprimentos MRO e materiais especiais',
      'Sourcing para categorias de alta criticidade',
    ],
    image: '/images/segmentos/siderurgia.webp',
    imageAlt: 'Ambiente ilustrativo do setor siderúrgico',
    relatedProducts: [
      'materiais-eletricos',
      'automacao-industrial',
      'instrumentacao-industrial',
      'mro-capex-e-opex',
      'ferramentas-epis-e-epcs',
    ],
    relatedServices: [
      'strategic-sourcing',
      'materiais-especiais-e-importados',
      'gestao-estrategica-de-suprimentos',
      'supply-chain-management',
    ],
    benefits: [
      'Fornecimento alinhado a ambientes severos',
      'Apoio a energia, automação e manutenção',
      'Atenção a itens críticos de planta',
      'Comunicação objetiva com áreas técnicas',
    ],
    seoTitle: 'Soluções para siderurgia',
    seoDescription:
      'Soluções industriais para siderurgia: elétrica, automação, instrumentação e MRO para ambientes de alta exigência.',
  },
  {
    slug: 'energia',
    title: 'Energia',
    shortTitle: 'Energia',
    eyebrow: 'Segmentos',
    description:
      'Soluções elétricas e de infraestrutura para distribuição, controle e conectividade energética.',
    introduction:
      'O setor de energia exige infraestrutura confiável de distribuição, proteção e controle. A Auriun está preparada para apoiar o fornecimento de materiais elétricos, cabos, automação e TI aplicados a empreendimentos e operações energéticas.\n\nO atendimento cobre tanto demandas de manutenção quanto de projetos de expansão.',
    context:
      'Geração, transmissão, distribuição e infraestrutura associada dependem de componentes elétricos, sistemas de controle e conectividade para garantir operação estável e monitorada.',
    challenges: [
      'Disponibilidade de materiais para infraestrutura elétrica',
      'Integração entre proteção, controle e comunicação',
      'Projetos com listas técnicas extensas',
      'Necessidade de continuidade em ativos críticos',
    ],
    support: [
      'Materiais elétricos e cabos',
      'Automação e instrumentação',
      'Climatização de salas técnicas',
      'Apoio a projetos greenfield e brownfield',
    ],
    image: '/images/segmentos/energia.webp',
    imageAlt: 'Infraestrutura energética ilustrativa',
    relatedProducts: [
      'materiais-eletricos',
      'cabos-e-conectividade',
      'automacao-industrial',
      'climatizacao-industrial',
      'tecnologia-da-informacao',
    ],
    relatedServices: [
      'projetos-greenfield-e-brownfield',
      'consultoria-tecnica-e-comercial',
      'strategic-sourcing',
      'gestao-estrategica-de-suprimentos',
    ],
    benefits: [
      'Portfólio alinhado a infraestrutura energética',
      'Suporte a projetos e operação',
      'Leitura técnica de especificações elétricas',
      'Integração entre produtos e serviços',
    ],
    seoTitle: 'Soluções para o setor de energia',
    seoDescription:
      'Fornecimento para o setor de energia: materiais elétricos, cabos, automação e infraestrutura técnica.',
  },
  {
    slug: 'saneamento',
    title: 'Saneamento',
    shortTitle: 'Saneamento',
    eyebrow: 'Segmentos',
    description:
      'Fornecimento para estações, redes e operações com bombeamento, painéis, instrumentação e controle.',
    introduction:
      'Operações de saneamento dependem de bombeamento, painéis elétricos, instrumentação e manutenção contínua. A Auriun apoia o fornecimento direcionado a ETA, ETE, redes e utilidades associadas.\n\nO foco é disponibilidade de materiais e clareza técnica na montagem do escopo de compra.',
    context:
      'Estações de tratamento e sistemas de distribuição exigem controle de processo, proteção elétrica e suprimentos para manutenção de bombas, painéis e instrumentos de campo.',
    challenges: [
      'Continuidade de bombeamento e tratamento',
      'Instrumentação de vazão, nível e qualidade',
      'Painéis e infraestrutura elétrica em campo',
      'Suprimentos para manutenção preventiva e corretiva',
    ],
    support: [
      'Instrumentação e automação',
      'Materiais elétricos e cabos',
      'Ferramentas e EPIs para equipes de campo',
      'Gestão de suprimentos de manutenção',
    ],
    image: '/images/segmentos/saneamento-900x900.webp',
    imageAlt: 'Ambiente ilustrativo de infraestrutura de saneamento',
    relatedProducts: [
      'instrumentacao-industrial',
      'automacao-industrial',
      'materiais-eletricos',
      'cabos-e-conectividade',
      'ferramentas-epis-e-epcs',
    ],
    relatedServices: [
      'gestao-estrategica-de-suprimentos',
      'supply-chain-management',
      'consultoria-tecnica-e-comercial',
      'projetos-greenfield-e-brownfield',
    ],
    benefits: [
      'Apoio a operação e manutenção de estações',
      'Portfólio aplicável a painéis e campo',
      'Atendimento a listas técnicas de utilidades',
      'Visão de continuidade do serviço público e industrial',
    ],
    seoTitle: 'Soluções para saneamento',
    seoDescription:
      'Soluções industriais para saneamento: instrumentação, automação, elétrica e suprimentos para estações e redes.',
  },
  {
    slug: 'infraestrutura',
    title: 'Infraestrutura',
    shortTitle: 'Infraestrutura',
    eyebrow: 'Segmentos',
    description:
      'Materiais e soluções para obras e empreendimentos de infraestrutura industrial e civil associada.',
    introduction:
      'Empreendimentos de infraestrutura demandam fornecimento multidisciplinar e coordenação de prazos. A Auriun está preparada para apoiar listas técnicas de elétrica, conectividade, climatização e suprimentos de obra.\n\nO atendimento considera tanto a fase de implantação quanto a transição para operação.',
    context:
      'Obras e utilidades de grande porte exigem materiais elétricos, cabos, equipamentos de proteção e soluções de suporte à montagem e ao comissionamento.',
    challenges: [
      'Listas extensas e multidisciplinares',
      'Compatibilidade entre especificação e disponibilidade',
      'Cronogramas de obra pressionando o suprimento',
      'Transição entre implantação e operação',
    ],
    support: [
      'Cabos, elétrica e conectividade',
      'Ferramentas, EPIs e EPCs',
      'Climatização e TI quando aplicável',
      'Apoio a projetos greenfield',
    ],
    image: '/images/segmentos/infraestrutura.webp',
    imageAlt: 'Obra e infraestrutura industrial ilustrativas',
    relatedProducts: [
      'cabos-e-conectividade',
      'materiais-eletricos',
      'ferramentas-epis-e-epcs',
      'climatizacao-industrial',
      'tecnologia-da-informacao',
    ],
    relatedServices: [
      'projetos-greenfield-e-brownfield',
      'supply-chain-management',
      'consultoria-tecnica-e-comercial',
      'strategic-sourcing',
    ],
    benefits: [
      'Fornecimento alinhado a fases de obra',
      'Organização de escopos multidisciplinares',
      'Apoio a implantação e start-up',
      'Integração com serviços de projeto',
    ],
    seoTitle: 'Soluções para infraestrutura',
    seoDescription:
      'Fornecimento industrial para infraestrutura: elétrica, cabos, proteção e suporte a obras e empreendimentos.',
  },
  {
    slug: 'construcao-industrial',
    title: 'Construção industrial',
    shortTitle: 'Construção industrial',
    eyebrow: 'Segmentos',
    description:
      'Suporte a montagens, expansões e projetos de construção em ambiente industrial.',
    introduction:
      'A construção industrial combina cronograma de obra com exigências técnicas de planta. A Auriun apoia o fornecimento de materiais elétricos, cabos, EPIs e soluções complementares para montagem e expansão.\n\nO objetivo é facilitar a execução do escopo com clareza comercial e aderência técnica.',
    context:
      'Montagens eletromecânicas, ampliações de galpões e utilidades industriais dependem de suprimentos coordenados entre engenharia de obra e operação futura da planta.',
    challenges: [
      'Interface entre construção e operação',
      'Demandas simultâneas de campo e projeto',
      'Segurança e proteção das equipes de montagem',
      'Disponibilidade de materiais no ritmo da obra',
    ],
    support: [
      'Materiais elétricos e cabos',
      'Ferramentas, EPIs e EPCs',
      'Consultoria técnico-comercial de escopo',
      'Apoio a projetos brownfield e greenfield',
    ],
    image: '/images/segmentos/construcao-industrial.webp',
    imageAlt: 'Construção e montagem industrial ilustrativas',
    relatedProducts: [
      'materiais-eletricos',
      'cabos-e-conectividade',
      'ferramentas-epis-e-epcs',
      'climatizacao-industrial',
      'mro-capex-e-opex',
    ],
    relatedServices: [
      'projetos-greenfield-e-brownfield',
      'consultoria-tecnica-e-comercial',
      'gestao-estrategica-de-suprimentos',
      'supply-chain-management',
    ],
    benefits: [
      'Apoio a montagem e expansão industrial',
      'Suprimentos para campo e projeto',
      'Atenção a segurança e proteção',
      'Transição mais clara para a operação',
    ],
    seoTitle: 'Soluções para construção industrial',
    seoDescription:
      'Materiais e serviços para construção industrial: elétrica, cabos, EPIs e suporte a montagens e expansões.',
  },
  {
    slug: 'manufatura',
    title: 'Manufatura',
    shortTitle: 'Manufatura',
    eyebrow: 'Segmentos',
    description:
      'Automação, elétrica e MRO para plantas fabris de diferentes portes e processos.',
    introduction:
      'Plantas de manufatura precisam equilibrar produtividade, manutenção e modernização. A Auriun oferece fornecimento aplicável a linhas produtivas, utilidades e áreas de engenharia.\n\nO atendimento cobre desde reposição de componentes até suporte a projetos de melhoria.',
    context:
      'Ambientes fabris combinam automação de máquinas, infraestrutura elétrica, TI e suprimentos recorrentes de MRO para sustentar OEE e planos de manutenção.',
    challenges: [
      'Paradas por falta de componentes de reposição',
      'Modernização de automação e controles',
      'Integração entre chão de fábrica e TI',
      'Gestão de categorias MRO e OPEX',
    ],
    support: [
      'Automação, elétrica e instrumentação',
      'Componentes eletrônicos e TI',
      'Suprimentos MRO/CAPEX/OPEX',
      'Consultoria técnico-comercial',
    ],
    image: '/images/segmentos/manufatura.webp',
    imageAlt: 'Ambiente ilustrativo de manufatura industrial',
    relatedProducts: [
      'automacao-industrial',
      'materiais-eletricos',
      'componentes-eletronicos',
      'tecnologia-da-informacao',
      'mro-capex-e-opex',
    ],
    relatedServices: [
      'consultoria-tecnica-e-comercial',
      'gestao-estrategica-de-suprimentos',
      'strategic-sourcing',
      'projetos-greenfield-e-brownfield',
    ],
    benefits: [
      'Portfólio alinhado a chão de fábrica',
      'Apoio a manutenção e melhoria contínua',
      'Integração entre automação e TI',
      'Atendimento consultivo para compras industriais',
    ],
    seoTitle: 'Soluções para manufatura',
    seoDescription:
      'Soluções para manufatura industrial: automação, elétrica, TI e MRO com atendimento consultivo.',
  },
  {
    slug: 'agronegocio',
    title: 'Agronegócio',
    shortTitle: 'Agronegócio',
    eyebrow: 'Segmentos',
    description:
      'Soluções para processamento, armazenagem, automação e infraestrutura elétrica agroindustrial.',
    introduction:
      'O agronegócio industrial combina sazonalidade, armazenagem e processamento com forte dependência de energia e automação. A Auriun está preparada para apoiar o fornecimento voltado a plantas agroindustriais e operações de suporte.\n\nO foco é infraestrutura técnica e continuidade nas etapas críticas da cadeia.',
    context:
      'Unidades de processamento, silos, secagem, refrigeração e utilidades exigem elétrica, automação, instrumentação e suprimentos de manutenção alinhados ao calendário operacional.',
    challenges: [
      'Janelas operacionais sazonais',
      'Infraestrutura elétrica e de automação em campo',
      'Armazenagem e processamento contínuos',
      'Manutenção preventiva antes de picos de safra',
    ],
    support: [
      'Automação e instrumentação',
      'Materiais elétricos e cabos',
      'TI e climatização quando aplicável',
      'Supply chain para demandas sazonais',
    ],
    image: '/images/segmentos/agronegocio.webp',
    imageAlt: 'Ambiente ilustrativo de operação agroindustrial',
    relatedProducts: [
      'automacao-industrial',
      'materiais-eletricos',
      'instrumentacao-industrial',
      'cabos-e-conectividade',
      'tecnologia-da-informacao',
    ],
    relatedServices: [
      'supply-chain-management',
      'consultoria-tecnica-e-comercial',
      'gestao-estrategica-de-suprimentos',
      'projetos-greenfield-e-brownfield',
    ],
    benefits: [
      'Fornecimento alinhado a operações agroindustriais',
      'Apoio a infraestrutura de processamento e armazenagem',
      'Atenção a janelas sazonais de demanda',
      'Integração entre automação e elétrica',
    ],
    seoTitle: 'Soluções para agronegócio',
    seoDescription:
      'Soluções industriais para agronegócio: automação, elétrica, instrumentação e infraestrutura para processamento e armazenagem.',
  },
  {
    slug: 'quimica-e-petroquimica',
    title: 'Química e petroquímica',
    shortTitle: 'Química e petroquímica',
    eyebrow: 'Segmentos',
    description:
      'Fornecimento técnico para processos que demandam confiabilidade e especificação rigorosa.',
    introduction:
      'A química e a petroquímica operam com processos sensíveis, requisitos de segurança e elevada exigência de especificação. A Auriun apoia o fornecimento de instrumentação, automação, elétrica e materiais especiais nesse contexto.\n\nO atendimento prioriza aderência técnica e clareza comercial na montagem das alternativas.',
    context:
      'Unidades de processo contínuo dependem de laços de controle, proteção elétrica, materiais especiais e uma cadeia de suprimentos preparada para itens de baixa disponibilidade.',
    challenges: [
      'Especificações rigorosas e baixa tolerância a desvios',
      'Instrumentação e automação de processo crítico',
      'Materiais especiais e importados',
      'Integração entre manutenção e projetos de melhoria',
    ],
    support: [
      'Instrumentação e automação',
      'Materiais elétricos e componentes',
      'Localização de itens especiais',
      'Desenvolvimento de fornecedores e sourcing',
    ],
    image: '/images/segmentos/quimica-e-petroquimica-900x900.webp',
    imageAlt: 'Ambiente ilustrativo do setor químico e petroquímico',
    relatedProducts: [
      'instrumentacao-industrial',
      'automacao-industrial',
      'materiais-eletricos',
      'componentes-eletronicos',
      'mro-capex-e-opex',
    ],
    relatedServices: [
      'materiais-especiais-e-importados',
      'desenvolvimento-de-fornecedores',
      'strategic-sourcing',
      'consultoria-tecnica-e-comercial',
    ],
    benefits: [
      'Atenção a especificação e criticidade',
      'Apoio a processos contínuos',
      'Rede para materiais de difícil aquisição',
      'Linguagem alinhada a engenharia e compras',
    ],
    seoTitle: 'Soluções para química e petroquímica',
    seoDescription:
      'Fornecimento industrial para química e petroquímica: instrumentação, automação, elétrica e materiais especiais.',
  },
]

export function getSegmentBySlug(slug: string): SegmentItem | undefined {
  return segments.find((item) => item.slug === slug)
}

export function getAllSegmentSlugs(): string[] {
  return segments.map((item) => item.slug)
}

/** Related-card payload drawn entirely from the central segment object. */
export function toSegmentRelatedCard(segment: SegmentItem) {
  return {
    title: segment.title,
    description: segment.description,
    to: segmentPath(segment.slug),
    image: segment.image,
    imageAlt: segment.cardImageAlt ?? segment.imageAlt,
    imageObjectPosition: segment.imageObjectPosition?.card,
    imageObjectPositionMobile:
      segment.imageObjectPosition?.mobile ?? segment.imageObjectPosition?.card,
  }
}

export { segmentPath }
