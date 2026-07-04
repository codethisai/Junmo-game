import { useState, useEffect } from "react";

// 배급 컨트롤타워 — 수기 입력, localStorage 저장. junmo-game.vercel.app/?dash 로 접근.
const KEY = "junmo_dist";

const SEED = [
  { name: "velog",  emoji: "📝", utm: "blog",   url: "", views: 0, likes: 0, comments: 0, status: "게시",  memo: "정정본 교체 필요" },
  { name: "긱뉴스", emoji: "🟠", utm: "",       url: "", views: 0, likes: 0, comments: 0, status: "대기",  memo: "계정 1주 대기" },
  { name: "아카",   emoji: "🔵", utm: "arca",   url: "", views: 0, likes: 0, comments: 0, status: "작성중", memo: "인디게임 채널" },
  { name: "레딧",   emoji: "🔴", utm: "reddit", url: "", views: 0, likes: 0, comments: 0, status: "예정",  memo: "" },
];

const STATUS = ["예정", "작성중", "게시", "대기", "반려"];
const SC = { 예정:"#8b8b93", 작성중:"#ffd93d", 게시:"#4ade80", 대기:"#ff9944", 반려:"#ff5a5a" };

const load = () => {
  try { const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) && v.length ? v : SEED; }
  catch { return SEED; }
};

const C = "#ff6b9d";

