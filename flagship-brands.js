// Gil & Go — K-Beauty "Other Flagship Stores" brand list
// Load after strict-guard.js, before keep-location.js
(function () {
  const LABEL = "Other Flagship Stores";

  const BRANDS = [
    ["이니스프리",     ["이니스프리", "innisfree"]],
    ["에뛰드",         ["에뛰드", "etude"]],
    ["더페이스샵",     ["더페이스샵", "페이스샵", "face shop"]],
    ["네이처리퍼블릭", ["네이처리퍼블릭", "nature republic"]],
    ["미샤",           ["미샤", "missha"]],
    ["토니모리",       ["토니모리", "tonymoly"]],
    ["아리따움",       ["아리따움", "aritaum"]],
    ["시코르",         ["시코르", "chicor"]],
    ["스킨푸드",       ["스킨푸드", "skinfood"]],
    ["홀리카홀리카",   ["홀리카", "holika"]],
    ["바닐라코",       ["바닐라코", "banila"]],
    ["클리오",         ["클리오", "clio"]],
    ["쓰리씨이",       ["쓰리씨이", "3ce"]],
    ["정샘물",         ["정샘물", "jungsaemmool"]],
    ["설화수",         ["설화수", "sulwhasoo"]],
    ["라네즈",         ["라네즈", "laneige"]],
    ["헤메코",         ["헤메코", "hemeko"]]
  ];
  const NAMES = [].concat(...BRANDS.map(b => b[1])).map(s => s.toLowerCase());
  const BLOCK = ["물류", "본사", "사무실", "도매", "공장", "센터", "주차"];

  let key = null;
  for (const k in THEME_SEARCH_KEYWORDS) {
    if (/beauty|skin/i.test(k)) { key = k; break; }
  }
  const row = key && (THEME_SEARCH_KEYWORDS[key] || []).find(r => r.label === LABEL);
  if (!row) { console.warn("[flagship-brands] row not found:", LABEL); return; }

  row.keywords = BRANDS.map(b => b[0]);
  if (Array.isArray(row.allow)) row.allow = [];

  const origGuard = window.passesCategoryGuard;
  window.passesCategoryGuard = function (...args) {
    const r = args.find(a => a && typeof a === "object" && a.label === LABEL);
    const place = args.find(a => a && typeof a === "object" && ("kakaoCategory" in a || "place_name" in a || "category_name" in a));
    if (r && place) {
      const name = String(place.place_name || place.name || "").toLowerCase();
      if (!NAMES.some(n => name.includes(n))) return false;
      if (BLOCK.some(b => name.includes(b))) return false;
      return true;
    }
    return origGuard ? origGuard.apply(this, args) : true;
  };

  console.log("[flagship-brands] loaded:", BRANDS.length, "brands");
})();
