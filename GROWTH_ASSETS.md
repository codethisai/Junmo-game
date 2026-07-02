# 🧰 성장 실행 자산 팩 — 강준모의 소개팅

> [`GROWTH.md`](GROWTH.md)가 전략이면, 이 문서는 **바로 복붙·변주해 쓰는 실탄.** 커뮤니티 규칙 확인 후 사용.
> 방향: **전문성·장르 지식으로 오덕·전문가 저격.** 밈/자학("AI한테 차인 썰")은 **보류**(2차 확산용, 나중).
> 원천 아티클: [`DEVLOG.md`](DEVLOG.md) · 플레이: https://junmo-game.vercel.app · 저장소: https://github.com/codethisai/Junmo-game

---

## 🔗 링크 & UTM 규칙 (어디서 왔는지 측정)

게시할 때 채널별 UTM 붙이기 → Vercel Analytics에서 유입 소스 구분:
```
아카라이브 : https://junmo-game.vercel.app/?utm_source=arca
레딧       : https://junmo-game.vercel.app/?utm_source=reddit
개발기     : https://junmo-game.vercel.app/?utm_source=blog
디씨(보류) : https://junmo-game.vercel.app/?utm_source=dc
```
> (UTM 파라미터 무시돼도 게임은 정상 작동. Analytics에서 소스별 분리 보려는 용도.)

---

## 🐙 GitHub 저장소 메타 (설정 완료 ✅)

**Description**
```
AI 기반 한국어 소개팅 시뮬레이션 비주얼노벨 · 3인 히로인 · 무료 웹 플레이 (React + Groq LLM, Claude Code로 제작)
```
**Topics**: `visual-novel dating-sim korean ai llm react web-game claude`

---

## 🪝 훅 뱅크 (전문성 버전 — 밈 배제)

- "순수 LLM 자유대화는 3턴이면 캐릭터가 붕괴한다. 그래서 **설계된 대본 + LLM 변주 하이브리드**로 만들었다."
- "대사를 먼저 쓰지 않았다. **욕망·두려움·방어기제부터 설계**하고 대사를 연역했다."
- "수아(보여지고 싶은데 외로운) ↔ 지은(안 보여지고 싶은데 읽히는) — **정반대 축**으로 세운 3인."
- "AI로 만들었지만 승부처는 프롬프트가 아니라 **설계와 검수**였다."
- "1GB 서버에서 rembg로 누끼 뜬 이야기 (isnet-anime · 그린 디스필 · webp)."

---

## 📝 게시글 초안 (전문판)

### ① 아카라이브 — 1차 시딩 (자작·전문 톤) 🔴
> 채널: 창작/인디게임/미연시·비주얼노벨/AI 관련 중 **자작 소개 허용**되는 곳. 자작 인증 챙기기.
> 상단에 **시작화면 스샷**(캐릭터 3인 일러스트), 중간에 대화·엔딩 스샷.

**제목**
```
AI 소개팅 게임 만들면서 캐릭터를 '대사'가 아니라 '심리'부터 설계한 이야기 (자작, 웹 플레이)
```
**본문**
```
자작 비주얼노벨입니다. '강준모의 소개팅' — 한국어 AI 소개팅 시뮬.

LLM한테 "소개팅 상대 해봐"만 시키면 3턴 만에 캐릭터가 붕괴하더라고요.
츤데레였다 헤퍼지고, 아까 한 말 까먹고, 뭘 해도 받아줘서 게임성이 사라짐.

그래서 반대로 갔습니다:
▶ 대화 본진 = 손으로 짠 11턴 대본(스테이지별), LLM은 자유입력 때만 변주하는 보조 레이어.

▶ 캐릭터는 대사가 아니라 심리부터 설계
 - 유정(ENFP): 밝지만 '진짜 들어주는' 사람을 원함 / 지뢰 = 폰·건성
 - 지은(INFJ): 안 읽히려는 관찰자 / 지뢰 = 아는 척·진부한 질문
 - 수아(ESFP): 화려한 가면 뒤 외로움 / 지뢰 = 순간을 콘텐츠로 만들기
 → 수아(보여지고 싶은데 외로운) ↔ 지은(안 보여지고 싶은데 읽히는), 정반대 축으로 안 겹치게.

▶ 시스템: 호감도 따라 표정·배경·엔딩 분기. 지뢰 밟으면 감점. 5스테 관계 아크(첫만남→피날레).

▶ 만든 방식: 1인, Claude Code. 근데 재미의 8할은 AI가 아니라 캐릭터 설계에서 나왔어요.
 설계 문서(캐릭터 시트·대사 생성 템플릿·검수 루브릭)도 깃허브에 공개했습니다.

플레이(모바일 추천): https://junmo-game.vercel.app/?utm_source=arca
설계·개발기 전문: (velog 링크) / 코드·설계: https://github.com/codethisai/Junmo-game

아직 다듬는 중이라 피드백 환영합니다. 어색한 대사 보이면 알려주세요.
```

