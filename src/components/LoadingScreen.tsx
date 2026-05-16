export default function LoadingScreen() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#f5f0eb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10
      }}
    >
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 32,
          fontWeight: 400,
          color: "#3d2f3f",
          margin: "0 0 8px"
        }}
      >
        MOM
      </h1>
      <p
        style={{
          fontFamily: "'Lora', serif",
          fontStyle: "italic",
          fontSize: 14,
          color: "#9e8fa0",
          margin: "0 0 32px"
        }}
      >
        Museum of Mom
      </p>
      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: 12,
          color: "#c9b8cb",
          letterSpacing: "0.15em",
          textTransform: "uppercase"
        }}
      >
        Preparing the exhibition…
      </p>
    </div>
  )
}
