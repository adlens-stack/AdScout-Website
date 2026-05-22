/* AdScout site — shared constants, copy, and i18n */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "EN",
  "heroVariant": "CATEGORY",
  "dashboardTab": "OVERVIEW"
}/*EDITMODE-END*/;

const LANGS = ["EN", "SK"];

// Hero variants — for Tweak panel
const HERO_VARIANTS = {
  CATEGORY: {
    EN: {
      eyebrow: "USED BY MARKETING LEADERS",
      h1: "The competitive intelligence layer for marketing leaders.",
      sub: "AdScout turns raw Meta & Google ad data into a strategic intelligence dashboard — so your next media budget decision is driven by evidence, not instinct.",
    },
    SK: {
      eyebrow: "POUŽÍVAJÚ MARKETINGOVÍ LÍDRI V SK & CZ",
      h1: "Vrstva competitive intelligence pre marketingových lídrov.",
      sub: "AdScout premení surové dáta z Meta a Google na strategický intelligence dashboard — aby vaše ďalšie rozhodnutie o budgete stálo na dôkazoch, nie na pocitoch.",
    },
  },
  BENCHMARK: {
    EN: {
      eyebrow: "STRATEGIC INTELLIGENCE FOR CMOs · SK · CZ",
      h1: "Know where the category spends — and where you stand.",
      sub: "Benchmark your share of voice against five hand-picked competitors. Track their monthly spend across Meta & Google, understand their strategy, and move first.",
    },
    SK: {
      eyebrow: "STRATEGICKÁ INTELIGENCIA PRE CMO · SK · CZ",
      h1: "Vedzte, kde kategória investuje — a kde stojíte vy.",
      sub: "Benchmarkujte svoj share of voice voči piatim kľúčovým konkurentom. Sledujte ich mesačný spend naprieč Meta a Google — a rozhodujte skôr než oni.",
    },
  },
  EVIDENCE: {
    EN: {
      eyebrow: "DATA-LED MEDIA INVESTMENT · SK · CZ",
      h1: "Run your media budget on evidence, not instinct.",
      sub: "AdScout gives senior marketing teams a live view of competitor spend, channel mix, and seasonality — consolidated into one decision-grade dashboard.",
    },
    SK: {
      eyebrow: "DÁTAMI PODLOŽENÉ MEDIA INVESTÍCIE · SK · CZ",
      h1: "Riaďte media budget dôkazmi, nie inštinktom.",
      sub: "AdScout poskytuje seniornym marketingovým tímom živý pohľad na spendy konkurencie, channel mix a sezonalitu — v jednom rozhodovacom dashboarde.",
    },
  },
};

// Trusted-by — realistic CEE wordmarks (placeholder brand names)
const CLIENT_LOGOS = [
  { name: "Finax",            style: "image", src: (typeof window !== "undefined" && window.__resources && window.__resources.finaxLogo) || "assets/finax_logo_white.png", height: 28 },
  { name: "Think Big Collective", style: "image", src: (typeof window !== "undefined" && window.__resources && window.__resources.thinkBigLogo) || "assets/think_big_logo.svg", height: 32 },
  { name: "VELETEX",    style: "display" },
  { name: "HYPERMART",  style: "mono" },
  { name: "aurora",     style: "lower-light" },
  { name: "ORBIS/CZ",   style: "mono" },
  { name: "METRA•A",    style: "display" },
  { name: "lumen",      style: "lower-light" },
];

