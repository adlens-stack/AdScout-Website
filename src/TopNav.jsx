function Logo({ size = 20 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{
        position: "relative",
        width: size * 0.55, height: size * 0.55, borderRadius: 3,
        background: "var(--brand-lime)",
        boxShadow: "0 0 12px rgba(201,244,20,0.6)",
      }}>
        <span style={{
          position: "absolute", inset: 0, borderRadius: 3,
          background: "var(--brand-lime)",
          animation: "ping 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
          opacity: 0.6,
        }} />
      </span>
      <span style={{ font: `800 ${size}px/1 var(--font-display)`, letterSpacing: "-1px", color: "#fff" }}>
        AdScout
      </span>
    </div>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div style={{
      display: "flex", gap: 2, padding: 3,
      background: "var(--bg-3)", borderRadius: 6,
      border: "1px solid var(--border-hairline)",
    }}>
      {LANGS.map((l) => (
        <button key={l} onClick={() => setLang(l)} className="btn-reset" style={{
          padding: "4px 8px", borderRadius: 4,
          font: "700 10px/1 var(--font-mono)", letterSpacing: 1,
          background: lang === l ? "var(--brand-lime)" : "transparent",
          color: lang === l ? "#000" : "var(--fg-3)",
          cursor: "pointer",
        }}>{l}</button>
      ))}
    </div>
  );
}

function TopNav({ lang, setLang }) {
  const [open, setOpen] = React.useState("home");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const t = T[lang];
  const { openContact } = useContact();
  const link = (id, label) => (
    <a key={id} onClick={() => { setOpen(id); setMenuOpen(false); }}
      href={`#${id}`}
      style={{
        font: "500 14px/1 var(--font-body)",
        color: open === id ? "#fff" : "var(--fg-4)",
        cursor: "pointer", padding: "4px 0",
        transition: "color 160ms var(--ease-out)",
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
      onMouseLeave={(e) => { if (open !== id) e.currentTarget.style.color = "var(--fg-4)"; }}
    >{label}</a>
  );
  const links = [
    ["solutions", t.nav.solutions],
    ["dashboard", t.nav.dashboard],
    ["creative",  t.nav.creative],
    ["pricing",   t.nav.pricing],
  ];
  return (
    <div className="pad-sm" style={{
      position: "sticky", top: 0, zIndex: 50,
      height: 72,
      background: "rgba(10,10,15,0.75)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderBottom: "1px solid var(--border-hairline)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px",
    }}>
      <Logo />
      <div className="hide-md" style={{ display: "flex", gap: 28 }}>
        {links.map(([id, l]) => link(id, l))}
      </div>
      <div className="hide-md" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <LangToggle lang={lang} setLang={setLang} />
        <a style={{ font: "500 14px/1 var(--font-body)", color: "var(--fg-4)", cursor: "pointer" }}>
          {t.nav.login}
        </a>
        <GhostBtn style={{ padding: "9px 16px", fontSize: 13 }} onClick={() => openContact(null, "quote")}>{t.cta.quote}</GhostBtn>
        <PrimaryBtn style={{ padding: "10px 20px", fontSize: 14 }} onClick={() => openContact()}>{t.cta.demo}</PrimaryBtn>
      </div>

      {/* Mobile burger */}
      <button
        className="btn-reset show-md"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
        style={{
          display: "none", alignItems: "center", justifyContent: "center",
          width: 40, height: 40, borderRadius: 8,
          border: "1px solid var(--border-hairline-strong)",
          background: "var(--bg-2)", color: "#fff",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {menuOpen
            ? <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>
            : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>}
        </svg>
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, zIndex: 49,
          background: "rgba(10,10,15,0.97)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--border-hairline)",
          padding: "20px 24px 28px",
          display: "flex", flexDirection: "column", gap: 8,
          animation: "fadeInUp 200ms var(--ease-out)",
        }}>
          {links.map(([id, l]) => (
            <a key={id} href={`#${id}`} onClick={() => { setOpen(id); setMenuOpen(false); }}
              style={{
                padding: "14px 4px",
                borderBottom: "1px solid var(--border-hairline)",
                font: "600 18px/1 var(--font-display)",
                color: open === id ? "#fff" : "var(--fg-3)",
                letterSpacing: -0.3,
              }}>{l}</a>
          ))}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
            <LangToggle lang={lang} setLang={setLang} />
            <a style={{ font: "500 14px/1 var(--font-body)", color: "var(--fg-4)" }}>{t.nav.login}</a>
          </div>
          <GhostBtn style={{ marginTop: 16, justifyContent: "center", width: "100%", textAlign: "center" }}
            onClick={() => { setMenuOpen(false); openContact(null, "quote"); }}>{t.cta.quote}</GhostBtn>
          <PrimaryBtn style={{ marginTop: 8, justifyContent: "center", width: "100%" }}
            onClick={() => { setMenuOpen(false); openContact(); }}>{t.cta.demo}</PrimaryBtn>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { TopNav, Logo, LangToggle });
