const SK = "mts-vn-v1", AK = "mts-ach-v1";
const sp = (v, f) => { try { return JSON.parse(v); } catch { return f; } };
export const loadSave = async () => { try { const r = await window.storage.get(SK); return r ? sp(r.value, null) : null; } catch { return null; } };
export const saveSave = async d => { try { await window.storage.set(SK, JSON.stringify(d)); } catch {} };
export const loadAch  = async () => { try { const r = await window.storage.get(AK); return r ? sp(r.value, {}) : {}; } catch { return {}; } };
export const saveAch  = async d => { try { await window.storage.set(AK, JSON.stringify(d)); } catch {} };
