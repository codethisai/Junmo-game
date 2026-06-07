import { useState } from "react";
import AffBar from "../components/AffBar.jsx";

const PARTNERS = [
  { id: 1, name: "유정", color: "#FF4B72", emoji: "👩" },
  { id: 2, name: "지은", color: "#4A90E2", emoji: "👱" },
  { id: 3, name: "민지", color: "#9B59B6", emoji: "👸" }
];

export default function TestAffBar() {
  const [affValue, setAffValue] = useState(75);
  const [selectedPartner, setSelectedPartner] = useState(PARTNERS[0]);

  const testCases = [
    { label: "완전 설렘 (85+)", value: 90 },
    { label: "관심있음 (70-84)", value: 75 },
    { label: "중립 (45-69)", value: 50 },
    { label: "별로 (25-44)", value: 30 },
    { label: "최악 (<25)", value: 10 },
    { label: "최소값 (0)", value: 0 },
    { label: "최대값 (100)", value: 100 }
  ];

  return (
    <div style={{
      background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Noto Sans KR', sans-serif"
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* 제목 */}
        <h1 style={{ color: "rgba(255,255,255,0.9)", marginBottom: 30, textAlign: "center", fontSize: 28 }}>
          🧪 호감도 바 테스트
        </h1>

        {/* 파트너 선택 */}
        <div style={{ marginBottom: 30, background: "rgba(255,255,255,0.05)", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, display: "block", marginBottom: 12 }}>
            📌 파트너 선택
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {PARTNERS.map(p => (
              <button key={p.id} onClick={() => setSelectedPartner(p)}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  background: selectedPartner.id === p.id ? `${p.color}33` : "rgba(255,255,255,0.04)",
                  border: `2px solid ${selectedPartner.id === p.id ? p.color : "rgba(255,255,255,0.2)"}`,
                  borderRadius: 8,
                  color: selectedPartner.id === p.id ? p.color : "rgba(255,255,255,0.6)",
                  fontWeight: selectedPartner.id === p.id ? 700 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontSize: 12
                }}>
                {p.emoji} {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 슬라이더 */}
        <div style={{ marginBottom: 30, background: "rgba(255,255,255,0.05)", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, display: "block", marginBottom: 12 }}>
            🎚️ 호감도 슬라이더
          </label>
          <input type="range" min="0" max="100" value={affValue} onChange={e => setAffValue(parseInt(e.target.value))}
            style={{
              width: "100%",
              height: 6,
              borderRadius: 3,
              background: `linear-gradient(to right, ${selectedPartner.color}33 0%, ${selectedPartner.color} ${affValue}%, rgba(255,255,255,0.1) ${affValue}%, rgba(255,255,255,0.1) 100%)`,
              outline: "none",
              cursor: "pointer"
            }}/>
          <div style={{ marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 700, color: selectedPartner.color }}>
            현재 호감도: {affValue}
          </div>
        </div>

        {/* 현재 호감도 바 */}
        <div style={{ marginBottom: 30, background: "rgba(255,255,255,0.05)", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, display: "block", marginBottom: 12 }}>
            📊 현재 호감도 바
          </label>
          <div style={{ padding: 16, background: "rgba(0,0,0,0.3)", borderRadius: 10 }}>
            <AffBar value={affValue} color={selectedPartner.color} />
          </div>
        </div>

        {/* 테스트 케이스 */}
        <div style={{ background: "rgba(255,255,255,0.05)", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, display: "block", marginBottom: 12 }}>
            ✅ 테스트 케이스
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {testCases.map((tc, i) => (
              <button key={i} onClick={() => setAffValue(tc.value)}
                style={{
                  padding: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.04)"}>
                <span>{tc.label}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>→ {tc.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 검사 항목 */}
        <div style={{ marginTop: 30, padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
          <div style={{ marginBottom: 10, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>🔍 검사 항목</div>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>✓ 호감도 값이 "/100" 형식으로 표시되는가?</li>
            <li>✓ 호감도에 따라 라벨이 올바르게 변경되는가? (완전 설렘/관심있음/중립/별로/최악)</li>
            <li>✓ 호감도 85 이상일 때 반짝이는 애니메이션이 작동하는가?</li>
            <li>✓ 호감도 바의 높이가 충분히 보이는가? (8px)</li>
            <li>✓ 파트너 색상이 제대로 적용되는가?</li>
            <li>✓ 숫자와 라벨의 색상이 호감도 바와 일치하는가?</li>
            <li>✓ 모바일에서도 잘 보이는가?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
