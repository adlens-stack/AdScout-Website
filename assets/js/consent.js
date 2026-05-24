(function () {
  function gtag() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  var STORAGE_KEY = 'as_consent_v2';

  function updateConsent(prefs) {
    gtag('consent', 'update', {
      ad_storage:              prefs.marketing  ? 'granted' : 'denied',
      analytics_storage:       prefs.analytics  ? 'granted' : 'denied',
      ad_user_data:            prefs.marketing  ? 'granted' : 'denied',
      ad_personalization:      prefs.marketing  ? 'granted' : 'denied',
      functionality_storage:   prefs.functional ? 'granted' : 'denied',
      personalization_storage: prefs.functional ? 'granted' : 'denied'
    });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch(e) {}
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'consent_update', consent_prefs: prefs });
    hide();
  }

  function hide() {
    var el = document.getElementById('as-consent');
    if (el) { el.style.transform = 'translateY(100%)'; el.style.opacity = '0'; }
  }

  function show() {
    var el = document.getElementById('as-consent');
    if (el) { el.style.transform = 'translateY(0)'; el.style.opacity = '1'; }
  }

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      var p = JSON.parse(saved);
      gtag('consent', 'update', {
        ad_storage:              p.marketing  ? 'granted' : 'denied',
        analytics_storage:       p.analytics  ? 'granted' : 'denied',
        ad_user_data:            p.marketing  ? 'granted' : 'denied',
        ad_personalization:      p.marketing  ? 'granted' : 'denied',
        functionality_storage:   p.functional ? 'granted' : 'denied',
        personalization_storage: p.functional ? 'granted' : 'denied'
      });
      return;
    }
  } catch(e) {}

  var style = document.createElement('style');
  style.textContent = `
    #as-consent { position:fixed; bottom:0; left:0; right:0; z-index:99999; background:rgba(6,11,22,0.96); border-top:1px solid rgba(99,157,255,0.15); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); box-shadow:0 -8px 40px rgba(0,0,0,0.5); transform:translateY(100%); opacity:0; transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease; font-family:'Inter','DM Sans',system-ui,-apple-system,sans-serif; }
    #as-consent-inner { max-width:1200px; margin:0 auto; padding:20px 28px; display:flex; align-items:flex-start; gap:28px; flex-wrap:wrap; }
    #as-consent-text { flex:1; min-width:260px; }
    #as-consent-title { font-size:14px; font-weight:600; color:#f0f4ff; margin:0 0 5px; letter-spacing:-0.01em; }
    #as-consent-desc { font-size:13px; color:#7a8faa; margin:0 0 14px; line-height:1.5; }
    #as-consent-desc a { color:#5b9dff; text-decoration:none; border-bottom:1px solid rgba(91,157,255,0.3); }
    .as-toggles { display:flex; flex-wrap:wrap; gap:6px 16px; }
    .as-toggle { display:flex; align-items:center; gap:7px; font-size:12.5px; color:#7a8faa; cursor:pointer; user-select:none; }
    .as-toggle input[type=checkbox] { appearance:none; -webkit-appearance:none; width:14px; height:14px; border:1.5px solid rgba(99,157,255,0.35); border-radius:3px; background:transparent; cursor:pointer; position:relative; flex-shrink:0; }
    .as-toggle input[type=checkbox]:checked { background:#3b82f6; border-color:#3b82f6; }
    .as-toggle input[type=checkbox]:checked::after { content:''; position:absolute; left:3px; top:1px; width:5px; height:8px; border:1.5px solid #fff; border-top:none; border-left:none; transform:rotate(45deg); }
    .as-toggle input[type=checkbox]:disabled { opacity:0.5; cursor:not-allowed; }
    #as-consent-actions { display:flex; flex-direction:column; gap:7px; flex-shrink:0; min-width:148px; }
    .as-btn { padding:10px 20px; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; border:none; transition:all 0.15s ease; letter-spacing:-0.01em; font-family:inherit; text-align:center; white-space:nowrap; }
    .as-btn-primary { background:linear-gradient(135deg,#2563eb,#3b82f6); color:#fff; box-shadow:0 1px 12px rgba(59,130,246,0.25); }
    .as-btn-primary:hover { background:linear-gradient(135deg,#1d4ed8,#2563eb); }
    .as-btn-secondary { background:rgba(255,255,255,0.05); border:1px solid rgba(99,157,255,0.18); color:#c8d5e8; }
    .as-btn-secondary:hover { background:rgba(255,255,255,0.08); }
    #as-btn-reject { background:none; border:none; color:#4a5c72; font-size:12px; cursor:pointer; text-decoration:underline; text-underline-offset:2px; font-family:inherit; text-align:center; padding:2px 0; transition:color 0.15s; }
    #as-btn-reject:hover { color:#6b7f96; }
  `;
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'as-consent';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie preferences');
  banner.innerHTML = `<div id="as-consent-inner"><div id="as-consent-text"><p id="as-consent-title">We use cookies</p><p id="as-consent-desc">We use cookies to run essential features, measure performance, and deliver relevant advertising. See our <a href="/privacy-policy.html">Privacy Policy</a> and <a href="/cookie-policy.html">Cookie Policy</a>.</p><div class="as-toggles"><label class="as-toggle"><input type="checkbox" id="as-t-necessary" checked disabled><span>Necessary</span></label><label class="as-toggle"><input type="checkbox" id="as-t-functional"><span>Functional</span></label><label class="as-toggle"><input type="checkbox" id="as-t-analytics"><span>Analytics</span></label><label class="as-toggle"><input type="checkbox" id="as-t-marketing"><span>Marketing</span></label></div></div><div id="as-consent-actions"><button class="as-btn as-btn-primary" id="as-btn-accept">Accept all</button><button class="as-btn as-btn-secondary" id="as-btn-save">Save preferences</button><button id="as-btn-reject">Reject non-essential</button></div></div>`;
  document.body.appendChild(banner);

  setTimeout(show, 650);

  document.getElementById('as-btn-accept').addEventListener('click', function () {
    document.getElementById('as-t-analytics').checked = true;
    document.getElementById('as-t-marketing').checked = true;
    document.getElementById('as-t-functional').checked = true;
    updateConsent({ analytics: true, marketing: true, functional: true });
  });
  document.getElementById('as-btn-save').addEventListener('click', function () {
    updateConsent({ analytics: document.getElementById('as-t-analytics').checked, marketing: document.getElementById('as-t-marketing').checked, functional: document.getElementById('as-t-functional').checked });
  });
  document.getElementById('as-btn-reject').addEventListener('click', function () {
    updateConsent({ analytics: false, marketing: false, functional: false });
  });
})();