### ② 레딧 (EN) — r/visualnovels · r/gamedev · r/SideProject
**Title**
```
I built a Korean AI dating sim — and the hard part wasn't the AI, it was designing the characters
```
**Body**
```
Solo project, playable free in-browser. "Kang Junmo's Blind Date" — a Korean AI dating-sim VN.

If you just tell an LLM "be my date," the character collapses in ~3 turns: personality drifts,
context evaporates, and there's no challenge because it accepts everything.

So I inverted it:
- Dialogue backbone = hand-authored 11-turn scripts per stage. The LLM only improvises on free input.
- Characters designed from psychology first (desire / fear / defense mechanism), then dialogue derived.
  Three heroines on opposite axes: "wants to be seen but lonely" vs "doesn't want to be read but is."
- Affinity drives expressions, backgrounds, and endings. "Dealbreaker" choices cost points.

Made solo with Claude Code — but the fun came from character design, not prompting.
Design docs (character sheets, a dialogue-generation template, a review rubric) are in the repo.

Play: https://junmo-game.vercel.app/?utm_source=reddit
Code + design vault: https://github.com/codethisai/Junmo-game
```

### ③ 개발기 블로그 (velog/브런치) — 검색 유입 + 포트폴리오
> **완성본 = [`DEVLOG.md`](DEVLOG.md)** (그대로 velog에 붙이거나 축약). 제목안:
> "AI로 소개팅 게임을 만들었다 — 캐릭터를 '대사'가 아니라 '심리'부터 설계한 기록"

### ④ 디씨 — 🅱️ 보류 (밈/자학, 2차 확산용)
> 지금은 전문성 트랙 집중. 화제성 검증 후, 밈 톤은 나중에. (초안은 필요 시 재작성)

---

## 🗓️ 시딩 체크리스트 (게시 전)
- [ ] 채널/서브레딧 **규칙 확인**(자작·자기홍보 허용)
- [ ] **UTM 링크** 붙였나 / **스샷** 첨부(시작화면·대화·엔딩)
- [ ] 톤 = **전문·자작** (밈 X)
- [ ] 게시 후 **첫 1시간 댓글 대응**
- [ ] Analytics 소스별 유입 확인 → 잘 먹힌 채널 집중

## 📸 스샷 세트 (확보됨 ✅ / 배치)
- 시작화면(캐릭터 3인 일러스트) → **아카 상단 대표컷**
- 완전설렘 대화(호감도 92) → "잘 되는 순간"
- 돌발 이벤트 → "깊이" 증명
- 프로포즈 벚꽃(석촌호수) → 비주얼 대표컷 / 레딧
- STAGE CLEAR·GAME OVER(패인 분석) → 시스템 설명용 (밈 아님, 시스템 예시로만)
- 🔲 OG 이미지(링크 썸네일) = 개발 필요

---

*갱신: 2026-07-02 · 전문성 트랙으로 전환(밈 보류). 원천 = DEVLOG.md.*
