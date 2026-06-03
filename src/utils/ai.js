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
    const prompt = `[절대 규칙] 한국어로만 답해. 일본어, 영어 등 다른 언어 절대 사용 금지.

소개팅 게임에서 상대방이 방금 이렇게 말했어:
"${lastAiMsg.slice(0, 200)}"

현재 호감도: ${currentAff}/100
상대방 특성: ${partner.name}은 ${partner.fav}을 중시함

29살 공대생 강준모가 할 수 있는 현실적인 대답 3개를 만들어줘.
1번: 센스 있고 공감되는 대답 (호감 올라갈 것 같은)
2번: 무난하고 평범한 대답
3번: 솔직하지만 약간 어색한 공대생스러운 대답

반드시 JSON만 출력. 설명 없이:
{"choices":["1번 대답","2번 대답","3번 대답"]}`;

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
