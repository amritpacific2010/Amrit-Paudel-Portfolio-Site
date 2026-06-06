# Technical Specification

## Dependencies

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | DOM renderer |
| typescript | ^5.6.0 | Type safety |
| vite | ^6.0.0 | Build tool / dev server |
| tailwindcss | ^3.4.19 | Utility-first CSS |
| @tailwindcss/typography | ^0.5.0 | Prose styling for rich text |

### Animation
| Package | Version | Purpose |
|---------|---------|---------|
| gsap | ^3.12.0 | Core animation engine, timelines, tweens |
| lenis | ^1.1.0 | Smooth scroll with inertia |

GSAP ScrollTrigger is included with the gsap package (plugin bundled). No separate ScrollTrigger install needed.

### shadcn/ui & UI Primitives
| Package | Version | Purpose |
|---------|---------|---------|
| @radix-ui/react-dialog | ^1.1.0 | Mobile menu overlay (built-in with shadcn) |
| @radix-ui/react-slot | ^1.1.0 | Button/Link polymorphism (built-in with shadcn) |
| @radix-ui/react-progress | ^1.1.0 | Certification progress bars |
| class-variance-authority | ^0.7.0 | Component variant styling (built-in with shadcn) |
| clsx | ^2.1.0 | Conditional classnames (built-in with shadcn) |
| tailwind-merge | ^2.6.0 | Tailwind class deduplication (built-in with shadcn) |
| lucide-react | ^0.400.0 | Icon library (built-in with shadcn) |

### Fonts
| Package | Version | Purpose |
|---------|---------|---------|
| @fontsource-variable/inter | ^5.0.0 | Self-hosted Inter variable font (400-700) |

### Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| @types/react | ^18.3.0 | React type definitions |
| @types/react-dom | ^18.3.0 | ReactDOM type definitions |
| @vitejs/plugin-react | ^4.3.0 | Vite React plugin |
| postcss | ^8.4.0 | CSS processing |
| autoprefixer | ^10.4.0 | Vendor prefix automation |

---

## Component Inventory

### shadcn/ui Components (Built-in)

| Component | Source | Usage | Customization |
|-----------|--------|-------|---------------|
| Button | `components/ui/button.tsx` | CTA buttons, submit, theme toggle | Extend with icon support; add variant for theme-toggle circle |
| Card | `components/ui/card.tsx` | Project cards, education cards | Heavy styling override for hover lift, glow shadow |
| Input | `components/ui/input.tsx` | Contact form fields | Add focus ring with accent glow |
| Textarea | `components/ui/textarea.tsx` | Contact form message | Same focus treatment as Input |
| Progress | `components/ui/progress.tsx` | Certification progress bars | Custom bar fill animation with shimmer; amber/green status variants |
| Dialog | `components/ui/dialog.tsx` | Mobile menu overlay | Full-screen variant with staggered link animation |
| Separator | `components/ui/separator.tsx` | Section dividers, timeline decorative lines | - |

### Custom Components

#### Layout
| Component | File | Props |
|-----------|------|-------|
| Navbar | `sections/Navbar.tsx` | `scrolled: boolean`, `hidden: boolean`, `menuOpen: boolean`, `theme: Theme`, `onThemeToggle: () => void`, `onMenuToggle: () => void` |
| MobileMenu | `components/MobileMenu.tsx` | `open: boolean`, `onClose: () => void`, `theme: Theme`, `onThemeToggle: () => void` |
| Footer | `sections/Footer.tsx` | - |
| ScrollToTop | `components/ScrollToTop.tsx` | `visible: boolean`, `onClick: () => void` |
| Container | `components/Container.tsx` | `children`, `className?` |
| SectionLabel | `components/SectionLabel.tsx` | `label: string` |

#### Hero
| Component | File | Props |
|-----------|------|-------|
| HeroSection | `sections/Hero.tsx` | - |
| ScrollIndicator | `components/ScrollIndicator.tsx` | - |

#### About
| Component | File | Props |
|-----------|------|-------|
| AboutSection | `sections/About.tsx` | - |
| StatBlock | `components/StatBlock.tsx` | `value: string`, `label: string`, `suffix?: string` |

