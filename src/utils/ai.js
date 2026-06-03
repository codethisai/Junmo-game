import { GROQ_URL, GROQ_MODEL, GROQ_MAX_TOKENS, GROQ_CHOICE_TOKENS } from "../constants.js";

export const callGroq = async (systemPrompt, history, userMsg, retryLeft = 2) => {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { "content-type": "application/json", "authorization": `Bearer ${process.env.REACT_APP_GROQ_KEY}` },
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
    const prompt = `다음은 소개팅 게임에서 AI 상대방의 최근 대사야:
"${lastAiMsg.slice(0, 300)}"

현재 호감도: ${currentAff}/100
상대방: ${partner.name} (${partner.personality.slice(0, 50)})

준모가 할 수 있는 자연스러운 대화 선택지 3개를 만들어줘.
- 선택지1: 적극적/공감하는 반응 (호감도 상승 가능성 높음)
- 선택지2: 무난한/평범한 반응 (중립)
- 선택지3: 솔직하지만 다소 어색한 반응 (준모다운 공대생 느낌)

반드시 아래 JSON 형식으로만 답해. 다른 말 없이:
{"choices":["선택지1 내용","선택지2 내용","선택지3 내용"]}`;

    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${process.env.REACT_APP_GROQ_KEY}` },
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
