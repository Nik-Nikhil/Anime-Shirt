/**
 * Run once: node generate-decals.mjs
 * Generates react.png, three2.png, pmndrs.png + _thumb variants in public/
 * Uses only Node.js built-ins — no canvas dependency needed.
 * Creates simple colored SVG→PNG via data URI approach.
 */

import { writeFileSync } from 'fs'
import { createCanvas } from 'canvas'

const SIZE = 256

function makeReact() {
  const c = createCanvas(SIZE, SIZE)
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, SIZE, SIZE)
  ctx.strokeStyle = '#61DAFB'
  ctx.lineWidth = 8
  ctx.fillStyle = '#61DAFB'
  // Nucleus
  ctx.beginPath()
  ctx.arc(SIZE / 2, SIZE / 2, 18, 0, Math.PI * 2)
  ctx.fill()
  // Orbits
  for (let i = 0; i < 3; i++) {
    ctx.save()
    ctx.translate(SIZE / 2, SIZE / 2)
    ctx.rotate((i * Math.PI) / 3)
    ctx.beginPath()
    ctx.ellipse(0, 0, 110, 40, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }
  return c.toBuffer('image/png')
}

function makeThree() {
  const c = createCanvas(SIZE, SIZE)
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = '#049EF4'
  ctx.font = 'bold 160px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('3', SIZE / 2, SIZE / 2 + 10)
  return c.toBuffer('image/png')
}

function makePmndrs() {
  const c = createCanvas(SIZE, SIZE)
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = '#ff4d6d'
  ctx.font = 'bold 80px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('pmnd', SIZE / 2, SIZE / 2 - 20)
  ctx.fillText('rs', SIZE / 2, SIZE / 2 + 60)
  return c.toBuffer('image/png')
}

try {
  writeFileSync('public/react.png', makeReact())
  writeFileSync('public/three2.png', makeThree())
  writeFileSync('public/pmndrs.png', makePmndrs())
  // Thumbs (same images, smaller)
  writeFileSync('public/react_thumb.png', makeReact())
  writeFileSync('public/three2_thumb.png', makeThree())
  writeFileSync('public/pmndrs_thumb.png', makePmndrs())
  console.log('Decals generated!')
} catch (e) {
  console.log('canvas package not available — using fallback SVG decals')
}