#### Experience
| Component | File | Props |
|-----------|------|-------|
| ExperienceSection | `sections/Experience.tsx` | - |
| TimelineCard | `components/TimelineCard.tsx` | `entry: TimelineEntry`, `side: 'left' \| 'right'`, `index: number` |

#### Skills
| Component | File | Props |
|-----------|------|-------|
| SkillsSection | `sections/Skills.tsx` | - |
| SkillCard | `components/SkillCard.tsx` | `category: SkillCategory`, `index: number` |
| SkillTag | `components/SkillTag.tsx` | `label: string` |

#### Projects
| Component | File | Props |
|-----------|------|-------|
| ProjectsSection | `sections/Projects.tsx` | - |
| ProjectCard | `components/ProjectCard.tsx` | `project: Project`, `index: number` |

#### International
| Component | File | Props |
|-----------|------|-------|
| InternationalSection | `sections/International.tsx` | - |
| HighlightCard | `components/HighlightCard.tsx` | `icon: LucideIcon`, `title: string`, `description: string` |

#### Education & Certifications
| Component | File | Props |
|-----------|------|-------|
| EducationSection | `sections/Education.tsx` | - |
| EducationCard | `components/EducationCard.tsx` | `education: Education` |
| CertificationCard | `components/CertificationCard.tsx` | `certification: Certification`, `index: number` |

#### Languages
| Component | File | Props |
|-----------|------|-------|
| LanguagesSection | `sections/Languages.tsx` | - |
| LanguageCircle | `components/LanguageCircle.tsx` | `language: Language`, `index: number` |

#### Contact
| Component | File | Props |
|-----------|------|-------|
| ContactSection | `sections/Contact.tsx` | - |
| ContactForm | `components/ContactForm.tsx` | - |
| ContactInfo | `components/ContactInfo.tsx` | - |

#### Shared / Animation
| Component | File | Props |
|-----------|------|-------|
| AnimatedCounter | `components/AnimatedCounter.tsx` | `target: number`, `suffix?: string`, `duration?: number` |
| CircularProgress | `components/CircularProgress.tsx` | `percentage: number`, `size?: number`, `label: string`, `sublabel: string` |
| ThemeToggle | `components/ThemeToggle.tsx` | `theme: Theme`, `onToggle: () => void` |

---

## Animation Implementation

### Library Choice Rationale

**GSAP chosen over Framer Motion** because:
1. All animations are scroll-linked or sequenced timelines — GSAP's ScrollTrigger and timeline API are purpose-built for this
2. The hero entrance is a complex multi-step sequence with precise delays — GSAP timelines handle this natively
3. The timeline draw animation requires scroll-scrubbing with precise progress control
4. Framer Motion's `useScroll` + `useTransform` would require more boilerplate for the same results
5. GSAP's `batch()` method is ideal for the staggered card reveals throughout

**Lenis** is required per design spec for smooth scroll inertia. It integrates with GSAP ScrollTrigger via explicit `lenis.on('scroll', ScrollTrigger.update)` wiring.

**IntersectionObserver (native)** is used for simple one-shot reveals (stat counters, language circles) to avoid unnecessary GSAP overhead.

### Animation Implementation Table

