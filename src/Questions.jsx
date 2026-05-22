/* Questions We Answer — big, quiet, C-level */

function Questions({ lang }) {
  const t = T[lang].questions;
  const items = MGMT_QUESTIONS[lang] || MGMT_QUESTIONS.EN;
  const [active, setActive] = React.useState(0);
  return (
    <section id="solutions" className="pad-sm pad-sec-md pad-sec-sm" style={{ padding: "128px 32px", background: "var(--bg-0)" }}>
      <Container>
        <SectionHeading num="01" label={t.label} title={t.title} sub={t.sub} />
        <div className="grid-collapse gap-md-24" style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--border-hairline)" }}>
            {items.map((item, i) => (
              <button key={i} onClick={() => setActive(i)} className="btn-reset" style={{
                display: "grid", gridTemplateColumns: "auto 1fr auto",
                gap: 16, alignItems: "center",
                padding: "20px 0",
                borderBottom: "1px solid var(--border-hairline)",
                textAlign: "left",
                cursor: "pointer",
                transition: "opacity 160ms var(--ease-out)",
                opacity: active === i ? 1 : 0.55,
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => { if (active !== i) e.currentTarget.style.opacity = 0.55; }}>
                <span style={{
                  font: "400 11px/1 var(--font-mono)", letterSpacing: 1.4,
                  color: active === i ? "var(--brand-lime)" : "var(--fg-5)",
                  width: 24,
                }}>0{i + 1}</span>
                <span style={{
                  font: "600 clamp(16px, 2vw, 22px)/1.3 var(--font-display)",
                  color: active === i ? "#fff" : "var(--fg-2)",
                  letterSpacing: -0.4,
                }}>{item.q}</span>
                <span style={{
                  font: "400 10px/1 var(--font-mono)", letterSpacing: 1.2,
                  color: active === i ? "var(--brand-lime)" : "var(--fg-5)",
                  textTransform: "uppercase",
                }}>{item.meta} →</span>
              </button>
            ))}
          </div>

          <AnswerCard lang={lang} item={items[active]} index={active} />
        </div>
      </Container>
    </section>
  );
}

function AnswerCard({ lang, item, index }) {
  // Each question gets a little visual — simple, typographic
  const visuals = [
    <SovVisual key="sov" lang={lang} />,
    <SeasonVisual key="season" />,
    <ObjectiveVisual key="obj" />,
    <SovDeltaVisual key="sovd" />,
    <ChannelVisual key="ch" />,
    <ExecSummaryVisual key="exec" lang={lang} />,
  ];
  return (
    <div className="stick-off padcard-sm" style={{
      position: "sticky", top: 100,
      background: "var(--bg-2)", border: "1px solid var(--border-hairline-strong)",
      borderRadius: 16, padding: 32,
      minHeight: 440,
      display: "flex", flexDirection: "column", gap: 24,
      width: "100%", boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: 1.4, color: "var(--fg-3)", textTransform: "uppercase" }}>
          {item.meta}
        </span>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--brand-lime)", boxShadow: "0 0 8px var(--brand-lime)" }} />
      </div>
      <div key={index} style={{ animation: "fadeInUp 320ms var(--ease-out)" }}>
        {visuals[index] || visuals[0]}
      </div>
    </div>
  );
}

