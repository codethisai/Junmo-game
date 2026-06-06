#!/usr/bin/env node
/**
 * 이미지 재압축 스크립트
 * WebP 품질 최적화 (quality 80)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../public/assets');
const backgroundsDir = path.join(assetsDir, 'backgrounds');
const charactersDir = path.join(assetsDir, 'characters');

async function recompressImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();

  if (ext !== '.webp') return;

  try {
    const stats = fs.statSync(inputPath);
    const inputSize = stats.size / 1024;

    // 임시 파일에 재압축
    const tempPath = inputPath + '.tmp';
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(tempPath);

    const tempStats = fs.statSync(tempPath);
    const tempSize = tempStats.size / 1024;
    const saved = ((1 - tempSize / inputSize) * 100).toFixed(1);

    // 원본 파일 교체
    fs.renameSync(tempPath, inputPath);

    console.log(`✅ ${path.basename(inputPath)}`);
    console.log(`   ${inputSize.toFixed(0)}KB → ${tempSize.toFixed(0)}KB (${saved}% 절감)\n`);
  } catch (error) {
    console.error(`❌ ${path.basename(inputPath)}: ${error.message}`);
  }
}

async function recompressDirectory(dir, dirName) {
  console.log(`📁 ${dirName} 재압축 중...\n`);
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile()) {
      await recompressImage(filePath);
    }
  }
}

async function main() {
  console.log('\n🔄 WebP 재압축 시작\n');
  console.log('품질: 80 (원본 대비 시각적 차이 거의 없음)\n');

  try {
    await recompressDirectory(backgroundsDir, '배경 이미지');
    await recompressDirectory(charactersDir, '캐릭터 이미지');

    const bgSize = fs.readdirSync(backgroundsDir)
      .reduce((sum, f) => sum + fs.statSync(path.join(backgroundsDir, f)).size, 0) / 1024 / 1024;
    const charSize = fs.readdirSync(charactersDir)
      .reduce((sum, f) => sum + fs.statSync(path.join(charactersDir, f)).size, 0) / 1024 / 1024;

    console.log('\n✨ 재압축 완료!\n');
    console.log(`📊 최종 용량:`);
    console.log(`   배경: ${bgSize.toFixed(2)}MB`);
    console.log(`   캐릭터: ${charSize.toFixed(2)}MB`);
    console.log(`   총합: ${(bgSize + charSize).toFixed(2)}MB\n`);
  } catch (error) {
    console.error('오류:', error);
    process.exit(1);
  }
}

main();