| # | Animation | Library | Implementation Approach | Complexity |
|---|-----------|---------|------------------------|------------|
| 1 | Hero entrance sequence | GSAP Timeline | Single `gsap.timeline()` with 8 sequential `.from()` calls, each with incremental delays. Animates background, overlay, greeting, name, title, description, CTAs, scroll indicator. | High |
| 2 | Hero scroll parallax | GSAP ScrollTrigger | `ScrollTrigger.create({ scrub: true })` driving `gsap.to()` on background image with `yPercent` transform. Background moves at 0.3x rate. | Low |
| 3 | Hero floating decorations | GSAP | `gsap.to()` with `yoyo: true, repeat: -1`, varied durations (6-10s) per element using `sine.inOut` ease. Purely decorative circles/lines. | Low |
| 4 | Scroll indicator bounce | CSS @keyframes | `@keyframes bounce { 0%,100% { translateY(0) } 50% { translateY(10px) } }` — infinite, 1.5s. Opacity transition to 0 when scroll > 100px via JS class toggle. | Low |
| 5 | Nav background transition | CSS transition | `transition: background 300ms, border 300ms, backdrop-filter 300ms`. Toggle classes via scroll position state. | Low |
| 6 | Nav hide/show on scroll | CSS transition + JS | Track scroll direction via `lenis.on('scroll')`. Toggle `translateY(-100%)` class on scroll-down after 200px threshold. | Low |
| 7 | Theme toggle icon morph | GSAP | `gsap.to()` rotating 180deg + crossfading between sun/moon SVG paths over 400ms. | Medium |
| 8 | Theme color transition | CSS transition | `transition: color 300ms, background-color 300ms, border-color 300ms` on all themed elements via CSS custom properties. | Low |
| 9 | Mobile menu overlay | GSAP Timeline | Timeline: overlay fade-in → links stagger from bottom (80ms stagger, 400ms each). Reverse timeline for close. | Medium |
| 10 | Mobile hamburger morph | GSAP | Top line rotates 45deg, middle line opacity to 0, bottom line rotates -45deg. 300ms total. | Low |
| 11 | Section label entrance | GSAP ScrollTrigger | `ScrollTrigger.batch()` with `from({ x: -20, opacity: 0 })` for all section labels. Threshold 0.2. | Low |
| 12 | Section heading entrance | GSAP ScrollTrigger | `gsap.from()` with `y: 30, opacity: 0` triggered by ScrollTrigger at threshold 0.2. | Low |
| 13 | About photo entrance | GSAP ScrollTrigger | `from({ scale: 0.9, x: -30, opacity: 0 })` with `power3.out` over 700ms. | Low |
| 14 | About bio text entrance | GSAP ScrollTrigger | `from({ y: 30, opacity: 0 })` 400ms delay after section trigger. | Low |
| 15 | Highlight list stagger | GSAP ScrollTrigger | `gsap.from()` with `stagger: 0.1` on list items, each `from({ x: -15, opacity: 0 })`. | Low |
| 16 | Stat count-up | Custom hook + GSAP | `useAnimatedCounter(target, duration)` hook using `gsap.to()` on a proxy object, updating React state in `onUpdate`. Format with suffix ("10+", "40+"). 2000ms duration. | Medium |
| 17 | Timeline line draw | GSAP ScrollTrigger | `gsap.from()` on line element with `scaleY: 0`, `transformOrigin: 'top'`, scrubbed to section scroll progress via `ScrollTrigger({ scrub: true })`. | Medium |
| 18 | Timeline card slide | GSAP ScrollTrigger | Left cards: `from({ x: -50, opacity: 0 })`. Right cards: `from({ x: 50, opacity: 0 })`. Individual ScrollTrigger per card at threshold 0.2. 600ms each. | Medium |
| 19 | Timeline dot pulse | GSAP | On card enter: `gsap.from(dot, { scale: 0, ease: 'elastic.out(1, 0.5)', duration: 0.4 })`. Continuous pulse: `gsap.to(dot, { scale: 1.15, yoyo: true, repeat: -1, duration: 2, ease: 'sine.inOut' })`. | Medium |
| 20 | Responsibility list stagger | GSAP ScrollTrigger | Inner timeline triggered 300ms after parent card. `stagger: 0.08`, `from({ x: -10, opacity: 0 })`. | Low |
| 21 | Skill card entrance | GSAP ScrollTrigger | `ScrollTrigger.batch()` on all skill cards. `from({ y: 40, scale: 0.95, opacity: 0 })`, `stagger: 0.1`, `duration: 0.5`. Threshold 0.15. | Medium |
| 22 | Skill card hover | CSS transition | `transition: transform 300ms cubic-bezier(0.4,0,0.2,1), border-color 300ms, box-shadow 300ms`. `translateY(-6px)` + border/shadow change on hover. | Low |
| 23 | Skill tag stagger | GSAP ScrollTrigger | Inner animation on each card's tags. `from({ scale: 0.8, opacity: 0 })`, `stagger: 0.05`, `delay: 0.2` after card appears. | Low |
| 24 | Project card entrance | GSAP ScrollTrigger | `from({ y: 50, opacity: 0 })`, `stagger: 0.2`, `duration: 0.6`. | Low |
| 25 | Project image parallax | GSAP ScrollTrigger | `gsap.to(image, { yPercent: -10, scrollTrigger: { scrub: true, trigger: card } })` — image moves at 0.9x rate creating depth. | Low |
| 26 | Project image hover overlay | CSS transition | Image scale 1→1.05 (300ms). Overlay div opacity 0→0.4 with "View Details" text centered. | Low |
| 27 | International highlight cards | GSAP ScrollTrigger | `from({ x: -30, opacity: 0 })`, `stagger: 0.15`, `duration: 0.5`. | Low |
| 28 | Education card entrance | GSAP ScrollTrigger | `from({ y: 40, opacity: 0 })`, `stagger: 0.2`, `duration: 0.6`. | Low |
| 29 | Certification card entrance | GSAP ScrollTrigger | `from({ x: -20, opacity: 0 })`, `stagger: 0.1`, `duration: 0.4`. | Low |
| 30 | Progress bar fill | GSAP ScrollTrigger | `gsap.fromTo(bar, { width: '0%' }, { width: targetPercent + '%', duration: 0.8, ease: 'power2.out' })`. Triggered after card visible. | Low |
| 31 | Progress bar shimmer | CSS @keyframes | `@keyframes shimmer { 0% { background-position: -200% } 100% { background-position: 200% } }` — linear gradient sweep, 1.5s, single pass after fill completes. | Low |
| 32 | Circular progress draw | Custom component + GSAP | SVG `<circle>` with `stroke-dasharray`/`stroke-dashoffset`. Animate `stroke-dashoffset` from circumference to target using `gsap.to()` over 1200ms. Center text counts up simultaneously. | Medium |
| 33 | Language label fade-in | GSAP ScrollTrigger | Fade in name/level label 300ms after circle animation completes. | Low |
| 34 | Contact section entrance | GSAP ScrollTrigger | Staggered: label, heading, form container, sidebar. Delays 0, 200ms, 400ms, 500ms. | Low |
| 35 | Form input focus | CSS transition | `transition: border-color 200ms, box-shadow 200ms`. Border → accent blue, `box-shadow: 0 0 0 3px rgba(59,130,246,0.15)`. | Low |
| 36 | Form submit shake | CSS @keyframes | `@keyframes shake { 0%,100% { translateX(0) } 20% { translateX(-10px) } 40% { translateX(10px) } 60% { translateX(-10px) } 80% { translateX(10px) } }` — 400ms on error. | Low |
| 37 | Form success checkmark | GSAP | `gsap.from(checkmark, { scale: 0, ease: 'elastic.out(1, 0.5)', duration: 0.6 })`. | Low |
| 38 | Scroll-to-top show/hide | CSS transition | `transition: opacity 300ms, transform 300ms`. Toggle `opacity: 0 → 1`, `translateY(20px) → 0`. | Low |
| 39 | Scroll-to-top click | Lenis | `lenis.scrollTo(0, { duration: 1.2 })`. | Low |
| 40 | Section fade-in (generic) | GSAP ScrollTrigger | `ScrollTrigger.batch()` with `from({ y: 30, opacity: 0 })`. Applied to all section content groups. | Low |

