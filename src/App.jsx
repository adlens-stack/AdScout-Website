// Global contact-form context — any component can call openContact(plan?) to open the modal
const ContactCtx = React.createContext({ openContact: () => {} });
window.ContactCtx = ContactCtx;
function useContact() { return React.useContext(ContactCtx); }
window.useContact = useContact;

function App() {
  const [lang, setLangState] = React.useState(TWEAK_DEFAULTS.lang || "EN");
  const [heroVariant, setHeroVariantState] = React.useState(TWEAK_DEFAULTS.heroVariant || "CATEGORY");
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

  // Contact-modal state
  const [contactOpen, setContactOpen] = React.useState(false);
  const [contactPlan, setContactPlan] = React.useState(null);
  const [contactType, setContactType] = React.useState("demo");
  const openContact = React.useCallback((plan = null, type = "demo") => {
    setContactPlan(plan);
    setContactType(type);
    setContactOpen(true);
  }, []);
  const closeContact = React.useCallback(() => setContactOpen(false), []);

  // Persist tweaks to host
  const setLang = (l) => {
    setLangState(l);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { lang: l } }, "*");
  };
  const setHeroVariant = (v) => {
    setHeroVariantState(v);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { heroVariant: v } }, "*");
  };

  // Register edit-mode listener BEFORE announcing availability
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode")   setTweaksVisible(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <ContactCtx.Provider value={{ openContact }}>
      <TopNav lang={lang} setLang={setLang} />
      <Hero lang={lang} heroVariant={heroVariant} />
      <TrustRow lang={lang} />
      <Questions lang={lang} />
      <DashboardSection lang={lang} />
      <CreativeWall lang={lang} />
      <HowItWorks lang={lang} />
      <Pricing lang={lang} />
      <CTA lang={lang} />
      <Footer lang={lang} />
      <TweakPanel
        lang={lang} setLang={setLang}
        heroVariant={heroVariant} setHeroVariant={setHeroVariant}
        visible={tweaksVisible}
      />
      <ContactModal lang={lang} open={contactOpen} plan={contactPlan} formType={contactType} onClose={closeContact} />
    </ContactCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
