# Styling Intent by Section

Reference for alignment and layout. Edits should respect these intentions.

## Hero Banners
- **Selector:** `.image-banner`, `.main-image-banner`, `.client-work-image-banner`
- **Alignment:** CENTER (text, buttons)
- **Pages:** All (index, services, about, work, rates, contact, jobs)
- **Rationale:** Focal impact, hero moment

## Clients Section (Brands / Experience)
- **Selector:** `.clients.content-section`
- **Alignment:** LEFT (h1, h2, p, buttons)
- **Override:** `index.css` → `.clients .button-row { justify-content: flex-start }`
- **Pages:** index.html (Brands), jobs.html (Experience)
- **Rationale:** Content block left-aligned; buttons align with text

## CTA Sections (Ready to build / Let's work together)
- **Selector:** `.cta-section`
- **Alignment:** LEFT (h2, p, buttons)
- **Override:** `about.css` → `.cta-section .button-row { justify-content: flex-start }`
- **Pages:** about, services, work, rates
- **Rationale:** Call-to-action aligns with supporting text

## About Content Sections
- **Selector:** `.about.content-section`
- **Alignment:** LEFT (h2, p)
- **Pages:** about, services, rates
- **Rationale:** Text blocks left-aligned within centered content container

## About-Features (Dark Sections)
- **Selector:** `.about-features.content-section`
- **Alignment:** LEFT (h2, p, ul)
- **Override:** `about.css` → `.about-features ul { margin-left: 0 }`
- **Pages:** about, jobs, rates, services
- **Rationale:** Bullet lists align with headings and paragraphs

## Process Steps (How I Work - Services)
- **Selector:** `.process-steps`
- **Alignment:** CENTER (1, 2, 3 cards as a group)
- **Pages:** services.html only
- **Rationale:** Visual flow, numbered steps centered for balance

## Services Content Section (Expertise)
- **Selector:** `.services.content-section`
- **Alignment:** LEFT (h1, h2, service items)
- **Pages:** index, jobs
- **Rationale:** Content left-aligned

## Footer
- **Selector:** `footer`
- **Alignment:** CENTER
- **Rationale:** Standard footer layout

## Project Filter (Work Page)
- **Selector:** `.project-filter`
- **Alignment:** CENTER
- **Rationale:** Filter UI centered
