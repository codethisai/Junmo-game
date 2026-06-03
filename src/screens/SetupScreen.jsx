import { useState, useEffect } from "react";
import { IMGS } from "../data/content.js";
import { PRESETS } from "../data/content.js";
import { PARTNERS } from "../data/partners.js";
import { ACHS, SECRET_ENDINGS } from "../data/achievements.js";
import { bgm } from "../utils/audio.js";
import MuteBtn from "../components/MuteBtn.jsx";

export default function SetupScreen({ onStart, saved, onClearSave, achs, muted, onMute, resume = [], secretEndings = [] }) {
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [custom, setCustom] = useState({말주변:33,외모:33,유머:34});
  const [tab, setTab] = useState("play");
  useEffect(() => { bgm.stop(); if (!muted) bgm.play("menu"); return () => bgm.stop(); }, []);
  const stats = pi===3?custom:PRESETS[pi].s;
  const total = Object.values(custom).reduce((a,b)=>a+b,0);
  const ok = pi!==3||total===100;
  const CP = PARTNERS[ci];

  return (
    <div style={{minHeight:"100dvh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",fontFamily:"'Noto Sans KR',sans-serif",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",position:"relative"}}>
      {/* 배경 카페 이미지 */}
      <div style={{position:"fixed",inset:0,backgroundImage:`url(${IMGS.cafe_bg})`,backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(0.28) saturate(0.75)"}}/>
      {/* 따뜻한 오버레이 레이어 */}
      <div style={{position:"fixed",inset:0,background:"linear-gradient(180deg,rgba(12,7,3,0.3) 0%,rgba(200,110,30,0.06) 40%,rgba(8,5,2,0.5) 100%)"}}/>
      {/* 좌우 비네팅 */}
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse at center,transparent 40%,rgba(5,3,1,0.55) 100%)"}}/>

      <MuteBtn muted={muted} onToggle={onMute}/>

      <div style={{width:"100%",maxWidth:560,padding:"22px 18px 80px",position:"relative",zIndex:1}}>

        {/* 타이틀 헤더 */}
        <div style={{textAlign:"center",marginBottom:22,paddingTop:4}}>
          <div style={{fontSize:8,letterSpacing:8,color:"rgba(255,200,140,0.4)",fontFamily:"monospace",marginBottom:7}}>AI INTERACTIVE VISUAL NOVEL</div>
          <h1 style={{fontSize:28,fontWeight:900,background:"linear-gradient(135deg,#ffb347,#ff6b9d,#c8a4ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"'Nanum Myeongjo',serif",letterSpacing:-0.5,lineHeight:1.2}}>강준모의 소개팅</h1>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:7,padding:"4px 12px",background:"rgba(255,200,140,0.06)",border:"1px solid rgba(255,200,140,0.12)",borderRadius:20}}>
            <span style={{fontSize:11,color:"rgba(255,200,140,0.5)"}}>🏆</span>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"monospace"}}>{Object.keys(achs).length}/{ACHS.length} 달성</span>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div style={{display:"flex",gap:3,marginBottom:20,background:"rgba(0,0,0,0.4)",borderRadius:14,padding:4,border:"1px solid rgba(255,255,255,0.07)",backdropFilter:"blur(16px)"}}>
          {[["play","🎮","시작하기"],["ach","🏆","업적"],["resume","📋","이력서"],["gallery","🔓","히든엔딩"]].map(([id,icon,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"9px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:tab===id?"rgba(255,179,71,0.15)":"transparent",border:tab===id?"1px solid rgba(255,179,71,0.28)":"1px solid transparent",borderRadius:10,color:tab===id?"#ffb347":"rgba(255,255,255,0.38)",fontSize:10,fontWeight:tab===id?700:400,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif",transition:"all 0.2s",boxShadow:tab===id?"0 2px 10px rgba(255,179,71,0.12)":"none"}}>
              <span style={{fontSize:14}}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* ── 플레이 탭 ── */}
        {tab==="play" && (<>

          {/* 파트너 선택 섹션 */}
          <div style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <div style={{height:1,flex:1,background:"rgba(255,255,255,0.07)"}}/>
              <span style={{fontSize:10,color:"rgba(255,255,255,0.35)",letterSpacing:3,fontFamily:"monospace"}}>누구랑 만날까요</span>
              <div style={{height:1,flex:1,background:"rgba(255,255,255,0.07)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {PARTNERS.map((p,i)=>(
                <button key={p.id} onClick={()=>setCi(i)}
                  style={{padding:"16px 8px",
                    background:ci===i?`${p.color}14`:"rgba(0,0,0,0.35)",
                    border:`2px solid ${ci===i?p.color+"55":"rgba(255,255,255,0.07)"}`,
                    borderRadius:16,cursor:"pointer",textAlign:"center",
                    transition:"all 0.25s cubic-bezier(.34,1.4,.64,1)",
                    transform:ci===i?"translateY(-3px) scale(1.02)":"translateY(0) scale(1)",
                    boxShadow:ci===i?`0 10px 28px ${p.color}1e,0 0 0 1px ${p.color}22 inset`:"none",
                    backdropFilter:"blur(16px)"}}>
                  <div style={{fontSize:26,marginBottom:6,filter:ci===i?"none":"grayscale(0.3)"}}>{p.emoji}</div>
                  <div style={{fontSize:13,fontWeight:800,color:ci===i?p.color:"rgba(255,255,255,0.7)",fontFamily:"'Noto Sans KR',sans-serif",marginBottom:3}}>{p.name}</div>
                  <div style={{fontSize:9,color:ci===i?`${p.color}88`:"rgba(255,255,255,0.28)",marginBottom:5}}>{p.mbti}</div>
                  <div style={{fontSize:9,padding:"3px 8px",background:ci===i?`${p.color}18`:"rgba(255,255,255,0.05)",borderRadius:20,color:ci===i?`${p.color}cc`:"rgba(255,255,255,0.28)",display:"inline-block",border:`1px solid ${ci===i?p.color+"22":"rgba(255,255,255,0.06)"}`}}>{p.job}</div>
                </button>
              ))}
            </div>

            {/* 파트너 소개 카드 */}
            <div style={{marginTop:10,padding:"14px 16px",background:`rgba(0,0,0,0.4)`,border:`1px solid ${CP.color}1e`,borderRadius:14,position:"relative",overflow:"hidden",backdropFilter:"blur(20px)",transition:"border-color 0.3s"}}>
              <div style={{position:"absolute",top:0,left:"10%",right:"10%",height:1,background:`linear-gradient(90deg,transparent,${CP.color}44,transparent)`}}/>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${CP.color}14`,border:`1px solid ${CP.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{CP.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:8,color:`${CP.color}77`,letterSpacing:3,fontFamily:"monospace",marginBottom:4}}>ABOUT {CP.name.toUpperCase()}</div>
                  <p style={{fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.75,marginBottom:8}}>{CP.intro}</p>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {CP.fav.split(">").map((f,i)=>(
                      <span key={i} style={{fontSize:9,padding:"2px 9px",background:`${CP.color}${i===0?"18":"0c"}`,border:`1px solid ${CP.color}${i===0?"33":"1a"}`,borderRadius:20,color:`${CP.color}${i===0?"cc":"77"}`}}>
                        {i===0?"❤ ":""}#{f.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 스탯 프리셋 */}
          <div style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <div style={{height:1,flex:1,background:"rgba(255,255,255,0.07)"}}/>
              <span style={{fontSize:10,color:"rgba(255,255,255,0.35)",letterSpacing:3,fontFamily:"monospace"}}>준모 능력치 설정</span>
              <div style={{height:1,flex:1,background:"rgba(255,255,255,0.07)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              {PRESETS.map((p,i)=>(
                <button key={i} onClick={()=>setPi(i)}
                  style={{padding:"13px 14px",
                    background:pi===i?"rgba(255,179,71,0.1)":"rgba(0,0,0,0.35)",
                    border:`1px solid ${pi===i?"rgba(255,179,71,0.35)":"rgba(255,255,255,0.07)"}`,
                    borderRadius:13,cursor:"pointer",textAlign:"left",transition:"all 0.2s",
                    transform:pi===i?"scale(1.02)":"scale(1)",
                    backdropFilter:"blur(14px)",
                    boxShadow:pi===i?"0 4px 16px rgba(255,179,71,0.1)":"none"}}>
                  <div style={{fontSize:13,fontWeight:800,color:pi===i?"#ffb347":"rgba(255,255,255,0.68)",fontFamily:"'Noto Sans KR',sans-serif",marginBottom:4}}>{p.n}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.32)",lineHeight:1.5}}>{p.d}</div>
                </button>
              ))}
            </div>

            {/* 커스텀 슬라이더 */}
            {pi===3 && (
              <div style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"14px 16px",backdropFilter:"blur(16px)"}}>
                {[["말주변","#00e5ff"],["외모","#ff6b9d"],["유머","#ffd93d"]].map(([k,color])=>(
                  <div key={k} style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>{k}</span>
                      <span style={{fontSize:12,color,fontFamily:"monospace",fontWeight:700}}>{custom[k]}</span>
                    </div>
                    <input type="range" min={0} max={100} value={custom[k]}
                      onChange={e=>setCustom(p=>({...p,[k]:+e.target.value}))}
                      style={{width:"100%",accentColor:color,height:4}}/>
                  </div>
                ))}
                <div style={{textAlign:"center",fontSize:11,color:total===100?"#39ff14":"#ff6b6b",fontFamily:"monospace",padding:"6px",background:total===100?"rgba(57,255,20,0.05)":"rgba(255,107,107,0.05)",borderRadius:8,border:`1px solid ${total===100?"rgba(57,255,20,0.15)":"rgba(255,107,107,0.15)"}`}}>합계: {total}/100 {total===100?"✓ 준비됐어요!":"← 딱 100이 되어야 해요"}</div>
              </div>
            )}

            {/* 스탯 미리보기 바 */}
            {(pi!==3||ok) && (
              <div style={{marginTop:10,display:"flex",gap:6}}>
                {[["🗣️","말주변","#00e5ff"],["✨","외모","#ff6b9d"],["😂","유머","#ffd93d"]].map(([icon,k,color])=>(
                  <div key={k} style={{flex:1,background:"rgba(0,0,0,0.35)",borderRadius:10,padding:"10px 8px",textAlign:"center",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.06)"}}>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:5}}>{icon}</div>
                    <div style={{height:3,background:"rgba(255,255,255,0.07)",borderRadius:3,marginBottom:5,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${stats[k]}%`,background:`linear-gradient(90deg,${color}88,${color})`,borderRadius:3,transition:"width 0.4s ease"}}/>
                    </div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginBottom:1,fontFamily:"'Noto Sans KR',sans-serif"}}>{k}</div>
                    <div style={{fontSize:13,color,fontFamily:"monospace",fontWeight:700}}>{stats[k]}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 시작 버튼 */}
          <button onClick={()=>ok&&onStart(stats,PARTNERS[ci],0,[])} disabled={!ok}
            style={{width:"100%",padding:"15px",
              background:ok?"linear-gradient(135deg,#ff6b9d,#ffb347)":"rgba(255,255,255,0.04)",
              border:"none",borderRadius:15,color:ok?"white":"rgba(255,255,255,0.25)",
              fontWeight:900,fontSize:15,cursor:ok?"pointer":"not-allowed",
              fontFamily:"'Noto Sans KR',sans-serif",
              boxShadow:ok?"0 10px 36px rgba(255,107,157,0.35),0 2px 0 rgba(255,255,255,0.1) inset":"none",
              transition:"all 0.2s",letterSpacing:0.5}}>
            ☕ 지금 바로 소개팅 시작
          </button>

          {saved && (
            <div style={{marginTop:10,display:"flex",gap:8}}>
              <button onClick={()=>onStart(saved.stats,PARTNERS.find(p=>p.id===saved.partnerId)||PARTNERS[0],saved.si,saved.hist)}
                style={{flex:1,padding:"11px",background:"rgba(124,158,255,0.09)",border:"1px solid rgba(124,158,255,0.22)",borderRadius:12,color:"#9ab4ff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif",backdropFilter:"blur(10px)"}}>
                💾 이어하기 — 스테이지 {saved.si+1}
              </button>
              <button onClick={onClearSave}
                style={{padding:"11px 14px",background:"rgba(255,51,51,0.06)",border:"1px solid rgba(255,51,51,0.16)",borderRadius:12,color:"rgba(255,110,110,0.65)",fontSize:11,cursor:"pointer",backdropFilter:"blur(10px)"}}>
                삭제
              </button>
            </div>
          )}
        </>)}

        {/* ── 도전과제 탭 ── */}
        {tab==="ach" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {ACHS.map(a=>(
              <div key={a.id} style={{padding:"14px 12px",
                background:achs[a.id]?"rgba(255,215,0,0.06)":"rgba(0,0,0,0.35)",
                border:`1px solid ${achs[a.id]?"rgba(255,215,0,0.22)":"rgba(255,255,255,0.06)"}`,
                borderRadius:13,opacity:achs[a.id]?1:0.55,backdropFilter:"blur(14px)"}}>
                <div style={{fontSize:22,marginBottom:6}}>{achs[a.id]?a.e:"🔒"}</div>
                <div style={{fontSize:11,fontWeight:700,color:achs[a.id]?"#ffd700":"rgba(255,255,255,0.4)",fontFamily:"'Noto Sans KR',sans-serif",marginBottom:achs[a.id]?4:0}}>{a.t}</div>
                {achs[a.id] && <div style={{fontSize:9,color:"rgba(255,255,255,0.32)",lineHeight:1.5}}>{a.d}</div>}
              </div>
            ))}
          </div>
        )}

        {/* ── 이력서 탭 ── */}
        {tab==="resume" && (
          <div style={{padding:"4px 0"}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",marginBottom:12,letterSpacing:3,fontFamily:"monospace"}}>강준모의 소개팅 기록부</div>
            {resume.length === 0 ? (
              <div style={{textAlign:"center",padding:"32px 0",color:"rgba(255,255,255,0.2)",fontSize:12}}>아직 기록이 없어요.<br/>첫 소개팅을 시작해봐요!</div>
            ) : resume.map((r, i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:r.ok?"rgba(255,179,71,0.06)":"rgba(255,68,68,0.05)",border:`1px solid ${r.ok?"rgba(255,179,71,0.15)":"rgba(255,68,68,0.1)"}`,borderRadius:12,marginBottom:6}}>
                <span style={{fontSize:18}}>{r.ok?"✅":"❌"}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",fontFamily:"'Noto Sans KR',sans-serif"}}>{r.partner} · S{r.stage}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{r.result} · {r.turns}턴 · {r.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 갤러리 탭 ── */}
        {tab==="gallery" && (
          <div style={{padding:"4px 0"}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",marginBottom:8,letterSpacing:3,fontFamily:"monospace"}}>숨겨진 엔딩 {secretEndings.length}/{SECRET_ENDINGS.length}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {SECRET_ENDINGS.map(se => {
                const unlocked = secretEndings.includes(se.id);
                return (
                  <div key={se.id} style={{padding:"12px 16px",background:unlocked?"rgba(255,215,0,0.06)":"rgba(255,255,255,0.02)",border:`1px solid ${unlocked?"rgba(255,215,0,0.2)":"rgba(255,255,255,0.05)"}`,borderRadius:14,display:"flex",gap:12,alignItems:"center"}}>
                    <span style={{fontSize:24,filter:unlocked?"none":"grayscale(1) brightness(0.3)"}}>{se.e}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:unlocked?"#ffd700":"rgba(255,255,255,0.2)",fontFamily:"'Noto Sans KR',sans-serif"}}>{unlocked ? se.t : "???"}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:2}}>{unlocked ? se.d : "아직 잠겨 있어요. 계속 도전해봐요!"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
