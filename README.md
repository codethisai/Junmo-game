# 🫠 강준모의 소개팅

> AI 기반 한국어 소개팅 시뮬레이터 · 비주얼노벨 스타일

**현재 버전:** v0.0 (배포 완성 단계)  
**목표:** v1.0 정식 출시 · DAU 200명 · AI 비용 0원

---

## 🗺️ 개발 로드맵

### ✅ v0.0 — 배포 완성 `진행 중`
> 목표: 게임 URL 생성, 누구나 접속 가능한 상태

- [ ] `0.0-1` GitHub 파일 구조 완성 (src/App.jsx, src/index.js, public/index.html, package.json)
- [ ] `0.0-2` Vercel 배포 성공 (Create React App 선택 → Deploy)
- [ ] `0.0-3` API 키 환경변수로 이동 (REACT_APP_ANTHROPIC_KEY)
- [ ] `0.0-4` Vercel Analytics 켜기 (무료 DAU 확인)

**비용:** 0원 | **AI:** Claude API | **인프라:** Vercel 무료

---

### 🔄 v0.1 — 비용 0원 안정화 `예정`
> 목표: 비용 0원으로 안정적 운영, Cursor 개발환경 완성

- [ ] `0.1-1` Groq API 교체 (api.anthropic.com → api.groq.com · llama-3.3-70b-versatile)
- [ ] `0.1-2` 일일 플레이 횟수 제한 (1인당 20회 · localStorage · 자정 리셋)
- [ ] `0.1-3` API 에러 처리 개선 (자동 재시도 2회 · 재시도 버튼)
- [ ] `0.1-4` Cursor 개발환경 세팅 (cursor.com · GitHub 연동 · 이후 복붙 없이 작업)

**비용:** 0원 | **AI:** Groq 무료 | **DAU 커버:** ~50명

---

### 🎮 v0.2 — 게임 완성도 `예정`
> 목표: 게임 재미 향상, 지인 베타 테스트 시작

- [ ] `0.2-1` AI 선택지 카드 시스템 (매 턴 선택지 3개 자동 생성 · 자유입력 유지)
- [ ] `0.2-2` 스테이지별 고유 이벤트 (침묵타이머 / 위기이벤트 / 프로포즈 카운트다운)
- [ ] `0.2-3` 준모 소개팅 이력서 (플레이 기록 누적 · 배운 교훈 저장)
- [ ] `0.2-4` 지은·수아 전용 캐릭터 이미지 추가
- [ ] `0.2-5` 숨겨진 엔딩 4종 (친구존 전문가 / 말보다 진심 / 직진 / 삼각관계)
- [ ] `0.2-6` 모바일 반응형 최적화

**비용:** 0원 | **AI:** Groq 무료 | **DAU 커버:** ~50명

---

### 🔧 v0.3 — 백엔드 구축 `DAU 50명 이후`
> 목표: API 키 완전 보호, 기기 간 데이터 동기화, 운영 지표 확인

- [ ] `0.3-1` Vercel API Route 구축 (브라우저 → Vercel 함수 → AI API · API 키 서버사이드)
- [ ] `0.3-2` Supabase DB 연동 (세이브 데이터 서버 저장 · 기기 변경 대응)
- [ ] `0.3-3` 익명 유저 식별 시스템 (UUID · 회원가입 없이 유저 구분)
- [ ] `0.3-4` 관리자 대시보드 (DAU · 총 플레이 수 · 엔딩 분포 · API 호출 수)
- [ ] `0.3-5` Groq 유료 전환 + 월 한도 설정 (예산 내 비용 통제)

**비용:** 1~3만원/월 | **AI:** Groq 유료 | **DAU 커버:** ~200명

---

### 🚀 v1.0 — 정식 출시 `DAU 200명 달성 후`
> 목표: AI 비용 0원, 수익 발생, 정식 서비스 오픈

- [ ] `1.0-1` 맥미니 Ollama + EXAONE 3.5-7.8B 세팅 (`ollama pull exaone3.5:7.8b`)
- [ ] `1.0-2` 맥미니 외부 접속 설정 (포트포워딩 · 고정IP 또는 ngrok)
- [ ] `1.0-3` AI 엔진 맥미니로 교체 (Groq URL → 맥미니 IP · 환경변수만 변경)
- [ ] `1.0-4` 수익 모델 도입 (Google AdSense 또는 프리미엄 해제 인앱결제)
- [ ] `1.0-5` 커스텀 도메인 연결 (가비아 구매 · Vercel 연결 · HTTPS 자동)
- [ ] `1.0-6` 법적 문서 작성 (개인정보처리방침 · 이용약관 · /privacy /terms)
- [ ] `1.0-7` SNS 홍보 + 정식 런칭 (에브리타임 · 트위터 · 커뮤니티)

