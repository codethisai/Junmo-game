import { useEffect } from "react";

export default function AchToast({ ach, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, []);
  return (
    <div style={{position:"fixed",top:20,right:20,zIndex:9999,background:"rgba(10,8,20,0.95)",border:"1px solid rgba(255,215,0,0.3)",borderRadius:14,padding:"12px 18px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 32px rgba(0,0,0,0.6)",animation:"toastIn 0.4s cubic-bezier(.34,1.56,.64,1)",backdropFilter:"blur(20px)",maxWidth:280}}>
      <span style={{fontSize:26}}>{ach.e}</span>
      <div>
        <div style={{fontSize:9,color:"rgba(255,215,0,0.6)",letterSpacing:3,fontFamily:"monospace",marginBottom:2}}>ACHIEVEMENT</div>
        <div style={{fontSize:13,fontWeight:700,color:"#ffd700",fontFamily:"'Noto Sans KR',sans-serif"}}>{ach.t}</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:"'Noto Sans KR',sans-serif"}}>{ach.d}</div>
      </div>
    </div>
  );
}
