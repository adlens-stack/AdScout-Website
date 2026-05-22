function Footer({ lang }) {
  const { openContact } = useContact();
  const cols = lang === "SK" ? [
    { t: "PRODUKT",  l: [{ label: "Dashboard", href: "#dashboard" }, { label: "Creative Wall", href: "#creative" }, { label: "Riešenia", href: "#how" }, { label: "Cenník", href: "#pricing" }] },
    { t: "SPOLOČNOSŤ", l: [{ label: "O nás", href: `/about?lang=${lang}` }, { label: "Kontakt", action: "contact" }] },
    { t: "ZDROJE",  l: [{ label: "Metodológia", href: `/methodology?lang=${lang}` }, { label: "Case studies", href: `/case-studies?lang=${lang}` }] },
  ] : [
    { t: "PRODUCT",  l: [{ label: "Dashboard", href: "#dashboard" }, { label: "Creative Wall", href: "#creative" }, { label: "Solutions", href: "#how" }, { label: "Pricing", href: "#pricing" }] },
    { t: "COMPANY",  l: [{ label: "About", href: `/about?lang=${lang}` }, { label: "Contact", action: "contact" }] },
    { t: "RESOURCES",l: [{ label: "Methodology", href: `/methodology?lang=${lang}` }, { label: "Case studies", href: `/case-studies?lang=${lang}` }] },
  ];
  return (
    <footer className="pad-sm" style={{ background: "var(--bg-0)", borderTop: "1px solid var(--border-hairline)", padding: "64px 32px 32px" }}>
      <Container>
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap:"wrap" }}>
          <div style={{ flex: "1 1 300px" }}>
            <Logo />
            <p style={{ margin: "16px 0 0", maxWidth: 360, font: "400 14px/1.6 var(--font-body)", color: "var(--fg-4)" }}>
              {lang === "SK"
                ? "Competitive ads intelligence pre marketingové tímy, ktoré odmietajú hádať."
                : "Competitive ads intelligence for marketing teams who refuse to guess."}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.t} style={{ flex: "1 1 140px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ font: "400 10px/1.5 var(--font-mono)", letterSpacing: 1.4, color: "var(--fg-3)", textTransform: "uppercase" }}>{c.t}</div>
              {c.l.map((x) => {
                const baseStyle = { font: "400 14px/1 var(--font-body)", color: "var(--fg-4)", cursor: "pointer", textDecoration: "none", transition: "color 160ms var(--ease-out)" };
                const onHoverIn = (e) => { e.currentTarget.style.color = "var(--brand-lime)"; };
                const onHoverOut = (e) => { e.currentTarget.style.color = "var(--fg-4)"; };
                if (x.action === "contact") {
                  return <a key={x.label} onClick={(e) => { e.preventDefault(); openContact(null, "contact"); }} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} style={baseStyle}>{x.label}</a>;
                }
                return <a key={x.label} href={x.href} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} style={baseStyle}>{x.label}</a>;
              })}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border-hairline)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap:"wrap", gap:16 }}>
          <span style={{ font: "400 10px/1.5 var(--font-mono)", letterSpacing: 1, color: "var(--fg-5)", textTransform: "uppercase" }}>
            © 2026 ADSCOUT INTELLIGENCE · DATA-DRIVEN PRECISION
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {(lang === "SK"
              ? [["Obchodné podmienky","terms"],["Ochrana údajov","privacy"],["Imprint","imprint"]]
              : [["Terms","terms"],["Privacy","privacy"],["Imprint","imprint"]]
            ).map(([label, slug]) => (
              <a key={slug} href={`legal/${slug}.html?lang=${lang}`} style={{ font: "400 10px/1.5 var(--font-mono)", letterSpacing: 1, color: "var(--fg-5)", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>{label}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

Object.assign(window, { Footer });
