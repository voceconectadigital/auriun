# Auriun Soluções Industriais

Site institucional B2B da Auriun — distribuidora e integradora de soluções industriais.

## Stack

- Vite + React + TypeScript + Tailwind CSS
- React Router
- Lucide React
- Pré-renderização estática pós-build (`scripts/prerender.mjs`) para Cloudflare Pages

## Scripts

```bash
npm install
npm run dev
npm run build      # typecheck + Vite + prerender + sitemap
npm run preview
npm run lint
npm run typecheck
```

## Cloudflare Pages

| Configuração | Valor |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| SPA fallback | `public/_redirects` → `/* /index.html 200` |

O build gera HTML estático por rota (title, description, canonical, H1 e conteúdo) e mantém o fallback SPA para rotas dinâmicas/404.

## Contatos

Edite `src/data/site.ts`. Campos vazios não são exibidos.

## Logo

Arquivo oficial: `public/aurion-logo-3d.webp` (caminho público `/aurion-logo-3d.webp`).
Centralizado em `BRAND_LOGO` (`src/data/site.ts`) e no componente `Logo`.

## Estrutura de conteúdo

- `src/data/products.ts` — 9 produtos
- `src/data/services.ts` — 7 serviços
- `src/data/segments.ts` — 11 segmentos
- Templates: `ProductDetailPage`, `ServiceDetailPage`, `SegmentDetailPage`

## Rotas

Hubs: `/`, `/a-auriun/`, `/solucoes/`, `/segmentos/`  
+ páginas individuais de produtos, serviços e segmentos (ver `src/data/routes.ts`).
