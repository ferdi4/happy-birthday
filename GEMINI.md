# Happy Birthday Jannis 👦

A lightweight, single-page interactive birthday greeting card for Jannis, featuring a DOM-based confetti animation.

## Project Overview

- **Purpose**: Displays a personalized birthday greeting with an automated glowing radioactive confetti animation on Jannis's actual birthday (October 13th). On any other day, it triggers an immersive "System Chrono-Breach" warning console that locks down the reactor, displays a real-time countdown to birthday authorization, and renders a ticking "Chrono-Meltdown Progress" bar and real-time core temperature gauge climbing towards a critical 10,000°C detonated state as Jannis's birthday approaches.
- **Theme**: High-fidelity "Radioactive Powerplant Control Room" CRT monitor aesthetic. Features custom scanlines, diagonal hazard stripes that shift colors based on active status, a rotating nuclear icon, glowing console panels, blinking alert beacons, and neon particle effects.
- **Technologies**: Pure vanilla HTML5, CSS3, and JavaScript (ES6+).
- **Architecture**: Static front-end with zero external dependencies.
  - `index.html`: Entry point representing an interactive electronic console, split into active celebration and alert lockdown panels.
  - `style.css`: Advanced industrial terminal layout styling, utilizing responsive flexbox, custom animated scanline overlays, blinking status light keyframes, and modern CSS `:has()` pseudo-class rules.
  - `crap.js`: Refactored script containing:
    - High-performance, canvas-free, DOM-based confetti particle physics featuring custom high-energy glowing radioactive isotopes (toxic green, electric lime, quantum cyan, fission orange).
    - An automatic, ticking real-time countdown calculator and renderer.
  - `quappo.ico`: Favicon asset.
  - `share-tech-mono.woff2`: Self-hosted web font (Latin, Regular) ensuring 100% offline-ready typography.
  - `robots.txt`: Anti-indexing instruction to block search engines from crawling the site.

---

## Privacy Protection

To ensure Jannis's birthday card remains fully private and unlisted in public search results, two layers of defense are implemented:
1. **Robots Meta Tag**: Embedded `<meta name="robots" content="noindex, nofollow">` inside the HTML `<head>` tells search engine indexers to ignore and not list the page.
2. **Robots.txt Directives**: A root `robots.txt` file tells all search crawlers (`User-agent: *`) not to index any paths (`Disallow: /`).

---

## Birthday Logic

The greeting triggers if and only if the current date matches Jannis's birthday:
- **Date**: **October 13th**
- **Implementation (in `crap.js`)**:
  ```javascript
  13 === t.getDate() && 9 === t.getMonth()
  ```
  *(Note: `getMonth()` is zero-indexed, where `9` represents October).*

---

## Building and Running

Since this is a fully static client-side application, there is no build step or package manager.

### How to Run Locally

1. **Direct File Open**:
   Double-click `index.html` or open it directly in any modern web browser.

2. **Using a Local Server (Recommended)**:
   To avoid potential CORS or path resolution issues with some browser security models, serve the files locally.
   - **Python 3**:
     ```bash
     python3 -m http.server 8000
     ```
   - **Node.js (`npx`)**:
     ```bash
     npx serve
     ```
   - **Python 2**:
     ```bash
     python -m SimpleHTTPServer 8000
     ```
   Once running, access the page at `http://localhost:8000`.

### Testing / Testing Birthday Flow

To test or preview the greeting and confetti animation on days other than October 13th, you can:
- **Option A (Browser Console DevTools)**:
  Open the browser console and run `confetti()` manually, or change the CSS display property of the elements:
  ```javascript
  document.getElementById("cheating").style.display = "none";
  document.getElementById("greeting").style.display = "block";
  confetti();
  ```
- **Option B (System Date)**:
  Temporarily change your operating system date to **October 13th**.

---

## Development Conventions

- **Vanilla Stack**: Do not introduce build tools, transpilers, or third-party frameworks unless explicitly requested. Keep the code simple, fast, and accessible directly in standard browsers.
- **Code Minification**: The original `crap.js` is minified. If making complex edits, consider formatting the code first, making edits, and maintaining readable, well-commented structures.
- **Responsive Layout**: Maintain CSS flexbox rules to ensure Jannis can view the page nicely on mobile, tablet, or desktop devices.
