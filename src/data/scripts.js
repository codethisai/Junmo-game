// 스크립트 인덱스 — (partnerId, stageId) → 대사 데이터
import { YUJUNG_S1 } from "./script_yujung_s1.js";
import { JIEUN_S1 } from "./script_jieun_s1.js";
import { SUA_S1 } from "./script_sua_s1.js";

const SCRIPTS = {
  yumi:  { 1: YUJUNG_S1 },
  jieun: { 1: JIEUN_S1 },
  sua:   { 1: SUA_S1 },
};

export const getScript = (partnerId, stageId) => {
  return SCRIPTS[partnerId]?.[stageId] || null;
};
