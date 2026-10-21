# CAPTURING WHOLE WORLD — PRASHANT MISHRA
### 3D Curved Digital Exhibition & Portfolio Experience

An immersive, interactive 3D digital gallery and creative portfolio for photographer and cinematographer **Prashant Mishra**, under the visual identity **Capturing Whole World**.

Designed as a spatial 3D experience with a curved project carousel, perspective grid floor, liquid chrome profile sphere, and floating white editorial overlays.

---

## 🌌 Spatial 3D Experience Architecture

### 1. 3D Environment & Perspective Floor
- **Background**: Pure / Near Black (`#050505`).
- **WebGL Perspective Grid**: Built with Three.js, extending infinitely into the distance with subtle depth fog and mouse-responsive camera tilt.
- **Procedural 35mm Analog Grain**: Real-time canvas grain running at 60fps (sub-1% CPU).

### 2. 3D Curved Project Carousel
- Arranged along a mathematical cylindrical horizontal arc:
  - **Center Project**: Closest to camera, larger scale (`scale(1.0)`), full brightness (`brightness(1.0)`), and strong presence.
  - **Side Projects**: Progressively scale down, move back in Z-space, rotate around the Y-axis (`rotationY` negative on left, positive on right), and fade with depth.
- **Controls**:
  - **Wheel Scroll**: Scrolling vertically navigates horizontally through the 3D arc with inertia and momentum.
  - **Drag / Swipe**: Mouse drag on desktop, touch horizontal swipe on mobile.
  - **Click Navigation**: Clicking a side project smoothly rotates the carousel to center it; clicking the center project expands it into the project view!
- **HUD Metadata**:
  - Live HUD at bottom-center animates dynamically as the active project changes (Title, Category, Location, Year).

### 3. The 8 Featured Projects (`js/projects-data.js`)
1. `01 — THE HIMALAYAN STORY` (Travel / Documentary • Himalayas • 2026)
2. `02 — THE TREK SOUL` (Adventure / Travel • Zanskar & Ladakh • 2025)
3. `03 — LADAKH` (Travel / Expedition • Pangong & Nubra • 2025)
4. `04 — AUTOMOTIVE STORIES` (Automotive / Commercial • Rajasthan & Thar • 2025)
5. `05 — WEDDING STORIES` (Wedding / Documentary • Udaipur & Jaipur • 2025)
6. `06 — INDIA THROUGH MY LENS` (Travel / Culture • Varanasi & Spiti • 2026)
7. `07 — FASHION IN MOTION` (Fashion / Editorial • Delhi & Mumbai • 2025)
8. `08 — THE ROAD` (Travel / Lifestyle • Manali-Leh Highway • 2026)

### 4. Floating White Project Overlay (94% Viewport)
- Floating white container with rounded corners (`border-radius: 22px`) occupying 94vw × 94vh over the black environment.
- **Top-right**: Black circular button with `×` that closes and smoothly returns to the exact carousel position.
- **Editorial Layout**: Vertically scrollable presentation with varied image proportions:
  - 16:9 cinematic
  - 4:5 vertical portrait
  - 1:1 square compositions
  - 2.39:1 full-width panoramas
  - Director loglines and camera technical specifications.

### 5. Profile Experience Overlay
- Clicking `PROFILE` in top-right opens an overlay while keeping the 3D environment visible in the background.
- Features a real-time **interactive liquid chrome / glass sphere** in the center with specular reflections that respond to mouse movement.
- Personal manifesto, disciplines, and direct channels (`INSTAGRAM`, `EMAIL`, `WHATSAPP`).
- `CLOSE` button returns smoothly to the 3D carousel.

### 6. Fixed Minimal UI
- **Top-left**:
  ```
  CAPTURING
  WHOLE WORLD
  ```
- **Top-right**: `PROFILE`
- **Bottom-left**: `FEATURED / FULL` (interactive view density toggle)
- **Bottom-right**: `CONTACT` (opens direct transmission inquiry overlay)

### 7. Custom Minimal Cursor
- Small white dot in default state.
- Hovering center project: expands into circle containing **`VIEW`**.
- Hovering side projects: expands into circle containing **`ROTATE`**.
- Completely disabled on mobile and touch devices.

---

## 🚀 How to Launch / Preview

Simply open the file in your browser:
[`/Users/prashantmishra/.gemini/antigravity/scratch/capturing-whole-world/index.html`](index.html)

Works natively in Safari, Chrome, Arc, and Brave on macOS with zero build tools or dependencies.
