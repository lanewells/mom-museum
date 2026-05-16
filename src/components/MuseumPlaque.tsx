type Props = {
  title: string
  description: string
  onClose: () => void
}

export default function MuseumPlaque({ title, description, onClose }: Props) {
  return (
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
        {title}
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
        {description}
      </p>
      <button
        onClick={onClose}
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
  )
}
