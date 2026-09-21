// =================================================================
// Gil & Go: calm "Show nearby"
//
// 1. Show nearby puts a blue pin on the searched location.
// 2. Category counts fill in as each search finishes (fast first).
// 3. No place pins appear until a category is tapped.
//    Tapping more categories adds their pins; tap again to remove.
// 4. Place names are translated only when a pin is opened, not in
//    bulk during search (faster, and saves AI quota).
//
// Load LAST in index.html:
//   <script src="nearby-filters.js?v=1"></script>
// =================================================================
(function () {
  "use strict";

  const WORKER = "https://gil-and-go-backend.marwahshaikh2001.workers.dev";

  const L = {
    en: { tap: "Tap a category to show its places on the map.", here: "Searched location" },
    ko: { tap: "카테고리를 누르면 지도에 장소가 표시돼요.", here: "검색한 위치" },
    zh: { tap: "点击类别即可在地图上显示地点。", here: "搜索位置" },
    ja: { tap: "カテゴリをタップすると地図に場所が表示されます。", here: "検索した場所" },
    ru: { tap: "Нажмите на категорию, чтобы показать места на карте.", here: "Место поиска" },
    es: { tap: "Toca una categoría para ver sus lugares en el mapa.", here: "Ubicación buscada" },
    fr: { tap: "Touchez une catégorie pour afficher ses lieux sur la carte.", here: "Lieu recherché" },
    vi: { tap: "Chạm vào một danh mục để hiện địa điểm trên bản đồ.", here: "Vị trí đã tìm" },
    th: { tap: "แตะหมวดหมู่เพื่อแสดงสถานที่บนแผนที่", here: "ตำแหน่งที่ค้นหา" }
  };
  function lang() { return (document.documentElement.lang || "en").slice(0, 2).toLowerCase(); }
  function t(k) { return (L[lang()] || L.en)[k] || L.en[k]; }

  const style = document.createElement("style");
  style.textContent = `
  .ggs-pin { position: relative; width: 34px; height: 44px; pointer-events: none; }
  .ggs-pin svg { width: 34px; height: 44px; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }
  .legend-row .legend-count.ggs-loading { opacity: .5; animation: ggs-blink 1s ease-in-out infinite; }
  .legend-row.ggs-empty { opacity: .4; }
  @keyframes ggs-blink { 50% { opacity: .15; } }
  @media (prefers-reduced-motion: reduce) { .legend-row .legend-count.ggs-loading { animation: none; } }
  `;
  document.head.appendChild(style);

  // ---------------------------------------------------------------
  // State
  // ---------------------------------------------------------------
  let searched = false;      // true once Show nearby has run on this belt
  let searchToken = 0;
  let searchPoint = null;    // {lat, lng}
  let searchPin = null;
  let lastRun = null;        // {theme, lat, lng}
  const pending = new Set(); // category labels still loading

  function post(payload) {
    return fetch(WORKER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(r => r.json());
  }

  // ---------------------------------------------------------------
  // Blue pin for the searched location
  // ---------------------------------------------------------------
  function placeSearchPin(lat, lng) {
    const ll = new kakao.maps.LatLng(lat, lng);
    if (!searchPin) {
      const el = document.createElement("div");
      el.className = "ggs-pin";
      el.setAttribute("aria-label", t("here"));
      el.innerHTML = '<svg viewBox="0 0 34 44" aria-hidden="true"><path d="M17 1C8.2 1 1 8 1 16.7 1 28.5 17 43 17 43s16-14.5 16-26.3C33 8 25.8 1 17 1z" fill="#1a73e8" stroke="#fff" stroke-width="2"/><circle cx="17" cy="16.5" r="6" fill="#fff"/></svg>';
      searchPin = new kakao.maps.CustomOverlay({ position: ll, content: el, xAnchor: 0.5, yAnchor: 1, zIndex: 6 });
    } else {
      searchPin.setPosition(ll);
    }
    searchPin.setMap(map);
  }
  function removeSearchPin() { if (searchPin) searchPin.setMap(null); }

  // ---------------------------------------------------------------
  // Legend counts (with loading state)
  // ---------------------------------------------------------------
  window.updateDiscoveredCounts = function () {
    const counts = {};
    discoveredOverlaysData.forEach(({ category }) => { counts[category] = (counts[category] || 0) + 1; });
    legend.querySelectorAll(".legend-row").forEach(row => {
      const cat = row.dataset.cat;
      const el = row.querySelector(".legend-count");
      const loading = pending.has(cat);
      const n = counts[cat] || 0;
      if (el) {
        el.textContent = loading ? "…" : n;
        el.classList.toggle("ggs-loading", loading);
      }
      row.classList.toggle("ggs-empty", searched && !loading && n === 0);
      if (row.dataset.group === "event") {
        const groupOk = typeof activeGroup === "undefined" || activeGroup === "all" || activeGroup === "event";
        row.style.display = (!loading && n && groupOk) ? "" : "none";
      }
    });
  };

  // ---------------------------------------------------------------
  // Filters: before a search, curated pins behave as before.
  // After a search, only tapped categories show.
  // ---------------------------------------------------------------
  window.applyFilters = function () {
    const bounds = new kakao.maps.LatLngBounds();
    let anyVisible = false;

    currentOverlaysData.forEach(({ overlay, category }) => {
      const visible = activeFilters.size === 0 ? !searched : activeFilters.has(category);
      overlay.setMap(visible ? map : null);
      if (visible) { bounds.extend(overlay.getPosition()); anyVisible = true; }
    });
    discoveredOverlaysData.forEach(({ overlay, category }) => {
      const visible = activeFilters.has(category);
      overlay.setMap(visible ? map : null);
      if (visible) { bounds.extend(overlay.getPosition()); anyVisible = true; }
    });

    if (activeFilters.size > 0 && anyVisible) {
      if (searchPoint) bounds.extend(new kakao.maps.LatLng(searchPoint.lat, searchPoint.lng));
      map.setBounds(bounds, 60, 60, 60, 60);
    }
  };

  // ---------------------------------------------------------------
  // Pins are built as results arrive, but stay hidden unless their
  // category is already selected.
  // ---------------------------------------------------------------
  function makeOverlay(cat, place) {
    const el = document.createElement("div");
    el.className = "seal-marker";
    el.style.background = cat.color;
    el.style.color = "#fff";
    el.style.fontSize = "16px";
    el.style.width = "36px";
    el.style.height = "36px";
    el.textContent = cat.glyph;
    el.title = place.name;

    const overlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(place.lat, place.lng), content: el, yAnchor: 0.5, xAnchor: 0.5
    });

    el.addEventListener("click", () => {
      openDrawer({
        name: place.name,
        category: `${cat.label} (auto-discovered)`,
        address: place.address,
        desc: place.festivalDates ? `📅 ${place.festivalDates}` : "Automatically found nearby — not yet reviewed by Gil & Go.",
        source: place.festivalDates ? "Korea Tourism Organization (TourAPI)" : "Kakao Local Search",
        url: place.url,
        lat: place.lat,
        lng: place.lng,
        phone: place.phone,
        kakaoCategory: place.kakaoCategory,
        distanceMeters: place.distanceMeters
      });
    });

    if (activeFilters.has(cat.label)) overlay.setMap(map);
    discoveredOverlays.push(overlay);
    discoveredOverlaysData.push({ overlay, category: cat.label });
  }

  function makeBucket(cat) { return { cat, places: [] }; }

  function addPlaces(bucket, places) {
    places.forEach(place => {
      if (place.lat == null || place.lng == null) return;
      if (!passesCategoryGuard(bucket.cat, place)) return;
      const dup = bucket.places.some(p =>
        p.name === place.name ||
        (Math.abs(p.lat - place.lat) < 0.0005 && Math.abs(p.lng - place.lng) < 0.0005));
      if (dup) return;
      bucket.places.push(place);
      makeOverlay(bucket.cat, place);
    });
  }

  // ---------------------------------------------------------------
  // The search itself
  // ---------------------------------------------------------------
  window.loadNearbyDiscoveries = async function (theme, lat, lng) {
    const categories = THEME_SEARCH_KEYWORDS[theme];
    if (!categories) return;

    const token = ++searchToken;
    lastRun = { theme, lat, lng };
    searched = true;
    searchPoint = { lat, lng };

    clearDiscovered();
    activeFilters.clear();
    legend.querySelectorAll(".legend-row").forEach(r => r.classList.remove("active"));
    currentOverlaysData.forEach(({ overlay }) => overlay.setMap(null));

    placeSearchPin(lat, lng);
    emptyHint.textContent = t("tap");
    emptyHint.style.display = "block";

    pending.clear();
    categories.forEach(c => pending.add(c.label));
    updateDiscoveredCounts();

    const buckets = new Map(categories.map(c => [c, makeBucket(c)]));
    const alive = () => token === searchToken;
    const done = labels => { labels.forEach(l => pending.delete(l)); updateDiscoveredCounts(); };

    const jobs = [];

    // Keyword categories: each one updates its own count when ready.
    categories.filter(c => c.source !== "tourapi").forEach(cat => {
      jobs.push(Promise.all((cat.keywords || []).map(kw =>
        post({ type: "nearby-search", keyword: kw, lat, lng, nationwide: false, maxPages: 3 })
          .then(d => d.places || []).catch(() => [])
      )).then(lists => {
        if (!alive()) return;
        addPlaces(buckets.get(cat), lists.flat());
        done([cat.label]);
      }));
    });

    // Kakao category codes (heritage belt: pottery + palaces).
    const potteryCat = categories.find(c => c.label === "Pottery Class");
    const heritageCat = categories.find(c => c.label === "Royal Palaces");
    if (potteryCat || heritageCat) {
      jobs.push(post({ type: "category-search", code: "AT4", lat, lng, radius: 5000, maxPages: 3 })
        .then(d => {
          if (!alive()) return;
          (d.places || []).forEach(place => {
            const path = place.kakaoCategory || "";
            const target = path.includes("도자기,도예촌") ? potteryCat : path.includes("문화유적") ? heritageCat : null;
            if (target) addPlaces(buckets.get(target), [place]);
          });
          updateDiscoveredCounts();
        }).catch(() => {}));
    }

    // TourAPI festivals for event rows.
    const eventCats = categories.filter(c => c.source === "tourapi");
    if (eventCats.length) {
      jobs.push(post({ type: "festival-search", lat, lng, radius: 20000 })
        .then(d => {
          if (!alive()) return;
          const pad = n => String(n).padStart(2, "0");
          const now = new Date();
          const today = parseInt(`${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`, 10);
          const fmt = s => s ? `${s.slice(0, 4)}.${s.slice(4, 6)}.${s.slice(6, 8)}` : "";
          (d.festivals || []).slice()
            .sort((a, b) => parseInt(a.startDate || "0", 10) - parseInt(b.startDate || "0", 10))
            .forEach(f => {
              const end = parseInt(f.endDate || "0", 10);
              if (end && end < today) return;
              const start = parseInt(f.startDate || "0", 10);
              const isOn = start <= today && end >= today;
              const target = eventCats.find(c => c.match && c.match.length && c.match.some(w => f.name.includes(w)))
                || eventCats.find(c => !c.match || !c.match.length);
              if (!target) return;
              addPlaces(buckets.get(target), [{
                name: f.name, address: f.address, lat: f.lat, lng: f.lng, kakaoCategory: "축제",
                distanceMeters: f.distanceMeters, phone: f.tel,
                url: `https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=${f.contentId}`,
                festivalDates: (isOn ? "NOW · " : "") + (f.startDate === f.endDate ? fmt(f.startDate) : `${fmt(f.startDate)} – ${fmt(f.endDate)}`)
              }]);
            });
        })
        .catch(() => {})
        .finally(() => { if (alive()) done(eventCats.map(c => c.label)); }));
    }

    await Promise.all(jobs);
    if (alive()) { pending.clear(); updateDiscoveredCounts(); }
  };

  // ---------------------------------------------------------------
  // Keep the new behaviour through belt changes, language changes,
  // and the K-Taste diet toggles.
  // ---------------------------------------------------------------
  const prevLoadTheme = window.loadTheme;
  window.loadTheme = function () {
    searchToken++;
    searched = false;
    searchPoint = null;
    lastRun = null;
    pending.clear();
    removeSearchPin();
    return prevLoadTheme.apply(this, arguments);
  };

  const prevRenderLegend = window.renderLegend;
  window.renderLegend = function () {
    const r = prevRenderLegend.apply(this, arguments);
    updateDiscoveredCounts();
    if (searched) applyFilters();
    return r;
  };

  legend.addEventListener("change", e => {
    const id = e.target && e.target.id;
    if ((id === "dietHalal" || id === "dietVeg") && lastRun) {
      setTimeout(() => loadNearbyDiscoveries(currentTheme, lastRun.lat, lastRun.lng), 0);
    }
  });

  // ---------------------------------------------------------------
  // Translate the opened place's name and address only
  // ---------------------------------------------------------------
  const hasKorean = /[\uac00-\ud7af]/;
  function cacheGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function cacheSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  let drawerToken = 0;
  const prevOpenDrawer = window.openDrawer;
  window.openDrawer = function (site) {
    prevOpenDrawer.apply(this, arguments);
    if (!site) return;
    const lg = lang();
    const name = site.name || "";
    const addr = site.address || "";
    if (lg === "ko" || (!hasKorean.test(name) && !hasKorean.test(addr))) return;

    const my = ++drawerToken;
    const key = "ggtn:" + lg + ":" + name + "|" + addr;
    const show = pair => {
      if (my !== drawerToken || !pair) return;
      const h2 = drawerContent.querySelector("h2");
      const loc = drawerContent.querySelector(".loc");
      if (h2 && pair[0] && pair[0] !== name) {
        h2.textContent = pair[0];
        const orig = document.createElement("div");
        orig.style.cssText = "font-size:13px;opacity:.6;margin-top:2px;font-weight:400";
        orig.textContent = name;
        h2.insertAdjacentElement("afterend", orig);
      }
      if (loc && pair[1] && pair[1] !== addr) {
        loc.textContent = pair[1];
        const k = document.createElement("div");
        k.style.cssText = "opacity:.6;margin-top:2px";
        k.textContent = addr; // Korean address stays visible for taxis
        loc.appendChild(k);
      }
    };

    const hit = cacheGet(key);
    if (hit) return show(hit);
    post({ type: "translate", texts: [name, addr], targetLang: lg })
      .then(d => {
        if (d.translations && d.translations.length === 2) {
          cacheSet(key, d.translations);
          show(d.translations);
        }
      }).catch(() => {});
  };
})();
