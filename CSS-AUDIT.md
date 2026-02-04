# CSS Architecture Audit

## Root Causes of Visual Inconsistencies

### 1. **Specificity conflicts – same selector, different files**

`.image-banner .image-banner-content` was defined in both:
- **client-work.css** (Services, About, Work): `background: rgba(255,255,255,0.75)`, `text-shadow`
- **index.css** (Index): `background: rgba(255,255,255,0.5)` (lower contrast)

**Result:** Same specificity → load order wins. Because index.css loaded after client-work.css, Services and About used the index overlay (0.5), so hero text was hard to read.

**Fix:** Scoped selectors:
- `.client-work-image-banner .image-banner-content` (Services, About, Work)
- `.main-image-banner .image-banner-content` (Index only)

### 2. **CSS load order**

**Before:** variables → styles.html (all page CSS) → style.css → header → footer

**Problem:** style.css loaded last, so base styles overrode page-specific styles. Page-specific rules were meant to override base but could not.

**Fix:** variables → style.css → header → footer → styles.html

Page-specific styles now load last and can override base styles.

### 3. **Duplicate rules across files**

`.image-banner h1/h2/p` and `.button-row .btn` were defined in:
- client-work.css
- index.css
- style.css

**Fix:** Scoped to `.client-work-image-banner` and `.main-image-banner` so each banner type has its own rules.

### 4. **All page CSS on all pages**

styles.html loads client-work, work, about, index, contact on every page. That:
- Adds unused CSS
- Increases risk of conflicts when selectors overlap

**Current approach:** Scoped selectors reduce conflicts. Conditional loading per page could be added later if needed.

### 5. **Jekyll layout split**

- **Index:** `layout: null` → custom `<head>`, loads its own CSS
- **Other pages:** `layout: default` → shared layout + styles.html

Index must load style.css and client-work.css explicitly (already done).

## Load Order Summary

**Default layout (Services, About, Work, etc.):**
1. variables.css
2. style.css (base)
3. header.css, footer.css
4. styles.html (client-work, work, about, index, contact)

**Index (layout: null):**
1. variables.css
2. style.css
3. header.css
4. client-work.css
5. index.css
6. footer.css
