export default function MuteBtn({ muted, onToggle }) {
  return (
    <button onClick={onToggle} style={{position:"fixed",top:16,right:16,zIndex:9000,background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:20,padding:"6px 14px",color:"rgba(255,255,255,0.6)",fontSize:11,cursor:"pointer",fontFamily:"monospace",backdropFilter:"blur(10px)",transition:"all 0.2s"}}
      onMouseEnter={e=>{e.target.style.borderColor="rgba(255,255,255,0.4)";e.target.style.color="white";}}
      onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,0.15)";e.target.style.color="rgba(255,255,255,0.6)";}}>
      {muted?"🔇":"🎵"}
    </button>
  );
}
