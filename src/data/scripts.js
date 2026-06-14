// 스크립트 인덱스 — (partnerId, stageId) → 대사 데이터
// TODO: script 파일들 구문 오류 수정 후 import 복원
// import { YUJUNG_S1 } from "./script_yujung_s1.js";
// import { YUJUNG_S2 } from "./script_yujung_s2.js";
// import { YUJUNG_S3 } from "./script_yujung_s3.js";
// import { YUJUNG_S4 } from "./script_yujung_s4.js";
// import { YUJUNG_S5 } from "./script_yujung_s5.js";
// import { JIEUN_S1 } from "./script_jieun_s1.js";
// import { JIEUN_S2 } from "./script_jieun_s2.js";
// import { JIEUN_S3 } from "./script_jieun_s3.js";
// import { JIEUN_S4 } from "./script_jieun_s4.js";
// import { JIEUN_S5 } from "./script_jieun_s5.js";
// import { SUA_S1 } from "./script_sua_s1.js";
// import { SUA_S2 } from "./script_sua_s2.js";
// import { SUA_S3 } from "./script_sua_s3.js";
// import { SUA_S4 } from "./script_sua_s4.js";
// import { SUA_S5 } from "./script_sua_s5.js";

const SCRIPTS = {
  yumi:  { 1: null, 2: null, 3: null, 4: null, 5: null },
  jieun: { 1: null, 2: null, 3: null, 4: null, 5: null },
  sua:   { 1: null, 2: null, 3: null, 4: null, 5: null },
};

export const getScript = (partnerId, stageId) => {
  return SCRIPTS[partnerId]?.[stageId] || null;
};
