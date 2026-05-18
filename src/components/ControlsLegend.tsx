type Props = { onReset: () => void }

export default function ControlsLegend({ onReset }: Props) {
  return (
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
        ["click", "Read about an artifact"]
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
        onClick={onReset}
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
  )
}
