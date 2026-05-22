/* Competitive Intelligence Dashboard — tab-driven, interactive */

function DashTab({ active, onClick, label, count }) {
  return (
    <button onClick={onClick} className="btn-reset" style={{
      position: "relative",
      padding: "8px 14px", borderRadius: 8,
      background: active ? "var(--brand-lime)" : "var(--bg-5)",
      color: active ? "#000" : "var(--fg-3)",
      border: active ? "0" : "1px solid var(--border-hairline-strong)",
      font: `${active ? 700 : 500} 11px/1 var(--font-mono)`,
      letterSpacing: 1.2, textTransform: "uppercase",
      display: "inline-flex", alignItems: "center", gap: 8,
      cursor: "pointer",
      transition: "all 220ms var(--ease-out)",
      transform: active ? "translateY(-1px)" : "none",
      boxShadow: active ? "0 6px 18px rgba(201,244,20,0.25), 0 0 0 4px rgba(201,244,20,0.08)" : "none",
    }}>
      {label}
      {count != null && (
        <span style={{
          padding: "2px 6px", borderRadius: 4,
          background: active ? "rgba(0,0,0,0.15)" : "var(--bg-3)",
          font: "700 9px/1 var(--font-mono)", letterSpacing: 0.6,
          transition: "background 220ms var(--ease-out)",
        }}>{count}</span>
      )}
    </button>
  );
}

function FilterChip({ active, onClick, children, icon }) {
  return (
    <button onClick={onClick} className="btn-reset" style={{
      padding: "6px 12px", borderRadius: 999,
      background: active ? "rgba(201,244,20,0.15)" : "var(--bg-3)",
      color: active ? "var(--brand-lime)" : "var(--fg-3)",
      border: active ? "1px solid rgba(201,244,20,0.4)" : "1px solid var(--border-hairline)",
      font: "500 11px/1 var(--font-mono)", letterSpacing: 0.8,
      display: "inline-flex", alignItems: "center", gap: 6,
      cursor: "pointer",
      transition: "all 160ms var(--ease-out)",
    }}>
      {icon && <span style={{ fontSize: 10 }}>{icon}</span>}
      {children}
    </button>
  );
}

function KpiCell({ k, v, sub, color = "#fff" }) {
  return (
    <div style={{
      minWidth: 0,
      padding: "18px 20px",
      background: "var(--bg-3)", borderRight: "1px solid var(--border-hairline)",
      borderBottom: "1px solid var(--border-hairline)",
      transition: "background 220ms var(--ease-out), transform 220ms var(--ease-out)",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-4)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-3)"; }}>
      <div style={{ font: "400 10px/1.4 var(--font-mono)", letterSpacing: 1.2, color: "var(--fg-5)", textTransform: "uppercase" }}>{k}</div>
      <div style={{ font: "700 clamp(20px, 2.4vw, 26px)/1 var(--font-mono)", color, letterSpacing: -0.5, marginTop: 8, wordBreak: "break-word", animation: "count-up 600ms var(--ease-out) both" }}>{v}</div>
      {sub && <div style={{ font: "400 10px/1.4 var(--font-mono)", color: "var(--fg-5)", marginTop: 4 }}>{sub}</div>}
      <span aria-hidden style={{
        position: "absolute", left: 0, bottom: 0, height: 2,
        width: color === "var(--brand-lime)" ? "100%" : "0%",
        background: "var(--brand-lime)",
        animation: color === "var(--brand-lime)" ? "reveal-l 800ms var(--ease-out) both" : "none",
        opacity: 0.55,
      }} />
    </div>
  );
}

const DashCtx = React.createContext({ focus: null, setFocus: () => {}, tab: "TOTAL" });

