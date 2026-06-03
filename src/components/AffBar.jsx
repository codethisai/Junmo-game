export default function AffBar({ value, color }) {
  const label = value>=85?"💕 완전 설렘":value>=70?"👀 관심있음":value>=45?"😐 중립":value>=25?"❄️ 별로":"💀 최악";
  const barColor = value>=70?"#ff6b9d":value>=45?"#ffd93d":value>=25?"#888":"#ff3333";
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",whiteSpace:"nowrap",fontFamily:"'Noto Sans KR',sans-serif"}}>{label}</span>
      <div style={{flex:1,height:4,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${value}%`,background:`linear-gradient(90deg,${barColor}88,${barColor})`,borderRadius:4,transition:"width 0.8s cubic-bezier(.4,0,.2,1)"}}/>
      </div>
      <span style={{fontSize:12,fontWeight:700,color:barColor,fontFamily:"monospace",minWidth:32,textAlign:"right"}}>{value}</span>
    </div>
  );
}
