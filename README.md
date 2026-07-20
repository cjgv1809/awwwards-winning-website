<div align="center">

# Awwwards Winning Website

A pixel-for-pixel study clone of an Awwwards-style, animation-heavy landing page — built to learn scroll-driven storytelling with **GSAP**, and used as a testbed for a full **Playwright + GitHub Actions** CI/CD pipeline deployed to **GitHub Pages**.

[![React](https://img.shields.io/badge/-React_18-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/-GSAP-black?style=for-the-badge&logoColor=white&logo=greensock&color=88CE02)](https://gsap.com)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4)](https://tailwindcss.com)
[![Playwright](https://img.shields.io/badge/-Playwright-black?style=for-the-badge&logoColor=white&logo=playwright&color=2EAD33)](https://playwright.dev)

**[Live demo →](https://cjgv1809.github.io/awwwards-winning-website/)**

</div>

---

## ⚠️ Disclaimer

This is an **educational clone**, built to study award-winning web animation techniques. All original design and creative direction credit goes to **[Zentry](https://zentry.com/)**.

## Table of contents

- [Awwwards Winning Website](#awwwards-winning-website)
  - [⚠️ Disclaimer](#️-disclaimer)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Tech stack](#tech-stack)
  - [Project structure](#project-structure)
  - [Getting started](#getting-started)
  - [Available scripts](#available-scripts)
  - [Testing](#testing)
  - [CI/CD](#cicd)

## Features

- 🎬 **Scroll-driven storytelling** — pinned sections, clip-path reveals, and 3D title animations built with GSAP + ScrollTrigger
- 🖱️ **Interactive micro-animations** — mouse-tracked 3D tilt on cards and preview videos, swipeable hero video switcher
- 🎨 **Custom design system** — Tailwind CSS extended with the project's own type scale, color palette, and animation utility classes
- ✅ **End-to-end tested** — Playwright suite covering navigation, hero interactions, and scroll-triggered animation states
- 🚀 **Automated CI/CD** — GitHub Actions pipeline running lint, build, and e2e tests on every push/PR, auto-deploying to GitHub Pages on `main`

## Tech stack

| Layer | Tools |
|---|---|
| Framework | [React 18](https://react.dev) + [Vite](https://vitejs.dev) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Animation | [GSAP](https://gsap.com) + [`@gsap/react`](https://www.npmjs.com/package/@gsap/react) (`useGSAP`, `ScrollTrigger`) |
| Testing | [Playwright](https://playwright.dev) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) → [GitHub Pages](https://pages.github.com) |
| Tooling | ESLint, Prettier, pnpm |

## Project structure

```
├── .github/workflows/ci.yml   # lint → build → e2e tests → deploy to Pages
├── public/                    # fonts, images, videos, audio
├── src/
│   ├── components/            # one component per landing-page section
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Features.jsx
│   │   ├── Story.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── AnimatedTitle.jsx  # reusable scroll-triggered 3D title
│   │   ├── VideoPreview.jsx   # reusable mouse-tilt/parallax wrapper
│   │   └── Button.jsx
│   ├── index.css              # fonts + Tailwind animation utility classes
│   ├── App.jsx
│   └── main.jsx
├── tests/                     # Playwright e2e specs
└── playwright.config.js
```

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org) 24+ and [pnpm](https://pnpm.io) 9+.

```bash
git clone https://github.com/cjgv1809/awwwards-winning-website.git
cd awwwards-winning-website
pnpm install
pnpm dev
```

The app runs at `http://localhost:5173`.

## Available scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the Vite dev server |
| `pnpm build` | Production build to `dist/` |
| `pnpm build:gh-pages` | Production build with the `/awwwards-winning-website/` base path, used by the Pages deploy |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm test:e2e` | Run the Playwright suite headlessly |
| `pnpm test:e2e:ui` | Run Playwright in interactive UI mode |
| `pnpm test:e2e:report` | Open the last HTML test report |

## Testing

The [`tests/`](tests) directory covers the parts of the app that actually have behavior to break:

| Spec | Covers |
|---|---|
| [`smoke.spec.js`](tests/smoke.spec.js) | Page loads, every section renders, zero runtime JS errors |
| [`navbar.spec.js`](tests/navbar.spec.js) | Nav links, audio toggle, show/hide/floating scroll behavior |
| [`hero.spec.js`](tests/hero.spec.js) | Background video, trailer CTA, mini-preview video switching |
| [`about-scroll.spec.js`](tests/about-scroll.spec.js) | `AnimatedTitle` fade-in and the pinned clip-path expand animation |
| [`contact-footer.spec.js`](tests/contact-footer.spec.js) | CTA copy, footer links and their `target`/`rel` attributes |

```bash
pnpm test:e2e
```

## CI/CD

Every push and pull request to `main` triggers [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. **Lint & build** — fails fast on syntax/type issues before the slower steps run
2. **E2E tests** — installs Chromium and runs the full Playwright suite; the HTML report is uploaded as an artifact even on failure
3. **Deploy** *(main branch only, after tests pass)* — rebuilds with the correct base path and publishes to GitHub Pages via `actions/deploy-pages`

GitHub Actions is free and unlimited for public repositories on standard runners, which is what powers this pipeline end to end at no cost.