/* Small visuals for answer card */
function SovVisual({ lang }) {
  const rows = [
    { n: "You",      v: 14.2, c: "var(--brand-lime)", sub: "Your brand" },
    { n: "Terno",    v: 23.5, c: "var(--data-orange)", sub: "Category leader" },
    { n: "JYSK",     v: 12.6, c: "var(--data-purple)", sub: "Close peer" },
    { n: "Dr.Max",   v:  9.9, c: "var(--data-blue-soft)", sub: "Growing fast" },
  ];
  const [hover, setHover] = React.useState(0);
  const active = rows[hover];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ font: "700 28px/1.15 var(--font-display)", color: "#fff", letterSpacing: -0.8 }}>
        {lang === "SK" ? "Ste pod kategorickou strednou hodnotou." : "You're under the category median"}
      </div>
      <div style={{ font: "400 14px/1.55 var(--font-body)", color: "var(--fg-3)" }}>
        {lang === "SK"
          ? "Vaše 14.2% share of voice je 1.4× pod lídrom kategórie."
          : "Your 14.2% share of voice sits 1.4× below the category leader."}
      </div>
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r, i) => {
          const on = hover === i;
          const dim = !on;
          return (
            <div key={r.n}
              onMouseEnter={() => setHover(i)}
              style={{
                display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 12, alignItems: "center",
                padding: "6px 8px", borderRadius: 6, cursor: "pointer",
                background: on ? "var(--bg-4)" : "transparent",
                opacity: dim ? 0.55 : 1,
                transition: "all 160ms var(--ease-out)",
              }}>
              <span style={{ font: "400 11px/1 var(--font-mono)", color: r.n === "You" ? "var(--brand-lime)" : "var(--fg-3)", letterSpacing: 0.8 }}>{r.n}</span>
              <div style={{ height: 8, background: "var(--bg-5)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{
                  width: `${r.v * 4}%`, height: "100%", background: r.c,
                  animation: "grow-bar 600ms var(--ease-out) both", transformOrigin: "left",
                  boxShadow: on ? `0 0 10px ${r.c}` : "none",
                  transition: "box-shadow 160ms",
                }} />
              </div>
              <span style={{ font: "700 11px/1 var(--font-mono)", color: r.n === "You" ? "var(--brand-lime)" : "var(--fg-2)" }}>{r.v}%</span>
            </div>
          );
        })}
      </div>
      <div style={{ font: "400 11px/1.4 var(--font-mono)", color: "var(--fg-5)", letterSpacing: 0.6, marginTop: -4 }}>
        → <span style={{ color: active.c }}>{active.n}</span>: {active.sub}
      </div>
    </div>
  );
}

function SeasonVisual() {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const heights = [30, 42, 55, 70, 82, 95, 88, 70, 52, 48, 62, 80];
  const spend = [0.42, 0.58, 0.76, 0.97, 1.14, 1.32, 1.22, 0.97, 0.72, 0.66, 0.86, 1.11];
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ font: "700 28px/1.15 var(--font-display)", color: "#fff", letterSpacing: -0.8 }}>
        June–July is the window you're missing.
      </div>
      <div style={{ font: "400 14px/1.55 var(--font-body)", color: "var(--fg-3)" }}>
        Category spend peaks +213% in weeks 24–28. Your flighting stops a month early — every year.
      </div>
      <div className="dot-grid" style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 6, height: 130, marginTop: 8, padding: 8 }}>
        {heights.map((h, i) => {
          const peak = i >= 5 && i <= 6;
          const on = hover === i;
          return (
            <div key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end", cursor: "pointer" }}>
              <div style={{
                width: "100%", height: `${h}%`,
                background: peak ? "var(--brand-lime)" : "rgba(96,165,250,0.4)",
                borderRadius: "3px 3px 0 0",
                animation: `grow-bar 600ms var(--ease-out) ${i * 30}ms both`,
                transformOrigin: "bottom",
                boxShadow: on ? `0 0 12px ${peak ? "rgba(201,244,20,0.6)" : "rgba(96,165,250,0.55)"}` : "none",
                filter: on ? "brightness(1.2)" : "none",
                transition: "all 160ms",
              }} />
              <span style={{ font: "400 8px/1 var(--font-mono)", color: on ? "#fff" : "var(--fg-5)", letterSpacing: 0.6 }}>{months[i]}</span>
            </div>
          );
        })}
        {hover !== null && (
          <div style={{
            position: "absolute", left: `${((hover + 0.5) / months.length) * 100}%`,
            bottom: "100%", transform: "translateX(-50%)",
            background: "rgba(18,18,26,0.96)", border: "1px solid var(--border-hairline-strong)",
            borderRadius: 6, padding: "6px 8px",
            font: "400 10px/1 var(--font-mono)", color: "#fff", whiteSpace: "nowrap",
            pointerEvents: "none",
          }}>
            {months[hover]} · <b style={{ color: "var(--brand-lime)" }}>€{spend[hover].toFixed(2)}M</b>
          </div>
        )}
      </div>
    </div>
  );
}

