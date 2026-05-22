/* Creative Wall — AI creative intelligence */

const ALL_TILES = [
  { id:1,  cat:"Summer Sale",   spend:284, dur:62, pf:"M", tag:"TOP",    hue:"var(--brand-lime)",    date:"2025-06-12" },
  { id:2,  cat:"Loyalty Push",  spend:142, dur:41, pf:"G", tag:"",       hue:"var(--data-purple)",   date:"2025-04-18" },
  { id:3,  cat:"Summer Sale",   spend:96,  dur:28, pf:"M", tag:"",       hue:"var(--brand-lime)",    date:"2025-07-02" },
  { id:4,  cat:"DR Category",   spend:211, dur:88, pf:"M", tag:"TOP",    hue:"var(--data-orange)",   date:"2025-03-22" },
  { id:5,  cat:"Price Hooks",   spend:64,  dur:11, pf:"M", tag:"NEW",    hue:"var(--data-pink)",     date:"2025-09-28" },
  { id:6,  cat:"DR Category",   spend:178, dur:72, pf:"G", tag:"",       hue:"var(--data-orange)",   date:"2025-05-05" },
  { id:7,  cat:"Loyalty Push",  spend:58,  dur:19, pf:"G", tag:"",       hue:"var(--data-purple)",   date:"2025-08-14" },
  { id:8,  cat:"Brand Story",   spend:133, dur:44, pf:"M", tag:"",       hue:"var(--data-blue-soft)",date:"2025-06-30" },
  { id:9,  cat:"Back to School",spend:88,  dur:24, pf:"G", tag:"NEW",    hue:"var(--data-green)",    date:"2025-09-10" },
  { id:10, cat:"Pharmacy Push", spend:167, dur:96, pf:"M", tag:"LONGEST",hue:"var(--data-orange)",   date:"2025-02-10" },
  { id:11, cat:"Holiday Teaser",spend:54,  dur:8,  pf:"M", tag:"NEW",    hue:"var(--data-pink)",     date:"2025-10-01" },
  { id:12, cat:"Brand Story",   spend:121, dur:78, pf:"G", tag:"LONGEST",hue:"var(--data-blue-soft)",date:"2025-03-02" },
];

function CreativeWall({ lang }) {
  const t = T[lang].creative;
  const [filter, setFilter] = React.useState("TOP");

  const tiles = React.useMemo(() => {
    const arr = [...ALL_TILES];
    if (filter === "TOP") return arr.sort((a,b) => b.spend - a.spend).slice(0, 8);
    if (filter === "NEWEST") return arr.sort((a,b) => b.date.localeCompare(a.date)).slice(0, 8)
      .map(t => ({ ...t, tag: t.tag || "NEW" }));
    if (filter === "LONGEST") return arr.sort((a,b) => b.dur - a.dur).slice(0, 8)
      .map(t => ({ ...t, tag: t.dur >= 60 ? "LONGEST" : t.tag }));
    if (filter === "META") return arr.filter(t => t.pf === "M").sort((a,b) => b.spend - a.spend).slice(0, 8);
    if (filter === "GOOGLE") return arr.filter(t => t.pf === "G").sort((a,b) => b.spend - a.spend).slice(0, 8);
    return arr.slice(0, 8);
  }, [filter]);

  const countLabel = {
    TOP:     "1,284 CREATIVES · SORTED BY SPEND",
    NEWEST:  "1,284 CREATIVES · SORTED BY DATE",
    LONGEST: "1,284 CREATIVES · SORTED BY DURATION",
    META:    "842 META CREATIVES",
    GOOGLE:  "442 GOOGLE CREATIVES",
  }[filter];

  return (
    <section id="creative" className="pad-sm pad-sec-md pad-sec-sm" style={{ padding:"128px 32px", background:"var(--bg-0)", borderTop:"1px solid var(--border-hairline)" }}>
      <Container>
        <SectionHeading num="03" label={t.label} title={t.title} sub={t.sub} />

        <div style={{
          marginTop: 56,
          background:"var(--bg-2)", border:"1px solid var(--border-hairline-strong)",
          borderRadius:16, overflow:"hidden", position:"relative",
        }}>
          <div style={{
            display:"flex", alignItems:"center", gap:10, flexWrap:"wrap",
            padding:"16px 20px", borderBottom:"1px solid var(--border-hairline)", background:"var(--bg-1)",
          }}>
            <span style={{ font:"400 10px/1 var(--font-mono)", letterSpacing:1.2, color:"var(--fg-5)", textTransform:"uppercase", marginRight:6 }}>FILTER</span>
            {["TOP","NEWEST","LONGEST","META","GOOGLE"].map((f) => (
              <FilterChip key={f} active={filter===f} onClick={() => setFilter(f)}>{f}</FilterChip>
            ))}
            <div style={{ marginLeft:"auto", font:"400 10px/1 var(--font-mono)", color:"var(--fg-5)", letterSpacing:1 }}>
              {countLabel}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:0 }} className="grid-collapse">
            <div key={filter} className="grid-sm-2 padcard-sm" style={{
              padding:24, display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12,
              borderRight:"1px solid var(--border-hairline)",
              animation: "cwFade 280ms var(--ease-out)",
            }}>
              {tiles.map((c) => <CreativeTile key={`${filter}-${c.id}`} c={c} />)}
            </div>

            <div className="padcard-sm" style={{ padding:24, display:"flex", flexDirection:"column", gap:16 }}>
              <BudgetByCategory />
              <EfficiencyMatrix />
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @keyframes cwFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}

