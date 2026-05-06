# Solar System Simulator

A modern WebGL-powered solar system simulator built with `Three.js` and `Vite`.

## Overview

This project renders a simplified 3D solar system scene in the browser. It uses `Three.js` to create planets, a star field, and orbital motion, while `Vite` provides a fast development server and build workflow.

## Features

- Interactive 3D solar system scene
- Planetary rotation and orbital movement
- Texture mapping for planets and environment
- Lightweight `Vite` development setup

## Built With

- `three` — 3D rendering library for WebGL
- `vite` — fast frontend development server and build tool
- `tweakpane` — UI controls for adjusting parameters (if used)

## Project Structure

- `index.html` — application entry point
- `src/main.js` — app initialization and render loop
- `src/style.css` — page styling
- `src/assets/` — textures and static assets
- `src/utils/` — helper modules for creating and animating planetary meshes

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or yarn installed

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Notes

This repo is designed as a hands-on Three.js tutorial project. You can extend it by adding more planets, lighting effects, camera controls, and interactive UI.

## License

This project is provided as-is for learning and personal use.
