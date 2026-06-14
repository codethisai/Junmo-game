export const config = { runtime: "edge" };

const CORS_HEADERS = (origin) => ({
  "content-type": "application/json",
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
});

export default async function handler(req) {
  const origin = req.headers.get("origin") || "";
  // 모든 vercel.app 배포 도메인 + 로컬 개발 허용
  // (production alias, deployment URL, preview URL 전부 포함)
  const isAllowed =
    origin.endsWith(".vercel.app") ||
    origin.startsWith("http://localhost:3000");

  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS(origin) });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!isAllowed) {
    return new Response("Forbidden", { status: 403 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { model, messages, max_tokens } = body;

  if (!messages || !Array.isArray(messages)) {
    return new Response("Invalid request", { status: 400 });
  }

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${process.env.GROQ_KEY}`,
    },
    body: JSON.stringify({ model, messages, max_tokens }),
  });

  const data = await groqRes.json();

  return new Response(JSON.stringify(data), {
    status: groqRes.status,
    headers: CORS_HEADERS(origin),
  });
}
