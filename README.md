# GAM — Grupo António Mosquito · Demo Digital Ecosystem

Protótipo de prospecção estratégica produzido pela **Teko** para o GAM — Grupo
António Mosquito. Demonstra, através de duas páginas de altíssima qualidade
(Home e Grupo/Sobre Nós), o que a presença digital do Grupo poderia ser se
reflectisse a escala e credibilidade real do GAM.

**Isto é um demo, não o site final.** Ver [Escopo](#escopo-e-o-que-não-está-aqui) abaixo.

> Referência estrutural/mecânica: [PESCO Holding](https://www.behance.net/gallery/246352495/PESCO-Holding-Industrial-Corporate-UXUI)
> — mesma mecânica de scroll do hero, adaptada à identidade e conteúdo real do GAM.
> A paleta amarela/azul do logo GAM foi mantida deliberadamente (não copiámos o
> preto/branco da Pesco).

---

## Como correr localmente

Requisitos: Node 20+ e npm.

```bash
npm install
npm run dev       # servidor de desenvolvimento (Vite)
npm run build     # build de produção em dist/
npm run preview   # pré-visualiza o build de produção
npm run lint      # oxlint
```

## Stack técnico

| Camada        | Escolha                                                     |
| ------------- | ------------------------------------------------------------ |
| Framework     | React 19 + Vite (mesma base dos outros projectos Teko)        |
| Routing       | react-router-dom (`/` e `/grupo`)                             |
| Animação      | GSAP + ScrollTrigger (mecânica de scroll-pin do hero)          |
| Estilo        | CSS Modules + tokens em `src/index.css` (sem framework CSS)    |
| Tipografia    | Fraunces (títulos) + Manrope (corpo) via Google Fonts          |
| Vídeo/Imagem  | Assets reais do cliente, comprimidos com ffmpeg (ver abaixo)   |
| Deploy        | Vercel (recomendado) — ver [Deploy](#deploy)                   |

Sem backend, sem CMS — site estático, tal como os outros demos Teko.

## Estrutura

```
src/
  data/content.ts        → TODA a cópia institucional real (fonte única da verdade)
  components/
    hero/                 → ScrollHero (desktop, pin+scrub) e SimpleHero (mobile/reduced-motion)
    layout/                → Navbar, Footer, ScrollToTop
    sections/              → IntroSection, AtScale, PortfolioStrip, FinalCta
  pages/
    Home.tsx
    Group.tsx             → "Grupo / Sobre Nós"
  assets/
    video/                → 4 vídeos de cena (comprimidos, ~0.4–2.2MB cada) + posters
    scenes/                → recortes/transparências para o parallax do hero
    photos/                → retrato do Presidente, mapa de Angola, logótipo GAM
    logos/                 → logótipos das empresas do portfólio
```

## A mecânica do Hero (`ScrollHero.tsx`)

Reproduz a mecânica da Pesco com conteúdo e paleta GAM:

1. Um "stage" fixo (90vw/90vh, cantos arredondados) fica pinned no ecrã.
2. Um marquee horizontal com os **sete sectores confirmados** (+ Petróleos)
   desloca-se da direita para a esquerda, sincronizado com o scroll.
3. Quatro cenas em vídeo real do cliente (transporte, petróleos, construção/
   skyline de Luanda, agricultura) fazem crossfade por trás do texto, cada
   uma com o seu recorte em primeiro plano (autocarro Huambo Expresso,
   barris, viga em I) — tal como o crane/painel solar da Pesco. A última cena
   fecha "em fundo limpo" com a marca GAM, conforme pedido no brief.
4. O stage encolhe para um pequeno cartão com um contador 00→99.
5. O stage expande para 100vw/100vh, revelando o headline definitivo e o CTA.

**Mobile e `prefers-reduced-motion`:** o scroll-jacking pinned é uma técnica
pesada em ecrãs pequenos e no Safari iOS, por isso o hero **não** usa a mesma
mecânica em ecrãs <880px nem quando o utilizador pede movimento reduzido.
Nesses casos, `SimpleHero.tsx` mostra o mesmo conteúdo final imediatamente,
com um marquee CSS leve e sem scroll-jacking — mobile-first a sério, não uma
versão degradada esquecida.

## Conteúdo — só factos verificados

Toda a cópia em `src/data/content.ts` deriva exclusivamente do texto "About"
real do gam.ao (capturado no brief). **Nada foi inventado**: números,
sectores, nomes de empresas e a citação do lema são factos confirmados.

- Sectores consolidados (7, confirmados): Comércio e Transporte, Construção
  Civil, Hotelaria, Imobiliária, Banca, Agricultura e Pecuária, Indústria.
- Petróleos surge separadamente como "investimento mais recente" / "em
  expansão" — exactamente como no texto original, nunca listado como um dos
  sete sectores "consolidados".
- Estatísticas ("At Scale"): ~20 empresas, $120M+ volume de negócios, 1.300+
  colaboradores — os únicos três números confirmados no texto fonte.
- Empresas do portfólio: apenas os nomes/designações que constam dos seus
  próprios logótipos (nenhuma descrição de sector foi inventada onde o
  original não a fornece).

Se precisar de adicionar conteúdo que ainda não está confirmado (ex.:
descrições de sector por extenso), marque-o explicitamente como placeholder
— nunca o escreva como se fosse facto. Ver `isPlaceholderNote` em
`content.ts` para o padrão a seguir.

## Assets

Os vídeos e imagens vieram da pasta fornecida pelo cliente
(`Grupo Antonio Mosquito/`, no ambiente onde este projecto foi gerado) e
foram processados com `ffmpeg` antes de entrarem no repositório:

- **Vídeos** (`Videos/*.mp4`, originalmente ~10–46MB / 1920×1080 cada) →
  recomprimidos para 1280px de largura, 8s, sem áudio, ~0.4–2.2MB cada.
- **Recortes/fotos** → redimensionados para os tamanhos realmente usados no
  layout (poupa peso sem perder qualidade percebida).

Todo o site pesa poucos MB no total — importante para uma demo que deve
carregar bem mesmo em ligações móveis mais lentas em Angola.

Se precisar de **substituir ou adicionar** vídeos/imagens (ex.: mais cenas
para o "reel" de fundo de secções), o padrão é:

```bash
ffmpeg -i in.mp4 -t 8 -vf "scale=1280:-2" -an -c:v libx264 -crf 28 \
  -preset veryfast -movflags +faststart out.mp4
ffmpeg -i in.mp4 -vframes 1 -q:v 4 -vf "scale=1280:-2" poster.jpg
```

## Deploy

**Recomendação: Vercel**, não GitHub Pages, por três razões concretas para
este projecto:

1. **Ainda não existe repositório GitHub.** A Vercel permite deploy directo
   por CLI (`vercel --prod`) ou drag-and-drop, sem depender de um repo
   remoto ou de configurar GitHub Actions primeiro — importante para mostrar
   isto ao cliente o mais rápido possível.
2. **Detecção automática de Vite.** Zero configuração de build; o
   `vercel.json` incluído trata dos rewrites de SPA para que `/grupo`
   funcione em refresh directo (o GitHub Pages exigiria um hack de
   `404.html` para o mesmo efeito).
3. **CDN mais rápida para os vídeos de fundo** e URLs de preview únicos por
   deploy — úteis para partilhar versões com o cliente antes de aprovar.

```bash
npm install -g vercel   # uma vez
vercel                  # deploy de preview
vercel --prod           # deploy de produção
```

Quando o repositório GitHub existir, basta ligar o repo à Vercel
(vercel.com/new) para deploys automáticos a cada push — sem alterar nada
neste projecto.

Se ainda assim preferir GitHub Pages mais tarde (ex.: para alinhar com os
outros sites Teko que já usam esse padrão): adicionar `base` no
`vite.config.ts` com o nome do repositório, criar o workflow de Actions (como
nos outros projectos Teko) e duplicar `index.html` para `404.html` para o
fallback de SPA.

## Escopo e o que NÃO está aqui

Este é um demo de duas páginas para uma apresentação estratégica — não o
site final. Deliberadamente **não construído** nesta fase:

- Business Areas / Portfolio com perfis individuais por empresa
- Projectos / Impacto
- Notícias
- Carreiras

Estas secções estão descritas na arquitectura da apresentação mas fora do
âmbito deste protótipo.

## Próximos passos sugeridos

- Confirmar com o GAM: descrições por sector, marcos históricos, e se há
  mais imagens/vídeo em maior resolução para as cenas do hero.
- Se aprovado, criar o repositório GitHub e ligar a um domínio próprio.
- Construir as restantes páginas da arquitectura (fora do âmbito deste demo).

---

Produzido por **Teko** — estúdio de sistemas de negócio e transformação digital.
