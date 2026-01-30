# zBuffer Website Redesign

## Overview

Rebuild the zBuffer website around a persistent 3D particle network background with glass-card content sections floating over it. Futuristic, immersive, professional.

## The Particle Network Background

A single Three.js canvas fills the viewport (`position: fixed`, behind all content). The scene:

- **Particles**: ~150-200 nodes floating in 3D space, slowly drifting with slight random motion. Each node is a small glowing point in pure red, green, or blue (roughly equal distribution). Sizes vary slightly for depth.
- **Connections**: When two particles are within a threshold distance, a thin line connects them. Line color blends from one node's color to the other. Lines fade in opacity as distance increases.
- **Depth**: Particles at varying Z-depths. Closer ones brighter and larger, distant ones dimmer and smaller.
- **Mouse interaction**: Particles within a radius of the cursor gently drift away. Subtle, not dramatic.
- **Motion**: Slow ambient drift. No sudden movements.
- **Camera**: Fixed, no orbit controls. Slight parallax on scroll — the particle field shifts subtly as you scroll down.
- **No post-processing bloom or vignette** — keep it clean and performant since it's persistent.

## Page Structure

All content scrolls over the fixed particle background.

### Navigation (existing, minor tweaks)
- Fixed header, transparent, no background
- Logo centered, "Thesis" left, "Team" right
- Particles visible through it

### Hero (top viewport)
- Mostly open space — the particle network is the hero
- Logo large and centered
- Single tagline underneath (e.g. "Early-stage infrastructure for what comes next.")
- Minimal — let the 3D scene breathe

### Thesis Section
- 1-2 glass cards explaining what zBuffer does
- Short, punchy copy about backing technical founders and infrastructure focus

### Focus Areas
- 6 glass cards in a grid (3x2 desktop, 1-column mobile)
- AI Infrastructure, Developer Tools, Graphics & Rendering, Data Infrastructure, Security, Open Source
- Each with a label, short description, subtle icon or color accent

### Team Section
- Glass cards for each team member
- Photo, name, role, one-liner or links

### CTA
- Centered glass card: "Building something?"
- Description + contact/pitch button

### Footer
- Minimal — copyright, maybe a link or two

## Glass Card Design

- Background: `rgba(10, 10, 10, 0.6)` with `backdrop-filter: blur(20px)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Border radius: `16px`
- Max width: ~1100px centered
- On mobile: near-full-width with padding

## Typography

- Font: Outfit (existing)
- Headlines: bold, 36-48px, white
- Body: 16-18px, `rgba(255, 255, 255, 0.7)`
- Technical accents: JetBrains Mono

## Spacing & Animation

- 120-160px vertical gaps between sections so particles show through
- Each glass card fades in + slides up 20-30px on scroll entry (Framer Motion)
- Staggered animations for card grids
- Remove noise overlay (particles provide the visual texture)

## Colors

- Background: `#050510` (dark, near-black)
- Particle colors: pure RGB — `(1,0,0)`, `(0,1,0)`, `(0,0,1)`
- Connection lines: gradient between endpoint colors, fading with distance
- Text: white / soft white
- Glass: dark translucent with subtle white borders
- Buttons: white or RGB-accented with hover glow

## Tech

- Three.js via React Three Fiber (existing)
- No post-processing (Bloom/Vignette removed for performance as persistent bg)
- Framer Motion for scroll animations (existing)
- Tailwind CSS for layout/styling (existing)
- All existing section components (StatsSection, ProductsShowcase, CTASection) to be reworked into the glass card style
