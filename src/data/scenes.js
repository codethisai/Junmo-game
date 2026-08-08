/**
 * 게임 씬별 배경 + 캐릭터 이미지 정의
 * 각 씬은 배경과 캐릭터 표정을 독립적으로 관리
 */

export const SCENES = {
  S1_CAFE: {
    name: "연남동 카페",
    bg: "/assets/backgrounds/cafe_yeonnam.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_cafe.webp",
      yujung_neutral: "/assets/characters/yujung_neutral_cafe.webp",
      yujung_bored: "/assets/characters/yujung_bored_cafe.webp",
    },
  },

  S2_HANGANG_DAY: {
    name: "한강공원 (낮)",
    bg: "/assets/backgrounds/hangang_day.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_denim.webp",
      yujung_neutral: "/assets/characters/yujung_neutral_denim.webp",
      yujung_bored: "/assets/characters/yujung_bored_denim.webp",
    },
  },

  S2_HANGANG_NIGHT: {
    name: "한강공원 (밤)",
    bg: "/assets/backgrounds/hangang_night.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_denim.webp",
      yujung_neutral: "/assets/characters/yujung_neutral_denim.webp",
      yujung_bored: "/assets/characters/yujung_bored_denim.webp",
    },
  },

  S3_MOVIE: {
    name: "이자카야 (저녁)",
    bg: "/assets/backgrounds/cgv_izakaya.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_dress.webp",
      yujung_neutral: "/assets/characters/yujung_neutral_dress.webp",
      yujung_bored: "/assets/characters/yujung_neutral_dress.webp",
    },
  },

  S3_IZAKAYA: {
    name: "이자카야 (저녁)",
    bg: "/assets/backgrounds/cgv_izakaya.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_dress.webp",
      yujung_neutral: "/assets/characters/yujung_neutral_dress.webp",
      yujung_bored: "/assets/characters/yujung_bored_dress.webp",
    },
  },

  S4_APARTMENT_DAY: {
    name: "유정 아파트 (낮)",
    bg: "/assets/backgrounds/apartment_day.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_ponytail.webp",
      yujung_neutral: "/assets/characters/yujung_neutral_ponytail.webp",
      yujung_bored: "/assets/characters/yujung_sad_ponytail.webp",
    },
  },

  S4_APARTMENT_NIGHT: {
    name: "유정 아파트 (밤)",
    bg: "/assets/backgrounds/apartment_night.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_ponytail.webp",
      yujung_neutral: "/assets/characters/yujung_neutral_ponytail.webp",
      yujung_bored: "/assets/characters/yujung_sad_ponytail.webp",
    },
  },

  S4_APARTMENT_ENTRANCE: {
    name: "유정 아파트 입구 (밤)",
    bg: "/assets/backgrounds/apartment_entrance_night.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_ponytail.webp",
      yujung_neutral: "/assets/characters/yujung_neutral_ponytail.webp",
      yujung_bored: "/assets/characters/yujung_sad_ponytail.webp",
    },
  },

  S5_ROOFTOP_DINING: {
    name: "한남동 루프탑 (식사)",
    bg: "/assets/backgrounds/rooftop_restaurant_dining.webp",
    characters: {
      // 호감도 슬롯 정합: smile/neutral/bored (2026-06-30 유정 S5 키 교정)
      yujung_smile:   "/assets/characters/yujung_smile_shorthair_dress.webp",
      yujung_neutral: "/assets/characters/yujung_surprised_shorthair_dress.webp",
      yujung_bored:   "/assets/characters/yujung_emotional_shorthair_dress.webp",
    },
  },

  S5_ROOFTOP_BAR: {
    name: "한남동 루프탑 (바)",
    bg: "/assets/backgrounds/rooftop_bar.webp",
    characters: {
      // 호감도 슬롯 정합: smile/neutral/bored (2026-06-30 유정 S5 키 교정)
      yujung_smile:   "/assets/characters/yujung_smile_shorthair_dress.webp",
      yujung_neutral: "/assets/characters/yujung_surprised_shorthair_dress.webp",
      yujung_bored:   "/assets/characters/yujung_emotional_shorthair_dress.webp",
    },
  },

  S5_ROOFTOP_TERRACE: {
    name: "한남동 루프탑 테라스 (프로포즈)",
    bg: "/assets/backgrounds/rooftop_terrace.webp",
    characters: {
      // 호감도 슬롯 정합: smile/neutral/bored (2026-06-30 유정 S5 키 교정)
      yujung_smile:   "/assets/characters/yujung_smile_shorthair_dress.webp",
      yujung_neutral: "/assets/characters/yujung_surprised_shorthair_dress.webp",
      yujung_bored:   "/assets/characters/yujung_emotional_shorthair_dress.webp",
    },
  },

  // 수아 (이수아) - Stage 1~5
  SUA_S1_CAFE: {
    name: "연남동 카페 (as usual)",
    bg: "/assets/backgrounds/sua_s1_cafe.webp",
    characters: {
      // 고양이 머리띠+블론드: 첫 만남 수아 (표정 2종은 추후 도입, 현재 1장 공용)
      sua_smile:   "/assets/characters/sua_smile_cafe.webp",
      sua_neutral: "/assets/characters/sua_smile_cafe.webp",
      sua_bored:   "/assets/characters/sua_smile_cafe.webp",
    },
  },

  SUA_S2_STUDIO: {
    name: "촬영 스튜디오 (오후)",
    bg: "/assets/backgrounds/sua_s2_studio.webp",
    characters: {
      // 가죽자켓+고양이귀+올림머리: 자기 영역(스튜디오)의 자신감, 표정 3종 (2026-06-28 누끼 적용)
      sua_smile:   "/assets/characters/sua_smile_studio.webp",
      sua_neutral: "/assets/characters/sua_neutral_studio.webp",
      sua_bored:   "/assets/characters/sua_bored_studio.webp",
    },
  },

  SUA_S3_HOME: {
    name: "이수아의 집 (밤)",
    bg: "/assets/backgrounds/sua_s3_home_night.webp",
    characters: {
      // 회색 후디: 가면 벗은 사적인 수아 (호감도별 표정 3종)
      sua_smile:   "/assets/characters/sua_smile_home.webp",
      sua_neutral: "/assets/characters/sua_neutral_home.webp",
      sua_bored:   "/assets/characters/sua_bored_home.webp",
    },
  },

  SUA_S4_GRANDMA: {
    name: "준모의 할머니 집 (오후)",
    bg: "/assets/backgrounds/sua_s4_grandma_hanok.webp",
    characters: {
      // 할머니 집 인사: 보라 머리띠+아가일 베스트 (호감도별 표정 3종)
      sua_smile:   "/assets/characters/sua_smile_grandma.webp",
      sua_neutral: "/assets/characters/sua_neutral_grandma.webp",
      sua_bored:   "/assets/characters/sua_bored_grandma.webp",
    },
  },

  SUA_S5_NAMSAN_FINALE: {
    name: "남산 케이블카 (파이널 야경)",
    bg: "/assets/backgrounds/sua_s5_cablecar_finale.webp",
    characters: {
      // 케이블카 야경: 올림머리+흰 셔츠, 호감도별 표정 3종 (2026-06-28 누끼 적용)
      sua_smile:   "/assets/characters/sua_smile_finale.webp",
      sua_neutral: "/assets/characters/sua_shy_finale.webp",
      sua_bored:   "/assets/characters/sua_teary_finale.webp",
    },
  },

  // ===== 박지은 루트 (전용 배경+캐릭터) =====
  JIEUN_S1_BOOKCAFE: {
    name: "연희동 북카페 (오후)",
    bg: "/assets/backgrounds/jieun_s1_bookcafe.webp",
    characters: {
      // 긴 흑발+네이비 골지 니트: 차분한 문학소녀 (호감도별 표정 3종, smile2 예비)
      jieun_smile:   "/assets/characters/jieun_smile_s1.webp",
      jieun_neutral: "/assets/characters/jieun_neutral_s1.webp",
      jieun_bored:   "/assets/characters/jieun_bored_s1.webp",
    },
  },

  JIEUN_S2_FOREST: {
    name: "경의선숲길 (늦가을 오후)",
    bg: "/assets/backgrounds/jieun_s2_forest_path.webp",
    characters: {
      // 베이지 가디건+화이트 셔츠: 풀린·사려깊은 (호감도별 표정 3종)
      jieun_smile:   "/assets/characters/jieun_smile_s2.webp",
      jieun_neutral: "/assets/characters/jieun_neutral_s2.webp",
      jieun_bored:   "/assets/characters/jieun_bored_s2.webp",
    },
  },

  JIEUN_S3_LIBRARY: {
    name: "연세대 중앙도서관 (홈그라운드)",
    bg: "/assets/backgrounds/jieun_s3_library.webp",
    characters: {
      // 다크코트+네이비 터틀넥: 홈그라운드에서 생기 도는 (호감도별 표정 3종, smile=몰입)
      jieun_smile:   "/assets/characters/jieun_smile_s3.webp",
      jieun_neutral: "/assets/characters/jieun_neutral_s3.webp",
      jieun_bored:   "/assets/characters/jieun_bored_s3.webp",
    },
  },

  JIEUN_S4_JEONGDOK: {
    name: "정독도서관 (비 오는 오후)",
    bg: "/assets/backgrounds/jieun_s4_jeongdok.webp",
    characters: {
      // 슬릭 로우번+차콜 터틀넥: 흔들림·읽히는 자의 공포 (호감도별 표정 3종)
      // 간파/무너짐 CG는 jieun_s4_caught_cg / caught2_cg (씬엔 미연결, 이벤트 연출용 보관)
      jieun_smile:   "/assets/characters/jieun_smile_s4.webp",
      jieun_neutral: "/assets/characters/jieun_neutral_s4.webp",
      jieun_bored:   "/assets/characters/jieun_bored_s4.webp",
    },
  },

  JIEUN_S5_SEOKCHON: {
    name: "석촌호수 벚꽃 (골든아워)",
    bg: "/assets/backgrounds/jieun_s5_seokchon_cherry.webp",
    characters: {
      // 반묶음+벚꽃잎+연핑크 플로럴 원피스: 수줍은 설렘, 호감도별 표정 3종 (2026-06-28 누끼 적용)
      jieun_smile:   "/assets/characters/jieun_smile_s5.webp",
      jieun_neutral: "/assets/characters/jieun_neutral_s5.webp",
      jieun_bored:   "/assets/characters/jieun_bored_s5.webp",
    },
  },

  // === 재작성 루트 신규 자리 (2026-08-06) — 그림 첨부 대기 ===
  // 그림 없을 동안은 아래 placeholder(기존 지은 이미지)로 폴백 → 안 깨짐.
  // 실제 그림 오면 이 경로에 파일만 떨어뜨리면 자동 반영.
  JIEUN_S4_HOME: {
    name: "지은 자취방 (첫눈, 원정 간병)",
    // ⬇️ 그림 오면 이 경로만 jieun_s4_home.webp 로 바꾸면 됨. (지금은 빈화면 방지용 기존 배경)
    bg: "/assets/backgrounds/jieun_s4_jeongdok.webp",
    characters: {
      // TODO 첨부: 헝클어진 머리·맨투맨 환자 몰골 지은 (smile=열내린안도 / neutral=앓는중 / bored=차단)
      // placeholder = 기존 S4 지은(차콜 터틀넥) — 그림 오기 전까지 안 깨지게
      jieun_smile:   "/assets/characters/jieun_smile_s4.webp",
      jieun_neutral: "/assets/characters/jieun_neutral_s4.webp",
      jieun_bored:   "/assets/characters/jieun_bored_s4.webp",
    },
  },

  JIEUN_S5_LOTTE: {
    name: "잠실 롯데월드 (교복 데이트)",
    bg: "/assets/backgrounds/jieun_s5_lotteworld.webp",
    characters: {
      // 교복 지은 (노란 머리띠·후드) — 2026-08-08 적용. smile=V사인/neutral=별머리띠미소/bored=손괴고한숨
      jieun_smile:   "/assets/characters/jieun_smile_uniform.webp",
      jieun_neutral: "/assets/characters/jieun_neutral_uniform.webp",
      jieun_bored:   "/assets/characters/jieun_bored_uniform.webp",
    },
  },
};

/**
 * 게임에서 사용 예:
 * const scene = SCENES.S2_HANGANG_DAY;
 * <div style={{ backgroundImage: `url(${scene.bg})` }}>
 *   <img src={scene.characters.yujung_smile} alt="유정" />
 * </div>
 */
