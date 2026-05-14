# Ashmina Rai — Portfolio v2

A dark-navy + mint developer portfolio in the spirit of brittanychiang.com / gazijarin.com. Plain HTML / CSS / JS — no build step.

## File structure

```
portfolio/
├── index.html
├── styles.css
├── script.js
├── vercel.json          # cache headers + clean URLs
├── assets/
│   └── profile.jpg      # your portrait
└── README.md
```

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy to Vercel

### Option A — drag & drop (fastest)
1. Sign in at https://vercel.com
2. **Add New… → Project**, then drop the `portfolio` folder in
3. Framework Preset: **Other**. Build command: *(leave blank)*. Output dir: `./`
4. Deploy. Done in ~30 seconds.

### Option B — GitHub + Vercel
1. Push this folder to a GitHub repo (e.g. `ashminarai/portfolio`).
2. On Vercel: **Add New… → Project → Import** the repo.
3. Accept the defaults — no build needed. Deploy.

### Option C — Vercel CLI
```bash
npm i -g vercel
cd portfolio
vercel        # follow prompts (first deploy)
vercel --prod # promote to production
```

## Customize

**All copy** lives in `index.html` — paragraphs, project descriptions, tab content, etc.

**Colors** are CSS variables at the top of `styles.css`:

| Variable | Hex |
|---|---|
| `--navy` | `#0a192f` |
| `--light-navy` | `#112240` |
| `--lightest-navy` | `#233554` |
| `--slate` | `#8892b0` |
| `--light-slate` | `#a8b2d1` |
| `--lightest-slate` | `#ccd6f6` |
| `--white` | `#e6f1ff` |
| `--green` *(accent)* | `#64ffda` |

**Photo** — replace `assets/profile.jpg` with your own (square works best, the frame is 1:1).

**Projects** — the three Featured Projects are CSS-illustrated mockups (no screenshots needed). To swap one for a real screenshot, replace the entire `.mock` block inside `.featured__image` with an `<img>`.

## What's in here

- Loader animation with the "A" hex logo
- Sticky nav with scroll-up reveal / scroll-down hide
- Vertical side rails: social icons (left), rotated email (right)
- Hero with staggered fade-in entry
- About section with the iconic mint-offset photo frame
- Experience as accessible vertical tabs (keyboard navigable)
- Three Featured Projects with custom CSS dashboard / property-grid / music-player mockups
- "Other Noteworthy Projects" — folder cards in a responsive grid
- Contact CTA with hover lift
- `prefers-reduced-motion` respected throughout
- Fully responsive down to ~360px (mobile hamburger menu kicks in)

## Credits

Aesthetic inspired by Brittany Chiang's [v4 personal site](https://brittanychiang.com) and Gazi Jarin's [gazijarin.com](https://www.gazijarin.com).
