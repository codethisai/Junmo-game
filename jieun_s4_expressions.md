# 박지은 S4 「흔들림 · 읽히는 자의 공포」 — 표정·에티튜드 시트
> 정독도서관(비 오는 오후) · 관찰자 지은이 처음으로 '읽힌다' · 코미디 3:7
> 이미지 생성/누끼용 작업 시트. 스크립트: `src/data/script_jieun_s4_draft.js`
>
> ※ 수아의 '외로움/오열' 코드 배제. 지은의 위기는 **통제·진실**.
> ※ "무너짐"은 눈물 폭발이 아니라 **간파당한 정지의 순간**(동공 흔들림·숨 멈춤·책 쥔 손 멈춤).

## 0. 고정 시그니처 (S4 한정 + 전 스테 공통)
- **공통**: 긴 흑발(가운데 가르마)·왼쪽 눈 밑 눈물점·처진 아몬드 눈매·계란형·쿨톤·얇은 은테 라운드 안경
- **S4 한정 룩**: **슬릭 로우번**(귀·눈물점 드러남) · **차콜그레이 골지 터틀넥** · 베이지 트렌치(의자에 걸쳐둠)
- **소품 모티프**: **책 = 방패**. 안경 너머로 보는 시선, 펜, 책을 세우다/덮는 동작이 심리 상태를 말해줌.
- **무드/조명**: 황톤 스탠드 + 통유리 빗줄기 역광, 차콜·딥네이비, 쓸쓸·시네마틱. **검은(단색) 배경**에 인물만 → 서버 누끼

---

## 1. 게임 슬롯 3종 (필수) — 호감도 기반 자동 표시

| 슬롯 | 호감도 | 표정 | 에티튜드/포즈 | 시선 | 대응 비트 |
|---|---|---|---|---|---|
| **neutral** | 35~69 (제일 자주) | **재는 차분** — 분석하는 눈빛, 옅게 다문 입. 차갑진 않고 '읽는 중' | 책 너머로 봄, 안경 살짝 추어올림, 펜 쥠 | 정면으로 **상대를 훑는** 시선(우위) | ①관찰자의 우위 (T1~3) |
| **bored** | <35 | **차단·차가움** — 분석권 빼앗긴 불쾌, 눈 내리깖, 입꼬리 굳음 | **책을 세워 몸 앞 방패처럼**, 어깨 돌림 | 옆/책으로 회피, 벽 세움 | ②읽히기 시작 (T4~6) "아는 척하지 마" |
| **smile** | ≥70 | **무장해제 안도** — 눈가 촉촉(눈물은 안 흐름), 옅게 풀린 미소 | **머리끈 푼 풀린 머리**, 책 내려놓음, 어깨 이완 | 정면, 처음으로 **안 피하는** 눈 맞춤 | ④무장해제 (T10) "이렇게 풀어도 안 무섭네" |

> 핵심 대비: neutral·bored = **읽는 자/여민 슬릭번(우위·통제)** ↔ smile = **읽힌 뒤 풀린 머리(내려놓음)**.
> 표정 차이는 '눈'에서 난다: ①훑는 눈 → ②피하는 눈 → ③흔들리는 눈 → ④안 피하는 눈.

---

## 2. 보너스 컷 (선택, 연출용) — 지은式 '무너짐'

| 키 | 표정 | 에티튜드 | 용도 | 비트 |
|---|---|---|---|---|
| **간파 CG** | **정지의 순간** — 동공 흔들림, 숨 멈춤, 입술 살짝 벌어짐. 눈물 안 흐름 | **책 쥔 손이 멈춤**, 안경 너머 무방비한 눈 | ③클라이맥스(들킨 순간) | T7 "그걸 어떻게 읽었어" / T8 "들켰네" 〔간파 CG〕 |
| **establishing** (예비) | (인물 작게/옆모습) | 빗물 창에 책 든 옆모습, 스탠드 역광 | 도입 분위기샷 | opening |

> 수아 = 오열·가면 벗기. 지은 = **소리 없이 패가 들킨 정지**. 이 차이가 캐릭터를 가른다. 눈물 한 방울도 '흐름'이 아니라 '맺힘'까지만.

---

## 3. 파일명 규칙
- 캐릭터: `jieun_smile_s4.webp` / `jieun_neutral_s4.webp` / `jieun_bored_s4.webp`
- 보너스: `jieun_s4_caught_cg.webp` (간파) / `jieun_s4_window_cg.webp` (예비)
- 배경: `jieun_s4_jeongdok.webp` (정독도서관 비 오는 열람실, 인물 없는 빈 공간)
- 규격: 캐릭터 검은 단색배경 3:4(1500×2000) PNG → 누끼 후 webp q90 / 배경 webp q80

---

## 4. 마누스 영문 프롬프트 (복붙용)

**공통 베이스**
```
Korean webtoon / romance visual-novel illustration, semi-realistic anime, a 26-year-old
Korean woman, long straight black hair in a sleek low bun (ears and the mole under her left
eye visible), almond downturned eyes, oval face, cool-toned skin, thin silver round glasses,
charcoal-grey ribbed turtleneck, holding a book. Cinematic warm desk-lamp light, melancholy
rainy library mood. Plain solid black background, upper body, no text, no watermark.
```

**① neutral — 재는 차분**
```
...analytical calm gaze, lips lightly closed, observing over the top of the book, faintly
pushing up her glasses, quietly reading the viewer — composed and in control.
```
**② bored — 차단·차가움**
```
...guarded and cold, eyes lowered, mouth set, holding the book up in front of her chest like
a shield, shoulder turned away, refusing to be read.
```
**③ smile — 무장해제 안도**
```
...defenses dropped, gentle relieved half-smile, eyes wet but not crying, hair loosened from
the bun falling to her shoulders, book set down, finally holding eye contact without flinching.
```
**④ 간파 CG — 들킨 정지의 순간**
```
...frozen the instant she is seen through, pupils trembling, breath caught, lips slightly
parted, hand stopped mid-grip on the book, defenseless eyes behind glasses. No tears falling.
Emotional close-up.
```
**Negative (공통)**: `text, watermark, logo, extra fingers, deformed hands, lowres, blurry, sobbing, bright cheerful colors`

---

## 5. 진행 체크
- [ ] 배경 `jieun_s4_jeongdok` 받기 (인물 없는 빈 열람실)
- [ ] neutral / bored / smile 3종 받기 (검은 배경, '눈'의 변화가 포인트)
- [ ] (선택) 간파 CG
- [ ] 누끼·webp·`JIEUN_S4_JEONGDOK` 씬 + getSceneKey stage4 분기
- [ ] 드래프트 스크립트 승격(`script_jieun_s4_draft.js` → `script_jieun_s4.js`, export명 `JIEUN_S4_DRAFT`→`JIEUN_S4`)
