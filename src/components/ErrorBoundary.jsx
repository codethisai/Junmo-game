import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[준모게임 오류]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100dvh", background: "#050308", display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "'Noto Sans KR', sans-serif", padding: 24, textAlign: "center"
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🫠</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>
            잠깐, 뭔가 잘못됐어요
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28, lineHeight: 1.6 }}>
            예상치 못한 오류가 발생했어요.<br />
            새로고침하면 대부분 해결돼요.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 28px", background: "rgba(255,107,157,0.15)",
              border: "1px solid rgba(255,107,157,0.3)", borderRadius: 12,
              color: "#ff6b9d", fontSize: 14, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif"
            }}
          >
            새로고침
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
