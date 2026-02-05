# Design System & Component Reference

## CSS Variables (Theme System)

### Color Variables

```css
/* Primary Colors - Ocean/Whale Theme */
--primary-dark:     #0a3d62    /* Deep ocean, trust, authority */
--primary:          #1a5f7a    /* Mid ocean, main branding */
--primary-light:    #2e8b9e    /* Light ocean, interactive states */
--primary-lighter:  #48b0ca    /* Very light, subtle accents */

/* Accent Colors - Sunset/Wine Theme */
--accent-sunset:    #d97706    /* Energy, CTAs, warmth */
--accent-warm:      #ea580c    /* Warm accent, emphasis */
--accent-wine:      #722f37    /* Sophistication, heritage */
--accent-gold:      #f59e0b    /* Luxury, premium feel */

/* Nature Colors */
--nature-forest:    #1f4d2f    /* Fynbos, deep nature */
--nature-fynbos:    #8b6f47    /* Earth tones */
--nature-sage:      #6b8e71    /* Growth, service areas */
--nature-cream:     #faf5f0    /* Warm background */

/* Whale & Ocean Theme */
--whale-dark:       #1a2d3a    /* Header background */
--ocean-deep:       #0c3d5c    /* Gradient end */
--ocean-mid:        #1a5f7a    /* Mid tone */
--ocean-light:      #2e8b9e    /* Light ocean */
--water-foam:       #d4e8f0    /* Subtle highlight */

/* Neutrals */
--text-dark:        #1a1a1a    /* Primary text */
--text-dark-alt:    #2d3436    /* Alternative dark */
--text-muted:       #636e72    /* Secondary text */
--text-light:       #b2bec3    /* Tertiary text */
--bg-white:         #ffffff    /* Pure white */
--bg-light:         #f8fafc    /* Light background */
--bg-lighter:       #f1f5f9    /* Lighter background */
--bg-dark:          #0f172a    /* Dark background */
--border-light:     #e2e8f0    /* Light borders */
--border-mid:       #cbd5e0    /* Medium borders */
```

### Spacing Variables

```css
--spacing-xs:   0.25rem    /* 2px   - Fine adjustments */
--spacing-sm:   0.5rem     /* 4px   - Tight spacing */
--spacing-md:   1rem       /* 8px   - Standard padding */
--spacing-lg:   1.5rem     /* 12px  - Component spacing */
--spacing-xl:   2rem       /* 16px  - Section gaps */
--spacing-2xl:  3rem       /* 24px  - Section padding */
--spacing-3xl:  4rem       /* 32px  - Large sections */
--spacing-4xl:  6rem       /* 48px  - Hero spacing */
```

### Typography Variables

```css
--font-sans:    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
--font-serif:   Georgia, 'Times New Roman', serif

/* Font Sizes */
--text-xs:      0.75rem    /* 12px  - Small labels */
--text-sm:      0.875rem   /* 14px  - Secondary text */
--text-base:    1rem       /* 16px  - Body text */
--text-lg:      1.125rem   /* 18px  - Large text */
--text-xl:      1.25rem    /* 20px  - Heading 5 */
--text-2xl:     1.5rem     /* 24px  - Heading 4 */
--text-3xl:     1.875rem   /* 30px  - Heading 3 */
--text-4xl:     2.25rem    /* 36px  - Heading 2 */
--text-5xl:     3rem       /* 48px  - Heading 1 */
```

### Other Variables

```css
/* Border Radius */
--radius-sm:        0.375rem  /* 6px   - Small radius */
--radius-md:        0.5rem    /* 8px   - Medium radius */
--radius-lg:        0.75rem   /* 12px  - Large radius */
--radius-xl:        1rem      /* 16px  - Extra large */
--radius-2xl:       1.5rem    /* 24px  - 2X large */
--radius-full:      9999px    /* Full circle */

/* Shadows */
--shadow-sm:        0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md:        0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
--shadow-lg:        0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
--shadow-xl:        0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
--shadow-2xl:       0 25px 50px -12px rgba(0, 0, 0, 0.25)

/* Transitions */
--transition-fast:  150ms ease
--transition-base:  250ms ease
--transition-slow:  350ms ease

/* Z-Index Scale */
--z-dropdown:       1000
--z-sticky:         1020
--z-fixed:          1030
--z-modal-backdrop: 1040
--z-modal:          1050
```

---

## Component Guide

### Header Component

**File:** `src/components/Header.jsx` + `src/components/Header.css`

**Props:**
```jsx
<Header 
  onNavigate={(section) => setActiveSection(section)}
  activeSection={activeSection}
/>
```

**Features:**
- Sticky positioning (z-index: 1020)
- Glassmorphic design with backdrop blur
- Responsive hamburger menu
- Active page indicator
- Phone CTA button

**Mobile Breakpoint:** 768px (hamburger activation)

### Hero Component

**File:** `src/components/Hero.jsx` + `src/components/Hero.css`

**Features:**
- Parallax background image
- Ocean gradient overlay
- Three CTA buttons
- Smooth entrance animation
- Responsive height (500px desktop, 350px mobile)

