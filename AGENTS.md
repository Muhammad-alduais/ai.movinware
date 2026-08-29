# Agent Instructions — MovinWare AI Website

## Project

Single-page marketing site for MovinWare AI (React + Vite) with a bilingual (English/Arabic) interface. Cloudflare Pages auto-deploys on every push to `main` (`ai.movinware.com`).

## Commands

- `npm run build` — production build (must pass with 0 errors after any change)
- `npm run dev -- --host 0.0.0.0` — dev server on :5173. After `npm install`, delete `node_modules/.vite` and restart to clear stale optimize cache ("504 Outdated Optimize Dep").
- No test suite. Verify UI changes live against `http://localhost:5173`.

## Stack & Structure

- React 18 + TypeScript + Vite 5, Tailwind CSS, react-router-dom v7. Rendering is client-side; generated posts live in front-end bundle `client/src/generated-posts/`.
- App shell: `client/src/App.tsx` + `client/src/lib/AppRoutes.tsx` (one `#app` entry + deleted `#home` page route). All routes: `/` (section-based home in `Home.tsx`), about, services, products, product/:slug, gallery, contact, tutorial/:slug, blog.
- Root route component: `client/src/pages/Home.tsx`. Component root: `client/src/components/`.
- Design: GSAP + ScrollTrigger (`lib/split-text.ts`, `components/TextReveal.tsx`), Lucide icons (`lucide-react`), Tailwind (`tailwind.config.ts`), custom fonts INTER, BROCKMANN (`client/src/index.css`), CEREAL, CAIRO, TAJAWAL.

## Design Constraints (non-negotiable)

- Keep the original look: bright-violet `pulse` palette (`hsl(245 83% …)` ramp in `tailwind.config.ts`), gradients (product cards, CTA band, hero black scrims). No muted/recolor "redesigns".
- Never change colors to the prior indigo/muted tokens, never remove gradients (reverted earlier at user request).
- Use only `lucide-react` icons (single family, consistent size/weight).
- Line-height, spacing, and font sizes must match the existing tokens; don't invent new type scales.
- No favicon file was shipped; don't add glyphs/emojis to headings or buttons unless explicitly asked.
- Fonts: Inter / Brockmann / Cairo / Tajawal (see `client/src/index.css` classes `font-arabic`, `font-arabic-heading`).
- Font switching classes toggle per language: `font-brockmann` (EN) vs `font-arabic-heading` (AR) in Hero; `font-inter` vs `font-arabic` elsewhere.

## Bilingual / RTL (critical)

- All visible text goes through `t()` from `client/src/contexts/LanguageContext.tsx` (the `translations` object, `en`/`ar` blocks).
- Language is a React context (current default 'en' in `LanguageProvider`). `t(key)` returns `translations[language]?.[key]`; missing key returns the key string.
- The provider sets `document.documentElement.dir = 'rtl'` and `lang = 'ar'` when Arabic is active. Never hardcode direction or bypass `t()`.
- Arabic title strings use `\n` for line breaks. Hero h1 is split per line via `React.Fragment` with a space + `<br/>` between lines.
- GSAP effects that split text into per-character `<span>`s **break Arabic** (cursive letters only join inside one text node). `lib/split-text.ts` is Arabic-aware (whole words for Arabic, i18n-safe); don't reintroduce char-splitting for Arabic.

## i18n / Deployment

- Cloudflare Pages deployment is automated via git commit/push (direct integration, no workflows in this repo).
- After any config change (`tailwind.config.ts`), restart the dev server to pick it up.

## Recent Work (commit `a58848d` baseline)

Working tree = GitHub main + 4 local edits: products grid (removed GSAP horizontal scroll → responsive `md:grid-cols-3`), Arabic hero title wording, h1 language remount + RTL split safety, `split-text` Arabic awareness. Commit/push decision pending with user.