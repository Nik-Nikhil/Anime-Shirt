import { proxy } from 'valtio'

const state = proxy({
  page: 'home',   // 'home' | 'characters' | 'about' | 'customizer'
  colors: ['#ffffff', '#1a1a2e', '#e94560', '#0f3460', '#533483', '#f5a623'],
  decals: ['itachi', 'goku', 'gojo', 'obito', 'rengoku'],
  color: '#1a1a2e',
  decal: 'itachi',
  variants: { itachi: 0, goku: 0, gojo: 0, obito: 0, rengoku: 0 },
})

export { state }