/* ============== DATA (Meta + Google adds up to Total) ============== */
// Rows: meta and google spend/ads — totals computed
const RAW_ROWS = [
  { n: "Terno",                meta: { spend: 4.1, ads: 31200, sov: 36, mix: [80, 20,  0] }, google: { spend: 2.1, ads: 11697, sov: 30, mix: [0,  35, 65] }, dot: "var(--brand-lime)" },
  { n: "JYSK Slovensko",       meta: { spend: 1.8, ads:  1820, sov: 16, mix: [100, 0,  0] }, google: { spend: 0.5, ads:   295, sov:  7, mix: [0,  38, 62] }, dot: "var(--data-orange)" },
  { n: "Lekáreň Dr.Max",       meta: { spend: 1.2, ads:  4900, sov: 11, mix: [100, 0,  0] }, google: { spend: 0.7, ads:  1590, sov: 10, mix: [0,  32, 68] }, dot: "var(--data-purple)" },
  { n: "McDonald's Slovensko", meta: { spend: 1.1, ads:   720, sov: 10, mix: [100, 0,  0] }, google: { spend: 0.6, ads:   158, sov:  9, mix: [0,  42, 58] }, dot: "var(--data-pink)" },
  { n: "COOP Jednota",         meta: { spend: 0.9, ads:  2700, sov:  8, mix: [100, 0,  0] }, google: { spend: 0.6, ads:   822, sov:  9, mix: [0,  40, 60] }, dot: "var(--data-blue-soft)" },
];
// Reference totals per tab — the "market" denominator so SoV% is honest.
// Top-5 spend in data ≈ 83% of the market; we scale the denominator up so remaining 13 - 5 = 8 competitors account for the rest.
const MARKET_TOTAL = { META: 13, GOOGLE: 4.9, TOTAL: 17.9 };  // in €M, matches KPI strip

const getRowFor = (r, tab) => {
  if (tab === "META") return { ...r.meta, mix: [100, 0, 0] };
  if (tab === "GOOGLE") return { ...r.google, mix: [0, 38, 62] };
  // TOTAL
  const spend = +(r.meta.spend + r.google.spend).toFixed(1);
  const ads = r.meta.ads + r.google.ads;
  // platform mix: weighted by spend share, Meta goes to Meta bucket; Google splits into Display/Search
  const totalSpend = r.meta.spend + r.google.spend;
  const metaPct = Math.round((r.meta.spend / totalSpend) * 100);
  const disp = Math.round(((r.google.spend * 0.38) / totalSpend) * 100);
  const search = 100 - metaPct - disp;
  return { spend, ads, mix: [metaPct, disp, search] };
};
const fmtM = (n) => `€${n.toFixed(1)}M`;

// Monthly series per platform (€K). Total = meta + google, so July peak stays consistent.
const SERIES_DATA = {
  Terno:  { color: "var(--brand-lime)",    dotName: "Terno",              meta: [50, 58, 72, 66, 75, 85, 90, 80, 68, 62, 55, 75], google: [30, 37, 48, 44, 50, 55, 59, 50, 42, 38, 35, 45] },
  JYSK:   { color: "var(--data-orange)",   dotName: "JYSK Slovensko",     meta: [45, 55, 60, 75, 85, 105, 180, 125, 95, 85, 72, 65], google: [15, 20, 20, 25, 30, 35,  53,  45, 35, 35, 28, 25] },
  "Dr.Max": { color: "var(--data-purple)", dotName: "Lekáreň Dr.Max",     meta: [30, 38, 42, 44, 55, 72, 95, 88, 72, 56, 51, 56], google: [20, 24, 28, 28, 35, 43, 55, 54, 48, 39, 37, 39] },
};
const getSeries = (k, tab) => {
  const s = SERIES_DATA[k];
  if (tab === "META") return s.meta;
  if (tab === "GOOGLE") return s.google;
  return s.meta.map((v, i) => v + s.google[i]);
};

