// Gil & Go — i18n engine with first-visit language gate.
// Load AFTER translations.js.

const LANGUAGES = [
  { code: "en", name: "English",    sub: "English" },
  { code: "ko", name: "한국어",      sub: "Korean" },
  { code: "zh", name: "简体中文",     sub: "Chinese" },
  { code: "ja", name: "日本語",      sub: "Japanese" },
  { code: "ru", name: "Русский",    sub: "Russian" },
  { code: "es", name: "Español",    sub: "Spanish" },
  { code: "fr", name: "Français",   sub: "French" },
  { code: "vi", name: "Tiếng Việt", sub: "Vietnamese" },
  { code: "th", name: "ไทย",        sub: "Thai" }
];

let currentLang = "en";

// --- Look up a string --------------------------------------------------
function t(key) {
  const pack = TRANSLATIONS[currentLang] || {};
  if (pack[key]) return pack[key];
  if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
  return key;
}

// --- Paint the page ----------------------------------------------------
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });

  document.documentElement.lang = currentLang;
  document.documentElement.setAttribute("data-lang", currentLang);
}

function setLanguage(code) {
  if (!TRANSLATIONS[code]) return;
  currentLang = code;
  localStorage.setItem("gilgo_lang", code);
  applyTranslations();
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: code } }));
}

// --- The gate ----------------------------------------------------------
function buildLanguageGate() {
  if (!document.getElementById("gilgoGateStyle")) {
    const style = document.createElement("style");
    style.id = "gilgoGateStyle";
    style.textContent = `
      #gilgoGate{position:fixed;inset:0;z-index:100000;background:rgba(28,24,18,.82);
        display:flex;align-items:center;justify-content:center;padding:20px;
        -webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
      #gilgoGateBox{background:#F2E8D5;border-radius:14px;max-width:460px;width:100%;
        max-height:88vh;overflow-y:auto;padding:28px 24px;
        box-shadow:0 18px 50px rgba(0,0,0,.35);text-align:center}
      #gilgoGateBox h2{margin:0 0 4px;font-size:22px;color:#2C3E50;font-weight:700}
      #gilgoGateBox p{margin:0 0 20px;font-size:14px;color:#7a6a52}
      #gilgoGateList{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
      .gilgoLangBtn{background:#fff;border:1.5px solid #ded0b4;border-radius:10px;
        padding:13px 10px;cursor:pointer;font-family:inherit;text-align:center;
        transition:border-color .15s,transform .1s}
      .gilgoLangBtn:hover,.gilgoLangBtn:focus{border-color:#C0392B;outline:none}
      .gilgoLangBtn:active{transform:scale(.97)}
      .gilgoLangBtn strong{display:block;font-size:16px;color:#2C3E50;font-weight:600}
      .gilgoLangBtn span{display:block;font-size:11px;color:#9a8b73;margin-top:2px;
        letter-spacing:.03em}
      #gilgoLangReopen{position:fixed;right:14px;bottom:14px;z-index:9999;
        background:#F2E8D5;border:1.5px solid #ded0b4;border-radius:999px;
        padding:9px 15px;font-size:13px;font-weight:600;color:#2C3E50;
        cursor:pointer;font-family:inherit;box-shadow:0 3px 10px rgba(0,0,0,.18)}
      @media(max-width:380px){#gilgoGateList{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  const gate = document.createElement("div");
  gate.id = "gilgoGate";
  gate.innerHTML = `
    <div id="gilgoGateBox" role="dialog" aria-modal="true" aria-label="Choose your language">
      <h2>Gil &amp; Go</h2>
      <p>Choose your language / 언어를 선택하세요</p>
      <div id="gilgoGateList"></div>
    </div>`;

  const list = gate.querySelector("#gilgoGateList");
  LANGUAGES.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "gilgoLangBtn";
    btn.type = "button";
    btn.innerHTML = '<strong>' + lang.name + '</strong><span>' + lang.sub + '</span>';
    btn.addEventListener("click", () => {
      setLanguage(lang.code);
      closeGate();
    });
    list.appendChild(btn);
  });

  document.body.appendChild(gate);
  document.body.style.overflow = "hidden";
}

function closeGate() {
  const gate = document.getElementById("gilgoGate");
  if (gate) gate.remove();
  document.body.style.overflow = "";
  showReopenButton();
}

// Lets people change their mind later.
function showReopenButton() {
  if (document.getElementById("gilgoLangReopen")) return;
  const current = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  const btn = document.createElement("button");
  btn.id = "gilgoLangReopen";
  btn.type = "button";
  btn.textContent = "🌐 " + current.name;
  btn.addEventListener("click", () => {
    btn.remove();
    buildLanguageGate();
  });
  document.body.appendChild(btn);
}

// --- Start -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("gilgo_lang");

  if (saved && TRANSLATIONS[saved]) {
    // Returning visitor — no gate.
    currentLang = saved;
    applyTranslations();
    showReopenButton();
  } else {
    // First visit — must choose.
    applyTranslations();
    buildLanguageGate();
  }
});
