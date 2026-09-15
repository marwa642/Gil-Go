// Gil & Go — belt and filter section names.
// Load AFTER translations.js and BEFORE i18n.js.
// This merges extra keys into TRANSLATIONS without editing that file.

const BELT_LABELS = {
  en: {
    belt_culture: "Culture Belt",
    belt_hallyu: "Hallyu Belt",
    belt_beauty: "K-Beauty Belt",
    belt_ktaste: "K-Taste Belt",
    belt_lodging: "Lodging Belt",
    section_all: "All",
    section_places: "Places",
    section_experiences: "Experiences",
    section_events: "Music shows & events",
    choose_belt: "Choose a belt",
    choose_belt_sub: "Pick a theme, or browse everything",
    show_everything: "Show me everything"
  },
  ko: {
    belt_culture: "문화 벨트",
    belt_hallyu: "한류 벨트",
    belt_beauty: "K-뷰티 벨트",
    belt_ktaste: "K-푸드 벨트",
    belt_lodging: "숙소 벨트",
    section_all: "전체",
    section_places: "장소",
    section_experiences: "체험",
    section_events: "공연 및 행사",
    choose_belt: "벨트를 선택하세요",
    choose_belt_sub: "테마를 고르거나 전체를 둘러보세요",
    show_everything: "전체 보기"
  },
  zh: {
    belt_culture: "文化路线",
    belt_hallyu: "韩流路线",
    belt_beauty: "韩妆路线",
    belt_ktaste: "美食路线",
    belt_lodging: "住宿路线",
    section_all: "全部",
    section_places: "地点",
    section_experiences: "体验",
    section_events: "演出与活动",
    choose_belt: "选择路线",
    choose_belt_sub: "挑一个主题，或浏览全部",
    show_everything: "浏览全部"
  },
  ja: {
    belt_culture: "文化ベルト",
    belt_hallyu: "韓流ベルト",
    belt_beauty: "K-ビューティーベルト",
    belt_ktaste: "グルメベルト",
    belt_lodging: "宿泊ベルト",
    section_all: "すべて",
    section_places: "スポット",
    section_experiences: "体験",
    section_events: "公演・イベント",
    choose_belt: "ベルトを選ぶ",
    choose_belt_sub: "テーマを選ぶか、すべて見る",
    show_everything: "すべて見る"
  },
  ru: {
    belt_culture: "Культурный маршрут",
    belt_hallyu: "Маршрут халлю",
    belt_beauty: "Маршрут K-beauty",
    belt_ktaste: "Гастрономический маршрут",
    belt_lodging: "Где остановиться",
    section_all: "Все",
    section_places: "Места",
    section_experiences: "Впечатления",
    section_events: "Концерты и события",
    choose_belt: "Выберите маршрут",
    choose_belt_sub: "Выберите тему или посмотрите всё",
    show_everything: "Показать всё"
  },
  es: {
    belt_culture: "Ruta cultural",
    belt_hallyu: "Ruta Hallyu",
    belt_beauty: "Ruta K-beauty",
    belt_ktaste: "Ruta gastronómica",
    belt_lodging: "Ruta de alojamiento",
    section_all: "Todo",
    section_places: "Lugares",
    section_experiences: "Experiencias",
    section_events: "Conciertos y eventos",
    choose_belt: "Elige una ruta",
    choose_belt_sub: "Elige un tema o explora todo",
    show_everything: "Ver todo"
  },
  fr: {
    belt_culture: "Route culturelle",
    belt_hallyu: "Route Hallyu",
    belt_beauty: "Route K-beauté",
    belt_ktaste: "Route gastronomique",
    belt_lodging: "Route hébergement",
    section_all: "Tout",
    section_places: "Lieux",
    section_experiences: "Expériences",
    section_events: "Concerts et événements",
    choose_belt: "Choisissez une route",
    choose_belt_sub: "Choisissez un thème ou explorez tout",
    show_everything: "Tout voir"
  },
  vi: {
    belt_culture: "Tuyến văn hóa",
    belt_hallyu: "Tuyến Hallyu",
    belt_beauty: "Tuyến K-beauty",
    belt_ktaste: "Tuyến ẩm thực",
    belt_lodging: "Tuyến lưu trú",
    section_all: "Tất cả",
    section_places: "Địa điểm",
    section_experiences: "Trải nghiệm",
    section_events: "Biểu diễn và sự kiện",
    choose_belt: "Chọn một tuyến",
    choose_belt_sub: "Chọn chủ đề hoặc xem tất cả",
    show_everything: "Xem tất cả"
  },
  th: {
    belt_culture: "เส้นทางวัฒนธรรม",
    belt_hallyu: "เส้นทางฮัลยู",
    belt_beauty: "เส้นทาง K-beauty",
    belt_ktaste: "เส้นทางอาหาร",
    belt_lodging: "เส้นทางที่พัก",
    section_all: "ทั้งหมด",
    section_places: "สถานที่",
    section_experiences: "ประสบการณ์",
    section_events: "การแสดงและกิจกรรม",
    choose_belt: "เลือกเส้นทาง",
    choose_belt_sub: "เลือกธีม หรือดูทั้งหมด",
    show_everything: "ดูทั้งหมด"
  }
};

// Merge into the main table.
Object.keys(BELT_LABELS).forEach(code => {
  if (!TRANSLATIONS[code]) TRANSLATIONS[code] = {};
  Object.assign(TRANSLATIONS[code], BELT_LABELS[code]);
});
