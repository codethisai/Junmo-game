import { useState, useRef, useEffect } from "react";
import { STAGE_EVENTS } from "../data/stages.js";
import { SCENES } from "../data/scenes.js";
import { bgm } from "../utils/audio.js";
import { callGroq } from "../utils/ai.js";
import { buildSys, bgForStage, partnerImg, kimoImg, judge } from "../utils/helpers.js";
import { getChoiceIcon } from "../components/ChoiceIcons.jsx";
import { MAX_TURNS, DAILY_LIMIT, MAX_HISTORY, EVENT_TURN_MIN, EVENT_TURN_MAX } from "../constants.js";
import { getScript } from "../data/scripts.js";
import AffBar from "../components/AffBar.jsx";
import StatChip from "../components/StatChip.jsx";
import MuteBtn from "../components/MuteBtn.jsx";

export default function GameScreen({ stage, partner, stats, onStatChg, hist, onEnd, onSave, muted, onMute }) {
  const script = getScript(partner.id, stage.id);
  const isScripted = !!script;

  const [msgs, setMsgs]     = useState(() => {
    if (script?.opening) return [{ r: "system", c: script.opening }];
    return [];
  });
  const [inp, setInp]       = useState("");
  const [loading, setLoading] = useState(false);
  const [aff, setAff]       = useState(50);
  const [minAff, setMinAff] = useState(50);
  const [turn, setTurn]     = useState(0);
  const [ended, setEnded]   = useState(false);
  const [deltas, setDeltas] = useState({});
  const [showStats, setShowStats] = useState(false);
  const [choices, setChoices] = useState(() => script?.turns[0]?.choices.map(c => c.text) || []);
  const [event, setEvent] = useState(null);
  const [showStageBanner, setShowStageBanner] = useState(true);
  const [hoveredChoice, setHoveredChoice] = useState(null);
  const eventFiredRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setShowStageBanner(false), 2200);
    return () => clearTimeout(t);
  }, []);
  const chatRef = useRef(null);
  const inpRef  = useRef(null);
  const turnsLeft = MAX_TURNS - turn;

  // 씬 선택 로직 (stage + partner 기반)
  const getSceneKey = () => {
    const stageId = stage.id;
    const partnerId = partner.id;

    if (stageId === 1) return "S1_CAFE";
    if (stageId === 2) return aff >= 50 ? "S2_HANGANG_DAY" : "S2_HANGANG_NIGHT";
    if (stageId === 3) return aff >= 50 ? "S3_IZAKAYA" : "S3_MOVIE";
    if (stageId === 4) return aff >= 60 ? "S4_APARTMENT_DAY" : "S4_APARTMENT_NIGHT";
    if (stageId === 5) return aff >= 70 ? "S5_ROOFTOP_TERRACE" : "S5_ROOFTOP_DINING";
    return "S1_CAFE";
  };

  const sceneKey = getSceneKey();
  const scene = SCENES[sceneKey] || SCENES.S1_CAFE;
  const bgImg = scene.bg;

  // 호감도에 따라 캐릭터 표정 결정
  const getCharacterExpression = () => {
    if (aff >= 70) return "smile";
    if (aff >= 35) return "neutral";
    return "bored";
  };

  const charExpression = getCharacterExpression();
  const charKey = `yujung_${charExpression}`;
  const pImg = scene.characters[charKey] || scene.characters.yujung_smile || partnerImg(partner, aff);
  const kImg  = kimoImg(aff);

  useEffect(() => { bgm.stop(); if (!muted) bgm.play(stage.bgm); return () => bgm.stop(); }, []);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [msgs, loading]);

  useEffect(() => {
    if (ended && msgs.length > 0) {
      const end = judge(aff, stage);
      setTimeout(() => onEnd(end, turn, minAff), 900);
    }
  }, [ended]);

  // thinking 태그 및 불필요한 마크업 제거
  const cleanAI = (text) => text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<\/?think>/gi, '')
    .trim();

  const fmt = (text) => text
    .replace(/\*([^*]+)\*/g, '<em style="color:rgba(255,255,255,0.4);font-style:italic;font-size:12px;">$1</em>')
    .replace(/\[호감도:?\s*\d+\/?100\]/g, '')
    .replace(/\[말주변[±+\-\d\s]+외모[±+\-\d\s]+유머[±+\-\d\s]+\]/g, '')
    .replace(new RegExp(partner.name + '\\s*:', 'g'), `<span style="color:${partner.color};font-weight:700;">${partner.name}:</span>`)
    .replace(/준모\s*속마음\s*:/g, '<span style="color:rgba(255,200,100,0.7);font-size:11px;">💭 준모 속마음:</span>')
    .replace(/준모\s*내면\s*:/g, '<span style="color:rgba(255,200,100,0.7);font-size:11px;">💭 준모 속마음:</span>')
    .trim();

  const parseAI = (text) => {
    const affM = text.match(/\[호감도:?\s*(\d+)\/?100\]/);
    const newAff = affM ? Math.max(0, Math.min(100, parseInt(affM[1]))) : null;
    let statDelta = {};
    const m2 = text.match(/말주변\s*([+\-±]\d+)/);
    const m3 = text.match(/외모\s*([+\-±]\d+)/);
    const m4 = text.match(/유머\s*([+\-±]\d+)/);
    const parse = s => { if (!s) return 0; const n = parseInt(s.replace('±','+')); return isNaN(n) ? 0 : n; };
    if (m2 || m3 || m4) {
      statDelta = { 말주변: parse(m2?.[1]), 외모: parse(m3?.[1]), 유머: parse(m4?.[1]) };
    }
    return { newAff, statDelta };
  };

  // 일일 플레이 횟수 체크
  const getDailyCount = () => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem("junmo_daily") || "{}");
    if (saved.date !== today) return 0;
    return saved.count || 0;
  };
  const incDailyCount = () => {
    const today = new Date().toDateString();
    const count = getDailyCount() + 1;
    localStorage.setItem("junmo_daily", JSON.stringify({ date: today, count }));
  };

  // 스크립트 방식: 선택지 클릭 → 미리 쓴 대사 출력
  const sendScripted = (choiceIdx) => {
    if (loading || ended) return;
    const turnData = script.turns[turn];
    if (!turnData) return;
    const chosen = turnData.choices[choiceIdx];
    if (!chosen) return;

    const newTurn = turn + 1;
    setTurn(newTurn);
    setMsgs(m => [...m, { r: "user", c: chosen.text }]);
    setChoices([]);

    setTimeout(() => {
      const newAff = Math.max(0, Math.min(100, aff + chosen.affChange));
      setAff(newAff);
      setMinAff(m => Math.min(m, newAff));
      setMsgs(m => [...m, { r: "ai", c: chosen.response }]);
      onSave({ stats, partnerId: partner.id, si: stage.id - 1, hist, aff: newAff });

      if (newTurn >= MAX_TURNS || newAff <= 0) {
        setEnded(true);
      } else {
        // 다음 턴 선택지 세팅
        const nextTurn = script.turns[newTurn];
        if (nextTurn) {
          // 돌발 이벤트 체크
          if (newTurn >= EVENT_TURN_MIN && newTurn <= EVENT_TURN_MAX && !eventFiredRef.current) {
            const stageEvents = STAGE_EVENTS[stage.id] || [];
            if (stageEvents.length > 0) {
              const ev = stageEvents[Math.floor(Math.random() * stageEvents.length)];
              eventFiredRef.current = true;
              setTimeout(() => setEvent(ev), 400);
            }
          }
          setTimeout(() => {
            if (nextTurn.scene) setMsgs(m => [...m, { r: "scene", c: nextTurn.scene }]);
            setChoices(nextTurn.choices.map(c => c.text));
          }, 300);
        }
      }
    }, 600);
  };

  // AI 방식 (스크립트 없는 스테이지 fallback)
  const send = async () => {
    if (!inp.trim() || loading || ended) return;

    if (getDailyCount() >= DAILY_LIMIT) {
      setMsgs(m => [...m, { r: "system", c: `⚠️ 오늘 대화 횟수(${DAILY_LIMIT}회)를 다 쓰셨어요.\n자정 넘으면 다시 할 수 있어요!` }]);
      return;
    }

    const userMsg = inp.trim(); setInp(""); setLoading(true);
    const newTurn = turn + 1; setTurn(newTurn);
    setMsgs(m => [...m, { r: "user", c: userMsg }]);
    setChoices([]);
    try {
      const history = msgs
        .filter(m => m.r === "user" || m.r === "ai")
        .slice(-MAX_HISTORY)
        .map(m => ({ role: m.r === "user" ? "user" : "assistant", content: m.c }));
      const raw = await callGroq(buildSys(stage, partner, stats, hist), history, userMsg);
      const aiText = cleanAI(raw);
      incDailyCount();
      const { newAff, statDelta } = parseAI(aiText);
      if (newAff !== null) { setAff(newAff); setMinAff(m => Math.min(m, newAff)); }
      if (Object.keys(statDelta).length > 0) { onStatChg(statDelta); setDeltas(statDelta); setTimeout(() => setDeltas({}), 2500); }
      setMsgs(m => [...m, { r: "ai", c: aiText }]);
      onSave({ stats, partnerId: partner.id, si: stage.id - 1, hist, aff: newAff || aff });
      if (newTurn >= MAX_TURNS || (newAff !== null && newAff <= 0)) {
        setEnded(true);
      } else {
        if (newTurn >= EVENT_TURN_MIN && newTurn <= EVENT_TURN_MAX && !eventFiredRef.current) {
          const stageEvents = STAGE_EVENTS[stage.id] || [];
          if (stageEvents.length > 0) {
            const ev = stageEvents[Math.floor(Math.random() * stageEvents.length)];
            eventFiredRef.current = true;
            setTimeout(() => setEvent(ev), 800);
          }
        }
      }
    } catch (e) {
      setMsgs(m => [...m, { r: "system", c: `⚠️ 연결에 문제가 생겼어요: ${e.message}\n잠깐 기다렸다가 다시 시도해보세요.` }]);
    } finally { setLoading(false); inpRef.current?.focus(); }
  };

  return (
    <div className="game-root" style={{fontFamily:"'Noto Sans KR',sans-serif",position:"relative",background:"#050308"}}>
      {/* 배경 이미지 */}
      <div style={{position:"absolute",inset:0,backgroundImage:`url(${bgImg})`,backgroundSize:"cover",backgroundPosition:"center",transition:"opacity 1s ease",animation:"bgFade 1.2s ease"}}/>
      {/* 배경 오버레이 */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(5,3,8,0.3) 0%,rgba(5,3,8,0.15) 40%,rgba(5,3,8,0.6) 65%,rgba(5,3,8,0.95) 100%)"}}/>

      <MuteBtn muted={muted} onToggle={onMute}/>

      {/* 스테이지 전환 배너 */}
      {showStageBanner && (
        <div style={{position:"absolute",inset:0,zIndex:100,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",animation:"stageIn 0.5s ease"}}>
          <div style={{textAlign:"center",animation:"stageTitleIn 0.6s ease 0.2s both"}}>
            <div style={{fontSize:11,letterSpacing:6,color:`${partner.color}88`,fontFamily:"monospace",marginBottom:12}}>STAGE {stage.id} / 5</div>
            <div style={{fontSize:44,marginBottom:10}}>{stage.icon}</div>
            <h2 style={{fontSize:26,fontWeight:900,color:"white",fontFamily:"'Nanum Myeongjo',serif",marginBottom:6}}>{stage.title}</h2>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:4}}>{stage.sub}</div>
            <div style={{fontSize:12,color:`${partner.color}99`,marginTop:12}}>{partner.emoji} {partner.name} · {partner.stages[stage.id-1]?.loc}</div>
          </div>
        </div>
      )}

      {/* 상단 HUD */}
      <div style={{position:"relative",zIndex:10,padding:"14px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        {/* 스테이지 정보 */}
        <div style={{background:"rgba(0,0,0,0.55)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:14,padding:"10px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
            <span style={{fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:3,fontFamily:"monospace"}}>STAGE {stage.id}/5</span>
            <div style={{display:"flex",gap:3}}>
              {Array.from({length:5},(_,i)=>(<div key={i} style={{width:5,height:5,borderRadius:"50%",background:i<stage.id?partner.color:"rgba(255,255,255,0.1)"}}/>))}
            </div>
          </div>
          <div style={{fontSize:14,fontWeight:800,color:"white",marginBottom:2}}>{stage.icon} {stage.title}</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>{partner.emoji} {partner.name} · {partner.stages[stage.id-1]?.loc}</div>
        </div>
        {/* 스탯 토글 버튼 */}
        <button onClick={()=>setShowStats(s=>!s)} style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"8px 14px",color:"rgba(255,255,255,0.6)",fontSize:11,cursor:"pointer",fontFamily:"monospace"}}>
          {showStats?"접기":"내 스탯 ▸"}
        </button>
      </div>

      {/* 스탯 오버레이 */}
      {showStats && (
        <div style={{position:"absolute",top:60,right:16,zIndex:20,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"16px",minWidth:200,animation:"slideInRight 0.2s ease"}}>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:3,fontFamily:"monospace",marginBottom:6}}>AFFECTION</div>
            <AffBar value={aff} color={partner.color}/>
          </div>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:3,fontFamily:"monospace",marginBottom:8}}>STATS</div>
          <div style={{display:"flex",gap:8,justifyContent:"space-around"}}>
            <StatChip icon="🗣️" label="말주변" value={stats.말주변} color="#00e5ff" delta={deltas.말주변||0}/>
            <StatChip icon="✨" label="외모" value={stats.외모} color="#ff6b9d" delta={deltas.외모||0}/>
            <StatChip icon="😂" label="유머" value={stats.유머} color="#ffd93d" delta={deltas.유머||0}/>
          </div>
          <div style={{marginTop:10,display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"monospace"}}>
            <span>TURN {turn}/{MAX_TURNS}</span>
            <span style={{color:turnsLeft<=5?"#ff4444":"inherit"}}>{turnsLeft<=5?`⚠ ${turnsLeft}남음`:`${turnsLeft}턴 남음`}</span>
          </div>
        </div>
      )}

      {/* 캐릭터 영역 */}
      <div style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",position:"relative",paddingBottom:0,minHeight:0}}>
        {/* 상대방 캐릭터 (중앙-우측) */}
        <div className="char-img" style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-10%)",height:"78vh",display:"flex",alignItems:"flex-end",animation:"charAppear 0.8s cubic-bezier(.34,1.4,.64,1)"}}>
          <img src={pImg} alt={partner.name} style={{height:"100%",width:"auto",objectFit:"contain",objectPosition:"bottom",filter:"drop-shadow(0 0 40px rgba(0,0,0,0.8))"}}/>
        </div>
        {/* 준모 (좌측) */}
        <div className="char-img-sub" style={{position:"absolute",bottom:0,left:"0%",height:"62vh",display:"flex",alignItems:"flex-end",opacity:0.85,animation:"charAppear 0.6s cubic-bezier(.34,1.4,.64,1)",filter:"brightness(0.8) contrast(0.9)"}}>
          <img src={kImg} alt="준모" style={{height:"100%",width:"auto",objectFit:"contain",objectPosition:"bottom",filter:"drop-shadow(0 0 30px rgba(0,0,0,0.9))"}}/>
        </div>
      </div>

      {/* 하단 대화 UI */}
      <div className="input-area" style={{position:"relative",zIndex:10,padding:"0 12px 8px",maxHeight:"48vh",display:"flex",flexDirection:"column",gap:5}}>
        {/* 호감도 바 (항상 보임) */}
        <div style={{background:"rgba(0,0,0,0.6)",backdropFilter:"blur(16px)",borderRadius:10,padding:"8px 14px",border:"1px solid rgba(255,255,255,0.07)"}}>
          <AffBar value={aff} color={partner.color}/>
        </div>
        {/* 대화창 */}
        <div style={{background:"rgba(4,2,10,0.88)",backdropFilter:"blur(24px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(0,0,0,0.5)"}}>
          {/* 화자 이름 바 */}
          <div style={{padding:"8px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.015)"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:partner.color,boxShadow:`0 0 8px ${partner.color}`}}/>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:"'Noto Sans KR',sans-serif"}}>{partner.emoji} {partner.name}</span>
            <span style={{marginLeft:"auto",fontSize:9,color:"rgba(255,255,255,0.25)",fontFamily:"monospace"}}>T{turn}/20</span>
          </div>
          {/* 메시지 */}
          <div ref={chatRef} className="chat-area" style={{flex:1,overflowY:"auto",padding:"10px 14px",display:"flex",flexDirection:"column",gap:8,minHeight:60,maxHeight:160}}>
            {msgs.length === 0 && (
              <div style={{textAlign:"center",padding:"16px 8px"}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",lineHeight:1.8,marginBottom:8}}>{partner.stages[stage.id-1]?.desc}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",background:`${partner.color}10`,border:`1px dashed ${partner.color}30`,borderRadius:20}}>
                  <span style={{fontSize:11,color:`${partner.color}99`}}>💬 아래 입력창에 말을 걸어보세요</span>
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              m.r === "scene"
                ? <div key={i} style={{textAlign:"center",padding:"4px 8px",fontSize:11,color:"rgba(255,255,255,0.3)",fontStyle:"italic",lineHeight:1.7}}>{m.c}</div>
                : (
              <div key={i} style={{display:"flex",flexDirection:m.r==="user"?"row-reverse":"row",gap:6,alignItems:"flex-start",animation:"fadeIn 0.3s ease"}}>
                {m.r === "ai" && (
                  <div style={{width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${partner.color},rgba(255,255,255,0.1))`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{partner.emoji}</div>
                )}
                <div style={{maxWidth:"85%",padding:"8px 12px",borderRadius:m.r==="user"?"12px 4px 12px 12px":"4px 12px 12px 12px",
                  background:m.r==="user"?"rgba(255,107,157,0.08)":m.r==="system"?"rgba(255,179,71,0.06)":"rgba(255,255,255,0.04)",
                  border:`1px solid ${m.r==="user"?"rgba(255,107,157,0.15)":m.r==="system"?"rgba(255,179,71,0.15)":"rgba(255,255,255,0.05)"}`,
                  fontSize:12.5,lineHeight:1.8,color:m.r==="system"?"rgba(255,200,100,0.8)":"rgba(255,255,255,0.85)"}}>
                  {m.r==="user"
                    ? <span style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>💬 {m.c}</span>
                    : <span dangerouslySetInnerHTML={{__html:fmt(m.c)}}/>}
                </div>
              </div>
                )
            ))}
            {loading && (
              <div style={{display:"flex",gap:6,alignItems:"center",animation:"fadeIn 0.2s ease"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${partner.color},rgba(255,255,255,0.1))`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>{partner.emoji}</div>
                <div style={{padding:"10px 16px",background:"rgba(255,255,255,0.04)",borderRadius:"4px 12px 12px 12px",border:"1px solid rgba(255,255,255,0.05)",display:"flex",gap:5,alignItems:"center"}}>
                  {[0,1,2].map(i=>(
                    <span key={i} style={{width:6,height:6,borderRadius:"50%",background:partner.color,display:"inline-block",animation:`typingDot 1.2s ease ${i*0.2}s infinite`}}/>
                  ))}
                </div>
              </div>
            )}
            {ended && <div style={{textAlign:"center",padding:8,color:"rgba(255,255,255,0.3)",fontSize:11,fontFamily:"monospace"}}>⏳ 결과 집계 중...</div>}
          </div>
          {/* 돌발 이벤트 모달 */}
          {event && (
            <div style={{position:"absolute",inset:0,zIndex:50,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",borderRadius:16,animation:"fadeIn 0.3s ease"}}>
              <div style={{width:"100%",maxWidth:360}}>
                <div style={{textAlign:"center",marginBottom:16}}>
                  <span style={{fontSize:11,letterSpacing:3,color:"#ffd93d",fontFamily:"monospace"}}>⚡ 돌발 이벤트</span>
                </div>
                <div style={{background:"rgba(255,217,61,0.06)",border:"1px solid rgba(255,217,61,0.2)",borderRadius:14,padding:"16px 18px",marginBottom:14,fontSize:13,color:"rgba(255,255,255,0.85)",lineHeight:1.7,fontFamily:"'Noto Sans KR',sans-serif"}}>
                  {event.desc}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {event.choices.map((c, i) => (
                    <button key={i} onClick={() => {
                      setAff(a => Math.max(0, Math.min(100, a + c.aff)));
                      setMsgs(m => [...m, { r:"system", c:`[돌발 상황] ${c.aff > 0 ? `💕 호감도 +${c.aff}` : `💔 호감도 ${c.aff}`}` }]);
                      setEvent(null);
                    }}
                      style={{padding:"11px 14px",background:i===0?"rgba(255,217,61,0.1)":"rgba(255,255,255,0.04)",border:`1px solid ${i===0?"rgba(255,217,61,0.3)":"rgba(255,255,255,0.08)"}`,borderRadius:12,color:i===0?"#ffd93d":"rgba(255,255,255,0.7)",fontSize:12.5,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif",lineHeight:1.5,textAlign:"left",touchAction:"manipulation"}}>
                      {c.t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* 선택지 카드 */}
          {choices.length > 0 && !loading && !ended && (
            <div style={{padding:"6px 10px 2px",display:"flex",flexDirection:"column",gap:5}}>
              {isScripted && <div style={{fontSize:9,color:"rgba(255,255,255,0.2)",textAlign:"right",paddingRight:4,marginBottom:2}}>선택하세요</div>}
              {choices.map((c, i) => (
                <button key={i} className="choice-btn"
                  onClick={() => isScripted ? sendScripted(i) : (() => { setInp(c); setChoices([]); setTimeout(() => inpRef.current?.focus(), 50); })()}
                  onMouseEnter={() => setHoveredChoice(i)}
                  onMouseLeave={() => setHoveredChoice(null)}
                  style={{textAlign:"left",padding:"8px 12px",background:hoveredChoice===i?`${partner.color}28`:i===0?`${partner.color}18`:i===1?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",
                    border:`1px solid ${hoveredChoice===i?partner.color+"66":i===0?partner.color+"33":"rgba(255,255,255,0.07)"}`,borderRadius:10,color:hoveredChoice===i?partner.color:i===0?partner.color:"rgba(255,255,255,0.6)",
                    fontSize:12,cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif",lineHeight:1.5,transition:"all 0.15s",
                    display:"flex",alignItems:"center",gap:6,width:"100%",transform:hoveredChoice===i?"scale(1.02)":"scale(1)",boxShadow:hoveredChoice===i?`0 4px 12px ${partner.color}33`:"none"}}>
                  <span style={{display:"flex",alignItems:"center",opacity:hoveredChoice===i?1:0.6,transition:"opacity 0.15s"}}>
                    {getChoiceIcon(i, partner.color)}
                  </span>
                  {c}
                </button>
              ))}
              <div style={{fontSize:9.5,color:"rgba(255,255,255,0.2)",textAlign:"right",paddingRight:4}}>골라도 되고, 직접 입력해도 돼요</div>
            </div>
          )}
          {/* 턴 압박 바 */}
          {turnsLeft <= 7 && !ended && (
            <div style={{padding:"4px 14px 2px",display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:10,color:turnsLeft<=3?"#ff4444":turnsLeft<=5?"#ff9944":"#ffd93d",fontFamily:"monospace",fontWeight:700,animation:turnsLeft<=3?"heartbeat 0.8s ease infinite":"none"}}>
                {turnsLeft<=3?"🚨":"⚠️"} {turnsLeft}턴 남음
              </span>
              <div style={{flex:1,height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${(turnsLeft/20)*100}%`,background:turnsLeft<=3?"#ff4444":turnsLeft<=5?"#ff9944":"#ffd93d",borderRadius:3,transition:"width 0.5s ease"}}/>
              </div>
            </div>
          )}
          {/* 스크립트 방식: 선택지만 / AI 방식: 입력창 */}
          {!isScripted && (
            <div style={{padding:"8px 10px",borderTop:`1px solid ${turnsLeft<=3?"rgba(255,68,68,0.3)":"rgba(255,255,255,0.05)"}`,display:"flex",gap:6,background:turnsLeft<=3?"rgba(255,30,30,0.05)":"rgba(0,0,0,0.3)",transition:"all 0.5s"}}>
              <input ref={inpRef} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} disabled={loading||ended}
                placeholder={ended?"결과 집계중...":turnsLeft<=3?`남은 기회 ${turnsLeft}턴, 신중하게!`:"뭐라고 할까요? (Enter로 보내기)"}
                style={{flex:1,background:"rgba(255,255,255,0.04)",border:`1px solid ${turnsLeft<=3?"rgba(255,68,68,0.3)":"rgba(255,255,255,0.07)"}`,borderRadius:10,padding:"9px 12px",color:"rgba(255,255,255,0.85)",fontSize:16,outline:"none",fontFamily:"'Noto Sans KR',sans-serif",transition:"all 0.3s"}}
                onFocus={e=>{e.target.style.border=`1px solid ${partner.color}66`}}
                onBlur={e=>{e.target.style.border=turnsLeft<=3?"1px solid rgba(255,68,68,0.3)":"1px solid rgba(255,255,255,0.07)"}}/>
              <button onClick={send} disabled={loading||ended||!inp.trim()}
                style={{padding:"9px 18px",background:inp.trim()&&!loading&&!ended?`linear-gradient(135deg,${partner.color},rgba(255,150,0,0.9))`:"rgba(255,255,255,0.04)",border:"none",borderRadius:10,color:"white",fontWeight:800,fontSize:13,cursor:inp.trim()&&!loading&&!ended?"pointer":"not-allowed",transition:"all 0.2s",minWidth:50,boxShadow:inp.trim()&&!loading&&!ended?`0 4px 16px ${partner.color}44`:"none"}}>
                {loading ? "···" : "전송"}
              </button>
            </div>
          )}
        </div>
        {/* 힌트 */}
        <div style={{display:"flex",justifyContent:"center",gap:12,fontSize:9,color:"rgba(255,255,255,0.18)",fontFamily:"monospace"}}>
          <span>💾 자동저장</span>
          <span>·</span>
          <span>❤ 85점 이상 클리어</span>
          <span>·</span>
          <span>💡 {partner.name}은 <span style={{color:partner.color+"aa"}}>{partner.fav.split(">")[0].trim()}</span>을 제일 봐요</span>
        </div>
      </div>
    </div>
  );
}
