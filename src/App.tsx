import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Box3, Vector3 } from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"

function Room() {
  const { scene } = useGLTF("/models/mom-museum.glb")

  useEffect(() => {
    const box = new Box3().setFromObject(scene)
    const center = new Vector3()
    const size = new Vector3()
    box.getCenter(center)
    box.getSize(size)
    console.log("center:", center)
    console.log("size:", size)
  }, [scene])

  return <primitive object={scene} />
}

const CAMERA_START = {
  position: [0, 2.0, 6] as [number, number, number],
  target: [0, 1.3, -1.8] as [number, number, number]
}

export default function App() {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  function resetView() {
    const ctrl = controlsRef.current
    if (!ctrl) return
    ctrl.object.position.set(...CAMERA_START.position)
    ctrl.target.set(...CAMERA_START.target)
    ctrl.update()
  }

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
        camera={{
          position: CAMERA_START.position,
          fov: 46,
          near: 0.01,
          far: 1000
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Room />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan
          enableZoom
          enableRotate
          target={CAMERA_START.target}
          minDistance={0.5}
          maxDistance={10}
          zoomSpeed={1.2}
        />
      </Canvas>

      {/* UI overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          fontFamily: "'Lora', serif"
        }}
      >
        {/* title */}
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

        {/* controls legend + reset */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 24,
            background: "rgba(255,255,255,0.82)",
            border: "0.5px solid #d6c9d8",
            borderRadius: 10,
            padding: "12px 16px",
            minWidth: 170
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9e8fa0",
              margin: "0 0 10px"
            }}
          >
            How to explore
          </p>
          {[
            ["drag", "Rotate the room"],
            ["scroll", "Zoom in & out"],
            ["right-drag", "Pan around"],
            ["click", "Read about an item"]
          ].map(([key, desc]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 7
              }}
            >
              <span
                style={{
                  background: "#ede4ef",
                  border: "0.5px solid #c9b8cb",
                  borderRadius: 5,
                  fontFamily: "'Lora', serif",
                  fontSize: 10,
                  color: "#5c4a5e",
                  padding: "2px 7px",
                  minWidth: 52,
                  textAlign: "center"
                }}
              >
                {key}
              </span>
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 12,
                  color: "#6b5a6d"
                }}
              >
                {desc}
              </span>
            </div>
          ))}

          {/* reset button */}
          <button
            onClick={resetView}
            style={{
              pointerEvents: "all",
              marginTop: 10,
              width: "100%",
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
              fontSize: 12,
              color: "#5c4a5e",
              background: "#ede4ef",
              border: "0.5px solid #c9b8cb",
              borderRadius: 6,
              padding: "5px 0",
              cursor: "pointer"
            }}
          >
            ↩ Reset view
          </button>
        </div>
      </div>
    </main>
  )
}
