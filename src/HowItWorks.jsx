/* How it works — 3 steps */

function HowItWorks({ lang }) {
  const t = T[lang].howItWorks;
  const steps = lang === "SK" ? [
    { k: "01", title: "Vyberte 5 konkurentov", body: "Dodáte krátky zoznam kľúčových rivalov v SK a CZ. Žiadne API, žiadne IT tikety." },
    { k: "02", title: "My získame dáta", body: "Ťaháme Meta Ad Library a Google Ads Transparency — spendy, formáty, sezonalita, kreatíva." },
    { k: "03", title: "Vy sa rozhodnete", body: "Dashboard plus executive brief — pre seniornych marketérov, finance a board." },
  ] : [
    { k: "01", title: "Pick five competitors", body: "Supply a shortlist of your key rivals in SK and CZ. No APIs, no IT tickets." },
    { k: "02", title: "We fetch the data", body: "We pull Meta Ad Library and Google Ads Transparency — spend, formats, seasonality, creative." },
    { k: "03", title: "You decide", body: "Dashboard plus executive brief — built for senior marketers, finance, and the board." },
  ];
  return (
    <section className="pad-sm pad-sec-md pad-sec-sm" style={{ padding: "128px 32px", background: "var(--bg-0)", borderTop: "1px solid var(--border-hairline)" }}>
      <Container>
        <SectionHeading num="04" label={t.label} title={t.title} sub={t.sub} />
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid-collapse">
          {steps.map((s) => (
            <div key={s.k} className="hoverlift" style={{
              background: "var(--bg-3)", border: "1px solid var(--border-hairline-strong)",
              borderRadius: 16, padding: 32, minHeight: 260,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  font: "700 36px/1 var(--font-mono)", color: "var(--brand-lime)", letterSpacing: -1,
                }}>{s.k}</span>
                <span style={{
                  width: 32, height: 32, borderRadius: 8, background: "var(--bg-5)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-3)",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </div>
              <h3 style={{ margin: 0, font: "700 22px/1.2 var(--font-display)", letterSpacing: -0.6, color: "#fff" }}>{s.title}</h3>
              <p style={{ margin: 0, font: "400 14px/1.55 var(--font-body)", color: "var(--fg-3)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, { HowItWorks });
