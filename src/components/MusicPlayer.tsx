import { useEffect, useRef, useState } from "react"

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = new Audio("/audio/HoliznaCC04jazz.mp3")
    audio.loop = true
    audio.volume = 0.35
    audio.play().catch(() => {})
    audioRef.current = audio
    return () => audio.pause()
  }, [])

  function toggleMute() {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <button
      onClick={toggleMute}
      style={{
        pointerEvents: "all",
        background: "rgba(255,250,245,0.85)",
        border: "1px solid #d4c4b0",
        borderRadius: "50%",
        width: 40,
        height: 40,
        cursor: "pointer",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#3d2f3f"
      }}
    >
      {muted ? "🤫" : "🎵"}
    </button>
  )
}
