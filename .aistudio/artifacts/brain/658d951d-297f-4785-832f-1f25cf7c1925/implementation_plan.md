# Responsive Spacing Harmonization & Spatial Traversal Mobile HUD

Comprehensive responsive design audit and layout overhaul addressing vertical pacing, viewport height clipping, container margins, and mobile HUD collision across the 3D Spatial Traversal section and all editorial sections.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following design decisions were confirmed via interactive clarification and will govern the responsive refactoring:

- **Confirmed Decision 1: Section Spacing Scale**: Balanced responsive scaling (`py-16 sm:py-24 md:py-32 lg:py-36`) with comfortable mobile breathing room (`px-4 sm:px-6 md:px-12 lg:px-16`), avoiding cramped mobile screens while preserving architectural editorial grandeur on larger viewports.
- **Confirmed Decision 2: Spatial Traversal Mobile HUD**: Streamlined compact HUD with swipeable horizontal chamber chips, minimal telemetry header, and safe-area anchored monograph card that never collides with the central 3D perspective canvas or interactive reticle hotspots.
- **Confirmed Decision 3: Mobile 3D Scroll Track**: Condensed scroll track (`h-[320vh]` on mobile vs `h-[480vh]` on desktop) for swift, fatigue-free camera traversal on touchscreens while maintaining deliberate, cinematographic pacing on desktop wheel scrolls.

---

### 1. Overview & Core Concept

- **What It Does**: Resolves all layout crowding, uneven padding, text collisions, and viewport overflow issues across mobile, tablet, and desktop breakpoints. Specifically refines the `SpatialTraversal` 3D experience by adopting dynamic viewport units (`h-[100dvh]`), compact floating controls, and clean vertical clearances, while harmonizing padding and container widths across all remaining sections (`Hero`, `StudioIntro`, `SelectedWork`, `MaterialsStatement`, `Services`, `Approach`, `Philosophy`, and `ContactSection`).
- **Target Audience / Persona**: High-net-worth clients, architectural curators, and design enthusiasts accessing the monograph on any device—from small smartphones (iPhone SE, iPhone 14/15/16) and tablets (iPad Mini, iPad Pro) to wide desktop displays (1440px+).
- **Key Value**: A seamless, unflinching editorial experience with zero horizontal scroll bleed, zero header/footer HUD overlap in the 3D viewport, and graceful typographic hierarchy at every screen width.

---

### 2. User Experience & Visual Design

#### A. Spatial Traversal Section Overhaul (`#traverse`)
- **Dynamic Viewport Height (`100dvh`)**: Replace rigid `h-screen` with `h-[100dvh]` and `min-h-[560px]` safeguards. This prevents browser address bar jump on iOS Safari and Chrome Android from obscuring controls.
- **Top Bar Telemetry & Controls**:
  - Desktop: Spatial coordinates, active chamber elevation, sound toggle, and camera telemetry spread across the top row.
  - Mobile: Ultra-compact, single-line telemetry header (`12px` tabular text with chamber counter and sound mute button).
- **Swipeable Chamber Chips**:
  - Horizontal scrollable pill row (`no-scrollbar flex gap-2 px-4 py-2 overflow-x-auto`) positioned above the bottom card or docked cleanly, allowing direct touch-jumping between the 4 architectural chambers without covering the 3D canvas center.
- **Monograph Bottom Overlay**:
  - Responsive height containment (`max-h-[38dvh]` on mobile) with safe-area padding (`pb-[env(safe-area-inset-bottom,16px)]`).
  - Strict typographic hierarchy: title, material specification, and description with clean line clamping on ultra-narrow viewports.
  - Hotspot reticles calibrated to responsive percentage bounds so they remain visible and tappable without interfering with the monograph drawer.

#### B. Global Section Rhythm & Padding Harmonization
- **Container Scale Standard**:
  - Outer page container: `max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12`
  - Vertical section padding: `py-16 sm:py-20 md:py-28 lg:py-36`
- **Section-by-Section Calibrations**:
  - `Hero`: Fixed header compensation with `pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16`. Balanced hero split and metric counter strip that wraps naturally on mobile.
  - `StudioIntro`: Balanced vertical margin, removing harsh gaps while maintaining white-space serenity; responsive display heading with `text-wrap: balance`.
  - `SelectedWork`: Responsive filter control tabs (`overflow-x-auto` on mobile), consistent gap spacing (`gap-8 sm:gap-12 md:gap-16`) between project plates, and full-bleed image framing with aspect-ratio containment.
  - `MaterialsStatement`: Fluid card padding and responsive typography preventing copy from touching card edges on mobile screens.
  - `Services` & `Approach`: Responsive accordion and step layout that transitions from stacked cards on mobile to spacious editorial grids on desktop.
  - `Philosophy`: Quote and narrative block pacing with responsive margin separators.
  - `ContactSection`: Inquiry questionnaire and budget slider controls formatted with full mobile touch targets ($\ge 44\text{px}$) and proper input field spacing.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dynamic Viewport Units (`100dvh`) vs Fixed Viewport Units (`100vh`)**
  - *Chosen Approach*: Use `h-[100dvh]` with fallback `h-screen`.
  - *Why*: Mobile browsers dynamically expand and collapse the URL address bar and toolbar during scroll. Standard `100vh` causes content at the bottom of the sticky viewport to get clipped behind browser chrome.
  - *Alternatives Considered*: Pure JavaScript window resize listener (unnecessary overhead and causes layout jank).