function ObjectiveVisual() {
  const objs = [
    { k: "REACH",       v: 18, c: "var(--data-blue-soft)", note: "Top-of-funnel awareness" },
    { k: "ENGAGEMENT",  v: 12, c: "var(--data-purple)",    note: "Comment & save farming" },
    { k: "TRAFFIC",     v: 22, c: "var(--data-orange)",    note: "Category landing pages" },
    { k: "CONVERSION",  v: 48, c: "var(--brand-lime)",     note: "Bottom-of-funnel, DR creatives" },
  ];
  const [hover, setHover] = React.useState(3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ font: "700 28px/1.15 var(--font-display)", color: "#fff", letterSpacing: -0.8 }}>
        Performance-led. 48% goes to conversion.
      </div>
      <div style={{ font: "400 14px/1.55 var(--font-body)", color: "var(--fg-3)" }}>
        Their creative library is 72% DR. They are not defending brand — they are milking bottom-of-funnel.
      </div>
      <div style={{ display: "flex", height: 40, borderRadius: 8, overflow: "hidden", marginTop: 8 }}>
        {objs.map((o, i) => {
          const on = hover === i;
          return (
            <div key={o.k}
              onMouseEnter={() => setHover(i)}
              style={{
                flex: o.v, background: o.c,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: o.c === "var(--brand-lime)" ? "#000" : "#fff",
                font: "700 11px/1 var(--font-mono)", letterSpacing: 0.6,
                filter: on ? "brightness(1.15)" : hover !== null ? "brightness(0.7)" : "none",
                transition: "filter 160ms", cursor: "pointer",
                boxShadow: on ? "inset 0 0 0 2px rgba(255,255,255,0.3)" : "none",
              }}>
              {o.v}%
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
        {objs.map((o, i) => {
          const on = hover === i;
          return (
            <button key={o.k} className="btn-reset"
              onMouseEnter={() => setHover(i)}
              style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", opacity: on ? 1 : 0.55, transition: "opacity 160ms" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: o.c }} />
              <span style={{ font: "400 10px/1 var(--font-mono)", color: "var(--fg-3)", letterSpacing: 0.8 }}>{o.k}</span>
            </button>
          );
        })}
      </div>
      <div style={{ font: "400 11px/1.4 var(--font-mono)", color: "var(--fg-5)", marginTop: -4 }}>
        → <span style={{ color: objs[hover].c }}>{objs[hover].k}</span> {objs[hover].v}% · {objs[hover].note}
      </div>
    </div>
  );
}

function SovDeltaVisual() {
  const pts = [
    { x: 10, y: 80, d: "Jan 12", sov: 11.0 },
    { x: 40, y: 70, d: "Jan 26", sov: 11.8 },
    { x: 70, y: 72, d: "Feb 09", sov: 11.6 },
    { x: 100, y: 55, d: "Feb 23", sov: 12.7 },
    { x: 130, y: 52, d: "Mar 09", sov: 12.9 },
    { x: 160, y: 38, d: "Mar 23", sov: 13.5 },
    { x: 190, y: 40, d: "Apr 06", sov: 13.4 },
    { x: 220, y: 28, d: "Apr 20", sov: 13.9 },
    { x: 250, y: 32, d: "May 04", sov: 13.8 },
    { x: 280, y: 18, d: "May 18", sov: 14.2 },
  ];
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const [hover, setHover] = React.useState(pts.length - 1);
  const svgRef = React.useRef(null);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 300;
    let best = 0, bestD = Infinity;
    pts.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < bestD) { bestD = d; best = i; }
    });
    setHover(best);
  };

  const active = pts[hover];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ font: "700 28px/1.15 var(--font-display)", color: "#fff", letterSpacing: -0.8 }}>
        +3.2 pts in 90 days. Trend up.
      </div>
      <div style={{ font: "400 14px/1.55 var(--font-body)", color: "var(--fg-3)" }}>
        Your share of voice has grown steadily since Jan 12 while two competitors contracted.
      </div>
      <div style={{ position: "relative", marginTop: 8 }}>
        <svg ref={svgRef} viewBox="0 0 300 100" width="100%" height="130"
             onMouseMove={onMove}
             style={{ cursor: "crosshair", display: "block" }}>
          <defs>
            <linearGradient id="sovgrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(201,244,20,0.4)" />
              <stop offset="100%" stopColor="rgba(201,244,20,0)" />
            </linearGradient>
          </defs>
          <path d={`${path} L 280 100 L 10 100 Z`} fill="url(#sovgrad)" />
          <path d={path} stroke="var(--brand-lime)" strokeWidth="2" fill="none" />
          <line x1={active.x} x2={active.x} y1={0} y2={100} stroke="rgba(201,244,20,0.3)" strokeDasharray="2 3" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={hover === i ? 4 : 2}
                    fill="var(--brand-lime)" stroke="#0A0A0F" strokeWidth={hover === i ? 2 : 1}
                    style={{ transition: "r 120ms" }} />
          ))}
        </svg>
        <div style={{
          position: "absolute", top: 0,
          left: `${(active.x / 300) * 100}%`,
          transform: active.x > 200 ? "translateX(calc(-100% - 8px))" : "translateX(8px)",
          background: "rgba(18,18,26,0.96)", border: "1px solid var(--border-hairline-strong)",
          borderRadius: 6, padding: "6px 10px",
          font: "400 10px/1.4 var(--font-mono)", color: "#fff",
          pointerEvents: "none", whiteSpace: "nowrap",
        }}>
          <div style={{ color: "var(--fg-5)", letterSpacing: 0.6 }}>{active.d}</div>
          <div style={{ color: "var(--brand-lime)", fontWeight: 700, marginTop: 2 }}>SoV {active.sov}%</div>
        </div>
      </div>
    </div>
  );
}

