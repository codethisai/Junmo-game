import { useState, useEffect } from "react";

// 배급 컨트롤타워 — 수기 입력, localStorage 저장. junmo-game.vercel.app/?dash 로 접근.
const KEY = "junmo_dist";

const SEED = [
  { name: "velog",  utm: "blog",   url: "", views: 0, likes: 0, comments: 0, status: "게시", memo: "정정본 교체 필요" },
  { name: "긱뉴스", utm: "",       url: "", views: 0, likes: 0, comments: 0, status: "대기", memo: "계정 1주 대기" },
  { name: "아카",   utm: "arca",   url: "", views: 0, likes: 0, comments: 0, status: "작성중", memo: "인디게임 채널" },
  { name: "레딧",   utm: "reddit", url: "", views: 0, likes: 0, comments: 0, status: "예정", memo: "" },
];

const STATUS = ["예정", "작성중", "게시", "대기", "반려"];
const STATUS_COLOR = { 예정:"#888", 작성중:"#ffd93d", 게시:"#4ade80", 대기:"#ff9944", 반려:"#ff4444" };

const load = () => {
  try { const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) && v.length ? v : SEED; }
  catch { return SEED; }
};

export default function Dashboard() {
  const [rows, setRows] = useState(load);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(rows)); }, [rows]);

  const upd = (i, field, val) => setRows(r => r.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  const num = (i, field, val) => upd(i, field, Math.max(0, parseInt(val || "0", 10) || 0));
  const addRow = () => setRows(r => [...r, { name:"새 채널", utm:"", url:"", views:0, likes:0, comments:0, status:"예정", memo:"" }]);
  const delRow = (i) => setRows(r => r.filter((_, idx) => idx !== i));

  const total = rows.reduce((a, r) => ({ views:a.views+r.views, likes:a.likes+r.likes, comments:a.comments+r.comments }), { views:0, likes:0, comments:0 });

  const C = "#ff6b9d";
  const box = { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, color:"#fff", padding:"7px 9px", fontSize:14, outline:"none", fontFamily:"inherit" };
  const label = { fontSize:10, color:"rgba(255,255,255,0.35)", marginBottom:3, letterSpacing:1 };

  return (
    <div style={{ minHeight:"100dvh", background:"#050308", color:"#fff", fontFamily:"'Noto Sans KR',sans-serif", padding:"20px 14px 60px", WebkitTapHighlightColor:"transparent" }}>
      <div style={{ maxWidth:560, margin:"0 auto" }}>

        {/* 헤더 */}
        <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:4 }}>
          <h1 style={{ fontSize:22, fontWeight:900 }}>📡 배급 컨트롤타워</h1>
        </div>
        <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.4)", marginBottom:18, lineHeight:1.6 }}>
          유입 수는 <a href="https://vercel.com/codethisais-projects/junmo-game" style={{color:C}}>Vercel Analytics</a>에서 UTM별로 확인 → 여기 수기 입력. 추천·댓글은 각 채널에서 보고 입력.
        </p>

        {/* 요약 */}
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {[["조회", total.views], ["추천/❤️", total.likes], ["댓글", total.comments]].map(([k, v]) => (
            <div key={k} style={{ flex:1, background:"rgba(255,107,157,0.08)", border:`1px solid ${C}33`, borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:900, color:C }}>{v.toLocaleString()}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", marginTop:2 }}>{k}</div>
            </div>
          ))}
        </div>

        {/* 채널 카드 */}
        {rows.map((r, i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:14, marginBottom:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <input value={r.name} onChange={e=>upd(i,"name",e.target.value)} style={{ ...box, flex:1, fontWeight:800, fontSize:16, background:"transparent", border:"none", padding:"2px 0" }}/>
              <select value={r.status} onChange={e=>upd(i,"status",e.target.value)}
                style={{ ...box, padding:"5px 8px", fontSize:12, color:STATUS_COLOR[r.status], fontWeight:700, border:`1px solid ${STATUS_COLOR[r.status]}55` }}>
                {STATUS.map(s => <option key={s} value={s} style={{color:"#000"}}>{s}</option>)}
              </select>
              <button onClick={()=>delRow(i)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.25)", fontSize:18, cursor:"pointer", padding:"0 4px" }}>×</button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:10 }}>
              {[["views","조회"],["likes","추천/❤️"],["comments","댓글"]].map(([f, l]) => (
                <div key={f}>
                  <div style={label}>{l}</div>
                  <input type="number" inputMode="numeric" value={r[f]} onChange={e=>num(i,f,e.target.value)} style={{ ...box, width:"100%", fontVariantNumeric:"tabular-nums" }}/>
                </div>
              ))}
            </div>

            <div style={{ marginBottom:8 }}>
              <div style={label}>게시글 링크</div>
              <input value={r.url} onChange={e=>upd(i,"url",e.target.value)} placeholder="https://..." style={{ ...box, width:"100%", fontSize:12 }}/>
            </div>
            <div>
              <div style={label}>메모 {r.utm && <span style={{color:C}}>· utm={r.utm}</span>}</div>
              <input value={r.memo} onChange={e=>upd(i,"memo",e.target.value)} placeholder="메모" style={{ ...box, width:"100%", fontSize:12 }}/>
            </div>
          </div>
        ))}

        <button onClick={addRow} style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px dashed rgba(255,255,255,0.2)", borderRadius:12, color:"rgba(255,255,255,0.5)", padding:"12px", fontSize:14, cursor:"pointer", marginBottom:24, fontFamily:"inherit" }}>
          + 채널 추가
        </button>

        <div style={{ textAlign:"center" }}>
          <a href="/" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>← 게임으로</a>
        </div>
      </div>
    </div>
  );
}
