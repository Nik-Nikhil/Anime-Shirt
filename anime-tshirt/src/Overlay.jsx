import { useSnapshot } from 'valtio'
import { motion, AnimatePresence } from 'framer-motion'
import { state } from './store'
import { CHAR_CONFIG, SYMBOLS, getThumbURL } from './decals'

const spring = { type: 'spring', duration: 0.8, bounce: 0.2 }

function CtaButton({ children, onClick, accent }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{
        clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
        background: accent,
        color: '#05050f',
        fontFamily: "'Nunito Sans', sans-serif",
        fontStyle: 'italic',
        fontWeight: 900,
        fontSize: '0.85rem',
        letterSpacing: '0.12em',
        padding: '0.65rem 2rem',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </motion.button>
  )
}

function CharCard({ id, useSymbol = false }) {
  const snap = useSnapshot(state)
  const cfg  = CHAR_CONFIG[id]
  const active = snap.decal === id
  const thumb  = useSymbol ? SYMBOLS[id] : getThumbURL(id, 0)

  return (
    <motion.button
      onClick={() => { state.decal = id; state.variants[id] = 0 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      animate={{ scale: active ? 1.06 : 1 }}
      transition={spring}
      style={{
        position: 'relative',
        width: 76, height: 96,
        border: 'none', padding: 0,
        cursor: 'pointer',
        background: 'transparent',
        clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: active ? `0 0 18px 4px ${cfg.glow}` : 'none',
      }}
    >
      <img src={thumb} alt={cfg.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: active ? `${cfg.accent}22` : 'rgba(0,0,0,0.45)',
        transition: 'background 0.3s',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '4px 6px',
        background: 'rgba(0,0,0,0.7)',
        fontFamily: "'Nunito Sans', sans-serif",
        fontStyle: 'italic', fontWeight: 900,
        fontSize: '0.55rem', letterSpacing: '0.1em',
        color: active ? cfg.accent : '#fff',
        textAlign: 'center',
      }}>
        {cfg.name}
      </div>
      {active && (
        <motion.div
          layoutId="active-dot"
          style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8, borderRadius: '50%',
            background: cfg.accent,
            boxShadow: `0 0 8px ${cfg.glow}`,
          }}
        />
      )}
    </motion.button>
  )
}

function Swatch({ color }) {
  const snap = useSnapshot(state)
  const active = snap.color === color
  return (
    <motion.button
      onClick={() => { state.color = color }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      animate={{ scale: active ? 1.25 : 1 }}
      transition={spring}
      style={{
        width: 26, height: 26,
        borderRadius: '50%',
        background: color,
        border: active ? '2px solid #fff' : '2px solid transparent',
        cursor: 'pointer',
        boxShadow: active ? `0 0 10px 3px ${color}` : 'none',
        flexShrink: 0,
        pointerEvents: 'auto',
      }}
    />
  )
}

function VariantThumb({ id, idx }) {
  const snap = useSnapshot(state)
  const active = (snap.variants[id] ?? 0) === idx
  const cfg = CHAR_CONFIG[id]
  const src = getThumbURL(id, idx)
  return (
    <motion.button
      onClick={() => { state.variants[id] = idx }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: active ? 1.12 : 1 }}
      transition={spring}
      style={{
        width: 44, height: 44,
        border: active ? `2px solid ${cfg.accent}` : '2px solid rgba(255,255,255,0.15)',
        borderRadius: 6, overflow: 'hidden',
        cursor: 'pointer', padding: 0,
        background: 'transparent',
        boxShadow: active ? `0 0 10px ${cfg.glow}` : 'none',
        flexShrink: 0,
      }}
    >
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </motion.button>
  )
}

