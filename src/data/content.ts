import { Cable, CircuitBoard, Cpu, Gauge, HardHat, Laptop, Snowflake, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type PositioningItem = {
  id: string
  title: string
  subtitle: string
  description: string
}

export const positioning: PositioningItem[] = [
  {
    id: 'mro',
    title: 'MRO',
    subtitle: 'Maintenance, Repair & Operations',
    description:
      'Suprimentos e materiais para manutenção e continuidade das operações industriais.',
  },
  {
    id: 'capex',
    title: 'CAPEX',
    subtitle: 'Investimentos e expansão',
    description:
      'Fornecimento técnico para projetos de ampliação, modernização e novas plantas.',
  },
  {
    id: 'opex',
    title: 'OPEX',
    subtitle: 'Operação contínua',
    description:
      'Apoio ao custeio operacional com agilidade de cotação e disponibilidade estratégica.',
  },
  {
    id: 'sourcing',
    title: 'Strategic Sourcing',
    subtitle: 'Supply Chain & materiais especiais',
    description:
      'Desenvolvimento de fornecedores e localização de itens de difícil aquisição.',
  },
]

export const differentials = [
  {
    title: 'Atendimento consultivo',
    description:
      'Leitura técnica da demanda e proposta alinhada ao contexto operacional do cliente.',
  },
  {
    title: 'Portfólio multimarcas',
    description:
      'Acesso a fabricantes reconhecidos e alternativas compatíveis com a especificação do projeto.',
  },
  {
    title: 'Materiais de difícil aquisição',
    description:
      'Capacidade de localizar itens especiais, nacionais ou importados, com rede ampliada de fornecedores.',
  },
  {
    title: 'Agilidade em cotações',
    description:
      'Processo comercial objetivo para reduzir tempo de resposta em demandas críticas.',
  },
  {
    title: 'Visão de Supply Chain',
    description:
      'Orientação para disponibilidade, prazo e continuidade — não apenas para o item isolado.',
  },
  {
    title: 'Parceria de longo prazo',
    description:
      'Relacionamento próximo com suporte antes, durante e após o fornecimento.',
  },
] as const

export const aboutContent = {
  mission:
    'Fornecer soluções industriais com qualidade técnica, agilidade e atendimento consultivo, contribuindo para a eficiência e a continuidade operacional dos clientes.',
  vision:
    'Consolidar a Auriun como referência nacional em distribuição e integração de soluções industriais, reconhecida por confiabilidade, inovação e excelência no atendimento.',
  values: [
    {
      title: 'Confiabilidade',
      description: 'Compromisso com qualidade, clareza comercial e cumprimento do que é acordado.',
    },
    {
      title: 'Excelência técnica',
      description: 'Decisões orientadas por especificação, aplicação e contexto industrial.',
    },
    {
      title: 'Agilidade',
      description: 'Resposta objetiva às demandas de manutenção, projetos e suprimentos estratégicos.',
    },
    {
      title: 'Parceria',
      description: 'Relacionamento próximo, transparente e de longo prazo com clientes e fornecedores.',
    },
  ],
} as const

/** Marcas citadas pelo cliente — logos oficiais devem substituir este grid textual. */
export const partnerBrands = [
  'Siemens',
  'Schneider Electric',
  'Steck',
  'Prysmian',
  'WEG',
  'ABB',
  'LG',
  'Samsung',
  'Philips',
  'Tramontina',
] as const

export const productIcons: Record<string, LucideIcon> = {
  'materiais-eletricos': Cable,
  'automacao-industrial': Cpu,
  'instrumentacao-industrial': Gauge,
  'componentes-eletronicos': CircuitBoard,
  'cabos-e-conectividade': Cable,
  'climatizacao-industrial': Snowflake,
  'ferramentas-epis-e-epcs': HardHat,
  'tecnologia-da-informacao': Laptop,
  'mro-capex-e-opex': Wrench,
}
