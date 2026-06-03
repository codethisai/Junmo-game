export default function StatChip({ icon, label, value, color, delta }) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,minWidth:60}}>
      <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontFamily:"monospace",letterSpacing:1}}>{icon} {label}</div>
      <div style={{height:3,width:48,background:"rgba(255,255,255,0.1)",borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${value}%`,background:color,borderRadius:3,transition:"width 0.6s ease"}}/>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:3}}>
        <span style={{fontSize:10,color:"rgba(255,255,255,0.7)",fontFamily:"monospace"}}>{value}</span>
        {delta !== 0 && <span style={{fontSize:9,color:delta>0?"#39ff14":"#ff4444",fontFamily:"monospace"}}>{delta>0?`+${delta}`:delta}</span>}
      </div>
    </div>
  );
}