function HomePage() {
  const snap = useSnapshot(state)
  const cfg  = CHAR_CONFIG[snap.decal]

  return (
    <motion.div
      key="home"
      initial={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={spring}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5vw',
        pointerEvents: 'none',
      }}
    >
      <div style={{ maxWidth: 420, pointerEvents: 'auto' }}>
        <motion.p
          key={snap.decal + '-eyebrow'}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontStyle: 'italic', fontWeight: 900,
            fontSize: '0.7rem', letterSpacing: '0.25em',
            color: cfg.accent, textTransform: 'uppercase', marginBottom: 8,
          }}
        >
          {cfg.series} · {cfg.rank}
        </motion.p>

        <motion.h1
          key={snap.decal + '-h1'}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontStyle: 'italic', fontWeight: 900,
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            lineHeight: 0.95, color: '#fff',
            WebkitTextStroke: `2px ${cfg.accent}`,
            margin: '0 0 16px', textTransform: 'uppercase',
          }}
        >
          {cfg.name}
        </motion.h1>

        <motion.div
          key={snap.decal + '-badge'}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            display: 'inline-block',
            background: `${cfg.accent}22`,
            border: `1px solid ${cfg.accent}55`,
            color: cfg.accent,
            fontFamily: "'Nunito Sans', sans-serif",
            fontStyle: 'italic', fontWeight: 900,
            fontSize: '0.65rem', letterSpacing: '0.18em',
            padding: '4px 12px', marginBottom: 16, textTransform: 'uppercase',
          }}
        >
          {cfg.title}
        </motion.div>

        <motion.p
          key={snap.decal + '-quote'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.8rem', lineHeight: 1.6,
            fontStyle: 'italic', marginBottom: 28, maxWidth: 340,
          }}
        >
          {cfg.quote}
        </motion.p>

        <CtaButton accent={cfg.accent} onClick={() => { state.page = 'customizer' }}>
          CUSTOMIZE IT
        </CtaButton>
      </div>

      <div style={{
        position: 'absolute', bottom: 40, left: '5vw', right: '5vw',
        display: 'flex', gap: 12, alignItems: 'flex-end',
        pointerEvents: 'auto',
      }}>
        <p style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontStyle: 'italic', fontWeight: 900,
          fontSize: '0.6rem', letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
          marginRight: 8, alignSelf: 'center',
        }}>
          SELECT
        </p>
        {snap.decals.map(id => <CharCard key={id} id={id} useSymbol />)}
      </div>
    </motion.div>
  )
}

function CustomizerPage() {
  const snap = useSnapshot(state)
  const cfg  = CHAR_CONFIG[snap.decal]

  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `anime-drip-${snap.decal}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <motion.div
      key="customizer"
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={spring}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5vw',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ maxWidth: 300, pointerEvents: 'auto' }}>
        <motion.button
          onClick={() => { state.page = 'home' }}
          whileHover={{ x: -3 }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: "'Nunito Sans', sans-serif",
            fontStyle: 'italic', fontWeight: 900,
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', marginBottom: 24,
            padding: 0, display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          ← BACK
        </motion.button>

        <motion.p
          key={snap.decal + '-label'}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontStyle: 'italic', fontWeight: 900,
            fontSize: '0.65rem', letterSpacing: '0.25em',
            color: cfg.accent, textTransform: 'uppercase', marginBottom: 4,
          }}
        >
          {cfg.name} · {cfg.title}
        </motion.p>

        <h2 style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontStyle: 'italic', fontWeight: 900,
          fontSize: '1.6rem', color: '#fff',
          margin: '0 0 20px', textTransform: 'uppercase',
        }}>
          CUSTOMIZE
        </h2>

        <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>
          Character
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {snap.decals.map(id => <CharCard key={id} id={id} />)}
        </div>

        <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>
          Art Style
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[0, 1, 2].map(i => <VariantThumb key={i} id={snap.decal} idx={i} />)}
        </div>

        <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>
          Shirt Colour
        </p>
        <div style={{
          display: 'flex', gap: 10, alignItems: 'center',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px)',
          borderRadius: 40, padding: '8px 14px',
          marginBottom: 24, width: 'fit-content',
          pointerEvents: 'auto',
        }}>
          {snap.colors.map(c => <Swatch key={c} color={c} />)}
          {/* custom colour picker */}
          <label style={{ position: 'relative', width: 26, height: 26, cursor: 'pointer', flexShrink: 0 }} title="Custom colour">
            <input
              type="color"
              defaultValue={snap.color}
              onChange={e => { state.color = e.target.value }}
              style={{
                position: 'absolute', inset: 0,
                opacity: 0, width: '100%', height: '100%',
                cursor: 'pointer', border: 'none', padding: 0,
              }}
            />
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)',
              border: '2px solid rgba(255,255,255,0.4)',
              pointerEvents: 'none',
            }} />
          </label>
        </div>

        <CtaButton accent={cfg.accent} onClick={handleDownload}>
          DOWNLOAD
        </CtaButton>
      </div>
    </motion.div>
  )
}

export function Background() {
  const snap = useSnapshot(state)
  const cfg  = CHAR_CONFIG[snap.decal]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={snap.decal + '-bg'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', inset: 0,
          background: `radial-gradient(ellipse at 80% 50%, ${cfg.bg} 0%, #05050f 65%)`,
          zIndex: 0, pointerEvents: 'none',
        }}
      />
    </AnimatePresence>
  )
}

export function Overlay() {
  const snap = useSnapshot(state)

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}>

      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center',
        padding: '20px 5vw',
        pointerEvents: 'auto',
      }}>
        <span style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontStyle: 'italic', fontWeight: 900,
          fontSize: '1.1rem', letterSpacing: '0.15em',
          color: '#fff', textTransform: 'uppercase',
        }}>
          ANIME DRIP
        </span>
      </nav>

      <AnimatePresence mode="wait">
        {snap.page === 'home'
          ? <HomePage key="home" />
          : <CustomizerPage key="customizer" />
        }
      </AnimatePresence>
    </div>
  )
}
