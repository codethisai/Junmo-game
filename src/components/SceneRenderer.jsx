import React, { useState, useEffect } from 'react';
import { SCENES } from '../data/scenes';
import './SceneRenderer.css';

/**
 * 씬 렌더러
 * 배경 + 캐릭터를 겹쳐서 표시 (lazy loading 지원)
 */
export default function SceneRenderer({ sceneKey, characterExpression = 'smile' }) {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [charLoaded, setCharLoaded] = useState(false);

  const scene = SCENES[sceneKey];

  if (!scene) {
    return <div>씬을 찾을 수 없습니다: {sceneKey}</div>;
  }

  const characterImage = scene.characters[`yujung_${characterExpression}`]
    || scene.characters.yujung_smile;

  // 배경 이미지 preload
  useEffect(() => {
    const img = new Image();
    img.onload = () => setBgLoaded(true);
    img.src = scene.bg;
  }, [scene.bg]);

  // 캐릭터 이미지 preload
  useEffect(() => {
    const img = new Image();
    img.onload = () => setCharLoaded(true);
    img.src = characterImage;
  }, [characterImage]);

  return (
    <div
      className="scene-container"
      style={{
        backgroundImage: bgLoaded ? `url(${scene.bg})` : 'none',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* 캐릭터는 배경 위에 겹쳐짐 */}
      {charLoaded && (
        <img
          src={characterImage}
          alt={scene.name}
          className="character-image"
          loading="lazy"
        />
      )}

      {/* 로딩 스켈레톤 */}
      {(!bgLoaded || !charLoaded) && (
        <div className="scene-loading">
          <div className="spinner"></div>
        </div>
      )}

      {/* 씬 이름 표시 */}
      <div className="scene-label">{scene.name}</div>
    </div>
  );
}

/**
 * 사용 예:
 * <SceneRenderer sceneKey="S2_HANGANG_DAY" characterExpression="smile" />
 * <SceneRenderer sceneKey="S3_IZAKAYA" characterExpression="neutral" />
 */
