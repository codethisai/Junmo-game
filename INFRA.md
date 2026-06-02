# 서버 인프라 가이드

> 개발 환경 서버 설정 및 마이그레이션 가이드 (최종 업데이트: 2026-06-02)

---

## 현재 서버 상태

| 항목 | 내용 |
|------|------|
| 클라우드 | GCP (Google Cloud Platform) |
| 머신 타입 | e2-micro |
| IP | 34.24.147.240 |
| vCPU | 2 (공유) |
| RAM | 1GB |
| 스왑 | 4GB (`/swapfile`) |
| 디스크 | 30GB |
| OS | Ubuntu |

**현재 한계:** e2-micro는 CPU가 공유 코어라 code-server 접속 시 CPU 90% 도달. 스왑으로 RAM은 보완했으나 CPU 병목 해결 안 됨.

---

## code-server 설정

- **버전**: 4.122.1
- **접속 주소**: `https://34.24.147.240:8080`
- **포트**: 8080
- **인증**: 비밀번호
- **HTTPS**: 자체 서명 인증서 (cert: true)
- **설정 파일**: `/home/qjary2003/.config/code-server/config.yaml`

```yaml
bind-addr: 0.0.0.0:8080
auth: password
password: (비밀번호)
cert: true
```

### code-server 명령어

```bash
# 상태 확인
systemctl status code-server@qjary2003

# 재시작
sudo systemctl restart code-server@qjary2003

# 로그 확인
journalctl -u code-server@qjary2003 -f
```

---

## 스왑 설정

```bash
# 스왑 확인
free -h

# 스왑 재설정 (서버 초기화 시)
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 마이그레이션 계획: Oracle Cloud Free Tier

### 이유
- Oracle Cloud 무료 티어: **4 OCPU + 24GB RAM** (영구 무료)
- 현재 GCP e2-micro 대비 RAM 24배, CPU 성능 대폭 향상
- 비용 0원

### Oracle VM 생성 설정

| 항목 | 값 |
|------|----|
| Shape | `VM.Standard.A1.Flex` (ARM, 무료) |
| OCPU | 4 |
| RAM | 24GB |
| OS | Ubuntu 22.04 |
| 부팅 디스크 | 50GB |

> **가입 팁**: 국가를 **United States**로 선택해야 가입 거절이 적음

### Oracle 방화벽 설정 (중요! GCP와 다름)

Oracle은 두 곳 모두 열어야 함:

1. **OCI 콘솔** → VCN → Security List → Ingress Rules → TCP 8080 추가
2. **서버 내부 iptables**:
```bash
sudo iptables -I INPUT -p tcp --dport 8080 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

---

## 새 서버 초기 세팅 (마이그레이션 체크리스트)

```bash
# 1. 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# 2. code-server 설치
curl -fsSL https://code-server.dev/install.sh | sh
sudo systemctl enable --now code-server@$USER

# 3. code-server 설정
mkdir -p ~/.config/code-server
cat > ~/.config/code-server/config.yaml << EOF
bind-addr: 0.0.0.0:8080
auth: password
password: (비밀번호 설정)
cert: true
EOF
sudo systemctl restart code-server@$USER

# 4. 스왑 4GB 설정
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 5. Node.js 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 6. GitHub CLI 설치
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update && sudo apt install gh -y

# 7. 프로젝트 클론
mkdir -p ~/projects && cd ~/projects
git clone https://github.com/codethisai/Junmo-game.git
cd Junmo-game && npm install
```

---

## GCP 방화벽 (현재 서버)

- GCP 콘솔 → VPC 네트워크 → 방화벽 규칙
- TCP 8080 포트 오픈됨

---

## 문제 해결

### code-server 접속 시 느릴 때
```bash
# CPU/메모리 상태 확인
htop

# 메모리 확인
free -h

# Ops Agent 비활성화 (RAM 100MB 절약)
sudo systemctl stop google-cloud-ops-agent
sudo systemctl disable google-cloud-ops-agent
```

### 복사/붙여넣기 안 될 때
- **원인**: HTTP 접속 시 브라우저 클립보드 API 차단
- **해결**: `https://`로 접속 (cert: true 설정 필요)
- 브라우저 경고 → 고급 → 계속 진행 클릭
