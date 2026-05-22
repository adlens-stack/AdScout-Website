/* Trusted-by — placeholder CEE wordmarks, scrolling marquee on hover */

function TrustRow({ lang }) {
  const t = T[lang];
  const logos = CLIENT_LOGOS;
  return (
    <section className="pad-sm" style={{
      padding: "56px 32px",
      background: "var(--bg-0)",
      borderTop: "1px solid var(--border-hairline)",
      borderBottom: "1px solid var(--border-hairline)"
    }}>
      <Container>
        <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 auto" }}>
            <div style={{
              font: "400 10px/1.5 var(--font-mono)", letterSpacing: 1.4,
              color: "var(--fg-5)", textTransform: "uppercase",
              maxWidth: 200, fontSize: "12px"
            }}>{t.trusted}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
            <div style={{
              display: "flex", gap: 56, alignItems: "center",
              opacity: 0.72
            }}>
              {logos.map((l) => <Wordmark key={l.name} {...l} />)}
            </div>
          </div>
        </div>
      </Container>
    </section>);

}

function Wordmark({ name, style, src, height }) {
  const common = { color: "var(--fg-2)", whiteSpace: "nowrap", userSelect: "none" };
  if (style === "image") {
    return (
      <img
        src={src}
        alt={name}
        draggable={false}
        style={{
          height: height || 24,

          display: "block",
          opacity: 0.92,
          userSelect: "none", objectFit: "cover", width: "80px"
        }} />);
  }
  const styles = {
    "display": { font: "800 22px/1 var(--font-display)", letterSpacing: "-0.03em", ...common },
    "lower-serif": { font: "400 22px/1 Georgia, 'Times New Roman', serif", fontStyle: "italic", letterSpacing: "-0.01em", ...common },
    "lower-light": { font: "300 22px/1 var(--font-display)", letterSpacing: "-0.02em", ...common },
    "mono": { font: "700 18px/1 var(--font-mono)", letterSpacing: "1px", ...common }
  };
  return <span style={styles[style] || styles.display}>{name}</span>;
}

Object.assign(window, { TrustRow });