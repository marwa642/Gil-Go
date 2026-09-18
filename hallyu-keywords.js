// Gil & Go — Hallyu belt keywords (fan-focused, adults only)
// Load LAST, after culture-keywords.js.
// Replaces the place + experience rows of the Hallyu belt.
// Concert (KOPIS) and festival rows are kept exactly as they are.

(function () {

  // Results whose NAME or CATEGORY contains these are dropped from
  // lesson rows — this removes kids' academies and exam-prep schools.
  const KIDS = ["어린이", "유아", "유치", "키즈", "주니어", "초등", "중등", "아동",
                "청소년", "교습소", "어린이집", "유치원", "방과후",
                "입시", "예중", "예고", "음대", "예술중", "예술고", "편입", "자격증"];

  // ---------------------------------------------------------------
  // allow = Kakao category must contain one of these (empty = any)
  // block = drop if NAME or CATEGORY contains one
  // ---------------------------------------------------------------
  const HALLYU_ROWS = [
    // ---- Fan places ----
    { label: "Entertainment Agencies", glyph: "🏢", color: "var(--indigo)", group: "place",
      keywords: ["하이브", "SM엔터테인먼트", "JYP엔터테인먼트", "YG엔터테인먼트",
                 "스타쉽엔터테인먼트", "큐브엔터테인먼트"],
      allow: ["엔터테인먼트", "기획사", "연예", "음반"], block: ["주차장", "음식점", "하이브리드"] },

    { label: "Broadcast & Music Show Studios", glyph: "📺", color: "var(--cinnabar)", group: "place",
      keywords: ["KBS", "MBC", "SBS", "CJENM", "방송국"],
      allow: ["방송", "언론"], block: ["학원", "아카데미", "지국", "음식점"] },

    { label: "Concert Venues", glyph: "🏟️", color: "var(--gold)", group: "place",
      keywords: ["콘서트홀", "공연장", "아레나", "체조경기장", "라이브홀"],
      allow: ["공연", "경기장", "체육관", "문화시설"], block: ["학원", "교회", "노래방"] },

    { label: "K-pop Merch & Albums", glyph: "🛍️", color: "var(--cinnabar)", group: "place",
      keywords: ["케이팝굿즈", "케이팝스토어", "음반매장", "앨범샵", "아이돌굿즈"],
      allow: [], block: ["도매", "인쇄", "제작업체"] },

    { label: "K-pop Cafes", glyph: "☕", color: "var(--jade)", group: "place",
      keywords: ["케이팝카페", "아이돌카페", "생일카페"],
      allow: ["카페"], block: [] },

    { label: "Busking & Fan Streets", glyph: "🎤", color: "var(--indigo)", group: "place",
      keywords: ["케이스타로드", "버스킹존", "버스킹", "걷고싶은거리"],
      allow: ["관광,명소", "테마거리", "거리", "공원", "광장"], block: ["학원", "음식점"] },

    { label: "Photo Booths", glyph: "📸", color: "var(--gold)", group: "place",
      keywords: ["인생네컷", "포토이즘", "하루필름", "포토그레이", "셀프사진관"],
      allow: ["사진"], block: [] },

    // ---- Experiences (adults) ----
    { label: "Idol-style Photoshoot", glyph: "📷", color: "var(--cinnabar)", group: "experience",
      keywords: ["아이돌프로필", "컨셉프로필", "프로필촬영", "화보촬영"],
      allow: ["사진", "스튜디오"], block: ["증명", "여권", "돌잔치", "아기", "웨딩"].concat(KIDS) },

    { label: "K-pop Dance Class", glyph: "💃", color: "var(--jade)", group: "experience",
      keywords: ["케이팝댄스원데이클래스", "방송댄스원데이클래스", "성인방송댄스",
                 "직장인댄스", "커버댄스", "댄스원데이클래스", "성인댄스학원"],
      allow: [], block: KIDS.concat(["발레학원", "태권도"]) },

    { label: "Vocal Lessons for Adults", glyph: "🎙️", color: "var(--gold)", group: "experience",
      keywords: ["성인보컬", "직장인보컬", "취미보컬", "보컬원데이클래스",
                 "보컬레슨", "취미음악학원"],
      allow: [], block: KIDS.concat(["실용음악입시", "예대"]) },

    { label: "Instrument Lessons for Adults", glyph: "🎸", color: "var(--indigo)", group: "experience",
      keywords: ["성인피아노", "성인기타", "성인드럼", "취미기타", "취미피아노",
                 "직장인드럼", "드럼원데이클래스", "기타원데이클래스",
                 "우쿨렐레원데이클래스", "성인악기레슨"],
      allow: [], block: KIDS.concat(["악기점", "악기판매", "렌탈", "조율"]) },

    { label: "Recording Studio Experience", glyph: "🎧", color: "var(--cinnabar)", group: "experience",
      keywords: ["녹음원데이클래스", "나만의노래녹음", "녹음실체험"],
      allow: [], block: ["엔지니어학원"].concat(KIDS) }
  ];

  HALLYU_ROWS.forEach(r => { r._gg = true; });

  // Keep concert / festival rows (anything from an event API)
  const oldRows = THEME_SEARCH_KEYWORDS.hallyu || [];
  const eventRows = oldRows.filter(r => r.source || (r.group !== "place" && r.group !== "experience"));
  THEME_SEARCH_KEYWORDS.hallyu = HALLYU_ROWS.concat(eventRows);

  const byLabel = {};
  HALLYU_ROWS.forEach(r => { byLabel[r.label] = r; });

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

  if (typeof currentTheme !== "undefined" && currentTheme === "hallyu" && typeof renderLegend === "function") {
    renderLegend("hallyu");
  }

  console.log("[hallyu-keywords] loaded:", HALLYU_ROWS.length, "rows +", eventRows.length, "event rows");
})();
