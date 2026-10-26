// =================================================================
// Gil & Go: Get directions (Subway / Bus / Walk / Car / Taxi)
//
// Subway, Bus, Walk: open Kakao Map with start + destination filled.
// Car, Taxi: show the road route on the Gil & Go map, with time,
// distance and an estimated taxi fare (from the Worker "directions"
// request, which calls the Kakao Mobility Directions API). From the
// card you can open Kakao T, Uber or Kakao Map, or show the address
// to a taxi driver in large Korean text.
//
// Load AFTER reviews.js in index.html:
//   <script src="directions.js?v=3"></script>
// =================================================================
(function () {
  "use strict";

  const WORKER = "https://gil-and-go-backend.marwahshaikh2001.workers.dev";

  const L = {
    en: { title: "Get directions", subway: "Subway", bus: "Bus", taxi: "Taxi", walk: "Walk", car: "Car", from_here: "From your current location", no_loc: "Turn on location to start the route from where you are", me: "My location",
          loading: "Finding the best road route…", need_loc: "Turn on location to see the route and fare from where you are.", err: "Couldn't load the route right now. You can still open the apps below.",
          fare: "Taxi fare", est: "Estimate. Night surcharge and traffic can change the price.", toll: "Tolls", kakaot: "Kakao T", uber: "Uber", driver: "Show address to driver", drive: "Start in Kakao Map", close: "Close", min: "min", hr: "h" },
    ko: { title: "길찾기", subway: "지하철", bus: "버스", taxi: "택시", walk: "도보", car: "자동차", from_here: "현재 위치에서 출발", no_loc: "위치를 켜면 현재 위치에서 출발해요", me: "내 위치",
          loading: "도로 경로를 찾는 중…", need_loc: "위치를 켜면 현재 위치부터 경로와 요금을 볼 수 있어요.", err: "지금은 경로를 불러올 수 없어요. 아래 앱으로 열 수 있어요.",
          fare: "예상 택시 요금", est: "예상 요금이에요. 심야 할증과 교통 상황에 따라 달라질 수 있어요.", toll: "통행료", kakaot: "카카오 T", uber: "우버", driver: "기사님께 주소 보여주기", drive: "카카오맵으로 출발", close: "닫기", min: "분", hr: "시간" },
    zh: { title: "路线", subway: "地铁", bus: "公交", taxi: "出租车", walk: "步行", car: "自驾", from_here: "从你的当前位置出发", no_loc: "开启定位即可从当前位置出发", me: "我的位置",
          loading: "正在查找道路路线…", need_loc: "开启定位即可查看从你所在位置出发的路线和车费。", err: "暂时无法加载路线。你仍可通过下方应用打开。",
          fare: "出租车车费", est: "仅为估算。夜间加价和路况可能改变价格。", toll: "通行费", kakaot: "Kakao T", uber: "Uber", driver: "给司机看地址", drive: "在 Kakao Map 中出发", close: "关闭", min: "分钟", hr: "小时" },
    ja: { title: "ルート案内", subway: "地下鉄", bus: "バス", taxi: "タクシー", walk: "徒歩", car: "車", from_here: "現在地から出発", no_loc: "位置情報をオンにすると現在地から出発します", me: "現在地",
          loading: "道路ルートを検索中…", need_loc: "位置情報をオンにすると、現在地からのルートと料金が表示されます。", err: "ルートを読み込めませんでした。下のアプリで開けます。",
          fare: "タクシー料金", est: "目安です。深夜割増や渋滞で変わることがあります。", toll: "通行料", kakaot: "Kakao T", uber: "Uber", driver: "運転手に住所を見せる", drive: "Kakao Mapで出発", close: "閉じる", min: "分", hr: "時間" },
    ru: { title: "Как добраться", subway: "Метро", bus: "Автобус", taxi: "Такси", walk: "Пешком", car: "Авто", from_here: "От вашего местоположения", no_loc: "Включите геолокацию, чтобы маршрут начинался от вас", me: "Моё местоположение",
          loading: "Ищем маршрут по дорогам…", need_loc: "Включите геолокацию, чтобы увидеть маршрут и цену от вашего места.", err: "Не удалось загрузить маршрут. Можно открыть приложения ниже.",
          fare: "Цена такси", est: "Примерно. Ночная надбавка и пробки могут изменить цену.", toll: "Платные дороги", kakaot: "Kakao T", uber: "Uber", driver: "Показать адрес водителю", drive: "Поехать в Kakao Map", close: "Закрыть", min: "мин", hr: "ч" },
    es: { title: "Cómo llegar", subway: "Metro", bus: "Autobús", taxi: "Taxi", walk: "A pie", car: "Coche", from_here: "Desde tu ubicación actual", no_loc: "Activa la ubicación para salir desde donde estás", me: "Mi ubicación",
          loading: "Buscando la ruta por carretera…", need_loc: "Activa la ubicación para ver la ruta y la tarifa desde donde estás.", err: "No se pudo cargar la ruta. Puedes abrir las apps de abajo.",
          fare: "Tarifa de taxi", est: "Estimación. El recargo nocturno y el tráfico pueden cambiar el precio.", toll: "Peajes", kakaot: "Kakao T", uber: "Uber", driver: "Mostrar dirección al conductor", drive: "Ir con Kakao Map", close: "Cerrar", min: "min", hr: "h" },
    fr: { title: "Itinéraire", subway: "Métro", bus: "Bus", taxi: "Taxi", walk: "À pied", car: "Voiture", from_here: "Depuis votre position", no_loc: "Activez la localisation pour partir de votre position", me: "Ma position",
          loading: "Recherche de l'itinéraire routier…", need_loc: "Activez la localisation pour voir l'itinéraire et le prix depuis votre position.", err: "Impossible de charger l'itinéraire. Vous pouvez ouvrir les applis ci-dessous.",
          fare: "Prix du taxi", est: "Estimation. La majoration de nuit et la circulation peuvent changer le prix.", toll: "Péages", kakaot: "Kakao T", uber: "Uber", driver: "Montrer l'adresse au chauffeur", drive: "Partir avec Kakao Map", close: "Fermer", min: "min", hr: "h" },
    vi: { title: "Chỉ đường", subway: "Tàu điện ngầm", bus: "Xe buýt", taxi: "Taxi", walk: "Đi bộ", car: "Ô tô", from_here: "Từ vị trí hiện tại của bạn", no_loc: "Bật vị trí để bắt đầu từ chỗ bạn đang đứng", me: "Vị trí của tôi",
          loading: "Đang tìm đường đi…", need_loc: "Bật vị trí để xem đường đi và giá từ chỗ bạn đang đứng.", err: "Không tải được đường đi. Bạn vẫn có thể mở các ứng dụng bên dưới.",
          fare: "Giá taxi", est: "Giá ước tính. Phụ phí ban đêm và kẹt xe có thể làm thay đổi giá.", toll: "Phí cầu đường", kakaot: "Kakao T", uber: "Uber", driver: "Cho tài xế xem địa chỉ", drive: "Đi bằng Kakao Map", close: "Đóng", min: "phút", hr: "giờ" },
    th: { title: "เส้นทาง", subway: "รถไฟใต้ดิน", bus: "รถเมล์", taxi: "แท็กซี่", walk: "เดิน", car: "รถยนต์", from_here: "เริ่มจากตำแหน่งปัจจุบันของคุณ", no_loc: "เปิดตำแหน่งเพื่อเริ่มเส้นทางจากที่คุณอยู่", me: "ตำแหน่งของฉัน",
          loading: "กำลังหาเส้นทางถนน…", need_loc: "เปิดตำแหน่งเพื่อดูเส้นทางและค่าโดยสารจากที่คุณอยู่", err: "โหลดเส้นทางไม่ได้ในตอนนี้ คุณยังเปิดแอปด้านล่างได้",
          fare: "ค่าแท็กซี่", est: "ราคาโดยประมาณ ค่าธรรมเนียมกลางคืนและการจราจรอาจทำให้ราคาเปลี่ยน", toll: "ค่าทางด่วน", kakaot: "Kakao T", uber: "Uber", driver: "ให้คนขับดูที่อยู่", drive: "เริ่มด้วย Kakao Map", close: "ปิด", min: "นาที", hr: "ชม." }
  };
  function lang() { return (document.documentElement.lang || "en").slice(0, 2).toLowerCase(); }
  function t(k) { return (L[lang()] || L.en)[k] || L.en[k]; }

  const style = document.createElement("style");
  style.textContent = `
  .ggx { margin: 16px 0 6px; }
  .ggx h3 { font-size: 20px; font-weight: 700; margin: 0 0 2px; }
  .ggx-sub { font-size: 13px; opacity: .65; margin: 0 0 10px; }
  .ggx-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .ggx-grid a, .ggx-grid button { display: flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px;
    border-radius: 12px; border: 1.5px solid currentColor; background: rgba(127,127,127,.14);
    color: inherit; text-decoration: none; font: inherit; font-size: 15px; font-weight: 700; cursor: pointer; padding: 0 8px; }
  .ggx-grid .ggx-wide { grid-column: 1 / -1; }
  .ggx-grid a:active, .ggx-grid button:active { background: rgba(127,127,127,.3); }
  .ggx-grid button[aria-pressed="true"] { background: var(--ink, #211f1c); color: var(--hanji, #f3ead6); border-color: var(--ink, #211f1c); }
  .ggx-grid a:focus-visible, .ggx-grid button:focus-visible, .ggx-card a:focus-visible, .ggx-card button:focus-visible { outline: 3px solid currentColor; outline-offset: 2px; }
  .ggx-ico { font-size: 18px; line-height: 1; }

  .ggx-card { margin-top: 10px; padding: 14px; border-radius: 14px; border: 1.5px solid var(--line, rgba(0,0,0,.15));
    background: rgba(127,127,127,.08); }
  .ggx-card[hidden] { display: none; }
  .ggx-msg { font-size: 14px; opacity: .75; margin: 0; }
  .ggx-big { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin: 0 0 2px; }
  .ggx-fare { font-size: 26px; font-weight: 800; color: var(--cinnabar, #bf3b2a); font-variant-numeric: tabular-nums; }
  .ggx-time { font-size: 17px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .ggx-meta { font-size: 13px; opacity: .7; margin: 0 0 4px; font-variant-numeric: tabular-nums; }
  .ggx-note { font-size: 12px; opacity: .6; margin: 0 0 12px; }
  .ggx-acts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .ggx-acts a, .ggx-acts button { display: flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px;
    border-radius: 12px; border: 0; font: inherit; font-size: 15px; font-weight: 700; text-decoration: none; cursor: pointer; padding: 0 8px; }
  .ggx-kt { background: #ffe300; color: #1e1e1e; }
  .ggx-ub { background: #000; color: #fff; }
  .ggx-dr { background: var(--ink, #211f1c); color: var(--hanji, #f3ead6); }
  .ggx-show { grid-column: 1 / -1; background: transparent; color: inherit; border: 1.5px solid currentColor !important; }

  .ggx-sheet { position: fixed; inset: 0; z-index: 3000; background: #fff; color: #111; display: flex; flex-direction: column;
    align-items: center; justify-content: center; padding: 32px 20px; text-align: center; gap: 18px; }
  .ggx-sheet .ggx-please { font-size: 22px; font-weight: 700; color: #555; margin: 0; }
  .ggx-sheet .ggx-place { font-size: clamp(34px, 9vw, 64px); font-weight: 800; line-height: 1.2; margin: 0; word-break: keep-all; }
  .ggx-sheet .ggx-addr { font-size: clamp(20px, 5vw, 32px); font-weight: 600; line-height: 1.35; margin: 0; word-break: keep-all; }
  .ggx-sheet button { margin-top: 12px; min-height: 48px; padding: 0 28px; border-radius: 24px; border: 1.5px solid #111;
    background: #fff; color: #111; font: inherit; font-size: 16px; font-weight: 700; cursor: pointer; }
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
  // Link builders (open the Kakao apps / web)
  // ---------------------------------------------------------------
  const MODES = {
    subway: { icon: "🚇", app: "PUBLICTRANSIT", web: "traffic" },
    bus:    { icon: "🚌", app: "PUBLICTRANSIT", web: "traffic" },
    walk:   { icon: "🚶", app: "FOOT",          web: "walk" },
    car:    { icon: "🚗", app: "CAR",           web: "car" },
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

  function linkFor(mode, dest) {
    if (isAndroid) return androidIntent(mode, dest);
    if (isIOS) return appUrl(mode, dest);
    return webUrl(mode, dest);
  }

  // Uber works the same everywhere: opens the app if installed,
  // otherwise Uber on the web, with pickup + drop-off filled in.
  function uberUrl(dest) {
    let q = "action=setPickup";
    if (myPos) q += "&pickup[latitude]=" + myPos.lat + "&pickup[longitude]=" + myPos.lng;
    else q += "&pickup=my_location";
    q += "&dropoff[latitude]=" + dest.lat + "&dropoff[longitude]=" + dest.lng +
      "&dropoff[nickname]=" + encodeURIComponent(dest.name || "Destination");
    return "https://m.uber.com/ul/?" + q;
  }

  function applyLink(a, mode, dest) {
    a.href = linkFor(mode, dest);
    if (!isAndroid && !isIOS) { a.target = "_blank"; a.rel = "noopener"; }
    else a.removeAttribute("target");
  }

  function setLinks(scope, dest) {
    scope.querySelectorAll("a[data-mode]").forEach(a => applyLink(a, a.dataset.mode, dest));
    scope.querySelectorAll("a[data-uber]").forEach(a => { a.href = uberUrl(dest); a.target = "_blank"; a.rel = "noopener"; });
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
  // Road route (Car / Taxi): fetch from the Worker, draw on the map
  // ---------------------------------------------------------------
  const routeCache = new Map();
  function getRoute(from, dest) {
    // Round the start a little so small GPS jitter reuses the same result.
    const key = from.lat.toFixed(3) + "," + from.lng.toFixed(3) + ">" + dest.lat.toFixed(5) + "," + dest.lng.toFixed(5);
    if (routeCache.has(key)) return Promise.resolve(routeCache.get(key));
    return fetch(WORKER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "directions", from: from.lng + "," + from.lat, to: dest.lng + "," + dest.lat })
    })
      .then(r => r.json())
      .then(d => {
        if (!d || d.error || !Array.isArray(d.path)) throw new Error((d && d.error) || "no route");
        routeCache.set(key, d);
        return d;
      });
  }

  function theMap() {
    try { return typeof map !== "undefined" ? map : null; } catch (e) { return null; }
  }

  let routeLine = null;
  function clearRoute() {
    if (routeLine) { routeLine.setMap(null); routeLine = null; }
  }

  function drawRoute(path) {
    const m = theMap();
    if (!m || !window.kakao || !kakao.maps || !path.length) return;
    clearRoute();
    const color = (getComputedStyle(document.body).getPropertyValue("--cinnabar") || "").trim() || "#bf3b2a";
    const pts = path.map(p => new kakao.maps.LatLng(p[0], p[1]));
    routeLine = new kakao.maps.Polyline({
      path: pts, strokeWeight: 6, strokeColor: color, strokeOpacity: 0.9, strokeStyle: "solid"
    });
    routeLine.setMap(m);

    const bounds = new kakao.maps.LatLngBounds();
    pts.forEach(p => bounds.extend(p));
    // Keep the route out from under the drawer.
    let top = 60, right = 40, bottom = 40, left = 40;
    const dr = document.getElementById("drawer");
    if (dr && dr.classList.contains("open")) {
      const r = dr.getBoundingClientRect();
      if (r.width < window.innerWidth * 0.9) right += r.width;
      else bottom += Math.min(r.height, window.innerHeight * 0.6);
    }
    m.setBounds(bounds, top, right, bottom, left);
  }

  // Remove the line when the drawer closes.
  (function watchDrawer() {
    const dr = document.getElementById("drawer");
    if (!dr || !window.MutationObserver) return;
    new MutationObserver(() => { if (!dr.classList.contains("open")) clearRoute(); })
      .observe(dr, { attributes: true, attributeFilter: ["class"] });
  })();

  function fmtTime(sec) {
    const mins = Math.max(1, Math.round(sec / 60));
    if (mins < 60) return mins + " " + t("min");
    const h = Math.floor(mins / 60), m = mins % 60;
    return h + " " + t("hr") + (m ? " " + m + " " + t("min") : "");
  }
  function fmtKm(m) { return (m / 1000).toFixed(m < 10000 ? 1 : 0) + " km"; }
  function fmtWon(n) { return "₩" + Math.round(n).toLocaleString("en-US"); }

  // Big Korean screen to show a taxi driver.
  function showDriverSheet(dest) {
    const sheet = el("div", { class: "ggx-sheet", role: "dialog", "aria-modal": "true", "aria-label": t("driver") });
    sheet.appendChild(el("p", { class: "ggx-please" }, "여기로 가 주세요"));
    sheet.appendChild(el("p", { class: "ggx-place" }, dest.name || ""));
    if (dest.addr) sheet.appendChild(el("p", { class: "ggx-addr" }, dest.addr));
    const close = el("button", { type: "button" }, t("close"));
    const done = () => { sheet.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = e => { if (e.key === "Escape") done(); };
    close.addEventListener("click", done);
    document.addEventListener("keydown", onKey);
    sheet.appendChild(close);
    document.body.appendChild(sheet);
    close.focus();
  }

  function renderCard(card, mode, dest) {
    card.hidden = false;
    card.innerHTML = "";

    // Action buttons (work even without a route).
    const acts = el("div", { class: "ggx-acts" });
    if (mode === "taxi") {
      const kt = el("a", { class: "ggx-kt", "data-mode": "taxi", href: "#" }, t("kakaot"));
      kt.addEventListener("click", e => { if (isIOS) iosFallback(e, "taxi", dest); });
      const ub = el("a", { class: "ggx-ub", "data-uber": "1", href: "#" }, t("uber"));
      const show = el("button", { class: "ggx-show", type: "button" }, "🗣 " + t("driver"));
      show.addEventListener("click", () => showDriverSheet(dest));
      acts.append(kt, ub, show);
    } else {
      const dr = el("a", { class: "ggx-dr ggx-show", "data-mode": "car", href: "#" }, t("drive"));
      dr.addEventListener("click", e => { if (isIOS) iosFallback(e, "car", dest); });
      acts.append(dr);
    }

    const info = el("div");
    card.append(info, acts);
    setLinks(card, dest);

    if (!myPos) {
      info.appendChild(el("p", { class: "ggx-msg", style: "margin-bottom:12px" }, t("need_loc")));
      return;
    }

    info.appendChild(el("p", { class: "ggx-msg", style: "margin-bottom:12px" }, t("loading")));
    const thisReq = {};
    card._req = thisReq;
    getRoute(myPos, dest).then(d => {
      if (card._req !== thisReq || !card.isConnected) return;
      info.innerHTML = "";
      const big = el("p", { class: "ggx-big" });
      if (mode === "taxi" && d.taxi) big.appendChild(el("span", { class: "ggx-fare" }, "≈ " + fmtWon(d.taxi)));
      big.appendChild(el("span", { class: "ggx-time" }, fmtTime(d.duration)));
      info.appendChild(big);
      let meta = fmtKm(d.distance);
      if (d.toll) meta += " · " + t("toll") + " " + fmtWon(d.toll);
      info.appendChild(el("p", { class: "ggx-meta" }, meta));
      if (mode === "taxi") info.appendChild(el("p", { class: "ggx-note" }, t("est")));
      else info.lastChild.style.marginBottom = "12px";
      drawRoute(d.path);
    }).catch(() => {
      if (card._req !== thisReq || !card.isConnected) return;
      info.innerHTML = "";
      info.appendChild(el("p", { class: "ggx-msg", style: "margin-bottom:12px" }, t("err")));
    });
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
    clearRoute();
    if (!site) return;

    const container = (typeof drawerContent !== "undefined" && drawerContent) ||
      document.getElementById("drawerContent");
    if (!container) return;

    const lat = parseFloat(pick(site, ["lat", "latitude", "y", "mapy"]));
    const lng = parseFloat(pick(site, ["lng", "lon", "longitude", "x", "mapx"]));
    if (!isFinite(lat) || !isFinite(lng)) return;
    const dest = {
      name: site.name || site.place_name || site.title || "",
      addr: pick(site, ["road_address_name", "address_name", "addr", "addr1", "address"]) || "",
      lat, lng
    };

    const old = container.querySelector(".ggx");
    if (old) old.remove();

    const box = el("section", { class: "ggx" });
    box.appendChild(el("h3", null, t("title")));
    const sub = el("p", { class: "ggx-sub" }, myPos ? t("from_here") : t("no_loc"));
    box.appendChild(sub);

    const grid = el("div", { class: "ggx-grid" });
    const card = el("div", { class: "ggx-card", "aria-live": "polite" });
    card.hidden = true;
    let active = null;

    // Subway / Bus / Walk: open Kakao Map (as before).
    ["subway", "bus", "walk"].forEach(mode => {
      const a = el("a", { "data-mode": mode, href: "#" });
      a.appendChild(el("span", { class: "ggx-ico", "aria-hidden": "true" }, MODES[mode].icon));
      a.appendChild(el("span", null, t(mode)));
      a.addEventListener("click", e => { if (isIOS) iosFallback(e, mode, dest); });
      grid.appendChild(a);
    });

    // Car / Taxi: show the route + card inside Gil & Go.
    const toggles = {};
    ["car", "taxi"].forEach(mode => {
      const b = el("button", { type: "button", "aria-pressed": "false", class: mode === "taxi" ? "ggx-wide" : "" });
      b.appendChild(el("span", { class: "ggx-ico", "aria-hidden": "true" }, MODES[mode].icon));
      b.appendChild(el("span", null, t(mode)));
      b.addEventListener("click", () => {
        if (active === mode) {           // tap again to close
          active = null; card.hidden = true; card._req = null; clearRoute();
          b.setAttribute("aria-pressed", "false");
          return;
        }
        active = mode;
        Object.keys(toggles).forEach(k => toggles[k].setAttribute("aria-pressed", k === mode ? "true" : "false"));
        if (!myPos) {
          renderCard(card, mode, dest);
          refreshPosition(() => { if (active === mode && box.isConnected) renderCard(card, mode, dest); });
        } else {
          renderCard(card, mode, dest);
        }
      });
      toggles[mode] = b;
      grid.appendChild(b);
    });

    box.appendChild(grid);
    box.appendChild(card);
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
      setLinks(box, dest);
    });
  };
})();
