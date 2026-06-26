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
      yujung_smile: "/assets/characters/yujung_smile_shorthair_dress.webp",
      yujung_surprised: "/assets/characters/yujung_surprised_shorthair_dress.webp",
      yujung_emotional: "/assets/characters/yujung_emotional_shorthair_dress.webp",
    },
  },

  S5_ROOFTOP_BAR: {
    name: "한남동 루프탑 (바)",
    bg: "/assets/backgrounds/rooftop_bar.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_shorthair_dress.webp",
      yujung_surprised: "/assets/characters/yujung_surprised_shorthair_dress.webp",
    },
  },

  S5_ROOFTOP_TERRACE: {
    name: "한남동 루프탑 테라스 (프로포즈)",
    bg: "/assets/backgrounds/rooftop_terrace.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_shorthair_dress.webp",
      yujung_emotional: "/assets/characters/yujung_emotional_shorthair_dress.webp",
      yujung_surprised: "/assets/characters/yujung_surprised_shorthair_dress.webp",
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
      // 가죽자켓+고양이귀+올림머리: 자기 영역(스튜디오)의 자신감 있는 수아
      sua_smile:   "/assets/characters/sua_smile_studio.webp",
      sua_neutral: "/assets/characters/sua_smile_studio.webp",
      sua_bored:   "/assets/characters/sua_smile_studio.webp",
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

  SUA_S4_BURNOUT: {
    name: "수아 방 (번아웃 밤)",
    bg: "/assets/backgrounds/sua_s4_burnout_night.webp",
    characters: {
      // 후디+고양이 머리띠: 가면 벗은 '그냥 이수아' (편안한 표정)
      sua_smile:   "/assets/characters/sua_smile_hoodie.webp",
      sua_neutral: "/assets/characters/sua_smile_hoodie.webp",
      sua_bored:   "/assets/characters/sua_smile_hoodie.webp",
    },
  },

  SUA_S5_WINDOW_NIGHT: {
    name: "남산 야경 (창문)",
    bg: "/assets/backgrounds/sua_s5_window_night.webp",
    characters: {
      // 긴 머리+캐미솔: 진솔하고 취약한 모습
      sua_smile:   "/assets/characters/sua_neutral_finale.webp",
      sua_neutral: "/assets/characters/sua_neutral_finale.webp",
      sua_bored:   "/assets/characters/sua_neutral_finale.webp",
    },
  },

  SUA_S5_NAMSAN_FINALE: {
    name: "남산 케이블카 (파이널 야경)",
    bg: "/assets/backgrounds/sua_s5_namsan_finale.webp",
    characters: {
      sua_smile:   "/assets/characters/sua_neutral_finale.webp",
      sua_neutral: "/assets/characters/sua_neutral_finale.webp",
      sua_bored:   "/assets/characters/sua_neutral_finale.webp",
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
