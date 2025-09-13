export default function Road({ withCenterDash = true, className = "" }) {
  return (
    <div className={`relative w-full h-24 md:h-28 ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#2e2e2e",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.06), inset 0 -1px 0 rgba(0,0,0,.6)",
        }}
      />
      {withCenterDash && (
        <div
          aria-hidden
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.9) 0 40px, rgba(255,255,255,0) 40px 80px)",
          }}
        />
      )}
    </div>
  );
}
