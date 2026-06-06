#!/usr/bin/env node
/**
 * 이미지 최적화 스크립트
 * PNG → WebP 변환 (품질 유지)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../public/assets');
const backgroundsDir = path.join(assetsDir, 'backgrounds');
const charactersDir = path.join(assetsDir, 'characters');

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const outputPath = inputPath.replace(ext, '.webp');

  // 이미 WebP면 스킵
  if (ext === '.webp') {
    console.log(`⏭️  ${path.basename(inputPath)} (이미 WebP)`);
    return;
  }

  try {
    const stats = fs.statSync(inputPath);
    const inputSize = stats.size / 1024; // KB

    await sharp(inputPath)
      .webp({ quality: 95 }) // 높은 품질 유지
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSize = outputStats.size / 1024;
    const saved = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`✅ ${path.basename(outputPath)}`);
    console.log(`   ${inputSize.toFixed(0)}KB → ${outputSize.toFixed(0)}KB (${saved}% 절감)`);

    // 원본 PNG 삭제
    if (ext === '.png') {
      fs.unlinkSync(inputPath);
      console.log(`   원본 삭제: ${path.basename(inputPath)}\n`);
    }
  } catch (error) {
    console.error(`❌ ${path.basename(inputPath)}: ${error.message}`);
  }
}

async function optimizeDirectory(dir, dirName) {
  console.log(`\n📁 ${dirName} 최적화 중...\n`);

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile()) {
      await optimizeImage(filePath);
    }
  }
}

async function main() {
  console.log('\n🚀 이미지 최적화 시작\n');
  console.log('품질: 95 (원본 대비 시각적 차이 거의 없음)');
  console.log('형식: PNG → WebP (용량 30~40% 감소)\n');

  try {
    await optimizeDirectory(backgroundsDir, '배경 이미지');
    await optimizeDirectory(charactersDir, '캐릭터 이미지');

    console.log('\n✨ 최적화 완료!\n');
  } catch (error) {
    console.error('오류:', error);
    process.exit(1);
  }
}

main();
