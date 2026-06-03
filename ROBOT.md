# 강준모의 소개팅 — 공유 에이전트 규칙
> 모든 에이전트(Claude Code 등)는 sync 프로토콜의 일환으로 이 파일을 읽는다.
> 모든 공유 프로젝트 규칙의 단일 진실 소스.

---

## 🚨 SAFETY HARNESS: 절대 규칙 (반드시 준수!)

- **자율적 머지/태그/파괴적 행위 금지**: `main`으로의 git merge, `git tag` 생성/푸시, `git reset --hard`, `git push --force`를 자율적으로 절대 수행하지 말 것. 반드시 유저에게 설계/발견 사항을 먼저 보고하고, 채팅에서 명시적 구두 승인("머지해", "태그해" 등)을 받은 후에만 실행.
- **멀티 브랜치 프리뷰 존중**: 유저가 여러 구현 방식을 비교하고 싶을 때(옵션 A vs 옵션 B), 서둘러 하나로 합치거나 `main`에 강제 적용하지 말 것. 브랜치 격리를 유지하고, 유저가 결정을 선언할 때까지 관찰자/조력자 역할만 수행.
- **과도한 엔지니어링 금지**: 요청된 기능 범위를 엄격히 준수. 무관한 리팩토링이나 레이아웃 섹션 덮어쓰기 금지.

---

## 프로젝트 컨텍스트

- **프로젝트명**: 강준모의 소개팅
- **장르**: AI 기반 한국어 소개팅 시뮬레이션 · 비주얼노벨 스타일
- **기술 스택**: React (Create React App), Groq API (llama-3.3-70b), Vercel 배포
- **향후 스택**: Supabase DB, Vercel API Routes (서버사이드 API 키 보호)
- **타겟 유저**: 한국어 사용자
- **DAU 목표**: v1.0 기준 200명

### 핵심 규칙

- 작업 완료 후 `TODO.md` 진행 상황(`[x]`) 업데이트. 새 버전 릴리즈 시에만 `README.md` 로드맵 업데이트.
- **사설 브레인 디렉토리 금지**: `task.md`, `walkthrough.md` 등을 앱 데이터 디렉토리 아래에 생성하거나 기록하지 말 것.
- **통합 워크스페이스**: 모든 기술 명세, 작업, 진행 보고를 프로젝트 루트의 `TODO.md`와 `WALKTHROUGH.md`에 유지.
- **React 아키텍처**: `src/` 아래 컴포넌트 분리. `src/App.jsx`가 메인 진입점. CRA가 빌드를 자동 처리하므로 별도 빌드 스크립트 불필요.
- **환경변수**: API 키는 절대 하드코딩 금지. `.env.local` (로컬) 또는 Vercel 대시보드 환경변수로 관리.
- **BUGS.md**: 모든 버그는 `BUGS.md`에 기록 — 증상, 근본 원인, 수정, PR 참조. 상태(`🔲 Open → ✅ Fixed`) 업데이트. `TODO.md`에 버그 중복 기록 금지.

---

## 브랜치 & 배포 전략

- `main` — 보호됨, PR 필요. **https://junmo-game.vercel.app** (프로덕션)에 자동 배포.
- `preview` — 자유롭게 푸시. 스테이징/일반 프리뷰용.
- `feature/*` — 일반 기능 브랜치. Vercel이 푸시마다 랜덤 프리뷰 URL 자동 생성.

**필수 워크플로우 (예외 없음)**:
1. `feature/xxx`에서 작업
2. `preview`에 머지하여 검증
3. 프리뷰 확인 완료 후에만 `main`으로 PR 오픈
4. PR 머지 시 프로덕션 자동 배포

> ⚠️ 프리뷰 검증 없이 절대 `main`으로 PR 오픈 금지. 항상 유저에게 프리뷰 확인 후 진행 여부 확인.

---

## Vercel 프로젝트 정보

- **프로젝트**: `junmo-game`
- **대시보드**: https://vercel.com/codethisais-projects/junmo-game
- **프로덕션 URL**: https://junmo-game.vercel.app

### 환경변수 (Vercel 대시보드에서 설정 — 절대 하드코딩 금지)

| 변수 | 대상 | 용도 |
|---|---|---|
| `REACT_APP_GROQ_KEY` | production, preview | Groq API 인증 토큰 |
| `REACT_APP_ANTHROPIC_KEY` | production, preview | Anthropic API 인증 토큰 (임시) |

> Vercel 대시보드 → Settings → Environment Variables에서 추가/수정.

---

## 🚨 배포 규율 — 배포 최소화

Vercel 무료 플랜은 **하루 100회 배포** 제한. 초과 시 자정 UTC까지 모든 배포 차단. 모든 에이전트는 각 배포를 비용이 큰 행위로 취급해야 함.