/* ============== TOP-LEVEL ============== */
function DashboardSection({ lang }) {
  const t = T[lang].dashboard;
  const [tab, setTab] = React.useState("TOTAL");
  const [year, setYear] = React.useState("ALL");
  const [focus, setFocus] = React.useState(null);

  // Tab-driven KPIs
  const sumSpend = RAW_ROWS.reduce((a, r) => a + r.meta.spend + r.google.spend, 0);
  const sumMeta = RAW_ROWS.reduce((a, r) => a + r.meta.spend, 0);
  const sumGoogle = RAW_ROWS.reduce((a, r) => a + r.google.spend, 0);
  const metaAds = RAW_ROWS.reduce((a, r) => a + r.meta.ads, 0);
  const googleAds = RAW_ROWS.reduce((a, r) => a + r.google.ads, 0);

  const kpis = {
    META: {
      ads: { v: `${(metaAds/1000).toFixed(0)}K`, sub: `${metaAds.toLocaleString()} ads` },
      spend: { v: fmtM(sumMeta), sub: `${((sumMeta/sumSpend)*100).toFixed(0)}% of total` },
      imp: { v: "2,662M", sub: "Meta platforms" },
      reach: { v: "944M", sub: "Meta only" },
      avg: { v: fmtM(sumMeta/12), sub: "12 months · Meta" },
    },
    GOOGLE: {
      ads: { v: `${(googleAds/1000).toFixed(0)}K`, sub: `${googleAds.toLocaleString()} ads` },
      spend: { v: fmtM(sumGoogle), sub: `${((sumGoogle/sumSpend)*100).toFixed(0)}% of total` },
      imp: { v: "2,949M", sub: "Search + Display" },
      reach: { v: "—", sub: "N/A for Google" },
      avg: { v: fmtM(sumGoogle/12), sub: "12 months · Google" },
    },
    TOTAL: {
      ads: { v: `${((metaAds+googleAds)/1000).toFixed(0)}K`, sub: `Meta ${(metaAds/1000).toFixed(0)}K · Google ${(googleAds/1000).toFixed(0)}K` },
      spend: { v: fmtM(sumSpend), sub: `Meta ${fmtM(sumMeta)} · Google ${fmtM(sumGoogle)}` },
      imp: { v: "5,611M", sub: "Meta 2,662M · Google 2,949M" },
      reach: { v: "944M", sub: "Meta only" },
      avg: { v: fmtM(sumSpend/12), sub: "12 months" },
    },
  }[tab];

  return (
    <section id="dashboard" className="pad-sm pad-sec-md pad-sec-sm" style={{ padding: "128px 32px", background: "var(--bg-0)", borderTop: "1px solid var(--border-hairline)", position: "relative", overflow: "hidden" }}>
      <span aria-hidden style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 320, height: 1,
        background: "linear-gradient(90deg, transparent, var(--brand-lime), transparent)",
        opacity: 0.5,
      }} />
      <Container>
        <SectionHeading num="02" label={t.label} title={t.title} sub={t.sub} />

        <DashCtx.Provider value={{ focus, setFocus, tab }}>
          <div style={{
            marginTop: 64, background: "var(--bg-2)", border: "1px solid var(--border-hairline-strong)",
            borderRadius: 16, overflow: "hidden", position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: -30, borderRadius: 24,
              background: "radial-gradient(ellipse at 50% 0%, rgba(201,244,20,0.08), transparent 60%)",
              filter: "blur(40px)", pointerEvents: "none",
            }} />

            <div className="stack-sm" style={{
              position: "relative",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", borderBottom: "1px solid var(--border-hairline)",
              background: "var(--bg-1)", gap: 16, flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <FilterChip active icon="🌐">Slovakia</FilterChip>
                <span style={{ width: 1, height: 20, background: "var(--border-hairline-strong)", margin: "0 4px" }} />
                <DashTab active={tab === "META"}   onClick={() => setTab("META")}   label="Meta"   count={10} />
                <DashTab active={tab === "GOOGLE"} onClick={() => setTab("GOOGLE")} label="Google" count={11} />
                <DashTab active={tab === "TOTAL"}  onClick={() => setTab("TOTAL")}  label="Total"  count={13} />
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <FilterChip active={year === "ALL"} onClick={() => setYear("ALL")}>All years</FilterChip>
                <FilterChip active={year === "2025"} onClick={() => setYear("2025")}>2025</FilterChip>
                <span style={{ font: "400 10px/1 var(--font-mono)", color: "var(--fg-5)", letterSpacing: 1, marginLeft: 8 }}>EXPORT PDF ↓</span>
              </div>
            </div>

            <div key={`kpi-${tab}`} style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", borderBottom: "1px solid var(--border-hairline)", animation: "dashFade 320ms var(--ease-out)" }} className="grid-2-collapse grid-sm-2">
              <KpiCell k="TOTAL ADS" v={kpis.ads.v} sub={kpis.ads.sub} />
              <KpiCell k={tab === "TOTAL" ? "EST. TOTAL SPEND" : `EST. ${tab} SPEND`} v={kpis.spend.v} sub={kpis.spend.sub} color="var(--brand-lime)" />
              <KpiCell k="EST. IMPRESSIONS" v={kpis.imp.v} sub={kpis.imp.sub} />
              <KpiCell k="EST. REACH" v={kpis.reach.v} sub={kpis.reach.sub} />
              <KpiCell k="AVG. MONTHLY SPEND" v={kpis.avg.v} sub={kpis.avg.sub} />
            </div>

            <div key={`body-${tab}`} className="padcard-sm" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24, animation: "dashFade 320ms var(--ease-out)" }}>
              <CompetitorTable />
              <div className="grid-collapse gap-md-16" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
                <MonthlyLineChart />
                <SovDonut />
              </div>
              <ExecSummaryPanel lang={lang} />
            </div>

            <div style={{
              padding: "12px 20px", borderTop: "1px solid var(--border-hairline)",
              background: "var(--bg-1)",
              font: "400 11px/1.5 var(--font-mono)", color: "var(--fg-3)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ color: "var(--brand-lime)" }}>ADSCOUT_TERMINAL_V2.4 ~</span>
              <span style={{ color: "#fff", animation: "blink 1s step-end infinite" }}>|</span>
              <span style={{ marginLeft: "auto", color: "var(--fg-5)", letterSpacing: 1, fontSize: 10, textTransform: "uppercase" }}>
                {focus ? `FOCUS: ${focus.toUpperCase()} · ${tab}` : `MODE: ${tab} · AUTO_FETCH`}
              </span>
            </div>
          </div>
        </DashCtx.Provider>
      </Container>
    </section>
  );
}

