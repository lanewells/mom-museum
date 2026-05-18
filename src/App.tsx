import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import type { RefObject } from "react"
import { Suspense, useEffect } from "react"
import { Vector3 } from "three"
import { PLAQUES, findPlaqueName } from "./constants/plaques"
import { CAMERA_START } from "./constants/camera"
import type { CameraState } from "./constants/camera"
import LoadingScreen from "./components/LoadingScreen"
import ControlsLegend from "./components/ControlsLegend"
import MuseumPlaque from "./components/MuseumPlaque"
import MobileScreen from "./components/MobileScreen"
import MusicPlayer from "./components/MusicPlayer"

type RoomProps = {
  onObjectClick: (name: string | null, point: Vector3 | null) => void
  onLoaded: () => void
}

function CameraAnimator({
  targetState,
  controls,
  onDone
}: {
  targetState: CameraState | null
  controls: RefObject<OrbitControlsImpl | null>
  onDone: () => void
}) {
  const { camera } = useThree()

  useFrame(() => {
    if (!targetState || !controls.current) return
    camera.position.lerp(targetState.position, 0.08)
    controls.current.target.lerp(targetState.target, 0.08)
    controls.current.update()

    const posDist = camera.position.distanceTo(targetState.position)
    const tgtDist = controls.current.target.distanceTo(targetState.target)
    if (posDist < 0.01 && tgtDist < 0.01) {
      onDone()
    }
  })

  return null
}

function Room({ onObjectClick, onLoaded }: RoomProps) {
  const { scene } = useGLTF("/models/mom-museum.glb")
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    onLoaded()
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <primitive
      object={scene}
      castShadow
      receiveShadow
      onPointerDown={(e: any) => {
        pointerDownPos.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerUp={(e: any) => {
        if (!pointerDownPos.current) return
        const dx = e.clientX - pointerDownPos.current.x
        const dy = e.clientY - pointerDownPos.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 4) return
        e.stopPropagation()
        const name = findPlaqueName(e.object)
        onObjectClick(name, e.point ?? null)
      }}
    />
  )
}

export default function App() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const [activePlaque, setActivePlaque] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [cameraTarget, setCameraTarget] = useState<CameraState | null>(null)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isMobile = window.matchMedia("(pointer: coarse)").matches

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") {
        const ctrl = controlsRef.current
        if (!ctrl) return
        const p = ctrl.object.position
        const t = ctrl.target
        console.log(
          `position: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`
        )
        console.log(
          `target: [${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}]`
        )
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  function startMusic() {
    if (audioRef.current) return
    const audio = new Audio("/audio/HoliznaCC04jazz.mp3")
    audio.loop = true
    audio.volume = 0.35
    audio.play()
    audioRef.current = audio
  }

  function toggleMute() {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted(!muted)
  }

  function handleObjectClick(name: string | null, point: Vector3 | null) {
    startMusic()
    if (name && point) {
      const plaque = PLAQUES[name]
      if (plaque?.camera) {
        setCameraTarget({
          position: new Vector3(...plaque.camera.position),
          target: new Vector3(...plaque.camera.target)
        })
      } else {
        const offset = new Vector3(0, 0.1, 0.6)
        const zoomPos = point.clone().add(offset)
        setCameraTarget({ position: zoomPos, target: point.clone() })
      }
      setActivePlaque(name)
    } else {
      closePlaque()
    }
  }

  function closePlaque() {
    setActivePlaque(null)
    setCameraTarget(null)
  }

  function resetView() {
    setActivePlaque(null)
    setCameraTarget({
      position: new Vector3(...CAMERA_START.position),
      target: new Vector3(...CAMERA_START.target)
    })
  }

  const plaque = activePlaque ? PLAQUES[activePlaque] : null

  if (isMobile) return <MobileScreen />

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f5f0eb",
        position: "relative"
      }}
    >
      <Canvas
        shadows="soft"
        camera={{
          position: CAMERA_START.position,
          fov: 42,
          near: 0.01,
          far: 1000
        }}
        style={{ position: "absolute", inset: 0 }}
        onPointerMissed={() => {
          startMusic()
          closePlaque()
        }}
      >
        <pointLight
          position={[-3.1, 1.4, -3.7]}
          intensity={1}
          color="#ffcc88"
          distance={6}
          decay={0.7}
        />
        <pointLight
          position={[-3.2, 1.3, -0.5]}
          intensity={0.5}
          color="#ffcc88"
          distance={1}
          decay={1.5}
        />
        <pointLight
          position={[0.7, 1.5, -3.7]}
          intensity={2}
          color="#ffcc88"
          distance={10}
          decay={1.5}
        />
        <pointLight
          position={[2.7, 1.5, 0.5]}
          intensity={2.5}
          color="#ffcc88"
          distance={10}
          decay={2}
        />
        <ambientLight intensity={1.3} />
        <directionalLight
          position={[-1, 2, -1.7]}
          intensity={2.2}
          color="#ffeed7"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />

        <CameraAnimator
          targetState={cameraTarget}
          controls={controlsRef}
          onDone={() => setCameraTarget(null)}
        />

        <Suspense fallback={null}>
          <Room
            onObjectClick={handleObjectClick}
            onLoaded={() => setLoaded(true)}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan
          enableZoom
          enableRotate
          target={CAMERA_START.target}
          minDistance={0.05}
          maxDistance={10}
          zoomSpeed={1.7}
          dampingFactor={0.15}
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          fontFamily: "'Lora', serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center"
          }}
        >
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: 10,
              letterSpacing: "0.25em",
              color: "#9e8fa0",
              textTransform: "uppercase",
              margin: "0 0 2px"
            }}
          >
            A special exhibition
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 400,
              color: "#3d2f3f",
              margin: "0 0 2px",
              whiteSpace: "nowrap"
            }}
          >
            MOM
          </h1>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
              fontSize: 13,
              color: "#9e8fa0",
              margin: 0
            }}
          >
            Museum of Mom
          </p>
        </div>

        <ControlsLegend onReset={resetView} />

        {plaque && (
          <MuseumPlaque
            title={plaque.title}
            description={plaque.description}
            onClose={closePlaque}
          />
        )}
      </div>

      <div style={{ position: "absolute", top: 24, right: 24, zIndex: 100 }}>
        <MusicPlayer muted={muted} onToggle={toggleMute} />
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {!loaded && <LoadingScreen />}
    </main>
  )
}
