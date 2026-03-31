# Anseru — Marketing Site

Single-page marketing site for Anseru, an AI tool for automating RFP and security questionnaire responses.

## Stack

- **Vite** — dev server and bundler
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin (no config file)
- **GSAP + ScrollTrigger** — scroll-driven animations
- Vanilla JS (`src/main.js`) — no framework

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Project Structure

```
index.html        # All page markup lives here
src/
  main.js         # All interactivity — init functions called on DOMContentLoaded
  index.css       # Global styles and Tailwind utility classes
  assets/         # Images imported via Vite for hashed URLs
public/           # Static assets (favicon, web manifest)
```