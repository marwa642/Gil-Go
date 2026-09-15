// Gil & Go — i18n engine. Load AFTER translations.js.
// Requires: <script src="translations.js"></script> then <script src="i18n.js"></script>

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "简体中文" },
  { code: "ja", name: "日本語" },
  { code: "ru", name: "Русский" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "th", name: "ไทย" }
];

let currentLang = "en";

// --- Pick a language ---------------------------------------------------
function detectLanguage() {
  const saved = localStorage.getItem("gilgo_lang");
  if (saved && TRANSLATIONS[saved]) return saved;

  const browser = (navigator.languages || [navigator.language || "en"]);
  for (const tag of browser) {
    const base = tag.toLowerCase().split("-")[0];
    if (TRANSLATIONS[base]) return base;
  }
  return "en";
}

// --- Look up a string --------------------------------------------------
// Falls back to English, then to the key itself, so a missing string
// never renders as blank.
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

  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    el.title = t(el.getAttribute("data-i18n-title"));
  });

  document.documentElement.lang = currentLang;
  document.documentElement.setAttribute("data-lang", currentLang);
}

// --- Switch ------------------------------------------------------------
function setLanguage(code) {
  if (!TRANSLATIONS[code]) return;
  currentLang = code;
  localStorage.setItem("gilgo_lang", code);
  applyTranslations();

  const picker = document.getElementById("langPicker");
  if (picker) picker.value = code;

  // Anything built in JS (map markers, result cards, chat) listens here
  // and re-renders itself using t().
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: code } }));
}

// --- Build the switcher ------------------------------------------------
function buildLanguagePicker() {
  const picker = document.getElementById("langPicker");
  if (!picker) return;

  picker.innerHTML = "";
  LANGUAGES.forEach(lang => {
    const opt = document.createElement("option");
    opt.value = lang.code;
    opt.textContent = lang.name;
    picker.appendChild(opt);
  });

  picker.value = currentLang;
  picker.addEventListener("change", e => setLanguage(e.target.value));
}

// --- Start -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  currentLang = detectLanguage();
  buildLanguagePicker();
  applyTranslations();
});