function ChannelVisual() {
  const rivalMeta = 63;
  const youMeta = 48;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ font: "700 28px/1.15 var(--font-display)", color: "#fff", letterSpacing: -0.8 }}>
        {rivalMeta} / {100 - rivalMeta}. Heavier on Meta than you.
      </div>
      <div style={{ font: "400 14px/1.55 var(--font-body)", color: "var(--fg-3)" }}>
        Rival skews <b style={{ color: "var(--brand-lime)" }}>{Math.abs(rivalMeta - youMeta)} pts</b> harder on Meta. Their Google coverage is 37% — you're at 52%.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        <ChannelBar label="Rival" meta={rivalMeta} />
        <ChannelBar label="You"   meta={youMeta} />
      </div>
    </div>
  );
}

function ChannelBar({ label, meta }) {
  const google = 100 - meta;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ font: "400 11px/1 var(--font-mono)", color: "var(--fg-3)", letterSpacing: 0.8 }}>{label}</span>
        <span style={{ font: "400 10px/1 var(--font-mono)", color: "var(--fg-5)", letterSpacing: 0.8 }}>META / GOOGLE</span>
      </div>
      <div style={{
        display: "flex", height: 32, borderRadius: 6, overflow: "hidden",
        position: "relative", userSelect: "none",
      }}>
        <div style={{ flex: meta, background: "var(--brand-lime)", color: "#000", font: "700 11px/1 var(--font-mono)", display: "flex", alignItems: "center", justifyContent: "center" }}>{meta}%</div>
        <div style={{ flex: google, background: "var(--data-blue-soft)", color: "#000", font: "700 11px/1 var(--font-mono)", display: "flex", alignItems: "center", justifyContent: "center" }}>{google}%</div>
      </div>
    </div>
  );
}

function ExecSummaryVisual({ lang }) {
  const moves = lang === "SK" ? [
    { k: "KROK 01", v: "Navýšiť spend do konverzií o 18% v Q2." },
    { k: "KROK 02", v: "Obsadiť júnové okno – spustiť kampaň pred týždňom 24." },
    { k: "KROK 03", v: "Auditovať Google pokrytie — rival ho drží na 37%." },
  ] : [
    { k: "MOVE 01", v: "Increase conversion spend by 18% in Q2." },
    { k: "MOVE 02", v: "Own the June window — launch before week 24." },
    { k: "MOVE 03", v: "Audit Google coverage — rival holds 37% vs. your 52%." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ font: "700 28px/1.15 var(--font-display)", color: "#fff", letterSpacing: -0.8 }}>
        {lang === "SK" ? "Tri kroky na tento kvartál." : "Three moves for this quarter."}
      </div>
      <div style={{ font: "400 13px/1.55 var(--font-body)", color: "var(--fg-3)" }}>
        {lang === "SK" ? "Generované zo zmien v sezonalite, SoV a objective mix za 90 dní." : "Generated from 90-day shifts in seasonality, SoV, and objective mix."}
      </div>
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
        {moves.map((m, i) => (
          <div key={i} style={{ background: "var(--bg-3)", border: "1px solid var(--border-hairline)", borderRadius: 8, padding: "14px 16px" }}>
            <div style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: 1.2, color: "var(--brand-lime)" }}>{m.k}</div>
            <div style={{ marginTop: 6, font: "500 14px/1.45 var(--font-body)", color: "var(--fg-2)" }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Questions });
