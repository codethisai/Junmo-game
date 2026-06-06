import { GROQ_MODEL, GROQ_MAX_TOKENS, GROQ_CHOICE_TOKENS } from "../constants.js";

const API_ENDPOINT = "/api/chat";

export const callGroq = async (systemPrompt, history, userMsg, retryLeft = 2) => {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: GROQ_MAX_TOKENS,
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: userMsg }
      ]
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (retryLeft > 0) {
      await new Promise(r => setTimeout(r, 1000));
      return callGroq(systemPrompt, history, userMsg, retryLeft - 1);
    }
    throw new Error(err.error?.message || `API ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "...";
};

export const generateChoices = async (partner, lastAiMsg, currentAff, setChoices) => {
  try {
    const prompt = `한국어로만 답해. 영어, 일본어 절대 금지.

[게임 설정]
"강준모의 소개팅" — 29살 공대 출신 모태솔로 강준모의 연애 도전기.
준모는 생애 첫 소개팅을 하는 중. 연애 경험 제로. 말이 짧고 긴장하면 어색해짐.
근데 나쁜 사람은 아님. 배려심 있고 진심인데 표현이 서툴 뿐.

[현재 상황]
상대방(${partner.name})이 방금 이렇게 말했어:
"${lastAiMsg.slice(0, 200)}"

호감도: ${currentAff}/100
${partner.name}이 중시하는 것: ${partner.fav}

[준모 성격 참고]
- 평소: 말 짧고 단답, 첫 마디 잘 안 나옴
- 잘 될 때: 진심이 느껴지는 말, 상대 얘기 잘 들어줌
- 어색할 때: 엉뚱한 말 꺼내거나 과도하게 분석적으로 말함
- 모태솔로 특유의 "어, 나도 저랬는데" 공감 포인트 살릴 것

[선택지 3개 생성 규칙]
1번: 준모가 진심을 잘 전달한 대답 — 자연스럽고 호감 올라갈 것 같은
2번: 무난하고 평범한 대답 — 나쁘지도 좋지도 않음
3번: 모태솔로 준모 특유의 어색한 대답 — 웃프지만 공감됨

JSON만 출력. 설명 없이:
{"choices":["1번","2번","3번"]}`;

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: GROQ_CHOICE_TOKENS,
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (!res.ok) return;
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "";
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (parsed.choices?.length === 3) setChoices(parsed.choices);
    }
  } catch {}
};
