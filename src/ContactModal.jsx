/* ContactModal — "Book a Demo" → contact form
 * - 3 fields: work email, full name, company
 * - GDPR consent (required) + marketing opt-in (optional)
 * - Free-email warning (non-blocking)
 * - Plan chip in header when opened from a pricing card
 * - Terminal-style submit log + confirmation
 * - Mobile: full-screen sheet · Desktop: centred modal
 * Mock submission: console.log + 800ms delay
 */

const FREE_EMAIL_DOMAINS = [
  "gmail.com","googlemail.com","outlook.com","hotmail.com","live.com","msn.com",
  "yahoo.com","yahoo.co.uk","ymail.com","icloud.com","me.com","mac.com",
  "aol.com","protonmail.com","proton.me","mail.com","gmx.com","gmx.de",
  "zoho.com","yandex.com","yandex.ru","seznam.cz","centrum.sk","azet.sk",
];

const CM_COPY = {
  EN: {
    title: "Book a demo",
    sub: "Tell us a bit about you. We'll guide you through the interactive dashboard with demo data — and reply within 24 hours.",
    contactTitle: "Get in touch",
    contactSub: "Have a question, a partnership idea, or just want to say hello? Drop us a line — we read every message and reply within 24 hours.",
    quoteTitle: "Get a quote",
    quoteSub: "Tell us a bit about you and pick the plan you're interested in. We'll send a tailored quote within 24 hours.",
    quotePlanLabel: "Which plan are you interested in? (optional)",
    quotePlanAny: "Not sure yet",
    plan: "PLAN",
    email: "Work email",
    emailPh: "you@company.com",
    name: "Full name",
    namePh: "Jane Novak",
    company: "Company",
    companyPh: "Acme Corp",
    freeWarn: "Looks like a personal address. A work email gets a faster, more accurate response.",
    requiredEmail: "Email is required.",
    invalidEmail: "Please enter a valid email.",
    requiredName: "Please enter your name.",
    requiredCompany: "Please enter your company.",
    requiredConsent: "Please accept the data-processing terms to continue.",
    gdpr: "I agree to the processing of my data for the purpose of being contacted by AdScout.",
    marketing: "Send me occasional category-intelligence reports (optional).",
    privacy: "By submitting you agree to our Privacy Policy.",
    submit: "Send request",
    submitting: "Sending…",
    cancel: "Cancel",
    badge: "REQUEST_FORM // CONTACT",
    successTitle: "Request received.",
    successSub: "Our team will reach out within 24 hours at the email you provided.",
    successMeta: "REF",
    close: "Close",
    logs: [
      "> establishing connection…",
      "> validating payload…",
      "> dispatching to ops_queue…",
      "> ack received. response window: 24h",
    ],
  },
  SK: {
    title: "Rezervovať demo",
    sub: "Povedzte nám zopár vecí o sebe. Prevedieme vás interaktívnym dashboardom s demo dátami — a ozveme sa do 24 hodín.",
    contactTitle: "Kontaktujte nás",
    contactSub: "Máte otázku, nápad na spoluprácu alebo nás chcete len pozdraviť? Napíšte nám — čítame každú správu a odpovieme do 24 hodín.",
    quoteTitle: "Získať cenovú ponuku",
    quoteSub: "Povedzte nám zopár vecí o sebe a vyberte plán, ktorý vás zaujíma. Ozveme sa s ponukou do 24 hodín.",
    quotePlanLabel: "Ktorý plán vás zaujíma? (nepovinné)",
    quotePlanAny: "Ešte neviem",
    plan: "PLÁN",
    email: "Pracovný e-mail",
    emailPh: "vy@firma.com",
    name: "Meno a priezvisko",
    namePh: "Jana Nováková",
    company: "Firma",
    companyPh: "Acme s.r.o.",
    freeWarn: "Zdá sa, že je to osobná adresa. Pracovný e-mail dostane rýchlejšiu a presnejšiu odpoveď.",
    requiredEmail: "E-mail je povinný.",
    invalidEmail: "Zadajte platný e-mail.",
    requiredName: "Zadajte svoje meno.",
    requiredCompany: "Zadajte názov firmy.",
    requiredConsent: "Prosím odsúhlaste spracovanie údajov.",
    gdpr: "Súhlasím so spracovaním osobných údajov za účelom kontaktovania zo strany AdScout.",
    marketing: "Posielajte mi občasné category-intelligence reporty (nepovinné).",
    privacy: "Odoslaním súhlasíte s našimi zásadami ochrany osobných údajov.",
    submit: "Odoslať žiadosť",
    submitting: "Odosielam…",
    cancel: "Zrušiť",
    badge: "REQUEST_FORM // KONTAKT",
    successTitle: "Žiadosť prijatá.",
    successSub: "Náš tím sa vám ozve do 24 hodín na zadaný e-mail.",
    successMeta: "REF",
    close: "Zavrieť",
    logs: [
      "> nadväzujem spojenie…",
      "> validujem dáta…",
      "> odosielam do ops_queue…",
      "> potvrdené. odozva do 24h",
    ],
  },
};

