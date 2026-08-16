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
  const [statsOpen, setStatsOpen] = useState(false); // 능력치 설정 접기(기본 닫힘)
  useEffect(() => { if (!muted) bgm.play("menu"); }, []);
  const stats = pi===3?custom:PRESETS[pi].s;
  const total = Object.values(custom).reduce((a,b)=>a+b,0);
  const ok = pi!==3||total===100;
  const CP = PARTNERS[ci];

  return (
    <div style={{minHeight:"100dvh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",fontFamily:"'Noto Sans KR',sans-serif",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",position:"relative"}}>
      {/* 남산 야경 타이틀 배경 */}
      <div style={{position:"fixed",inset:0,backgroundImage:"url(/assets/backgrounds/title_namsan.webp)",backgroundSize:"cover",backgroundPosition:"center"}}/>
      {/* 가독성 베일 (상단 살짝·하단 카드영역 밝게) */}
      <div style={{position:"fixed",inset:0,background:"linear-gradient(180deg,rgba(40,30,60,0.28) 0%,rgba(255,240,248,0.12) 42%,rgba(255,244,250,0.42) 78%,rgba(255,242,249,0.6) 100%)"}}/>

      <MuteBtn muted={muted} onToggle={onMute}/>

      <div style={{width:"100%",maxWidth:560,padding:"22px 18px 80px",position:"relative",zIndex:1}}>

        {/* 타이틀 헤더 */}
        <div style={{textAlign:"center",marginBottom:22,paddingTop:4}}>
          <div style={{fontSize:11,letterSpacing:2,color:"#ffe1ec",fontFamily:"'Nanum Myeongjo',serif",marginBottom:9,textShadow:"0 1px 8px rgba(60,30,60,0.7)"}}>모태솔로, 스물아홉의 첫 소개팅</div>
          <h1 style={{fontSize:32,fontWeight:800,color:"#fff",fontFamily:"'Nanum Myeongjo',serif",letterSpacing:1,lineHeight:1.2,textShadow:"0 2px 18px rgba(255,120,160,0.7), 0 1px 4px rgba(60,20,50,0.6)"}}>강준모의 소개팅</h1>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:10,padding:"4px 12px",background:"rgba(255,143,171,0.14)",border:"1px solid rgba(255,143,171,0.3)",borderRadius:20}}>
            <span style={{fontSize:11}}>🏆</span>
            <span style={{fontSize:10,color:"#8a6b7a",fontFamily:"monospace"}}>{Object.keys(achs).length}/{ACHS.length} 달성</span>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div style={{display:"flex",gap:3,marginBottom:20,background:"rgba(255,255,255,0.5)",borderRadius:14,padding:4,border:"1px solid rgba(255,143,171,0.18)",backdropFilter:"blur(16px)"}}>
          {[["play","🎮","시작하기"],["ach","🏆","업적"],["resume","📋","이력서"],["gallery","🔓","히든엔딩"]].map(([id,icon,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"9px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:tab===id?"rgba(255,143,171,0.2)":"transparent",border:tab===id?"1px solid rgba(255,143,171,0.4)":"1px solid transparent",borderRadius:10,color:tab===id?"#ff6f9c":"#a58a99",fontSize:10,fontWeight:tab===id?700:400,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif",transition:"all 0.2s",boxShadow:tab===id?"0 2px 10px rgba(255,143,171,0.2)":"none"}}>
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
              <div style={{height:1,flex:1,background:"rgba(255,255,255,0.35)"}}/>
              <span style={{fontSize:10,color:"#fff",letterSpacing:3,fontFamily:"monospace",textShadow:"0 1px 6px rgba(60,30,60,0.7)"}}>누구랑 만날까요</span>
              <div style={{height:1,flex:1,background:"rgba(255,255,255,0.35)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {PARTNERS.map((p,i)=>(
                <button key={p.id} onClick={()=>setCi(i)}
                  style={{padding:"16px 8px",
                    background:ci===i?`${p.color}22`:"rgba(255,255,255,0.55)",
                    border:`2px solid ${ci===i?p.color+"88":"rgba(255,143,171,0.15)"}`,
                    borderRadius:16,cursor:"pointer",textAlign:"center",
                    transition:"all 0.25s cubic-bezier(.34,1.4,.64,1)",
                    transform:ci===i?"translateY(-3px) scale(1.02)":"translateY(0) scale(1)",
                    boxShadow:ci===i?`0 10px 28px ${p.color}33`:"0 2px 8px rgba(255,143,171,0.12)",
                    backdropFilter:"blur(16px)"}}>
                  <div style={{width:66,height:66,margin:"0 auto 9px",borderRadius:"50%",overflow:"hidden",position:"relative",border:`2px solid ${ci===i?p.color:"rgba(255,143,171,0.25)"}`,boxShadow:ci===i?`0 0 18px ${p.color}66`:"none",transition:"all 0.25s"}}>
                    <img src={p.selImg} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",filter:ci===i?"none":"grayscale(0.35) brightness(0.95)",transition:"all 0.25s"}}/>
                    <span style={{position:"absolute",bottom:-1,right:-1,fontSize:13,filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.4))"}}>{p.emoji}</span>
                  </div>
                  <div style={{fontSize:13,fontWeight:800,color:ci===i?p.color:"#6b5b6e",fontFamily:"'Noto Sans KR',sans-serif",marginBottom:3}}>{p.name}</div>
                  <div style={{fontSize:9,color:ci===i?`${p.color}bb`:"#ab97a3",marginBottom:5}}>{p.mbti}</div>
                  <div style={{fontSize:9,padding:"3px 8px",background:ci===i?`${p.color}22`:"rgba(255,143,171,0.08)",borderRadius:20,color:ci===i?`${p.color}`:"#a58a99",display:"inline-block",border:`1px solid ${ci===i?p.color+"44":"rgba(255,143,171,0.14)"}`}}>{p.job}</div>
                </button>
              ))}
            </div>

            {/* 파트너 소개 카드 */}
            <div style={{marginTop:10,padding:"14px 16px",background:`rgba(255,255,255,0.62)`,border:`1px solid ${CP.color}33`,borderRadius:14,position:"relative",overflow:"hidden",backdropFilter:"blur(20px)",transition:"border-color 0.3s",boxShadow:"0 4px 16px rgba(255,143,171,0.12)"}}>
              <div style={{position:"absolute",top:0,left:"10%",right:"10%",height:1,background:`linear-gradient(90deg,transparent,${CP.color}55,transparent)`}}/>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:60,height:78,borderRadius:12,overflow:"hidden",flexShrink:0,border:`1px solid ${CP.color}44`,background:`${CP.color}14`,boxShadow:`0 4px 14px ${CP.color}22`}}>
                  <img src={CP.selImg} alt={CP.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:8,color:`${CP.color}`,letterSpacing:3,fontFamily:"monospace",marginBottom:4}}>ABOUT {CP.name.toUpperCase()}</div>
                  <p style={{fontSize:12,color:"#6b5b6e",lineHeight:1.75,marginBottom:8}}>{CP.intro}</p>
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

          {/* 스탯 프리셋 (접기 — 기본 닫힘, 안 열면 현재 프리셋으로 바로 시작) */}
          <div style={{marginBottom:16}}>
            <button onClick={()=>setStatsOpen(o=>!o)} style={{width:"100%",display:"flex",alignItems:"center",gap:8,marginBottom:statsOpen?12:0,padding:"11px 14px",background:"rgba(255,255,255,0.55)",border:"1px solid rgba(255,143,171,0.18)",borderRadius:12,cursor:"pointer",backdropFilter:"blur(14px)"}}>
              <span style={{fontSize:12}}>⚙️</span>
              <span style={{flex:1,textAlign:"left",fontSize:11,color:"#8a6b7a",fontFamily:"'Noto Sans KR',sans-serif"}}>준모 능력치 <span style={{color:"#ff6f9c",fontWeight:700}}>{pi===3?"직접 설정":PRESETS[pi].n.replace(/[^가-힣 ]/g,"").trim()}</span></span>
              <span style={{fontSize:10,color:"#ab97a3"}}>{statsOpen?"접기 ▲":"바꾸기 ▼"}</span>
            </button>
            {statsOpen && (<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              {PRESETS.map((p,i)=>(
                <button key={i} onClick={()=>setPi(i)}
                  style={{padding:"13px 14px",
                    background:pi===i?"rgba(255,143,171,0.14)":"rgba(255,255,255,0.55)",
                    border:`1px solid ${pi===i?"rgba(255,143,171,0.4)":"rgba(255,143,171,0.14)"}`,
                    borderRadius:13,cursor:"pointer",textAlign:"left",transition:"all 0.2s",
                    transform:pi===i?"scale(1.02)":"scale(1)",
                    backdropFilter:"blur(14px)",
                    boxShadow:pi===i?"0 4px 16px rgba(255,143,171,0.18)":"none"}}>
                  <div style={{fontSize:13,fontWeight:800,color:pi===i?"#ff6f9c":"#6b5b6e",fontFamily:"'Noto Sans KR',sans-serif",marginBottom:4}}>{p.n}</div>
                  <div style={{fontSize:10,color:"#a58a99",lineHeight:1.5}}>{p.d}</div>
                </button>
              ))}
            </div>

            {/* 커스텀 슬라이더 */}
            {pi===3 && (
              <div style={{background:"rgba(255,255,255,0.6)",border:"1px solid rgba(255,143,171,0.18)",borderRadius:12,padding:"14px 16px",backdropFilter:"blur(16px)"}}>
                {[["말주변","#3bb4d0"],["외모","#ff6b9d"],["유머","#f0a500"]].map(([k,color])=>(
                  <div key={k} style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:11,color:"#7a6675"}}>{k}</span>
                      <span style={{fontSize:12,color,fontFamily:"monospace",fontWeight:700}}>{custom[k]}</span>
                    </div>
                    <input type="range" min={0} max={100} value={custom[k]}
                      onChange={e=>setCustom(p=>({...p,[k]:+e.target.value}))}
                      style={{width:"100%",accentColor:color,height:4}}/>
                  </div>
                ))}
                <div style={{textAlign:"center",fontSize:11,color:total===100?"#2fb344":"#e5484d",fontFamily:"monospace",padding:"6px",background:total===100?"rgba(47,179,68,0.08)":"rgba(229,72,77,0.08)",borderRadius:8,border:`1px solid ${total===100?"rgba(47,179,68,0.2)":"rgba(229,72,77,0.2)"}`}}>합계: {total}/100 {total===100?"✓ 준비됐어요!":"← 딱 100이 되어야 해요"}</div>
              </div>
            )}

            {/* 스탯 미리보기 바 */}
            {(pi!==3||ok) && (
              <div style={{marginTop:10,display:"flex",gap:6}}>
                {[["🗣️","말주변","#3bb4d0"],["✨","외모","#ff6b9d"],["😂","유머","#f0a500"]].map(([icon,k,color])=>(
                  <div key={k} style={{flex:1,background:"rgba(255,255,255,0.55)",borderRadius:10,padding:"10px 8px",textAlign:"center",backdropFilter:"blur(10px)",border:"1px solid rgba(255,143,171,0.14)"}}>
                    <div style={{fontSize:10,color:"#a58a99",marginBottom:5}}>{icon}</div>
                    <div style={{height:3,background:"rgba(255,143,171,0.12)",borderRadius:3,marginBottom:5,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${stats[k]}%`,background:`linear-gradient(90deg,${color}88,${color})`,borderRadius:3,transition:"width 0.4s ease"}}/>
                    </div>
                    <div style={{fontSize:10,color:"#8a6b7a",marginBottom:1,fontFamily:"'Noto Sans KR',sans-serif"}}>{k}</div>
                    <div style={{fontSize:13,color,fontFamily:"monospace",fontWeight:700}}>{stats[k]}</div>
                  </div>
                ))}
              </div>
            )}
            </>)}
          </div>

          {/* 시작 버튼 */}
          <button onClick={()=>ok&&onStart(stats,PARTNERS[ci],0,[])} disabled={!ok}
            style={{width:"100%",padding:"15px",
              background:ok?"linear-gradient(135deg,#ff9ec0,#ff6f9c)":"rgba(255,255,255,0.4)",
              border:"none",borderRadius:15,color:ok?"#fff":"#c7b0bc",
              fontWeight:900,fontSize:15,cursor:ok?"pointer":"not-allowed",
              fontFamily:"'Noto Sans KR',sans-serif",
              boxShadow:ok?"0 10px 30px rgba(255,111,156,0.4),0 2px 0 rgba(255,255,255,0.3) inset":"none",
              transition:"all 0.2s",letterSpacing:0.5}}>
            ☕ 지금 바로 소개팅 시작
          </button>

          {saved && (
            <div style={{marginTop:10,display:"flex",gap:8}}>
              <button onClick={()=>onStart(saved.stats,PARTNERS.find(p=>p.id===saved.partnerId)||PARTNERS[0],saved.si,saved.hist)}
                style={{flex:1,padding:"11px",background:"rgba(168,216,234,0.25)",border:"1px solid rgba(120,180,210,0.4)",borderRadius:12,color:"#3d8bb0",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif",backdropFilter:"blur(10px)"}}>
                💾 이어하기 — 스테이지 {saved.si+1}
              </button>
              <button onClick={onClearSave}
                style={{padding:"11px 14px",background:"rgba(229,72,77,0.08)",border:"1px solid rgba(229,72,77,0.2)",borderRadius:12,color:"#d05a5e",fontSize:11,cursor:"pointer",backdropFilter:"blur(10px)"}}>
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
                background:achs[a.id]?"rgba(255,193,80,0.14)":"rgba(255,255,255,0.5)",
                border:`1px solid ${achs[a.id]?"rgba(240,165,0,0.35)":"rgba(255,143,171,0.14)"}`,
                borderRadius:13,opacity:achs[a.id]?1:0.7,backdropFilter:"blur(14px)"}}>
                <div style={{fontSize:22,marginBottom:6}}>{achs[a.id]?a.e:"🔒"}</div>
                <div style={{fontSize:11,fontWeight:700,color:achs[a.id]?"#e59400":"#a58a99",fontFamily:"'Noto Sans KR',sans-serif",marginBottom:achs[a.id]?4:0}}>{a.t}</div>
                {achs[a.id] && <div style={{fontSize:9,color:"#8a6b7a",lineHeight:1.5}}>{a.d}</div>}
              </div>
            ))}
          </div>
        )}

        {/* ── 이력서 탭 ── */}
        {tab==="resume" && (
          <div style={{padding:"4px 0"}}>
            <div style={{fontSize:9,color:"#a58a99",marginBottom:12,letterSpacing:3,fontFamily:"monospace"}}>강준모의 소개팅 기록부</div>
            {resume.length === 0 ? (
              <div style={{textAlign:"center",padding:"32px 0",color:"#b09aa5",fontSize:12}}>아직 기록이 없어요.<br/>첫 소개팅을 시작해봐요!</div>
            ) : resume.map((r, i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:r.ok?"rgba(255,143,171,0.1)":"rgba(229,72,77,0.07)",border:`1px solid ${r.ok?"rgba(255,143,171,0.22)":"rgba(229,72,77,0.15)"}`,borderRadius:12,marginBottom:6}}>
                <span style={{fontSize:18}}>{r.ok?"✅":"❌"}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:"#5f4f62",fontFamily:"'Noto Sans KR',sans-serif"}}>{r.partner} · S{r.stage}</div>
                  <div style={{fontSize:10,color:"#a58a99"}}>{r.result} · {r.turns}턴 · {r.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 갤러리 탭 ── */}
        {tab==="gallery" && (
          <div style={{padding:"4px 0"}}>
            <div style={{fontSize:9,color:"#a58a99",marginBottom:8,letterSpacing:3,fontFamily:"monospace"}}>숨겨진 엔딩 {secretEndings.length}/{SECRET_ENDINGS.length}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {SECRET_ENDINGS.map(se => {
                const unlocked = secretEndings.includes(se.id);
                return (
                  <div key={se.id} style={{padding:"12px 16px",background:unlocked?"rgba(255,193,80,0.14)":"rgba(255,255,255,0.4)",border:`1px solid ${unlocked?"rgba(240,165,0,0.3)":"rgba(255,143,171,0.12)"}`,borderRadius:14,display:"flex",gap:12,alignItems:"center"}}>
                    <span style={{fontSize:24,filter:unlocked?"none":"grayscale(1) brightness(0.75)"}}>{se.e}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:unlocked?"#e59400":"#b09aa5",fontFamily:"'Noto Sans KR',sans-serif"}}>{unlocked ? se.t : "???"}</div>
                      <div style={{fontSize:11,color:"#a58a99",marginTop:2}}>{unlocked ? se.d : "아직 잠겨 있어요. 계속 도전해봐요!"}</div>
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
