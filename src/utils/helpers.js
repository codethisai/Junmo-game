import { IMGS } from "../data/content.js";

export const judge = (aff, st) => {
  const e = st.ends;
  if (aff >= 85) return e.great;
  if (aff >= 70) return e.good;
  if (aff >= 45) return e.friend;
  if (aff >= 25) return e.crush;
  return e.fail;
};

export const kimoImg = (aff) => aff >= 70 ? IMGS.junmo_happy : aff >= 35 ? IMGS.junmo_nervous : IMGS.junmo_shocked;

export const partnerImg = (partner, aff) => {
  const imgs = partner.imgs;
  if (aff < 35) return IMGS[imgs.cold];
  if (aff >= 70) return IMGS[imgs.smile2 || imgs.smile];
  return IMGS[imgs.smile];
};

export const bgForStage = (si) => si >= 3 ? IMGS.restaurant_bg : IMGS.cafe_bg;

// 캐릭터별 말투 예시 — 프롬프트에 주입
const PARTNER_VOICE = {
  yumi: {
    good: `(유정이 몸을 살짝 앞으로 기울이며 웃는다)\n김유정: "어, 저도 그런 거 좋아해요! 신기하게 취향이 비슷하네요."\n준모 속마음: (말이 잘 통하는 것 같다. 다행이다.)`,
    bad:  `(유정이 잠깐 멈추다가 빈 컵을 손으로 감싼다)\n김유정: "아... 그렇군요. 하하."\n준모 속마음: (분위기가 살짝 싸해졌다. 아 왜 그런 말을 했을까.)`,
  },
  jieun: {
    good: `(지은이 책에서 눈을 들어 준모를 본다)\n박지은: "...그거, 생각해본 적 있었는데. 비슷하게 느꼈군요."\n준모 속마음: (짧은 말인데 뭔가 통한 것 같다. 기분이 좋다.)`,
    bad:  `(지은이 잠깐 뜸을 들이다 다른 쪽을 본다)\n박지은: "음... 그렇군요."\n준모 속마음: (대화가 거기서 끊겼다. 내가 뭔가 잘못 말한 것 같다.)`,
  },
  sua: {
    good: `(수아가 눈을 반짝이며 폰을 내려놓는다)\n이수아: "어, 진짜요?! 저도요! 완전 같은 생각이었어요!"\n준모 속마음: (이렇게 리액션이 좋은 사람은 처음이다. 말하기 편해진다.)`,
    bad:  `(수아가 손가락으로 테이블을 톡톡 두드린다)\n이수아: "아... 그래요? 음."\n준모 속마음: (텐션이 뚝 떨어진 것 같다. 이런 반응은 처음 본다.)`,
  },
};

export const buildSys = (stage, partner, stats, hist) => {
  const sl = partner.stages[stage.id - 1];
  const sd = (v, a, b, c) => v < 30 ? a : v < 60 ? b : c;
  const talkLv = sd(stats.말주변,
    "말이 자꾸 꼬이고 어색함 — 좋은 말도 전달이 서툴러서 상대방이 어리둥절할 수 있음",
    "무난하게 대화함 — 특별히 잘하진 않지만 망하지도 않음",
    "자연스럽고 말이 잘 통함 — 대화 흐름을 스스로 만들어냄"
  );
  const lookLv = sd(stats.외모,
    "외모가 평범함 — 첫인상 점수가 낮고 대화로 만회해야 함",
    "무난한 첫인상 — 나쁘지 않음",
    "호감 가는 외모 — 첫인상에서 이미 플러스"
  );
  const humorLv = sd(stats.유머,
    "농담이 잘 안 통함 — 웃기려다 오히려 분위기가 어색해짐",
    "가끔 웃기는 편 — 타이밍이 맞으면 통함",
    "분위기를 잘 살림 — 자연스럽게 웃음을 만들어냄"
  );

  const voice = PARTNER_VOICE[partner.id] || PARTNER_VOICE.yumi;
  const stageCtx = stage.id >= 3
    ? `현재 사귀는 중 (${hist.map(h => h.e).join(' → ')})`
    : hist.length > 0
      ? `이전 만남: ${hist.map(h => h.e).join(' → ')}`
      : '오늘이 첫 만남';

  return `반드시 한국어로만 답해. 영어, 일본어 절대 금지.

[게임 설정]
이 게임은 29살 공대 출신 모태솔로 강준모의 연애 도전기야.
준모는 연애를 한 번도 안 해봐서 어색하고 서툴지만 나쁜 사람이 아님.
플레이어가 준모로서 대화를 선택하면, 너는 ${partner.name} 역할로 반응해.

[현재 상황]
스테이지 ${stage.id}/5 — ${stage.title}
장소: ${sl.loc}
분위기: ${sl.desc}
관계: ${stageCtx}

[${partner.name} 캐릭터]
직업: ${partner.job} / MBTI: ${partner.mbti}
성격: ${partner.personality}
중시: ${partner.fav}
금기: ${partner.weakness}

[준모 현재 상태]
말주변 ${stats.말주변}/100 — ${talkLv}
외모 ${stats.외모}/100 — ${lookLv}
유머 ${stats.유머}/100 — ${humorLv}

[반응 기준]
- 진심 어린 공감/관심 → 호감도 +7~+13
- 자연스러운 유머/배려 → 호감도 +5~+10
- 무난한 대답 → 호감도 +2~+5
- 어색하거나 서툰 말 → 호감도 -2~+2
- ${partner.weakness} 해당 행동 → 호감도 -8~-15
- 말주변 낮으면: 좋은 말도 전달이 어색해서 효과 반감

[말투 예시 — 반드시 이 톤 유지]
잘 통했을 때:
${voice.good}
[호감도: 57/100] [말주변+0 외모+0 유머+0]

어색했을 때:
${voice.bad}
[호감도: 46/100] [말주변+0 외모+0 유머+0]

[출력 형식 — 정확히 이대로]
(장면 묘사 한 문장)
${partner.name}: "대사"
준모 속마음: (준모의 솔직한 내면 — 모태솔로 특유의 공감 포인트 살릴 것)
[호감도: 현재값/100] [말주변±N 외모±N 유머±N]

다른 말 없이 위 형식만 출력.`;
};
