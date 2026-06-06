#!/usr/bin/env python3
"""
캐릭터 이미지 합성 스크립트
배경 + 캐릭터 인물을 합성하여 게임용 이미지 생성
"""

import os
import sys
from PIL import Image
import boto3
from pathlib import Path
from datetime import datetime

# 설정
TEMP_DIR = Path("/tmp/moshi-clipboard-*")
OUTPUT_DIR = Path("/home/ubuntu/projects/Junmo-game/public/assets/characters/composite")
S3_BUCKET = "junmo-game-assets"
S3_REGION = "us-east-1"

# 이미지 임시 저장 위치
TEMP_IMAGES = {
    "hangang_day": "/tmp/moshi-clipboard-4ZsVFE.png",
    "hangang_night": "/tmp/moshi-clipboard-xkIkdF.webp",
    "character_smile_denim": "/tmp/moshi-clipboard-d1DAVG.png",
    "character_bored_denim": "/tmp/moshi-clipboard-3SWMQu.png",
    "cgv_izakaya": "/tmp/moshi-clipboard-SkVwTN.png",
    "yujung_smile_dress": "/tmp/moshi-clipboard-FNnXGe.png",
    "yujung_neutral_dress": "/tmp/moshi-clipboard-xmXDsz.png",
    "yujung_happy_dress": "/tmp/moshi-clipboard-fP93nI.webp",
    "yujung_neutral_casual": "/tmp/moshi-clipboard-3XYjVI.png",
    "yujung_smile_casual": "/tmp/moshi-clipboard-l3iAh2.png",
    "yujung_thinking_casual": "/tmp/moshi-clipboard-K0T6B8.png",
    "yujung_bored_dress": "/tmp/moshi-clipboard-W2bmSZ.webp",
    "yujung_bored_casual": "/tmp/moshi-clipboard-kgFDEK.webp",
}

def create_output_dir():
    """출력 디렉토리 생성"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"✅ Output directory: {OUTPUT_DIR}")

def compose_image(bg_path: str, char_path: str, output_name: str) -> Path:
    """
    배경과 캐릭터를 합성
    - 배경을 1920x1080으로 리사이즈
    - 캐릭터를 우측 정렬
    """
    try:
        # 이미지 로드
        bg = Image.open(bg_path).convert("RGBA")
        char = Image.open(char_path).convert("RGBA")

        # 배경 리사이즈 (1920x1080)
        bg_resized = bg.resize((1920, 1080), Image.Resampling.LANCZOS)

        # 캐릭터 비율 유지하며 리사이즈
        # 캐릭터를 배경 높이의 90%로 설정
        char_height = int(1080 * 0.9)
        char_ratio = char.width / char.height
        char_width = int(char_height * char_ratio)
        char_resized = char.resize((char_width, char_height), Image.Resampling.LANCZOS)

        # 캐릭터를 우측 정렬 (마진 20px)
        char_x = 1920 - char_width - 20
        char_y = (1080 - char_height) // 2  # 수직 중앙

        # 합성
        composite = bg_resized.copy()
        composite.paste(char_resized, (char_x, char_y), char_resized)

        # 저장 (WEBP 형식으로 최적화)
        output_path = OUTPUT_DIR / f"{output_name}.webp"
        composite.save(output_path, "WEBP", quality=85, method=6)

        file_size_mb = output_path.stat().st_size / (1024 * 1024)
        print(f"✅ {output_name}: {file_size_mb:.2f}MB")

        return output_path
    except Exception as e:
        print(f"❌ Error composing {output_name}: {e}")
        return None

def upload_to_s3(file_path: Path, s3_key: str) -> bool:
    """S3에 파일 업로드"""
    try:
        s3_client = boto3.client("s3", region_name=S3_REGION)
        s3_client.upload_file(
            str(file_path),
            S3_BUCKET,
            s3_key,
            ExtraArgs={"ContentType": "image/webp"}
        )
        print(f"🚀 S3 uploaded: s3://{S3_BUCKET}/{s3_key}")
        return True
    except Exception as e:
        print(f"⚠️  S3 upload failed: {e}")
        return False

def main():
    """메인 실행"""
    print("\n🎬 이미지 합성 시작...\n")

    create_output_dir()

    # 합성 작업 정의
    compositions = [
        # 한강 배경 조합
        {
            "bg": TEMP_IMAGES["hangang_day"],
            "char": TEMP_IMAGES["character_smile_denim"],
            "output": "hangang_day_smile_yujung",
            "scene": "S2_Hangang_Smile"
        },
        {
            "bg": TEMP_IMAGES["hangang_day"],
            "char": TEMP_IMAGES["character_bored_denim"],
            "output": "hangang_day_bored_yujung",
            "scene": "S2_Hangang_Bored"
        },
        {
            "bg": TEMP_IMAGES["hangang_night"],
            "char": TEMP_IMAGES["character_smile_denim"],
            "output": "hangang_night_smile_yujung",
            "scene": "S2_Hangang_Night_Smile"
        },
        {
            "bg": TEMP_IMAGES["hangang_night"],
            "char": TEMP_IMAGES["character_bored_denim"],
            "output": "hangang_night_bored_yujung",
            "scene": "S2_Hangang_Night_Bored"
        },
        # CGV + 이자카야 배경 조합
        {
            "bg": TEMP_IMAGES["cgv_izakaya"],
            "char": TEMP_IMAGES["yujung_smile_dress"],
            "output": "cgv_izakaya_smile_yujung",
            "scene": "S3_CGV_Izakaya_Smile"
        },
        {
            "bg": TEMP_IMAGES["cgv_izakaya"],
            "char": TEMP_IMAGES["yujung_neutral_dress"],
            "output": "cgv_izakaya_neutral_yujung",
            "scene": "S3_CGV_Izakaya_Neutral"
        },
        {
            "bg": TEMP_IMAGES["cgv_izakaya"],
            "char": TEMP_IMAGES["yujung_thinking_casual"],
            "output": "cgv_izakaya_thinking_yujung",
            "scene": "S3_CGV_Izakaya_Thinking"
        },
    ]

    uploaded_files = []

    for comp in compositions:
        output_path = compose_image(comp["bg"], comp["char"], comp["output"])

        if output_path:
            # S3 키 생성
            s3_key = f"characters/scenes/{comp['scene']}.webp"

            # S3 업로드 시도
            if upload_to_s3(output_path, s3_key):
                uploaded_files.append({
                    "local": str(output_path),
                    "s3": f"s3://{S3_BUCKET}/{s3_key}",
                    "scene": comp["scene"]
                })

    # 결과 요약
    print(f"\n{'='*60}")
    print(f"✨ 합성 완료! ({len(uploaded_files)} / {len(compositions)})")
    print(f"{'='*60}\n")

    if uploaded_files:
        print("📦 업로드된 파일 목록:")
        for f in uploaded_files:
            print(f"  • {f['scene']}")
            print(f"    └─ {f['s3']}\n")

    print(f"💾 로컬 저장: {OUTPUT_DIR}")
    return len(uploaded_files) > 0

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
