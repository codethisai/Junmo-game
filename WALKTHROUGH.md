# 강준모의 소개팅 — 개발 진행 기록

> 최종 업데이트: 2026-06-03

---

## 📦 현재 배포 상태

- **프로덕션 URL**: https://junmo-game.vercel.app
- **GitHub**: https://github.com/codethisai/Junmo-game
- **브랜치**: main (자동 배포)
- **현재 버전**: v0.2 완료, v0.3 진행 중

---

## ✅ 완료된 작업 전체 정리

### 인프라 & 환경
- Vercel 배포 연동 (GitHub push → 자동 배포)
- Vercel Analytics 설치 (DAU 확인용)
- Moshi 알림 연동 (작업 완료 시 모바일 푸시)
- API 키 보안: `REACT_APP_GROQ_KEY` → `api/chat.js` 서버 함수로 이동 (v0.3)
- Groq API 키: Vercel 환경변수 `GROQ_KEY`에 서버사이드 보관

### 코드 구조 (모듈 분리)
```
src/
├── App.jsx              (루트, ~200줄)
├── constants.js         (MAX_TURNS=20, DAILY_LIMIT=20 등 상수)
├── data/
│   ├── partners.js      (PARTNERS 배열 — 유정/지은/수아)
│   ├── stages.js        (STAGES, STAGE_EVENTS)
│   ├── achievements.js  (ACHS, SECRET_ENDINGS)
│   ├── content.js       (IMGS base64, BACKSTORY, PRESETS, FAIL_Q)
│   ├── scripts.js       (스크립트 인덱스)
│   ├── script_yujung_s1.js  (유정 S1 완전 대본)
│   ├── script_jieun_s1.js   (지은 S1 완전 대본)
│   └── script_sua_s1.js     (수아 S1 완전 대본)
├── screens/
│   ├── BackstoryScreen.jsx
│   ├── SetupScreen.jsx
│   ├── GameScreen.jsx
│   └── EndingScreen.jsx
├── components/
│   ├── AffBar.jsx
│   ├── AchToast.jsx
│   ├── MuteBtn.jsx
│   ├── StatChip.jsx
│   └── ErrorBoundary.jsx
└── utils/
    ├── ai.js       (callGroq → /api/chat 서버 경유)
    ├── audio.js    (BGMPlayer)
    ├── storage.js  (localStorage 헬퍼)
    └── helpers.js  (buildSys, judge, partnerImg 등)
```

### 게임 기능
| 기능 | 상태 |
|---|---|
| 백스토리 인트로 (6장) | ✅ |
| 파트너 선택 (유정/지은/수아) | ✅ |
| 스탯 프리셋 4종 + 커스텀 | ✅ |
| AI 선택지 카드 (3개) | ✅ → 스크립트 방식으로 전환 |
| 스테이지 전환 배너 연출 | ✅ |
| 돌발 이벤트 (턴 8~12) | ✅ |
| 턴 압박 시스템 (7턴 이하 경고) | ✅ |
| 호감도 바 실시간 | ✅ |
| 업적 12개 | ✅ |
| 숨겨진 엔딩 4종 | ✅ |
| 준모 이력서 (플레이 기록) | ✅ |
| 엔딩 갤러리 | ✅ |
| BGM (5종) | ✅ |
| 자동저장 | ✅ |
| 일일 20회 제한 | ✅ |
| 모바일 최적화 | ✅ |

### 대화 시스템 (핵심 결정사항)
**결론: 완전 스크립트 방식 채택**

이유:
- AI(llama, qwen 등) 범용 모델은 한국 소개팅 감성/일관성 불안정
- 파인튜닝 없이 제타 수준 대화 품질 달성 불가
- 미리 쓴 대본 = 품질 보장 + 로딩 없음 + API 비용 0원

현재 구조:
```
스크립트 있는 스테이지 → 선택지 클릭 → 미리 쓴 대사 즉시 출력
스크립트 없는 스테이지 → AI fallback (Groq API)
```

완성된 스크립트: **유정/지은/수아 스테이지 1** (각 20턴 × 3선택지)