function ContactModal({ lang, open, plan, formType = "demo", onClose }) {
  const C = CM_COPY[lang] || CM_COPY.EN;
  const isQuote = formType === "quote";
  const isContact = formType === "contact";
  const planList = (PLANS && (PLANS[lang] || PLANS.EN)) || [];

  const [email, setEmail]       = React.useState("");
  const [name, setName]         = React.useState("");
  const [company, setCompany]   = React.useState("");
  const [selectedPlan, setSelectedPlan] = React.useState("");
  const [gdpr, setGdpr]         = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  const [errors, setErrors]     = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [logIdx, setLogIdx]     = React.useState(-1);
  const [done, setDone]         = React.useState(false);
  const [refId, setRefId]       = React.useState("");

  const dialogRef = React.useRef(null);
  const firstInputRef = React.useRef(null);

  // Reset every time it opens
  React.useEffect(() => {
    if (open) {
      setEmail(""); setName(""); setCompany("");
      setSelectedPlan(plan || "");
      setGdpr(false); setMarketing(false);
      setErrors({}); setSubmitting(false); setLogIdx(-1); setDone(false); setRefId("");
      setTimeout(() => firstInputRef.current && firstInputRef.current.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, plan]);

  // Esc to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape" && !submitting) onClose && onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, submitting, onClose]);

  if (!open) return null;

  const emailDomain = (email.split("@")[1] || "").toLowerCase().trim();
  const isFreeEmail = !!emailDomain && FREE_EMAIL_DOMAINS.includes(emailDomain);
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = C.requiredEmail;
    else if (!emailLooksValid) e.email = C.invalidEmail;
    if (!name.trim())    e.name    = C.requiredName;
    if (!company.trim()) e.company = C.requiredCompany;
    if (!gdpr)           e.gdpr    = C.requiredConsent;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev && ev.preventDefault();
    if (submitting || done) return;
    if (!validate()) return;

    setSubmitting(true);

    // Stream log lines
    for (let i = 0; i < C.logs.length; i++) {
      setLogIdx(i);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 220));
    }

    const payload = {
      form_type: formType,
      email: email.trim(),
      name: name.trim(),
      company: company.trim(),
      plan: (isQuote ? selectedPlan : plan) || null,
      gdpr_consent: gdpr,
      marketing_opt_in: marketing,
      lang,
      ts: new Date().toISOString(),
      source: typeof window !== "undefined" ? window.location.href : "",
    };
    const WEB3FORMS_KEYS = {
      demo:    '28121ad6-cd21-4c51-b9b8-4fe4ab0ce824',
      quote:   '353bd520-12dc-42b0-a99f-c04bc4e8323f',
      contact: '28121ad6-cd21-4c51-b9b8-4fe4ab0ce824',
    };

    const subjectMap = {
      demo:    'Book a Demo',
      quote:   'Get a Quote',
      contact: 'Contact',
    };

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEYS[formType] || WEB3FORMS_KEYS.demo,
        subject: `AdScout — ${subjectMap[formType] || 'Form'} from ${payload.company}`,
        from_name: payload.name,
        reply_to: payload.email,
        email: payload.email,
        company: payload.company,
        plan: payload.plan || 'N/A',
        form_type: payload.form_type,
        gdpr_consent: payload.gdpr_consent,
        marketing_opt_in: payload.marketing_opt_in,
        source: payload.source,
        lang: payload.lang,
      }),
    });

    if (!res.ok) {
      throw new Error('Submission failed');
    }
    const ref = "AS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setRefId(ref);
    setDone(true);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_submit',
      form_type: formType,
      user_data: {
        email_address: email.trim(),
        sha256_email_address: '',
      },
    });
    setSubmitting(false);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 720;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cm-title"
      onMouseDown={(e) => { if (e.target === e.currentTarget && !submitting) onClose && onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(5,5,8,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
        padding: isMobile ? 0 : 24,
        animation: "fadeInUp 200ms var(--ease-out)",
      }}
    >
      <div
        ref={dialogRef}
        style={{
          position: "relative",
          width: isMobile ? "100%" : "min(540px, 100%)",
          maxHeight: isMobile ? "92vh" : "min(92vh, 760px)",
          background: "var(--bg-2)",
          border: "1px solid var(--border-hairline-strong)",
          borderRadius: isMobile ? "16px 16px 0 0" : 16,
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(201,244,20,0.08)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Lime halo behind dialog */}
        <div style={{
          position: "absolute", inset: -1, borderRadius: "inherit",
          background: "radial-gradient(ellipse at 50% 0%, rgba(201,244,20,0.10), transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* Header */}
        <div style={{
          position: "relative",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 12,
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-hairline)",
          background: "var(--bg-1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <span style={{
              width: 8, height: 8, borderRadius: 999,
              background: "var(--brand-lime)",
              boxShadow: "0 0 10px var(--brand-lime)",
              animation: "pulse 1.4s ease-in-out infinite",
              flexShrink: 0,
            }} />
            <span style={{
              font: "400 10px/1 var(--font-mono)", letterSpacing: 1.4,
              color: "var(--fg-3)", textTransform: "uppercase",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {C.badge}
            </span>
            {(plan || (isQuote && selectedPlan)) && (
              <span style={{
                padding: "4px 8px", borderRadius: 4,
                background: "rgba(201,244,20,0.12)",
                border: "1px solid rgba(201,244,20,0.4)",
                font: "700 10px/1 var(--font-mono)", letterSpacing: 1.2,
                color: "var(--brand-lime)", textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
                {C.plan}: {String(plan || selectedPlan).toUpperCase()}
              </span>
            )}
          </div>
          <button onClick={() => !submitting && onClose && onClose()} disabled={submitting}
            aria-label={C.close}
            className="btn-reset"
            style={{
              width: 32, height: 32, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--fg-3)", cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.4 : 1,
              transition: "background 160ms, color 160ms",
            }}
            onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.background = "var(--bg-3)"; e.currentTarget.style.color = "#fff"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--fg-3)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div style={{
          position: "relative",
          padding: "24px 24px 8px",
          overflowY: "auto",
          flex: 1,
        }}>
          {!done ? (
            <form onSubmit={submit} noValidate>
              <h2 id="cm-title" style={{
                margin: 0,
                font: "700 26px/1.1 var(--font-display)", letterSpacing: -0.8,
                color: "#fff",
              }}>{isQuote ? C.quoteTitle : isContact ? C.contactTitle : C.title}</h2>
              <p style={{
                margin: "10px 0 22px",
                font: "400 14px/1.55 var(--font-body)", color: "var(--fg-3)",
                textWrap: "pretty",
              }}>{isQuote ? C.quoteSub : isContact ? C.contactSub : C.sub}</p>

              <CMField
                label={C.email}
                error={errors.email}
                warn={!errors.email && isFreeEmail && emailLooksValid ? C.freeWarn : null}
              >
                <input
                  ref={firstInputRef}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  placeholder={C.emailPh}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((x) => ({ ...x, email: undefined })); }}
                  style={cmInputStyle(!!errors.email)}
                />
              </CMField>

              <CMField label={C.name} error={errors.name}>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  placeholder={C.namePh}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((x) => ({ ...x, name: undefined })); }}
                  style={cmInputStyle(!!errors.name)}
                />
              </CMField>

              <CMField label={C.company} error={errors.company}>
                <input
                  type="text"
                  autoComplete="organization"
                  value={company}
                  placeholder={C.companyPh}
                  onChange={(e) => { setCompany(e.target.value); if (errors.company) setErrors((x) => ({ ...x, company: undefined })); }}
                  style={cmInputStyle(!!errors.company)}
                />
              </CMField>

              {isQuote && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                  <label style={{
                    font: "400 10px/1.3 var(--font-mono)", letterSpacing: 1.3,
                    color: "var(--fg-3)", textTransform: "uppercase",
                  }}>{C.quotePlanLabel}</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {planList.map((pl) => (
                      <PlanCard
                        key={pl.n}
                        plan={pl}
                        active={selectedPlan === pl.n}
                        onClick={() => setSelectedPlan(pl.n)}
                      />
                    ))}
                    <PlanCard
                      plan={{ n: C.quotePlanAny, sub: null, p: "", per: "", pts: [] }}
                      active={!selectedPlan}
                      onClick={() => setSelectedPlan("")}
                      compact
                    />
                  </div>
                </div>
              )}

              <div style={{ height: 4 }} />

              <CMCheck
                checked={gdpr}
                onChange={(v) => { setGdpr(v); if (errors.gdpr) setErrors((x) => ({ ...x, gdpr: undefined })); }}
                error={errors.gdpr}
                required
              >
                {C.gdpr}
              </CMCheck>

              <CMCheck
                checked={marketing}
                onChange={setMarketing}
              >
                {C.marketing}
              </CMCheck>

              {/* Submit log — visible while submitting */}
              {submitting && (
                <div style={{
                  marginTop: 14,
                  background: "var(--bg-1)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: 8,
                  padding: "10px 12px",
                  font: "400 11px/1.6 var(--font-mono)",
                  color: "var(--fg-3)",
                  minHeight: 80,
                }}>
                  {C.logs.slice(0, logIdx + 1).map((l, i) => (
                    <div key={i} style={{
                      animation: "dashFade 200ms var(--ease-out)",
                      color: i === logIdx ? "var(--brand-lime)" : "var(--fg-3)",
                    }}>
                      {l}
                      {i === logIdx && <span style={{ color: "#fff", animation: "blink 1s step-end infinite", marginLeft: 4 }}>▋</span>}
                    </div>
                  ))}
                </div>
              )}
            </form>
          ) : (
            // Confirmation
            <div style={{
              padding: "12px 0 8px",
              animation: "fadeInUp 320ms var(--ease-out)",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 10px", borderRadius: 4,
                background: "rgba(201,244,20,0.12)",
                border: "1px solid rgba(201,244,20,0.4)",
                font: "700 10px/1 var(--font-mono)", letterSpacing: 1.2,
                color: "var(--brand-lime)", textTransform: "uppercase",
                marginBottom: 18,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                ACK · 200_OK
              </div>
              <h2 style={{
                margin: 0, font: "700 28px/1.1 var(--font-display)", letterSpacing: -0.8,
                color: "#fff",
              }}>{C.successTitle}</h2>
              <p style={{
                margin: "12px 0 20px",
                font: "400 14px/1.55 var(--font-body)", color: "var(--fg-3)",
                textWrap: "pretty",
              }}>{C.successSub}</p>
              <div style={{
                display: "flex", flexDirection: "column", gap: 6,
                background: "var(--bg-1)",
                border: "1px solid var(--border-hairline)",
                borderRadius: 8, padding: "12px 14px",
              }}>
                <CMRow k={C.successMeta}>{refId}</CMRow>
                <CMRow k="EMAIL">{email}</CMRow>
                <CMRow k="COMPANY">{company}</CMRow>
                {(plan || (isQuote && selectedPlan)) && <CMRow k={C.plan}>{String(plan || selectedPlan).toUpperCase()}</CMRow>}
              </div>
            </div>
          )}
        </div>

        {/* Footer — sticky CTA */}
        <div style={{
          position: "relative",
          padding: "14px 20px 18px",
          borderTop: "1px solid var(--border-hairline)",
          background: "var(--bg-2)",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          {!done ? (
            <React.Fragment>
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="btn-reset"
                style={{
                  width: "100%",
                  background: "var(--brand-lime)",
                  color: "#000",
                  font: "700 15px/1 var(--font-body)",
                  padding: "14px 24px", borderRadius: 12,
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  opacity: submitting ? 0.85 : 1,
                  cursor: submitting ? "wait" : "pointer",
                  transition: "filter 160ms var(--ease-out), transform 160ms var(--ease-out)",
                }}
                onMouseDown={(e) => { if (!submitting) e.currentTarget.style.transform = "scale(0.98)"; }}
                onMouseUp={(e) => e.currentTarget.style.transform = ""}
                onMouseLeave={(e) => e.currentTarget.style.transform = ""}
              >
                {submitting ? (
                  <React.Fragment>
                    <span style={{
                      width: 10, height: 10, borderRadius: 999,
                      background: "#000", animation: "pulse 1s ease-in-out infinite",
                    }} />
                    {C.submitting}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {C.submit}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </React.Fragment>
                )}
              </button>
              <p style={{
                margin: 0, textAlign: "center",
                font: "400 11px/1.5 var(--font-mono)",
                letterSpacing: 0.4, color: "var(--fg-5)",
              }}>{C.privacy}</p>
            </React.Fragment>
          ) : (
            <button
              type="button"
              onClick={() => onClose && onClose()}
              className="btn-reset"
              style={{
                width: "100%",
                background: "var(--brand-lime)",
                color: "#000",
                font: "700 15px/1 var(--font-body)",
                padding: "14px 24px", borderRadius: 12,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                cursor: "pointer",
              }}
            >
              {C.close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function cmInputStyle(hasError) {
  return {
    width: "100%",
    background: "var(--bg-1)",
    border: `1px solid ${hasError ? "rgba(239,68,68,0.55)" : "var(--border-hairline-strong)"}`,
    borderRadius: 10,
    padding: "12px 14px",
    font: "500 15px/1.2 var(--font-body)",
    color: "#fff",
    outline: "none",
    transition: "border-color 160ms var(--ease-out), box-shadow 160ms var(--ease-out), background 160ms var(--ease-out)",
  };
}

function CMField({ label, error, warn, children }) {
  // Inject focus styling via onFocus/onBlur on the inner input — done at field level via wrapper
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current && ref.current.querySelector("input,textarea");
    if (!el) return;
    const onFocus = () => {
      el.style.borderColor = "var(--brand-lime)";
      el.style.boxShadow = "0 0 0 3px rgba(201,244,20,0.12)";
      el.style.background = "var(--bg-2)";
    };
    const onBlur = () => {
      el.style.borderColor = error ? "rgba(239,68,68,0.55)" : "var(--border-hairline-strong)";
      el.style.boxShadow = "none";
      el.style.background = "var(--bg-1)";
    };
    el.addEventListener("focus", onFocus);
    el.addEventListener("blur", onBlur);
    return () => { el.removeEventListener("focus", onFocus); el.removeEventListener("blur", onBlur); };
  }, [error]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
      <label style={{
        font: "400 10px/1 var(--font-mono)", letterSpacing: 1.3,
        color: "var(--fg-3)", textTransform: "uppercase",
      }}>{label}</label>
      {children}
      {error && (
        <span style={{
          font: "400 11px/1.4 var(--font-mono)",
          color: "#FCA5A5", letterSpacing: 0.3,
        }}>! {error}</span>
      )}
      {warn && !error && (
        <span style={{
          font: "400 11px/1.4 var(--font-mono)",
          color: "#EAB408", letterSpacing: 0.3,
        }}>~ {warn}</span>
      )}
    </div>
  );
}

function CMCheck({ checked, onChange, children, error, required }) {
  return (
    <label style={{
      display: "flex", gap: 10, alignItems: "flex-start",
      padding: "8px 0", cursor: "pointer",
      userSelect: "none",
    }}>
      <span
        onClick={(e) => { e.preventDefault(); onChange(!checked); }}
        style={{
          flexShrink: 0,
          width: 18, height: 18, borderRadius: 4,
          marginTop: 1,
          border: `1px solid ${error ? "rgba(239,68,68,0.6)" : (checked ? "var(--brand-lime)" : "var(--border-hairline-strong)")}`,
          background: checked ? "var(--brand-lime)" : "var(--bg-1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 160ms var(--ease-out)",
          boxShadow: checked ? "0 0 0 3px rgba(201,244,20,0.12)" : "none",
        }}
      >
        {checked && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        )}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{
          font: "400 13px/1.45 var(--font-body)",
          color: error ? "#FCA5A5" : "var(--fg-2)",
        }}>
          {children}
          {required && <span style={{ color: "var(--brand-lime)", marginLeft: 4 }}>*</span>}
        </span>
        {error && (
          <span style={{ font: "400 11px/1.4 var(--font-mono)", color: "#FCA5A5" }}>! {error}</span>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      />
    </label>
  );
}

function PlanCard({ plan, active, onClick, compact = false }) {
  const hl = plan.hl;
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-reset"
      style={{
        position: "relative",
        display: "block", width: "100%", textAlign: "left",
        padding: compact ? "12px 14px" : "14px 16px",
        borderRadius: 12,
        background: active ? "rgba(201,244,20,0.07)" : "var(--bg-1)",
        border: `1px solid ${active ? "var(--brand-lime)" : "var(--border-hairline-strong)"}`,
        cursor: "pointer",
        transition: "all 160ms var(--ease-out)",
        boxShadow: active ? "0 0 0 3px rgba(201,244,20,0.10)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{
          flexShrink: 0,
          marginTop: 3,
          width: 16, height: 16, borderRadius: 999,
          border: `1.5px solid ${active ? "var(--brand-lime)" : "var(--fg-5)"}`,
          background: active ? "var(--brand-lime)" : "transparent",
          boxShadow: active ? "0 0 8px rgba(201,244,20,0.55)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {active && <span style={{ width: 6, height: 6, borderRadius: 999, background: "#000" }} />}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <span style={{
                font: "700 15px/1.2 var(--font-display)",
                color: "#fff", letterSpacing: -0.3,
              }}>{plan.n}</span>
              {hl && (
                <span style={{
                  padding: "2px 6px", borderRadius: 4,
                  background: "rgba(201,244,20,0.15)",
                  font: "700 9px/1 var(--font-mono)", color: "var(--brand-lime)",
                  letterSpacing: 1, textTransform: "uppercase",
                }}>POPULAR</span>
              )}
            </div>
            {plan.p && (
              <span style={{
                font: "700 14px/1 var(--font-mono)",
                color: active ? "var(--brand-lime)" : "var(--fg-2)",
                letterSpacing: -0.2,
              }}>
                {plan.p}<span style={{ color: "var(--fg-5)", fontWeight: 400, fontSize: 11 }}>{plan.per}</span>
              </span>
            )}
          </div>
          {plan.sub && (
            <div style={{
              marginTop: 4,
              font: "400 12px/1.45 var(--font-body)",
              color: "var(--fg-3)",
            }}>{plan.sub}</div>
          )}
          {plan.pts && plan.pts.length > 0 && (
            <ul style={{
              margin: "10px 0 0", padding: 0, listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "6px 14px",
            }}>
              {plan.pts.filter((pt) => typeof pt === "string").map((pt) => (
                <li key={pt} style={{
                  display: "flex", gap: 8, alignItems: "flex-start",
                  font: "400 12px/1.4 var(--font-body)", color: "var(--fg-2)",
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke={active ? "var(--brand-lime)" : "var(--fg-4)"}
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginTop: 4, flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </button>
  );
}

function PlanChip({ label, meta, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-reset"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "9px 12px", borderRadius: 10,
        background: active ? "rgba(201,244,20,0.12)" : "var(--bg-1)",
        border: `1px solid ${active ? "var(--brand-lime)" : "var(--border-hairline-strong)"}`,
        color: active ? "#fff" : "var(--fg-2)",
        cursor: "pointer",
        font: "600 13px/1 var(--font-body)",
        transition: "all 160ms var(--ease-out)",
        boxShadow: active ? "0 0 0 3px rgba(201,244,20,0.10)" : "none",
      }}
    >
      <span style={{
        width: 10, height: 10, borderRadius: 999,
        border: `1.5px solid ${active ? "var(--brand-lime)" : "var(--fg-5)"}`,
        background: active ? "var(--brand-lime)" : "transparent",
        boxShadow: active ? "0 0 6px rgba(201,244,20,0.6)" : "none",
        flexShrink: 0,
      }} />
      <span>{label}</span>
      {meta && (
        <span style={{
          font: "400 11px/1 var(--font-mono)",
          color: active ? "var(--brand-lime)" : "var(--fg-5)",
          letterSpacing: 0.4,
        }}>· {meta}</span>
      )}
    </button>
  );
}

function CMRow({ k, children }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{
        font: "400 10px/1.6 var(--font-mono)", letterSpacing: 1.2,
        color: "var(--fg-5)", textTransform: "uppercase",
      }}>{k}</span>
      <span style={{
        font: "500 12px/1.6 var(--font-mono)",
        color: "#fff",
        textAlign: "right",
        wordBreak: "break-word",
      }}>{children}</span>
    </div>
  );
}

Object.assign(window, { ContactModal });
