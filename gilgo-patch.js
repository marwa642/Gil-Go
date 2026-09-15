// Gil & Go — belt restructure + belt gate.
// Load LAST, after i18n.js. Modifies the app at runtime so index.html
// needs no edits beyond adding this one script tag.

(function () {

  // ---------------------------------------------------------------
  // 1. Belt lineup: drop Halal, add K-Taste and Lodging
  // ---------------------------------------------------------------
  delete THEMES.halal;
  delete THEME_SEARCH_KEYWORDS.halal;

  THEMES.ktaste = {
    label: "K-Taste Belt",
    center: [36.4, 127.9],
    level: 12,
    tagline: "Korea, one bite at a time",
    categoryStyle: {},
    sites: []
  };

  THEMES.lodging = {
    label: "Lodging Belt",
    center: [36.4, 127.9],
    level: 12,
    tagline: "Korea, somewhere to wake up",
    categoryStyle: {},
    sites: []
  };

  THEME_SEARCH_KEYWORDS.ktaste = [
    // ---- Restaurants ----
    { keywords: ["삼계탕","백숙"], label: "Samgyetang", glyph: "🍲", color: "var(--gold)", group: "place" },
    { keywords: ["닭갈비"], label: "Dakgalbi", glyph: "🐔", color: "var(--cinnabar)", group: "place" },
    { keywords: ["삼겹살","오겹살"], label: "Samgyeopsal", glyph: "🥓", color: "var(--cinnabar)", group: "place" },
    { keywords: ["국밥","돼지국밥","순대국밥","설렁탕","곰탕"], label: "Gukbap", glyph: "🍜", color: "var(--gold)", group: "place" },
    { keywords: ["비빔밥","돌솥비빔밥"], label: "Bibimbap", glyph: "🥘", color: "var(--jade)", group: "place" },
    { keywords: ["냉면","밀면","막국수"], label: "Naengmyeon", glyph: "🍢", color: "var(--indigo)", group: "place" },
    { keywords: ["떡볶이","분식"], label: "Tteokbokki", glyph: "🌶️", color: "var(--cinnabar)", group: "place" },
    { keywords: ["고기집","갈비","한우","소고기구이","숯불구이"], label: "Korean BBQ", glyph: "🥩", color: "var(--cinnabar)", group: "place" },
    { keywords: ["횟집","해산물","조개구이","물회","대게"], label: "Seafood", glyph: "🦐", color: "var(--jade)", group: "place" },
    { keywords: ["치킨","닭강정","후라이드"], label: "Korean Fried Chicken", glyph: "🍗", color: "var(--gold)", group: "place" },
    { keywords: ["포장마차","길거리음식","시장먹거리","호떡","어묵"], label: "Street Food", glyph: "🍡", color: "var(--cinnabar)", group: "place" },

    // ---- Cafes ----
    { keywords: ["이디야","메가커피","컴포즈커피","파리바게뜨","탐앤탐스","할리스","빽다방","파스쿠찌","뚜레쥬르"], label: "Local Chain Coffee & Bakery", glyph: "☕", color: "var(--gold)", group: "cafe" },
    { keywords: ["애견카페","고양이카페","펫카페","강아지카페"], label: "Pet Cafe", glyph: "🐾", color: "var(--jade)", group: "cafe" },
    { keywords: ["빈티지카페","레트로카페","옛날카페","고재카페"], label: "Vintage Cafe", glyph: "📻", color: "var(--gold)", group: "cafe" },
    { keywords: ["한옥카페","고택카페","전통카페"], label: "Hanok Cafe", glyph: "🏯", color: "var(--jade)", group: "cafe" },
    { keywords: ["대형카페","프리미엄카페","베이커리카페대형"], label: "Luxury Cafe", glyph: "✨", color: "var(--indigo)", group: "cafe" },
    { keywords: ["오션뷰카페","바다뷰카페","해변카페","바다카페"], label: "Ocean View Cafe", glyph: "🌊", color: "var(--indigo)", group: "cafe" },
    { keywords: ["공방카페","체험카페","클래스카페","가죽공방카페"], label: "Workshop Cafe", glyph: "🧵", color: "var(--cinnabar)", group: "cafe" },
    { keywords: ["루프탑카페","옥상카페"], label: "Rooftop Cafe", glyph: "🏙️", color: "var(--indigo)", group: "cafe" },
    { keywords: ["정원카페","숲카페","식물카페","온실카페","플랜테리어카페"], label: "Nature & Garden Cafe", glyph: "🌿", color: "var(--jade)", group: "cafe" },
    { keywords: ["디저트카페","케이크카페","마카롱","타르트"], label: "Dessert Cafe", glyph: "🍰", color: "var(--cinnabar)", group: "cafe" },
    { keywords: ["전통찻집","찻집","다원","한방차"], label: "Traditional Tea Cafe", glyph: "🍵", color: "var(--jade)", group: "cafe" },
    { keywords: ["베이커리카페","빵집","제과점"], label: "Bakery Cafe", glyph: "🥐", color: "var(--gold)", group: "cafe" },
    { keywords: ["캐릭터카페","테마카페","만화카페"], label: "Character Cafe", glyph: "🧸", color: "var(--cinnabar)", group: "cafe" },

    // ---- Events ----
    { keywords: [], label: "Food Festivals", glyph: "🎪", color: "var(--cinnabar)", group: "event", source: "tourapi", match: ["음식","맛","먹거리","식품","막걸리","김치","커피","빵"] }
  ];

  THEME_SEARCH_KEYWORDS.lodging = [
    { keywords: ["한옥스테이","한옥게스트하우스","전통한옥"], label: "Hanok Stay", glyph: "🏯", color: "var(--jade)", group: "place" },
    { keywords: ["템플스테이"], label: "Temple Stay", glyph: "🧘", color: "var(--jade)", group: "place" },
    { keywords: ["게스트하우스","호스텔"], label: "Guesthouses & Hostels", glyph: "🎒", color: "var(--gold)", group: "place" },
    { keywords: ["호텔","비즈니스호텔"], label: "Hotels", glyph: "🏨", color: "var(--indigo)", group: "place" },
    { keywords: ["펜션","리조트","풀빌라"], label: "Pensions & Resorts", glyph: "🏝️", color: "var(--cinnabar)", group: "place" },
    { keywords: ["캠핑장","글램핑","오토캠핑"], label: "Camping & Glamping", glyph: "⛺", color: "var(--jade)", group: "place" },
    { keywords: ["찜질방","한증막"], label: "Jjimjilbang Overnight", glyph: "♨️", color: "var(--gold)", group: "place" },
    { keywords: ["모텔","캡슐호텔"], label: "Budget Stays", glyph: "🛏️", color: "var(--indigo)", group: "place" }
  ];

  const BELT_ORDER = ["heritage", "hallyu", "skincare", "ktaste", "lodging"];
  const BELT_KEY = {
    heritage: "belt_culture",
    hallyu:   "belt_hallyu",
    skincare: "belt_beauty",
    ktaste:   "belt_ktaste",
    lodging:  "belt_lodging"
  };
  const BELT_GLYPH = {
    heritage: "宮", hallyu: "🎤", skincare: "🧴", ktaste: "🍜", lodging: "🏯"
  };

  // ---------------------------------------------------------------
  // 2. Category guard — restaurants and lodging are no longer
  //    blocked everywhere, only on the belts where they'd be noise.
  // ---------------------------------------------------------------
  const GLOBAL_BLOCK = ["부동산", "병원", "학원 > 입시"];
  const BELT_BLOCK = {
    heritage: ["음식점", "숙박"],
    hallyu:   ["음식점", "숙박"],
    skincare: ["음식점", "숙박"],
    ktaste:   ["숙박"],
    lodging:  ["음식점"]
  };

  window.passesCategoryGuard = function (cat, place) {
    const path = place.kakaoCategory || "";
    if (!path) return false;
    if (GLOBAL_BLOCK.some(b => path.startsWith(b))) return false;
    const beltBlock = BELT_BLOCK[currentTheme] || [];
    if (beltBlock.some(b => path.startsWith(b))) return false;
    const need = CATEGORY_GUARD[cat.label];
    if (!need) return true;
    return need.some(tok => path.includes(tok));
  };

  // ---------------------------------------------------------------
  // 3. Missing styles: legend tabs, clear button, new belt themes
  // ---------------------------------------------------------------
  const css = document.createElement("style");
  css.textContent = `
    .legend-tabs{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;
      padding-bottom:12px;border-bottom:1px solid var(--line)}
    .legend-tab{font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;
      font-weight:700;padding:5px 9px;border-radius:2px;cursor:pointer;
      border:1px solid var(--line);color:var(--ink);opacity:.62;white-space:nowrap}
    .legend-tab.active{opacity:1;background:var(--indigo);color:var(--hanji);
      border-color:var(--indigo)}
    .legend-clear{margin-top:16px;width:100%;background:transparent;
      border:1px solid var(--line);color:var(--indigo);padding:9px;
      border-radius:2px;font-size:12px;font-family:inherit;cursor:pointer}
    .legend-clear:hover{background:var(--hanji-deep)}

    body[data-theme="ktaste"]{
      --ink:#3a2317; --hanji:#fdf4ea; --hanji-deep:#f5e3d0;
      --cinnabar:#c94f2c; --indigo:#8c4a2f; --jade:#6b8f4e; --gold:#d99a3c;
      --line:rgba(58,35,23,.16);
    }
    body[data-theme="lodging"]{
      --ink:#1e2b33; --hanji:#eef4f6; --hanji-deep:#dae7ec;
      --cinnabar:#4a7c8c; --indigo:#2d5566; --jade:#5f9ea0; --gold:#a8925f;
      --line:rgba(30,43,51,.15);
    }

    #gilgoBeltGate{position:fixed;inset:0;z-index:99990;background:rgba(28,24,18,.82);
      display:flex;align-items:center;justify-content:center;padding:20px;
      -webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
    #gilgoBeltBox{background:#F2E8D5;border-radius:14px;max-width:440px;width:100%;
      max-height:88vh;overflow-y:auto;padding:26px 22px;text-align:center;
      box-shadow:0 18px 50px rgba(0,0,0,.35)}
    #gilgoBeltBox h2{margin:0 0 4px;font-size:21px;color:#2C3E50;font-weight:700}
    #gilgoBeltBox p{margin:0 0 18px;font-size:13.5px;color:#7a6a52}
    .gilgoBeltBtn{display:flex;align-items:center;gap:12px;width:100%;
      background:#fff;border:1.5px solid #ded0b4;border-radius:10px;
      padding:13px 15px;margin-bottom:9px;cursor:pointer;font-family:inherit;
      font-size:15px;font-weight:600;color:#2C3E50;text-align:left;
      transition:border-color .15s,transform .1s}
    .gilgoBeltBtn:hover,.gilgoBeltBtn:focus{border-color:#C0392B;outline:none}
    .gilgoBeltBtn:active{transform:scale(.98)}
    .gilgoBeltBtn .g{font-size:21px;width:28px;text-align:center;flex:none}
    #gilgoBeltSkip{margin-top:6px;background:none;border:none;
      color:#7a6a52;font-size:13px;font-family:inherit;cursor:pointer;
      text-decoration:underline;text-underline-offset:3px}
  `;
  document.head.appendChild(css);

  // ---------------------------------------------------------------
  // 4. Translation helpers (safe if a labels file isn't loaded yet)
  // ---------------------------------------------------------------
  function tr(key, fallback) {
    return (typeof t === "function") ? t(key) : fallback;
  }
  function tCat(label) {
    const row = (typeof CATEGORY_LABELS !== "undefined") ? CATEGORY_LABELS[label] : null;
    if (!row) return label;
    const code = document.documentElement.lang || "en";
    return row[code] || label;
  }

  // ---------------------------------------------------------------
  // 5. Belt tabs — rebuilt, translated, five belts
  // ---------------------------------------------------------------
  function renderBeltTabs() {
    const bar = document.querySelector(".themes");
    if (!bar) return;
    bar.innerHTML = "";
    BELT_ORDER.forEach(id => {
      const pill = document.createElement("div");
      pill.className = "theme-pill" + (id === currentTheme ? " active" : "");
      pill.dataset.themeBtn = id;
      pill.textContent = tr(BELT_KEY[id], THEMES[id].label);
      pill.addEventListener("click", () => {
        if (id !== currentTheme) loadTheme(id);
      });
      bar.appendChild(pill);
    });
  }

  // ---------------------------------------------------------------
  // 6. Legend — translated headings, tabs, category names
  // ---------------------------------------------------------------
  const GROUP_KEY = {
    place: "section_places",
    cafe: "section_cafes",
    experience: "section_experiences",
    event: "section_events",
    info: "section_all"
  };

  // Some belts rename their sections.
  const BELT_GROUP_LABELS = {
    ktaste: { place: "Restaurants", cafe: "Cafes", event: "Food Festivals" },
    lodging: { place: "Places to Stay" }
  };

  window.renderLegend = function (theme) {
    activeFilters.clear();
    activeGroup = "all";
    const items = THEME_SEARCH_KEYWORDS[theme];
    if (!items) { legend.innerHTML = ""; return; }

    const GROUP_ORDER = ["place", "cafe", "experience", "event", "info"];
    const present = GROUP_ORDER.filter(g => items.some(k => k.group === g));
    const override = BELT_GROUP_LABELS[theme] || {};
    const gLabel = g => override[g] || tr(GROUP_KEY[g], GROUP_LABELS[g]);

    let html = (theme === "ktaste") ? dietToggleHTML() : "";
    html += `<div class="legend-tabs"><div class="legend-tab active" data-group="all">${tr("section_all", "All")}</div>`;
    present.forEach(g => {
      html += `<div class="legend-tab" data-group="${g}">${gLabel(g)}</div>`;
    });
    html += `</div>`;

    present.forEach(group => {
      const rows = items.filter(k => k.group === group);
      if (!rows.length) return;
      html += `<div class="lg-title lg-group" data-group-section="${group}">${gLabel(group)}</div>`;
      rows.forEach(k => {
        html += `<div class="legend-row" data-cat="${k.label.replace(/"/g, "&quot;")}" data-group="${group}">
          <div class="legend-dot" style="background:${k.color}">${k.glyph}</div>
          <span>${tCat(k.label)}</span>
          <span class="legend-count">0</span>
        </div>`;
      });
    });
    html += `<button class="legend-clear" id="legendClearBtn">${tr("retry", "Clear filters")}</button>`;
    legend.innerHTML = html;
    if (theme === "ktaste") wireDietToggles();

    legend.querySelectorAll(".legend-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        activeGroup = tab.dataset.group;
        legend.querySelectorAll(".legend-tab").forEach(x => x.classList.remove("active"));
        tab.classList.add("active");
        legend.querySelectorAll(".legend-row").forEach(row => {
          row.style.display = (activeGroup === "all" || row.dataset.group === activeGroup) ? "" : "none";
        });
        updateDiscoveredCounts();
        legend.querySelectorAll(".lg-group").forEach(h => {
          h.style.display = (activeGroup === "all" || h.dataset.groupSection === activeGroup) ? "" : "none";
        });
      });
    });

    legend.querySelectorAll(".legend-row").forEach(row => {
      row.addEventListener("click", () => {
        const cat = row.dataset.cat;
        if (activeFilters.has(cat)) activeFilters.delete(cat);
        else activeFilters.add(cat);
        row.classList.toggle("active");
        applyFilters();
      });
    });

    const clearBtn = document.getElementById("legendClearBtn");
    if (clearBtn) clearBtn.addEventListener("click", () => {
      activeFilters.clear();
      legend.querySelectorAll(".legend-row").forEach(r => r.classList.remove("active"));
      applyFilters();
    });
  };

  // ---------------------------------------------------------------
  // 7. loadTheme — tolerates belts with no curated sites
  // ---------------------------------------------------------------
  window.loadTheme = function (theme, opts = {}) {
    currentTheme = theme;
    const th = THEMES[theme];
    if (!th) return;

    document.body.setAttribute("data-theme", theme);
    document.getElementById("taglineText").textContent = th.tagline;
    document.getElementById("sealMark").textContent = "길";

    document.querySelectorAll(".theme-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.themeBtn === theme);
    });

    clearOverlays();
    clearDiscovered();

    const sites = th.sites || [];
    const bounds = new kakao.maps.LatLngBounds();

    sites.forEach(site => {
      const style = th.categoryStyle[site.category];
      if (!style) return;
      const position = new kakao.maps.LatLng(site.lat, site.lng);
      bounds.extend(position);
      const el = document.createElement("div");
      el.className = "seal-marker";
      el.style.background = style.color;
      el.textContent = style.glyph;
      el.addEventListener("click", () => openDrawer(site));
      const overlay = new kakao.maps.CustomOverlay({
        position: position, content: el, yAnchor: 0.5, xAnchor: 0.5
      });
      overlay.setMap(map);
      currentOverlays.push(overlay);
      currentOverlaysData.push({ overlay, category: site.category });
    });

    legend.style.display = "";
    renderLegend(theme);

    if (!opts.skipFly) {
      if (sites.length) {
        map.setBounds(bounds, 70, 70, 70, 70);
      } else {
        // No curated pins on this belt — sit at the national view
        // and let "Show nearby" populate it.
        map.setCenter(new kakao.maps.LatLng(th.center[0], th.center[1]));
        map.setLevel(th.level);
      }
    }

    drawer.classList.remove("open");
    emptyHint.textContent = sites.length
      ? "Tap a pin to open a place — then ask its assistant anything."
      : "Enter a location above and tap Show nearby to fill this belt.";
    emptyHint.style.display = "block";
  };

  // ---------------------------------------------------------------
  // 8. Belt gate — appears once, after the language gate
  // ---------------------------------------------------------------
  function buildBeltGate() {
    if (document.getElementById("gilgoBeltGate")) return;

    const gate = document.createElement("div");
    gate.id = "gilgoBeltGate";
    gate.innerHTML = `
      <div id="gilgoBeltBox" role="dialog" aria-modal="true">
        <h2>${tr("choose_belt", "Choose a belt")}</h2>
        <p>${tr("choose_belt_sub", "Pick a theme, or browse everything")}</p>
        <div id="gilgoBeltList"></div>
        <button id="gilgoBeltSkip" type="button">${tr("show_everything", "Show me everything")}</button>
      </div>`;

    const list = gate.querySelector("#gilgoBeltList");
    BELT_ORDER.forEach(id => {
      const btn = document.createElement("button");
      btn.className = "gilgoBeltBtn";
      btn.type = "button";
      btn.innerHTML = `<span class="g">${BELT_GLYPH[id]}</span><span>${tr(BELT_KEY[id], THEMES[id].label)}</span>`;
      btn.addEventListener("click", () => {
        localStorage.setItem("gilgo_belt", id);
        gate.remove();
        loadTheme(id);
      });
      list.appendChild(btn);
    });

    gate.querySelector("#gilgoBeltSkip").addEventListener("click", () => {
      localStorage.setItem("gilgo_belt", "heritage");
      gate.remove();
    });

    document.body.appendChild(gate);
  }

  // Chain onto the language gate: when it closes, this opens.
  if (typeof closeGate === "function") {
    const origCloseGate = closeGate;
    window.closeGate = function () {
      origCloseGate();
      if (!localStorage.getItem("gilgo_belt")) buildBeltGate();
    };
  }


  // ---------------------------------------------------------------
  // 10. Dietary toggles (K-Taste belt only)
  //     These do not filter existing results — no such field exists
  //     in the data. They change WHAT gets searched.
  // ---------------------------------------------------------------
  const DIET_ROWS = {
    halal: [
      { keywords: ["할랄음식점","할랄레스토랑","할랄인증"], label: "Halal Certified", glyph: "🕌", color: "var(--jade)", group: "place" },
      { keywords: ["무슬림음식","아랍음식","중동음식"], label: "Muslim-Friendly", glyph: "🍽️", color: "var(--gold)", group: "place" },
      { keywords: ["케밥","터키음식"], label: "Turkish & Kebab", glyph: "🥙", color: "var(--cinnabar)", group: "place" },
      { keywords: ["인도음식","파키스탄음식","우즈베키스탄음식"], label: "South & Central Asian", glyph: "🍛", color: "var(--indigo)", group: "place" },
      { keywords: ["할랄마트","이슬람마트","수입식품점"], label: "Halal Grocery", glyph: "🛒", color: "var(--gold)", group: "place" }
    ],
    veg: [
      { keywords: ["사찰음식","사찰음식점"], label: "Temple Cuisine", glyph: "🪷", color: "var(--jade)", group: "place" },
      { keywords: ["비건식당","비건레스토랑"], label: "Vegan Restaurants", glyph: "🌱", color: "var(--jade)", group: "place" },
      { keywords: ["채식식당","채식뷔페","베지테리언"], label: "Vegetarian Restaurants", glyph: "🥗", color: "var(--gold)", group: "place" },
      { keywords: ["비건카페","비건베이커리"], label: "Vegan Cafes & Bakeries", glyph: "🧁", color: "var(--cinnabar)", group: "cafe" }
    ]
  };

  const diet = { halal: false, veg: false };
  const KTASTE_FULL = THEME_SEARCH_KEYWORDS.ktaste.slice();

  function applyDiet() {
    if (!diet.halal && !diet.veg) {
      THEME_SEARCH_KEYWORDS.ktaste = KTASTE_FULL.slice();
    } else {
      const rows = [];
      if (diet.halal) rows.push(...DIET_ROWS.halal);
      if (diet.veg) rows.push(...DIET_ROWS.veg);
      // Keep cafes and festivals, drop the meat-forward restaurant rows.
      rows.push(...KTASTE_FULL.filter(r => r.group === "cafe" || r.group === "event"));
      THEME_SEARCH_KEYWORDS.ktaste = rows;
    }
    renderLegend("ktaste");
    if (lastSearch) loadNearbyDiscoveries("ktaste", lastSearch.lat, lastSearch.lng);
  }

  // Remember where the last search happened so a toggle can re-run it.
  let lastSearch = null;
  const origLoadNearby = loadNearbyDiscoveries;
  window.loadNearbyDiscoveries = function (theme, lat, lng) {
    lastSearch = { lat, lng };
    return origLoadNearby(theme, lat, lng);
  };

  function dietToggleHTML() {
    return `<div class="gilgoDiet">
      <label class="gilgoDietRow">
        <span>🕌 Halal only</span>
        <input type="checkbox" id="dietHalal" ${diet.halal ? "checked" : ""}>
        <span class="gilgoSwitch"></span>
      </label>
      <label class="gilgoDietRow">
        <span>🌱 Vegetarian only</span>
        <input type="checkbox" id="dietVeg" ${diet.veg ? "checked" : ""}>
        <span class="gilgoSwitch"></span>
      </label>
    </div>`;
  }

  function wireDietToggles() {
    const h = document.getElementById("dietHalal");
    const v = document.getElementById("dietVeg");
    if (h) h.addEventListener("change", e => { diet.halal = e.target.checked; applyDiet(); });
    if (v) v.addEventListener("change", e => { diet.veg = e.target.checked; applyDiet(); });
  }

  const dietCss = document.createElement("style");
  dietCss.textContent = `
    .gilgoDiet{margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--line)}
    .gilgoDietRow{display:flex;align-items:center;gap:10px;padding:7px 4px;
      font-size:13px;font-weight:600;cursor:pointer}
    .gilgoDietRow span:first-child{flex:1}
    .gilgoDietRow input{display:none}
    .gilgoSwitch{width:38px;height:22px;border-radius:999px;background:var(--line);
      position:relative;flex:none;transition:background .2s}
    .gilgoSwitch::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;
      border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:left .2s}
    .gilgoDietRow input:checked + .gilgoSwitch{background:var(--jade)}
    .gilgoDietRow input:checked + .gilgoSwitch::after{left:18px}
  `;
  document.head.appendChild(dietCss);

  // ---------------------------------------------------------------
  // 9. Wire up
  // ---------------------------------------------------------------
  document.addEventListener("languagechange", () => {
    renderBeltTabs();
    renderLegend(currentTheme);
    document.getElementById("taglineText").textContent = THEMES[currentTheme].tagline;
  });

  renderBeltTabs();
  renderLegend(currentTheme);

  // Returning visitor: language already chosen, belt not yet.
  if (localStorage.getItem("gilgo_lang") && !localStorage.getItem("gilgo_belt")) {
    buildBeltGate();
  }

})();
