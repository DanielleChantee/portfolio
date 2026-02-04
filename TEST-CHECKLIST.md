# Portfolio Site - Testing Checklist

Run `bundle exec jekyll serve` then open **http://127.0.0.1:4000/portfolio/** and test the following.

## Quick Checks

### 1. **Clear cache first**
- Open DevTools (F12 or Cmd+Option+I)
- Application tab → Storage → **Clear site data**
- Or use **Incognito/Private window** for fresh load

### 2. **Page-by-page test**

| Page | URL | What to check |
|------|-----|---------------|
| Home | `/portfolio/` | Nav visible, client logos scroll, carousel works, "Get a Quote" button |
| Services | `/portfolio/services.html` | Banner, 4 service cards, process steps (1-2-3), CTA buttons |
| Work | `/portfolio/work.html` | Circle nav thumbnails, project sections, carousel prev/next, "View Case Study" links |
| About | `/portfolio/about.html` | Banner, content sections, CTA buttons |
| Rates | `/portfolio/rates.html` | Banner, content sections, "Get a Quote" CTA |
| Contact | `/portfolio/contact.html` | Banner, LinkedIn/email links, form (email + message fields) |

### 3. **Project pages**
- `/portfolio/projects/fudge-kitchen.html`
- `/portfolio/projects/esl.html`
- `/portfolio/projects/pets-purest.html`
- `/portfolio/projects/adios-plastic.html`
- `/portfolio/projects/bottlebrush-ferments.html`

Check: Hero image loads, "Visit Site" or "Back to Work" link works.

### 4. **Navigation**
- Click each nav link (Home, Services, About, Work, Rates, Contact)
- On Work, hover to open mega menu — click a project thumbnail
- Mobile: Open hamburger menu, test all links

### 5. **Console errors**
- DevTools → Console tab
- Look for red errors (404, JavaScript errors)
- Common: `Failed to load resource` = broken image/script path

### 6. **Network tab**
- DevTools → Network tab → Reload
- Filter by "Img" or "Doc" — any red (failed) requests?

## Known gotchas

- **baseurl**: Site lives at `/portfolio/` — links must include that
- **Service worker**: On localhost, it auto-unregisters. If you see old content, clear site data
- **Hard refresh**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows) to bypass cache

## Run link check (optional)

```bash
# From project root, with Jekyll serving:
# Install: npm install -g linkinator
linkinator http://127.0.0.1:4000/portfolio/ --recurse
```

Or manually click through every link on the site.
