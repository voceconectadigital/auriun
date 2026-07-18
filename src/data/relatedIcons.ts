import type { LucideIcon } from 'lucide-react'
import {
  Boxes,
  Cable,
  CircuitBoard,
  ClipboardCheck,
  Construction,
  Cpu,
  Fan,
  Gauge,
  Handshake,
  HardHat,
  Layers,
  Network,
  Search,
  Server,
  Ship,
  Wrench,
  Zap,
} from 'lucide-react'

/**
 * Typed Lucide map for text-only related/callout cards (products & services).
 * Segment cards use cover images — no watermark icons.
 * Keys are product / service slugs — never React nodes in CMS data.
 */
export const relatedIconBySlug: Readonly<Record<string, LucideIcon>> = {
  // Products
  'materiais-eletricos': Zap,
  'automacao-industrial': Cpu,
  'instrumentacao-industrial': Gauge,
  'componentes-eletronicos': CircuitBoard,
  'cabos-e-conectividade': Cable,
  'climatizacao-industrial': Fan,
  'ferramentas-epis-e-epcs': HardHat,
  'tecnologia-da-informacao': Server,
  'mro-capex-e-opex': Wrench,
  // Services
  'strategic-sourcing': Search,
  'supply-chain-management': Network,
  'desenvolvimento-de-fornecedores': Handshake,
  'gestao-estrategica-de-suprimentos': Boxes,
  'materiais-especiais-e-importados': Ship,
  'consultoria-tecnica-e-comercial': ClipboardCheck,
  'projetos-greenfield-e-brownfield': Construction,
}

/** Controlled fallback when slug is missing or unmapped. */
export const RELATED_ICON_FALLBACK: LucideIcon = Layers

export type RelatedIconResolution = {
  Icon: LucideIcon
  slug: string
  usedFallback: boolean
}

/** Last path segment from a related-card `to` href. */
export function slugFromRelatedTo(to: string): string {
  const cleaned = to.replace(/\/+$/, '')
  const parts = cleaned.split('/').filter(Boolean)
  return parts[parts.length - 1] ?? ''
}

export function resolveRelatedIcon(
  slug: string | undefined | null,
): RelatedIconResolution {
  const key = (slug ?? '').trim()
  if (key && relatedIconBySlug[key]) {
    return { Icon: relatedIconBySlug[key], slug: key, usedFallback: false }
  }
  return {
    Icon: RELATED_ICON_FALLBACK,
    slug: key || 'unknown',
    usedFallback: true,
  }
}