**Image Path:** `/src/assets/hero-large.jpg`

### Services Component

**File:** `src/components/Services.jsx` + `src/components/Services.css`

**Grid Layout:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px

**Service Card Structure:**
```jsx
{
  icon: '🚗',
  title: 'Airport Transfers',
  description: 'Professional pickup and drop-off...'
}
```

### Service Area Map

**File:** `src/components/ServiceAreaMap.jsx` + `src/components/ServiceAreaMap.css`

**Features:**
- SVG-based map (scalable)
- Color-coded service zones
- Location markers
- Service detail cards
- Responsive legend

### Booking Component

**File:** `src/components/Booking.jsx` + `src/components/Booking.css`

**Dual Services:**
1. **Shuttle Service** - Gold/Orange gradient
2. **Chauffeur Service** - Ocean gradient

**Form Fields:**
- Pickup/Dropoff locations
- Date & time
- Passenger count
- Customer details
- Flight number (airport transfers)
- Comments

### Contact Component

**File:** `src/components/Contact.jsx` + `src/components/Contact.css`

**Layout:**
- Two-column (desktop)
- Single-column (mobile)
- Map + Info left
- Form right

**Form Integration:** Web3Forms API

### Footer Component

**File:** `src/components/Footer.jsx` + `src/components/Footer.css`

**Sections:**
1. Brand Information
2. Quick Links
3. Contact Details
4. Social Media

**Features:**
- 4-column grid (responsive)
- Gradient background matching header
- Animated underlines on links
- Social icon circles

---

## Animation Reference

### Entrance Animations

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Continuous Animations

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

### Usage Classes

```css
.animate-fade      /* fadeIn 0.6s ease-out */
.animate-slide-up  /* slideUp 0.6s ease-out */
.animate-scale     /* scaleIn 0.6s ease-out */
.animate-float     /* float 3s ease-in-out infinite */
.animate-pulse     /* pulse 2s ease-in-out infinite */
```

---

## Responsive Breakpoints

```javascript
// Mobile-first approach
// Default: 320px (mobile)

@media (min-width: 375px) {
  /* iPhone 11 Pro Max, larger phones */
}

@media (min-width: 425px) {
  /* Large phones */
}

@media (min-width: 768px) {
  /* Tablets, hamburger menu closes */
  .hide-mobile { display: block; }
  .hide-desktop { display: none; }
}

@media (min-width: 1024px) {
  /* Small desktops */
}

@media (min-width: 1280px) {
  /* Large desktops */
  .container { max-width: 1280px; }
}
```

---

## Button Styles

### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-sunset) 100%);
  color: white;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.4);
}
```

### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: all var(--transition-base);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent-gold);
}
```

---

## Form Input Styles

```css
.form-input {
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  transition: all var(--transition-base);
  background: var(--bg-white);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 4px rgba(46, 139, 158, 0.1);
  background: rgba(46, 139, 158, 0.01);
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--primary-dark);
}
```

---

## Accessibility Classes

```css
/* Skip to content (keyboard navigation) */
.skip-to-content {
  position: absolute;
  left: -9999px;
  z-index: var(--z-fixed);
}

.skip-to-content:focus {
  left: 0;
  top: 0;
  padding: var(--spacing-md);
  background: var(--primary);
  color: white;
}

/* Focus indicators */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Utility Classes

```css
/* Display utilities */
.container          /* max-width 1280px, auto margins */
.hide-mobile        /* display: none on mobile */
.hide-desktop       /* display: none on desktop */

/* Text utilities */
.text-primary       /* color: var(--primary) */
.text-accent        /* color: var(--accent-sunset) */
.text-muted         /* color: var(--text-muted) */

/* Background utilities */
.bg-primary         /* background: var(--primary) */
.bg-light           /* background: var(--bg-light) */

/* Animation utilities */
.animate-fade       /* animation: fadeIn */
.animate-slide-up   /* animation: slideUp */
.animate-float      /* animation: float */
```

---

## Maintenance Guide

### Adding New Colors
1. Add variable to `:root` in `theme.css`
2. Use variable name throughout components
3. Follow naming convention: `--[category]-[shade]`
4. Test contrast ratio (WCAG AA minimum 4.5:1)

### Modifying Spacing
1. Update value in `theme.css`
2. Use `var(--spacing-*)` instead of hardcoded values
3. Maintains consistency across all components

### Adding Animations
1. Define `@keyframes` in `base.css`
2. Create utility class (`.animate-*`)
3. Use in components with `animation` property
4. Test performance (maintain 60fps)

### Updating Typography
1. Modify `--text-*` variables in `theme.css`
2. Update heading styles in `base.css` if needed
3. Test readability on mobile (minimum 16px)

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android (latest)

### Fallbacks
- CSS Grid → Flex fallback
- backdrop-filter → solid background fallback
- CSS variables → Modern browsers only
- SVG maps → Raster fallback if needed

---

**Design System Version:** 2.0
**Last Updated:** February 2, 2026
**Status:** Production Ready
