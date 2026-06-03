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
    <div style={{minHeight:"100dvh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",fontFamily:"'Noto Sans KR',sans-serif"}}>
      {/* 배경 이미지 */}
      <div style={{position:"absolute",inset:0,backgroundImage:`url(${IMGS.cafe_bg})`,backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(0.35) saturate(0.8)"}}/>
      {/* 따뜻한 오버레이 */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,rgba(20,12,8,0.5) 0%,rgba(180,100,40,0.08) 50%,rgba(20,12,8,0.7) 100%)"}}/>
      {/* 상단 빛 번짐 */}
      <div style={{position:"absolute",top:0,left:"30%",right:"30%",height:1,background:"linear-gradient(90deg,transparent,rgba(255,200,120,0.3),transparent)"}}/>
      <MuteBtn muted={muted} onToggle={onMute}/>

      <div style={{width:"100%",maxWidth:500,padding:"0 22px",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.28s cubic-bezier(.4,0,.2,1)",position:"relative",zIndex:1}}>
        {/* 로고 */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:9,letterSpacing:8,color:"rgba(255,200,140,0.45)",fontFamily:"monospace",marginBottom:8}}>PROLOGUE</div>
          <h1 style={{fontSize:30,fontWeight:900,background:"linear-gradient(135deg,#ffb347,#ff6b9d,#c8a4ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.15,fontFamily:"'Nanum Myeongjo',serif",letterSpacing:-0.5}}>강준모의 소개팅</h1>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.18)",marginTop:5,letterSpacing:3}}>AI INTERACTIVE VISUAL NOVEL</div>
        </div>

        {/* 스텝 도트 */}
        <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:22}}>
          {BACKSTORY.map((_,i)=>(
            <div key={i} style={{width:i===sc?22:6,height:5,borderRadius:3,background:i===sc?"#ffb347":i<sc?"rgba(255,179,71,0.4)":"rgba(255,255,255,0.12)",transition:"all 0.35s ease",boxShadow:i===sc?"0 0 8px rgba(255,179,71,0.5)":""}}/>
          ))}
        </div>

        {/* 카드 */}
        <div style={{background:"rgba(15,10,6,0.78)",border:"1px solid rgba(255,200,140,0.12)",borderRadius:22,padding:"26px 26px 22px",marginBottom:14,backdropFilter:"blur(28px)",position:"relative",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.6)"}}>
          <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(255,179,71,0.45),transparent)"}}/>
          {/* 상단: 아이콘 + 연도 */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
            <div style={{width:52,height:52,borderRadius:14,background:"rgba(255,179,71,0.08)",border:"1px solid rgba(255,179,71,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{s.icon}</div>
            <div>
              <div style={{fontSize:8,color:"rgba(255,179,71,0.55)",letterSpacing:4,fontFamily:"monospace",marginBottom:4}}>{s.yr}</div>
              <h2 style={{fontSize:18,fontWeight:900,color:"rgba(255,255,255,0.92)",fontFamily:"'Nanum Myeongjo',serif",lineHeight:1.2}}>{s.t}</h2>
            </div>
          </div>
          {/* 본문 */}
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:1.9,marginBottom:14,paddingLeft:4}}>{s.d}</p>
          {/* 인용 */}
          <div style={{background:"rgba(255,179,71,0.04)",border:"1px solid rgba(255,179,71,0.1)",borderLeft:"3px solid rgba(255,179,71,0.35)",borderRadius:"0 10px 10px 0",padding:"12px 16px"}}>
            <p style={{color:"rgba(255,255,255,0.35)",fontSize:12,lineHeight:1.9,fontStyle:"italic"}}>"{s.q}"</p>
          </div>
        </div>

        {/* 버튼 */}
        <button onClick={next}
          style={{width:"100%",padding:"14px",
            background: sc===BACKSTORY.length-1
              ? "linear-gradient(135deg,#ff6b9d,#ffb347)"
              : "rgba(255,255,255,0.05)",
            border: sc===BACKSTORY.length-1 ? "none" : "1px solid rgba(255,255,255,0.1)",
            borderRadius:14,color:"white",fontWeight:800,fontSize:14,cursor:"pointer",
            fontFamily:"'Noto Sans KR',sans-serif",transition:"all 0.2s",
            boxShadow: sc===BACKSTORY.length-1 ? "0 8px 28px rgba(255,107,157,0.35)" : "none"}}
          onMouseEnter={e=>{if(sc<BACKSTORY.length-1){e.currentTarget.style.background="rgba(255,255,255,0.09)";e.currentTarget.style.borderColor="rgba(255,255,255,0.22)";}}}
          onMouseLeave={e=>{if(sc<BACKSTORY.length-1){e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";}}}
        >{sc===BACKSTORY.length-1 ? "소개팅 하러 가기 🚀" : "다음 →"}</button>

        {/* 스킵 */}
        {sc < BACKSTORY.length-1 && (
          <button onClick={onDone} style={{width:"100%",marginTop:8,padding:"8px",background:"transparent",border:"none",color:"rgba(255,255,255,0.18)",fontSize:11,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif"}}>건너뛰고 시작하기</button>
        )}
      </div>
    </div>
  );
}
