# Anime Drip — 3D T-Shirt Configurator

A browser-based 3D t-shirt customizer built with React, Three.js, and Vite. Pick your favourite anime character, swap art styles, change the shirt colour, and download the result.

## Characters

- Itachi Uchiha — Naruto Shippuden
- Goku — Dragon Ball Z
- Satoru Gojo — Jujutsu Kaisen
- Obito Uchiha — Naruto Shippuden
- Kyojuro Rengoku — Demon Slayer

Each character has 3 art variants and a unique colour theme.

## Stack

- React 18
- Three.js + @react-three/fiber + @react-three/drei
- Valtio (state)
- Framer Motion (animations)
- Vite

## Getting Started

```bash
cd anime-tshirt
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## How It Works

The 3D shirt model (`shirt_baked_collapsed.glb`) is loaded via `useGLTF`. Character artwork is rendered onto a canvas, turned into a Three.js `CanvasTexture`, and applied as a `Decal` on the mesh. Shirt colour is set directly on the material at render time.

The UI has two pages — a landing page where you pick a character, and a customizer where you change the art style, shirt colour, and download a screenshot.

## Project Structure

```
src/
  main.jsx      — entry point
  App.jsx       — root component
  Canvas.jsx    — Three.js scene + shirt mesh
  Overlay.jsx   — all UI (nav, character cards, customizer)
  store.js      — global state via valtio
  decals.js     — texture building + character config
public/
  *.jpg/png     — character artwork
  *.glb         — shirt 3D model
```

## Download

Hit the "Download" button in the customizer to save a PNG of the current view.
