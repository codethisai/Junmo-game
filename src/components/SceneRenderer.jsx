import React from 'react';
import { SCENES } from '../data/scenes';
import './SceneRenderer.css';

/**
 * 씬 렌더러
 * 배경 + 캐릭터를 겹쳐서 표시
 */
export default function SceneRenderer({ sceneKey, characterExpression = 'smile' }) {
  const scene = SCENES[sceneKey];

  if (!scene) {
    return <div>씬을 찾을 수 없습니다: {sceneKey}</div>;
  }

  const characterImage = scene.characters[`yujung_${characterExpression}`]
    || scene.characters.yujung_smile;

  return (
    <div
      className="scene-container"
      style={{
        backgroundImage: `url(${scene.bg})`,
      }}
    >
      {/* 캐릭터는 배경 위에 겹쳐짐 */}
      <img
        src={characterImage}
        alt={scene.name}
        className="character-image"
      />

      {/* 선택사항: 씬 이름 표시 */}
      <div className="scene-label">{scene.name}</div>
    </div>
  );
}

/**
 * 사용 예:
 * <SceneRenderer sceneKey="S2_HANGANG_DAY" characterExpression="smile" />
 * <SceneRenderer sceneKey="S3_IZAKAYA" characterExpression="neutral" />
 */
