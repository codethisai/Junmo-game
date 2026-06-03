export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const origin = req.headers.get("origin") || "";
  const allowed = ["https://junmo-game.vercel.app", "http://localhost:3000"];
  if (!allowed.some(o => origin.startsWith(o))) {
    return new Response("Forbidden", { status: 403 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { model, messages, max_tokens, thinking } = body;

  if (!messages || !Array.isArray(messages)) {
    return new Response("Invalid request", { status: 400 });
  }

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${process.env.GROQ_KEY}`,
    },
    body: JSON.stringify({ model, messages, max_tokens, thinking }),
  });

  const data = await groqRes.json();

  return new Response(JSON.stringify(data), {
    status: groqRes.status,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": origin,
    },
  });
}
