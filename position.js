// =================================================================
// Gil & Go: live position dot + recenter button
//
// Load AFTER directions.js in index.html:
//   <script src="position.js?v=1"></script>
// =================================================================
(function () {
  "use strict";

  const L = {
    en: { recenter: "Show my location", off: "Location is off. Allow location for this site in your browser settings." },
    ko: { recenter: "내 위치 보기", off: "위치 권한이 꺼져 있어요. 브라우저 설정에서 이 사이트의 위치를 허용해 주세요." },
    zh: { recenter: "显示我的位置", off: "定位已关闭。请在浏览器设置中允许此网站使用位置。" },
    ja: { recenter: "現在地を表示", off: "位置情報がオフです。ブラウザの設定でこのサイトの位置情報を許可してください。" },
    ru: { recenter: "Моё местоположение", off: "Геолокация выключена. Разрешите доступ к местоположению для этого сайта в настройках браузера." },
    es: { recenter: "Mostrar mi ubicación", off: "La ubicación está desactivada. Permítela para este sitio en los ajustes del navegador." },
    fr: { recenter: "Afficher ma position", off: "La localisation est désactivée. Autorisez-la pour ce site dans les réglages du navigateur." },
    vi: { recenter: "Hiện vị trí của tôi", off: "Vị trí đang tắt. Hãy cho phép trang này dùng vị trí trong cài đặt trình duyệt." },
    th: { recenter: "แสดงตำแหน่งของฉัน", off: "ตำแหน่งปิดอยู่ อนุญาตให้เว็บไซต์นี้ใช้ตำแหน่งในการตั้งค่าเบราว์เซอร์" }
  };
  function lang() { return (document.documentElement.lang || "en").slice(0, 2).toLowerCase(); }
  function t(k) { return (L[lang()] || L.en)[k] || L.en[k]; }

  const style = document.createElement("style");
  style.textContent = `
  .ggp-dot { position: relative; width: 18px; height: 18px; transform: translate(-50%, -50%); pointer-events: none; }
  .ggp-dot::before { content: ""; position: absolute; inset: -9px; border-radius: 50%;
    background: rgba(26,115,232,.28); animation: ggp-pulse 2s ease-out infinite; }
  .ggp-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%;
    background: #1a73e8; border: 3px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,.35); box-sizing: border-box; }
  @keyframes ggp-pulse { 0% { transform: scale(.5); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }
  @media (prefers-reduced-motion: reduce) { .ggp-dot::before { animation: none; } }

  .ggp-btn { position: fixed; right: 16px; bottom: 84px; z-index: 900; width: 46px; height: 46px; border-radius: 50%;
    border: 0; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.25); display: flex; align-items: center;
    justify-content: center; cursor: pointer; padding: 0; color: #5f6368; }
  .ggp-btn.live { color: #1a73e8; }
  .ggp-btn:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
  .ggp-btn svg { width: 24px; height: 24px; }
  .ggp-toast { position: fixed; left: 50%; bottom: 140px; transform: translateX(-50%); z-index: 950;
    max-width: min(90vw, 360px); background: rgba(32,33,36,.92); color: #fff; font-size: 14px; line-height: 1.4;
    padding: 10px 14px; border-radius: 10px; text-align: center; }
  `;
  document.head.appendChild(style);

  // ---------------------------------------------------------------
  // Find the Kakao map (it may be created after this file loads)
  // ---------------------------------------------------------------
  function findMap() {
    if (!window.kakao || !kakao.maps || !kakao.maps.Map) return null;
    try { if (typeof map !== "undefined" && map instanceof kakao.maps.Map) return map; } catch (e) {}
    for (const k of ["map", "kakaoMap", "mapInstance"]) {
      if (window[k] instanceof kakao.maps.Map) return window[k];
    }
    return null;
  }

  let tries = 0;
  (function waitForMap() {
    const m = findMap();
    if (m) return start(m);
    if (++tries > 60) return console.warn("[GG position] Kakao map not found.");
    setTimeout(waitForMap, 500);
  })();

  function start(kmap) {
    let pos = null;
    let overlay = null;
    let circle = null;

    // Button
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ggp-btn";
    btn.setAttribute("aria-label", t("recenter"));
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm8.94 3A8.99 8.99 0 0 0 13 3.06V1h-2v2.06A8.99 8.99 0 0 0 3.06 11H1v2h2.06A8.99 8.99 0 0 0 11 20.94V23h2v-2.06A8.99 8.99 0 0 0 20.94 13H23v-2h-2.06zM12 19a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/></svg>';
    document.body.appendChild(btn);
    document.addEventListener("languagechange", () => btn.setAttribute("aria-label", t("recenter")));

    function toast(msg) {
      const old = document.querySelector(".ggp-toast");
      if (old) old.remove();
      const n = document.createElement("div");
      n.className = "ggp-toast";
      n.setAttribute("role", "status");
      n.textContent = msg;
      document.body.appendChild(n);
      setTimeout(() => n.remove(), 4000);
    }

    function draw() {
      const ll = new kakao.maps.LatLng(pos.lat, pos.lng);
      if (!overlay) {
        const dot = document.createElement("div");
        dot.className = "ggp-dot";
        overlay = new kakao.maps.CustomOverlay({ position: ll, content: dot, zIndex: 5, clickable: false });
        overlay.setMap(kmap);
        circle = new kakao.maps.Circle({
          center: ll, radius: pos.acc, strokeWeight: 1, strokeColor: "#1a73e8", strokeOpacity: 0.35,
          fillColor: "#1a73e8", fillOpacity: 0.1
        });
        circle.setMap(kmap);
      } else {
        overlay.setPosition(ll);
        circle.setPosition(ll);
        circle.setRadius(pos.acc);
      }
      // Hide the accuracy circle when it's too vague to be useful.
      circle.setMap(pos.acc <= 300 ? kmap : null);
      btn.classList.add("live");
    }

    function onPos(p) {
      pos = { lat: p.coords.latitude, lng: p.coords.longitude, acc: Math.min(p.coords.accuracy || 50, 2000) };
      window.ggMyPos = { lat: pos.lat, lng: pos.lng };
      draw();
    }

    let watching = false;
    function watch(onFail) {
      if (!navigator.geolocation) { onFail && onFail(); return; }
      if (watching) return;
      watching = true;
      navigator.geolocation.watchPosition(onPos, err => {
        watching = false;
        btn.classList.remove("live");
        if (err.code === 1) onFail && onFail();
      }, { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 });
    }

    function recenter() {
      if (!pos) return;
      const ll = new kakao.maps.LatLng(pos.lat, pos.lng);
      if (kmap.getLevel() > 5) kmap.setLevel(4);
      kmap.panTo(ll);
    }

    btn.addEventListener("click", () => {
      if (pos) return recenter();
      // No position yet: ask, then move once it arrives.
      if (!navigator.geolocation) return toast(t("off"));
      navigator.geolocation.getCurrentPosition(p => { onPos(p); recenter(); watch(); },
        err => { if (err.code === 1) toast(t("off")); },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
    });

    // Start the dot quietly if permission was already given.
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then(s => {
        if (s.state === "granted") watch();
      }).catch(() => {});
    }
  }
})();
