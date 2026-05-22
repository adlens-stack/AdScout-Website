// Tiny shared shell — language toggle + active-link state for legal subpages.
(function () {
  const KEY = "adscout_lang";

  function getLang() {
    const url = new URL(window.location.href);
    const p = url.searchParams.get("lang");
    if (p === "EN" || p === "SK") return p;
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "EN" || stored === "SK") return stored;
    } catch (e) {}
    return "EN";
  }

  function setLang(l) {
    try { localStorage.setItem(KEY, l); } catch (e) {}
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.location.href = url.toString();
  }

  window.LegalShell = {
    init: function (page) {
      const lang = getLang();
      document.documentElement.setAttribute("lang", lang.toLowerCase());
      const all = document.querySelectorAll("[data-lang]");
      all.forEach((el) => {
        el.style.display = el.getAttribute("data-lang") === lang ? "" : "none";
      });
      // Lang toggle buttons
      document.querySelectorAll("[data-set-lang]").forEach((btn) => {
        const v = btn.getAttribute("data-set-lang");
        if (v === lang) btn.classList.add("active");
        btn.addEventListener("click", () => setLang(v));
      });
      // Active nav link
      document.querySelectorAll(".legal-nav .right a[data-page]").forEach((a) => {
        if (a.getAttribute("data-page") === page) a.classList.add("active");
      });
      // Update inline lang param on internal links
      document.querySelectorAll("a[data-langlink]").forEach((a) => {
        const base = a.getAttribute("href").split("?")[0];
        a.setAttribute("href", base + "?lang=" + lang);
      });
      return lang;
    },
  };
})();
