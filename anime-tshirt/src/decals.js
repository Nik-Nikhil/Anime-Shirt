import * as THREE from 'three'

// 3 variants per character
export const VARIANTS = {
  itachi:  ['/528.jpg.webp', '/wallpapersden.com_k-itachi-uchiha-minimal-power-art_5120x2880.jpg', '/itachi_symbol.jpg'],
  goku:    ['/goku1.jpg',    '/goku2.jpg',    '/goku3.jpg'],
  gojo:    ['/gojo1.png',    '/gojo2.jpg',    '/gojo3.png'],
  obito:   ['/Obito_1.jpg',  '/Obito_2.jpg',  '/Obitio_3.jpg'],
  rengoku: ['/rengoku_1.jpg','/rengoku_2.jpg','/Rengoku_symbol.jpg'],
}

export const SYMBOLS = {
  itachi:  '/itachi_symbol.jpg',
  goku:    '/Goku _symbol.jpg',
  gojo:    '/gojo_symbol.jpg',
  obito:   '/obito_symbol.jpg',
  rengoku: '/Rengoku_symbol.jpg',
}

export const CHAR_CONFIG = {
  itachi:  { name: 'ITACHI',  title: 'Uchiha Clan',   accent: '#e63946', glow: '#ff2222', bg: '#1a0000',
    series: 'Naruto Shippuden', quote: '"Those who forgive themselves, and are able to accept their true nature... They are the strong ones."',
    power: 'Mangekyō Sharingan', rank: 'S-Rank Missing-nin', village: 'Konohagakure',
    bio: 'A prodigy of the Uchiha clan who became an ANBU captain at 13. Sacrificed everything for peace, carrying the weight of his clan\'s massacre alone.' },
  goku:    { name: 'GOKU',    title: 'Super Saiyan',  accent: '#ffd60a', glow: '#ffaa00', bg: '#1a1400',
    series: 'Dragon Ball Z', quote: '"I am the hope of the universe. I am the answer to all living things that cry out for peace."',
    power: 'Ultra Instinct', rank: 'Universe 7 Champion', village: 'Earth',
    bio: 'A pure-hearted Saiyan warrior raised on Earth. His limitless drive to grow stronger has saved the universe countless times.' },
  gojo:    { name: 'GOJO',    title: 'Six Eyes',      accent: '#00b4d8', glow: '#0077ff', bg: '#00101a',
    series: 'Jujutsu Kaisen', quote: '"Throughout Heaven and Earth, I alone am the honored one."',
    power: 'Infinity / Limitless', rank: 'Special Grade Sorcerer', village: 'Tokyo Jujutsu High',
    bio: 'The strongest jujutsu sorcerer alive. Born with both the Six Eyes and Limitless technique — a combination that appears once every few centuries.' },
  obito:   { name: 'OBITO',   title: 'Uchiha Clan',   accent: '#9d4edd', glow: '#cc44ff', bg: '#0d0018',
    series: 'Naruto Shippuden', quote: '"In this world, wherever there is light, there are also shadows."',
    power: 'Kamui / Rinnegan', rank: 'S-Rank Missing-nin', village: 'Konohagakure',
    bio: 'Once a kind-hearted boy who dreamed of becoming Hokage. Tragedy transformed him into Tobi — the man behind the Fourth Great Ninja War.' },
  rengoku: { name: 'RENGOKU', title: 'Flame Hashira', accent: '#f77f00', glow: '#ff4400', bg: '#1a0800',
    series: 'Demon Slayer', quote: '"Set your heart ablaze."',
    power: 'Flame Breathing', rank: 'Hashira — Flame Pillar', village: 'Demon Slayer Corps',
    bio: 'The Flame Hashira of the Demon Slayer Corps. His blazing spirit and unwavering resolve inspired everyone around him, even in his final moments.' },
}

const S = 512

function loadImg(src) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload  = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

/**
 * Build a TRANSPARENT decal texture.
 * - No square background — just the image printed on the shirt
 * - Circular mask so it looks like a real shirt print
 * - Character name + accent ring at the bottom
 */
function buildTexture(key, img) {
  const cfg = CHAR_CONFIG[key]
  const canvas = document.createElement('canvas')
  canvas.width  = S
  canvas.height = S
  const ctx = canvas.getContext('2d', { willReadFrequently: false })

  ctx.clearRect(0, 0, S, S)

  const cx = S / 2
  const cy = S / 2
  const r  = S / 2 - 10

  if (img) {
    // ── Circular clip ──────────────────────────────────────────
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.clip()

    // Draw image cover-fit
    const scale = Math.max(S / (img.width || S), S / (img.height || S))
    const w = (img.width  || S) * scale
    const h = (img.height || S) * scale
    ctx.drawImage(img, (S - w) / 2, (S - h) / 2, w, h)

    // Subtle edge vignette only
    const vignette = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r)
    vignette.addColorStop(0, 'rgba(0,0,0,0)')
    vignette.addColorStop(0.8, 'rgba(0,0,0,0)')
    vignette.addColorStop(1, 'rgba(0,0,0,0.55)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, S, S)

    ctx.restore()

    // ── Outer neon glow ring ───────────────────────────────────
    // Glow layer 1 — wide soft
    ctx.save()
    ctx.strokeStyle = cfg.accent
    ctx.lineWidth   = 14
    ctx.shadowColor = cfg.glow
    ctx.shadowBlur  = 40
    ctx.globalAlpha = 0.6
    ctx.beginPath()
    ctx.arc(cx, cy, r + 1, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    // Glow layer 2 — tight bright
    ctx.save()
    ctx.strokeStyle = cfg.accent
    ctx.lineWidth   = 5
    ctx.shadowColor = cfg.glow
    ctx.shadowBlur  = 20
    ctx.globalAlpha = 1
    ctx.beginPath()
    ctx.arc(cx, cy, r + 1, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    // Inner thin accent ring
    ctx.save()
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth   = 1.5
    ctx.globalAlpha = 0.25
    ctx.beginPath()
    ctx.arc(cx, cy, r - 8, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

  } else {
    // Fallback solid circle
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = cfg.bg
    ctx.fill()
    ctx.strokeStyle = cfg.accent
    ctx.lineWidth   = 6
    ctx.shadowColor = cfg.glow
    ctx.shadowBlur  = 20
    ctx.stroke()
    ctx.restore()

    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.font         = `900 ${Math.round(S * 0.22)}px Arial Black, sans-serif`
    ctx.fillStyle    = cfg.accent
    ctx.shadowColor  = cfg.glow
    ctx.shadowBlur   = 30
    ctx.fillText(cfg.name, cx, cy)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace      = THREE.SRGBColorSpace
  tex.minFilter       = THREE.LinearFilter
  tex.magFilter       = THREE.LinearFilter
  tex.generateMipmaps = false
  tex.needsUpdate     = true
  return tex
}

// Cache keyed by "character-variantIndex"
const cache = {}

export function getDecalTexture(key, variantIdx = 0) {
  const cacheKey = `${key}-${variantIdx}`
  if (cache[cacheKey]) return cache[cacheKey]
  const src = VARIANTS[key]?.[variantIdx] ?? VARIANTS[key]?.[0]
  cache[cacheKey] = loadImg(src).then(img => buildTexture(key, img))
  return cache[cacheKey]
}

export function getThumbURL(key, variantIdx = 0) {
  return VARIANTS[key]?.[variantIdx] ?? ''
}

// Clear cache so design changes take effect immediately in dev
export function clearCache() {
  Object.keys(cache).forEach(k => delete cache[k])
}