function CreativeTile({ c }) {
  const spendLabel = `€${c.spend}K`;
  const durLabel = `${c.dur}d`;
  return (
    <div className="hoverlift" style={{
      position:"relative",
      aspectRatio:"3/4",
      background:`linear-gradient(135deg, ${c.hue}22, ${c.hue}05), var(--bg-3)`,
      border:"1px solid var(--border-hairline-strong)", borderRadius:10,
      padding:10, display:"flex", flexDirection:"column", justifyContent:"space-between",
      overflow:"hidden",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <span style={{ font:"700 9px/1 var(--font-mono)", letterSpacing:0.8, padding:"3px 6px", borderRadius:3, background:"rgba(0,0,0,0.5)", color:c.hue }}>{c.pf}</span>
        {c.tag && (
          <span style={{
            font:"700 8px/1 var(--font-mono)", letterSpacing:1, padding:"3px 6px", borderRadius:3,
            background: c.tag==="TOP" ? "var(--brand-lime)" : c.tag==="NEW" ? "rgba(96,165,250,0.2)" : c.tag==="LONGEST" ? "rgba(245,158,11,0.2)" : "var(--bg-5)",
            color: c.tag==="TOP" ? "#000" : c.tag==="NEW" ? "var(--data-blue-soft)" : c.tag==="LONGEST" ? "var(--data-orange)" : "var(--fg-3)",
          }}>{c.tag}</span>
        )}
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{
          width:"70%", height:"55%",
          background: `linear-gradient(135deg, ${c.hue}, transparent)`,
          borderRadius: 6, opacity: 0.4,
        }} />
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        <div style={{ font:"500 11px/1.2 var(--font-body)", color:"#fff" }}>{c.cat}</div>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <span style={{ font:"700 11px/1 var(--font-mono)", color:c.hue }}>{spendLabel}</span>
          <span style={{ font:"400 10px/1 var(--font-mono)", color:"var(--fg-5)" }}>{durLabel}</span>
        </div>
      </div>
    </div>
  );
}

function BudgetByCategory() {
  const cats = [
    { n:"Summer Sale",  v:32, c:"var(--brand-lime)" },
    { n:"DR Category",  v:24, c:"var(--data-orange)" },
    { n:"Loyalty Push", v:18, c:"var(--data-purple)" },
    { n:"Brand Story",  v:14, c:"var(--data-blue-soft)" },
    { n:"Price Hooks",  v:12, c:"var(--data-pink)" },
  ];
  const [hover, setHover] = React.useState(null);
  const size = 120, r = 48, sw = 20, cx = size/2, cy = size/2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  const active = hover != null ? cats[hover] : null;

  return (
    <div style={{ background:"var(--bg-3)", border:"1px solid var(--border-hairline)", borderRadius:12, padding:18 }}>
      <div style={{ font:"700 15px/1.3 var(--font-display)", color:"#fff", letterSpacing:-0.3 }}>Budget by campaign</div>
      <div style={{ font:"400 10px/1.4 var(--font-mono)", color:"var(--fg-5)", letterSpacing:0.8, marginTop:4 }}>AI-DETECTED · TOP 5 · HOVER SLICE</div>
      <div style={{ display:"flex", gap:18, alignItems:"center", marginTop:14 }}>
        <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
          <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg-5)" strokeWidth={sw} />
            {cats.map((c, i) => {
              const len = (c.v/100) * C;
              const off = -acc;
              acc += len;
              const on = hover === i;
              return (
                <circle key={c.n}
                  cx={cx} cy={cy} r={r} fill="none"
                  stroke={c.c}
                  strokeWidth={on ? sw + 4 : sw}
                  strokeDasharray={`${len} ${C - len}`}
                  strokeDashoffset={off}
                  style={{
                    cursor:"pointer",
                    opacity: hover == null || on ? 1 : 0.35,
                    filter: on ? `drop-shadow(0 0 6px ${c.c})` : "none",
                    transition:"all 160ms var(--ease-out)",
                  }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </svg>
          <div style={{
            position:"absolute", inset:0,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            pointerEvents:"none",
          }}>
            <div style={{ font:"400 8px/1 var(--font-mono)", color:"var(--fg-5)", letterSpacing:0.6, textTransform:"uppercase" }}>
              {active ? active.n : "TOTAL"}
            </div>
            <div style={{ font:"700 14px/1 var(--font-mono)", color:"#fff", marginTop:4 }}>
              {active ? `${active.v}%` : "€17.9M"}
            </div>
          </div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4 }}>
          {cats.map((c, i) => {
            const on = hover === i;
            return (
              <div key={c.n}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  display:"flex", alignItems:"center", gap:8,
                  padding:"3px 6px", borderRadius:4, cursor:"pointer",
                  background: on ? "var(--bg-4)" : "transparent",
                  opacity: hover == null || on ? 1 : 0.5,
                  transition:"all 160ms",
                }}>
                <span style={{ width:7, height:7, borderRadius:2, background:c.c }} />
                <span style={{ flex:1, font:"400 11px/1 var(--font-body)", color:"var(--fg-2)" }}>{c.n}</span>
                <span style={{ font:"700 11px/1 var(--font-mono)", color:"var(--fg-2)" }}>{c.v}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EfficiencyMatrix() {
  // x = duration (0-100%), y = spend (0-100% mapped to €0-300K)
  const dots = [
    { x:85, y:80, c:"var(--brand-lime)",     l:"Summer Sale",   spend:"€284K", dur:"62d" },
    { x:70, y:65, c:"var(--data-orange)",    l:"DR Category",   spend:"€211K", dur:"88d" },
    { x:45, y:52, c:"var(--data-purple)",    l:"Loyalty Push",  spend:"€142K", dur:"41d" },
    { x:25, y:22, c:"var(--data-pink)",      l:"Price Hooks",   spend:"€64K",  dur:"11d" },
    { x:55, y:35, c:"var(--data-blue-soft)", l:"Brand Story",   spend:"€133K", dur:"44d" },
    { x:30, y:68, c:"var(--fg-5)",           l:"Unclassified",  spend:"€58K",  dur:"19d" },
    { x:62, y:28, c:"var(--fg-5)",           l:"Unclassified",  spend:"€42K",  dur:"14d" },
  ];
  const [hover, setHover] = React.useState(null);
  const active = hover != null ? dots[hover] : null;

  return (
    <div style={{ background:"var(--bg-3)", border:"1px solid var(--border-hairline)", borderRadius:12, padding:18, flex:1, position:"relative" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
        <div>
          <div style={{ font:"700 15px/1.3 var(--font-display)", color:"#fff", letterSpacing:-0.3 }}>Efficiency matrix</div>
          <div style={{ font:"400 10px/1.4 var(--font-mono)", color:"var(--fg-5)", letterSpacing:0.8, marginTop:4 }}>DURATION × SPEND · HOVER DOT</div>
        </div>
        {active && (
          <div style={{ textAlign:"right" }}>
            <div style={{ font:"500 11px/1.2 var(--font-body)", color:active.c }}>{active.l}</div>
            <div style={{ font:"400 10px/1 var(--font-mono)", color:"var(--fg-5)", marginTop:3 }}>{active.spend} · {active.dur}</div>
          </div>
        )}
      </div>

      {/* Chart area with Y-axis gutter */}
      <div style={{ display:"grid", gridTemplateColumns:"14px auto 1fr", gap:6, marginTop:14 }}>
        {/* Y-axis title (rotated) */}
        <div style={{
          writingMode:"vertical-rl", transform:"rotate(180deg)",
          display:"flex", alignItems:"center", justifyContent:"center",
          font:"400 9px/1 var(--font-mono)", letterSpacing:1.2, color:"var(--fg-3)",
          textTransform:"uppercase",
        }}>
          ↑ BUDGET (€)
        </div>
        {/* Y-axis value labels */}
        <div style={{
          display:"flex", flexDirection:"column", justifyContent:"space-between",
          height:180, paddingRight:4,
          font:"400 9px/1 var(--font-mono)", letterSpacing:0.5, color:"var(--fg-5)",
          textAlign:"right",
        }}>
          <span>€300K</span>
          <span>€200K</span>
          <span>€100K</span>
          <span>€0</span>
        </div>

        <div className="dot-grid" style={{
          position:"relative", height:180,
          border:"1px solid var(--border-hairline)", borderRadius:8, background:"var(--bg-2)",
        }}>
          {/* grid lines */}
          {[0.33, 0.66].map((f) => (
            <div key={`h${f}`} style={{ position:"absolute", left:0, right:0, top:`${f*100}%`, height:1, background:"rgba(255,255,255,0.04)" }} />
          ))}
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, background:"var(--border-hairline-strong)" }} />
          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:1, background:"var(--border-hairline-strong)" }} />
          <span style={{ position:"absolute", top:6, right:8, font:"400 8px/1 var(--font-mono)", letterSpacing:1, color:"var(--brand-lime)" }}>WINNERS</span>
          <span style={{ position:"absolute", bottom:6, left:8, font:"400 8px/1 var(--font-mono)", letterSpacing:1, color:"var(--fg-5)" }}>TESTS</span>
          {dots.map((d, i) => {
            const on = hover === i;
            return (
              <div key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  position:"absolute", left:`${d.x}%`, bottom:`${d.y}%`,
                  width: on ? 18 : 12, height: on ? 18 : 12, borderRadius:999, background:d.c,
                  transform:"translate(-50%, 50%)",
                  boxShadow: on ? `0 0 16px ${d.c}, 0 0 0 2px rgba(255,255,255,0.15)` : `0 0 8px ${d.c}`,
                  opacity: hover == null || on ? 1 : 0.45,
                  cursor:"pointer",
                  transition:"all 160ms var(--ease-out)",
                  zIndex: on ? 2 : 1,
                }} />
            );
          })}
        </div>
      </div>

      {/* X-axis labels (offset by Y title + gutter) */}
      <div style={{ display:"grid", gridTemplateColumns:"14px auto 1fr", gap:6, marginTop:8 }}>
        <div />
        <div style={{ width:36 }} />
        <div style={{
          display:"flex", justifyContent:"space-between",
          font:"400 9px/1 var(--font-mono)", letterSpacing:1, color:"var(--fg-5)",
        }}>
          <span>← SHORT</span>
          <span style={{ color:"var(--fg-3)" }}>DURATION (DAYS) →</span>
          <span>LONG</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CreativeWall });