### 금지 행위 (각각 배포 낭비):
1. **CLI로 `vercel`, `vercel deploy`, `vercel --prod` 절대 수동 실행 금지** — GitHub 연동이 `git push`마다 자동 배포함. CLI 실행은 횟수를 두 배로 만듦.
2. **`preview`에 마이크로 수정 직접 푸시 금지** — "색상 조정 → 푸시 → 확인 → 다시 조정 → 푸시" 패턴은 하나의 수정에 3회+ 배포를 소모. `feature/*` 브랜치에서 모든 반복 작업 먼저 완료.
3. **`preview`에 기능당 한 번만 푸시** — `feature/*`에서 모든 변경사항 축적, 로컬 테스트 후 기능이 완전히 완성됐을 때만 preview에 단일 머지.
4. **문서만의 커밋을 `preview`에 별도 푸시 금지** — 문서 업데이트는 그것이 설명하는 코드 커밋과 묶어서 푸시.

### 필수 습관:
- **모든 변경사항 일괄 처리**: `feature/*`에서 전체 기능(미세 조정 포함) 완성 후 preview에 머지.
- **가능하면 로컬에서 먼저 테스트** (`npm start`).
- **기능 하나 → preview 머지 한 번 → 배포 한 번**.

---

## 🚨 GitHub Actions & Vercel 연동 — 절대 반복하지 말 것

### 1. GitHub Deployment API를 Actions 워크플로우에 절대 사용 금지

```js
// ❌ 절대 금지
await github.rest.repos.createDeployment({ ... });
await github.rest.repos.createDeploymentStatus({ ... });
```

Vercel GitHub App이 이미 푸시마다 하나의 GitHub Deployment 레코드를 생성함. 워크플로우가 `createDeployment()`도 호출하면 레코드가 두 배가 되어 GitHub 레이트 리밋 도달.

```js
// ✅ 대신 Commit Status API 사용 — Vercel과 레이트 리밋 충돌 없음
await github.rest.repos.createCommitStatus({ state: 'pending', context: 'Vercel / Preview', ... });
```

### 2. Vercel 100/day 한도는 모든 것을 포함

- `preview` 또는 `main`으로의 각 `git push` (취소된 배포도 포함)
- Vercel 자동 배포가 활성화된 브랜치로의 각 `git push`
- 각 `vercel` 또는 `vercel deploy` CLI 호출 (GitHub 푸시 위에 두 배로 추가!)
- 빌드 트리거용 빈 커밋 (`git commit --allow-empty`)

---

## 🔁 필수 릴리즈 워크플로우 (예외 없음)

### 푸시 규칙

| 변경 유형 | 커밋 | 푸시 |
|---|---|---|
| **코드 / 기능** | 에이전트가 커밋 | 유저가 **"push해"** 또는 동등한 말을 할 때만 에이전트가 푸시 |
| **문서만** (README, TODO, CLAUDE, ROBOT…) | 에이전트가 커밋 | **로컬에 축적. 다음 코드 변경과 함께 푸시 — 절대 문서만 단독 푸시 금지.** |

### 워크플로우

```
feature/xxx  →  preview (검증)  →  PR to main  →  프로덕션
```

1. **기능 브랜치 생성**: `git checkout -b feature/xxx`
2. **개발 및 반복**: 모든 변경은 `feature/*`에서만. 로컬 테스트 (`npm start`).
3. **일괄 커밋**: 100% 완성 시 `git add . && git commit -m "feat: ..."` — 유저에게 보고하고 **푸시 지시 대기**.
4. **"push해" 시**: `git push origin feature/xxx` 후 `git checkout preview && git merge feature/xxx && git push origin preview`
5. Vercel 자동 배포 확인 — 유저와 함께 프리뷰 확인.
6. **PR 오픈**: `gh pr create --base main --head preview --title "feat: ..."` — 유저가 프리뷰 확인 후에만.
7. **유저가 PR 머지** → Vercel이 프로덕션 자동 배포.
8. **버전 태그 시**: `git tag -a vX.Y.Z -m "설명" && git push origin vX.Y.Z` — 유저에게 먼저 제시, 자율 실행 금지.
9. **preview 동기화**: PR 머지 확인 후 `git checkout preview && git merge main && git push origin preview`.

### 핵심 규칙:
- **유저 지시 없이 에이전트가 절대 푸시하지 않음** — "push해" 또는 동등한 말 대기
- **문서 커밋은 축적** — 절대 문서만 단독 푸시 금지
- **기능당 preview 푸시 한 번** — 반복적 preview 푸시 금지
- **절대 main에 직접 머지 금지** — 항상 PR 통해서
- **절대 `vercel` CLI로 배포 금지**

---

## 📋 세션 노트 — 2026-06-03 (프로젝트 초기 세팅)

### 완료된 초기 설정
- GitHub 저장소: `codethisai/Junmo-game` 클론 완료
- Vercel 배포 연동 완료: https://junmo-game.vercel.app
- 프론트엔드 라이브러리 설치: zustand, framer-motion, axios, @tanstack/react-query, react-router-dom, react-hot-toast, clsx, tailwindcss, howler, react-use
- Moshi 알림 시스템 설치 및 hook 설정 완료

### 현재 상태
- `src/App.jsx` — 메인 컴포넌트 (소개팅 게임 로직)
- `src/index.js` — 진입점
- 현재 버전: v0.0 (배포 완성 단계)
- 다음 작업: TODO.md의 v0.0 체크리스트 완성
