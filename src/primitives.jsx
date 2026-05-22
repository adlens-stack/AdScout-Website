/* Shared primitives — design-system-grade atoms */

function Container({ children, style = {} }) {
  return (
    <div className="pad-sm" style={{ maxWidth: 1216, margin: "0 auto", padding: "0 32px", width: "100%", boxSizing: "border-box", ...style }}>
      {children}
    </div>);

}

function Eyebrow({ children, live = false, style = {} }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 12px", borderRadius: 999,
      background: "rgba(18,18,26,0.6)",
      border: "1px solid var(--border-hairline-strong)",
      font: "400 10px/1.5 var(--font-mono)", letterSpacing: 1.2, color: "var(--fg-3)",
      textTransform: "uppercase",
      ...style, fontSize: "12px"
    }}>
      {live &&
      <span style={{
        width: 7, height: 7, borderRadius: 999, background: "var(--brand-lime)",
        boxShadow: "0 0 8px var(--brand-lime)",
        animation: "pulse 1.4s ease-in-out infinite"
      }} />
      }
      {children}
    </div>);

}

function SectionLabel({ num, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      font: "400 10px/1 var(--font-mono)", letterSpacing: 1.5, color: "var(--fg-3)",
      textTransform: "uppercase", fontSize: "14px"
    }}>
      <span style={{ color: "var(--brand-lime)" }}>[{num}]</span>
      <span style={{ width: 32, height: 1, background: "var(--border-hairline-strong)" }} />
      <span>{label}</span>
    </div>);

}

function PrimaryBtn({ children, onClick, style = {}, dark = false }) {
  return (
    <button onClick={onClick} className="btn-reset" style={{
      background: dark ? "#000" : "var(--brand-lime)",
      color: dark ? "var(--brand-lime)" : "#000",
      font: "700 15px/1 var(--font-body)",
      padding: "14px 28px", borderRadius: 12,
      display: "inline-flex", alignItems: "center", gap: 10,
      whiteSpace: "nowrap",
      transition: "transform 160ms var(--ease-out), filter 160ms var(--ease-out)",
      ...style
    }}
    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.97)"}
    onMouseUp={(e) => e.currentTarget.style.transform = ""}
    onMouseLeave={(e) => e.currentTarget.style.transform = ""}>
      
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </button>);

}

function GhostBtn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} className="btn-reset" style={{
      background: "transparent", color: "#fff",
      font: "600 15px/1 var(--font-body)",
      padding: "14px 24px", borderRadius: 12,
      border: "1px solid var(--border-hairline-strong)",
      transition: "background 160ms var(--ease-out), border-color 160ms var(--ease-out)",
      ...style
    }}
    onMouseEnter={(e) => {e.currentTarget.style.background = "var(--bg-3)";e.currentTarget.style.borderColor = "var(--fg-5)";}}
    onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";e.currentTarget.style.borderColor = "var(--border-hairline-strong)";}}>
      {children}</button>);

}

function Card({ children, inset = false, style = {} }) {
  return (
    <div style={{
      background: inset ? "var(--bg-2)" : "var(--bg-3)",
      border: "1px solid var(--border-hairline-strong)",
      borderRadius: 16,
      ...style
    }}>{children}</div>);

}

function SectionHeading({ num, label, title, sub, align = "left", maxWidth = 720 }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 20,
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align,
      maxWidth: align === "center" ? maxWidth : "none",
      margin: align === "center" ? "0 auto" : 0
    }}>
      <SectionLabel num={num} label={label} />
      <h2 className="text-sm-h2" style={{
        margin: 0, font: "700 clamp(32px, 5vw, 48px)/1.05 var(--font-display)", letterSpacing: -2.4,
        color: "#fff", textWrap: "balance", maxWidth: 820
      }}>{title}</h2>
      {sub &&
      <p className="text-sm-body" style={{
        margin: 0, font: "400 clamp(15px, 1.6vw, 18px)/1.55 var(--font-body)",
        color: "var(--fg-3)", maxWidth: 620, textWrap: "pretty"
      }}>{sub}</p>
      }
    </div>);

}

Object.assign(window, { Container, Eyebrow, SectionLabel, PrimaryBtn, GhostBtn, Card, SectionHeading });