// Gil & Go — K-Beauty belt keywords
// Load after hallyu-keywords.js. Replaces the K-Beauty store + experience rows.
// Event rows are kept as they are.

(function () {

  const TRADE = ["도매", "재료상", "제조", "공장", "물류", "본사", "사무실", "학원", "아카데미", "자격증"];

  const ROWS = [
    // ---------- Stores ----------
    { label: "Olive Young Stores", glyph: "🧴", color: "var(--jade)", group: "place",
      keywords: ["올리브영", "Olive Young"],
      allow: [], block: TRADE },

    { label: "Other Flagship Stores", glyph: "🏬", color: "var(--indigo)", group: "place",
      keywords: ["시코르", "헤메코", "오프뷰티", "비클린", "아리따움", "Chicor", "beauty store"],
      allow: [], block: TRADE },

    { label: "Other Beauty Stores", glyph: "🧺", color: "var(--gold)", group: "place",
      keywords: ["화장품판매점", "화장품매장", "뷰티편집샵", "지하상가", "cosmetics shop", "underground shopping"],
      allow: ["화장품", "뷰티", "잡화", "상가"], block: TRADE.concat(["올리브영", "시코르", "주차장", "관리사무소"]) },

    { label: "Facial Care Brands", glyph: "💧", color: "var(--jade)", group: "place",
      keywords: ["설화수", "이니스프리", "라네즈", "메디큐브", "편강율", "스킨1004", "믹순", "스타일난다",
                 "Sulwhasoo", "Innisfree", "Laneige", "SKIN1004", "Medicube", "3CE"],
      allow: [], block: TRADE },

    { label: "Hair & Scalp Care Brands", glyph: "💫", color: "var(--cinnabar)", group: "place",
      keywords: ["닥터포헤어", "아로마티카", "라도르", "차홍아르더", "마르디메크르디",
                 "Dr.FORHAIR", "AROMATICA", "Lador"],
      allow: [], block: TRADE },

    { label: "Body Care Brands", glyph: "🛁", color: "var(--gold)", group: "place",
      keywords: ["탬버린즈", "논픽션", "그랑핸드", "헉슬리", "본투스탠드아웃", "페사드",
                 "Tamburins", "Nonfiction", "Granhand", "Huxley"],
      allow: [], block: TRADE },

    // ---------- Experiences ----------
    { label: "Personal Color Analysis", glyph: "🎨", color: "var(--indigo)", group: "experience",
      keywords: ["퍼스널컬러진단", "퍼스널컬러", "컬러진단", "personal color"],
      allow: [], block: TRADE.concat(["강사", "지도사"]) },

    { label: "Hair Salons", glyph: "💇", color: "var(--cinnabar)", group: "experience",
      keywords: ["미용실", "헤어샵", "헤어살롱", "염색전문", "hair salon"],
      allow: ["미용", "헤어"], block: TRADE.concat(["가발", "이발"]) },

    { label: "Nail Salons", glyph: "💅", color: "var(--jade)", group: "experience",
      keywords: ["네일샵", "네일아트", "젤네일", "nail salon"],
      allow: ["네일", "미용"], block: TRADE },

    { label: "Other Beauty Services", glyph: "👁️", color: "var(--gold)", group: "experience",
      keywords: ["속눈썹연장", "눈썹문신", "반영구화장", "왁싱샵", "메이크업샵",
                 "eyelash extensions", "waxing"],
      allow: [], block: TRADE },

    { label: "Foot Spa", glyph: "🦶", color: "var(--indigo)", group: "experience",
      keywords: ["발마사지", "족욕", "풋스파", "foot spa"],
      allow: [], block: TRADE.concat(["출장", "용품"]) },

    { label: "Spa & Wellness", glyph: "♨️", color: "var(--jade)", group: "experience",
      keywords: ["스파", "찜질방", "한증막", "spa", "jjimjilbang"],
      allow: ["찜질", "목욕", "사우나", "스파", "테마파크"], block: TRADE },

    { label: "Skin Clinics", glyph: "🩺", color: "var(--cinnabar)", group: "experience",
      keywords: ["피부과", "피부과의원", "dermatology"],
      allow: ["병원", "의원", "피부"], block: ["약국", "동물"] },

    { label: "Pharmacies", glyph: "💊", color: "var(--indigo)", group: "place",
      keywords: ["약국", "pharmacy"],
      allow: ["약국", "의약"], block: ["도매", "제조", "본사", "동물"] },

    { label: "Cosmetic Making Class", glyph: "🧪", color: "var(--jade)", group: "experience",
      keywords: ["화장품만들기체험", "천연화장품만들기", "DIY화장품",
                 "핸드크림만들기", "립밤만들기", "바디스크럽만들기"],
      allow: [], block: TRADE.concat(["판매", "쇼핑몰"]) },

    { label: "Perfume Making Class", glyph: "🌸", color: "var(--cinnabar)", group: "experience",
      keywords: ["향수만들기체험", "향수공방", "퍼퓸클래스", "조향체험", "perfume class"],
      allow: [], block: TRADE.concat(["판매", "쇼핑몰"]) },

    { label: "Soap & Candle Craft", glyph: "🕯️", color: "var(--gold)", group: "experience",
      keywords: ["천연비누만들기", "비누공방", "향초만들기", "캔들공방", "캔들만들기체험"],
      allow: [], block: TRADE.concat(["판매", "쇼핑몰"]) },

    { label: "K-Makeup Class", glyph: "💄", color: "var(--indigo)", group: "experience",
      keywords: ["메이크업클래스", "메이크업체험", "K뷰티메이크업", "한국식메이크업",
                 "메이크업레슨", "makeup class"],
      allow: [], block: TRADE.concat(["자격증", "정규반"]) },

    { label: "Makeup Courses", glyph: "🎓", color: "var(--cinnabar)", group: "experience",
      keywords: ["메이크업학원", "메이크업정규반", "메이크업교육", "메이크업과정", "메이크업강좌"],
      allow: [], block: ["도매", "제조", "판매"] },

    { label: "Skin & Facial Treatment", glyph: "✨", color: "var(--gold)", group: "experience",
      keywords: ["피부관리실", "에스테틱", "skin care", "facial"],
      allow: [], block: TRADE }
  ];

  ROWS.forEach(r => { r._gg = true; });

  let KEY = null;
  for (const k in THEME_SEARCH_KEYWORDS) {
    if (/beauty|kbeauty|skin/i.test(k)) { KEY = k; break; }
  }
  if (!KEY) {
    console.warn("[kbeauty-keywords] K-Beauty belt key not found. Keys:", Object.keys(THEME_SEARCH_KEYWORDS));
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
