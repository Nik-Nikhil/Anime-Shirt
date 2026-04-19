import { useState, useEffect, Suspense } from 'react'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import { useGLTF, Decal, OrbitControls } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { getDecalTexture } from './decals'

export const App = () => (
  <R3FCanvas
    camera={{ position: [0, 0, 2.5], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}
    style={{ position: 'fixed', inset: 0 }}
  >
    <ambientLight intensity={4} />
    <directionalLight position={[5, 5, 5]} intensity={3} />
    <directionalLight position={[-5, 5, -5]} intensity={1.5} />
    <Suspense fallback={null}>
      <Shirt />
    </Suspense>
    <OrbitControls enableZoom={false} enablePan={false} />
  </R3FCanvas>
)

function Shirt() {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
  const [texture, setTexture] = useState(null)
  const variantIdx = snap.variants?.[snap.decal] ?? 0

  const meshNode = nodes.T_Shirt_male ?? Object.values(nodes).find(n => n.isMesh)
  const mat = materials.lambert1 ?? Object.values(materials)[0]

  mat.color.set(snap.color)
  mat.roughness = 1

  useEffect(() => {
    let cancelled = false
    getDecalTexture(snap.decal, variantIdx).then(tex => {
      if (!cancelled) setTexture(tex)
    })
    return () => { cancelled = true }
  }, [snap.decal, variantIdx])

  if (!meshNode) return null

  return (
    <mesh
      geometry={meshNode.geometry}
      material={mat}
      dispose={null}
    >
      {texture && (
        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.22}
          map={texture}
          depthTest={false}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-10}
          renderOrder={2}
        />
      )}
    </mesh>
  )
}

useGLTF.preload('/shirt_baked_collapsed.glb')
