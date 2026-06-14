// 스크립트 인덱스 — (partnerId, stageId) → 대사 데이터
import { YUJUNG_S1 } from "./script_yujung_s1.js";
import { YUJUNG_S2 } from "./script_yujung_s2.js";
import { YUJUNG_S3 } from "./script_yujung_s3.js";
import { YUJUNG_S4 } from "./script_yujung_s4.js";
import { YUJUNG_S5 } from "./script_yujung_s5.js";
import { JIEUN_S1 } from "./script_jieun_s1.js";
import { JIEUN_S2 } from "./script_jieun_s2.js";
import { JIEUN_S3 } from "./script_jieun_s3.js";
import { JIEUN_S4 } from "./script_jieun_s4.js";
import { JIEUN_S5 } from "./script_jieun_s5.js";
import { SUA_S1 } from "./script_sua_s1.js";
import { SUA_S2 } from "./script_sua_s2.js";
import { SUA_S3 } from "./script_sua_s3.js";
import { SUA_S4 } from "./script_sua_s4.js";
import { SUA_S5 } from "./script_sua_s5.js";

const SCRIPTS = {
  yumi:  { 1: YUJUNG_S1, 2: YUJUNG_S2, 3: YUJUNG_S3, 4: YUJUNG_S4, 5: YUJUNG_S5 },
  jieun: { 1: JIEUN_S1, 2: JIEUN_S2, 3: JIEUN_S3, 4: JIEUN_S4, 5: JIEUN_S5 },
  sua:   { 1: SUA_S1, 2: SUA_S2, 3: SUA_S3, 4: SUA_S4, 5: SUA_S5 },
};

export const getScript = (partnerId, stageId) => {
  return SCRIPTS[partnerId]?.[stageId] || null;
};