- **Decision 2: Chamber Navigation Positioning on Mobile**
  - *Chosen Approach*: Streamlined horizontal chip row directly integrated above the bottom monograph card, with touch swipe support.
  - *Why*: Keeps all primary touch targets within the natural thumb zone while leaving the upper 60% of the viewport completely unobstructed for the 3D perspective canvas.
  - *Alternatives Considered*: Hamburger drawer or dropdown menu (adds extra tap barrier and breaks continuous spatial immersion).
- **Decision 3: Scroll Track Length Variance by Breakpoint**
  - *Chosen Approach*: Responsive scroll track: `h-[320vh]` on mobile screens (`< 640px`), `h-[400vh]` on tablets (`640px - 1024px`), and `h-[480vh]` on desktop (`>= 1024px`).
  - *Why*: Desktop users scroll comfortably with mouse wheels or trackpads across a long track. On mobile, excessive scroll height causes thumb fatigue and disorients users attempting to reach subsequent sections.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          App Viewport Layout                           │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Navigation Bar (h-16 / h-20, fixed z-50, backdrop-blur)          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                │                                       │
│  ┌─────────────────────────────▼────────────────────────────────────┐  │
│  │ Hero Section (pt-24/32 pb-12/16, max-w-7xl, responsive split)    │  │
│  └─────────────────────────────┬────────────────────────────────────┘  │
│                                │                                       │
│  ┌─────────────────────────────▼────────────────────────────────────┐  │
│  │ Studio Intro (py-16/32, balanced editorial typography)           │  │
│  └─────────────────────────────┬────────────────────────────────────┘  │
│                                │                                       │
│  ┌─────────────────────────────▼────────────────────────────────────┐  │
│  │ Spatial Traversal (h-[320vh] mobile / h-[480vh] desktop)         │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ Sticky 100dvh Container (overflow-hidden)                  │  │  │
│  │  │  ├─ Compact Telemetry Header (tabular-nums, mute CTA)      │  │  │
│  │  │  ├─ Perspective 3D Canvas + Interactive Hotspot Reticles   │  │  │
│  │  │  ├─ Swipeable Chamber Chips (horizontal thumb scroll)     │  │  │
│  │  │  └─ Monograph Bottom Drawer (pb-safe, responsive max-h)    │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────┬────────────────────────────────────┘  │
│                                │                                       │
│  ┌─────────────────────────────▼────────────────────────────────────┐  │
│  │ Editorial Sections: SelectedWork, Materials, Services,           │  │
│  │ Approach, Philosophy, Contact (py-16/36, px-4/12, max-w-7xl)     │  │
│  └─────────────────────────────┬────────────────────────────────────┘  │
│                                │                                       │
│  ┌─────────────────────────────▼────────────────────────────────────┐  │
│  │ Footer (pt-16 pb-12, clean architectural colophon)               │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

#### Component & Style Mapping:
- **`SpatialTraversal.tsx`**:
  - Replace container `h-[450vh] sm:h-[500vh]` with responsive `h-[320vh] sm:h-[400vh] lg:h-[480vh]`.
  - Sticky viewport: `h-[100dvh] min-h-[560px] max-h-screen`.
  - Header telemetry: streamlined flex layout with truncation and compact badge pill styling.
  - Chamber switcher: horizontal scroll container with snap targets and visible active indicator.
  - Hotspot reticles: position adjustments for small viewports so tooltips stay on-screen.
  - Bottom monograph card: responsive padding `p-4 sm:p-6 lg:p-8`, `max-h-[36dvh] sm:max-h-[30dvh]`, with `text-xs sm:text-sm` line-clamped typography.
- **`Hero.tsx`**:
  - Standardize container padding to `px-4 sm:px-6 md:px-10 lg:px-12`.
  - Pacing between kicker, headline, and CTA buttons on mobile (`space-y-4 sm:space-y-6`).
- **`StudioIntro.tsx`**:
  - Standardize padding to `py-16 sm:py-24 md:py-32`.
- **`SelectedWork.tsx`**:
  - Standardize padding to `py-16 sm:py-24 md:py-32 lg:py-36`.
  - Project cards grid gap `gap-8 sm:gap-12 lg:gap-16`.
- **`MaterialsStatement.tsx`**:
  - Standardize padding to `py-16 sm:py-24 md:py-32`.
- **`Services.tsx`, `Approach.tsx`, `Philosophy.tsx`, `ContactSection.tsx`**:
  - Standardize padding to `py-16 sm:py-24 md:py-32 lg:py-36`.
  - Ensure all form fields, budget sliders, and option buttons have comfortable touch margins (`gap-3 sm:gap-4`) and padding.

---

### Verification Plan
1. **Compilation Check**: Run `compile_applet` to ensure zero Vite build errors and pristine asset bundling.
2. **Type Safety & Linting**: Run `lint_applet` (`tsc --noEmit`) to verify strict TypeScript adherence.
3. **Viewport Responsiveness**: Verify clean rendering and no overflow across:
   - Mobile: 375px (iPhone SE) and 390px (iPhone 14/15)
   - Tablet: 768px (iPad Mini) and 820px (iPad Air)
   - Desktop: 1280px and 1440px+
4. **Spatial Traversal Interaction**: Verify smooth scroll through all 4 chambers, responsive hotspot reticle placement, and swipeable chamber chips.