// Questions we answer (C-level, picked by user)
const MGMT_QUESTIONS = {
  EN: [
    { q: "Are we over- or under-spending versus our category?",        meta: "BENCHMARK" },
    { q: "When is the seasonal window we are missing?",                meta: "SEASONALITY" },
    { q: "Is our competition brand-led or performance-led?",           meta: "OBJECTIVE MIX" },
    { q: "How has our share of voice moved in the last 90 days?",      meta: "SHARE OF VOICE" },
    { q: "How is our rival splitting Meta vs. Google?",                meta: "CHANNEL SPLIT" },
    { q: "What three moves should we make this quarter?",              meta: "EXECUTIVE SUMMARY" },
  ],
  SK: [
    { q: "Investujeme nad alebo pod úrovňou našej kategórie?",         meta: "BENCHMARK" },
    { q: "Ktoré sezónne okno nám momentálne uniká?",                    meta: "SEZONALITA" },
    { q: "Je naša konkurencia brand-led alebo performance-led?",       meta: "OBJECTIVE MIX" },
    { q: "Ako sa pohol náš share of voice za posledných 90 dní?",      meta: "SHARE OF VOICE" },
    { q: "Ako si rival rozdeľuje Meta vs. Google?",                    meta: "CHANNEL SPLIT" },
    { q: "Aké tri kroky máme spraviť tento kvartál?",                   meta: "EXECUTIVE SUMMARY" },
  ],
};

// i18n — UI strings
const T = {
  EN: {
    nav: { solutions: "Solutions", dashboard: "Dashboard", creative: "Creative Wall", pricing: "Pricing", login: "Log in" },
    cta: { demo: "Book a demo", quote: "Get a quote", sample: "See a sample report", explore: "Explore the dashboard", getStarted: "Get started" },
    proof: [
      { v: "€42M+", k: "AD SPEND ANALYSED" },
      { v: "250+", k: "BRANDS TRACKED" },
      { v: "", k: "" },
    ],
    trusted: "TRUSTED BY MARKETING TEAMS AT",
    questions: {
      label: "QUESTIONS WE ANSWER",
      title: "The questions a CMO actually asks on Monday morning",
      sub: "AdScout is built around the six decisions senior marketing teams return to every quarter. Answered with data from Meta and Google, not hunches.",
    },
    dashboard: {
      label: "COMPETITIVE INTELLIGENCE DASHBOARD",
      title: "One dashboard. Every competitive move",
      sub: "Pick five competitors. We surface their monthly spend, channel split, share of voice, and strategic posture.",
    },
    creative: {
      label: "CREATIVE WALL",
      title: "See not just what rivals run — but what they invest in, repeat, and scale",
      sub: "The AI creative intelligence layer. Every competitor creative, grouped into campaigns by AI, scored by spend, duration, and longevity.",
    },
    howItWorks: {
      label: "HOW IT WORKS",
      title: "Three steps from blind spot to board-ready insight",
      sub: "Setup takes under thirty minutes. Intelligence runs continuously from day one.",
    },
    features: {
      label: "CAPABILITIES",
      title: "Strategic intelligence, not analytics for analytics' sake.",
      sub: "Built for the decisions that determine next year's budget — not for dashboards that sit unopened.",
    },
    pricing: {
      label: "PRICING",
      title: "Transparent plans. No surprises on the invoice.",
      sub: "Every plan includes both Slovak and Czech market data, updated weekly, with unlimited seats inside your organisation.",
    },
    finalCta: {
      title: "Decide on evidence,\nnot on instinct.",
      sub: "A thirty-minute demo with real category data — yours, if you qualify.",
    },
  },
  SK: {
    nav: { solutions: "Riešenia", dashboard: "Dashboard", creative: "Creative Wall", pricing: "Cenník", login: "Prihlásiť sa" },
    cta: { demo: "Rezervovať demo", quote: "Získať cenovú ponuku", sample: "Ukážkový report", explore: "Preskúmať dashboard", getStarted: "Začať" },
    proof: [
      { v: "€42M+", k: "ANALYZOVANÝ AD SPEND" },
      { v: "1,240", k: "SLEDOVANÝCH ZNAČIEK" },
      { v: "SK · CZ", k: "POKRYTÉ TRHY" },
    ],
    trusted: "DÔVERUJÚ MARKETINGOVÉ TÍMY",
    questions: {
      label: "NA ČO ODPOVEDÁME",
      title: "Otázky, ktoré si CMO kladie v pondelok ráno.",
      sub: "AdScout je postavený okolo šiestich rozhodnutí, ku ktorým sa seniorní marketéri vracajú každý kvartál — zodpovedané dátami z Meta a Google.",
    },
    dashboard: {
      label: "COMPETITIVE INTELLIGENCE DASHBOARD",
      title: "Jeden dashboard. Každý krok konkurencie.",
      sub: "Vyberte si 5 konkurentov. My odkryjeme ich mesačný spend, channel split, share of voice a stratégiu — pre SK aj CZ.",
    },
    creative: {
      label: "CREATIVE WALL",
      title: "Nielen čo rivali spúšťajú — ale do čoho investujú, čo opakujú a čo škálujú.",
      sub: "AI vrstva creative intelligence. Každý kreatív konkurencie, zoskupený AI do kampaní, ohodnotený podľa spendu, trvania a dlhovekosti.",
    },
    howItWorks: {
      label: "AKO TO FUNGUJE",
      title: "Tri kroky od slepej zóny k insightu pre predstavenstvo.",
      sub: "Nastavenie trvá menej než tridsať minút. Inteligencia beží nepretržite od prvého dňa.",
    },
    features: {
      label: "SCHOPNOSTI",
      title: "Strategická inteligencia — nie analytika kvôli analytike.",
      sub: "Postavené pre rozhodnutia, ktoré určujú budúcoročný budget — nie pre dashboardy, čo nikto neotvára.",
    },
    pricing: {
      label: "CENNÍK",
      title: "Transparentné plány. Žiadne prekvapenia na faktúre.",
      sub: "Každý plán obsahuje dáta pre slovenský aj český trh, aktualizované týždenne, s neobmedzeným počtom používateľov vo firme.",
    },
    finalCta: {
      title: "Rozhodujte sa dôkazmi,\nnie inštinktom.",
      sub: "Tridsaťminútové demo s dátami vašej kategórie — ak spĺňate podmienky.",
    },
  },
};

