export default function AffBar({ value, color }) {
  const getLabel = () => {
    if (value >= 85) return "완전 설렘";
    if (value >= 70) return "관심있음";
    if (value >= 45) return "중립";
    if (value >= 25) return "별로";
    return "최악";
  };

  const barColor = color || (value >= 70 ? "#ff6b9d" : value >= 45 ? "#ffd93d" : value >= 25 ? "#888" : "#ff3333");
  const label = getLabel();
  const pulseColor = color ? `${color}44` : `${barColor}44`;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* 라벨 */}
      <span style={{
        fontSize: 11,
        color: barColor,
        fontWeight: 600,
        whiteSpace: "nowrap",
        fontFamily: "'Noto Sans KR',sans-serif",
        minWidth: 50
      }}>
        {label}
      </span>

      {/* 호감도 바 */}
      <div style={{
        flex: 1,
        height: 8,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: `inset 0 1px 2px rgba(0,0,0,0.3)`
      }}>
        <div style={{
          height: "100%",
          width: `${value}%`,
          background: `linear-gradient(90deg, ${barColor}cc, ${barColor}ff)`,
          borderRadius: 6,
          transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
          boxShadow: `0 0 12px ${pulseColor}, inset 0 1px 1px rgba(255,255,255,0.2)`,
          animation: value >= 85 ? "pulseGlow 1.5s ease-in-out infinite" : "none"
        }} />
      </div>

      {/* 숫자 표시 */}
      <span style={{
        fontSize: 12,
        fontWeight: 700,
        color: barColor,
        fontFamily: "monospace",
        minWidth: 45,
        textAlign: "right"
      }}>
        {value}/100
      </span>
    </div>
  );
}
