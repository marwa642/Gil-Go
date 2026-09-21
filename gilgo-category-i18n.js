/* Gil & Go — belt, tab and filter-category labels in 9 languages
   Languages: en (key), ko, zh (Simplified), ja, ru, es, fr, vi, th
   Usage: tLabel("Buddhist Temples", "ja")  -> "仏教寺院"
   Falls back to English if a label or language is missing. */

const GILGO_I18N = {

  /* ---------- BELTS ---------- */
  "Culture":   { ko:"문화", zh:"文化", ja:"文化", ru:"Культура", es:"Cultura", fr:"Culture", vi:"Văn hóa", th:"วัฒนธรรม" },
  "Hallyu":    { ko:"한류", zh:"韩流", ja:"韓流", ru:"Халлю", es:"Hallyu", fr:"Hallyu", vi:"Hallyu", th:"กระแสเกาหลี" },
  "K-Beauty":  { ko:"K-뷰티", zh:"韩国美妆", ja:"Kビューティー", ru:"K-бьюти", es:"K-Beauty", fr:"K-Beauty", vi:"K-Beauty", th:"เคบิวตี้" },
  "K-Taste":   { ko:"K-미식", zh:"韩国美食", ja:"Kグルメ", ru:"K-вкус", es:"K-Sabor", fr:"K-Saveurs", vi:"K-Ẩm thực", th:"อาหารเกาหลี" },
  "Lodging":   { ko:"숙소", zh:"住宿", ja:"宿泊", ru:"Жильё", es:"Alojamiento", fr:"Hébergement", vi:"Lưu trú", th:"ที่พัก" },

  /* ---------- TABS ---------- */
  "Places":      { ko:"장소", zh:"地点", ja:"スポット", ru:"Места", es:"Lugares", fr:"Lieux", vi:"Địa điểm", th:"สถานที่" },
  "Experiences": { ko:"체험", zh:"体验", ja:"体験", ru:"Впечатления", es:"Experiencias", fr:"Expériences", vi:"Trải nghiệm", th:"ประสบการณ์" },
  "Events":      { ko:"행사", zh:"活动", ja:"イベント", ru:"События", es:"Eventos", fr:"Événements", vi:"Sự kiện", th:"อีเวนต์" },
  "Stores":      { ko:"매장", zh:"商店", ja:"ショップ", ru:"Магазины", es:"Tiendas", fr:"Boutiques", vi:"Cửa hàng", th:"ร้านค้า" },
  "Fan Spots":   { ko:"팬 성지", zh:"粉丝打卡地", ja:"ファンの聖地", ru:"Места для фанатов", es:"Lugares para fans", fr:"Lieux pour fans", vi:"Địa điểm cho fan", th:"จุดเช็กอินของแฟนคลับ" },

  /* ---------- CULTURE · Places ---------- */
  "Buddhist Temples":      { ko:"사찰", zh:"佛教寺庙", ja:"仏教寺院", ru:"Буддийские храмы", es:"Templos budistas", fr:"Temples bouddhistes", vi:"Chùa Phật giáo", th:"วัดพุทธ" },
  "Royal Palaces & Tombs": { ko:"궁궐·왕릉", zh:"王宫与王陵", ja:"王宮・王陵", ru:"Дворцы и царские гробницы", es:"Palacios y tumbas reales", fr:"Palais et tombeaux royaux", vi:"Cung điện & lăng mộ hoàng gia", th:"พระราชวังและสุสานหลวง" },
  "Shrines & Fortresses":  { ko:"사당·성곽", zh:"祠堂与城郭", ja:"祠堂・城郭", ru:"Святилища и крепости", es:"Santuarios y fortalezas", fr:"Sanctuaires et forteresses", vi:"Đền thờ & thành lũy", th:"ศาลเจ้าและป้อมปราการ" },
  "Hanok & Folk Villages": { ko:"한옥·민속마을", zh:"韩屋与民俗村", ja:"韓屋・民俗村", ru:"Ханоки и народные деревни", es:"Hanok y aldeas tradicionales", fr:"Hanok et villages folkloriques", vi:"Hanok & làng dân gian", th:"บ้านฮันอกและหมู่บ้านพื้นบ้าน" },
  "Mural & Art Villages":  { ko:"벽화·예술마을", zh:"壁画与艺术村", ja:"壁画・アート村", ru:"Деревни муралов и искусства", es:"Pueblos de murales y arte", fr:"Villages de fresques et d'art", vi:"Làng bích họa & nghệ thuật", th:"หมู่บ้านภาพวาดฝาผนังและศิลปะ" },
  "Traditional Markets":   { ko:"전통시장", zh:"传统市场", ja:"伝統市場", ru:"Традиционные рынки", es:"Mercados tradicionales", fr:"Marchés traditionnels", vi:"Chợ truyền thống", th:"ตลาดดั้งเดิม" },
  "Museums":               { ko:"박물관", zh:"博物馆", ja:"博物館", ru:"Музеи", es:"Museos", fr:"Musées", vi:"Bảo tàng", th:"พิพิธภัณฑ์" },
  "Galleries":             { ko:"미술관·갤러리", zh:"美术馆与画廊", ja:"美術館・ギャラリー", ru:"Галереи", es:"Galerías", fr:"Galeries", vi:"Phòng tranh", th:"แกลเลอรี" },

  /* ---------- CULTURE · Experiences ---------- */
  "Temple Stay":        { ko:"템플스테이", zh:"寺院寄宿", ja:"テンプルステイ", ru:"Темпл-стей", es:"Estancia en templo", fr:"Séjour au temple", vi:"Lưu trú tại chùa", th:"เทมเปิลสเตย์" },
  "Jjimjilbang":        { ko:"찜질방", zh:"汗蒸房", ja:"チムジルバン", ru:"Чимчильбан (корейская сауна)", es:"Jjimjilbang (sauna coreana)", fr:"Jjimjilbang (sauna coréen)", vi:"Jjimjilbang (xông hơi Hàn Quốc)", th:"จิมจิลบัง (ซาวน่าเกาหลี)" },
  "Cooking Class":      { ko:"요리 클래스", zh:"烹饪课", ja:"料理教室", ru:"Кулинарный мастер-класс", es:"Clase de cocina", fr:"Cours de cuisine", vi:"Lớp học nấu ăn", th:"คลาสทำอาหาร" },
  "Taekwondo":          { ko:"태권도", zh:"跆拳道", ja:"テコンドー", ru:"Тхэквондо", es:"Taekwondo", fr:"Taekwondo", vi:"Taekwondo", th:"เทควันโด" },
  "Tea Ceremony":       { ko:"다도", zh:"茶道体验", ja:"茶道", ru:"Чайная церемония", es:"Ceremonia del té", fr:"Cérémonie du thé", vi:"Trà đạo", th:"พิธีชงชา" },
  "Traditional Crafts": { ko:"전통 공예", zh:"传统手工艺", ja:"伝統工芸", ru:"Традиционные ремёсла", es:"Artesanía tradicional", fr:"Artisanat traditionnel", vi:"Thủ công truyền thống", th:"งานหัตถกรรมดั้งเดิม" },
  "Pottery":            { ko:"도자기 체험", zh:"陶艺", ja:"陶芸", ru:"Гончарное дело", es:"Cerámica", fr:"Poterie", vi:"Làm gốm", th:"งานปั้นเซรามิก" },
  "Stamp Carving":      { ko:"도장 새기기", zh:"篆刻印章", ja:"印鑑彫り", ru:"Резьба печатей", es:"Tallado de sellos", fr:"Gravure de sceaux", vi:"Khắc con dấu", th:"แกะสลักตราประทับ" },
  "Archery":            { ko:"국궁 체험", zh:"传统射箭", ja:"弓術体験", ru:"Стрельба из лука", es:"Tiro con arco", fr:"Tir à l'arc", vi:"Bắn cung", th:"ยิงธนู" },
  "Hanbok":             { ko:"한복 체험", zh:"韩服体验", ja:"韓服体験", ru:"Ханбок", es:"Hanbok", fr:"Hanbok", vi:"Hanbok", th:"ฮันบก" },

  /* ---------- HALLYU · Places ---------- */
  "Entertainment Agencies":         { ko:"엔터테인먼트 소속사", zh:"娱乐经纪公司", ja:"芸能事務所", ru:"Развлекательные агентства", es:"Agencias de entretenimiento", fr:"Agences de divertissement", vi:"Công ty giải trí", th:"ค่ายบันเทิง" },
  "Broadcast & Music Show Studios": { ko:"방송국·음악방송 스튜디오", zh:"电视台与音乐节目录影棚", ja:"放送局・音楽番組スタジオ", ru:"Телестудии и студии музыкальных шоу", es:"Estudios de TV y programas musicales", fr:"Studios TV et émissions musicales", vi:"Đài truyền hình & trường quay show âm nhạc", th:"สถานีโทรทัศน์และสตูดิโอรายการเพลง" },
  "Concert Venues":                 { ko:"공연장", zh:"演唱会场馆", ja:"コンサート会場", ru:"Концертные площадки", es:"Recintos de conciertos", fr:"Salles de concert", vi:"Địa điểm hòa nhạc", th:"สถานที่จัดคอนเสิร์ต" },
  "K-pop Merch & Albums":           { ko:"K-pop 굿즈·앨범", zh:"K-pop周边与专辑", ja:"K-POPグッズ・アルバム", ru:"Мерч и альбомы K-pop", es:"Merch y álbumes de K-pop", fr:"Goodies et albums K-pop", vi:"Hàng lưu niệm & album K-pop", th:"สินค้าและอัลบั้ม K-pop" },
  "K-pop Cafes":                    { ko:"K-pop 카페", zh:"K-pop咖啡馆", ja:"K-POPカフェ", ru:"K-pop кафе", es:"Cafés de K-pop", fr:"Cafés K-pop", vi:"Quán cà phê K-pop", th:"คาเฟ่ K-pop" },
  "Busking & Fan Streets":          { ko:"버스킹·팬 거리", zh:"街头表演与粉丝街", ja:"路上ライブ・ファンストリート", ru:"Улицы бускинга и фанатов", es:"Calles de música callejera y fans", fr:"Rues de musique et de fans", vi:"Phố biểu diễn đường phố & phố fan", th:"ถนนบัสกิ้งและถนนแฟนคลับ" },
  "Photo Booths":                   { ko:"셀프 사진관", zh:"自助照相馆", ja:"セルフ写真館", ru:"Фотобудки", es:"Fotomatones", fr:"Photomatons", vi:"Tiệm chụp ảnh tự động", th:"ตู้ถ่ายรูป" },

  /* ---------- HALLYU · Experiences ---------- */
  "Idol-style Photoshoot":         { ko:"아이돌 콘셉트 촬영", zh:"偶像风格写真", ja:"アイドル風撮影", ru:"Фотосессия в стиле айдолов", es:"Sesión de fotos estilo idol", fr:"Shooting photo style idol", vi:"Chụp ảnh phong cách idol", th:"ถ่ายภาพสไตล์ไอดอล" },
  "K-pop Dance Class":             { ko:"K-pop 댄스 클래스", zh:"K-pop舞蹈课", ja:"K-POPダンスレッスン", ru:"Уроки танцев K-pop", es:"Clase de baile K-pop", fr:"Cours de danse K-pop", vi:"Lớp nhảy K-pop", th:"คลาสเต้น K-pop" },
  "Vocal Lessons for Adults":      { ko:"성인 보컬 레슨", zh:"成人声乐课", ja:"大人向けボーカルレッスン", ru:"Уроки вокала для взрослых", es:"Clases de canto para adultos", fr:"Cours de chant pour adultes", vi:"Lớp thanh nhạc cho người lớn", th:"คลาสร้องเพลงสำหรับผู้ใหญ่" },
  "Instrument Lessons for Adults": { ko:"성인 악기 레슨", zh:"成人乐器课", ja:"大人向け楽器レッスン", ru:"Уроки музыки для взрослых", es:"Clases de instrumentos para adultos", fr:"Cours d'instruments pour adultes", vi:"Lớp nhạc cụ cho người lớn", th:"คลาสดนตรีสำหรับผู้ใหญ่" },
  "Recording Studio Experience":   { ko:"녹음실 체험", zh:"录音棚体验", ja:"レコーディングスタジオ体験", ru:"Запись в студии", es:"Experiencia en estudio de grabación", fr:"Expérience en studio d'enregistrement", vi:"Trải nghiệm phòng thu âm", th:"ประสบการณ์ห้องอัดเสียง" },

  /* ---------- HALLYU · Fan Spots ---------- */
  "Filming Locations": { ko:"촬영지", zh:"拍摄地", ja:"ロケ地", ru:"Места съёмок", es:"Lugares de rodaje", fr:"Lieux de tournage", vi:"Địa điểm quay phim", th:"สถานที่ถ่ายทำ" },
  "Star Handprints":   { ko:"스타 핸드프린팅", zh:"明星手印", ja:"スターの手形", ru:"Отпечатки рук звёзд", es:"Huellas de manos de estrellas", fr:"Empreintes de mains de stars", vi:"Dấu tay ngôi sao", th:"รอยมือดารา" },

  /* ---------- K-BEAUTY · Stores ---------- */
  "Olive Young Stores":           { ko:"올리브영 매장", zh:"Olive Young门店", ja:"オリーブヤング店舗", ru:"Магазины Olive Young", es:"Tiendas Olive Young", fr:"Boutiques Olive Young", vi:"Cửa hàng Olive Young", th:"ร้าน Olive Young" },
  "Other Flagship Stores":        { ko:"기타 플래그십 스토어", zh:"其他旗舰店", ja:"その他の旗艦店", ru:"Другие флагманские магазины", es:"Otras tiendas insignia", fr:"Autres boutiques phares", vi:"Cửa hàng flagship khác", th:"แฟล็กชิปสโตร์อื่น ๆ" },
  "Other Beauty Stores":          { ko:"기타 뷰티 매장", zh:"其他美妆店", ja:"その他のコスメショップ", ru:"Другие магазины косметики", es:"Otras tiendas de belleza", fr:"Autres boutiques beauté", vi:"Cửa hàng làm đẹp khác", th:"ร้านความงามอื่น ๆ" },
  "Underground Shopping Arcades": { ko:"지하상가", zh:"地下商业街", ja:"地下街", ru:"Подземные торговые галереи", es:"Galerías comerciales subterráneas", fr:"Galeries marchandes souterraines", vi:"Khu mua sắm dưới lòng đất", th:"ศูนย์การค้าใต้ดิน" },
  "Skincare Pharmacies":          { ko:"스킨케어 약국", zh:"护肤药妆店", ja:"スキンケア薬局", ru:"Аптеки с уходовой косметикой", es:"Farmacias de cuidado de la piel", fr:"Pharmacies de soins de la peau", vi:"Nhà thuốc chăm sóc da", th:"ร้านขายยาสกินแคร์" },
  "Facial Care Brands":           { ko:"페이셜 케어 브랜드", zh:"面部护理品牌", ja:"フェイシャルケアブランド", ru:"Бренды ухода за лицом", es:"Marcas de cuidado facial", fr:"Marques de soins du visage", vi:"Thương hiệu chăm sóc da mặt", th:"แบรนด์ดูแลผิวหน้า" },
  "Hair & Scalp Care Brands":     { ko:"헤어·두피 케어 브랜드", zh:"头发与头皮护理品牌", ja:"ヘア・頭皮ケアブランド", ru:"Бренды ухода за волосами и кожей головы", es:"Marcas de cuidado del cabello y cuero cabelludo", fr:"Marques de soins cheveux et cuir chevelu", vi:"Thương hiệu chăm sóc tóc & da đầu", th:"แบรนด์ดูแลเส้นผมและหนังศีรษะ" },
  "Body Care Brands":             { ko:"바디 케어 브랜드", zh:"身体护理品牌", ja:"ボディケアブランド", ru:"Бренды ухода за телом", es:"Marcas de cuidado corporal", fr:"Marques de soins du corps", vi:"Thương hiệu chăm sóc cơ thể", th:"แบรนด์ดูแลผิวกาย" },

  /* ---------- K-BEAUTY · Experiences ---------- */
  "Personal Color Analysis": { ko:"퍼스널 컬러 진단", zh:"个人色彩诊断", ja:"パーソナルカラー診断", ru:"Анализ цветотипа", es:"Análisis de color personal", fr:"Colorimétrie personnelle", vi:"Phân tích màu sắc cá nhân", th:"วิเคราะห์สีผิว (Personal Color)" },
  "Hair Salons":             { ko:"헤어숍", zh:"美发店", ja:"ヘアサロン", ru:"Парикмахерские", es:"Peluquerías", fr:"Salons de coiffure", vi:"Tiệm làm tóc", th:"ร้านทำผม" },
  "Nail Salons":             { ko:"네일숍", zh:"美甲店", ja:"ネイルサロン", ru:"Маникюрные салоны", es:"Salones de uñas", fr:"Salons de manucure", vi:"Tiệm làm móng", th:"ร้านทำเล็บ" },
  "Other Beauty Services":   { ko:"기타 뷰티 서비스", zh:"其他美容服务", ja:"その他の美容サービス", ru:"Другие бьюти-услуги", es:"Otros servicios de belleza", fr:"Autres soins beauté", vi:"Dịch vụ làm đẹp khác", th:"บริการความงามอื่น ๆ" },
  "Foot Spa":                { ko:"풋스파", zh:"足疗", ja:"フットスパ", ru:"Спа для ног", es:"Spa de pies", fr:"Spa des pieds", vi:"Spa chân", th:"สปาเท้า" },
  "Spa & Wellness":          { ko:"스파·웰니스", zh:"水疗与养生", ja:"スパ・ウェルネス", ru:"Спа и велнес", es:"Spa y bienestar", fr:"Spa et bien-être", vi:"Spa & chăm sóc sức khỏe", th:"สปาและเวลเนส" },
  "Skin Clinics":            { ko:"피부과", zh:"皮肤科诊所", ja:"皮膚科クリニック", ru:"Дерматологические клиники", es:"Clínicas dermatológicas", fr:"Cliniques dermatologiques", vi:"Phòng khám da liễu", th:"คลินิกผิวหนัง" },
  "Skin & Facial Treatment": { ko:"피부·페이셜 관리", zh:"皮肤与面部护理", ja:"肌・フェイシャルケア", ru:"Уход за кожей и лицом", es:"Tratamientos faciales y de piel", fr:"Soins de la peau et du visage", vi:"Chăm sóc da & mặt", th:"ทรีตเมนต์ผิวและใบหน้า" },
  "Cosmetic Making Class":   { ko:"화장품 만들기 클래스", zh:"化妆品制作课", ja:"コスメ作り体験", ru:"Мастер-класс по созданию косметики", es:"Taller de elaboración de cosméticos", fr:"Atelier de fabrication de cosmétiques", vi:"Lớp làm mỹ phẩm", th:"คลาสทำเครื่องสำอาง" },
  "Perfume Making Class":    { ko:"향수 만들기 클래스", zh:"香水制作课", ja:"香水作り体験", ru:"Мастер-класс по созданию духов", es:"Taller de elaboración de perfumes", fr:"Atelier de création de parfum", vi:"Lớp làm nước hoa", th:"คลาสทำน้ำหอม" },
  "Soap & Candle Craft":     { ko:"비누·캔들 공방", zh:"手工皂与蜡烛制作", ja:"石けん・キャンドル作り", ru:"Мыловарение и свечи", es:"Taller de jabones y velas", fr:"Atelier savons et bougies", vi:"Làm xà phòng & nến", th:"งานทำสบู่และเทียนหอม" },
  "K-Makeup Class":          { ko:"K-메이크업 클래스", zh:"韩式化妆课", ja:"韓国メイクレッスン", ru:"Уроки корейского макияжа", es:"Clase de maquillaje coreano", fr:"Cours de maquillage coréen", vi:"Lớp trang điểm Hàn Quốc", th:"คลาสแต่งหน้าสไตล์เกาหลี" },
  "Makeup Courses":          { ko:"메이크업 과정", zh:"化妆课程", ja:"メイクアップ講座", ru:"Курсы макияжа", es:"Cursos de maquillaje", fr:"Formations en maquillage", vi:"Khóa học trang điểm", th:"คอร์สแต่งหน้า" },

  /* ---------- K-TASTE · Places ---------- */
  "Korean BBQ":                { ko:"고기구이", zh:"韩式烤肉", ja:"韓国焼肉", ru:"Корейское барбекю", es:"Barbacoa coreana", fr:"Barbecue coréen", vi:"Thịt nướng Hàn Quốc", th:"บาร์บีคิวเกาหลี" },
  "Soups & Stews":             { ko:"국·찌개", zh:"汤与炖菜", ja:"スープ・チゲ", ru:"Супы и рагу", es:"Sopas y guisos", fr:"Soupes et ragoûts", vi:"Canh & món hầm", th:"ซุปและสตูว์" },
  "Noodle Houses":             { ko:"면 요리 전문점", zh:"面馆", ja:"麺料理店", ru:"Лапшичные", es:"Casas de fideos", fr:"Restaurants de nouilles", vi:"Quán mì", th:"ร้านบะหมี่" },
  "Chicken & Beer":            { ko:"치킨·맥주", zh:"炸鸡与啤酒", ja:"チキン＆ビール", ru:"Курица и пиво", es:"Pollo frito y cerveza", fr:"Poulet frit et bière", vi:"Gà rán & bia", th:"ไก่ทอดและเบียร์" },
  "Street Food & Bunsik":      { ko:"길거리 음식·분식", zh:"街头小吃与粉食", ja:"屋台グルメ・粉食", ru:"Уличная еда и пунсик", es:"Comida callejera y bunsik", fr:"Street food et bunsik", vi:"Đồ ăn đường phố & bunsik", th:"สตรีทฟู้ดและบุนชิก" },
  "Seafood & Hoe":             { ko:"해산물·회", zh:"海鲜与生鱼片", ja:"海鮮・刺身", ru:"Морепродукты и хве (сырая рыба)", es:"Mariscos y hoe (pescado crudo)", fr:"Fruits de mer et hoe (poisson cru)", vi:"Hải sản & gỏi cá sống", th:"อาหารทะเลและปลาดิบ" },
  "Temple Food & Vegetarian":  { ko:"사찰음식·채식", zh:"寺院料理与素食", ja:"精進料理・ベジタリアン", ru:"Храмовая и вегетарианская кухня", es:"Comida de templo y vegetariana", fr:"Cuisine de temple et végétarienne", vi:"Ẩm thực chùa & món chay", th:"อาหารวัดและมังสวิรัติ" },
  "Traditional Tea Houses":    { ko:"전통 찻집", zh:"传统茶馆", ja:"伝統茶屋", ru:"Традиционные чайные", es:"Casas de té tradicionales", fr:"Maisons de thé traditionnelles", vi:"Quán trà truyền thống", th:"ร้านชาแบบดั้งเดิม" },
  "Makgeolli & Soju Bars":     { ko:"막걸리·소주 주점", zh:"米酒与烧酒酒吧", ja:"マッコリ・焼酎バー", ru:"Бары макколли и соджу", es:"Bares de makgeolli y soju", fr:"Bars à makgeolli et soju", vi:"Quán makgeolli & soju", th:"บาร์มักกอลลีและโซจู" },
  "Dessert & Bakery":          { ko:"디저트·베이커리", zh:"甜品与烘焙", ja:"デザート・ベーカリー", ru:"Десерты и выпечка", es:"Postres y panadería", fr:"Desserts et boulangerie", vi:"Tráng miệng & tiệm bánh", th:"ของหวานและเบเกอรี่" },
  "Market Food Streets":       { ko:"시장 먹자골목", zh:"市场美食街", ja:"市場グルメ横丁", ru:"Улицы еды на рынках", es:"Calles de comida en mercados", fr:"Rues gourmandes des marchés", vi:"Phố ẩm thực trong chợ", th:"ถนนอาหารในตลาด" },

  /* ---------- K-TASTE · Experiences & Events ---------- */
  /* "Cooking Class" is shared with Culture — defined once above */
  "Brewery & Makgeolli Class": { ko:"양조장·막걸리 클래스", zh:"酒厂与米酒酿造课", ja:"醸造所・マッコリ作り体験", ru:"Пивоварня и мастер-класс по макколли", es:"Cervecería y taller de makgeolli", fr:"Brasserie et atelier makgeolli", vi:"Nhà nấu rượu & lớp làm makgeolli", th:"โรงกลั่นและคลาสทำมักกอลลี" },
  "Food Festivals":            { ko:"음식 축제", zh:"美食节", ja:"フードフェスティバル", ru:"Гастрономические фестивали", es:"Festivales gastronómicos", fr:"Festivals gastronomiques", vi:"Lễ hội ẩm thực", th:"เทศกาลอาหาร" },

  /* ---------- LODGING · Places ---------- */
  /* "Temple Stay" is shared with Culture — defined once above */
  "Hanok Stay":            { ko:"한옥스테이", zh:"韩屋住宿", ja:"韓屋ステイ", ru:"Проживание в ханоке", es:"Alojamiento en hanok", fr:"Séjour en hanok", vi:"Lưu trú tại nhà hanok", th:"พักบ้านฮันอก" },
  "Guesthouses & Hostels": { ko:"게스트하우스·호스텔", zh:"民宿与青年旅舍", ja:"ゲストハウス・ホステル", ru:"Гостевые дома и хостелы", es:"Casas de huéspedes y hostales", fr:"Maisons d'hôtes et auberges", vi:"Nhà nghỉ & hostel", th:"เกสต์เฮาส์และโฮสเทล" },
  "Hotels":                { ko:"호텔", zh:"酒店", ja:"ホテル", ru:"Отели", es:"Hoteles", fr:"Hôtels", vi:"Khách sạn", th:"โรงแรม" },
  "Pensions & Resorts":    { ko:"펜션·리조트", zh:"度假民宿与度假村", ja:"ペンション・リゾート", ru:"Пансионаты и курорты", es:"Pensiones y resorts", fr:"Pensions et resorts", vi:"Pension & khu nghỉ dưỡng", th:"เพนชันและรีสอร์ท" },
  "Camping & Glamping":    { ko:"캠핑·글램핑", zh:"露营与豪华露营", ja:"キャンプ・グランピング", ru:"Кемпинг и глэмпинг", es:"Camping y glamping", fr:"Camping et glamping", vi:"Cắm trại & glamping", th:"แคมปิ้งและแกลมปิ้ง" },
  "Budget Stays":          { ko:"가성비 숙소", zh:"经济型住宿", ja:"格安宿", ru:"Бюджетное жильё", es:"Alojamiento económico", fr:"Hébergements petit budget", vi:"Chỗ ở giá rẻ", th:"ที่พักราคาประหยัด" },

  /* ================= v2: labels actually used in gilgo-patch.js ================= */

  /* ---------- Belt buttons & extra tabs ---------- */
  "Culture Belt":   { ko:"문화 벨트", zh:"文化主题", ja:"カルチャー", ru:"Культура", es:"Cultura", fr:"Culture", vi:"Văn hóa", th:"วัฒนธรรม" },
  "Hallyu Belt":    { ko:"한류 벨트", zh:"韩流主题", ja:"韓流", ru:"Халлю", es:"Hallyu", fr:"Hallyu", vi:"Hallyu", th:"กระแสเกาหลี" },
  "K-Beauty Belt":  { ko:"K-뷰티 벨트", zh:"韩国美妆", ja:"Kビューティー", ru:"K-бьюти", es:"K-Beauty", fr:"K-Beauty", vi:"K-Beauty", th:"เคบิวตี้" },
  "K-Taste Belt":   { ko:"K-미식 벨트", zh:"韩国美食", ja:"Kグルメ", ru:"K-вкус", es:"K-Sabor", fr:"K-Saveurs", vi:"K-Ẩm thực", th:"อาหารเกาหลี" },
  "Lodging Belt":   { ko:"숙소 벨트", zh:"住宿", ja:"宿泊", ru:"Жильё", es:"Alojamiento", fr:"Hébergement", vi:"Lưu trú", th:"ที่พัก" },
  "All":            { ko:"전체", zh:"全部", ja:"すべて", ru:"Все", es:"Todo", fr:"Tout", vi:"Tất cả", th:"ทั้งหมด" },
  "Music Shows & Events": { ko:"음악 공연·행사", zh:"音乐演出与活动", ja:"音楽ショー・イベント", ru:"Музыкальные шоу и события", es:"Shows musicales y eventos", fr:"Spectacles musicaux et événements", vi:"Show âm nhạc & sự kiện", th:"โชว์ดนตรีและอีเวนต์" },
  "Restaurants":    { ko:"음식점", zh:"餐厅", ja:"レストラン", ru:"Рестораны", es:"Restaurantes", fr:"Restaurants", vi:"Nhà hàng", th:"ร้านอาหาร" },
  "Cafes":          { ko:"카페", zh:"咖啡馆", ja:"カフェ", ru:"Кафе", es:"Cafés", fr:"Cafés", vi:"Quán cà phê", th:"คาเฟ่" },
  "Places to Stay": { ko:"숙소", zh:"住宿地点", ja:"宿泊施設", ru:"Где остановиться", es:"Dónde alojarse", fr:"Où dormir", vi:"Nơi lưu trú", th:"ที่พัก" },

  /* ---------- K-TASTE · Restaurants ---------- */
  "Samgyetang":           { ko:"삼계탕", zh:"参鸡汤", ja:"サムゲタン", ru:"Самгетан", es:"Samgyetang (sopa de pollo con ginseng)", fr:"Samgyetang (soupe de poulet au ginseng)", vi:"Gà hầm sâm", th:"ซัมกเยทัง (ไก่ตุ๋นโสม)" },
  "Dakgalbi":             { ko:"닭갈비", zh:"辣炒鸡排", ja:"タッカルビ", ru:"Тэккальби", es:"Dakgalbi (pollo salteado picante)", fr:"Dakgalbi (poulet sauté épicé)", vi:"Gà xào cay Dakgalbi", th:"ทักกัลบี (ไก่ผัดเผ็ด)" },
  "Samgyeopsal":          { ko:"삼겹살", zh:"五花肉", ja:"サムギョプサル", ru:"Самгёпсаль", es:"Samgyeopsal (panceta a la parrilla)", fr:"Samgyeopsal (poitrine de porc grillée)", vi:"Thịt ba chỉ nướng", th:"ซัมกยอบซัล (หมูสามชั้นย่าง)" },
  "Gukbap":               { ko:"국밥", zh:"汤饭", ja:"クッパ", ru:"Кукпап", es:"Gukbap (sopa con arroz)", fr:"Gukbap (soupe au riz)", vi:"Cơm canh Gukbap", th:"กุกบับ (ข้าวต้มซุป)" },
  "Bibimbap":             { ko:"비빔밥", zh:"拌饭", ja:"ビビンバ", ru:"Пибимпап", es:"Bibimbap", fr:"Bibimbap", vi:"Cơm trộn Bibimbap", th:"บิบิมบับ" },
  "Naengmyeon":           { ko:"냉면", zh:"冷面", ja:"冷麺", ru:"Нэнмён", es:"Naengmyeon (fideos fríos)", fr:"Naengmyeon (nouilles froides)", vi:"Mì lạnh", th:"แนงมยอน (บะหมี่เย็น)" },
  "Tteokbokki":           { ko:"떡볶이", zh:"炒年糕", ja:"トッポッキ", ru:"Токпокки", es:"Tteokbokki", fr:"Tteokbokki", vi:"Bánh gạo cay", th:"ต็อกบกกี" },
  "Seafood":              { ko:"해산물", zh:"海鲜", ja:"海鮮", ru:"Морепродукты", es:"Mariscos", fr:"Fruits de mer", vi:"Hải sản", th:"อาหารทะเล" },
  "Korean Fried Chicken": { ko:"치킨", zh:"韩式炸鸡", ja:"韓国チキン", ru:"Корейская жареная курица", es:"Pollo frito coreano", fr:"Poulet frit coréen", vi:"Gà rán Hàn Quốc", th:"ไก่ทอดเกาหลี" },
  "Street Food":          { ko:"길거리 음식", zh:"街头小吃", ja:"屋台グルメ", ru:"Уличная еда", es:"Comida callejera", fr:"Street food", vi:"Đồ ăn đường phố", th:"สตรีทฟู้ด" },
  "Halal Restaurants":    { ko:"할랄 음식점", zh:"清真餐厅", ja:"ハラールレストラン", ru:"Халяльные рестораны", es:"Restaurantes halal", fr:"Restaurants halal", vi:"Nhà hàng Halal", th:"ร้านอาหารฮาลาล" },
  "Vegetarian Restaurants": { ko:"채식 음식점", zh:"素食餐厅", ja:"ベジタリアンレストラン", ru:"Вегетарианские рестораны", es:"Restaurantes vegetarianos", fr:"Restaurants végétariens", vi:"Nhà hàng chay", th:"ร้านอาหารมังสวิรัติ" },
  "Halal only":           { ko:"할랄만", zh:"仅清真", ja:"ハラールのみ", ru:"Только халяль", es:"Solo halal", fr:"Halal uniquement", vi:"Chỉ Halal", th:"เฉพาะฮาลาล" },
  "Vegetarian only":      { ko:"채식만", zh:"仅素食", ja:"ベジタリアンのみ", ru:"Только вегетарианское", es:"Solo vegetariano", fr:"Végétarien uniquement", vi:"Chỉ món chay", th:"เฉพาะมังสวิรัติ" },

  /* ---------- K-TASTE · Cafes ---------- */
  "Local Chain Coffee & Bakery": { ko:"국내 체인 카페·베이커리", zh:"本土连锁咖啡与面包店", ja:"韓国チェーンカフェ・ベーカリー", ru:"Местные сети кофеен и пекарен", es:"Cadenas locales de café y panadería", fr:"Chaînes locales de café et boulangerie", vi:"Chuỗi cà phê & bánh mì địa phương", th:"ร้านกาแฟและเบเกอรี่เครือข่ายท้องถิ่น" },
  "Pet Cafe":              { ko:"애견·고양이 카페", zh:"宠物咖啡馆", ja:"動物カフェ", ru:"Кафе с животными", es:"Café de mascotas", fr:"Café animalier", vi:"Cà phê thú cưng", th:"คาเฟ่สัตว์เลี้ยง" },
  "Vintage Cafe":          { ko:"빈티지 카페", zh:"复古咖啡馆", ja:"ヴィンテージカフェ", ru:"Винтажное кафе", es:"Café vintage", fr:"Café vintage", vi:"Cà phê vintage", th:"คาเฟ่วินเทจ" },
  "Hanok Cafe":            { ko:"한옥 카페", zh:"韩屋咖啡馆", ja:"韓屋カフェ", ru:"Кафе в ханоке", es:"Café en hanok", fr:"Café dans un hanok", vi:"Cà phê nhà Hanok", th:"คาเฟ่บ้านฮันอก" },
  "Luxury Cafe":           { ko:"대형·프리미엄 카페", zh:"豪华咖啡馆", ja:"高級カフェ", ru:"Премиальное кафе", es:"Café de lujo", fr:"Café de luxe", vi:"Cà phê cao cấp", th:"คาเฟ่หรู" },
  "Ocean View Cafe":       { ko:"오션뷰 카페", zh:"海景咖啡馆", ja:"オーシャンビューカフェ", ru:"Кафе с видом на море", es:"Café con vista al mar", fr:"Café vue sur mer", vi:"Cà phê view biển", th:"คาเฟ่วิวทะเล" },
  "Workshop Cafe":         { ko:"공방 카페", zh:"工坊咖啡馆", ja:"工房カフェ", ru:"Кафе-мастерская", es:"Café taller", fr:"Café-atelier", vi:"Cà phê xưởng thủ công", th:"คาเฟ่เวิร์กช็อป" },
  "Rooftop Cafe":          { ko:"루프탑 카페", zh:"屋顶咖啡馆", ja:"ルーフトップカフェ", ru:"Кафе на крыше", es:"Café en azotea", fr:"Café sur le toit", vi:"Cà phê sân thượng", th:"คาเฟ่ดาดฟ้า" },
  "Nature & Garden Cafe":  { ko:"자연·정원 카페", zh:"自然花园咖啡馆", ja:"ガーデンカフェ", ru:"Кафе с садом", es:"Café de naturaleza y jardín", fr:"Café nature et jardin", vi:"Cà phê sân vườn", th:"คาเฟ่ธรรมชาติและสวน" },
  "Dessert Cafe":          { ko:"디저트 카페", zh:"甜品咖啡馆", ja:"デザートカフェ", ru:"Кафе-кондитерская", es:"Café de postres", fr:"Café à desserts", vi:"Cà phê tráng miệng", th:"คาเฟ่ของหวาน" },
  "Traditional Tea Cafe":  { ko:"전통 찻집", zh:"传统茶馆", ja:"伝統茶カフェ", ru:"Традиционная чайная", es:"Casa de té tradicional", fr:"Salon de thé traditionnel", vi:"Quán trà truyền thống", th:"ร้านชาแบบดั้งเดิม" },
  "Bakery Cafe":           { ko:"베이커리 카페", zh:"烘焙咖啡馆", ja:"ベーカリーカフェ", ru:"Кафе-пекарня", es:"Café panadería", fr:"Café-boulangerie", vi:"Cà phê tiệm bánh", th:"คาเฟ่เบเกอรี่" },
  "Character Cafe":        { ko:"캐릭터 카페", zh:"主题角色咖啡馆", ja:"キャラクターカフェ", ru:"Тематическое кафе с персонажами", es:"Café temático de personajes", fr:"Café à thème de personnages", vi:"Cà phê nhân vật", th:"คาเฟ่คาแรกเตอร์" },

  /* ---------- LODGING (live labels) ---------- */
  "Guesthouses":           { ko:"게스트하우스", zh:"民宿", ja:"ゲストハウス", ru:"Гостевые дома", es:"Casas de huéspedes", fr:"Maisons d'hôtes", vi:"Nhà nghỉ", th:"เกสต์เฮาส์" },
  "Hostels":               { ko:"호스텔", zh:"青年旅舍", ja:"ホステル", ru:"Хостелы", es:"Hostales", fr:"Auberges de jeunesse", vi:"Hostel", th:"โฮสเทล" },
  "Capsule Hotels":        { ko:"캡슐호텔", zh:"胶囊旅馆", ja:"カプセルホテル", ru:"Капсульные отели", es:"Hoteles cápsula", fr:"Hôtels capsules", vi:"Khách sạn con nhộng", th:"โรงแรมแคปซูล" },
  "Jjimjilbang & Sauna":   { ko:"찜질방·사우나", zh:"汗蒸房与桑拿", ja:"チムジルバン・サウナ", ru:"Чимчильбан и сауна", es:"Jjimjilbang y sauna", fr:"Jjimjilbang et sauna", vi:"Jjimjilbang & xông hơi", th:"จิมจิลบังและซาวน่า" },
  "Jjimjilbang Overnight": { ko:"찜질방 숙박", zh:"汗蒸房过夜", ja:"チムジルバン宿泊", ru:"Ночёвка в чимчильбане", es:"Noche en jjimjilbang", fr:"Nuit en jjimjilbang", vi:"Ngủ qua đêm ở jjimjilbang", th:"ค้างคืนที่จิมจิลบัง" },
  "Traditional Stay":      { ko:"전통 숙소", zh:"传统住宿", ja:"伝統宿", ru:"Традиционное жильё", es:"Alojamiento tradicional", fr:"Hébergement traditionnel", vi:"Lưu trú truyền thống", th:"ที่พักแบบดั้งเดิม" }
};

function tLabel(en, lang){
  if(!lang || lang === 'en') return en;
  const row = GILGO_I18N[en];
  return (row && row[lang]) || en;
}