---

## State & Logic Plan

### Theme State (React Context)

**Architecture:** React Context + `useReducer` for global theme state.

**State shape:**
```typescript
type Theme = 'light' | 'dark';
interface ThemeState {
  theme: Theme;
  resolved: Theme; // actual applied theme (after system pref resolution)
}
```

**Logic:**
- On mount: read `localStorage.getItem('theme')` → if `"light"` or `"dark"`, use it. If `"system"` or null, use `window.matchMedia('(prefers-color-scheme: dark)').matches` to resolve.
- Apply `<html class="dark">` or `<html class="light">` immediately (sync, before paint)
- Toggle: flip between light/dark, persist choice to localStorage, update class
- All color values implemented as CSS custom properties scoped to `.dark` and `:root` (light) selectors
- Components read colors from CSS variables — never hardcode theme-dependent colors in JS

### Scroll State (Custom Hook)

**Architecture:** `useScrollState()` custom hook using Lenis scroll events.

**State shape:**
```typescript
interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isScrolled: boolean;     // > 50px
  isPastHero: boolean;     // > 100px (for scroll indicator)
  showScrollTop: boolean;  // > 300px
}
```

**Logic:**
- Subscribe to `lenis.on('scroll', callback)` on mount
- Debounce direction changes to avoid flicker
- Expose state via hook return value
- Navbar uses `isScrolled` + `scrollDirection` to manage background and hide/show
- ScrollToTop uses `showScrollTop`
- Scroll indicator uses `isPastHero`

