import { useEffect } from "react";
import { IMGS, FAIL_Q } from "../data/content.js";
import { STAGES } from "../data/stages.js";
import { bgm } from "../utils/audio.js";
import { bgForStage } from "../utils/helpers.js";
import MuteBtn from "../components/MuteBtn.jsx";

export default function EndingScreen({ ending, stage, partner, stats, onNext, muted, onMute }) {
  const ok = ending.next, final = stage.id === 5 && ok;
  const failQ = FAIL_Q[Math.floor(Math.random() * FAIL_Q.length)];
  const accentColor = final ? "#ffd93d" : ok ? partner.color : "#ff4444";
  const pImg = ok ? (IMGS[partner.imgs.smile2] || IMGS[partner.imgs.smile]) : IMGS[partner.imgs.cold];
  const kImg = ok ? IMGS.junmo_happy : IMGS.junmo_shocked;
  const bgImg = bgForStage(stage.id - 1);
  useEffect(() => { bgm.stop(); if (!muted) bgm.play(final ? "ending" : ok ? "success" : "fail"); return () => bgm.stop(); }, []);

  return (
    <div style={{minHeight:"100dvh",display:"flex",flexDirection:"column",fontFamily:"'Noto Sans KR',sans-serif",position:"relative",overflow:"hidden",background:"#050308"}}>
      {/* 배경 */}
      <div style={{position:"absolute",inset:0,backgroundImage:`url(${bgImg})`,backgroundSize:"cover",backgroundPosition:"center",filter:ok?"none":"grayscale(0.7) brightness(0.5)"}}/>
      <div style={{position:"absolute",inset:0,background:ok?`linear-gradient(180deg,rgba(5,3,8,0.2) 0%,rgba(5,3,8,0.7) 50%,rgba(5,3,8,0.97) 100%)`:`linear-gradient(180deg,rgba(5,3,8,0.5) 0%,rgba(5,3,8,0.9) 50%,rgba(5,3,8,0.99) 100%)`}}/>
      {final && <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 40%,rgba(255,215,0,0.08) 0%,transparent 60%)"}}/>}
      <MuteBtn muted={muted} onToggle={onMute}/>

      {/* 캐릭터 */}
      <div style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",position:"relative",paddingBottom:0}}>
        <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-10%)",height:"60vh",display:"flex",alignItems:"flex-end",animation:"charAppear 0.8s cubic-bezier(.34,1.4,.64,1)",filter:`drop-shadow(0 0 ${ok?"60px":"30px"} ${ok?accentColor+"44":"rgba(0,0,0,0.8)"})`}}>
          <img src={pImg} alt={partner.name} style={{height:"100%",width:"auto",objectFit:"contain",objectPosition:"bottom"}}/>
        </div>
        <div style={{position:"absolute",bottom:0,left:"2%",height:"48vh",display:"flex",alignItems:"flex-end",animation:"charAppear 0.6s cubic-bezier(.34,1.4,.64,1)",opacity:0.9}}>
          <img src={kImg} alt="준모" style={{height:"100%",width:"auto",objectFit:"contain",objectPosition:"bottom",filter:"drop-shadow(0 0 20px rgba(0,0,0,0.9))"}}/>
        </div>
      </div>

      {/* 결과 카드 */}
      <div style={{position:"relative",zIndex:10,padding:"0 16px 20px"}}>
        <div style={{background:"rgba(4,2,10,0.92)",backdropFilter:"blur(30px)",border:`1px solid ${accentColor}22`,borderRadius:20,padding:"20px 20px",textAlign:"center",boxShadow:`0 -16px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.04)`}}>
          <div style={{position:"absolute",top:0,left:"20%",right:"20%",height:1,background:`linear-gradient(90deg,transparent,${accentColor}66,transparent)`}}/>
          {final ? (
            <>
              <div style={{fontSize:9,letterSpacing:6,color:`${accentColor}88`,fontFamily:"monospace",marginBottom:8}}>TRUE ENDING UNLOCKED</div>
              <div style={{fontSize:32,marginBottom:8}}>💒</div>
              <h2 style={{fontSize:24,fontWeight:900,background:"linear-gradient(135deg,#ff6b9d,#ffd93d,#7c9eff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:10,fontFamily:"'Nanum Myeongjo',serif"}}>모솔 완전 탈출!</h2>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:12,lineHeight:1.9,marginBottom:16}}>강준모, 29세. 남중 → 남고 → 공대 → 군대 → IT 스타트업.<br/>그 긴 여정 끝에 <span style={{color:partner.color,fontWeight:700}}>{partner.name}</span>을(를) 만났다.<br/>🧙 29년 만에 마법사의 저주가 풀렸다.</p>
              <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:16,flexWrap:"wrap"}}>
                {Object.entries(stats).map(([k,v])=>(<div key={k} style={{padding:"4px 10px",background:"rgba(255,255,255,0.04)",borderRadius:8,fontSize:10,color:"rgba(255,255,255,0.5)",fontFamily:"monospace"}}>{k} {v}</div>))}
              </div>
              <button onClick={()=>onNext("reset")} style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#ff6b9d,#ffd93d,#7c9eff)",border:"none",borderRadius:14,color:"white",fontWeight:900,fontSize:15,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif",boxShadow:"0 8px 40px rgba(255,107,157,0.4)"}}>다시 처음부터 🔄</button>
            </>
          ) : ok ? (
            <>
              <div style={{fontSize:9,letterSpacing:5,color:`${partner.color}66`,fontFamily:"monospace",marginBottom:6}}>STAGE {stage.id} CLEAR</div>
              <div style={{fontSize:28,marginBottom:6}}>{ending.e}</div>
              <h2 style={{fontSize:20,fontWeight:900,color:partner.color,marginBottom:6,fontFamily:"'Nanum Myeongjo',serif"}}>{ending.l}</h2>
              <p style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginBottom:4}}>{ending.d}</p>
              {STAGES[stage.id] && (
                <div style={{padding:"8px 12px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,marginBottom:14,marginTop:8,fontSize:11,color:"rgba(255,255,255,0.3)"}}>
                  NEXT → <span style={{color:partner.color}}>{STAGES[stage.id]?.title}</span>
                </div>
              )}
              <button onClick={()=>onNext(stage.id>=5?"reset":"next")} style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${partner.color},rgba(255,150,0,0.8))`,border:"none",borderRadius:14,color:"white",fontWeight:900,fontSize:14,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif",boxShadow:`0 8px 32px ${partner.color}44`}}>
                {stage.id >= 5 ? "처음부터 🔄" : "다음 스테이지 →"}
              </button>
            </>
          ) : (
            <>
              <div style={{fontSize:9,letterSpacing:5,color:"rgba(255,68,68,0.5)",fontFamily:"monospace",marginBottom:6}}>GAME OVER</div>
              <div style={{fontSize:28,marginBottom:6}}>{ending.e}</div>
              <h2 style={{fontSize:20,fontWeight:900,color:"#ff6666",marginBottom:6,fontFamily:"'Nanum Myeongjo',serif"}}>{ending.l}</h2>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginBottom:6,lineHeight:1.6}}>{ending.d}</p>
              <div style={{padding:"10px 14px",background:"rgba(255,255,255,0.025)",borderRadius:10,marginBottom:12,border:"1px solid rgba(255,255,255,0.05)"}}>
                <p style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontStyle:"italic",lineHeight:1.7}}>"{failQ}"</p>
              </div>
              <div style={{padding:"10px 14px",background:"rgba(255,68,68,0.04)",border:"1px solid rgba(255,68,68,0.12)",borderRadius:12,marginBottom:14,textAlign:"left"}}>
                <div style={{fontSize:9,color:"rgba(255,68,68,0.5)",fontFamily:"monospace",marginBottom:6}}>패인 분석</div>
                {stats.말주변<30&&<div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:2}}>• 말주변 {stats.말주변} — 하고 싶은 말이 끝까지 안 나왔음</div>}
                {stats.외모<30&&<div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:2}}>• 외모 {stats.외모} — 첫인상부터 이미 불리한 싸움이었음</div>}
                {stats.유머<30&&<div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:2}}>• 유머 {stats.유머} — 분위기 살릴 카드가 하나도 없었음</div>}
                {stats.말주변>=30&&stats.외모>=30&&stats.유머>=30&&<div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>스탯은 나쁘지 않았는데, 선택이 아쉬웠음</div>}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>onNext("retry")} style={{flex:1,padding:"11px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif"}}>다시 도전</button>
                <button onClick={()=>onNext("reset")} style={{flex:1,padding:"11px",background:"rgba(255,68,68,0.08)",border:"1px solid rgba(255,68,68,0.2)",borderRadius:12,color:"rgba(255,120,120,0.8)",fontSize:13,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif"}}>처음으로 🔄</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
