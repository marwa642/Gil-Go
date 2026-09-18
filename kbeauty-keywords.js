// Gil & Go — K-Beauty belt keywords
// Load after hallyu-keywords.js.
// Replaces the place + experience rows of the K-Beauty belt.
// Any event rows (festivals etc.) are kept as they are.

(function () {

  // Junk words shared by most beauty rows
  const TRADE = ["도매", "재료상", "제조", "공장", "물류", "본사", "사무실", "학원", "아카데미", "자격증"];

  const ROWS = [
    // ---- Services ----
    { label: "Nail Salons", glyph: "💅", color: "var(--cinnabar)", group: "place",
      keywords: ["네일샵", "네일아트", "젤네일"],
      allow: ["네일", "미용"], block: TRADE },

    { label: "Lash & Brow Studios", glyph: "👁️", color: "var(--gold)", group: "place",
      keywords: ["속눈썹연장", "속눈썹펌", "눈썹문신", "반영구화장"],
      allow: [], block: TRADE },

    { label: "Personal Color Studios", glyph: "🎨", color: "var(--jade)", group: "experience",
      keywords: ["퍼스널컬러진단", "퍼스널컬러", "컬러컨설팅"],
      allow: [], block: TRADE.concat(["강사", "지도사"]) },

    { label: "Hair Salons", glyph: "💇", color: "var(--indigo)", group: "place",
      keywords: ["미용실", "헤어샵", "헤어살롱", "염색전문"],
      allow: ["미용", "헤어"], block: TRADE.concat(["가발", "이발"]) },

    { label: "Skin Care & Esthetic", glyph: "✨", color: "var(--jade)", group: "place",
      keywords: ["피부관리실", "에스테틱", "왁싱샵"],
      allow: [], block: TRADE },

    { label: "Skin Clinics", glyph: "🏥", color: "var(--cinnabar)", group: "place",
      keywords: ["피부과", "피부과의원"],
      allow: ["병원", "의원", "피부"], block: ["약국", "동물"] },

    { label: "Korean Spa (Jjimjilbang)", glyph: "♨️", color: "var(--gold)", group: "place",
      keywords: ["찜질방", "사우나"],
      allow: ["찜질", "목욕", "사우나"], block: ["마사지"] },

    // ---- Brand flagship stores ----
    { label: "Skincare Flagships", glyph: "🧴", color: "var(--jade)", group: "place",
      keywords: ["설화수", "이니스프리", "라네즈", "메디큐브", "편강율",
                 "스킨천사", "믹순", "스타일난다"],
      allow: [], block: TRADE },

    { label: "Hair & Scalp Flagships", glyph: "🧖", color: "var(--indigo)", group: "place",
      keywords: ["닥터포헤어", "아로마티카", "라도르", "차홍아르더", "마르디메크르디"],
      allow: [], block: TRADE },

    { label: "Fragrance & Body Flagships", glyph: "🕯️", color: "var(--gold)", group: "place",
      keywords: ["탬버린즈", "논픽션", "그랑핸드", "헉슬리", "본투스탠드아웃"],
      allow: [], block: TRADE },

    { label: "Local Beauty Shops", glyph: "🧺", color: "var(--jade)", group: "place",
      keywords: ["화장품판매점", "화장품매장", "드럭스토어", "뷰티편집샵"],
      allow: ["화장품", "뷰티", "잡화"], block: TRADE.concat(["방문판매", "대리점모집"]) },

    { label: "Underground Shopping Arcades", glyph: "🚇", color: "var(--gold)", group: "place",
      keywords: ["지하상가", "지하도상가"],
      allow: ["상가", "쇼핑", "시장"], block: TRADE.concat(["주차장", "관리사무소"]) },

    { label: "Beauty Stores & Counters", glyph: "🛍️", color: "var(--cinnabar)", group: "place",
      keywords: ["올리브영", "시코르", "아리따움", "신세계백화점", "롯데백화점"],
      allow: [], block: TRADE.concat(["주차장"]) }
  ];

  ROWS.forEach(r => { r._gg = true; });

  // The belt's key differs between builds — find whichever one holds K-Beauty
  let KEY = null;
  for (const k in THEME_SEARCH_KEYWORDS) {
    if (/beauty|kbeauty|skin/i.test(k)) { KEY = k; break; }
  }
  if (!KEY) {
    console.warn("[kbeauty-keywords] could not find the K-Beauty belt key; keys are:",
                 Object.keys(THEME_SEARCH_KEYWORDS));
    return;
  }

  const oldRows = THEME_SEARCH_KEYWORDS[KEY] || [];
  const eventRows = oldRows.filter(r => r.source || (r.group !== "place" && r.group !== "experience"));
  THEME_SEARCH_KEYWORDS[KEY] = ROWS.concat(eventRows);

  const byLabel = {};
  ROWS.forEach(r => { byLabel[r.label] = r; });

  function checkRow(place, row) {
    const path = place.category_name || "";
    const name = place.place_name || "";
    if (row.allow.length && !row.allow.some(t => path.includes(t))) return false;
    if (row.block.some(t => path.includes(t) || name.includes(t))) return false;
    return true;
  }

  const origGuard = window.passesCategoryGuard;
  window.passesCategoryGuard = function (...args) {
    const place = args.find(a => a && typeof a === "object" && ("category_name" in a || "place_name" in a));
    let row = args.find(a => a && typeof a === "object" && a._gg && byLabel[a.label]);
    if (!row) {
      const s = args.find(a => typeof a === "string" && byLabel[a]);
      if (s) row = byLabel[s];
    }
    if (place && row) return checkRow(place, row);
    return origGuard ? origGuard.apply(this, args) : true;
  };

  if (typeof currentTheme !== "undefined" && currentTheme === KEY && typeof renderLegend === "function") {
    renderLegend(KEY);
  }

  console.log("[kbeauty-keywords] loaded into '" + KEY + "':", ROWS.length, "rows +", eventRows.length, "event rows");
})();
