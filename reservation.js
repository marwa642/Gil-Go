// =================================================================
// Gil & Go: reservation request form in the pin drawer
// Shows on restaurants/cafes (K-Taste) and lodging pins.
// Load AFTER reviews.js in index.html:
//   <script src="reservation.js?v=1"></script>
// =================================================================
(function () {
  "use strict";

  const WORKER = "https://gil-and-go-backend.marwahshaikh2001.workers.dev";

  const L = {
    en: { title:"Reservation", intro:"Send a request here. Gil & Go checks with the place and contacts you to confirm.", open:"Request a reservation", date:"Date", time:"Time", guests:"Guests", checkin:"Check-in", checkout:"Check-out", name:"Your name", ctype:"Contact me by", contact:"Email / ID / number", note:"Requests (optional)", send:"Send request", sending:"Sending…", cancel:"Cancel", sent:"Request sent", status:"Status", pending:"Waiting for confirmation", confirmed:"Confirmed", declined:"Not available — try another time", missing:"Please fill in all fields.", baddates:"Check-out must be after check-in.", failed:"Couldn't send. Please try again.", dup:"You already sent this request.", another:"New request", email:"Email", phone:"Phone / SMS" },
    ko: { title:"예약", intro:"여기서 예약 요청을 보내면 Gil & Go가 업체에 확인한 뒤 연락드립니다.", open:"예약 요청하기", date:"날짜", time:"시간", guests:"인원", checkin:"체크인", checkout:"체크아웃", name:"이름", ctype:"연락 방법", contact:"이메일 / ID / 번호", note:"요청 사항 (선택)", send:"요청 보내기", sending:"보내는 중…", cancel:"취소", sent:"요청 완료", status:"상태", pending:"확인 대기 중", confirmed:"예약 확정", declined:"예약 불가 — 다른 시간을 선택해 주세요", missing:"모든 항목을 입력해 주세요.", baddates:"체크아웃은 체크인 이후여야 합니다.", failed:"전송하지 못했습니다. 다시 시도해 주세요.", dup:"이미 보낸 요청입니다.", another:"새 요청", email:"이메일", phone:"전화 / 문자" },
    zh: { title:"预订", intro:"在这里提交请求，Gil & Go 会向商家确认后联系您。", open:"申请预订", date:"日期", time:"时间", guests:"人数", checkin:"入住", checkout:"退房", name:"您的姓名", ctype:"联系方式", contact:"邮箱 / ID / 号码", note:"特别要求（可选）", send:"提交请求", sending:"提交中…", cancel:"取消", sent:"请求已发送", status:"状态", pending:"等待确认", confirmed:"已确认", declined:"无法预订 — 请换个时间", missing:"请填写所有项目。", baddates:"退房日期必须晚于入住日期。", failed:"发送失败，请重试。", dup:"您已发送过此请求。", another:"新请求", email:"邮箱", phone:"电话 / 短信" },
    ja: { title:"予約", intro:"ここからリクエストを送ると、Gil & Go がお店に確認してご連絡します。", open:"予約をリクエスト", date:"日付", time:"時間", guests:"人数", checkin:"チェックイン", checkout:"チェックアウト", name:"お名前", ctype:"連絡方法", contact:"メール / ID / 番号", note:"ご要望（任意）", send:"リクエストを送信", sending:"送信中…", cancel:"キャンセル", sent:"リクエスト送信済み", status:"ステータス", pending:"確認待ち", confirmed:"予約確定", declined:"予約不可 — 別の時間をお試しください", missing:"すべての項目を入力してください。", baddates:"チェックアウトはチェックインより後にしてください。", failed:"送信できませんでした。もう一度お試しください。", dup:"このリクエストは送信済みです。", another:"新しいリクエスト", email:"メール", phone:"電話 / SMS" },
    ru: { title:"Бронирование", intro:"Отправьте запрос здесь. Gil & Go уточнит у заведения и свяжется с вами для подтверждения.", open:"Запросить бронь", date:"Дата", time:"Время", guests:"Гости", checkin:"Заезд", checkout:"Выезд", name:"Ваше имя", ctype:"Способ связи", contact:"Email / ID / номер", note:"Пожелания (необязательно)", send:"Отправить запрос", sending:"Отправка…", cancel:"Отмена", sent:"Запрос отправлен", status:"Статус", pending:"Ожидает подтверждения", confirmed:"Подтверждено", declined:"Нет мест — выберите другое время", missing:"Заполните все поля.", baddates:"Дата выезда должна быть позже даты заезда.", failed:"Не удалось отправить. Попробуйте ещё раз.", dup:"Вы уже отправили этот запрос.", another:"Новый запрос", email:"Email", phone:"Телефон / SMS" },
    es: { title:"Reserva", intro:"Envía una solicitud aquí. Gil & Go consulta con el lugar y te contacta para confirmar.", open:"Solicitar reserva", date:"Fecha", time:"Hora", guests:"Personas", checkin:"Entrada", checkout:"Salida", name:"Tu nombre", ctype:"Contactarme por", contact:"Email / ID / número", note:"Peticiones (opcional)", send:"Enviar solicitud", sending:"Enviando…", cancel:"Cancelar", sent:"Solicitud enviada", status:"Estado", pending:"Esperando confirmación", confirmed:"Confirmada", declined:"No disponible — prueba otro horario", missing:"Completa todos los campos.", baddates:"La salida debe ser posterior a la entrada.", failed:"No se pudo enviar. Inténtalo de nuevo.", dup:"Ya enviaste esta solicitud.", another:"Nueva solicitud", email:"Email", phone:"Teléfono / SMS" },
    fr: { title:"Réservation", intro:"Envoyez une demande ici. Gil & Go vérifie auprès de l'établissement et vous contacte pour confirmer.", open:"Demander une réservation", date:"Date", time:"Heure", guests:"Personnes", checkin:"Arrivée", checkout:"Départ", name:"Votre nom", ctype:"Me contacter par", contact:"E-mail / ID / numéro", note:"Demandes (facultatif)", send:"Envoyer la demande", sending:"Envoi…", cancel:"Annuler", sent:"Demande envoyée", status:"Statut", pending:"En attente de confirmation", confirmed:"Confirmée", declined:"Indisponible — essayez un autre horaire", missing:"Veuillez remplir tous les champs.", baddates:"Le départ doit être après l'arrivée.", failed:"Échec de l'envoi. Veuillez réessayer.", dup:"Vous avez déjà envoyé cette demande.", another:"Nouvelle demande", email:"E-mail", phone:"Téléphone / SMS" },
    vi: { title:"Đặt chỗ", intro:"Gửi yêu cầu tại đây. Gil & Go sẽ xác nhận với cơ sở và liên hệ với bạn.", open:"Yêu cầu đặt chỗ", date:"Ngày", time:"Giờ", guests:"Số người", checkin:"Nhận phòng", checkout:"Trả phòng", name:"Tên của bạn", ctype:"Liên hệ qua", contact:"Email / ID / số điện thoại", note:"Yêu cầu thêm (không bắt buộc)", send:"Gửi yêu cầu", sending:"Đang gửi…", cancel:"Hủy", sent:"Đã gửi yêu cầu", status:"Trạng thái", pending:"Đang chờ xác nhận", confirmed:"Đã xác nhận", declined:"Không còn chỗ — hãy chọn giờ khác", missing:"Vui lòng điền đầy đủ thông tin.", baddates:"Ngày trả phòng phải sau ngày nhận phòng.", failed:"Không gửi được. Vui lòng thử lại.", dup:"Bạn đã gửi yêu cầu này rồi.", another:"Yêu cầu mới", email:"Email", phone:"Điện thoại / SMS" },
    th: { title:"การจอง", intro:"ส่งคำขอที่นี่ แล้ว Gil & Go จะตรวจสอบกับร้านและติดต่อกลับเพื่อยืนยัน", open:"ขอจอง", date:"วันที่", time:"เวลา", guests:"จำนวนคน", checkin:"เช็กอิน", checkout:"เช็กเอาต์", name:"ชื่อของคุณ", ctype:"ติดต่อทาง", contact:"อีเมล / ไอดี / เบอร์", note:"คำขอเพิ่มเติม (ไม่บังคับ)", send:"ส่งคำขอ", sending:"กำลังส่ง…", cancel:"ยกเลิก", sent:"ส่งคำขอแล้ว", status:"สถานะ", pending:"รอการยืนยัน", confirmed:"ยืนยันแล้ว", declined:"ไม่ว่าง — ลองเวลาอื่น", missing:"กรุณากรอกข้อมูลให้ครบ", baddates:"วันเช็กเอาต์ต้องหลังวันเช็กอิน", failed:"ส่งไม่สำเร็จ กรุณาลองอีกครั้ง", dup:"คุณส่งคำขอนี้ไปแล้ว", another:"คำขอใหม่", email:"อีเมล", phone:"โทร / SMS" }
  };

  function lang() {
    try { if (typeof currentLang !== "undefined" && L[currentLang]) return currentLang; } catch (e) {}
    try { const s = localStorage.getItem("gilgo_lang"); if (L[s]) return s; } catch (e) {}
    return "en";
  }
  function t(k) { const p = L[lang()] || L.en; return p[k] || L.en[k] || k; }

  const style = document.createElement("style");
  style.textContent = `
  .ggv { margin: 16px 0; padding-top: 14px; border-top: 1px solid rgba(127,127,127,.3); }
  .ggv h3 { margin: 0 0 6px; font-size: 17px; }
  .ggv-intro { font-size: 13px; margin: 0 0 10px; opacity: .8; }
  .ggv-btn { font: inherit; font-size: 16px; font-weight: 700; width: 100%; min-height: 50px; border-radius: 12px; border: 2px solid currentColor; background: rgba(127,127,127,.14); color: inherit; cursor: pointer; }
  .ggv-btn:disabled { opacity: .5; }
  .ggv-form { display: grid; gap: 10px; padding: 12px; border-radius: 12px; background: rgba(127,127,127,.1); }
  .ggv-form label { display: grid; gap: 4px; font-size: 13px; }
  .ggv-form select, .ggv-form input, .ggv-form textarea { font: inherit; font-size: 16px; color: inherit; background: rgba(255,255,255,.6); border: 1px solid rgba(127,127,127,.4); border-radius: 8px; padding: 8px 10px; width: 100%; box-sizing: border-box; }
  .ggv-form textarea { min-height: 70px; resize: vertical; }
  .ggv-two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .ggv-actions { display: flex; gap: 8px; }
  .ggv-actions button { flex: 1; }
  .ggv-cancel { font: inherit; font-size: 15px; min-height: 50px; border-radius: 12px; border: 1px solid rgba(127,127,127,.5); background: none; color: inherit; cursor: pointer; }
  .ggv-msg { font-size: 13px; margin: 0; }
  .ggv-card { padding: 12px; border-radius: 12px; background: rgba(127,127,127,.12); display: grid; gap: 4px; font-size: 14px; margin-bottom: 10px; }
  .ggv-card b { font-size: 15px; }
  .ggv-badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 13px; font-weight: 700; }
  .ggv-badge.pending { background: #f3d9a4; color: #5a3b00; }
  .ggv-badge.confirmed { background: #bfe3c6; color: #0f4d1d; }
  .ggv-badge.declined { background: #f2c1bb; color: #6b1308; }
  `;
  document.head.appendChild(style);

  function el(tag, attrs, text) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function pick(o, keys) { for (const k of keys) if (o && o[k] != null && o[k] !== "") return o[k]; return null; }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function api(payload) {
    return fetch(WORKER, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(r => r.json());
  }
  function ymd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

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

  function beltName() {
    const out = [];
    try { out.push(currentTheme); } catch (e) {}
    try { out.push(activeTheme); } catch (e) {}
    try { out.push(currentBelt); } catch (e) {}
    return out.filter(Boolean).join(" ");
  }

  function kindOf(site) {
    const code = pick(site, ["category_group_code", "categoryGroupCode"]);
    if (code === "FD6" || code === "CE7") return "food";
    if (code === "AD5") return "stay";
    const ct = String(pick(site, ["contenttypeid", "contentTypeId"]) || "");
    if (ct === "39") return "food";
    if (ct === "32") return "stay";
    const cat = String(pick(site, ["category_name", "categoryName", "category"]) || "");
    if (/음식점|카페|restaurant|cafe/i.test(cat)) return "food";
    if (/숙박|호텔|펜션|게스트하우스|캠핑|글램핑|한옥스테이|lodging|hotel/i.test(cat)) return "stay";
    const belt = beltName();
    if (/taste|food/i.test(belt)) return "food";
    if (/lodg|stay/i.test(belt)) return "stay";
    return null;
  }

  function saved(key) { return (lsGet("gilgo_resv") || {})[key] || []; }
  function save(key, rec) {
    const all = lsGet("gilgo_resv") || {};
    all[key] = [rec].concat(all[key] || []).slice(0, 5);
    lsSet("gilgo_resv", all);
  }

  function statusCard(rec) {
    const card = el("div", { class: "ggv-card" });
    card.appendChild(el("b", null, t("sent") + " · #" + rec.id));
    const when = rec.kind === "food" ? rec.date + " " + rec.time : rec.date + " → " + rec.checkout;
    card.appendChild(el("span", null, when + " · 👥 " + rec.guests));
    const line = el("span", null, t("status") + ": ");
    const badge = el("span", { class: "ggv-badge pending" }, t("pending"));
    line.appendChild(badge);
    card.appendChild(line);
    api({ type: "reservationStatus", id: rec.id, code: rec.code }).then(d => {
      const s = d && d.status;
      if (s === "confirmed" || s === "declined") { badge.className = "ggv-badge " + s; badge.textContent = t(s); }
    }).catch(() => {});
    return card;
  }

  function buildForm(site, kind, key, onDone, onCancel) {
    const form = el("form", { class: "ggv-form", novalidate: "" });
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    const field = (labelKey, input) => { const lab = el("label", null, t(labelKey)); lab.appendChild(input); return lab; };

    let dateIn, timeIn, outIn;
    const two = el("div", { class: "ggv-two" });

    if (kind === "food") {
      dateIn = el("input", { type: "date", min: ymd(today), value: ymd(today), required: "" });
      timeIn = el("select", { required: "" });
      for (let h = 10; h <= 22; h++) {
        ["00", "30"].forEach(m => {
          if (h === 22 && m === "30") return;
          const v = String(h).padStart(2, "0") + ":" + m;
          const o = el("option", { value: v }, v);
          if (v === "18:00") o.selected = true;
          timeIn.appendChild(o);
        });
      }
      two.appendChild(field("date", dateIn));
      two.appendChild(field("time", timeIn));
    } else {
      dateIn = el("input", { type: "date", min: ymd(today), value: ymd(today), required: "" });
      outIn = el("input", { type: "date", min: ymd(tomorrow), value: ymd(tomorrow), required: "" });
      dateIn.addEventListener("change", () => {
        const d = new Date(dateIn.value + "T00:00:00");
        if (!isNaN(d)) {
          const next = ymd(new Date(d.getTime() + 86400000));
          outIn.min = next;
          if (!outIn.value || outIn.value <= dateIn.value) outIn.value = next;
        }
      });
      two.appendChild(field("checkin", dateIn));
      two.appendChild(field("checkout", outIn));
    }
    form.appendChild(two);

    const guestsIn = el("select");
    for (let i = 1; i <= 12; i++) { const o = el("option", { value: String(i) }, String(i)); if (i === 2) o.selected = true; guestsIn.appendChild(o); }
    form.appendChild(field("guests", guestsIn));

    const nameIn = el("input", { type: "text", maxlength: "80", autocomplete: "name", required: "" });
    form.appendChild(field("name", nameIn));

    const ctypeIn = el("select");
    [["email", t("email")], ["kakaotalk", "KakaoTalk"], ["whatsapp", "WhatsApp"], ["line", "LINE"], ["phone", t("phone")]]
      .forEach(([v, label]) => ctypeIn.appendChild(el("option", { value: v }, label)));
    const contactIn = el("input", { type: "text", maxlength: "120", required: "" });
    const two2 = el("div", { class: "ggv-two" });
    two2.appendChild(field("ctype", ctypeIn));
    two2.appendChild(field("contact", contactIn));
    form.appendChild(two2);

    const noteIn = el("textarea", { maxlength: "500" });
    form.appendChild(field("note", noteIn));

    const msg = el("p", { class: "ggv-msg", role: "status" });
    form.appendChild(msg);

    const row = el("div", { class: "ggv-actions" });
    const cancelBtn = el("button", { type: "button", class: "ggv-cancel" }, t("cancel"));
    const sendBtn = el("button", { type: "submit", class: "ggv-btn" }, t("send"));
    row.appendChild(cancelBtn);
    row.appendChild(sendBtn);
    form.appendChild(row);

    const me = lsGet("gilgo_resv_me") || {};
    if (me.name) nameIn.value = me.name;
    if (me.ctype) ctypeIn.value = me.ctype;
    if (me.contact) contactIn.value = me.contact;

    cancelBtn.addEventListener("click", onCancel);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.textContent = "";
      const name = nameIn.value.trim(), contact = contactIn.value.trim();
      if (!name || !contact || !dateIn.value || (outIn && !outIn.value)) { msg.textContent = t("missing"); return; }
      if (outIn && outIn.value <= dateIn.value) { msg.textContent = t("baddates"); return; }

      sendBtn.disabled = true; sendBtn.textContent = t("sending");
      const payload = {
        type: "reservationCreate", kind: kind, placeKey: key,
        placeName: site.name || site.place_name || site.title || "",
        placePhone: pick(site, ["phone", "tel"]) || "",
        placeAddress: pick(site, ["road_address_name", "address_name", "addr1", "address"]) || "",
        date: dateIn.value, time: timeIn ? timeIn.value : "", checkout: outIn ? outIn.value : "",
        guests: guestsIn.value, name: name, contactType: ctypeIn.value, contact: contact,
        note: noteIn.value.trim(), lang: lang()
      };

      try {
        const d = await api(payload);
        if (d && d.ok) {
          lsSet("gilgo_resv_me", { name: name, ctype: ctypeIn.value, contact: contact });
          const rec = { id: d.id, code: d.code, kind: kind, date: payload.date, time: payload.time, checkout: payload.checkout, guests: payload.guests };
          save(key, rec);
          onDone(rec);
          return;
        }
        const err = d && d.error;
        msg.textContent = err === "duplicate" ? t("dup") : err === "dates" ? t("baddates") : err === "missing" ? t("missing") : t("failed");
        if (err && !["duplicate", "dates", "missing"].includes(err)) console.warn("[GG reservation]", err);
      } catch (e2) {
        msg.textContent = t("failed");
      }
      sendBtn.disabled = false; sendBtn.textContent = t("send");
    });

    return form;
  }

  if (typeof window.openDrawer !== "function") {
    console.warn("[GG reservation] openDrawer not found. Load reservation.js after reviews.js.");
    return;
  }

  let loggedOnce = false;
  const prevOpenDrawer = window.openDrawer;
  window.openDrawer = function (site) {
    prevOpenDrawer.apply(this, arguments);
    if (!site) return;

    const container = (typeof drawerContent !== "undefined" && drawerContent) || document.getElementById("drawerContent");
    if (!container) return;

    const old = container.querySelector(".ggv");
    if (old) old.remove();

    const kind = kindOf(site);
    if (!loggedOnce) { console.log("[GG reservation] kind:", kind, "belt:", beltName(), site); loggedOnce = true; }
    if (!kind) return;

    const key = placeKey(site);
    const box = el("section", { class: "ggv" });
    box.appendChild(el("h3", null, "📅 " + t("title")));

    const cards = el("div");
    saved(key).forEach(rec => cards.appendChild(statusCard(rec)));
    box.appendChild(cards);

    box.appendChild(el("p", { class: "ggv-intro" }, t("intro")));
    const openBtn = el("button", { type: "button", class: "ggv-btn" }, saved(key).length ? t("another") : t("open"));
    box.appendChild(openBtn);

    openBtn.addEventListener("click", () => {
      openBtn.hidden = true;
      const form = buildForm(site, kind, key, (rec) => {
        form.remove();
        cards.insertBefore(statusCard(rec), cards.firstChild);
        openBtn.textContent = t("another");
        openBtn.hidden = false;
      }, () => { form.remove(); openBtn.hidden = false; });
      box.appendChild(form);
      form.querySelector("input, select").focus();
    });

    const anchor = container.querySelector(".ggd") || container.querySelector(".loc");
    if (anchor) anchor.insertAdjacentElement("afterend", box);
    else container.appendChild(box);
  };
})();
