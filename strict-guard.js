// =================================================================
// Gil & Go — strict result filter for K-Beauty, K-Taste, Lodging
// Load AFTER fan-spots.js in index.html:
//   <script src="strict-guard.js?v=1"></script>
// =================================================================
(function () {

  // ---------- K-TASTE · restaurants ----------
  const FOOD = { allow: ["음식점"], block: ["카페", "제과", "베이커리", "도시락", "반찬", "식자재", "도매", "배달전문"] };
  const food = (any, extraBlock) => ({ allow: FOOD.allow, any: any, block: FOOD.block.concat(extraBlock || []) });

  // ---------- K-TASTE · cafes ----------
  const CAFE_ALLOW = ["카페", "제과", "베이커리", "디저트", "찻집", "다방", "커피"];
  const CAFE_BLOCK = ["술집", "주점", "호프", "PC방", "노래방", "스터디카페", "룸카페", "보드게임카페"];
  const cafe = (any) => ({ allow: CAFE_ALLOW, any: any, block: CAFE_BLOCK });

  // ---------- LODGING ----------
  const STAY_BLOCK = ["음식점", "카페", "주점", "술집", "모텔", "부동산", "관리사무소", "주차"];

  // ---------- K-BEAUTY ----------
  const BEAUTY_BLOCK = ["음식점", "숙박", "금융", "은행", "ATM", "부동산", "교통", "자동차", "주차", "관리사무소", "보험"];
  const beauty = (extra) => Object.assign({ block: BEAUTY_BLOCK }, extra || {});

  const RULES = {
    // ===== K-Taste · Restaurants =====
    "Samgyetang":           food(["삼계탕", "백숙"]),
    "Dakgalbi":             food(["닭갈비"]),
    "Samgyeopsal":          food(["삼겹", "오겹", "육류", "고기", "돼지"]),
    "Gukbap":               food(["국밥", "설렁탕", "곰탕", "해장국", "순대"]),
    "Bibimbap":             food(["비빔밥"]),
    "Naengmyeon":           food(["냉면", "밀면", "막국수"]),
    "Tteokbokki":           food(["떡볶이", "분식"]),
    "Korean BBQ":           food(["육류", "고기", "갈비", "한우", "구이", "삼겹"]),
    "Seafood":              food(["해물", "해산물", "횟집", "회센터", "물회", "조개", "대게", "생선", "수산", "장어"]),
    "Korean Fried Chicken": food(["치킨", "닭강정"]),
    "Street Food":          food(["포장마차", "분식", "간식", "호떡", "길거리", "시장"]),
    "Halal Restaurants":    food(["할랄", "halal", "케밥", "터키", "인도", "파키스탄", "아랍", "중동", "무슬림"]),
    "Vegetarian Restaurants": food(["채식", "비건", "vegan", "사찰음식"]),

    // ===== K-Taste · Cafes =====
    "Local Chain Coffee & Bakery": cafe(["이디야", "메가", "컴포즈", "파리바게뜨", "탐앤탐스", "할리스", "빽다방", "파스쿠찌", "뚜레쥬르", "커피에반하다"]),
    "Pet Cafe":             cafe(["애견", "고양이", "펫", "강아지", "동물", "캣", "라쿤", "미어캣"]),
    "Vintage Cafe":         cafe(["빈티지", "레트로", "옛날", "고재", "골동"]),
    "Hanok Cafe":           cafe(["한옥", "고택", "전통"]),
    "Luxury Cafe":          cafe(["대형", "프리미엄"]),
    "Ocean View Cafe":      cafe(["오션", "바다", "해변", "비치", "씨뷰"]),
    "Workshop Cafe":        cafe(["공방", "체험", "클래스"]),
    "Rooftop Cafe":         cafe(["루프탑", "옥상", "rooftop"]),
    "Nature & Garden Cafe": cafe(["정원", "숲", "식물", "온실", "가든", "플랜테리어"]),
    "Dessert Cafe":         cafe(["디저트", "케이크", "마카롱", "타르트", "빙수", "도넛"]),
    "Traditional Tea Cafe": cafe(["찻집", "전통차", "다원", "한방차", "티하우스"]),
    "Bakery Cafe":          cafe(["베이커리", "제과", "빵"]),
    "Character Cafe":       cafe(["캐릭터", "테마", "만화"]),

    // ===== Lodging =====
    "Hanok Stay":            { allow: ["숙박", "한옥"], name: ["한옥"], block: STAY_BLOCK },
    "Guesthouses":           { allow: ["숙박"], block: STAY_BLOCK },
    "Hostels":               { allow: ["숙박"], block: STAY_BLOCK },
    "Guesthouses & Hostels": { allow: ["숙박"], block: STAY_BLOCK },
    "Hotels":                { allow: ["호텔"], block: STAY_BLOCK },
    "Capsule Hotels":        { allow: ["숙박"], name: ["캡슐"], block: STAY_BLOCK },
    "Pensions & Resorts":    { allow: ["펜션", "리조트", "콘도", "숙박"], block: STAY_BLOCK },
    "Budget Stays":          { allow: ["숙박"], block: STAY_BLOCK },
    "Traditional Stay":      { allow: ["숙박"], block: STAY_BLOCK },
    "Camping & Glamping":    { allow: ["캠핑", "야영", "글램핑", "카라반", "숙박"], block: STAY_BLOCK.concat(["용품", "장비", "렌탈", "캠핑카판매", "아웃도어"]) },
    "Jjimjilbang & Sauna":   { allow: ["찜질", "사우나", "목욕", "스파"], block: ["음식점", "카페", "모텔", "마사지", "부동산"] },
    "Jjimjilbang Overnight": { allow: ["찜질", "사우나", "목욕", "스파"], block: ["음식점", "카페", "모텔", "마사지", "부동산"] },

    // ===== K-Beauty =====
    "Olive Young Stores":           beauty({ name: ["올리브영", "OLIVE YOUNG", "Olive Young", "올영"] }),
    "Other Flagship Stores":        beauty(),
    "Other Beauty Stores":          beauty({ allow: ["화장품"] }),
    "Underground Shopping Arcades": beauty({ name: ["지하상가", "지하도상가"] }),
    "Skincare Pharmacies":          beauty({ allow: ["약국"], block: BEAUTY_BLOCK.concat(["동물", "한약"]) }),
    "Facial Care Brands":           beauty(),
    "Hair & Scalp Care Brands":     beauty(),
    "Body Care Brands":             beauty(),
    "Personal Color Analysis":      beauty({ any: ["퍼스널", "컬러", "color", "이미지"] }),
    "Hair Salons":                  beauty({ allow: ["미용", "헤어"], block: BEAUTY_BLOCK.concat(["이발", "가발", "학원"]) }),
    "Nail Salons":                  beauty({ allow: ["네일", "미용"], block: BEAUTY_BLOCK.concat(["학원"]) }),
    "Other Beauty Services":        beauty(),
    "Foot Spa":                     beauty({ any: ["발", "풋", "foot"] }),
    "Spa & Wellness":               beauty({ any: ["스파", "spa", "마사지", "찜질", "사우나", "웰니스", "테라피"] }),
    "Skin Clinics":                 beauty({ any: ["피부"], allow: ["병원", "의원", "피부"], block: BEAUTY_BLOCK.concat(["약국", "동물"]) }),
    "Skin & Facial Treatment":      beauty({ any: ["피부", "에스테틱", "페이셜", "스킨", "관리실"] }),
    "Cosmetic Making Class":        beauty(),
    "Perfume Making Class":         beauty({ any: ["향수", "퍼퓸", "조향", "perfume"] }),
    "Soap & Candle Craft":          beauty({ any: ["비누", "캔들", "향초", "soap", "candle"] }),
    "K-Makeup Class":               beauty({ any: ["메이크업", "makeup"] }),
    "Makeup Courses":               beauty({ any: ["메이크업", "makeup"] })
  };

  function has(text, list) {
    const t = String(text || "").toLowerCase();
    return list.some(w => t.includes(String(w).toLowerCase()));
  }

  function check(place, rule) {
    const path = place.category_name || place.kakaoCategory || place.category || "";
    const name = place.place_name || place.name || place.title || "";
    if (rule.allow && rule.allow.length && !has(path, rule.allow)) return false;
    if (rule.name && rule.name.length && !has(name, rule.name)) return false;
    if (rule.any && rule.any.length && !has(name, rule.any) && !has(path, rule.any)) return false;
    if (rule.block && rule.block.length && (has(name, rule.block) || has(path, rule.block))) return false;
    return true;
  }

  let dropped = 0;
  const origGuard = window.passesCategoryGuard;

  window.passesCategoryGuard = function (...args) {
    const place = args.find(a => a && typeof a === "object" &&
      ("category_name" in a || "place_name" in a || "kakaoCategory" in a));
    let label = null;
    const rowObj = args.find(a => a && typeof a === "object" && typeof a.label === "string" && RULES[a.label]);
    if (rowObj) label = rowObj.label;
    else {
      const s = args.find(a => typeof a === "string" && RULES[a]);
      if (s) label = s;
    }

    if (place && label && !check(place, RULES[label])) {
      if (dropped < 30) console.log("[strict-guard] dropped from", label + ":", place.place_name || place.name, "|", place.category_name || place.kakaoCategory || "");
      dropped++;
      return false;
    }
    return origGuard ? origGuard.apply(this, args) : true;
  };

  console.log("[strict-guard] loaded:", Object.keys(RULES).length, "rows protected");
})();