---

## 🔲 다음 개발 우선순위

### 1순위: 나머지 스크립트 작성
```
유정  S2~S5 (4개 스테이지)
지은  S2~S5 (4개 스테이지)
수아  S2~S5 (4개 스테이지)
= 총 12개 스테이지 스크립트
```

스크립트 형식: `src/data/script_yujung_s1.js` 참고
```js
export const YUJUNG_S2 = {
  partnerId: "yumi",
  stageId: 2,
  opening: "장면 설명...",
  turns: [
    {
      turn: 1,
      scene: "장면 묘사",
      choices: [
        { text: "선택지 텍스트", response: "대사\n준모 속마음: (속마음)", affChange: +8 },
        { text: "...", response: "...", affChange: +3 },
        { text: "...", response: "...", affChange: -2 },
      ]
    },
    // ... 20턴
  ]
};
```

scripts.js에 추가:
```js
import { YUJUNG_S2 } from "./script_yujung_s2.js";
// SCRIPTS.yumi[2] = YUJUNG_S2;
```

### 2순위: 캐릭터 이미지
- Midjourney `--cref` 방식으로 얼굴 고정
- 각 파트너 3종 표정 (smile / nervous / cold)
- 파일명 매핑: `partners.js`의 `imgs` 필드 → `content.js`의 `IMGS` 객체

```js
// partners.js 현재
imgs: { smile: "yujeong_smile1", smile2: "yujeong_smile2", cold: "yujeong_cold" }

// content.js에 실제 이미지 base64 or URL 연결
```

### 3순위: v0.3 백엔드 완성
- [x] Groq API 서버사이드 이동 완료
- [ ] Supabase DB 연동 (세이브 데이터 클라우드)
- [ ] 익명 UUID 유저 식별
- [ ] 관리자 대시보드 (DAU, 엔딩 분포)

---

## 🔧 개발 규칙 (반드시 숙지)

### 배포
- `git push origin main` → Vercel 자동 배포
- 하루 100회 한도 → 수정사항 묶어서 한번에 푸시
- `vercel` CLI 직접 실행 금지

### 워크플로우
```
feature/* → preview (확인) → PR → main (프로덕션)
```
- 유저가 "push해" 할 때만 푸시
- 문서만 변경 시 다음 코드 커밋에 묶어서

### 파일 수정 가이드
| 수정 내용 | 파일 |
|---|---|
| 게임 상수 (턴 수, 제한 등) | `constants.js` |
| 파트너 데이터 | `data/partners.js` |
| 스테이지 데이터 | `data/stages.js` |
| 대사 추가/수정 | `data/script_xxx_sN.js` |
| AI 프롬프트 | `utils/helpers.js` → `buildSys()` |
| API 호출 | `utils/ai.js` |
| 게임 화면 UI | `screens/GameScreen.jsx` |
| 설정 화면 | `screens/SetupScreen.jsx` |

---

## 📊 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | React (Create React App) |
| 배포 | Vercel (무료) |
| AI API | Groq (llama-3.3-70b-versatile) — fallback용 |
| 대화 방식 | 완전 스크립트 (S1) + AI fallback (S2~S5) |
| 스토리지 | localStorage (현재), Supabase 예정 |
| 알림 | Moshi hook |
| 분석 | Vercel Analytics |

---

## 💡 향후 고민 사항

**생성형 대화모델 재도입 시 옵션:**
1. Claude API (Haiku) — 한국어 최고 품질, 비용 발생
2. 캐릭터별 파인튜닝 — 품질 최상, 비용/시간 높음
3. 현재 스크립트 방식 유지 + 자유 입력은 AI로 — 하이브리드

**캐릭터 이미지 생성 프롬프트 (Midjourney):**
```
korean visual novel illustration, 1girl, brown wavy medium hair,
warm skin tone, [표정], [복장],
black background, teal cyan rim light outline effect,
semi-realistic anime style, soft cel shading --ar 2:3 --cref [기본 이미지 URL] --cw 100
```
