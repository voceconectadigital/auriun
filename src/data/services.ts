import type { ServiceItem } from './types'
import { servicePath } from './types'

export const services: ServiceItem[] = [
  {
    slug: 'strategic-sourcing',
    title: 'Strategic Sourcing',
    shortTitle: 'Sourcing',
    eyebrow: 'Serviços',
    description:
      'Identificação e estruturação de fontes de fornecimento alinhadas à demanda técnica industrial.',
    introduction:
      'O Strategic Sourcing da Auriun apoia a organização de fontes de fornecimento com base em especificação, criticidade e contexto de compra. O serviço é voltado a demandas em que preço isolado não basta — é necessário alinhar disponibilidade, equivalência técnica e continuidade.\n\nAtuamos de forma consultiva junto a compras, manutenção e engenharia para estruturar alternativas comerciais coerentes com o escopo apresentado.',
    image: '/images/servicos/servico-strategic-sourcing.jpg',
    imageAlt: 'Contexto ilustrativo de sourcing e planejamento de suprimentos',
    challenges: [
      'Dependência de poucos fornecedores para itens críticos',
      'Dificuldade em comparar alternativas técnicas equivalentes',
      'Pressão por prazo sem clareza de especificação',
      'Necessidade de organizar fontes para categorias recorrentes',
    ],
    approach: [
      'Leitura da demanda e dos requisitos técnicos',
      'Mapeamento de alternativas de fornecimento',
      'Organização de opções comercialmente comparáveis',
      'Apoio à decisão com foco em continuidade',
    ],
    benefits: [
      'Maior clareza na comparação de alternativas',
      'Redução de improvisos em compras críticas',
      'Alinhamento entre área técnica e compras',
      'Base para relacionamentos de fornecimento mais estáveis',
    ],
    mroCapexOpex: [
      'MRO: estruturação de fontes para itens de manutenção',
      'CAPEX: apoio a listas de projeto e alternativas de fornecimento',
      'OPEX: organização de categorias recorrentes de operação',
    ],
    relatedSegments: ['mineracao', 'oleo-e-gas', 'siderurgia', 'manufatura'],
    relatedProducts: ['mro-capex-e-opex', 'materiais-eletricos', 'componentes-eletronicos'],
    relatedServices: ['desenvolvimento-de-fornecedores', 'gestao-estrategica-de-suprimentos', 'materiais-especiais-e-importados'],
    seoTitle: 'Strategic Sourcing industrial',
    seoDescription:
      'Strategic Sourcing para indústria: estruturação de fontes de fornecimento com visão técnica e comercial.',
  },
  {
    slug: 'supply-chain-management',
    title: 'Supply Chain Management',
    shortTitle: 'Supply Chain',
    eyebrow: 'Serviços',
    description:
      'Apoio à cadeia de suprimentos com visão de prazo, disponibilidade e continuidade operacional.',
    introduction:
      'A gestão da cadeia de suprimentos industriais exige coordenação entre especificação, fornecedor, prazo e criticidade do item. A Auriun apoia esse fluxo com atendimento orientado à realidade operacional do cliente.\n\nO serviço é especialmente útil quando a compra precisa considerar lead time, risco de desabastecimento e impacto na linha ou na manutenção.',
    image: '/images/servicos/servico-supply-chain-management.jpg',
    imageAlt: 'Cadeia de suprimentos e logística industrial ilustrativas',
    challenges: [
      'Rupturas de abastecimento em itens críticos',
      'Falta de visibilidade sobre prazos e alternativas',
      'Desalinhamento entre planejamento e compra operacional',
      'Demandas urgentes sem histórico estruturado de fornecimento',
    ],
    approach: [
      'Análise do impacto operacional da demanda',
      'Busca de alternativas com atenção a disponibilidade',
      'Acompanhamento do fluxo comercial de fornecimento',
      'Comunicação objetiva com as áreas envolvidas',
    ],
    benefits: [
      'Melhor leitura de risco de desabastecimento',
      'Apoio a decisões sob pressão de prazo',
      'Integração entre compras e operação',
      'Continuidade como critério de fornecimento',
    ],
    mroCapexOpex: [
      'MRO: priorização de itens que afetam a manutenção',
      'CAPEX: coordenação de materiais de projeto',
      'OPEX: suporte a suprimentos recorrentes da operação',
    ],
    relatedSegments: ['papel-e-celulose', 'agronegocio', 'saneamento', 'infraestrutura'],
    relatedProducts: ['mro-capex-e-opex', 'cabos-e-conectividade', 'ferramentas-epis-e-epcs'],
    relatedServices: ['strategic-sourcing', 'gestao-estrategica-de-suprimentos', 'materiais-especiais-e-importados'],
    seoTitle: 'Supply Chain Management industrial',
    seoDescription:
      'Supply Chain Management para indústria com foco em disponibilidade, prazo e continuidade operacional.',
  },
  {
    slug: 'desenvolvimento-de-fornecedores',
    title: 'Desenvolvimento de fornecedores',
    shortTitle: 'Fornecedores',
    eyebrow: 'Serviços',
    description:
      'Homologação e desenvolvimento de parceiros nacionais e internacionais para demandas específicas.',
    introduction:
      'Quando a base atual de fornecedores não cobre a necessidade técnica, a Auriun apoia o desenvolvimento e a avaliação de novas fontes. O trabalho considera requisitos do item, contexto de uso e critérios comerciais da operação.\n\nO serviço contribui para ampliar opções sem abrir mão da leitura técnica da demanda.',
    image: '/images/servicos/servico-desenvolvimento-de-fornecedores.jpg',
    imageAlt: 'Ambiente ilustrativo de avaliação e desenvolvimento de fornecedores',
    challenges: [
      'Lacunas de fornecimento em categorias específicas',
      'Dependência excessiva de uma única fonte',
      'Dificuldade em localizar parceiros para itens especiais',
      'Necessidade de alternativas nacionais ou internacionais',
    ],
    approach: [
      'Entendimento do requisito técnico e comercial',
      'Busca e qualificação preliminar de fontes',
      'Organização de informações para análise do cliente',
      'Acompanhamento das primeiras fornecidas quando aplicável',
    ],
    benefits: [
      'Ampliação da rede de opções de compra',
      'Redução de dependência crítica',
      'Melhor encaixe entre item e fornecedor',
      'Base para sourcing de médio e longo prazo',
    ],
    mroCapexOpex: [
      'MRO: novas fontes para reposição recorrente',
      'CAPEX: fornecedores alinhados a escopos de projeto',
      'OPEX: alternativas para categorias de consumo contínuo',
    ],
    relatedSegments: ['quimica-e-petroquimica', 'oleo-e-gas', 'mineracao', 'manufatura'],
    relatedProducts: ['componentes-eletronicos', 'instrumentacao-industrial', 'materiais-eletricos'],
    relatedServices: ['strategic-sourcing', 'materiais-especiais-e-importados', 'gestao-estrategica-de-suprimentos'],
    seoTitle: 'Desenvolvimento de fornecedores industriais',
    seoDescription:
      'Desenvolvimento e homologação de fornecedores nacionais e internacionais para demandas industriais específicas.',
  },
  {
    slug: 'gestao-estrategica-de-suprimentos',
    title: 'Gestão estratégica de suprimentos',
    shortTitle: 'Suprimentos',
    eyebrow: 'Serviços',
    description:
      'Organização de suprimentos com visão de criticidade, recorrência e impacto operacional.',
    introduction:
      'A gestão estratégica de suprimentos ajuda a transformar compras reativas em um fluxo mais previsível. A Auriun apoia a organização de demandas por criticidade, recorrência e impacto na operação.\n\nO serviço é direcionado a equipes que precisam equilibrar urgência, custo e disponibilidade sem perder o critério técnico.',
    image: '/images/servicos/servico-gestao-estrategica-de-suprimentos.jpg',
    imageAlt: 'Gestão de suprimentos industriais em contexto ilustrativo',
    challenges: [
      'Compras emergenciais frequentes',
      'Listas técnicas desorganizadas ou incompletas',
      'Falta de priorização por criticidade',
      'Sobreposição entre MRO, CAPEX e OPEX',
    ],
    approach: [
      'Classificação da demanda por impacto operacional',
      'Organização de escopos e listas técnicas',
      'Definição de caminhos de fornecimento adequados',
      'Acompanhamento comercial com comunicação clara',
    ],
    benefits: [
      'Menos ruído entre áreas envolvidas',
      'Priorização mais objetiva das compras',
      'Melhor uso do tempo de compras e manutenção',
      'Base para decisões de reposição e projeto',
    ],
    mroCapexOpex: [
      'MRO: estruturação de itens de manutenção',
      'CAPEX: organização de materiais de investimento',
      'OPEX: rotinas de suprimento operacional',
    ],
    relatedSegments: ['siderurgia', 'papel-e-celulose', 'energia', 'saneamento'],
    relatedProducts: ['mro-capex-e-opex', 'ferramentas-epis-e-epcs', 'climatizacao-industrial'],
    relatedServices: ['supply-chain-management', 'strategic-sourcing', 'consultoria-tecnica-e-comercial'],
    seoTitle: 'Gestão estratégica de suprimentos',
    seoDescription:
      'Gestão estratégica de suprimentos industriais com foco em criticidade, recorrência e continuidade.',
  },
  {
    slug: 'materiais-especiais-e-importados',
    title: 'Materiais especiais e importados',
    shortTitle: 'Materiais especiais',
    eyebrow: 'Serviços',
    description:
      'Localização e fornecimento de itens de difícil aquisição, inclusive sob especificação técnica.',
    introduction:
      'Materiais especiais e de difícil aquisição exigem rede ampliada e leitura cuidadosa da especificação. A Auriun está preparada para apoiar a localização de itens nacionais ou importados quando a reposição convencional não resolve.\n\nO atendimento parte da referência técnica, do equivalente aceitável e do impacto da falta do item na operação.',
    image: '/images/servicos/servico-materiais-especiais-e-importados.jpg',
    imageAlt: 'Materiais técnicos especiais em contexto industrial ilustrativo',
    challenges: [
      'Itens descontinuados ou de baixa disponibilidade',
      'Especificações restritas e pouco flexíveis',
      'Lead times longos em cadeias internacionais',
      'Risco operacional por falta de substituto conhecido',
    ],
    approach: [
      'Análise da referência e dos equivalentes possíveis',
      'Busca em rede ampliada de fornecedores',
      'Validação comercial das opções encontradas',
      'Acompanhamento do fornecimento até a conclusão acordada',
    ],
    benefits: [
      'Alternativas para itens críticos de difícil reposição',
      'Redução de paradas por falta de material específico',
      'Apoio técnico-comercial em especificações complexas',
      'Integração com sourcing e supply chain',
    ],
    mroCapexOpex: [
      'MRO: reposição de itens críticos e especiais',
      'CAPEX: materiais específicos de projeto',
      'OPEX: suporte a consumíveis de baixa disponibilidade',
    ],
    relatedSegments: ['mineracao', 'oleo-e-gas', 'quimica-e-petroquimica', 'siderurgia'],
    relatedProducts: ['componentes-eletronicos', 'instrumentacao-industrial', 'automacao-industrial', 'materiais-eletricos'],
    relatedServices: ['strategic-sourcing', 'desenvolvimento-de-fornecedores', 'supply-chain-management', 'importacao-sob-demanda'],
    seoTitle: 'Materiais especiais e importados',
    seoDescription:
      'Localização e fornecimento de materiais especiais e importados para demandas industriais de difícil aquisição.',
  },
  {
    slug: 'importacao-sob-demanda',
    title: 'Importação sob demanda',
    shortTitle: 'Importação',
    eyebrow: 'Fornecimento internacional',
    heroTitle: 'Importação sob demanda para empresas',
    description:
      'Apoio na busca e no fornecimento internacional de produtos, equipamentos e materiais conforme a necessidade da operação.',
    introduction:
      'A importação sob demanda da Auriun apoia empresas que precisam localizar e estruturar o fornecimento internacional de produtos, equipamentos e materiais a partir do escopo da operação. O serviço tem caráter comercial e consultivo: identifica alternativas, organiza informações e acompanha a demanda com clareza.\n\nA estrutura da operação e os serviços envolvidos são definidos conforme o escopo, a origem dos itens e as necessidades do cliente. O atendimento pode contemplar identificação de fornecedores, pesquisa internacional, levantamento de alternativas, cotação, negociação comercial, alinhamento de especificações, coordenação do fornecimento e acompanhamento da demanda.',
    image: '/images/servicos/servico-materiais-especiais-e-importados.jpg',
    imageAlt: 'Contexto ilustrativo de fornecimento internacional — imagem provisória até asset oficial',
    challenges: [
      'Necessidade de itens não disponíveis localmente com a especificidade exigida',
      'Dificuldade em comparar alternativas internacionais com critério comercial',
      'Demandas que exigem pesquisa e alinhamento de especificação antes da compra',
      'Operações que precisam de coordenação clara entre cotação e fornecimento',
    ],
    approach: [
      'Leitura do escopo, da origem desejada e dos requisitos técnicos',
      'Pesquisa e identificação de alternativas de fornecimento',
      'Organização de cotações e alinhamento comercial',
      'Acompanhamento da demanda conforme o caminho acordado com o cliente',
    ],
    benefits: [
      'Apoio estruturado à busca internacional sob demanda',
      'Maior clareza na comparação de alternativas comerciais',
      'Integração com sourcing e materiais especiais',
      'Comunicação objetiva ao longo do processo',
    ],
    mroCapexOpex: [
      'MRO: apoio a itens especiais de reposição via fontes internacionais',
      'CAPEX: pesquisa e cotação de equipamentos para projetos',
      'OPEX: avaliação de suprimentos recorrentes conforme origem e escopo',
    ],
    relatedSegments: ['mineracao', 'oleo-e-gas', 'manufatura'],
    relatedProducts: [
      'eletrodomesticos',
      'eletroeletronicos',
      'componentes-eletronicos',
      'mro-capex-e-opex',
    ],
    relatedServices: [
      'materiais-especiais-e-importados',
      'strategic-sourcing',
      'desenvolvimento-de-fornecedores',
    ],
    seoTitle: 'Importação sob demanda',
    seoDescription:
      'Importação sob demanda para empresas: apoio na busca, cotação e coordenação de fornecimento internacional conforme o escopo.',
    ctaLabel: 'Falar sobre uma importação',
  },
  {
    slug: 'consultoria-tecnica-e-comercial',
    title: 'Consultoria técnica e comercial',
    shortTitle: 'Consultoria',
    eyebrow: 'Serviços',
    description:
      'Atendimento consultivo desde a leitura da necessidade até a proposta de fornecimento.',
    introduction:
      'A consultoria técnica e comercial da Auriun conecta a linguagem da engenharia à da compra. O serviço ajuda a transformar uma necessidade operacional em um escopo de fornecimento claro e comparável.\n\nÉ indicado para demandas multidisciplinares, modernizações e situações em que a especificação ainda precisa ser organizada antes da cotação.',
    image: '/images/servicos/servico-consultoria-tecnica-e-comercial.jpg',
    imageAlt: 'Atendimento técnico-comercial industrial ilustrativo',
    challenges: [
      'Escopos incompletos ou ambíguos',
      'Dificuldade em traduzir a necessidade de campo em pedido de compra',
      'Múltiplas áreas envolvidas sem critério comum',
      'Risco de cotar itens inadequados à aplicação',
    ],
    approach: [
      'Escuta técnica da demanda e do contexto de uso',
      'Organização do escopo e das prioridades',
      'Proposta de caminhos de fornecimento',
      'Acompanhamento comercial alinhado à área técnica',
    ],
    benefits: [
      'Cotações mais aderentes à aplicação',
      'Menos retrabalho entre manutenção, engenharia e compras',
      'Decisão comercial com base técnica',
      'Agilidade com critério — não apenas velocidade',
    ],
    mroCapexOpex: [
      'MRO: apoio a especificações de reposição',
      'CAPEX: organização de escopos de projeto',
      'OPEX: clarificação de demandas recorrentes',
    ],
    relatedSegments: ['manufatura', 'energia', 'construcao-industrial', 'agronegocio'],
    relatedProducts: ['automacao-industrial', 'materiais-eletricos', 'tecnologia-da-informacao'],
    relatedServices: ['projetos-greenfield-e-brownfield', 'gestao-estrategica-de-suprimentos', 'strategic-sourcing'],
    seoTitle: 'Consultoria técnica e comercial industrial',
    seoDescription:
      'Consultoria técnica e comercial para estruturar demandas industriais e propostas de fornecimento com clareza.',
  },
  {
    slug: 'projetos-greenfield-e-brownfield',
    title: 'Projetos Greenfield e Brownfield',
    shortTitle: 'Projetos',
    eyebrow: 'Serviços',
    description:
      'Suporte a novas plantas e modernizações com fornecimento alinhado ao escopo do projeto.',
    introduction:
      'Projetos Greenfield e Brownfield exigem coordenação entre engenharia, compras e cronograma de obra. A Auriun apoia o fornecimento de materiais e soluções alinhados ao escopo técnico de novas plantas e modernizações.\n\nO atendimento considera a natureza do projeto — implantação ou retrofit — e a necessidade de compatibilidade com sistemas existentes quando aplicável.',
    image: '/images/servicos/servico-projetos-greenfield-e-brownfield.jpg',
    imageAlt: 'Projeto e infraestrutura industrial em contexto ilustrativo',
    challenges: [
      'Listas longas e multidisciplinares',
      'Interfaces entre sistemas novos e existentes',
      'Pressão de cronograma sobre o suprimento',
      'Necessidade de alternativas sem perder aderência técnica',
    ],
    approach: [
      'Leitura do escopo e das prioridades do projeto',
      'Organização do fornecimento por frentes técnicas',
      'Busca de alternativas compatíveis quando necessário',
      'Acompanhamento comercial ao longo das etapas acordadas',
    ],
    benefits: [
      'Fornecimento orientado ao estágio do projeto',
      'Apoio a greenfield e brownfield com critérios distintos',
      'Redução de ruído entre engenharia e compras',
      'Integração com produtos e serviços relacionados',
    ],
    mroCapexOpex: [
      'CAPEX: foco principal em materiais de investimento e implantação',
      'MRO: suporte a comissionamento e partida',
      'OPEX: transição para suprimentos de operação após start-up',
    ],
    relatedSegments: ['infraestrutura', 'construcao-industrial', 'energia', 'mineracao', 'papel-e-celulose'],
    relatedProducts: ['materiais-eletricos', 'automacao-industrial', 'cabos-e-conectividade', 'climatizacao-industrial'],
    relatedServices: ['consultoria-tecnica-e-comercial', 'strategic-sourcing', 'supply-chain-management'],
    seoTitle: 'Projetos Greenfield e Brownfield',
    seoDescription:
      'Fornecimento e suporte técnico-comercial para projetos industriais Greenfield e Brownfield.',
  },
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((item) => item.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((item) => item.slug)
}

export { servicePath }
