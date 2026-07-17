import type { ProductItem } from './types'
import { productPath } from './types'

export const products: ProductItem[] = [
  {
    slug: 'materiais-eletricos',
    title: 'Materiais elétricos',
    shortTitle: 'Elétrica',
    eyebrow: 'Produtos',
    description:
      'Linhas de baixa, média e alta tensão para distribuição, proteção e infraestrutura elétrica industrial.',
    introduction:
      'A Auriun está preparada para apoiar demandas de materiais elétricos voltadas a instalações industriais, salas elétricas e infraestrutura de energia. O fornecimento é orientado pela especificação técnica e pelo contexto operacional de cada solicitação.\n\nAtendemos necessidades de reposição, modernização e projetos, com leitura consultiva da aplicação para orientar alternativas compatíveis com o escopo apresentado.',
    image: '/images/produtos/produto-materiais-eletricos.jpg',
    imageAlt: 'Infraestrutura elétrica industrial ilustrativa',
    applications: [
      'Quadros e painéis de distribuição',
      'Proteção e seccionamento',
      'Instalações industriais e salas elétricas',
      'Expansão e modernização de redes internas',
      'Suprimento para manutenção elétrica',
    ],
    solutionGroups: [
      'Dispositivos de proteção e comando',
      'Componentes para distribuição de energia',
      'Acessórios para instalação e montagem',
      'Materiais para infraestrutura elétrica',
      'Itens para reposição e manutenção',
    ],
    benefits: [
      'Orientação técnica na leitura da especificação',
      'Alternativas multimarcas conforme disponibilidade',
      'Apoio a demandas de MRO e de projetos',
      'Foco em continuidade da infraestrutura elétrica',
    ],
    relatedSegments: ['mineracao', 'siderurgia', 'energia', 'manufatura', 'construcao-industrial'],
    relatedServices: ['consultoria-tecnica-e-comercial', 'materiais-especiais-e-importados', 'strategic-sourcing'],
    seoTitle: 'Materiais elétricos industriais',
    seoDescription:
      'Fornecimento de materiais elétricos para baixa, média e alta tensão com atendimento consultivo para indústria, manutenção e projetos.',
  },
  {
    slug: 'automacao-industrial',
    title: 'Automação industrial',
    shortTitle: 'Automação',
    eyebrow: 'Produtos',
    description:
      'Componentes e sistemas de controle para processos produtivos mais estáveis e monitorados.',
    introduction:
      'Soluções de automação voltadas às necessidades de plantas que buscam maior controle, rastreabilidade e estabilidade de processo. A Auriun apoia a identificação de componentes compatíveis com o ambiente industrial e com o escopo técnico informado.\n\nO atendimento considera integração com painéis, acionamentos e arquiteturas de controle já existentes, sem pressupor padronização única para todos os projetos.',
    image: '/images/produtos/produto-automacao-industrial.jpg',
    imageAlt: 'Ambiente ilustrativo de automação e controle industrial',
    applications: [
      'Controle de processos e linhas produtivas',
      'Painéis de automação e I/O remoto',
      'Acionamentos e monitoramento de máquinas',
      'Modernização de sistemas legados',
      'Integração com instrumentação de campo',
    ],
    solutionGroups: [
      'Controladores e módulos de I/O',
      'Interfaces homem-máquina',
      'Dispositivos de acionamento e proteção de motores',
      'Componentes para redes industriais',
      'Itens de reposição para sistemas de controle',
    ],
    benefits: [
      'Leitura técnica do contexto de processo',
      'Suporte a modernização e continuidade operacional',
      'Alinhamento entre automação e instrumentação',
      'Portfólio aplicável a diferentes etapas da operação',
    ],
    relatedSegments: ['papel-e-celulose', 'manufatura', 'siderurgia', 'quimica-e-petroquimica', 'agronegocio'],
    relatedServices: ['consultoria-tecnica-e-comercial', 'projetos-greenfield-e-brownfield', 'strategic-sourcing'],
    seoTitle: 'Automação industrial',
    seoDescription:
      'Componentes e soluções de automação industrial para controle de processos, modernização e continuidade operacional.',
  },
  {
    slug: 'instrumentacao-industrial',
    title: 'Instrumentação industrial',
    shortTitle: 'Instrumentação',
    eyebrow: 'Produtos',
    description:
      'Medição e monitoramento para precisão operacional, segurança e rastreabilidade de processos.',
    introduction:
      'A instrumentação industrial é central para decisões operacionais confiáveis. A Auriun oferece fornecimento direcionado a operações que dependem de medição de pressão, temperatura, vazão, nível e variáveis correlatas.\n\nApoiamos a seleção de instrumentos e acessórios a partir da aplicação informada, considerando ambiente, faixa de trabalho e integração com sistemas de controle.',
    image: '/images/produtos/produto-instrumentacao-industrial.jpg',
    imageAlt: 'Instrumentação e medição em contexto industrial ilustrativo',
    applications: [
      'Monitoramento de processos contínuos',
      'Laços de controle e segurança operacional',
      'Utilidades e utilidades de planta',
      'Estações de tratamento e bombeamento',
      'Manutenção e calibração de campo',
    ],
    solutionGroups: [
      'Sensores e transmissores',
      'Indicadores e registradores',
      'Acessórios de instalação e proteção',
      'Componentes para laços de medição',
      'Itens de reposição para instrumentação',
    ],
    benefits: [
      'Foco na aplicação e no ambiente de medição',
      'Integração com automação e painéis',
      'Apoio a continuidade de processos críticos',
      'Orientação comercial com base técnica',
    ],
    relatedSegments: ['saneamento', 'oleo-e-gas', 'papel-e-celulose', 'quimica-e-petroquimica', 'energia'],
    relatedServices: ['consultoria-tecnica-e-comercial', 'materiais-especiais-e-importados', 'supply-chain-management'],
    seoTitle: 'Instrumentação industrial',
    seoDescription:
      'Instrumentação industrial para medição, monitoramento e controle de processos com atendimento técnico consultivo.',
  },
  {
    slug: 'componentes-eletronicos',
    title: 'Componentes eletrônicos',
    shortTitle: 'Eletrônicos',
    eyebrow: 'Produtos',
    description:
      'Componentes eletroeletrônicos para manutenção, montagem e reposição em ambientes industriais.',
    introduction:
      'Fornecimento de componentes eletrônicos e eletroeletrônicos para bancadas, manutenção e sistemas industriais. A Auriun apoia a localização de itens conforme referência, equivalente técnico ou descrição funcional.\n\nO atendimento é útil tanto para reposição pontual quanto para listas técnicas vinculadas a projetos de montagem e modernização.',
    image: '/images/produtos/produto-componentes-eletronicos.jpg',
    imageAlt: 'Componentes eletrônicos em contexto técnico ilustrativo',
    applications: [
      'Reposição de placas e módulos',
      'Montagem e manutenção eletrônica',
      'Sistemas embarcados industriais',
      'Bancadas de engenharia e manutenção',
      'Suprimento para projetos de retrofit',
    ],
    solutionGroups: [
      'Componentes ativos e passivos',
      'Módulos e interfaces',
      'Fontes e proteção eletrônica',
      'Conectores e acessórios de montagem',
      'Itens de difícil reposição',
    ],
    benefits: [
      'Apoio na identificação de equivalentes',
      'Capacidade de buscar itens especiais',
      'Atendimento a listas técnicas',
      'Integração com sourcing estratégico',
    ],
    relatedSegments: ['manufatura', 'energia', 'infraestrutura', 'oleo-e-gas'],
    relatedServices: ['materiais-especiais-e-importados', 'strategic-sourcing', 'desenvolvimento-de-fornecedores'],
    seoTitle: 'Componentes eletrônicos industriais',
    seoDescription:
      'Componentes eletrônicos e eletroeletrônicos para manutenção, montagem e reposição industrial com suporte técnico.',
  },
  {
    slug: 'cabos-e-conectividade',
    title: 'Cabos e conectividade',
    shortTitle: 'Cabos',
    eyebrow: 'Produtos',
    description:
      'Cabos elétricos, conectores e acessórios para infraestrutura elétrica e de dados.',
    introduction:
      'Soluções de cabos e conectividade aplicáveis a energia, automação e comunicação industrial. A Auriun está preparada para apoiar especificações de cabeamento e acessórios conforme a aplicação e o ambiente de instalação.\n\nO portfólio contempla demandas de obra, manutenção e expansão de infraestrutura, com atenção à compatibilidade entre cabo, conector e condição operacional.',
    image: '/images/produtos/produto-cabos-e-conectividade.jpg',
    imageAlt: 'Cabeamento e conectividade industrial ilustrativos',
    applications: [
      'Distribuição de energia',
      'Redes de automação e campo',
      'Infraestrutura de dados industriais',
      'Montagem de painéis e máquinas',
      'Expansão de plantas e utilidades',
    ],
    solutionGroups: [
      'Cabos de potência e controle',
      'Cabos para automação e sinal',
      'Conectores e terminais',
      'Acessórios de passagem e proteção',
      'Materiais para organização e fixação',
    ],
    benefits: [
      'Orientação por tipo de aplicação',
      'Suporte a projetos e MRO',
      'Compatibilidade com elétrica e automação',
      'Apoio a infraestrutura de planta',
    ],
    relatedSegments: ['infraestrutura', 'construcao-industrial', 'energia', 'mineracao', 'manufatura'],
    relatedServices: ['projetos-greenfield-e-brownfield', 'consultoria-tecnica-e-comercial', 'supply-chain-management'],
    seoTitle: 'Cabos e conectividade industrial',
    seoDescription:
      'Cabos elétricos, conectores e acessórios para energia, automação e infraestrutura industrial.',
  },
  {
    slug: 'climatizacao-industrial',
    title: 'Climatização industrial',
    shortTitle: 'Climatização',
    eyebrow: 'Produtos',
    description:
      'Soluções de climatização para ambientes críticos, salas técnicas e áreas produtivas.',
    introduction:
      'A climatização adequada é relevante para salas elétricas, centros de dados, ambientes de processo e áreas que exigem controle térmico. A Auriun apoia o fornecimento direcionado a essas operações, com base no contexto informado pelo cliente.\n\nO atendimento considera exigências de continuidade, manutenção e compatibilidade com a infraestrutura existente.',
    image: '/images/produtos/produto-climatizacao-industrial.jpg',
    imageAlt: 'Ambiente técnico com necessidade de climatização ilustrativa',
    applications: [
      'Salas elétricas e de controle',
      'Ambientes de TI e servidores',
      'Áreas produtivas com restrição térmica',
      'Modernização de sistemas existentes',
      'Suprimento para manutenção preventiva',
    ],
    solutionGroups: [
      'Equipamentos de climatização',
      'Componentes e acessórios',
      'Itens de reposição',
      'Soluções para salas técnicas',
      'Suporte a especificações de projeto',
    ],
    benefits: [
      'Foco em ambientes críticos',
      'Apoio a continuidade operacional',
      'Integração com demandas de infraestrutura',
      'Atendimento consultivo na definição do escopo',
    ],
    relatedSegments: ['energia', 'manufatura', 'infraestrutura', 'quimica-e-petroquimica'],
    relatedServices: ['consultoria-tecnica-e-comercial', 'projetos-greenfield-e-brownfield', 'gestao-estrategica-de-suprimentos'],
    seoTitle: 'Climatização industrial',
    seoDescription:
      'Climatização para salas técnicas, ambientes críticos e áreas industriais com atendimento consultivo.',
  },
  {
    slug: 'ferramentas-epis-e-epcs',
    title: 'Ferramentas, EPIs e EPCs',
    shortTitle: 'EPIs e ferramentas',
    eyebrow: 'Produtos',
    description:
      'Equipamentos de proteção e ferramentas para equipes de campo, manutenção e obra.',
    introduction:
      'Fornecimento de ferramentas, EPIs e EPCs voltado às necessidades de equipes de manutenção, montagem e operação. A Auriun apoia listas de suprimentos alinhadas à rotina de campo e às exigências de segurança do ambiente de trabalho.\n\nO objetivo é facilitar a disponibilidade de itens recorrentes e apoiar solicitações vinculadas a paradas, obras e atividades de rotina.',
    image: '/images/produtos/produto-ferramentas-epis-e-epcs.jpg',
    imageAlt: 'Ferramentas e equipamentos de proteção em contexto industrial ilustrativo',
    applications: [
      'Manutenção mecânica e elétrica',
      'Montagem e comissionamento',
      'Atividades de campo e obra',
      'Programas de segurança do trabalho',
      'Suprimento recorrente de MRO',
    ],
    solutionGroups: [
      'Ferramentas manuais e elétricas',
      'EPIs para diferentes riscos',
      'EPCs e sinalização',
      'Acessórios para trabalho em altura e campo',
      'Itens de consumo para manutenção',
    ],
    benefits: [
      'Apoio a rotinas de MRO',
      'Organização de listas de suprimentos',
      'Atendimento a demandas de campo e obra',
      'Complemento ao fornecimento técnico industrial',
    ],
    relatedSegments: ['construcao-industrial', 'mineracao', 'infraestrutura', 'siderurgia', 'saneamento'],
    relatedServices: ['gestao-estrategica-de-suprimentos', 'supply-chain-management', 'consultoria-tecnica-e-comercial'],
    seoTitle: 'Ferramentas, EPIs e EPCs industriais',
    seoDescription:
      'Ferramentas, EPIs e EPCs para manutenção, montagem e operação industrial com foco em disponibilidade.',
  },
  {
    slug: 'tecnologia-da-informacao',
    title: 'Tecnologia da informação',
    shortTitle: 'TI',
    eyebrow: 'Produtos',
    description:
      'Notebooks, computadores, servidores e acessórios para operação, engenharia e gestão.',
    introduction:
      'Soluções de TI aplicáveis a engenharia, operação, supervisão e gestão industrial. A Auriun está preparada para apoiar o fornecimento de equipamentos e acessórios conforme requisitos de desempenho e ambiente de uso informados.\n\nO atendimento cobre desde estações de trabalho até itens de infraestrutura que sustentam a operação digital da planta.',
    image: '/images/produtos/produto-tecnologia-da-informacao.jpg',
    imageAlt: 'Equipamentos de tecnologia da informação em contexto corporativo ilustrativo',
    applications: [
      'Engenharia e projetos',
      'Supervisão e salas de controle',
      'Gestão operacional e administrativa',
      'Infraestrutura de servidores e rede',
      'Expansão de postos de trabalho',
    ],
    solutionGroups: [
      'Notebooks e desktops',
      'Servidores e armazenamento',
      'Periféricos e acessórios',
      'Componentes de rede',
      'Itens para reposição e upgrade',
    ],
    benefits: [
      'Fornecimento alinhado ao uso industrial e corporativo',
      'Apoio a projetos de expansão',
      'Integração com demandas de infraestrutura',
      'Atendimento comercial objetivo',
    ],
    relatedSegments: ['manufatura', 'energia', 'infraestrutura', 'agronegocio'],
    relatedServices: ['consultoria-tecnica-e-comercial', 'strategic-sourcing', 'projetos-greenfield-e-brownfield'],
    seoTitle: 'Tecnologia da informação industrial',
    seoDescription:
      'Notebooks, computadores, servidores e acessórios para operação, engenharia e gestão industrial.',
  },
  {
    slug: 'mro-capex-e-opex',
    title: 'MRO, CAPEX e OPEX',
    shortTitle: 'MRO / CAPEX / OPEX',
    eyebrow: 'Produtos',
    description:
      'Suprimentos estratégicos para manutenção, investimentos e operação contínua da indústria.',
    introduction:
      'A Auriun estrutura o fornecimento sob a lógica de MRO, CAPEX e OPEX, reconhecendo que cada modalidade exige ritmo, prioridade e leitura comercial distintos. O portfólio aplica-se a reposição, projetos de expansão e suporte ao custeio operacional.\n\nEssa abordagem ajuda compradores, manutenção e engenharia a organizar demandas sem tratar todo o suprimento da mesma forma.',
    image: '/images/produtos/produto-mro-capex-e-opex.jpg',
    imageAlt: 'Operação industrial ilustrativa vinculada a suprimentos MRO CAPEX e OPEX',
    applications: [
      'Paradas programadas e corretivas',
      'Projetos de ampliação e modernização',
      'Suprimento recorrente de operação',
      'Listas técnicas multidisciplinares',
      'Itens críticos de continuidade',
    ],
    solutionGroups: [
      'Materiais de manutenção (MRO)',
      'Itens para investimentos (CAPEX)',
      'Suprimentos de operação (OPEX)',
      'Materiais especiais e de lead time longo',
      'Cestas técnicas por área ou planta',
    ],
    benefits: [
      'Linguagem alinhada a compras industriais',
      'Priorização conforme criticidade',
      'Integração com sourcing e supply chain',
      'Visão de continuidade operacional',
    ],
    relatedSegments: ['mineracao', 'siderurgia', 'oleo-e-gas', 'papel-e-celulose', 'manufatura'],
    relatedServices: [
      'gestao-estrategica-de-suprimentos',
      'strategic-sourcing',
      'supply-chain-management',
      'materiais-especiais-e-importados',
    ],
    seoTitle: 'MRO, CAPEX e OPEX industriais',
    seoDescription:
      'Suprimentos industriais para MRO, CAPEX e OPEX com atendimento consultivo e visão de continuidade operacional.',
  },
]

export function getProductBySlug(slug: string): ProductItem | undefined {
  return products.find((item) => item.slug === slug)
}

export function getAllProductSlugs(): string[] {
  return products.map((item) => item.slug)
}

export { productPath }
