import { useState, useEffect, useCallback } from "react";

import { STAGES } from "./data/stages.js";
import { PARTNERS } from "./data/partners.js";
import { ACHS, SECRET_ENDINGS } from "./data/achievements.js";

import { bgm } from "./utils/audio.js";
import { loadSave, saveSave, loadAch, saveAch } from "./utils/storage.js";

import AchToast from "./components/AchToast.jsx";
import BackstoryScreen from "./screens/BackstoryScreen.jsx";
import SetupScreen from "./screens/SetupScreen.jsx";
import GameScreen from "./screens/GameScreen.jsx";
import EndingScreen from "./screens/EndingScreen.jsx";
import TestAffBar from "./pages/TestAffBar.jsx";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideInLeft { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideInRight { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
  @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 20px rgba(255,107,157,0.3); } 50% { box-shadow: 0 0 40px rgba(255,107,157,0.6); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
  @keyframes achSlide { from{transform:translateY(-80px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes charAppear { from{opacity:0;transform:translateX(30px) scale(0.95)} to{opacity:1;transform:translateX(0) scale(1)} }
  @keyframes typingDot { 0%,60%,100%{transform:translateY(0);opacity:0.3} 30%{transform:translateY(-6px);opacity:1} }
  @keyframes bgFade { from{opacity:0} to{opacity:1} }
  @keyframes stageIn { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
  @keyframes stageTitleIn { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes toastIn { from{transform:translateX(120%)} to{transform:translateX(0)} }

  /* 모바일 최적화 */
  html, body { height: 100%; }
  #root { height: 100%; }
  .game-root {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 게임 화면만 스크롤 막음 */
  }
  .chat-area {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    min-height: 0;
  }
  .input-area {
    flex-shrink: 0;
    padding-bottom: env(safe-area-inset-bottom, 12px); /* 아이폰 홈바 대응 */
  }
  .choice-btn {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    min-height: 40px;
  }
  input, button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  @media (max-width: 480px) {
    .char-img { height: 55vw !important; max-height: 280px !important; }
    .char-img-sub { height: 44vw !important; max-height: 220px !important; }
  }
`;

export default function App() {
  const [phase, setPhase]     = useState("loading");
  const [si, setSi]           = useState(0);
  const [stats, setStats]     = useState({말주변:18,외모:25,유머:12});
  const [partner, setPartner] = useState(PARTNERS[0]);
  const [hist, setHist]       = useState([]);
  const [ending, setEnding]   = useState(null);
  const [saved, setSaved]     = useState(null);
  const [achs, setAchs]       = useState({});
  const [toast, setToast]     = useState(null);
  const [muted, setMuted]     = useState(false);
  const [goCount, setGoCount] = useState(0);
  const [fStreak, setFStreak] = useState(0);
  const [friendStreak, setFriendStreak] = useState(0);
  const [played, setPlayed]   = useState(new Set());
  const [allGreat, setAllGreat] = useState(true);
  const [secretEndings, setSecretEndings] = useState(() =>
    JSON.parse(localStorage.getItem("junmo_secrets") || "[]")
  );
  const [resume, setResume]   = useState(() =>
    JSON.parse(localStorage.getItem("junmo_resume") || "[]")
  );

  useEffect(() => {
    (async () => {
      const [sv, ac] = await Promise.all([loadSave(), loadAch()]);
      setSaved(sv); setAchs(ac); setPhase("backstory");
    })();
  }, []);

  const unlock = useCallback(async id => {
    setAchs(prev => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: Date.now() };
      saveAch(next);
      const a = ACHS.find(a => a.id === id);
      if (a) setToast(a);
      return next;
    });
  }, []);

  const onStatChg = delta => setStats(p => ({
    말주변: Math.max(0, Math.min(100, p.말주변 + (delta.말주변 || 0))),
    외모:   Math.max(0, Math.min(100, p.외모   + (delta.외모   || 0))),
    유머:   Math.max(0, Math.min(100, p.유머   + (delta.유머   || 0))),
  }));

  const onSave = useCallback(d => { setSaved(d); saveSave(d); }, []);

  const unlockSecret = (id) => {
    setSecretEndings(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem("junmo_secrets", JSON.stringify(next));
      const se = SECRET_ENDINGS.find(s => s.id === id);
      if (se) setToast({ e: se.e, t: `🔓 ${se.t}`, d: "숨겨진 엔딩 해금!" });
      return next;
    });
  };

  const addResume = (entry) => {
    setResume(prev => {
      const next = [entry, ...prev].slice(0, 20);
      localStorage.setItem("junmo_resume", JSON.stringify(next));
      return next;
    });
  };

  const onEnd = (end, turns, loAff) => {
    setEnding(end);
    setHist(h => [...h, { s: STAGES[si].id, e: end.l }]);
    unlock("first_date");

    addResume({
      date: new Date().toLocaleDateString("ko-KR"),
      partner: partner.name,
      stage: si + 1,
      result: end.l,
      ok: end.next,
      turns,
    });

    if (end.next) {
      unlock("first_clear");
      if (si === 4) unlock("true_ending");
      if (end.l.includes("완벽") || end.l.includes("YES") || end.l.includes("이 사람")) {} else { setAllGreat(false); }
      if (allGreat && si === 4) { unlock("perfect_run"); unlockSecret("se_perfect"); }
      if (turns <= 10) { unlock("speedrun"); unlockSecret("se_speed"); }
      if (loAff <= 20) unlock("comeback");
      if (stats.말주변 <= 20) unlock("nerd_win");
      if (partner.id === "jieun") unlock("jieun_clear");
      if (partner.id === "sua") unlock("sua_clear");
      setPlayed(p => { const n = new Set(p).add(partner.id); if (n.size >= 3) unlock("all_partners"); return n; });
      setFStreak(0);
      setFriendStreak(f => {
        const isFriend = !end.next || end.l.includes("친구");
        const next = isFriend ? f + 1 : 0;
        if (next >= 3) unlockSecret("se_friend");
        return next;
      });
    } else {
      setGoCount(c => { const n = c + 1; if (n >= 5) unlock("masochist"); return n; });
      setFStreak(f => { const n = f + 1; if (n >= 3) unlock("fail_5"); return n; });
      if (si === 0 && end.l.includes("다시는")) unlockSecret("se_doom");
    }
    setPhase("ending");
  };

  const onNext = action => {
    if (action === "reset") { saveSave(null); setSaved(null); setPhase("backstory"); setSi(0); setHist([]); setEnding(null); setAllGreat(true); return; }
    if (action === "retry") { setPhase("game"); setEnding(null); return; }
    if (action === "next") {
      if (si + 1 >= STAGES.length) { saveSave(null); setSaved(null); setPhase("setup"); setSi(0); setHist([]); setEnding(null); }
      else { setSi(i => i + 1); setPhase("game"); setEnding(null); }
    }
  };

  const onMute = () => setMuted(m => { const n = !m; if (n) bgm.stop(); else { bgm.play("menu"); } return n; });
  const start  = (s, p, i, h) => { setStats(s); setPartner(p); setSi(i); setHist(h || []); setPhase("game"); };

  const isTestMode = new URLSearchParams(window.location.search).get("test") === "affbar";

  if (isTestMode) return <TestAffBar />;

  if (phase === "loading") return (
    <div style={{minHeight:"100dvh",background:"#050308",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,fontFamily:"'Noto Sans KR',sans-serif"}}>
      <div style={{fontSize:36,animation:"heartbeat 1.2s ease infinite"}}>🫠</div>
      <div style={{color:"rgba(255,255,255,0.2)",fontFamily:"monospace",fontSize:11,letterSpacing:4}}>LOADING...</div>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      {toast && <AchToast ach={toast} onClose={() => setToast(null)}/>}
      {phase === "backstory" && <BackstoryScreen onDone={() => setPhase("setup")} muted={muted} onMute={onMute}/>}
      {phase === "setup"     && <SetupScreen onStart={start} saved={saved} onClearSave={() => { saveSave(null); setSaved(null); }} achs={achs} muted={muted} onMute={onMute} resume={resume} secretEndings={secretEndings}/>}
      {phase === "game"      && <GameScreen stage={STAGES[si]} partner={partner} stats={stats} onStatChg={onStatChg} hist={hist} onEnd={onEnd} onSave={onSave} muted={muted} onMute={onMute}/>}
      {phase === "ending" && ending && <EndingScreen ending={ending} stage={STAGES[si]} partner={partner} stats={stats} onNext={onNext} muted={muted} onMute={onMute}/>}
    </>
  );
}
