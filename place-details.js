// =================================================================
// Gil & Go: place details in the pin drawer
// Photos, opening hours, closed days, parking, fees, and
// booking / call / website buttons.
//
// Load AFTER gilgo-patch.js in index.html:
//   <script src="place-details.js?v=1"></script>
// =================================================================
(function () {
  "use strict";

  const WORKER = "https://gil-and-go-backend.marwahshaikh2001.workers.dev";

  // ---------------------------------------------------------------
  // 1. Interface text in the nine languages
  // ---------------------------------------------------------------
  const L = {
    en: { hours: "Hours", closed: "Closed", parking: "Parking", fee: "Fee", checkin: "Check-in", checkout: "Check-out", book: "Book", tickets: "Tickets", call: "Call", web: "Website", kakao: "Open in Kakao Map", loading: "Loading details…", none: "No hours or parking info for this place yet. Kakao Map may have it.", web_photos: "Photos from the web via Naver" },
    ko: { hours: "운영시간", closed: "휴무일", parking: "주차", fee: "요금", checkin: "체크인", checkout: "체크아웃", book: "예약", tickets: "티켓", call: "전화", web: "웹사이트", kakao: "카카오맵에서 보기", loading: "정보 불러오는 중…", none: "아직 운영시간·주차 정보가 없어요. 카카오맵에서 확인해 보세요.", web_photos: "네이버 웹 이미지" },
    zh: { hours: "营业时间", closed: "休息日", parking: "停车", fee: "费用", checkin: "入住", checkout: "退房", book: "预订", tickets: "购票", call: "致电", web: "官网", kakao: "在 Kakao 地图中打开", loading: "正在加载…", none: "暂无营业时间或停车信息，可在 Kakao 地图查看。", web_photos: "图片来自 Naver 网络搜索" },
    ja: { hours: "営業時間", closed: "定休日", parking: "駐車場", fee: "料金", checkin: "チェックイン", checkout: "チェックアウト", book: "予約", tickets: "チケット", call: "電話", web: "ウェブサイト", kakao: "カカオマップで開く", loading: "読み込み中…", none: "営業時間や駐車場の情報はまだありません。カカオマップで確認できます。", web_photos: "Naverのウェブ画像" },
    ru: { hours: "Часы работы", closed: "Выходные", parking: "Парковка", fee: "Цена", checkin: "Заезд", checkout: "Выезд", book: "Забронировать", tickets: "Билеты", call: "Позвонить", web: "Сайт", kakao: "Открыть в Kakao Map", loading: "Загрузка…", none: "Пока нет данных о часах работы и парковке. Проверьте в Kakao Map.", web_photos: "Фото из интернета через Naver" },
    es: { hours: "Horario", closed: "Cerrado", parking: "Aparcamiento", fee: "Precio", checkin: "Entrada", checkout: "Salida", book: "Reservar", tickets: "Entradas", call: "Llamar", web: "Sitio web", kakao: "Abrir en Kakao Map", loading: "Cargando…", none: "Aún no hay horario ni aparcamiento. Puedes consultarlo en Kakao Map.", web_photos: "Fotos de la web vía Naver" },
    fr: { hours: "Horaires", closed: "Fermé", parking: "Parking", fee: "Tarif", checkin: "Arrivée", checkout: "Départ", book: "Réserver", tickets: "Billets", call: "Appeler", web: "Site web", kakao: "Ouvrir dans Kakao Map", loading: "Chargement…", none: "Pas encore d'horaires ni d'infos parking. Kakao Map les a peut-être.", web_photos: "Photos du web via Naver" },
    vi: { hours: "Giờ mở cửa", closed: "Ngày nghỉ", parking: "Bãi đỗ xe", fee: "Giá", checkin: "Nhận phòng", checkout: "Trả phòng", book: "Đặt chỗ", tickets: "Mua vé", call: "Gọi", web: "Trang web", kakao: "Mở trong Kakao Map", loading: "Đang tải…", none: "Chưa có giờ mở cửa hoặc bãi đỗ xe. Hãy xem trên Kakao Map.", web_photos: "Ảnh từ web qua Naver" },
    th: { hours: "เวลาเปิด", closed: "วันหยุด", parking: "ที่จอดรถ", fee: "ค่าเข้า", checkin: "เช็คอิน", checkout: "เช็คเอาท์", book: "จอง", tickets: "ซื้อตั๋ว", call: "โทร", web: "เว็บไซต์", kakao: "เปิดใน Kakao Map", loading: "กำลังโหลด…", none: "ยังไม่มีข้อมูลเวลาเปิดหรือที่จอดรถ ดูได้ใน Kakao Map", web_photos: "รูปจากเว็บผ่าน Naver" }
  };
  function lang() { return (document.documentElement.lang || "en").slice(0, 2).toLowerCase(); }
  function t(key) { return (L[lang()] || L.en)[key] || L.en[key]; }

  // ---------------------------------------------------------------
  // 2. Styles (neutral, so they sit inside every belt's colours)
  // ---------------------------------------------------------------
  const css = `
  .ggd { margin: 12px 0 4px; font-size: 14px; line-height: 1.45; }
  .ggd-photos { display: flex; gap: 8px; overflow-x: auto; scroll-snap-type: x mandatory;
    margin: 0 -2px 10px; padding: 2px; -webkit-overflow-scrolling: touch; }
  .ggd-photos img { flex: 0 0 auto; width: 132px; height: 96px; object-fit: cover;
    border-radius: 10px; scroll-snap-align: start; cursor: zoom-in; background: rgba(127,127,127,.15); }
  .ggd-photos img:first-child { width: 200px; }
  .ggd-credit { font-size: 11px; opacity: .55; margin: -6px 0 10px; }
  .ggd-rows { display: grid; grid-template-columns: max-content 1fr; gap: 6px 12px; margin: 0 0 12px; }
  .ggd-rows dt { opacity: .6; white-space: nowrap; }
  .ggd-rows dd { margin: 0; white-space: pre-line; overflow-wrap: anywhere; }
  .ggd-orig { display: block; font-size: 12px; opacity: .5; }
  .ggd-actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .ggd-actions a { display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px;
    border-radius: 999px; border: 1px solid currentColor; color: inherit; text-decoration: none;
    font-weight: 600; font-size: 14px; }
  .ggd-actions a.primary { background: rgba(127,127,127,.22); border-width: 2px; }
  .ggd-actions a:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  .ggd-note { opacity: .6; margin: 0 0 10px; }
  .ggd-view { position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,.9);
    display: flex; align-items: center; justify-content: center; padding: 16px; }
  .ggd-view img { max-width: 100%; max-height: 100%; border-radius: 8px; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---------------------------------------------------------------
  // 3. Helpers
  // ---------------------------------------------------------------
  function pick(o, keys) {
    for (const k of keys) if (o && o[k] != null && o[k] !== "") return o[k];
    return null;
  }
  function el(tag, attrs, text) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  const hasKorean = /[\uac00-\ud7af]/;

  // Pulls coordinates and ids out of whatever shape the site object has.
  function readSite(site) {
    const lat = parseFloat(pick(site, ["lat", "latitude", "y", "mapy"]));
    const lng = parseFloat(pick(site, ["lng", "lon", "longitude", "x", "mapx"]));
    return {
      name: site.name || site.place_name || site.title || "",
      lat: isFinite(lat) ? lat : null,
      lng: isFinite(lng) ? lng : null,
      contentId: pick(site, ["contentid", "contentId", "tourId"]),
      contentTypeId: pick(site, ["contenttypeid", "contentTypeId"]),
      phone: pick(site, ["phone", "tel"]),
      kakaoUrl: pick(site, ["place_url", "placeUrl"]) ||
        (pick(site, ["kakaoId", "place_id"]) ? "https://place.map.kakao.com/" + pick(site, ["kakaoId", "place_id"]) : null)
    };
  }

  // Client cache: details per place, translations per language.
  const detailCache = new Map();
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  async function fetchDetails(s) {
    const key = s.contentId || (s.name + "@" + (s.lat && s.lat.toFixed(4)) + "," + (s.lng && s.lng.toFixed(4)));
    if (detailCache.has(key)) return detailCache.get(key);
    const p = fetch(WORKER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "placeDetail", name: s.name, lat: s.lat, lng: s.lng,
        contentId: s.contentId, contentTypeId: s.contentTypeId })
    }).then(r => r.json()).catch(() => ({ found: false }));
    detailCache.set(key, p);
    return p;
  }

  // One translate call for all Korean info values, cached on this device.
  async function translateValues(values) {
    const lg = lang();
    if (lg === "ko") return values;
    const out = values.slice();
    const todo = [];
    values.forEach((v, i) => {
      if (!v || !hasKorean.test(v)) return;
      const hit = lsGet("ggdt:" + lg + ":" + v);
      if (hit) out[i] = hit; else todo.push(i);
    });
    if (!todo.length) return out;
    try {
      const res = await fetch(WORKER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "translate", texts: todo.map(i => values[i]), targetLang: lg })
      });
      const data = await res.json();
      if (data.translations && data.translations.length === todo.length) {
        todo.forEach((i, j) => {
          const tr = data.translations[j];
          if (tr) { out[i] = tr; lsSet("ggdt:" + lg + ":" + values[i], tr); }
        });
      }
    } catch (e) { /* keep Korean if translation fails */ }
    return out;
  }

  function openViewer(src) {
    const v = el("div", { class: "ggd-view", role: "dialog", "aria-label": "Photo" });
    const img = el("img", { src: src, alt: "", referrerpolicy: "no-referrer" });
    v.appendChild(img);
    v.addEventListener("click", () => v.remove());
    document.body.appendChild(v);
  }

  // ---------------------------------------------------------------
  // 4. Render
  // ---------------------------------------------------------------
  function mapsLink(s) {
    if (s.kakaoUrl) return s.kakaoUrl;
    if (s.lat != null) return "https://map.kakao.com/link/map/" + encodeURIComponent(s.name) + "," + s.lat + "," + s.lng;
    return "https://map.kakao.com/?q=" + encodeURIComponent(s.name);
  }

  function renderActions(box, s, d) {
    const row = el("div", { class: "ggd-actions" });
    const add = (href, label, primary) => {
      const a = el("a", { href: href, class: primary ? "primary" : "" });
      if (!href.startsWith("tel:")) { a.target = "_blank"; a.rel = "noopener"; }
      a.appendChild(el("span", null, label));
      row.appendChild(a);
    };
    const links = (d && d.links) || {};
    if (links.book) add(links.book, t("book"), true);
    if (links.tickets) add(links.tickets, t("tickets"), !links.book);
    const tel = s.phone || (d && d.tel);
    if (tel) add("tel:" + String(tel).replace(/[^\d+]/g, ""), t("call"), false);
    if (links.homepage) add(links.homepage, t("web"), false);
    add(mapsLink(s), t("kakao"), false);
    box.appendChild(row);
  }

  async function renderInfo(box, s, d, token) {
    const info = (d && d.info) || {};
    const order = ["hours", "closed", "parking", "fee", "checkin", "checkout"];
    const keys = order.filter(k => info[k]);

    // Photos
    const photos = (d && d.photos) || [];
    if (photos.length) {
      const strip = el("div", { class: "ggd-photos" });
      photos.slice(0, 8).forEach(p => {
        const img = el("img", { src: p.thumb || p.url, alt: s.name, loading: "lazy", referrerpolicy: "no-referrer" });
        img.addEventListener("click", () => openViewer(p.url || p.thumb));
        img.addEventListener("error", () => img.remove());
        strip.appendChild(img);
      });
      box.appendChild(strip);
      if (d.photoSource === "naver") box.appendChild(el("div", { class: "ggd-credit" }, t("web_photos")));
    }

    if (keys.length) {
      const dl = el("dl", { class: "ggd-rows" });
      const dds = keys.map(k => {
        dl.appendChild(el("dt", null, t(k)));
        const dd = el("dd", null, info[k]);
        dl.appendChild(dd);
        return dd;
      });
      box.appendChild(dl);

      // Swap in translations when they arrive.
      translateValues(keys.map(k => info[k])).then(tr => {
        if (token !== openToken) return;
        keys.forEach((k, i) => {
          if (tr[i] === info[k]) return;
          dds[i].textContent = tr[i];
        });
      });
    } else {
      box.appendChild(el("p", { class: "ggd-note" }, t("none")));
    }

    renderActions(box, s, d);
  }

  // ---------------------------------------------------------------
  // 5. Hook into the drawer
  // ---------------------------------------------------------------
  let openToken = 0;
  let loggedFields = false;

  if (typeof window.openDrawer !== "function") {
    console.warn("[GG details] openDrawer not found. Is place-details.js loaded after gilgo-patch.js?");
    return;
  }

  const prevOpenDrawer = window.openDrawer;
  window.openDrawer = function (site) {
    prevOpenDrawer.apply(this, arguments);
    if (!site) return;

    if (!loggedFields) {
      console.log("[GG details] site fields:", Object.keys(site), site);
      loggedFields = true;
    }

    const container = (typeof drawerContent !== "undefined" && drawerContent) ||
      document.getElementById("drawerContent");
    if (!container) return;

    const token = ++openToken;
    const s = readSite(site);

    const old = container.querySelector(".ggd");
    if (old) old.remove();

    const box = el("section", { class: "ggd", "aria-live": "polite" });
    const loading = el("p", { class: "ggd-note" }, t("loading"));
    box.appendChild(loading);

    const loc = container.querySelector(".loc");
    if (loc) loc.insertAdjacentElement("afterend", box);
    else container.appendChild(box);

    fetchDetails(s).then(d => {
      if (token !== openToken || !box.isConnected) return;
      loading.remove();
      renderInfo(box, s, d, token);
    });
  };
})();
