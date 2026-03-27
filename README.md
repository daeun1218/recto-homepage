# RECTO Homepage — React

## 시작하기

```bash
npm install
npm start
```

`http://localhost:3000` 에서 확인하세요.

---

## 페이지 구조

```
Header (고정 상단 네비)
│
├── [섹션 1] SplitBanner  — Womenswear (theme="light")
├── TheEditSection         — 여성 상품 3열 (3번째: 호버 시 상품명+가격)
│
├── [섹션 2] SplitBanner  — Menswear (theme="dark")
├── MensEditSection        — 남성 상품 3열
│
├── [섹션 3] CollabBanner — EFFECTOR × RECTO
└── EyewearEditSection     — 아이웨어 상품 3열
```

---

## 이미지 교체 방법

### 1. 이미지 파일 위치

src/assets/images/ 폴더에 이미지를 넣으세요:

  hero-women-left.jpg    ← 우먼스웨어 배너 왼쪽 모델
  hero-women-right.jpg   ← 우먼스웨어 배너 오른쪽 모델
  hero-mens-left.jpg     ← 맨즈웨어 배너 왼쪽 (가방 클로즈업)
  hero-mens-right.jpg    ← 맨즈웨어 배너 오른쪽 모델
  product-tote.jpg       ← 상품: SINGULAR TOTE PIN
  product-jacket.jpg     ← 상품: DRAPE DETAIL SUIT JACKET
  product-dress.jpg      ← 상품: OPEN BACK HIGH NECK DRESS

### 2. 배너 이미지 연결 (App.js)

주석 처리된 import를 활성화:

  import womenLeft  from './assets/images/hero-women-left.jpg';
  import womenRight from './assets/images/hero-women-right.jpg';

SplitBanner에 prop 추가:

  <SplitBanner leftImg={womenLeft} rightImg={womenRight} ... />

### 3. 상품 이미지 연결

womenProducts 배열에 imageUrl 필드 추가 후
TheEditSection.js의 placeholder div를 img 태그로 교체:

  {product.imageUrl ? (
    <img src={product.imageUrl} alt={product.name} className={styles.productImg} />
  ) : (
    <div className={styles.productShape} style={{ background: product.imgBg }} />
  )}

---

## 컴포넌트

  Header.js              — 상단 네비게이션
  SplitBanner.js         — 메인 배너 (Womenswear / Menswear 공용, theme prop으로 제어)
  TheEditSection.js      — 여성 상품 그리드 + 3번째 호버 기능
  MensEditSection.js     — 남성 상품 그리드
  CollabBanner.js        — EFFECTOR × RECTO 콜라보 배너
  EyewearEditSection.js  — 아이웨어 상품 그리드

---

## 폰트
  영문: Outfit 300 / 400
  한글: Noto Sans KR 300 / 400
  → public/index.html 에서 Google Fonts 로드
