import { useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import type { Object3D } from "three"

// Plaques
const PLAQUES: Record<string, { title: string; description: string }> = {
  ballet_shoes: {
    title: "Ballet Shoes",
    description:
      "The shoes that inspired Mom to give Delaney a childhood spent dancing."
  },
  book_stack_gay: {
    title: "LGBTQ+ Books",
    description:
      "Mom was instrumental in putting LGBTQ+ literature in LAUSD schools."
  },
  book_gay_1: {
    title: "LGBTQ+ Books",
    description:
      "Mom was instrumental in putting LGBTQ+ literature in LAUSD schools."
  },
  book_gay_2: {
    title: "LGBTQ+ Books",
    description:
      "Mom was instrumental in putting LGBTQ+ literature in LAUSD schools."
  },
  books_stack_travel: {
    title: "Travel Books",
    description: "Books to support and inform her world exploration."
  },
  book_2: {
    title: "Travel Books",
    description: "Books to support and inform her world exploration."
  },
  book_4: {
    title: "Travel Books",
    description: "Books to support and inform her world exploration."
  },
  book_whangdoodles: {
    title: "The Last of the Really Great Whangdoodles",
    description: "Mom introduced countless books to her children early on."
  },
  box_of_seeds: {
    title: "Plant Seeds",
    description:
      "Throughout her life thus far, Mom has exercised her green thumb through gardening and sharing the practice with her children."
  },
  seed_packets_on_counter: {
    title: "Plant Seeds",
    description:
      "Throughout her life thus far, Mom has exercised her green thumb through gardening and sharing the practice with her children."
  },
  candy_land1: {
    title: "Board Games",
    description: "She never turns down an invitation to play a good game."
  },
  backgammon_board_game1: {
    title: "Board Games",
    description: "She never turns down an invitation to play a good game."
  },
  Board_Game__28_1: {
    title: "Board Games",
    description: "She never turns down an invitation to play a good game."
  },
  game_one_night: {
    title: "Board Games",
    description: "She never turns down an invitation to play a good game."
  },
  cd: {
    title: "CD",
    description:
      "In the early 2000s, Mom could be found singing to the Chicks in her red Toyota 4Runner and filling Delaney in on pieces of history through storytelling about the band's early political activism."
  },
  collage_magazine: {
    title: "Collage Magazine",
    description:
      "Mom and Delaney began a tradition of collaging vision boards every new year together since their first New Year's Eve living in an apartment just the two of them."
  },
  boots: { title: "Cowgirl Boots", description: "Mom's current dance shoes." },
  boot1: { title: "Cowgirl Boots", description: "Mom's current dance shoes." },
  boot2: { title: "Cowgirl Boots", description: "Mom's current dance shoes." },
  dog_toys: {
    title: "Dog Bed & Toys",
    description: "She was also Mom to Buddy, and now Twyla, Charly."
  },
  dog_bed: {
    title: "Dog Bed & Toys",
    description: "She was also Mom to Buddy, and now Twyla, Charly."
  },
  envelope_mothers_day: {
    title: "Happy Mother's Day!",
    description: "Delaney wishes Mom a very happy Mother's Day in 2026."
  },
  book_1: {
    title: "Cookbooks",
    description:
      "Mom is a very experienced and talented cook and baker. Fan favorites include squiggle pancakes, Mac n' cheese with bacon (Delaney), and twice-baked potatoes (Gwendolyn)."
  },
  book_3: {
    title: "Cookbooks",
    description:
      "Mom is a very experienced and talented cook and baker. Fan favorites include squiggle pancakes, Mac n' cheese with bacon (Delaney), and twice-baked potatoes (Gwendolyn)."
  },
  desktop_computer: {
    title: "Diner Dash",
    description:
      "One of the many staples of childhood summers for Mom's children was gathering around the computer to watch Mom beat the hardest level of Diner Dash, Burger Bot, or Virtual Farm, Mom could always crack the levels Lynn and Lane were stuck on."
  },
  diplomas: {
    title: "Diplomas",
    description:
      "Mom has 2 degrees she worked hard for while juggling raising kids and navigating her career, including a Bachelor's in Liberal Arts and Sciences, Liberal Studies and a Master's of Educational Leadership and Administration"
  },
  envelope_green: {
    title: "Outgoing Mail",
    description:
      "Mom is the USPS's favorite patron. Her showing her affection through gifts and words of affirmation through sending mail influenced child Delaney's own love language, gift-giving, and standards."
  },
  envelope_pink: {
    title: "Outgoing Mail",
    description:
      "Mom is the USPS's favorite patron. Her showing her affection through gifts and words of affirmation through sending mail influenced child Delaney's own love language, gift-giving, and standards."
  },
  Envelopes1: {
    title: "Outgoing Mail",
    description:
      "Mom is the USPS's favorite patron. Her showing her affection through gifts and words of affirmation through sending mail influenced child Delaney's own love language, gift-giving, and standards."
  },
  mail_holder: {
    title: "Outgoing Mail",
    description:
      "Mom is the USPS's favorite patron. Her showing her affection through gifts and words of affirmation through sending mail influenced child Delaney's own love language, gift-giving, and standards."
  },
  map_pins: {
    title: "Map of Travels",
    description:
      "Her traveling has become bolder and more daring with each chapter of her life."
  },
  world_map: {
    title: "Map of Travels",
    description:
      "Her traveling has become bolder and more daring with each chapter of her life."
  },
  pic_kevin: {
    title: "Kevin (Digital Photography)",
    description:
      "Mom chose Kevin as a travel, nesting, and romantic partner for life."
  },
  pic_lane_mom: {
    title: "Mom and Delaney (Digital Photography)",
    description:
      "Mom is a good and enthusiastic sport when she gets roped into things like themed photoshoots."
  },
  pic_lane_lynn: {
    title: "Lane and Lynn (Photography Print)",
    description:
      "Her two genetic children, Lane and Lynn, cross the world to spend time together."
  },
  pic_mom: {
    title: "Mom (Digital Photography)",
    description:
      "This piece exhibits a playful and silly side of Mom, as evidenced by her wig use and happy demeanor."
  },
  pic_on_desk: {
    title: "Delaney's Senior Prom (2015)",
    description:
      "Taken in 2015, this version of Mom marked the first few years of her independence period, characterized by self-discovery, exploration, and writing life as her own. But she showed up in ways her children may never truly know the extent. And always for the important things: Delaney's Senior Prom, pictured."
  },
  keys_audi_fob: {
    title: "Audi Keys",
    description:
      "For more than a decade, Mom had dreamt of driving an Audi of her own—a dream which she fulfilled in the 2020s and now drives in the country of California."
  },
  keys_keychain: {
    title: "Audi Keys",
    description:
      "For more than a decade, Mom had dreamt of driving an Audi of her own—a dream which she fulfilled in the 2020s and now drives in the country of California."
  },
  keys_many: {
    title: "Keys",
    description:
      "For most of her later career as a Principal in LAUSD, Mom carried an amount of keys symbolic to the responsibilities she held as a leader of educators, administrators, and young students."
  },
  keys_toyota: { title: "Toyota Keys", description: "4Runner, Rav4." },
  space_heater: {
    title: "Space Heater",
    description: "A trademark of Mom's livingspace necessities."
  },
  sheet_music: {
    title: "Sheet Music",
    description:
      "A pianist since childhood, Mom can still break out a tune on a piano."
  },
  stuffed_animal__1_1: {
    title: "Amigurumi",
    description:
      "Crochet was a hobby recurrent in different stages of Mom's life, and one she passed on to child Delaney."
  },
  stuffed_animal_1: {
    title: "Amigurumi",
    description:
      "Crochet was a hobby recurrent in different stages of Mom's life, and one she passed on to child Delaney."
  },
  tea: {
    title: "Iced Tea",
    description:
      "Strong Lipton black iced tea with extra ice and a lemon wedge."
  },
  Sewing_Machine1: {
    title: "Sewing Machine",
    description:
      "Mom is a talented sewer. She has made costumes, bedding, and more for her family and household."
  },
  scrapbook: {
    title: "Scrapbook",
    description:
      "Mom has compiled multitudinous photo albums decorated with care, which her family will continue to cherish and be thankful for."
  }
}

function findPlaqueName(obj: Object3D): string | null {
  let current: Object3D | null = obj
  while (current) {
    if (PLAQUES[current.name]) return current.name
    current = current.parent
  }
  return null
}

const CAMERA_START = {
  position: [0, 2.5, 7] as [number, number, number],
  target: [0, 1.3, -1.8] as [number, number, number]
}

// Room
function Room({
  onObjectClick
}: {
  onObjectClick: (name: string | null) => void
}) {
  const { scene } = useGLTF("/models/mom-museum.glb")

  return (
    <primitive
      object={scene}
      onClick={(e: any) => {
        e.stopPropagation()
        const name = findPlaqueName(e.object)
        if (name) {
          onObjectClick(name)
        } else {
          onObjectClick(null)
        }
      }}
    />
  )
}

// App

export default function App() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const [activePlaque, setActivePlaque] = useState<string | null>(null)

  function resetView() {
    const ctrl = controlsRef.current
    if (!ctrl) return
    ctrl.object.position.set(...CAMERA_START.position)
    ctrl.target.set(...CAMERA_START.target)
    ctrl.update()
  }

  const plaque = activePlaque ? PLAQUES[activePlaque] : null

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
          fov: 42,
          near: 0.01,
          far: 1000
        }}
        style={{ position: "absolute", inset: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActivePlaque(null)
        }}
        onPointerMissed={() => setActivePlaque(null)}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Room onObjectClick={(name) => setActivePlaque(name)} />
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

        {/* museum plaque */}
        {plaque && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              background: "rgba(255,255,255,0.95)",
              border: "1px solid #d6c9d8",
              borderRadius: 10,
              padding: "18px 20px",
              maxWidth: 280,
              pointerEvents: "all",
              animation: "fadeIn 0.2s ease"
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9e8fa0",
                margin: "0 0 5px"
              }}
            >
              Museum of Mom
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 17,
                fontWeight: 500,
                color: "#3d2f3f",
                margin: "0 0 8px",
                lineHeight: 1.3
              }}
            >
              {plaque.title}
            </h2>
            <div
              style={{
                width: 30,
                height: 1,
                background: "#c9b8cb",
                marginBottom: 10
              }}
            />
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                fontSize: 13,
                color: "#6b5a6d",
                lineHeight: 1.7,
                margin: "0 0 12px"
              }}
            >
              {plaque.description}
            </p>
            <button
              onClick={() => setActivePlaque(null)}
              style={{
                fontFamily: "'Lora', serif",
                fontSize: 11,
                color: "#9e8fa0",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0
              }}
            >
              ✕ close
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  )
}
