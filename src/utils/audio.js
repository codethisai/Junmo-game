/* ═══ BGM (오디오 파일 재생 + 신스 폴백) ═══ */
// 일단 전 게임 공용 한 곡. 슬롯별 곡 생기면 TRACKS에 추가하면 그게 우선.
const DEFAULT_TRACK = "/assets/audio/menu.mp3";
const TRACKS = {
  // 예: cafe: "/assets/audio/cafe.mp3", ending: "/assets/audio/ending.mp3"
};
const FILE_VOLUME = 0.35;

export class BGMPlayer {
  constructor() { this._ctx = null; this._gain = null; this._sources = []; this._timer = null; this._running = false; this._audio = null; this._audioUrl = null; }
  _getCtx() {
    if (!this._ctx || this._ctx.state === "closed") {
      try { this._ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
    }
    return this._ctx;
  }
  stop() {
    this._running = false;
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    this._sources.forEach(s => { try { s.stop(0); } catch {} });
    this._sources = [];
    if (this._audio) { try { this._audio.pause(); } catch {} this._audio = null; this._audioUrl = null; }
  }
  play(type) {
    // 1) 파일 재생 (슬롯 전용 곡 없으면 공용 한 곡)
    const url = TRACKS[type] || DEFAULT_TRACK;
    if (url) {
      // 같은 곡이 이미 재생 중이면 그대로 유지 (화면 전환에도 끊김 없이)
      if (this._audio && this._audioUrl === url) {
        if (this._audio.paused) this._audio.play().catch(() => {});
        return;
      }
      this.stop();
      try {
        const a = new Audio(url);
        a.loop = true; a.volume = FILE_VOLUME;
        a.play().catch(() => {}); // 자동재생 차단 시 무시 (사용자 제스처 후 재생)
        this._audio = a; this._audioUrl = url;
        return;
      } catch {}
    }
    // 2) 폴백: 신스 생성
    this.stop();
    const ctx = this._getCtx();
    if (!ctx) return;
    const master = ctx.createGain(); master.gain.value = 0.05; master.connect(ctx.destination);
    const SCALES = { menu:[261,330,392,523], cafe:[330,415,494,554], success:[392,523,659,784], fail:[220,174,146,110], ending:[523,659,784,1046] };
    const PATS   = { menu:[0,2,1,3,0,2,3,1,2,0,3,1], cafe:[0,1,2,3,2,1,0,3,1,2,3,0], success:[0,3,2,3,1,2,3,2,0,2,3,1], fail:[3,2,1,0,1,2,3,2,1,0,2,3], ending:[0,2,3,2,3,1,3,2,1,3,2,0] };
    const scale = SCALES[type] || SCALES.menu, pat = PATS[type] || PATS.menu;
    const bpm = type === "fail" ? 0.55 : 0.34;
    const playOnce = (startAt) => {
      pat.forEach((ni, i) => {
        const osc = ctx.createOscillator(); const env = ctx.createGain();
        osc.type = type === "ending" ? "sine" : type === "fail" ? "sawtooth" : "triangle";
        osc.frequency.value = scale[ni % scale.length];
        osc.connect(env); env.connect(master);
        const s = startAt + i * bpm, d = bpm * 0.65;
        env.gain.setValueAtTime(0, s); env.gain.linearRampToValueAtTime(1, s + 0.03); env.gain.exponentialRampToValueAtTime(0.001, s + d);
        osc.start(s); osc.stop(s + d);
        this._sources.push(osc);
      });
    };
    this._running = true;
    const loop = (t) => { if (!this._running) return; playOnce(t); this._timer = setTimeout(() => loop(ctx.currentTime), pat.length * bpm * 1000 - 80); };
    loop(ctx.currentTime);
  }
}

export const bgm = new BGMPlayer();
