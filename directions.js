// =================================================================
// Gil & Go: Get directions (Subway / Bus / Taxi / Walk)
// Replaces the small "Get Directions" link in the drawer.
// Opens the Kakao Map app with start + destination already filled.
// If the app isn't installed, opens Kakao Map on the web with the
// same route instead.
//
// Load AFTER reviews.js in index.html:
//   <script src="directions.js?v=1"></script>
// =================================================================
(function () {
  "use strict";

  const L = {
    en: { title: "Get directions", subway: "Subway", bus: "Bus", taxi: "Taxi", walk: "Walk", from_here: "From your current location", no_loc: "Turn on location to start the route from where you are", me: "My location" },
    ko: { title: "길찾기", subway: "지하철", bus: "버스", taxi: "택시", walk: "도보", from_here: "현재 위치에서 출발", no_loc: "위치를 켜면 현재 위치에서 출발해요", me: "내 위치" },
    zh: { title: "路线", subway: "地铁", bus: "公交", taxi: "出租车", walk: "步行", from_here: "从你的当前位置出发", no_loc: "开启定位即可从当前位置出发", me: "我的位置" },
    ja: { title: "ルート案内", subway: "地下鉄", bus: "バス", taxi: "タクシー", walk: "徒歩", from_here: "現在地から出発", no_loc: "位置情報をオンにすると現在地から出発します", me: "現在地" },
    ru: { title: "Как добраться", subway: "Метро", bus: "Автобус", taxi: "Такси", walk: "Пешком", from_here: "От вашего местоположения", no_loc: "Включите геолокацию, чтобы маршрут начинался от вас", me: "Моё местоположение" },
    es: { title: "Cómo llegar", subway: "Metro", bus: "Autobús", taxi: "Taxi", walk: "A pie", from_here: "Desde tu ubicación actual", no_loc: "Activa la ubicación para salir desde donde estás", me: "Mi ubicación" },
    fr: { title: "Itinéraire", subway: "Métro", bus: "Bus", taxi: "Taxi", walk: "À pied", from_here: "Depuis votre position", no_loc: "Activez la localisation pour partir de votre position", me: "Ma position" },
    vi: { title: "Chỉ đường", subway: "Tàu điện ngầm", bus: "Xe buýt", taxi: "Taxi", walk: "Đi bộ", from_here: "Từ vị trí hiện tại của bạn", no_loc: "Bật vị trí để bắt đầu từ chỗ bạn đang đứng", me: "Vị trí của tôi" },
    th: { title: "เส้นทาง", subway: "รถไฟใต้ดิน", bus: "รถเมล์", taxi: "แท็กซี่", walk: "เดิน", from_here: "เริ่มจากตำแหน่งปัจจุบันของคุณ", no_loc: "เปิดตำแหน่งเพื่อเริ่มเส้นทางจากที่คุณอยู่", me: "ตำแหน่งของฉัน" }
  };
  function lang() { return (document.documentElement.lang || "en").slice(0, 2).toLowerCase(); }
  function t(k) { return (L[lang()] || L.en)[k] || L.en[k]; }

  const style = document.createElement("style");
  style.textContent = `
  .ggx { margin: 16px 0 6px; }
  .ggx h3 { font-size: 20px; font-weight: 700; margin: 0 0 2px; }
  .ggx-sub { font-size: 13px; opacity: .65; margin: 0 0 10px; }
  .ggx-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .ggx-grid a { display: flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px;
    border-radius: 12px; border: 1.5px solid currentColor; background: rgba(127,127,127,.14);
    color: inherit; text-decoration: none; font-size: 15px; font-weight: 700; }
  .ggx-grid a:active { background: rgba(127,127,127,.3); }
  .ggx-grid a:focus-visible { outline: 3px solid currentColor; outline-offset: 2px; }
  .ggx-ico { font-size: 18px; line-height: 1; }
  `;
  document.head.appendChild(style);

  function el(tag, attrs, text) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function pick(o, keys) { for (const k of keys) if (o && o[k] != null && o[k] !== "") return o[k]; return null; }
  function clean(s) { return String(s || "").replace(/[,/]/g, " ").trim() || "Destination"; }

  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  // ---------------------------------------------------------------
  // User position: fetched when the drawer opens, so the buttons
  // are ready before the tap (no waiting, no page glitch).
  // ---------------------------------------------------------------
  let myPos = null;
  function refreshPosition(cb) {
    if (!navigator.geolocation) return cb && cb();
    navigator.geolocation.getCurrentPosition(
      p => { myPos = { lat: p.coords.latitude, lng: p.coords.longitude }; cb && cb(); },
      () => cb && cb(),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }

  // ---------------------------------------------------------------
  // Link builders
  // ---------------------------------------------------------------
  const MODES = {
    subway: { icon: "🚇", app: "PUBLICTRANSIT", web: "traffic" },
    bus:    { icon: "🚌", app: "PUBLICTRANSIT", web: "traffic" },
    walk:   { icon: "🚶", app: "FOOT",          web: "walk" },
    taxi:   { icon: "🚕", app: "CAR",           web: "car" }
  };

  function webUrl(mode, dest) {
    const d = clean(dest.name) + "," + dest.lat + "," + dest.lng;
    if (myPos) {
      return "https://map.kakao.com/link/by/" + MODES[mode].web + "/" +
        clean(t("me")) + "," + myPos.lat + "," + myPos.lng + "/" + d;
    }
    return "https://map.kakao.com/link/to/" + d;
  }

  function appUrl(mode, dest) {
    if (mode === "taxi") {
      let q = "dest_lat=" + dest.lat + "&dest_lng=" + dest.lng;
      if (myPos) q += "&origin_lat=" + myPos.lat + "&origin_lng=" + myPos.lng;
      return "kakaot://taxi?" + q;
    }
    let q = "ep=" + dest.lat + "," + dest.lng + "&by=" + MODES[mode].app;
    if (myPos) q = "sp=" + myPos.lat + "," + myPos.lng + "&" + q;
    return "kakaomap://route?" + q;
  }

  // Android: an intent link opens the app, or the browser falls back
  // to the web route by itself if the app isn't installed.
  function androidIntent(mode, dest) {
    const app = appUrl(mode, dest);
    const scheme = app.split("://")[0];
    const rest = app.split("://")[1];
    const pkg = mode === "taxi" ? "com.kakao.taxi" : "net.daum.android.map";
    return "intent://" + rest + "#Intent;scheme=" + scheme + ";package=" + pkg +
      ";S.browser_fallback_url=" + encodeURIComponent(webUrl(mode, dest)) + ";end";
  }

  function setLinks(grid, dest) {
    grid.querySelectorAll("a[data-mode]").forEach(a => {
      const mode = a.dataset.mode;
      if (isAndroid) {
        a.href = androidIntent(mode, dest);
        a.removeAttribute("target");
      } else if (isIOS) {
        a.href = appUrl(mode, dest);
        a.removeAttribute("target");
      } else {
        a.href = webUrl(mode, dest);
        a.target = "_blank";
        a.rel = "noopener";
      }
    });
  }

  // iPhone: try the app; if the page is still showing a moment later,
  // the app isn't installed, so open the web route in a new tab.
  function iosFallback(e, mode, dest) {
    let left = false;
    const onHide = () => { left = true; };
    document.addEventListener("visibilitychange", onHide, { once: true });
    window.addEventListener("pagehide", onHide, { once: true });
    setTimeout(() => {
      if (!left && document.visibilityState === "visible") {
        window.location.href = webUrl(mode, dest);
      }
    }, 1500);
  }

  // Hide the old small directions link.
  function hideOldLink(container) {
    let found = null;
    container.querySelectorAll("a, button").forEach(n => {
      if (n.closest(".ggx")) return;
      const txt = (n.textContent || "").toLowerCase();
      const href = n.getAttribute("href") || "";
      if (txt.includes("get directions") || /map\.kakao\.com\/link\/(to|by)/.test(href)) {
        const row = n.parentElement && n.parentElement.children.length === 1 ? n.parentElement : n;
        if (!found) found = row;
        row.style.display = "none";
      }
    });
    return found;
  }

  // ---------------------------------------------------------------
  // Hook into the drawer
  // ---------------------------------------------------------------
  if (typeof window.openDrawer !== "function") {
    console.warn("[GG directions] openDrawer not found. Load directions.js after reviews.js.");
    return;
  }

  const prevOpenDrawer = window.openDrawer;
  window.openDrawer = function (site) {
    prevOpenDrawer.apply(this, arguments);
    if (!site) return;

    const container = (typeof drawerContent !== "undefined" && drawerContent) ||
      document.getElementById("drawerContent");
    if (!container) return;

    const lat = parseFloat(pick(site, ["lat", "latitude", "y", "mapy"]));
    const lng = parseFloat(pick(site, ["lng", "lon", "longitude", "x", "mapx"]));
    if (!isFinite(lat) || !isFinite(lng)) return;
    const dest = { name: site.name || site.place_name || site.title || "", lat, lng };

    const old = container.querySelector(".ggx");
    if (old) old.remove();

    const box = el("section", { class: "ggx" });
    box.appendChild(el("h3", null, t("title")));
    const sub = el("p", { class: "ggx-sub" }, myPos ? t("from_here") : t("no_loc"));
    box.appendChild(sub);

    const grid = el("div", { class: "ggx-grid" });
    ["subway", "bus", "taxi", "walk"].forEach(mode => {
      const a = el("a", { "data-mode": mode, href: "#" });
      a.appendChild(el("span", { class: "ggx-ico", "aria-hidden": "true" }, MODES[mode].icon));
      a.appendChild(el("span", null, t(mode)));
      a.addEventListener("click", e => {
        if (isIOS) iosFallback(e, mode, dest);
      });
      grid.appendChild(a);
    });
    box.appendChild(grid);
    setLinks(grid, dest);

    // Put it where the old link was; otherwise above the reviews.
    const oldRow = hideOldLink(container);
    const reviews = container.querySelector(".ggr");
    const details = container.querySelector(".ggd");
    if (oldRow) oldRow.insertAdjacentElement("beforebegin", box);
    else if (reviews) reviews.insertAdjacentElement("beforebegin", box);
    else if (details) details.insertAdjacentElement("afterend", box);
    else container.appendChild(box);

    // Update the links once the current position arrives.
    refreshPosition(() => {
      if (!box.isConnected) return;
      sub.textContent = myPos ? t("from_here") : t("no_loc");
      setLinks(grid, dest);
    });
  };
})();
