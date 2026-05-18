type Props = {
  muted: boolean
  onToggle: () => void
}

export default function MusicPlayer({ muted, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
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