export default function Dashboard() {
  const [rows, setRows] = useState(load);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(rows));
    setSavedAt(new Date());
  }, [rows]);

  const upd = (i, f, v) => setRows(r => r.map((row, idx) => idx === i ? { ...row, [f]: v } : row));
  const num = (i, f, v) => upd(i, f, Math.max(0, parseInt(v || "0", 10) || 0));
  const addRow = () => setRows(r => [...r, { name:"새 채널", emoji:"⚪", utm:"", url:"", views:0, likes:0, comments:0, status:"예정", memo:"" }]);
  const delRow = (i) => setRows(r => r.filter((_, idx) => idx !== i));

  const total = rows.reduce((a, r) => ({ views:a.views+r.views, likes:a.likes+r.likes, comments:a.comments+r.comments }), { views:0, likes:0, comments:0 });
  const best = rows.filter(r => r.views > 0).sort((a,b) => b.views - a.views)[0];

  const field = { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:9, color:"#fff", padding:"9px 10px", fontSize:14, outline:"none", fontFamily:"inherit", width:"100%" };
  const cap = { fontSize:10, color:"rgba(255,255,255,0.4)", marginBottom:4, letterSpacing:0.5, fontWeight:600 };

  return (
    <div style={{ minHeight:"100dvh", background:"radial-gradient(120% 80% at 50% 0%, #1a0f1a 0%, #050308 55%)", color:"#fff", fontFamily:"'Noto Sans KR',sans-serif", padding:"22px 14px 60px", WebkitTapHighlightColor:"transparent" }}>
      <div style={{ maxWidth:600, margin:"0 auto" }}>

        {/* 헤더 */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
          <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:-0.5 }}>📡 배급 컨트롤타워</h1>
          <a href="/" style={{ color:"rgba(255,255,255,0.4)", fontSize:12, textDecoration:"none", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, padding:"5px 10px" }}>← 게임</a>
        </div>
        <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.45)", marginBottom:18, lineHeight:1.6 }}>
          유입 수는 <a href="https://vercel.com/codethisais-projects/junmo-game" style={{color:C,fontWeight:600}}>Vercel Analytics</a>에서 UTM별로 보고 옮겨 적기 · 추천·댓글은 각 채널에서 확인
        </p>

        {/* 요약 */}
        <div style={{ display:"flex", gap:8, marginBottom:10 }}>
          {[["👀","조회",total.views],["❤️","추천",total.likes],["💬","댓글",total.comments]].map(([ic,k,v]) => (
            <div key={k} style={{ flex:1, background:"rgba(255,107,157,0.09)", border:`1px solid ${C}33`, borderRadius:14, padding:"14px 8px", textAlign:"center" }}>
              <div style={{ fontSize:13, marginBottom:2 }}>{ic}</div>
              <div style={{ fontSize:25, fontWeight:900, color:C, lineHeight:1, fontVariantNumeric:"tabular-nums" }}>{v.toLocaleString()}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", marginTop:4 }}>{k}</div>
            </div>
          ))}
        </div>
        {best && (
          <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.55)", marginBottom:20, textAlign:"center" }}>
            🏆 지금 제일 잘 먹히는 채널: <b style={{color:"#fff"}}>{best.emoji} {best.name}</b> ({best.views.toLocaleString()} 유입)
          </div>
        )}

        {/* 채널 카드 */}
        {rows.map((r, i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.08)", borderLeft:`3px solid ${SC[r.status]}`, borderRadius:14, padding:"14px 14px 16px", marginBottom:12 }}>
            {/* 카드 헤더 */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:13 }}>
              <span style={{ fontSize:18 }}>{r.emoji}</span>
              <input value={r.name} onChange={e=>upd(i,"name",e.target.value)} style={{ flex:1, fontWeight:800, fontSize:16, background:"transparent", border:"none", color:"#fff", outline:"none", fontFamily:"inherit", padding:0 }}/>
              <select value={r.status} onChange={e=>upd(i,"status",e.target.value)}
                style={{ background:`${SC[r.status]}1a`, border:`1px solid ${SC[r.status]}66`, color:SC[r.status], borderRadius:20, padding:"4px 10px", fontSize:11.5, fontWeight:700, outline:"none", fontFamily:"inherit" }}>
                {STATUS.map(s => <option key={s} value={s} style={{color:"#000"}}>{s}</option>)}
              </select>
              <button onClick={()=>delRow(i)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.22)", fontSize:20, cursor:"pointer", padding:"0 2px", lineHeight:1 }}>×</button>
            </div>

            {/* 숫자 3칸 */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:11 }}>
              {[["views","👀 조회"],["likes","❤️ 추천"],["comments","💬 댓글"]].map(([f,l]) => (
                <div key={f}>
                  <div style={cap}>{l}</div>
                  <input type="number" inputMode="numeric" value={r[f]} onChange={e=>num(i,f,e.target.value)}
                    style={{ ...field, textAlign:"center", fontWeight:700, fontVariantNumeric:"tabular-nums", fontSize:16 }}/>
                </div>
              ))}
            </div>

            {/* 링크 */}
            <div style={{ marginBottom:9 }}>
              <div style={cap}>게시글 링크 {r.utm && <span style={{color:C}}>· utm={r.utm}</span>}</div>
              <div style={{ display:"flex", gap:6 }}>
                <input value={r.url} onChange={e=>upd(i,"url",e.target.value)} placeholder="https://..." style={{ ...field, fontSize:12 }}/>
                {r.url && <a href={r.url} target="_blank" rel="noreferrer" style={{ flexShrink:0, display:"flex", alignItems:"center", padding:"0 12px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:9, color:C, fontSize:12, fontWeight:700, textDecoration:"none" }}>열기</a>}
              </div>
            </div>
            {/* 메모 */}
            <div>
              <div style={cap}>메모</div>
              <input value={r.memo} onChange={e=>upd(i,"memo",e.target.value)} placeholder="메모" style={{ ...field, fontSize:12 }}/>
            </div>
          </div>
        ))}

        <button onClick={addRow} style={{ width:"100%", background:"rgba(255,255,255,0.03)", border:"1px dashed rgba(255,255,255,0.2)", borderRadius:12, color:"rgba(255,255,255,0.5)", padding:"13px", fontSize:14, cursor:"pointer", marginBottom:18, fontFamily:"inherit" }}>
          + 채널 추가
        </button>

        {/* 저장 안내 */}
        <div style={{ textAlign:"center", fontSize:10.5, color:"rgba(255,255,255,0.3)", lineHeight:1.7 }}>
          {savedAt && <div>✓ 자동 저장됨 · {savedAt.toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}</div>}
          <div>이 기기 브라우저에만 저장됩니다 (다른 기기·캐시 삭제 시 초기화)</div>
        </div>
      </div>
    </div>
  );
}