**비용:** 전기세만 | **AI:** EXAONE 자체 서버 | **DAU 목표:** 500명+

---

## 🏗️ 서버 아키텍처

```
현재 (v0.0~v0.2)
사용자 브라우저 → Vercel (파일 서빙) → Groq API (AI)
                                       → 브라우저 스토리지 (세이브)

목표 (v0.3~)
사용자 브라우저 → Vercel 프론트엔드
                → Vercel API Route (API 키 보호)
                  → Groq / 맥미니 EXAONE (AI)
                → Supabase DB (세이브 · 유저 데이터)

v1.0
사용자 브라우저 → Vercel 프론트엔드
                → Vercel API Route
                  → 맥미니 Ollama EXAONE 3.5-7.8B (AI · 비용 0원)
                → Supabase DB
```

---

## 💰 비용 로드맵

| 버전 | AI 비용 | 인프라 | 예상 DAU |
|------|---------|--------|---------|
| v0.0~v0.2 | 0원 (Groq 무료) | 0원 (Vercel 무료) | ~50명 |
| v0.3 | 1~3만원 (Groq 유료) | 0원 | ~200명 |
| v1.0 | 전기세만 (맥미니) | 도메인 1만원/월 | 500명+ |

**맥미니 도입 기준:** DAU 200명 이상 3개월 유지 + 월 Groq 비용 20만원 초과 + 월 수익 발생 확인 후 결정

---

## 🛠️ 기술 스택

| 구분 | 기술 | 비고 |
|------|------|------|
| 프론트엔드 | React (JSX) | 단일 파일 구조 |
| 배포 | Vercel | GitHub 자동 연동 |
| AI (현재) | Groq API · llama-3.3-70b | 무료 플랜 |
| AI (목표) | EXAONE 3.5-7.8B · Ollama | 맥미니 자체 서버 |
| DB | Supabase | v0.3부터 도입 |
| 코드 저장 | GitHub | codethisai/Junmo-game |
| 개발 도구 | Cursor AI | v0.1부터 사용 |

---

## 📁 프로젝트 구조

```
Junmo-game/
├── public/
│   ├── index.html
│   └── assets/
│       ├── backgrounds/   ← 스테이지별 배경 webp
│       └── characters/    ← 누끼(배경제거) 캐릭터 webp (알파)
├── src/
│   ├── App.jsx            ← 메인 진입점
│   ├── index.js
│   ├── components/        ← SceneRenderer, AffBar 등 UI
│   ├── screens/           ← GameScreen 등 화면 (getSceneKey 분기)
│   ├── data/
│   │   ├── partners.js    ← 히로인 프로필(유정/지은/수아)
│   │   ├── scenes.js      ← 씬별 배경+캐릭터 매핑
│   │   ├── script_*_s{1..5}.js ← 히로인×스테이지 대사
│   │   └── achievements.js, content.js
│   └── utils/
├── jieun_s4_expressions.md ← 지은 S4 표정·에티튜드 작업 시트
├── package.json
└── README.md              ← 이 파일
```

---

## 🎨 작업 로그 — 캐릭터/배경 이미지 파이프라인 (2026-06)
> `0.2-4 지은·수아 전용 캐릭터 이미지` 작업. 학습용으로 과정·규칙·현황을 모두 기록.

### 1) 표시 로직 (핵심)
- 캐릭터 표정은 **호감도(affinity)로 자동 선택**: `aff≥70 → smile`, `35~69 → neutral`, `<35 → bored` (`src/screens/GameScreen.jsx` `getCharacterExpression`).
- 씬은 `src/data/scenes.js`의 `SCENES` 객체에 `{ name, bg, characters:{ <prefix>_smile/neutral/bored } }` 형태로 정의.
- 히로인별 prefix: **유정=`yujung`**(파트너 id는 `yumi`, 이미지명만 yujung), **수아=`sua`**, **지은=`jieun`**.
- `getSceneKey()`가 `partnerId`+`stageId`(+호감도)로 씬 키를 고름. 전용 씬이 없으면 공용 `S1_CAFE…`(유정 이미지)로 **폴백**.
- 이미지 404 시 `<img>` onError로 안전 폴백 → 깨지지 않음.

### 2) 누끼(배경제거) 레시피 — 서버 1GB RAM 주의
- **rembg `isnet-anime`** 모델을 Python API로 호출 (CLI는 `filetype` 모듈 이슈로 실패).
  `new_session("isnet-anime")` 후 `remove(img, session=...)`. 모델은 `~/.u2net/` 캐시.
