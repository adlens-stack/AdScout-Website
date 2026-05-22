/* Tweak panel — hero variant + language */

function TweakPanel({ lang, setLang, heroVariant, setHeroVariant, visible }) {
  if (!visible) return null;
  return (
    <div className="tweak-panel open">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <span style={{ font:"700 12px/1 var(--font-mono)", letterSpacing:1.2, color:"#fff", textTransform:"uppercase" }}>Tweaks</span>
        <span style={{ width:7, height:7, borderRadius:999, background:"var(--brand-lime)", boxShadow:"0 0 8px var(--brand-lime)" }} />
      </div>

      <div className="tweak-row">
        <span className="tweak-label">Language</span>
        <div className="tweak-options">
          {LANGS.map((l) => (
            <button key={l} className={`tweak-chip ${lang===l?"active":""}`} onClick={() => setLang(l)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <span className="tweak-label">Hero variant</span>
        <div className="tweak-options">
          {Object.keys(HERO_VARIANTS).map((v) => (
            <button key={v} className={`tweak-chip ${heroVariant===v?"active":""}`} onClick={() => setHeroVariant(v)}>{v}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TweakPanel });
