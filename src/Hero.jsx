/* Hero — split 55/45: left pitch + right live mini-dashboard */

// Scroll-reveal hook — adds .in when element scrolls into view
function useReveal() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
window.useReveal = useReveal;

// Animated number — counts up to a value when mounted/visible
function CountUp({ to, prefix = "", suffix = "", decimals = 0, duration = 1100, style = {}, className = "" }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const start = () => {
      if (started.current) return; started.current = true;
      const t0 = performance.now();
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        setVal(to * ease(p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) { start(); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { start(); io.disconnect(); } }), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref} className={className} style={style}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}
window.CountUp = CountUp;


function HeroMiniDashboard({ lang }) {
  const [tick, setTick] = React.useState(0);
  const [pulseTick, setPulseTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 4200);
    return () => clearInterval(id);
  }, []);
  React.useEffect(() => {
    const id = setInterval(() => setPulseTick(t => t + 1), 2800);
    return () => clearInterval(id);
  }, []);

  const months = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const heights = [52, 61, 58, 74, 92, 81];
  const spend  = [0.62, 0.73, 0.69, 0.89, 1.10, 0.97]; // €M per month
  const deltas = ["+12.4%", "+11.9%", "+13.1%"];
  const delta = deltas[tick % deltas.length];
  const [hoverBar, setHoverBar] = React.useState(null);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{
        position: "absolute", inset: -30, borderRadius: 24,
        background: "radial-gradient(ellipse at 60% 40%, rgba(201,244,20,0.22), transparent 65%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "relative",
        background: "var(--bg-2)",
        border: "1px solid var(--border-hairline-strong)",
        borderRadius: 16,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.45), 0 0 30px rgba(201,244,20,0.08)",
        overflow: "hidden",
        animation: "glide-up 800ms var(--ease-out) both",
      }}>
        {/* Scan-line sweep */}
        <div aria-hidden style={{
          position: "absolute", left: 0, right: 0, top: 0, height: "100%",
          pointerEvents: "none", overflow: "hidden", zIndex: 2,
        }}>
          <div style={{
            position: "absolute", left: 0, right: 0, height: 80,
            background: "linear-gradient(180deg, transparent 0%, rgba(201,244,20,0.08) 50%, transparent 100%)",
            animation: "scan-line 7s linear infinite",
          }} />
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px", borderBottom: "1px solid var(--border-hairline)",
          background: "var(--bg-1)",
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#35343A" }} />
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#35343A" }} />
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--brand-lime)", boxShadow: "0 0 6px var(--brand-lime)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--brand-lime)", animation: "pulse 1.4s ease-in-out infinite" }} />
            <span style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: 1.2, color: "var(--fg-3)", textTransform: "uppercase" }}>
              LIVE · CATEGORY_PHARMACY_SK
            </span>
          </div>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{
            background: "var(--bg-3)", borderRadius: 12, padding: "18px 20px",
            border: "1px solid var(--border-hairline)",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <div>
              <div style={{ font: "400 10px/1.5 var(--font-mono)", letterSpacing: 1.2, color: "var(--fg-3)", textTransform: "uppercase" }}>
                {lang === "SK" ? "CELKOVÝ SPEND KONKURENCIE · YTD" : "TOTAL COMPETITOR SPEND · YTD"}
              </div>
              <div style={{ font: "700 38px/1 var(--font-mono)", color: "var(--brand-lime)", letterSpacing: -0.5, marginTop: 6 }}>
                <CountUp to={4.28} decimals={2} prefix="€" suffix="M" duration={1400} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div key={tick} style={{ font: "700 15px/1 var(--font-mono)", color: "var(--brand-lime)", animation: "count-up 320ms var(--ease-out)" }}>{delta}</div>
              <div style={{ font: "400 9px/1 var(--font-mono)", letterSpacing: 1, color: "var(--fg-5)", textTransform: "uppercase", marginTop: 4 }}>YoY</div>
            </div>
          </div>

          <div style={{
            background: "var(--bg-3)", borderRadius: 12, padding: 20,
            border: "1px solid var(--border-hairline)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ font: "400 10px/1.5 var(--font-mono)", letterSpacing: 1.2, color: "var(--fg-3)", textTransform: "uppercase" }}>
                {lang === "SK" ? "MESAČNÝ SPEND · SEZONALITA" : "MONTHLY SPEND · SEASONALITY"}
              </div>
              <div style={{ font: "400 10px/1 var(--font-mono)", color: "var(--fg-5)" }}>H2 2025</div>
            </div>
            <div className="dot-grid" style={{
              position: "relative",
              display: "flex", alignItems: "flex-end", gap: 12, height: 110,
              padding: "8px 4px 0",
            }}>
              {heights.map((h, i) => {
                const isPeak = i === heights.length - 1;
                const isHover = hoverBar === i;
                const active = isHover || (hoverBar === null && isPeak);
                return (
                  <div key={i}
                    onMouseEnter={() => setHoverBar(i)}
                    onMouseLeave={() => setHoverBar(null)}
                    style={{
                      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                      gap: 8, justifyContent: "flex-end", height: "100%",
                      cursor: "pointer", position: "relative",
                    }}>
                    <div style={{
                      width: "100%", height: `${h}%`,
                      background: active ? "var(--brand-lime)" : "rgba(201,244,20,0.35)",
                      borderRadius: "4px 4px 0 0", transformOrigin: "bottom",
                      animation: `grow-bar 700ms var(--ease-out) ${i * 60}ms both`,
                      boxShadow: active ? "0 0 14px rgba(201,244,20,0.55)" : "none",
                      transition: "background 220ms var(--ease-out), box-shadow 220ms var(--ease-out), transform 220ms var(--ease-out)",
                      transform: active ? "scaleY(1.04)" : "scaleY(1)",
                    }} />
                    {isPeak && (
                      <span aria-hidden style={{
                        position: "absolute",
                        bottom: `${h}%`,
                        width: 6, height: 6, borderRadius: 999,
                        background: "var(--brand-lime)",
                        boxShadow: "0 0 10px var(--brand-lime)",
                        marginBottom: 4,
                        animation: "ticker 2.4s ease-in-out infinite",
                      }} />
                    )}
                    <span style={{
                      font: "400 9px/1 var(--font-mono)",
                      color: isHover ? "var(--brand-lime)" : "var(--fg-5)",
                      letterSpacing: 1,
                    }}>{months[i]}</span>
                  </div>
                );
              })}
              {hoverBar !== null && (
                <div style={{
                  position: "absolute",
                  left: `${(hoverBar + 0.5) * (100 / heights.length)}%`,
                  bottom: `calc(${heights[hoverBar]}% + 14px)`,
                  transform: "translateX(-50%)",
                  background: "rgba(18,18,26,0.96)",
                  border: "1px solid var(--border-hairline-strong)",
                  borderRadius: 6, padding: "6px 8px",
                  font: "400 10px/1 var(--font-mono)", color: "#fff",
                  whiteSpace: "nowrap", pointerEvents: "none",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
                }}>
                  {months[hoverBar]} · <b style={{ color: "var(--brand-lime)" }}>€{spend[hoverBar].toFixed(2)}M</b>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <MiniStat k="META SHARE"   v="63%" bar={63} color="var(--brand-lime)" />
            <MiniStat k="GOOGLE SHARE" v="37%" bar={37} color="var(--data-blue-soft)" />
          </div>


        </div>
      </div>
    </div>
  );
}

function MiniStat({ k, v, bar, color }) {
  return (
    <div style={{
      background: "var(--bg-3)", border: "1px solid var(--border-hairline)",
      borderRadius: 8, padding: "12px 14px",
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ font: "400 9px/1 var(--font-mono)", letterSpacing: 1.2, color: "var(--fg-5)", textTransform: "uppercase" }}>{k}</span>
        <span style={{ font: "700 15px/1 var(--font-mono)", color }}>{v}</span>
      </div>
      <div style={{ height: 4, background: "var(--bg-5)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${bar}%`, background: color,
          borderRadius: 999, animation: "grow-bar 800ms var(--ease-out) both",
          transformOrigin: "left",
        }} />
      </div>
    </div>
  );
}

function Hero({ lang, heroVariant }) {
  const t = T[lang];
  const v = HERO_VARIANTS[heroVariant] || HERO_VARIANTS.CATEGORY;
  const copy = v[lang] || v.EN;
  const { openContact } = useContact();
  return (
    <section className="pad-sm pad-sec-sm" style={{ position: "relative", padding: "80px 32px 96px", background: "var(--bg-0)", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 1100px 500px at 70% 30%, rgba(201,244,20,0.06), transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 900px 500px at 50% 30%, #000 40%, transparent 80%)",
        pointerEvents: "none",
      }} />
      <Container style={{ position: "relative" }}>
        <div className="stack-md gap-md-24" style={{ display: "flex", gap: 64, alignItems: "center" }}>
          <div className="min0" style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", gap: 28, minWidth: 0 }}>
            <div style={{ animation: "glide-up 700ms var(--ease-out) 60ms both" }}>
              <Eyebrow live>{copy.eyebrow}</Eyebrow>
            </div>
            <h1 className="text-sm-h1" style={{
              margin: 0,
              font: "700 clamp(36px, 5.6vw, 68px)/1.02 var(--font-display)",
              letterSpacing: "-0.045em",
              color: "#fff", textWrap: "balance",
              animation: "glide-up 800ms var(--ease-out) 140ms both",
            }}>{copy.h1}</h1>
            <p className="text-sm-body" style={{ margin: 0, maxWidth: 560, font: "400 clamp(16px, 1.7vw, 19px)/1.6 var(--font-body)", color: "var(--fg-3)", textWrap: "pretty", animation: "glide-up 800ms var(--ease-out) 240ms both" }}>
              {copy.sub}
            </p>
            <div className="stack-sm" style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", animation: "glide-up 800ms var(--ease-out) 340ms both" }}>
              <PrimaryBtn onClick={() => openContact()}>{t.cta.demo}</PrimaryBtn>
              <GhostBtn onClick={() => openContact(null, "quote")}>{t.cta.quote}</GhostBtn>
            </div>
            <div style={{ marginTop: 16, paddingTop: 24, borderTop: "1px solid var(--border-hairline)", display: "flex", gap: 32, flexWrap: "wrap", animation: "glide-up 800ms var(--ease-out) 440ms both" }}>
              {t.proof.map((p) => <ProofStat key={p.k} v={p.v} k={p.k} />)}
            </div>
          </div>
          <div className="full-sm min0" style={{ flex: "1 1 45%", minWidth: 0, width: "100%" }}>
            <HeroMiniDashboard lang={lang} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProofStat({ v, k }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ font: "700 22px/1 var(--font-display)", color: "#fff", letterSpacing: -0.5 }}>{v}</span>
      <span style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: 1.2, color: "var(--fg-5)", textTransform: "uppercase" }}>{k}</span>
    </div>
  );
}

Object.assign(window, { Hero, HeroMiniDashboard, ProofStat });
