// Gil & Go — Culture belt keywords (final list)
// Load LAST, after every other patch file.
// Replaces the place + experience rows of the Culture belt.
// Festival/event rows are kept exactly as they are.

(function () {

  // ---------------------------------------------------------------
  // 1. Rows
  //    allow = Kakao category must contain one of these (empty = any)
  //    block = drop the result if its NAME or CATEGORY contains one
  // ---------------------------------------------------------------
  const CULTURE_ROWS = [
    // ---- Places ----
    { label: "Buddhist Temples", glyph: "🛕", color: "var(--jade)", group: "place",
      keywords: ["사찰", "전통사찰"],
      allow: ["사찰", "불교", "절"], block: ["음식점", "납골", "추모"] },

    { label: "Royal Palaces & Tombs", glyph: "👑", color: "var(--indigo)", group: "place",
      keywords: ["궁궐", "고궁", "왕릉", "조선왕릉"],
      allow: ["문화유적", "관광,명소", "궁", "릉", "능"], block: ["음식점", "족발", "노래"] },

    { label: "Shrines & Fortresses", glyph: "🏯", color: "var(--gold)", group: "place",
      keywords: ["서원", "향교", "사당", "산성", "읍성", "성곽"],
      allow: ["문화유적", "관광,명소", "사당", "성곽"], block: ["음식점", "학원", "교회"] },

    { label: "Hanok & Folk Villages", glyph: "🏘️", color: "var(--cinnabar)", group: "place",
      keywords: ["한옥마을", "민속마을"],
      allow: ["관광,명소", "마을", "문화유적"], block: ["음식점", "부동산", "아파트"] },

    { label: "Mural & Art Villages", glyph: "🎨", color: "var(--gold)", group: "place",
      keywords: ["벽화마을", "예술마을"],
      allow: ["관광,명소", "테마거리", "마을"], block: ["음식점", "부동산", "아파트"] },

    { label: "Traditional Markets", glyph: "🏮", color: "var(--cinnabar)", group: "place",
      keywords: ["전통시장", "재래시장"],
      allow: ["시장"], block: ["마트", "편의점"] },

    { label: "Museums", glyph: "🏛️", color: "var(--indigo)", group: "place",
      keywords: ["박물관"],
      allow: ["박물관", "전시관", "기념관"], block: ["음식점"] },

    { label: "Galleries", glyph: "🖼️", color: "var(--jade)", group: "place",
      keywords: ["미술관", "갤러리"],
      allow: ["미술관", "갤러리", "화랑", "전시"], block: ["안경", "가구", "인테리어", "웨딩"] },

    // ---- Experiences ----
    { label: "Temple Stay", glyph: "🧘", color: "var(--jade)", group: "experience",
      keywords: ["템플스테이"],
      allow: [], block: ["음식점"] },

    { label: "Jjimjilbang", glyph: "♨️", color: "var(--gold)", group: "experience",
      keywords: ["찜질방", "한증막"],
      allow: ["찜질", "목욕", "사우나"], block: ["마사지", "스포츠마사지"] },

    { label: "Cooking Class", glyph: "🍳", color: "var(--cinnabar)", group: "experience",
      keywords: ["전통음식체험", "한식쿠킹클래스", "쿠킹클래스", "요리체험"],
      allow: [], block: ["자격증", "입시", "제과제빵학원"] },

    { label: "Taekwondo Experience", glyph: "🥋", color: "var(--indigo)", group: "experience",
      keywords: ["태권도체험", "태권도공연"],
      allow: [], block: ["학원", "체육관 > 태권도장"] },

    { label: "Tea Ceremony", glyph: "🍵", color: "var(--jade)", group: "experience",
      keywords: ["다도체험", "다례체험", "다도교실"],
      allow: [], block: ["커피전문점", "프랜차이즈"] },

    { label: "Traditional Crafts", glyph: "🧵", color: "var(--gold)", group: "experience",
      keywords: ["전통공예체험", "공예체험", "매듭공예", "한지공예체험"],
      allow: [], block: ["도매", "문구", "철물"] },

    { label: "Pottery Class", glyph: "🏺", color: "var(--cinnabar)", group: "experience",
      keywords: ["도예체험", "도자기체험", "도자기만들기", "도예공방"],
      allow: [], block: ["그릇", "주방", "도매", "타일"] },

    { label: "Stamp Carving", glyph: "🔖", color: "var(--indigo)", group: "experience",
      keywords: ["전각체험", "전각공방", "전각교실"],
      allow: [], block: ["열쇠", "인감", "도어락", "명판"] },

    { label: "Traditional Archery", glyph: "🏹", color: "var(--jade)", group: "experience",
      keywords: ["국궁체험", "활쏘기체험", "국궁장"],
      allow: [], block: ["양궁장 > 실내", "게임"] },

    { label: "Hanbok Experience", glyph: "👘", color: "var(--gold)", group: "experience",
      keywords: ["한복체험", "한복대여"],
      allow: [], block: ["맞춤", "수선", "웨딩", "혼주"] }
  ];

  CULTURE_ROWS.forEach(r => { r._gg = true; });

  // ---------------------------------------------------------------
  // 2. Swap rows in, keep the festival buckets
  // ---------------------------------------------------------------
  const oldRows = THEME_SEARCH_KEYWORDS.heritage || [];
  const eventRows = oldRows.filter(r => r.group === "event");
  THEME_SEARCH_KEYWORDS.heritage = CULTURE_ROWS.concat(eventRows);

  const byLabel = {};
  CULTURE_ROWS.forEach(r => { byLabel[r.label] = r; });

  // ---------------------------------------------------------------
  // 3. Guard for the new rows (old guard still runs for other belts)
  // ---------------------------------------------------------------
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
    let row = args.find(a => a && typeof a === "object" && a._gg);
    if (!row) {
      const s = args.find(a => typeof a === "string" && byLabel[a]);
      if (s) row = byLabel[s];
    }
    if (place && row) return checkRow(place, row);
    return origGuard ? origGuard.apply(this, args) : true;
  };

  // Redraw the legend if Culture is already open
  if (typeof currentTheme !== "undefined" && currentTheme === "heritage" && typeof renderLegend === "function") {
    renderLegend("heritage");
  }

  console.log("[culture-keywords] loaded:", CULTURE_ROWS.length, "rows +", eventRows.length, "event rows");
})();
