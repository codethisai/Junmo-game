/* ═══ BGM (메모리 누수 수정) ═══ */
export class BGMPlayer {
  constructor() { this._ctx = null; this._gain = null; this._sources = []; this._timer = null; this._running = false; }
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
  }
  play(type) {
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