/* ============== COMPETITOR TABLE ============== */
function CompetitorTable() {
  const { focus, setFocus, tab } = React.useContext(DashCtx);
  const [sort, setSort] = React.useState({ key: "spend", dir: -1 });

  const rows = React.useMemo(() => {
    // SoV = % of the full market pool for this tab (includes unseen competitors via MARKET_TOTAL)
    const raw = RAW_ROWS.map((r) => ({ n: r.n, dot: r.dot, ...getRowFor(r, tab) }));
    const market = MARKET_TOTAL[tab] || raw.reduce((a, r) => a + r.spend, 0);
    const shaped = raw.map((r) => ({
      ...r,
      sov: +((r.spend / market) * 100).toFixed(1),
      spendLabel: fmtM(r.spend),
    }));
    shaped.sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (typeof av === "string") return sort.dir * av.localeCompare(bv);
      return sort.dir * (av - bv);
    });
    return shaped;
  }, [sort, tab]);

  const onSort = (key) => setSort((s) => ({ key, dir: s.key === key ? -s.dir : -1 }));
  const arrow = (key) => sort.key === key ? (sort.dir === -1 ? "↓" : "↑") : "";

  const HeaderCell = ({ k, children, align = "right" }) => (
    <button className="btn-reset" onClick={() => onSort(k)} style={{
      textAlign: align, cursor: "pointer",
      font: "400 10px/1 var(--font-mono)", letterSpacing: 1.2,
      color: sort.key === k ? "var(--brand-lime)" : "var(--fg-5)",
      textTransform: "uppercase",
    }}>
      {children} <span style={{ opacity: sort.key === k ? 1 : 0.3 }}>{arrow(k) || "⇅"}</span>
    </button>
  );

  const subLabel = tab === "META" ? "META ONLY" : tab === "GOOGLE" ? "GOOGLE ONLY" : "COMBINED META + GOOGLE";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div>
          <div style={{ font: "700 18px/1.3 var(--font-display)", color: "#fff", letterSpacing: -0.3 }}>Competitor overview</div>
          <div style={{ font: "400 11px/1.4 var(--font-mono)", color: "var(--fg-5)", letterSpacing: 0.8, marginTop: 4 }}>
            {subLabel} · 13 COMPETITORS · CLICK TO FOCUS
          </div>
        </div>
        <button className="btn-reset" onClick={() => setFocus(null)} style={{
          font: "400 10px/1 var(--font-mono)", color: focus ? "var(--brand-lime)" : "var(--fg-5)",
          letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
        }}>{focus ? "CLEAR FOCUS ✕" : "CLEAR ALL"}</button>
      </div>

      <div className="scroll-x-sm" style={{ background: "var(--bg-3)", border: "1px solid var(--border-hairline)", borderRadius: 12, overflow: "hidden", overflowX: "auto" }}>
        <div style={{ minWidth: 600 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.8fr 0.9fr 0.9fr 0.7fr 1.4fr",
          gap: 16, padding: "14px 20px",
          borderBottom: "1px solid var(--border-hairline)",
        }}>
          <HeaderCell k="n" align="left">COMPETITOR</HeaderCell>
          <HeaderCell k="ads">ADS</HeaderCell>
          <HeaderCell k="spend">SPEND</HeaderCell>
          <HeaderCell k="sov">SOV</HeaderCell>
          <span style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: 1.2, color: "var(--fg-5)", textTransform: "uppercase" }}>PLATFORM MIX</span>
        </div>
        {rows.map((r, i) => {
          const dim = focus && focus !== r.n;
          const on = focus === r.n;
          return (
            <button key={r.n} className="btn-reset"
              onClick={() => setFocus(on ? null : r.n)}
              style={{
                display: "grid", gridTemplateColumns: "1.8fr 0.9fr 0.9fr 0.7fr 1.4fr",
                gap: 16, padding: "14px 20px", width: "100%",
                borderBottom: i === rows.length - 1 ? 0 : "1px solid var(--border-hairline)",
                alignItems: "center", textAlign: "left", cursor: "pointer",
                background: on ? "rgba(201,244,20,0.05)" : "transparent",
                opacity: dim ? 0.45 : 1,
                transition: "all 160ms var(--ease-out)",
              }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--bg-4)"; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: r.dot, boxShadow: on ? `0 0 8px ${r.dot}` : "none" }} />
                <span style={{ font: "500 14px/1 var(--font-body)", color: on ? "#fff" : "var(--fg-2)" }}>{r.n}</span>
              </div>
              <span style={{ textAlign: "right", font: "400 13px/1 var(--font-mono)", color: "var(--fg-3)" }}>{r.ads.toLocaleString()}</span>
              <span style={{ textAlign: "right", font: "700 14px/1 var(--font-mono)", color: "var(--brand-lime)" }}>{r.spendLabel}</span>
              <span style={{ textAlign: "right", font: "400 12px/1 var(--font-mono)", color: "var(--fg-2)" }}>{r.sov}%</span>
              <div style={{ display: "flex", height: 12, borderRadius: 3, overflow: "hidden", background: "var(--bg-5)" }}>
                <div style={{ flex: r.mix[0] || 0.001, background: "var(--brand-lime)" }} title={`Meta ${r.mix[0]}%`} />
                <div style={{ flex: r.mix[1] || 0.001, background: "var(--data-purple)" }} title={`Display ${r.mix[1]}%`} />
                <div style={{ flex: r.mix[2] || 0.001, background: "var(--data-green)" }} title={`Search ${r.mix[2]}%`} />
              </div>
            </button>
          );
        })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
        {[
          { l: "META",    c: "var(--brand-lime)" },
          { l: "DISPLAY", c: "var(--data-purple)" },
          { l: "SEARCH",  c: "var(--data-green)" },
        ].map((x) => (
          <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: x.c }} />
            <span style={{ font: "400 10px/1 var(--font-mono)", color: "var(--fg-3)", letterSpacing: 0.8 }}>{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============== LINE CHART ============== */
function MonthlyLineChart() {
  const { focus, tab } = React.useContext(DashCtx);
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const [enabled, setEnabled] = React.useState({ Terno: true, JYSK: true, "Dr.Max": true });
  const [hover, setHover] = React.useState(null);

  const series = React.useMemo(() => {
    const out = {};
    Object.keys(SERIES_DATA).forEach((k) => {
      out[k] = { ...SERIES_DATA[k], data: getSeries(k, tab) };
    });
    return out;
  }, [tab]);

  const max = Math.max(240, ...Object.values(series).flatMap(s => s.data)) * 1.05;
  const w = 700, h = 220, px = 36;

  const xAt = (i) => px + (i * (w - px * 2)) / 11;
  const yAt = (v) => h - (v / max) * h;
  const path = (d) => d.map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`).join(" ");

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * w;
    let i = Math.round((x - px) / ((w - px * 2) / 11));
    i = Math.max(0, Math.min(11, i));
    setHover({ i });
  };

  const activeSeries = Object.entries(series).filter(([k]) => enabled[k] && (!focus || series[k].dotName === focus));
  const tabLabel = tab === "TOTAL" ? "META + GOOGLE" : tab;

  return (
    <div style={{ background: "var(--bg-3)", border: "1px solid var(--border-hairline)", borderRadius: 12, padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
        <div>
          <div style={{ font: "700 18px/1.3 var(--font-display)", color: "#fff", letterSpacing: -0.3 }}>Monthly est. {tab.toLowerCase()} spend</div>
          <div style={{ font: "400 11px/1.4 var(--font-mono)", color: "var(--fg-5)", letterSpacing: 0.8, marginTop: 4 }}>
            TOP 3 · 2025 · {tabLabel} · HOVER FOR DETAIL
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${w} ${h + 24}`} width="100%" style={{ overflow: "visible", display: "block" }}>
          <defs>
            <linearGradient id="limeFill2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(201,244,20,0.25)" />
              <stop offset="100%" stopColor="rgba(201,244,20,0)" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((r) => (
            <line key={r} x1={px} x2={w - px} y1={(h / 3) * r} y2={(h / 3) * r} stroke="rgba(255,255,255,0.05)" />
          ))}
          {[0, 0.33, 0.66, 1].map((f, i) => (
            <text key={i} x={px - 6} y={h - f * h + 3} textAnchor="end"
                  style={{ font: "400 9px JetBrains Mono, monospace", fill: "var(--fg-5)", letterSpacing: 0.5 }}>
              €{Math.round(f * max)}K
            </text>
          ))}

          {enabled.Terno && (!focus || focus === "Terno") && (
            <path d={`${path(series.Terno.data)} L ${w - px} ${h} L ${px} ${h} Z`} fill="url(#limeFill2)" />
          )}

          {Object.entries(series).map(([k, s]) => {
            if (!enabled[k]) return null;
            const isFoc = !focus || s.dotName === focus;
            return (
              <path key={k} d={path(s.data)} stroke={s.color}
                    strokeWidth={isFoc ? 2.2 : 1.5}
                    opacity={isFoc ? 1 : 0.2}
                    fill="none" style={{ transition: "opacity 200ms" }} />
            );
          })}

          {hover && <line x1={xAt(hover.i)} x2={xAt(hover.i)} y1={0} y2={h} stroke="rgba(201,244,20,0.35)" strokeDasharray="3 3" />}
          {hover && activeSeries.map(([k, s]) => (
            <circle key={k} cx={xAt(hover.i)} cy={yAt(s.data[hover.i])}
                    r="4" fill={s.color} stroke="#0A0A0F" strokeWidth="2" />
          ))}
        </svg>

        {hover && activeSeries.length > 0 && (() => {
          const leftPct = (xAt(hover.i) / w) * 100;
          const showRight = leftPct < 65;
          return (
            <div style={{
              position: "absolute", left: `${leftPct}%`, top: 8,
              transform: showRight ? "translateX(12px)" : "translateX(calc(-100% - 12px))",
              background: "rgba(18,18,26,0.96)",
              border: "1px solid var(--border-hairline-strong)",
              borderRadius: 8, padding: "10px 12px",
              minWidth: 140, pointerEvents: "none", zIndex: 5,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}>
              <div style={{ font: "400 9px/1 var(--font-mono)", letterSpacing: 1, color: "var(--fg-5)", textTransform: "uppercase", marginBottom: 8 }}>
                {months[hover.i]} 2025 · {tab}
              </div>
              {activeSeries.map(([k, s]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                  <span style={{ flex: 1, font: "400 11px/1 var(--font-mono)", color: "var(--fg-3)" }}>{k}</span>
                  <span style={{ font: "700 11px/1 var(--font-mono)", color: "#fff" }}>€{s.data[hover.i]}K</span>
                </div>
              ))}
            </div>
          );
        })()}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: `0 ${px}px` }}>
          {months.map((m, i) => (
            <span key={m} style={{
              font: "400 9px/1 var(--font-mono)",
              color: hover && hover.i === i ? "var(--brand-lime)" : "rgba(196,201,172,0.5)",
              letterSpacing: 0.8,
            }}>{m}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
        {Object.entries(series).map(([k, s]) => {
          const on = enabled[k];
          return (
            <button key={k} className="btn-reset" onClick={() => setEnabled((x) => ({ ...x, [k]: !x[k] }))} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 10px", borderRadius: 999,
              background: on ? "var(--bg-4)" : "transparent",
              border: `1px solid ${on ? "var(--border-hairline-strong)" : "var(--border-hairline)"}`,
              cursor: "pointer", opacity: on ? 1 : 0.45,
              transition: "all 160ms var(--ease-out)",
            }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: s.color }} />
              <span style={{ font: "400 11px/1 var(--font-mono)", color: "var(--fg-3)", letterSpacing: 0.4 }}>{k}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============== SOV DONUT (fixed: proper full circle, no weird bleed) ============== */
function SovDonut() {
  const { focus, setFocus, tab } = React.useContext(DashCtx);

  // Tab-driven SoV: % of the full market (MARKET_TOTAL) — matches the competitor table exactly.
  // Top-5 + Others = 100% so the donut shows a realistic distribution.
  const slicesRaw = React.useMemo(() => {
    const market = MARKET_TOTAL[tab] || 1;
    const base = RAW_ROWS.map((r, i) => {
      const d = getRowFor(r, tab);
      return {
        name: r.n, color: r.dot, spend: d.spend,
        sov: +((d.spend / market) * 100).toFixed(1),
        yoy: ["+18.2%","+6.1%","+12.7%","-4.3%","+2.4%"][i],
      };
    });
    const top5Sov = base.reduce((a, s) => a + s.sov, 0);
    const othersSov = +Math.max(0, 100 - top5Sov).toFixed(1);
    if (othersSov > 0) {
      base.push({ name: "Others (8)", color: "var(--bg-6)", spend: +(MARKET_TOTAL[tab] - base.reduce((a, s) => a + s.spend, 0)).toFixed(1), sov: othersSov, yoy: "" });
    }
    return base;
  }, [tab]);

  const [hoverName, setHoverName] = React.useState(null);
  const active = hoverName || focus;
  const activeSlice = slicesRaw.find((s) => s.name === active);

  // SVG donut using arc paths — robust, full circle
  const size = 180, r = 70, rInner = 48, cx = size / 2, cy = size / 2;
  const polar = (deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a), cx + rInner * Math.cos(a), cy + rInner * Math.sin(a)];
  };
  const arcPath = (startDeg, endDeg) => {
    const [x1o, y1o, x1i, y1i] = polar(startDeg);
    const [x2o, y2o, x2i, y2i] = polar(endDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1o} ${y1o} A ${r} ${r} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${rInner} ${rInner} 0 ${large} 0 ${x1i} ${y1i} Z`;
  };

  let cursor = 0;
  const arcs = slicesRaw.map((s) => {
    const start = cursor;
    const end = cursor + (s.sov / 100) * 360;
    cursor = end;
    return { ...s, start, end };
  });

  const tabLabel = tab === "TOTAL" ? "COMBINED" : tab;

  return (
    <div style={{
      background: "var(--bg-3)", border: "1px solid var(--border-hairline)",
      borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 20, overflow: "hidden",
    }}>
      <div>
        <div style={{ font: "700 18px/1.3 var(--font-display)", color: "#fff", letterSpacing: -0.3 }}>Share of voice</div>
        <div style={{ font: "400 11px/1.4 var(--font-mono)", color: "var(--fg-5)", letterSpacing: 0.8, marginTop: 4 }}>
          % OF {tabLabel} BUDGET · HOVER SLICE
        </div>
      </div>
      <div className="stack-sm" style={{ display: "flex", gap: 20, alignItems: "center", flex: 1 }}>
        <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
          <svg width={size} height={size} style={{ display: "block" }}>
            {arcs.map((s) => {
              const isFoc = !focus || focus === s.name;
              const isHover = hoverName === s.name;
              return (
                <path key={s.name}
                  d={arcPath(s.start, s.end)}
                  fill={s.color}
                  stroke="var(--bg-3)"
                  strokeWidth="1.5"
                  style={{
                    cursor: "pointer",
                    opacity: isFoc ? 1 : 0.3,
                    transform: isHover ? "scale(1.04)" : "scale(1)",
                    transformOrigin: `${cx}px ${cy}px`,
                    transition: "all 200ms var(--ease-out)",
                    filter: isHover ? `drop-shadow(0 0 8px ${s.color})` : "none",
                  }}
                  onMouseEnter={() => setHoverName(s.name)}
                  onMouseLeave={() => setHoverName(null)}
                  onClick={() => setFocus(focus === s.name ? null : s.name)}
                />
              );
            })}
          </svg>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}>
            <div style={{ font: "400 9px/1 var(--font-mono)", letterSpacing: 1, color: "var(--fg-3)", textTransform: "uppercase", maxWidth: 80, textAlign: "center" }}>
              {activeSlice ? activeSlice.name : tab}
            </div>
            <div style={{ font: "700 17px/1.2 var(--font-mono)", color: "#fff", marginTop: 4 }}>
              {activeSlice ? `${activeSlice.sov}%` : fmtM(slicesRaw.reduce((a, s) => a + (s.spend || 0), 0))}
            </div>
            {activeSlice && activeSlice.yoy && (
              <div style={{ font: "400 9px/1 var(--font-mono)", letterSpacing: 1, color: activeSlice.yoy.startsWith("+") ? "var(--data-green)" : "var(--data-red)", marginTop: 4 }}>
                {activeSlice.yoy}
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {slicesRaw.map((s) => {
            const isFoc = !focus || focus === s.name;
            const on = hoverName === s.name;
            return (
              <button key={s.name} className="btn-reset"
                onClick={() => setFocus(focus === s.name ? null : s.name)}
                onMouseEnter={() => setHoverName(s.name)}
                onMouseLeave={() => setHoverName(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "4px 6px", borderRadius: 4, cursor: "pointer",
                  background: on ? "var(--bg-4)" : "transparent",
                  opacity: isFoc ? 1 : 0.4,
                  transition: "all 160ms var(--ease-out)",
                }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                <span style={{ flex: 1, font: "400 12px/1 var(--font-mono)", color: "var(--fg-2)", textAlign: "left" }}>{s.name}</span>
                <span style={{ font: "700 12px/1 var(--font-mono)", color: "var(--fg-2)" }}>{s.sov}%</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ExecSummaryPanel({ lang }) {
  const bullets = lang === "SK" ? [
    "Terno drží 34% SoV — 2.6× nad mediánom; agresívny pharmacy push v Q2.",
    "JYSK eskaluje v júli +233% mesačne — klasické sezónne okno.",
    "Dr.Max presúva z Google na Meta (58→64%) — zmena stratégie.",
  ] : [
    "Terno holds 34% SoV — 2.6× above the median; aggressive pharmacy push in Q2.",
    "JYSK escalates in July +233% monthly — a classic seasonal window.",
    "Dr.Max is shifting Google to Meta (58→64%) — strategy change detected.",
  ];
  return (
    <div className="grid-collapse padcard-sm" style={{
      background: "linear-gradient(180deg, rgba(201,244,20,0.05), transparent 80%), var(--bg-3)",
      border: "1px solid rgba(201,244,20,0.2)",
      borderRadius: 12, padding: 24,
      display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "flex-start",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 220 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--brand-lime)", boxShadow: "0 0 8px var(--brand-lime)" }} />
          <span style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: 1.2, color: "var(--brand-lime)", textTransform: "uppercase" }}>
            AI EXECUTIVE SUMMARY
          </span>
        </div>
        <div style={{ font: "700 22px/1.2 var(--font-display)", color: "#fff", letterSpacing: -0.5 }}>
          {lang === "SK" ? "Čo hovoria dáta tento týždeň" : "What the data says "}
        </div>
        <div style={{ font: "400 12px/1.5 var(--font-body)", color: "var(--fg-4)" }}>
          {lang === "SK" ? "Generované z 90-dňového okna. Aktualizované denne." : ""}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, padding: "12px 14px",
            background: "var(--bg-2)", borderRadius: 8,
            border: "1px solid var(--border-hairline)",
          }}>
            <span style={{ font: "700 11px/1.4 var(--font-mono)", color: "var(--brand-lime)", letterSpacing: 0.8 }}>0{i + 1}</span>
            <span style={{ font: "400 14px/1.5 var(--font-body)", color: "var(--fg-2)" }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { DashboardSection });
