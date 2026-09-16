# Kevin A. Fabillar — Portfolio

Live: [kevinfabillarportfolio.vercel.app](https://kevinfabillarportfolio.vercel.app/)

Built with **Vue 3**, **Vite**, and **PrimeVue 4** (Aura theme, custom "circuit-board" preset).

## Sections
- About Me
- Education
- Tech Stack
- Licenses & Certifications
- Projects

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Customizing

- Colors, fonts: `src/style.css` (CSS custom properties at the top)
- PrimeVue theme preset: `src/main.js`
- Content for each section: the corresponding component in `src/components/`
- Social links (LinkedIn / GitHub) are placeholders (`href="#"`) in
  `src/components/FooterContact.vue` — update with your real profile URLs.

## Deploying

The `dist/` folder from `npm run build` is static and can be deployed to
Vercel, Netlify, GitHub Pages, or any static host.
