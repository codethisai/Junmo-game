/**
 * 게임 씬별 배경 + 캐릭터 이미지 정의
 * 각 씬은 배경과 캐릭터 표정을 독립적으로 관리
 */

export const SCENES = {
  S1_CAFE: {
    name: "연남동 카페",
    bg: "/assets/backgrounds/cafe_yeonnam.png",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_casual.png",
      yujung_neutral: "/assets/characters/yujung_neutral_casual.png",
      yujung_thinking: "/assets/characters/yujung_thinking_casual.png",
    },
  },

  S2_HANGANG_DAY: {
    name: "한강공원 (낮)",
    bg: "/assets/backgrounds/hangang_day.png",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_denim.png",
      yujung_neutral: "/assets/characters/yujung_neutral_dress.png",
      yujung_bored: "/assets/characters/yujung_bored_denim.png",
    },
  },

  S2_HANGANG_NIGHT: {
    name: "한강공원 (밤)",
    bg: "/assets/backgrounds/hangang_night.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_denim.png",
      yujung_neutral: "/assets/characters/yujung_neutral_dress.png",
      yujung_bored: "/assets/characters/yujung_bored_denim.png",
    },
  },

  S3_MOVIE: {
    name: "영화관 (CGV)",
    bg: "/assets/backgrounds/cgv_izakaya.png",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_dress.png",
      yujung_neutral: "/assets/characters/yujung_neutral_dress.png",
      yujung_thinking: "/assets/characters/yujung_thinking_casual.png",
      yujung_happy: "/assets/characters/yujung_happy_dress.webp",
    },
  },

  S3_IZAKAYA: {
    name: "이자카야 (저녁)",
    bg: "/assets/backgrounds/cgv_izakaya.png",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_dress.png",
      yujung_neutral: "/assets/characters/yujung_neutral_dress.png",
      yujung_thinking: "/assets/characters/yujung_thinking_casual.png",
      yujung_bored: "/assets/characters/yujung_bored_dress.webp",
    },
  },

  S4_APARTMENT_DAY: {
    name: "유정 아파트 (낮)",
    bg: "/assets/backgrounds/apartment_day.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_ponytail.png",
      yujung_neutral: "/assets/characters/yujung_neutral_ponytail.png",
      yujung_cozy: "/assets/characters/yujung_cozy_ponytail.png",
    },
  },

  S4_APARTMENT_NIGHT: {
    name: "유정 아파트 (밤)",
    bg: "/assets/backgrounds/apartment_night.png",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_ponytail.png",
      yujung_thinking: "/assets/characters/yujung_thinking_ponytail.webp",
      yujung_coffee: "/assets/characters/yujung_coffee_ponytail.webp",
    },
  },

  S4_APARTMENT_ENTRANCE: {
    name: "유정 아파트 입구 (밤)",
    bg: "/assets/backgrounds/apartment_entrance_night.png",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_ponytail.png",
      yujung_neutral: "/assets/characters/yujung_neutral_ponytail.png",
    },
  },

  S5_ROOFTOP_DINING: {
    name: "한남동 루프탑 (식사)",
    bg: "/assets/backgrounds/rooftop_restaurant_dining.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_shorthair_dress.png",
      yujung_surprised: "/assets/characters/yujung_surprised_shorthair_dress.png",
      yujung_emotional: "/assets/characters/yujung_emotional_shorthair_dress.webp",
    },
  },

  S5_ROOFTOP_BAR: {
    name: "한남동 루프탑 (바)",
    bg: "/assets/backgrounds/rooftop_bar.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_shorthair_dress.png",
      yujung_surprised: "/assets/characters/yujung_surprised_shorthair_dress.png",
    },
  },

  S5_ROOFTOP_TERRACE: {
    name: "한남동 루프탑 테라스 (프로포즈)",
    bg: "/assets/backgrounds/rooftop_terrace.webp",
    characters: {
      yujung_smile: "/assets/characters/yujung_smile_shorthair_dress.png",
      yujung_emotional: "/assets/characters/yujung_emotional_shorthair_dress.webp",
      yujung_surprised: "/assets/characters/yujung_surprised_shorthair_dress.png",
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
