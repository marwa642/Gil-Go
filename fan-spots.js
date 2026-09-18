// Gil & Go — Fan Spots (K-filming locations + star spots)
// Load LAST, after hallyu-keywords.js.
// Adds a "⭐ Fan Spots" button on the Hallyu belt. Tapping it shows the
// curated spots nearest to the last "Show nearby" search (or all of Korea).
// Needs the Kakao Maps SDK script tag to include  &libraries=services

(function () {

  // ---------------------------------------------------------------
  // 1. Data (from gil-go-filming-locations.xlsx)
  //    a = exact Korean address (searched first), q = Kakao keyword fallback
  // ---------------------------------------------------------------
  const SPOTS = [
    ["Binaeseom Island","비내섬","Filming","Drama","Crash Landing on You","Hyun Bin, Son Ye-jin","","Open","","충청북도 충주시 앙성면 조천리 412","비내섬"],
    ["Hantangang Sky Bridge","한탄강 하늘다리","Filming","Drama","Crash Landing on You","Hyun Bin, Son Ye-jin","","Open","","경기도 포천시 영북면 비둘기낭길 207","한탄강하늘다리"],
    ["BBQ Olive Chicken (Ewha)","BBQ치킨 이대점","Filming","Drama","Crash Landing on You","Company Five soldiers","","Open","Chain branch — may close","서울 서대문구 이화여대5길 35","BBQ 이대점"],
    ["Jumunjin Breakwater","주문진 방파제","Filming","Drama","Goblin","Gong Yoo, Kim Go-eun","Eun-tak gives the Goblin a buckwheat bouquet","Open","","강원도 강릉시 주문진읍 해안로 1609","주문진방파제"],
    ["Unhyeongung Yanggwan","운현궁 양관","Filming","Drama","Goblin","Gong Yoo, Kim Go-eun","","Open","","서울 종로구 삼일대로 464","운현궁 양관"],
    ["Hotel Seine","호텔 세느장","Filming","Drama","Hotel del Luna","IU, Yeo Jin-goo","","Open","","서울 종로구 돈화문로11길 28-5","호텔세느장"],
    ["Mokpo Modern History Museum","목포근대역사관","Filming","Drama","Hotel del Luna","IU, Yeo Jin-goo","Hotel exterior backdrop","Open","","전라남도 목포시 영산로29번길 6","목포근대역사관 1관"],
    ["Danbam building, Haebangchon","단밤포차 촬영 건물","Filming","Drama","Itaewon Class","Park Seo-joon, Kim Da-mi","Building Sae-ro-yi buys for the new Danbam","Approximate","Exact address not public — area pin","","해방촌"],
    ["Some Sevit","세빛섬","Filming","Drama","Itaewon Class","Park Seo-joon, Kim Da-mi","","Open","","서울 서초구 올림픽대로 683","세빛섬"],
    ["Dongbu Village hackberry tree","창원 동부마을 팽나무","Filming","Drama","Extraordinary Attorney Woo","Park Eun-bin","The Sodeok-dong whale tree","Residential","Village — take rubbish home, stay quiet","경상남도 창원시 의창구 대산면 북부리 921-6","북부리 팽나무"],
    ["Woo Young-woo Gimbap","우영우김밥","Filming","Drama","Extraordinary Attorney Woo","Park Eun-bin","Woo Gwang-ho's gimbap shop","Approximate","Japanese restaurant, no gimbap on the menu","","행리단길"],
    ["Crossing Guesthouse","크로싱게스트하우스","Filming","Drama","Twenty-Five Twenty-One","Kim Tae-ri, Nam Joo-hyuk","Hee-do's house","Open","","전라북도 전주시 완산구 오목대길 5-19","크로싱게스트하우스"],
    ["Hanbyeok Tunnel","한벽터널","Filming","Drama","Twenty-Five Twenty-One","Kim Tae-ri, Nam Joo-hyuk","Hee-do and Yi-jin's tunnel scene","Open","","전라북도 전주시 완산구 교동 산7-3","한벽굴"],
    ["Myeongjin Bookstore","명진책방","Filming","Drama","Twenty-Five Twenty-One","Kim Tae-ri, Nam Joo-hyuk","Comic-rental shop","Open","","전라북도 전주시 완산구 서학3길 65","명진책방"],
    ["Descendants of the Sun Set","태양의후예 태백 세트장","Filming","Drama","Descendants of the Sun","Song Joong-ki, Song Hye-kyo","","Replica / Paid","Rebuilt as an attraction","강원도 태백시 통동 346-4","태양의후예 세트장"],
    ["The Hyundai Seoul","더현대 서울","Filming","Drama","Queen of Tears","Kim Soo-hyun, Kim Ji-won","Hae-in's Queens Department Store","Open","","서울 영등포구 여의대로 108","더현대서울"],
    ["Uri Old Stone Museum","우리옛돌박물관","Filming","Drama","Queen of Tears","Kim Soo-hyun, Kim Ji-won","Entrance of the Queens family mansion","Open / Paid","","서울 성북구 대사관로13길 66","우리옛돌박물관"],
    ["Yongdu-ri village (Yongyeon-ri)","용두리 배경지","Filming","Drama","Queen of Tears","Kim Soo-hyun","Hyun-woo's hometown village","Residential","The shop was a set. Don't enter private homes","경상북도 문경시 문경읍 용연리","문경 용연리"],
    ["Gurangni Station rail bike","구랑리역 철로자전거","Filming","Drama","Queen of Tears","Kim Soo-hyun, Kim Ji-won","Hyun-woo and Hae-in's rail-bike date","Open / Paid","","경상북도 문경시 마성면 구랑로 20","구랑리역"],
    ["Gimnyeong Beach","김녕해변","Filming","Drama","When Life Gives You Tangerines","IU, Park Bo-gum","Young Ae-sun waits for her haenyeo mother","Open","","제주특별자치도 제주시 구좌읍 김녕리 4-3","김녕해수욕장"],
    ["Ora-dong Buckwheat Field","오라동 메밀밭","Filming","Drama","When Life Gives You Tangerines","IU, Park Bo-gum","Ae-sun carries baby Geum-myeong through the flowers","Seasonal","Blooms around May and October","","오라동메밀밭"],
    ["Seongsan Ilchulbong","성산일출봉","Filming","Drama","When Life Gives You Tangerines","IU","Ae-sun's forced 3,000 bows","Open / Paid","","제주특별자치도 서귀포시 성산읍 일출로 284-12","성산일출봉"],
    ["Jeju Mok Government Office","제주목관아","Filming","Drama","When Life Gives You Tangerines","IU, Park Bo-gum","Ae-sun and Gwan-sik at the poetry contest","Open / Paid","","제주특별자치도 제주시 관덕로 25","제주목관아"],
    ["Cheongshim Marine Youth Center","청심국제해양청소년수련원","Filming","Drama","When Life Gives You Tangerines","IU, Park Bo-gum","Opening scene","Restricted","Training facility — view from outside","","청심국제해양청소년수련원"],
    ["Ahopsan Forest","아홉산숲","Filming","Drama","The King: Eternal Monarch","Lee Min-ho, Kim Go-eun","","Open","","부산 기장군 철마면 미동길 31","아홉산숲"],
    ["Hocheon Village","호천마을","Filming","Drama","Fight for My Way","Park Seo-joon, Kim Ji-won","","Residential","Keep quiet at night","부산 부산진구 엄광로 491","호천마을"],
    ["Yeongdo & Busan Harbor Bridge","영도 · 부산항대교","Filming","Drama","My Name","Han So-hee","","Approximate","Area pin","","부산항대교"],
    ["Gamcheon Culture Village","감천문화마을","Filming","Drama","Unbreakable Mrs. Cha and more","","Colourful hillside houses","Residential","","부산 사하구 감내2로 203","감천문화마을"],
    ["Woori Super","돼지쌀슈퍼","Filming","Film","Parasite","Choi Woo-shik, Park Seo-joon","Ki-woo and Min-hyuk drink outside the shop","Residential","Residential street — keep quiet","서울 마포구 손기정로 32","돼지쌀슈퍼"],
    ["Parasite stairs","기생충 계단","Filming","Film","Parasite","Kim family","","Residential","Residential street — keep quiet","서울 마포구 손기정로6길 3","기생충 계단"],
    ["Sky Pizza","스카이피자","Filming","Film","Parasite","Song Kang-ho","Pizza Generation shop","Open","","서울 동작구 노량진로6길 86","스카이피자"],
    ["Jahamun Tunnel stairs","자하문터널 계단","Filming","Film","Parasite","Song Kang-ho, Choi Woo-shik","","Approximate","","","자하문터널"],
    ["Jang Seong Hyang","장성향","Filming","Film","Oldboy","Choi Min-sik","Dae-su tracks down the dumpling shop","Open","","부산 동구 대영로243번길 29","장성향"],
    ["Iryeong Station","일영역","Filming","MV","Spring Day","BTS","V walks onto the snowy tracks","Station","Never go onto the tracks","경기도 양주시 장흥면 일영로647번길 25","일영역"],
    ["Jumunjin BTS Bus Stop","주문진 BTS 버스정류장","Filming","MV","You Never Walk Alone (jacket)","BTS","Album jacket bus stop","Replica","","강원도 강릉시 주문진읍 향호리 8-20","BTS 버스정류장"],
    ["Saemangeum Seawall","새만금방조제","Filming","MV","Save Me","BTS","","Approximate","Long seawall — area pin","","새만금홍보관"],
    ["Neungnae Tunnel","능내터널","Filming","MV","RUN / BANG BANG BANG","BTS, BIGBANG","","Active road","Watch for cars","경기도 군포시 산본동 951","능내터널"],
    ["Kyung Hee Univ. amphitheatre","경희대 노천극장","Filming","MV","AS IF IT'S YOUR LAST","BLACKPINK","","Campus","Active campus","서울 동대문구 경희대로 26","경희대학교 노천극장"],
    ["Keisung School Henderson Hall","계성중학교 핸더슨관","Filming","MV","Ditto / OMG","NewJeans","The school in the Ditto story","Restricted","Active school — outside only","대구 중구 달성로 35","계성중학교"],
    ["Cheongna Hill","청라언덕","Filming","MV","Ditto","NewJeans","","Open","","","청라언덕"],
    ["Yongma Land","용마랜드","Filming","MV","Like OOH-AHH / Ribbon","TWICE, Highlight","Carousel scenes","Open / Paid","May close on shoot days — call first","서울 중랑구 망우로70길 118","용마랜드"],
    ["MMCA Cheongju (old tobacco factory)","옛 청주연초제조창","Filming","MV","Not Today","BTS","","Open","","충청북도 청주시 청원구 상당로 314","국립현대미술관 청주"],
    ["Ssangsanjae","쌍산재","Filming","Variety","Youn's Stay","Youn Yuh-jung, Choi Woo-shik","The hanok hotel guests stayed in","Open / Paid","Entry fee includes a drink","전라남도 구례군 마산면 장수길 3-2","쌍산재"],
    ["BIFF Square Star Street","BIFF광장","Star","Handprint","Busan International Film Festival","Ennio Morricone, Juliette Binoche, Willem Dafoe and more","Pavement handprints","Open","","부산 중구 비프광장로 20","BIFF광장"],
    ["K-Star Road","케이스타로드","Star","Statues","K-pop group statues","BTS, EXO, Girls' Generation, SHINee and more","GangnamDol statues","Open","","서울 강남구 압구정로 407","케이스타로드"]
  ].map(r => ({ en:r[0], kr:r[1], row:r[2], type:r[3], title:r[4], who:r[5], scene:r[6],
                status:r[7], note:r[8], a:r[9], q:r[10] }));

  const CACHE_KEY = "gilgo_fanspots_v1";
  const RADIUS_KM = 60;
  const GLYPH = { Drama:"🎬", Film:"🎞️", MV:"🎵", Variety:"📺", Handprint:"✋", Statues:"🗽" };

  // ---------------------------------------------------------------
  // 2. Find the map, remember the last search point
  // ---------------------------------------------------------------
  function getMap() {
    try { if (typeof map !== "undefined" && map && map.setCenter) return map; } catch (e) {}
    return window.map || window.kakaoMap || window.gilgoMap || null;
  }

  let lastPoint = null;
  if (typeof window.loadNearbyDiscoveries === "function") {
    const orig = window.loadNearbyDiscoveries;
    window.loadNearbyDiscoveries = function (theme, lat, lng) {
      lastPoint = { lat: +lat, lng: +lng };
      if (panelOpen) showSpots();
      return orig.apply(this, arguments);
    };
  }

  function isHallyu() {
    try { return typeof currentTheme !== "undefined" && currentTheme === "hallyu"; } catch (e) { return false; }
  }

  // ---------------------------------------------------------------
  // 3. Coordinates: Kakao geocoder, cached in the browser
  // ---------------------------------------------------------------
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch (e) {}
  function saveCache() { try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (e) {} }

  function geocode(s) {
    return new Promise(resolve => {
      if (cache[s.en]) return resolve(cache[s.en]);
      if (!(window.kakao && kakao.maps && kakao.maps.services)) return resolve(null);
      const done = (lat, lng) => { cache[s.en] = { lat: +lat, lng: +lng }; saveCache(); resolve(cache[s.en]); };
      const byKeyword = () => {
        new kakao.maps.services.Places().keywordSearch(s.q, (res, st) => {
          if (st === kakao.maps.services.Status.OK && res.length) done(res[0].y, res[0].x);
          else resolve(null);
        });
      };
      if (s.a) {
        new kakao.maps.services.Geocoder().addressSearch(s.a, (res, st) => {
          if (st === kakao.maps.services.Status.OK && res.length) done(res[0].y, res[0].x);
          else byKeyword();
        });
      } else byKeyword();
    });
  }

  async function locateAll() {
    for (const s of SPOTS) { s.pos = await geocode(s); }
  }

  function km(a, b) {
    const R = 6371, t = x => x * Math.PI / 180;
    const d1 = t(b.lat - a.lat), d2 = t(b.lng - a.lng);
    const h = Math.sin(d1/2)**2 + Math.cos(t(a.lat)) * Math.cos(t(b.lat)) * Math.sin(d2/2)**2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  // ---------------------------------------------------------------
  // 4. UI
  // ---------------------------------------------------------------
  const css = document.createElement("style");
  css.textContent = `
    .gfBtn{position:fixed;left:12px;bottom:88px;z-index:30;border:0;border-radius:999px;
      padding:10px 16px;font:700 14px/1 inherit;background:var(--cinnabar,#e4577b);color:#fff;
      box-shadow:0 3px 10px rgba(0,0,0,.25);cursor:pointer;display:none}
    .gfBtn.on{background:#fff;color:var(--cinnabar,#e4577b)}
    .gfPanel{position:fixed;left:0;right:0;bottom:0;z-index:31;max-height:55vh;overflow:auto;
      background:#fff;border-radius:18px 18px 0 0;box-shadow:0 -4px 18px rgba(0,0,0,.2);
      padding:14px 16px 20px;display:none;font-size:14px}
    .gfHead{display:flex;align-items:center;gap:8px;margin-bottom:8px}
    .gfHead h3{flex:1;margin:0;font-size:16px}
    .gfX{border:0;background:none;font-size:22px;cursor:pointer;line-height:1}
    .gfTabs{display:flex;gap:6px;margin-bottom:10px}
    .gfTab{border:1px solid #ddd;background:#fff;border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer}
    .gfTab.on{background:var(--cinnabar,#e4577b);color:#fff;border-color:transparent}
    .gfItem{display:flex;gap:10px;padding:10px 0;border-top:1px solid #eee;cursor:pointer}
    .gfItem b{display:block}
    .gfSub{color:#666;font-size:12px}
    .gfDist{margin-left:auto;color:#888;font-size:12px;white-space:nowrap}
    .gfCard p{margin:6px 0}
    .gfTag{display:inline-block;font-size:11px;padding:3px 8px;border-radius:999px;background:#f3f0f6;margin-right:4px}
    .gfNote{background:#fff7e0;border-radius:8px;padding:8px;font-size:12px}
    .gfGo{display:block;text-align:center;margin-top:10px;padding:11px;border-radius:12px;
      background:var(--indigo,#4a62d8);color:#fff;text-decoration:none;font-weight:700}
    .gfPin{width:34px;height:34px;border-radius:50%;background:#fff;border:2px solid var(--cinnabar,#e4577b);
      display:flex;align-items:center;justify-content:center;font-size:17px;box-shadow:0 2px 6px rgba(0,0,0,.3);cursor:pointer}
  `;
  document.head.appendChild(css);

  const btn = document.createElement("button");
  btn.className = "gfBtn"; btn.textContent = "⭐ Fan Spots";
  const panel = document.createElement("div");
  panel.className = "gfPanel";
  document.body.appendChild(btn); document.body.appendChild(panel);

  let panelOpen = false, tab = "Filming", overlays = [];

  function clearPins() { overlays.forEach(o => o.setMap(null)); overlays = []; }

  function directionsUrl(s) {
    return `https://map.kakao.com/link/to/${encodeURIComponent(s.kr)},${s.pos.lat},${s.pos.lng}`;
  }

  function showCard(s) {
    const m = getMap();
    if (m && s.pos) m.panTo(new kakao.maps.LatLng(s.pos.lat, s.pos.lng));
    panel.innerHTML = `
      <div class="gfHead"><button class="gfX" data-back>‹</button><h3>${GLYPH[s.type] || "⭐"} ${s.en}</h3><button class="gfX" data-close>×</button></div>
      <div class="gfCard">
        <div class="gfSub">${s.kr}</div>
        <p><b>${s.title}</b>${s.who ? " · " + s.who : ""}</p>
        ${s.scene ? `<p>${s.scene}</p>` : ""}
        <p><span class="gfTag">${s.type}</span><span class="gfTag">${s.status}</span></p>
        ${s.note ? `<p class="gfNote">${s.note}</p>` : ""}
        ${s.status === "Residential" || s.status === "Restricted" ? `<p class="gfNote">Please respect residents and don't enter private property.</p>` : ""}
        ${s.pos ? `<a class="gfGo" href="${directionsUrl(s)}" target="_blank" rel="noopener">Get directions</a>` : ""}
      </div>`;
    panel.querySelector("[data-back]").onclick = renderList;
    panel.querySelector("[data-close]").onclick = closePanel;
  }

  function renderList(list) {
    if (!Array.isArray(list)) list = currentList;
    const shown = list.filter(s => s.row === tab);
    panel.innerHTML = `
      <div class="gfHead"><h3>⭐ Fan Spots</h3><button class="gfX" data-close>×</button></div>
      <div class="gfTabs">
        <button class="gfTab ${tab === "Filming" ? "on" : ""}" data-tab="Filming">🎬 Filming Locations</button>
        <button class="gfTab ${tab === "Star" ? "on" : ""}" data-tab="Star">✋ Star Spots</button>
      </div>
      <div class="gfSub">${lastPoint ? `Within ${RADIUS_KM} km of your search` : "All of Korea — search a place to see what's near you"}</div>
      ${shown.length ? shown.map((s, i) => `
        <div class="gfItem" data-i="${list.indexOf(s)}">
          <div style="font-size:22px">${GLYPH[s.type] || "⭐"}</div>
          <div><b>${s.en}</b><span class="gfSub">${s.title}</span></div>
          <div class="gfDist">${s.dist != null ? s.dist.toFixed(1) + " km" : ""}</div>
        </div>`).join("") : `<p class="gfSub">No spots nearby yet. Try searching Seoul, Busan or Jeju.</p>`}`;
    panel.querySelector("[data-close]").onclick = closePanel;
    panel.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { tab = b.dataset.tab; renderList(list); drawPins(list); });
    panel.querySelectorAll("[data-i]").forEach(el => el.onclick = () => showCard(list[+el.dataset.i]));
  }

  let currentList = [];

  function drawPins(list) {
    clearPins();
    const m = getMap();
    if (!m) return;
    list.filter(s => s.row === tab && s.pos).forEach(s => {
      const el = document.createElement("div");
      el.className = "gfPin"; el.textContent = GLYPH[s.type] || "⭐";
      el.onclick = () => showCard(s);
      const o = new kakao.maps.CustomOverlay({ position: new kakao.maps.LatLng(s.pos.lat, s.pos.lng), content: el, yAnchor: 0.5 });
      o.setMap(m); overlays.push(o);
    });
  }

  async function showSpots() {
    panel.innerHTML = `<p class="gfSub">Finding fan spots…</p>`;
    await locateAll();
    let list = SPOTS.filter(s => s.pos);
    if (lastPoint) {
      list.forEach(s => { s.dist = km(lastPoint, s.pos); });
      list = list.filter(s => s.dist <= RADIUS_KM).sort((a, b) => a.dist - b.dist);
    } else {
      list.forEach(s => { s.dist = null; });
    }
    currentList = list;
    renderList(list);
    drawPins(list);
  }

  function openPanel() {
    if (!(window.kakao && kakao.maps && kakao.maps.services)) {
      alert("Fan Spots needs the Kakao Maps 'services' library. Add &libraries=services to the Kakao SDK script tag.");
      return;
    }
    if (!getMap()) console.warn("[fan-spots] map object not found — list works, pins won't show");
    panelOpen = true; btn.classList.add("on"); panel.style.display = "block";
    showSpots();
  }
  function closePanel() {
    panelOpen = false; btn.classList.remove("on"); panel.style.display = "none"; clearPins();
  }
  btn.onclick = () => panelOpen ? closePanel() : openPanel();

  // Show the button only on the Hallyu belt
  setInterval(() => {
    const on = isHallyu();
    btn.style.display = on ? "block" : "none";
    if (!on && panelOpen) closePanel();
  }, 700);

  console.log("[fan-spots] loaded:", SPOTS.length, "spots; map found:", !!getMap(),
              "; services:", !!(window.kakao && kakao.maps && kakao.maps.services));
})();
