/* Pricing — 3 tiers inline + Final CTA */

function Pricing({ lang }) {
  const t = T[lang].pricing;
  const { openContact } = useContact();
  const plans = (PLANS[lang] || PLANS.EN);

  return (
    <section id="pricing" className="pad-sm pad-sec-md pad-sec-sm" style={{ padding: "128px 32px", background: "var(--bg-0)", borderTop: "1px solid var(--border-hairline)" }}>
      <Container>
        <SectionHeading num="05" label={t.label} title={t.title} sub={t.sub} />
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-collapse">
          {plans.map((p) => (
            <div key={p.n} style={{
              position: "relative",
              background: p.hl ? "linear-gradient(180deg, rgba(201,244,20,0.04), transparent), var(--bg-3)" : "var(--bg-3)",
              border: p.hl ? "1px solid rgba(201,244,20,0.4)" : "1px solid var(--border-hairline-strong)",
              borderRadius: 16, padding: 28,
              display: "flex", flexDirection: "column", gap: 20,
            }}>
              {p.hl && (
                <div style={{
                  position:"absolute", top:-10, left:28,
                  padding:"4px 10px", borderRadius:999, background:"var(--brand-lime)",
                  font:"700 10px/1 var(--font-mono)", color:"#000", letterSpacing:1.2,
                }}>MOST POPULAR</div>
              )}
              <div>
                {p.label && <div style={{ font: "400 9px/1 var(--font-mono)", letterSpacing: 1.4, color: "var(--fg-4)", textTransform: "uppercase", marginBottom: 8 }}>{p.label}</div>}
                <div style={{ font: "700 22px/1 var(--font-display)", color: "#fff", letterSpacing: -0.4 }}>{p.n}</div>
                <div style={{ font: "400 13px/1.5 var(--font-body)", color: "var(--fg-3)", marginTop: 8 }}>{p.sub}</div>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ font: `700 ${p.p.length > 8 ? "clamp(18px,2.2vw,24px)" : "44px"}/1.1 var(--font-mono)`, color: p.hl ? "var(--brand-lime)" : "#fff", letterSpacing: -1 }}>{p.p}</span>
                <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-5)" }}>{p.per}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {p.pts.map((pt, i) => pt && typeof pt === "object" && pt.h ? (
                  <li key={i} style={{ font: "400 9px/1 var(--font-mono)", letterSpacing: 1.4, color: "var(--fg-4)", textTransform: "uppercase", paddingTop: 6 }}>{pt.h}</li>
                ) : (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", font: "400 13px/1.5 var(--font-body)", color: "var(--fg-2)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.hl ? "var(--brand-lime)" : "var(--fg-3)"} strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 3, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {pt}
                  </li>
                ))}
              </ul>
              {p.hl
                ? <PrimaryBtn style={{ justifyContent:"center", width:"100%" }} onClick={() => openContact(p.n)}>{p.cta}</PrimaryBtn>
                : <GhostBtn style={{ justifyContent:"center", width:"100%", textAlign:"center" }} onClick={() => openContact(p.n)}>{p.cta}</GhostBtn>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTA({ lang }) {
  const t = T[lang].finalCta;
  const { openContact } = useContact();
  return (
    <section className="pad-sm" style={{ padding: "96px 32px", background: "var(--bg-0)" }}>
      <div className="padcard-sm stack-sm" style={{
        maxWidth: 1216, margin: "0 auto",
        background: "var(--brand-lime)", borderRadius: 24,
        padding: "72px 64px",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap:"wrap",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", right:-60, top:-60, width:300, height:300, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(0,0,0,0.1), transparent 70%)",
        }}/>
        <div style={{ maxWidth: 640, position:"relative" }}>
          <h2 style={{ margin: 0, font: "700 clamp(40px,5vw,60px)/1 var(--font-display)", letterSpacing: -3, color: "#000", whiteSpace:"pre-line" }}>
            {t.title}
          </h2>
          <p style={{ margin: "16px 0 0", font: "500 17px/1.5 var(--font-body)", color: "rgba(0,0,0,0.75)" }}>{t.sub}</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", position: "relative" }}>
          <PrimaryBtn dark style={{ padding:"18px 32px", fontSize:16 }} onClick={() => openContact()}>
            {T[lang].cta.demo}
          </PrimaryBtn>
          <button onClick={() => openContact(null, "quote")} className="btn-reset" style={{
            background: "transparent", color: "#000",
            font: "700 16px/1 var(--font-body)",
            padding: "18px 28px", borderRadius: 12,
            border: "1.5px solid #000",
            display: "inline-flex", alignItems: "center", gap: 10,
            whiteSpace: "nowrap", cursor: "pointer",
            transition: "background 160ms var(--ease-out), transform 160ms var(--ease-out)",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.97)"}
          onMouseUp={(e) => e.currentTarget.style.transform = ""}
          >
            {T[lang].cta.quote}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Pricing, CTA });