### Mobile Menu State

**Architecture:** Local `useState` in Navbar component.

**State:**
```typescript
const [menuOpen, setMenuOpen] = useState(false);
```

**Logic:**
- Open: set true, lock body scroll (`lenis.stop()` or `overflow: hidden`)
- Close: set false, restore scroll
- Close on route change (not applicable for single-page) and on escape key
- Hamburger animation direction controlled by `menuOpen` state passed to MobileMenu

### Form State (Contact Form)

**Architecture:** Local `useState` with validation logic.

**State shape:**
```typescript
interface FormState {
  values: { name: string; email: string; subject: string; message: string };
  errors: Partial<Record<keyof FormState['values'], string>>;
  touched: Partial<Record<keyof FormState['values'], boolean>>;
  status: 'idle' | 'submitting' | 'success' | 'error';
}
```

**Logic:**
- Validation on blur + on submit:
  - Name: required, min 2 chars
  - Email: required, valid email format
  - Subject: required
  - Message: required, min 10 chars
- Submit: simulate API call (setTimeout 1.5s), transition through `submitting` → `success`/`error`
- Success: replace form with success message (AnimatedCounter not needed here)
- Error: shake animation + error banner
- No actual backend — form submission is client-side simulation

### Animation Trigger State (IntersectionObserver Registry)

**Architecture:** Lightweight hook `useInView(ref, options)` wrapping IntersectionObserver.

**Purpose:**
- Provide a boolean `isInView` flag per section/component
- GSAP ScrollTrigger instances use this for activation
- For simple reveals, components directly consume `isInView` without GSAP
- Observer is created once, shared across calls (singleton pattern)

**Options:**
```typescript
interface UseInViewOptions {
  threshold?: number;  // default 0.2
  once?: boolean;      // default true (disconnect after first trigger)
}
```

---

## Lenis + GSAP Integration Plan

### Initialization Order
1. Create Lenis instance in a top-level provider component
2. Connect to GSAP: `lenis.on('scroll', ScrollTrigger.update)`
3. Add Lenis RAF to GSAP ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
4. Disable GSAP lag smoothing: `gsap.ticker.lagSmoothing(0)`

### Scroll-Linked Animations
All scroll-linked animations use GSAP ScrollTrigger (not Lenis callbacks) for consistency:
- Hero parallax: `ScrollTrigger({ trigger: hero, scrub: true })`
- Timeline line draw: `ScrollTrigger({ trigger: timelineSection, scrub: true })`
- Project image parallax: `ScrollTrigger({ trigger: card, scrub: true })`
- Section entrances: `ScrollTrigger({ trigger: section, start: 'top 80%' })`

Lenis provides the smooth scroll feel; ScrollTrigger reads the smoothed scroll position.

---

## Project File Structure

