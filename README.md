# Forge Athletic Club — Website

A simple, responsive 3-page fitness club site built with Next.js (App Router).

## Pages
- **Home** (`/`) — intro, philosophy, stats, and what the club offers
- **Events** (`/events`) — upcoming events, each with a "Register" button linking to a Google Form
- **Contact Us** (`/contact`) — social links, email, WhatsApp, and location/hours

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Where to edit things

- **Club name / tagline** — `components/Header.js`, `components/Footer.js`, `app/page.js`
- **Events + Google Form links** — `app/events/page.js`, edit the `EVENTS` array. Replace each
  `formLink` with your real Google Form share link (Google Forms → Send → 🔗 icon → Copy link).
- **Social links** — `app/contact/page.js`, edit the `SOCIALS` array (Instagram, Facebook,
  YouTube, WhatsApp, Email) and `components/Footer.js` for the footer social list.
- **Colors / fonts** — design tokens live at the top of `app/globals.css` (`--ink`, `--ember`,
  `--volt`, etc.) and font imports are in `app/layout.js`.
- **Address / hours** — `app/contact/page.js`, inside the `infoCard` section.

## Responsiveness

Layout is built mobile-first with CSS Grid/Flexbox and breakpoints at ~640px, ~720/860px.
The header collapses into a hamburger menu below 860px wide.

## Deploying

This is a standard Next.js app — it deploys as-is to Vercel, Netlify, or any Node host:

```bash
npm run build
npm run start
```
