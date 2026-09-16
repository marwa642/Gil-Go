// =================================================================
// Gil & Go: reviews from international visitors
//
// Load AFTER place-details.js in index.html:
//   <script src="reviews.js?v=1"></script>
// =================================================================
(function () {
  "use strict";

  const WORKER = "https://gil-and-go-backend.marwahshaikh2001.workers.dev";

  // ---------------------------------------------------------------
  // 1. Interface text
  // ---------------------------------------------------------------
  const L = {
    en: { title: "Reviews from visitors", none: "No reviews yet. Been here? Share what a first-time visitor should know.", write: "Write a review", rating: "Your rating", country: "Where are you from?", name: "Name (optional)", text: "What should other visitors know?", post: "Post review", cancel: "Cancel", posting: "Posting…", posted: "Thanks, your review is posted.", pick_rating: "Choose a star rating first.", limit: "You've already reviewed this place today.", failed: "Couldn't post. Check your connection and try again.", report: "Report", reported: "Reported", confirm_report: "Report this review as spam or offensive?", translate: "Translate", original: "Show original", other: "Other",
      english_menu: "English menu", card_ok: "Card accepted", english_staff: "Staff speak English", easy_to_find: "Easy to find", halal_options: "Halal options", vegetarian_options: "Vegetarian options" },
    ko: { title: "외국인 방문자 리뷰", none: "아직 리뷰가 없어요. 방문해 보셨다면 처음 오는 사람에게 도움이 될 이야기를 남겨 주세요.", write: "리뷰 쓰기", rating: "별점", country: "어느 나라에서 오셨나요?", name: "이름 (선택)", text: "다른 방문자가 알면 좋을 점은?", post: "리뷰 올리기", cancel: "취소", posting: "올리는 중…", posted: "리뷰가 등록됐어요. 감사합니다.", pick_rating: "먼저 별점을 선택해 주세요.", limit: "오늘 이미 이 장소에 리뷰를 남겼어요.", failed: "등록하지 못했어요. 연결을 확인하고 다시 시도해 주세요.", report: "신고", reported: "신고됨", confirm_report: "이 리뷰를 스팸 또는 부적절한 내용으로 신고할까요?", translate: "번역", original: "원문 보기", other: "기타",
      english_menu: "영어 메뉴", card_ok: "카드 결제 가능", english_staff: "영어 가능 직원", easy_to_find: "찾기 쉬움", halal_options: "할랄 메뉴", vegetarian_options: "채식 메뉴" },
    zh: { title: "外国游客评价", none: "还没有评价。来过这里吗？分享一下第一次来的人需要知道的事。", write: "写评价", rating: "评分", country: "你来自哪里？", name: "名字（可选）", text: "其他游客应该知道什么？", post: "发布评价", cancel: "取消", posting: "发布中…", posted: "谢谢，评价已发布。", pick_rating: "请先选择星级。", limit: "你今天已经评价过这个地方。", failed: "发布失败，请检查网络后重试。", report: "举报", reported: "已举报", confirm_report: "将此评价举报为垃圾信息或冒犯内容？", translate: "翻译", original: "显示原文", other: "其他",
      english_menu: "英文菜单", card_ok: "可刷卡", english_staff: "店员会说英语", easy_to_find: "容易找到", halal_options: "清真选项", vegetarian_options: "素食选项" },
    ja: { title: "外国人旅行者のレビュー", none: "まだレビューはありません。訪れたことがあれば、初めての人が知っておくべきことを教えてください。", write: "レビューを書く", rating: "評価", country: "どこの国から来ましたか？", name: "名前（任意）", text: "他の旅行者に伝えたいことは？", post: "投稿する", cancel: "キャンセル", posting: "投稿中…", posted: "ありがとうございます。レビューを投稿しました。", pick_rating: "先に星の数を選んでください。", limit: "この場所には今日すでにレビューを投稿しています。", failed: "投稿できませんでした。接続を確認して再度お試しください。", report: "報告", reported: "報告済み", confirm_report: "このレビューをスパムまたは不適切として報告しますか？", translate: "翻訳", original: "原文を表示", other: "その他",
      english_menu: "英語メニュー", card_ok: "カード可", english_staff: "英語が通じる", easy_to_find: "見つけやすい", halal_options: "ハラル対応", vegetarian_options: "ベジタリアン対応" },
    ru: { title: "Отзывы иностранных гостей", none: "Отзывов пока нет. Были здесь? Расскажите, что стоит знать тем, кто придёт впервые.", write: "Написать отзыв", rating: "Ваша оценка", country: "Откуда вы?", name: "Имя (необязательно)", text: "Что стоит знать другим гостям?", post: "Опубликовать", cancel: "Отмена", posting: "Публикация…", posted: "Спасибо, отзыв опубликован.", pick_rating: "Сначала выберите оценку.", limit: "Вы уже оставили отзыв об этом месте сегодня.", failed: "Не удалось опубликовать. Проверьте подключение и попробуйте снова.", report: "Пожаловаться", reported: "Жалоба отправлена", confirm_report: "Пожаловаться на этот отзыв как на спам или оскорбление?", translate: "Перевести", original: "Показать оригинал", other: "Другое",
      english_menu: "Меню на английском", card_ok: "Принимают карты", english_staff: "Персонал говорит по-английски", easy_to_find: "Легко найти", halal_options: "Есть халяль", vegetarian_options: "Есть вегетарианское" },
    es: { title: "Reseñas de visitantes", none: "Aún no hay reseñas. ¿Has estado aquí? Cuenta lo que debería saber quien viene por primera vez.", write: "Escribir reseña", rating: "Tu valoración", country: "¿De dónde eres?", name: "Nombre (opcional)", text: "¿Qué deberían saber otros visitantes?", post: "Publicar reseña", cancel: "Cancelar", posting: "Publicando…", posted: "Gracias, tu reseña está publicada.", pick_rating: "Primero elige una puntuación.", limit: "Ya has reseñado este lugar hoy.", failed: "No se pudo publicar. Revisa tu conexión e inténtalo de nuevo.", report: "Denunciar", reported: "Denunciada", confirm_report: "¿Denunciar esta reseña como spam u ofensiva?", translate: "Traducir", original: "Ver original", other: "Otro",
      english_menu: "Menú en inglés", card_ok: "Aceptan tarjeta", english_staff: "Hablan inglés", easy_to_find: "Fácil de encontrar", halal_options: "Opciones halal", vegetarian_options: "Opciones vegetarianas" },
    fr: { title: "Avis de visiteurs", none: "Pas encore d'avis. Vous êtes venu ici ? Dites ce qu'un nouveau visiteur devrait savoir.", write: "Écrire un avis", rating: "Votre note", country: "D'où venez-vous ?", name: "Nom (facultatif)", text: "Que devraient savoir les autres visiteurs ?", post: "Publier l'avis", cancel: "Annuler", posting: "Publication…", posted: "Merci, votre avis est publié.", pick_rating: "Choisissez d'abord une note.", limit: "Vous avez déjà donné votre avis sur ce lieu aujourd'hui.", failed: "Échec de la publication. Vérifiez votre connexion et réessayez.", report: "Signaler", reported: "Signalé", confirm_report: "Signaler cet avis comme spam ou offensant ?", translate: "Traduire", original: "Voir l'original", other: "Autre",
      english_menu: "Menu en anglais", card_ok: "Carte acceptée", english_staff: "Personnel anglophone", easy_to_find: "Facile à trouver", halal_options: "Options halal", vegetarian_options: "Options végétariennes" },
    vi: { title: "Đánh giá của du khách", none: "Chưa có đánh giá. Bạn đã đến đây chưa? Hãy chia sẻ điều người mới đến nên biết.", write: "Viết đánh giá", rating: "Điểm của bạn", country: "Bạn đến từ đâu?", name: "Tên (không bắt buộc)", text: "Du khách khác nên biết điều gì?", post: "Đăng đánh giá", cancel: "Hủy", posting: "Đang đăng…", posted: "Cảm ơn, đánh giá đã được đăng.", pick_rating: "Hãy chọn số sao trước.", limit: "Hôm nay bạn đã đánh giá nơi này rồi.", failed: "Không đăng được. Kiểm tra kết nối và thử lại.", report: "Báo cáo", reported: "Đã báo cáo", confirm_report: "Báo cáo đánh giá này là spam hoặc xúc phạm?", translate: "Dịch", original: "Xem bản gốc", other: "Khác",
      english_menu: "Thực đơn tiếng Anh", card_ok: "Nhận thẻ", english_staff: "Nhân viên nói tiếng Anh", easy_to_find: "Dễ tìm", halal_options: "Có món halal", vegetarian_options: "Có món chay" },
    th: { title: "รีวิวจากนักท่องเที่ยว", none: "ยังไม่มีรีวิว เคยมาที่นี่ไหม? บอกสิ่งที่คนมาครั้งแรกควรรู้", write: "เขียนรีวิว", rating: "คะแนนของคุณ", country: "คุณมาจากประเทศไหน?", name: "ชื่อ (ไม่บังคับ)", text: "นักท่องเที่ยวคนอื่นควรรู้อะไร?", post: "โพสต์รีวิว", cancel: "ยกเลิก", posting: "กำลังโพสต์…", posted: "ขอบคุณ รีวิวของคุณถูกโพสต์แล้ว", pick_rating: "กรุณาเลือกคะแนนก่อน", limit: "วันนี้คุณรีวิวที่นี่ไปแล้ว", failed: "โพสต์ไม่สำเร็จ ตรวจสอบการเชื่อมต่อแล้วลองใหม่", report: "รายงาน", reported: "รายงานแล้ว", confirm_report: "รายงานรีวิวนี้ว่าเป็นสแปมหรือไม่เหมาะสม?", translate: "แปล", original: "ดูต้นฉบับ", other: "อื่นๆ",
      english_menu: "เมนูภาษาอังกฤษ", card_ok: "รับบัตร", english_staff: "พนักงานพูดอังกฤษได้", easy_to_find: "หาง่าย", halal_options: "มีอาหารฮาลาล", vegetarian_options: "มีอาหารมังสวิรัติ" }
  };
  function lang() { return (document.documentElement.lang || "en").slice(0, 2).toLowerCase(); }
  function t(k) { return (L[lang()] || L.en)[k] || L.en[k]; }

  const TAGS = ["english_menu", "card_ok", "english_staff", "easy_to_find", "halal_options", "vegetarian_options"];
  const COUNTRIES = ["US","GB","CA","AU","NZ","IE","IN","PK","BD","NP","LK","ID","MY","PH","VN","TH","SG","CN","TW","HK","JP","MN","UZ","KZ","KG","RU","UA","DE","FR","ES","IT","NL","SE","PL","TR","SA","AE","EG","MA","NG","GH","KE","ET","ZA","BR","MX","CO","AR","PE","CL"];

  // ---------------------------------------------------------------
  // 2. Styles
  // ---------------------------------------------------------------
  const style = document.createElement("style");
  style.textContent = `
  .ggr { margin: 18px 0 8px; padding-top: 14px; border-top: 1px solid rgba(127,127,127,.25); font-size: 14px; line-height: 1.45; }
  .ggr h3 { font-size: 16px; margin: 0 0 4px; }
  .ggr-sum { display: flex; align-items: baseline; gap: 8px; margin: 0 0 10px; }
  .ggr-avg { font-size: 22px; font-weight: 700; }
  .ggr-stars { letter-spacing: 1px; color: #e8a317; }
  .ggr-muted { opacity: .6; font-size: 13px; }
  .ggr-tagsum { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 12px; }
  .ggr-chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 999px;
    background: rgba(127,127,127,.14); font-size: 12px; border: 1px solid transparent; }
  button.ggr-chip { font: inherit; font-size: 13px; color: inherit; cursor: pointer; min-height: 34px; }
  button.ggr-chip[aria-pressed="true"] { border-color: currentColor; background: rgba(127,127,127,.28); font-weight: 600; }
  .ggr-list { list-style: none; margin: 0 0 12px; padding: 0; }
  .ggr-item { padding: 10px 0; border-bottom: 1px solid rgba(127,127,127,.15); }
  .ggr-item:last-child { border-bottom: 0; }
  .ggr-head { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin-bottom: 4px; }
  .ggr-who { font-weight: 600; }
  .ggr-body { white-space: pre-line; overflow-wrap: anywhere; margin: 4px 0; }
  .ggr-item .ggr-tagsum { margin: 6px 0 0; }
  .ggr-links { display: flex; gap: 14px; margin-top: 6px; }
  .ggr-link { background: none; border: 0; padding: 4px 0; font: inherit; font-size: 12px; color: inherit; opacity: .65; text-decoration: underline; cursor: pointer; }
  .ggr-btn { display: inline-flex; align-items: center; min-height: 40px; padding: 0 16px; border-radius: 999px;
    border: 2px solid currentColor; background: rgba(127,127,127,.18); color: inherit; font: inherit; font-weight: 600; cursor: pointer; }
  .ggr-btn.ghost { border-width: 1px; background: none; }
  .ggr-btn:disabled { opacity: .5; }
  .ggr-form { display: grid; gap: 12px; margin: 4px 0 8px; padding: 12px; border-radius: 12px; background: rgba(127,127,127,.1); }
  .ggr-form label { display: grid; gap: 4px; font-size: 13px; }
  .ggr-form select, .ggr-form input, .ggr-form textarea { font: inherit; font-size: 16px; color: inherit; background: rgba(255,255,255,.6);
    border: 1px solid rgba(127,127,127,.4); border-radius: 8px; padding: 8px 10px; width: 100%; box-sizing: border-box; }
  .ggr-form textarea { min-height: 84px; resize: vertical; }
  .ggr-starpick { display: flex; gap: 2px; }
  .ggr-starpick button { background: none; border: 0; font-size: 30px; line-height: 1; padding: 2px 4px; cursor: pointer; color: rgba(127,127,127,.5); }
  .ggr-starpick button.on { color: #e8a317; }
  .ggr-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .ggr-msg { font-size: 13px; margin: 0; }
  .ggr button:focus-visible, .ggr select:focus-visible, .ggr input:focus-visible, .ggr textarea:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  `;
  document.head.appendChild(style);

  // ---------------------------------------------------------------
  // 3. Helpers
  // ---------------------------------------------------------------
  function el(tag, attrs, text) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function pick(o, keys) { for (const k of keys) if (o && o[k] != null && o[k] !== "") return o[k]; return null; }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function placeKey(site) {
    const url = pick(site, ["place_url", "placeUrl"]);
    const m = url && String(url).match(/(\d{5,})/);
    if (m) return "kakao:" + m[1];
    const kid = pick(site, ["kakaoId", "place_id"]);
    if (kid) return "kakao:" + kid;
    const lat = parseFloat(pick(site, ["lat", "latitude", "y", "mapy"]));
    const lng = parseFloat(pick(site, ["lng", "lon", "longitude", "x", "mapx"]));
    const name = String(site.name || site.place_name || site.title || "").replace(/\s+/g, "").toLowerCase();
    return "geo:" + name + "@" + (isFinite(lat) ? lat.toFixed(4) : "") + "," + (isFinite(lng) ? lng.toFixed(4) : "");
  }

  function flag(code) {
    if (!/^[A-Z]{2}$/.test(code || "") || code === "XX") return "🌏";
    return String.fromCodePoint(...[...code].map(c => 0x1f1a5 + c.charCodeAt(0)));
  }
  function countryName(code) {
    if (!code || code === "XX") return t("other");
    try { return new Intl.DisplayNames([lang()], { type: "region" }).of(code); } catch (e) { return code; }
  }
  function stars(n) { const r = Math.round(n); return "★★★★★".slice(0, r) + "☆☆☆☆☆".slice(0, 5 - r); }
  function dateText(s) {
    try {
      const d = new Date(String(s).replace(" ", "T") + "Z");
      return new Intl.DateTimeFormat(lang(), { year: "numeric", month: "short", day: "numeric" }).format(d);
    } catch (e) { return ""; }
  }

  async function api(payload) {
    const res = await fetch(WORKER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  // ---------------------------------------------------------------
  // 4. Render
  // ---------------------------------------------------------------
  function renderSummary(wrap, reviews) {
    wrap.textContent = "";
    if (!reviews.length) {
      wrap.appendChild(el("p", { class: "ggr-muted" }, t("none")));
      return;
    }
    const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
    const sum = el("div", { class: "ggr-sum" });
    sum.appendChild(el("span", { class: "ggr-avg" }, avg.toFixed(1)));
    sum.appendChild(el("span", { class: "ggr-stars", "aria-hidden": "true" }, stars(avg)));
    sum.appendChild(el("span", { class: "ggr-muted" }, "(" + reviews.length + ")"));
    wrap.appendChild(sum);

    const counts = {};
    reviews.forEach(r => (r.tags || []).forEach(tg => { counts[tg] = (counts[tg] || 0) + 1; }));
    const tagKeys = TAGS.filter(k => counts[k]);
    if (tagKeys.length) {
      const row = el("div", { class: "ggr-tagsum" });
      tagKeys.sort((a, b) => counts[b] - counts[a]).forEach(k => row.appendChild(el("span", { class: "ggr-chip" }, "✓ " + t(k) + " · " + counts[k])));
      wrap.appendChild(row);
    }
  }

  function renderItem(r) {
    const li = el("li", { class: "ggr-item" });
    const head = el("div", { class: "ggr-head" });
    head.appendChild(el("span", { class: "ggr-stars", "aria-label": r.rating + "/5" }, stars(r.rating)));
    head.appendChild(el("span", { class: "ggr-who" }, flag(r.country) + " " + (r.name || countryName(r.country))));
    if (r.name) head.appendChild(el("span", { class: "ggr-muted" }, countryName(r.country)));
    head.appendChild(el("span", { class: "ggr-muted" }, dateText(r.created_at)));
    li.appendChild(head);

    let body = null;
    if (r.text) { body = el("p", { class: "ggr-body" }, r.text); li.appendChild(body); }

    if (r.tags && r.tags.length) {
      const row = el("div", { class: "ggr-tagsum" });
      r.tags.filter(k => TAGS.includes(k)).forEach(k => row.appendChild(el("span", { class: "ggr-chip" }, "✓ " + t(k))));
      li.appendChild(row);
    }

    const links = el("div", { class: "ggr-links" });

    // Translate on request only, to save AI quota.
    if (body && r.lang && r.lang.slice(0, 2) !== lang()) {
      const tb = el("button", { class: "ggr-link", type: "button" }, t("translate"));
      let translated = null, showing = false;
      tb.addEventListener("click", async () => {
        if (showing) { body.textContent = r.text; tb.textContent = t("translate"); showing = false; return; }
        if (!translated) {
          tb.disabled = true;
          try {
            const d = await api({ type: "translate", texts: [r.text], targetLang: lang() });
            translated = (d.translations && d.translations[0]) || null;
          } catch (e) {}
          tb.disabled = false;
        }
        if (translated) { body.textContent = translated; tb.textContent = t("original"); showing = true; }
      });
      links.appendChild(tb);
    }

    const reportedIds = lsGet("ggr-reported") || [];
    const rb = el("button", { class: "ggr-link", type: "button" }, reportedIds.includes(r.id) ? t("reported") : t("report"));
    if (reportedIds.includes(r.id)) rb.disabled = true;
    rb.addEventListener("click", async () => {
      if (!confirm(t("confirm_report"))) return;
      rb.disabled = true; rb.textContent = t("reported");
      const ids = lsGet("ggr-reported") || []; ids.push(r.id); lsSet("ggr-reported", ids.slice(-200));
      try { await api({ type: "reviewReport", id: r.id }); } catch (e) {}
    });
    links.appendChild(rb);
    li.appendChild(links);
    return li;
  }

  function buildForm(key, onPosted, onCancel) {
    const saved = lsGet("ggr-me") || {};
    const form = el("div", { class: "ggr-form" });
    let rating = 0;
    const chosen = new Set();

    // Stars
    const rLabel = el("div", null);
    rLabel.appendChild(el("div", { style: "font-size:13px;margin-bottom:2px" }, t("rating")));
    const pickRow = el("div", { class: "ggr-starpick", role: "group", "aria-label": t("rating") });
    const starBtns = [1, 2, 3, 4, 5].map(n => {
      const b = el("button", { type: "button", "aria-label": n + "/5" }, "★");
      b.addEventListener("click", () => { rating = n; starBtns.forEach((s, i) => s.classList.toggle("on", i < n)); });
      pickRow.appendChild(b);
      return b;
    });
    rLabel.appendChild(pickRow);
    form.appendChild(rLabel);

    // Country
    const cLabel = el("label", null, t("country"));
    const sel = el("select");
    const opts = COUNTRIES.map(c => ({ c, n: countryName(c) })).sort((a, b) => a.n.localeCompare(b.n, lang()));
    sel.appendChild(el("option", { value: "" }, "—"));
    opts.forEach(o => sel.appendChild(el("option", { value: o.c }, flag(o.c) + " " + o.n)));
    sel.appendChild(el("option", { value: "XX" }, "🌏 " + t("other")));
    if (saved.country) sel.value = saved.country;
    cLabel.appendChild(sel);
    form.appendChild(cLabel);

    // Name
    const nLabel = el("label", null, t("name"));
    const nameIn = el("input", { type: "text", maxlength: "40", autocomplete: "given-name" });
    nameIn.value = saved.name || "";
    nLabel.appendChild(nameIn);
    form.appendChild(nLabel);

    // Tags
    const tagRow = el("div", { class: "ggr-row" });
    TAGS.forEach(k => {
      const b = el("button", { type: "button", class: "ggr-chip", "aria-pressed": "false" }, t(k));
      b.addEventListener("click", () => {
        if (chosen.has(k)) chosen.delete(k); else chosen.add(k);
        b.setAttribute("aria-pressed", chosen.has(k) ? "true" : "false");
      });
      tagRow.appendChild(b);
    });
    form.appendChild(tagRow);

    // Text
    const tLabel = el("label", null, t("text"));
    const ta = el("textarea", { maxlength: "500" });
    tLabel.appendChild(ta);
    form.appendChild(tLabel);

    const msg = el("p", { class: "ggr-msg", role: "status" });
    const actions = el("div", { class: "ggr-row" });
    const postBtn = el("button", { type: "button", class: "ggr-btn" }, t("post"));
    const cancelBtn = el("button", { type: "button", class: "ggr-btn ghost" }, t("cancel"));
    actions.appendChild(postBtn);
    actions.appendChild(cancelBtn);
    form.appendChild(msg);
    form.appendChild(actions);

    cancelBtn.addEventListener("click", onCancel);
    postBtn.addEventListener("click", async () => {
      if (!rating) { msg.textContent = t("pick_rating"); return; }
      postBtn.disabled = true; postBtn.textContent = t("posting"); msg.textContent = "";
      const country = sel.value || "XX";
      lsSet("ggr-me", { name: nameIn.value.trim(), country });
      try {
        const d = await api({ type: "reviewAdd", placeKey: key, rating, country,
          name: nameIn.value.trim(), text: ta.value.trim(), tags: [...chosen], lang: lang() });
        if (d.ok && d.review) { onPosted(d.review); return; }
        msg.textContent = d.error === "limit" ? t("limit") : t("failed");
      } catch (e) {
        msg.textContent = t("failed");
      }
      postBtn.disabled = false; postBtn.textContent = t("post");
    });

    return form;
  }

  // ---------------------------------------------------------------
  // 5. Hook into the drawer
  // ---------------------------------------------------------------
  let openToken = 0;

  if (typeof window.openDrawer !== "function") {
    console.warn("[GG reviews] openDrawer not found. Load reviews.js after place-details.js.");
    return;
  }

  const prevOpenDrawer = window.openDrawer;
  window.openDrawer = function (site) {
    prevOpenDrawer.apply(this, arguments);
    if (!site) return;

    const container = (typeof drawerContent !== "undefined" && drawerContent) ||
      document.getElementById("drawerContent");
    if (!container) return;

    const token = ++openToken;
    const key = placeKey(site);

    const old = container.querySelector(".ggr");
    if (old) old.remove();

    const box = el("section", { class: "ggr" });
    box.appendChild(el("h3", null, t("title")));
    const summary = el("div");
    const list = el("ul", { class: "ggr-list" });
    const writeBtn = el("button", { type: "button", class: "ggr-btn" }, t("write"));
    box.appendChild(summary);
    box.appendChild(list);
    box.appendChild(writeBtn);

    const anchor = container.querySelector(".ggd") || container.querySelector(".loc");
    if (anchor) anchor.insertAdjacentElement("afterend", box);
    else container.appendChild(box);

    let reviews = [];

    writeBtn.addEventListener("click", () => {
      writeBtn.hidden = true;
      const form = buildForm(key, (review) => {
        reviews.unshift(review);
        renderSummary(summary, reviews);
        list.insertBefore(renderItem(review), list.firstChild);
        form.replaceWith(el("p", { class: "ggr-msg", role: "status" }, t("posted")));
      }, () => { form.remove(); writeBtn.hidden = false; });
      box.insertBefore(form, list);
      form.querySelector(".ggr-starpick button").focus();
    });

    api({ type: "reviewsList", placeKey: key }).then(d => {
      if (token !== openToken || !box.isConnected) return;
      reviews = (d && d.reviews) || [];
      renderSummary(summary, reviews);
      reviews.forEach(r => list.appendChild(renderItem(r)));
      if (d && d.error) console.warn("[GG reviews]", d.error, d.detail || "");
    }).catch(() => renderSummary(summary, []));
  };
})();