```
/mnt/agents/output/app/
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── about-photo.jpg
│   │   ├── project-cctv.jpg
│   │   ├── project-fiber.jpg
│   │   ├── project-radio.jpg
│   │   ├── project-embedded.jpg
│   │   ├── project-pcb.jpg
│   │   └── project-sudan.jpg
│   └── resume.pdf              # Placeholder for downloadable resume
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css               # Global styles, CSS custom properties, font-face
│   ├── types/
│   │   └── index.ts            # All TypeScript interfaces
│   ├── data/
│   │   └── portfolio.ts        # Static content data (experience, skills, projects, etc.)
│   ├── hooks/
│   │   ├── useTheme.ts         # Theme context + toggle logic
│   │   ├── useScrollState.ts   # Lenis-based scroll tracking
│   │   ├── useInView.ts        # IntersectionObserver hook
│   │   └── useAnimatedCounter.ts # GSAP-powered number animation
│   ├── lib/
│   │   ├── utils.ts            # cn() utility, shadcn utils
│   │   └── gsap-setup.ts       # GSAP plugin registration + Lenis integration
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── progress.tsx
│   │   │   └── dialog.tsx
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── Container.tsx
│   │   ├── SectionLabel.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ScrollIndicator.tsx
│   │   ├── StatBlock.tsx
│   │   ├── TimelineCard.tsx
│   │   ├── SkillCard.tsx
│   │   ├── SkillTag.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── HighlightCard.tsx
│   │   ├── EducationCard.tsx
│   │   ├── CertificationCard.tsx
│   │   ├── LanguageCircle.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ContactInfo.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── CircularProgress.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── International.tsx
│       ├── Education.tsx
│       ├── Languages.tsx
│       └── Contact.tsx
├── tailwind.config.js          # Custom theme colors referencing CSS vars
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Tailwind Configuration Strategy

### CSS Custom Properties Approach

All theme-dependent colors defined as CSS custom properties in `index.css`:

```css
:root {
  --background: #F5F7FA;
  --surface: #FFFFFF;
  --surface-elevated: #EDF0F5;
  --text-primary: #1A2332;
  /* ... etc */
}

.dark {
  --background: #0B1120;
  --surface: #1A2332;
  /* ... etc */
}
```

Tailwind config extends theme to reference these variables:
```javascript
colors: {
  background: 'var(--background)',
  surface: {
    DEFAULT: 'var(--surface)',
    elevated: 'var(--surface-elevated)',
  },
  accent: {
    blue: 'var(--accent-blue)',
    'blue-dark': 'var(--accent-blue-dark)',
    'blue-light': 'var(--accent-blue-light)',
    glow: 'var(--accent-blue-glow)',
  },
  // ...
}
```

Components use Tailwind classes (`bg-background`, `text-text-primary`, `border-border`) which automatically resolve to the correct CSS variable value based on the active theme class on `<html>`.

---

## Responsive Strategy

### Breakpoint Usage
- **Mobile (< 768px):** Single column, stacked layouts, hamburger nav, reduced section padding (4rem), timeline line on left
- **Tablet (768-1199px):** Two-column grids, medium padding (6rem), full nav visible
- **Desktop (>= 1200px):** Full layout, max padding (8rem), alternating timeline, all hover effects active

### Tailwind Breakpoints
Use default Tailwind breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.
Key breakpoints in practice: `md:` (768px) for tablet, `lg:` (1024px) for desktop layout.

### Mobile-Specific Behavior
- No hover-dependent interactions (use tap/active states instead)
- Touch-friendly tap targets (min 44x44px)
- Reduced animation complexity (fewer floating elements, shorter durations)
- Timeline: single column, line on left side
- Language circles: 2x2 grid instead of horizontal row
- Project cards: single column, no parallax

---

## Accessibility Plan

### Requirements
- `prefers-reduced-motion`: Wrap all GSAP animations in `!prefersReducedMotion` check. Disable floating decorations, shorten entrance durations, remove parallax.
- Focus indicators: 2px solid accent-blue outline with 2px offset on all interactive elements
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` landmarks
- ARIA: `aria-label` on nav, `aria-expanded` on mobile menu, `aria-current` on active nav link
- Form: `<label>` elements with `htmlFor`, `aria-invalid` on error fields, `aria-describedby` linking to error messages
- Theme toggle: `aria-label="Toggle dark mode"`
- Skip-to-content link (visually hidden, focusable)

### Contrast
All text/background combinations verified against WCAG AA:
- Light mode: #1A2332 on #F5F7FA (passes AAA)
- Dark mode: #F1F5F9 on #0B1120 (passes AAA)
- Accent: #3B82F6 on both backgrounds (passes AA for large text, UI components)
