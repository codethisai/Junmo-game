import { render, screen } from "@testing-library/react";
import AffBar from "./AffBar";

describe("AffBar 호감도 바", () => {
  test("호감도 값을 /100 형식으로 표시", () => {
    render(<AffBar value={75} color="#ff6b9d" />);
    expect(screen.getByText("75/100")).toBeInTheDocument();
  });

  test("호감도 85 이상일 때 '완전 설렘' 라벨 표시", () => {
    render(<AffBar value={85} color="#ff6b9d" />);
    expect(screen.getByText("완전 설렘")).toBeInTheDocument();
  });

  test("호감도 70~84일 때 '관심있음' 라벨 표시", () => {
    render(<AffBar value={70} color="#ff6b9d" />);
    expect(screen.getByText("관심있음")).toBeInTheDocument();
  });

  test("호감도 45~69일 때 '중립' 라벨 표시", () => {
    render(<AffBar value={50} color="#ff6b9d" />);
    expect(screen.getByText("중립")).toBeInTheDocument();
  });

  test("호감도 25~44일 때 '별로' 라벨 표시", () => {
    render(<AffBar value={30} color="#ff6b9d" />);
    expect(screen.getByText("별로")).toBeInTheDocument();
  });

  test("호감도 25 미만일 때 '최악' 라벨 표시", () => {
    render(<AffBar value={10} color="#ff6b9d" />);
    expect(screen.getByText("최악")).toBeInTheDocument();
  });

  test("호감도 85 이상일 때 pulseGlow 애니메이션 적용", () => {
    const { container } = render(<AffBar value={90} color="#ff6b9d" />);
    const bar = container.querySelector("div[style*='animation']");
    expect(bar).toHaveStyle("animation: pulseGlow 1.5s ease-in-out infinite");
  });

  test("파트너 색상이 적용됨", () => {
    const { container } = render(<AffBar value={75} color="#4A90E2" />);
    const bar = container.querySelector("div[style*='background']");
    expect(bar).toHaveStyle("background: linear-gradient(90deg, #4A90E2cc, #4A90E2ff)");
  });

  test("호감도 바 높이가 8px", () => {
    const { container } = render(<AffBar value={50} color="#ff6b9d" />);
    const barContainer = container.querySelector("div[style*='height: 8']");
    expect(barContainer).toHaveStyle("height: 8px");
  });

  test("0 호감도 처리", () => {
    render(<AffBar value={0} color="#ff6b9d" />);
    expect(screen.getByText("0/100")).toBeInTheDocument();
    expect(screen.getByText("최악")).toBeInTheDocument();
  });

  test("100 호감도 처리", () => {
    render(<AffBar value={100} color="#ff6b9d" />);
    expect(screen.getByText("100/100")).toBeInTheDocument();
    expect(screen.getByText("완전 설렘")).toBeInTheDocument();
  });
});
