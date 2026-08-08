import { useState, useEffect } from "react";
import { IMGS } from "../data/content.js";
import { BACKSTORY } from "../data/content.js";
import { bgm } from "../utils/audio.js";
import MuteBtn from "../components/MuteBtn.jsx";

export default function BackstoryScreen({ onDone, muted, onMute }) {
  const [sc, setSc] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(() => { bgm.stop(); if (!muted) bgm.play("menu"); return () => bgm.stop(); }, []);
  const next = () => {
    if (sc < BACKSTORY.length - 1) { setVis(false); setTimeout(() => { setSc(s=>s+1); setVis(true); }, 220); }
    else onDone();
  };
  const s = BACKSTORY[sc];
  return (
    <div style={{minHeight:"100dvh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",position:"relative",overflowY:"auto",WebkitOverflowScrolling:"touch",fontFamily:"'Noto Sans KR',sans-serif"}}>
      {/* 파스텔 그라데이션 배경 */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(165deg,#fff0f5 0%,#ffe0ec 35%,#f0e4fb 70%,#e8dcf5 100%)"}}/>
      {/* 몽환 블러 오브 */}
      <div style={{position:"absolute",top:"-8%",left:"-10%",width:"55%",height:"38%",background:"radial-gradient(circle,rgba(255,160,190,0.4),transparent 70%)",filter:"blur(40px)"}}/>
      <div style={{position:"absolute",bottom:"-6%",right:"-10%",width:"55%",height:"40%",background:"radial-gradient(circle,rgba(168,216,234,0.38),transparent 70%)",filter:"blur(40px)"}}/>
      <MuteBtn muted={muted} onToggle={onMute}/>

      <div style={{width:"100%",maxWidth:500,padding:"48px 22px 32px",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.28s cubic-bezier(.4,0,.2,1)",position:"relative",zIndex:1}}>
        {/* 로고 */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:9,letterSpacing:8,color:"#c97b9a",fontFamily:"monospace",marginBottom:8}}>PROLOGUE</div>
          <h1 style={{fontSize:30,fontWeight:800,color:"#ff6f9c",lineHeight:1.15,fontFamily:"'Nanum Myeongjo',serif",letterSpacing:1,textShadow:"0 2px 16px rgba(255,143,171,0.35)"}}>준모의 소개팅</h1>
        </div>

        {/* 스텝 도트 */}
        <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:22}}>
          {BACKSTORY.map((_,i)=>(
            <div key={i} style={{width:i===sc?22:6,height:5,borderRadius:3,background:i===sc?"#ff6f9c":i<sc?"rgba(255,143,171,0.45)":"rgba(190,160,180,0.3)",transition:"all 0.35s ease",boxShadow:i===sc?"0 0 8px rgba(255,143,171,0.5)":""}}/>
          ))}
        </div>

        {/* 카드 */}
        <div style={{background:"rgba(255,255,255,0.72)",border:"1px solid rgba(255,143,171,0.2)",borderRadius:22,padding:"26px 26px 22px",marginBottom:14,backdropFilter:"blur(28px)",position:"relative",overflow:"hidden",boxShadow:"0 12px 40px rgba(255,143,171,0.18)"}}>
          <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(255,143,171,0.5),transparent)"}}/>
          {/* 상단: 아이콘 + 연도 */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
            <div style={{width:52,height:52,borderRadius:14,background:"rgba(255,143,171,0.14)",border:"1px solid rgba(255,143,171,0.28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{s.icon}</div>
            <div>
              <div style={{fontSize:8,color:"#c97b9a",letterSpacing:4,fontFamily:"monospace",marginBottom:4}}>{s.yr}</div>
              <h2 style={{fontSize:18,fontWeight:900,color:"#5f4f62",fontFamily:"'Nanum Myeongjo',serif",lineHeight:1.2}}>{s.t}</h2>
            </div>
          </div>
          {/* 본문 */}
          <p style={{color:"#6b5b6e",fontSize:13,lineHeight:1.9,marginBottom:14,paddingLeft:4}}>{s.d}</p>
          {/* 인용 */}
          <div style={{background:"rgba(255,143,171,0.08)",border:"1px solid rgba(255,143,171,0.16)",borderLeft:"3px solid rgba(255,143,171,0.4)",borderRadius:"0 10px 10px 0",padding:"12px 16px"}}>
            <p style={{color:"#8a7385",fontSize:12,lineHeight:1.9,fontStyle:"italic"}}>"{s.q}"</p>
          </div>
        </div>

        {/* 버튼 */}
        <button onClick={next}
          style={{width:"100%",padding:"14px",
            background: sc===BACKSTORY.length-1
              ? "linear-gradient(135deg,#ff9ec0,#ff6f9c)"
              : "rgba(255,255,255,0.55)",
            border: sc===BACKSTORY.length-1 ? "none" : "1px solid rgba(255,143,171,0.25)",
            borderRadius:14,color: sc===BACKSTORY.length-1 ? "#fff" : "#a06079",fontWeight:800,fontSize:14,cursor:"pointer",
            fontFamily:"'Noto Sans KR',sans-serif",transition:"all 0.2s",
            boxShadow: sc===BACKSTORY.length-1 ? "0 8px 24px rgba(255,111,156,0.4)" : "none"}}
          onMouseEnter={e=>{if(sc<BACKSTORY.length-1){e.currentTarget.style.background="rgba(255,143,171,0.15)";e.currentTarget.style.borderColor="rgba(255,143,171,0.4)";}}}
          onMouseLeave={e=>{if(sc<BACKSTORY.length-1){e.currentTarget.style.background="rgba(255,255,255,0.55)";e.currentTarget.style.borderColor="rgba(255,143,171,0.25)";}}}
        >{sc===BACKSTORY.length-1 ? "소개팅 하러 가기 🚀" : "다음 →"}</button>

        {/* 스킵 */}
        {sc < BACKSTORY.length-1 && (
          <button onClick={onDone} style={{width:"100%",marginTop:8,padding:"8px",background:"transparent",border:"none",color:"#b09aa5",fontSize:11,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif"}}>건너뛰고 시작하기</button>
        )}
      </div>
    </div>
  );
}