- 검은 배경/흰 배경/합성 배경 모두 분리 가능. 합성본은 `opaque_ratio`로 잔여배경 검증.
- 메모리 보호: `OMP_NUM_THREADS=2` + `timeout`, **한 번에 한 프로세스**(여러 장은 세션 1회 로드 후 순차). available <500Mi면 사전 경고(swap 4GB로 동작).
- webp 변환: 캐릭터 `cwebp -q 90`(알파 유지), 배경 `cwebp -q 80`.

### 3) 파일명 규칙
- 배경: `<heroine>_s<n>_<place>.webp` (예: `jieun_s4_jeongdok.webp`)
- 캐릭터: `<heroine>_<smile|neutral|bored>_s<n>.webp` (수아는 `<expr>_<룩>` 혼용)
- 이벤트 컷(CG): `<heroine>_s<n>_<name>_cg.webp` (씬엔 미연결, 연출용 보관)

### 4) 히로인별 전용 이미지 현황
| 스테 | 유정(공용 씬) | 수아 | 지은 |
|---|---|---|---|
| S1 | 연남동 카페 ✅3 | 카페 ✅(1·임시) | 북카페 ✅3 |
| S2 | 한강 낮/밤 ✅3 | 스튜디오 ✅(1) | 경의선숲길 ✅3 |
| S3 | 이자카야 ✅3 / 영화 ✅2 | 집(밤) ✅3 | 연세대도서관 ✅3 |
| S4 | 아파트 낮/밤/입구 ✅3 | 할머니집(오후) ✅3 | 정독도서관(비) ✅3 +간파CG2 |
| S5 | 루프탑 식사/바/테라스 ⚠️ | 남산 창문/케이블카 ✅(각1) | 석촌호수 벚꽃 ✅(1) |

### 5) ⚠️ 표정 3종 미만 씬 (보강 필요 목록)
호감도 슬롯(smile/neutral/bored) 중 **서로 다른 이미지가 3개 미만**인 곳:
| 씬 | 현재 distinct | 메모 |
|---|---|---|
| `S3_MOVIE` (유정 저호감 S3) | 2 | bored=neutral 재사용 |
| `S5_ROOFTOP_DINING/BAR/TERRACE` (유정 S5) | 1 | smile만 슬롯 정의, `surprised/emotional` 키는 호감도 로직이 조회 안 함 → neutral/bored가 smile로 폴백 |
| `SUA_S1_CAFE` | 1 | rembg 임시판, 정식 누끼·표정 추가 예정 |
| `SUA_S2_STUDIO` | 1 | 표정 2종 추가 예정 |
| `SUA_S5_WINDOW_NIGHT` / `SUA_S5_NAMSAN_FINALE` | 1 | 피날레, 단일 이미지 공용 |
| `JIEUN_S5_SEOKCHON` | 1 | 단일 이미지 공용, 표정 추가 예정 |

### 6) 산출물(스토리/아트)
- `src/data/script_jieun_s4_draft.js` — 지은 S4 「흔들림·읽히는 자의 공포」 11턴 드래프트 (게임 **미연결**, 검토 후 승격 예정).
- `jieun_s4_expressions.md` — 지은 S4 표정·에티튜드 시트 + 마누스 생성 프롬프트.

### 7) 알려진 불일치(추후 정리)
- **씬 객체명 `SUA_S4_BURNOUT`** 의 내용은 실제로 "준모의 할머니 집(오후)" — 이름만 옛 번아웃 잔재.
- **지은 스크립트 장소 ≠ 이미지 컨셉**: 현재 `script_jieun_s*.js`는 미술관/뮤지컬/지은집/준모집, 이미지는 북카페/숲길/도서관/정독/석촌. → 스크립트 재작성으로 정합 예정.
- `partners.js`의 `stages` 메타데이터도 실제 스크립트/이미지와 불일치(옛 기획 흔적).

---

## 📌 작업 원칙

1. **한 번에 하나씩** — 버전 순서대로, 완료 확인 후 다음 단계
2. **비용 먼저** — 새 기능 전에 항상 비용 영향 확인
3. **DAU 기준** — 다음 단계는 DAU 수치가 기준, 시간이 아님
4. **백업 필수** — 큰 작업 전 GitHub 커밋 확인

---

*마지막 업데이트: 2026-06-27 · 캐릭터/배경 이미지 파이프라인(유정·수아·지은) 작업 로그 추가*
테스트26.05.31vercel자동화파이프라인1