// Competitors used in charts
const COMPETITORS = [
  { id: "c1", name: "Terno",       color: "var(--brand-lime)",     sov: 23.5, yoy: "+18.2%" },
  { id: "c2", name: "JYSK",        color: "var(--data-orange)",    sov: 12.6, yoy: "+6.1%"  },
  { id: "c3", name: "Dr.Max",      color: "var(--data-purple)",    sov:  9.9, yoy: "+12.7%" },
  { id: "c4", name: "McDonald's",  color: "var(--data-pink)",      sov:  9.3, yoy: "−4.3%"  },
  { id: "c5", name: "COOP",        color: "var(--data-blue-soft)", sov:  8.1, yoy: "+2.4%"  },
  { id: "c6", name: "Others",      color: "var(--bg-6)",           sov: 36.6, yoy: ""       },
];

// Plans — single source of truth, used by Pricing section AND quote-form plan picker
// pts items: string = feature row with checkmark; {h:"..."} = section heading (no checkmark)
const PLANS = {
  EN: [
    {
      label: "FOR SMES",
      n: "Starter", p: "Get a Quote", per: "",
      sub: "For smaller teams running their first benchmark.",
      pts: [
        { h: "ADSCOUT DASHBOARD" },
        "3 competitors",
        "1 market (SK or CZ)",
        "Estimated spend",
        "Platform split",
        "Objective mix",
        "Monthly trends",
        "Age / gender targeting (Meta only)",
        "6 months historical",
        { h: "CREATIVE WALL" },
        "Not included",
        { h: "SUPPORT" },
        "Email support",
      ],
      cta: "Book a demo", hl: false,
    },
    {
      label: "FOR MID-SIZED BRANDS",
      n: "Pro", p: "Get a Quote", per: "",
      sub: "The standard for brands with active media planning.",
      pts: [
        "Everything in Starter, plus:",
        { h: "ADSCOUT DASHBOARD" },
        "5 competitors",
        "Full 12-month history",
        "Monthly refresh + daily add-on",
        "Weekly SoV tracking",
        "AI insights",
        "CMO Monday Morning Dashboard",
        { h: "CREATIVE WALL" },
        "Full library Meta + Google",
        "Funnel phase breakdown",
        "Creative lifespan",
        { h: "SUPPORT" },
        "Priority email + chat",
      ],
      cta: "Book a demo", hl: true,
    },
    {
      label: "FOR TOP 50 BRANDS",
      n: "Enterprise", p: "Custom", per: "",
      sub: "For holdings, agencies, and multi-brand portfolios.",
      pts: [
        "Everything in Pro, plus:",
        { h: "ADSCOUT DASHBOARD" },
        "7+ competitors (custom)",
        "Multiple markets",
        { h: "CREATIVE WALL" },
        "All Pro features",
        "Campaign clustering (multi-LLM)",
        "Hook pattern detection (3 sec)",
        "Production tier: UGC / mid-prod / hero",
        "Drop-off detection (7–10 days)",
        "Re-run vs. fresh creative signal",
        { h: "SUPPORT" },
        "Dedicated account manager",
        "Onboarding + training",
        "SLA guaranteed",
      ],
      cta: "Contact sales", hl: false,
    },
  ],
  SK: [
    {
      label: "PRE SME",
      n: "Starter", p: "Získať cenovú ponuku", per: "",
      sub: "Pre menšie tímy spúšťajúce prvý benchmark.",
      pts: [
        { h: "ADSCOUT DASHBOARD" },
        "3 konkurenti",
        "1 trh (SK alebo CZ)",
        "Odhadovaný spend",
        "Rozdelenie platforiem",
        "Objektívny mix",
        "Mesačné trendy",
        "Cielenie podľa veku / pohlavia (len Meta)",
        "6 mesiacov histórie",
        { h: "CREATIVE WALL" },
        "Nie je súčasťou",
        { h: "PODPORA" },
        "Emailová podpora",
      ],
      cta: "Rezervovať demo", hl: false,
    },
    {
      label: "PRE STREDNÉ ZNAČKY",
      n: "Pro", p: "Získať cenovú ponuku", per: "",
      sub: "Štandard pre značky s aktívnym media plánovaním.",
      pts: [
        "Všetko zo Startera, navyše:",
        { h: "ADSCOUT DASHBOARD" },
        "5 konkurentov",
        "Plná 12-mesačná história",
        "Mesačná aktualizácia + denný doplnok",
        "Týždenné sledovanie SoV",
        "AI insighty",
        "CMO Pondelkový dashboard",
        { h: "CREATIVE WALL" },
        "Plná knižnica Meta + Google",
        "Rozklad funnel fáz",
        "Životnosť kreatív",
        { h: "PODPORA" },
        "Prioritný email + chat",
      ],
      cta: "Rezervovať demo", hl: true,
    },
    {
      label: "PRE TOP 50 ZNAČIEK",
      n: "Enterprise", p: "Na mieru", per: "",
      sub: "Pre holdingy, agentúry a multi-brand portfóliá.",
      pts: [
        "Všetko z Pro, navyše:",
        { h: "ADSCOUT DASHBOARD" },
        "7+ konkurentov (vlastný výber)",
        "Viaceré trhy",
        { h: "CREATIVE WALL" },
        "Všetky funkcie Pro",
        "Klastrovanie kampaní (multi-LLM)",
        "Detekcia hook vzorov (3 sek)",
        "Produkčná úroveň: UGC / mid-prod / hero",
        "Detekcia drop-off (7–10 dní)",
        "Signál re-run vs. nový kreatív",
        { h: "PODPORA" },
        "Dedikovaný account manager",
        "Onboarding + školenie",
        "SLA garantované",
      ],
      cta: "Kontaktovať predaj", hl: false,
    },
  ],
};

Object.assign(window, {
  TWEAK_DEFAULTS, LANGS, HERO_VARIANTS, CLIENT_LOGOS, MGMT_QUESTIONS, T, COMPETITORS, PLANS,
});
