export default function MobileScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url('/images/mobile-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Lora', serif"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(30, 20, 30, 0.45)"
        }}
      />

      <div
        style={{ position: "relative", textAlign: "center", padding: "0 32px" }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "#e8d8ea",
            textTransform: "uppercase",
            margin: "0 0 8px"
          }}
        >
          A special exhibition
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 48,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 4px"
          }}
        >
          MOM
        </h1>
        <p
          style={{
            fontStyle: "italic",
            fontSize: 15,
            color: "#e8d8ea",
            margin: "0 0 48px"
          }}
        >
          Museum of Mom
        </p>

        <p
          style={{
            fontSize: 15,
            color: "#fff",
            lineHeight: 1.7,
            maxWidth: 280,
            margin: "0 auto"
          }}
        >
          This exhibition is best experienced on a desktop or laptop with a
          mouse or trackpad. Please visit on a bigger screen!
        </p>
      </div>
    </div>
  )
}
