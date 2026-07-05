import sharp from 'sharp';
import path from 'path';

const IMAGES = [
  { name: 'original', file: 'finoka_original_bottle_1783245245024.jpg' },
  { name: 'lemon', file: 'finoka_lemon_bottle_1783245257982.jpg' },
  { name: 'berry', file: 'finoka_berry_bottle_1783245274126.jpg' },
  { name: 'orange', file: 'finoka_orange_bottle_1783245291432.jpg' },
  { name: 'blue', file: 'finoka_blue_bottle_1783245306243.jpg' }
];

const dir = 'c:/Users/hp/Downloads/finoka-cold-drink/src/assets/images';

async function processImage(imageInfo) {
  const inputPath = path.join(dir, imageInfo.file);
  const outputPath = path.join(dir, `finoka_${imageInfo.name}_bottle_transparent.webp`);
  
  console.log(`Processing ${imageInfo.name}...`);
  
  // Read image to raw RGBA buffer
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const width = info.width;
  const height = info.height;
  const fadeStart = Math.floor(height * 0.88);
  const threshold = 28;
  
  let transparentCount = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    const pixelIdx = i / 4;
    const y = Math.floor(pixelIdx / width);
    
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    const maxVal = Math.max(r, g, b);
    let alpha = 255;
    
    if (maxVal < threshold) {
      alpha = 0;
      transparentCount++;
    } else if (maxVal < threshold * 2.5) {
      const ratio = (maxVal - threshold) / (threshold * 1.5);
      alpha = Math.round(Math.max(0, Math.min(1, ratio)) * 255);
    }
    
    if (y > fadeStart) {
      const fadeRatio = 1 - (y - fadeStart) / (height - fadeStart);
      alpha = Math.round(alpha * Math.max(0, Math.min(1, fadeRatio)));
    }
    
    data[i + 3] = alpha;
  }
  
  console.log(`Made ${transparentCount} pixels transparent. Encoding to WebP...`);
  
  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .webp({ quality: 85 })
  .toFile(outputPath);
  
  console.log(`Saved ${imageInfo.name} successfully to ${outputPath}\n`);
}

async function main() {
  for (const img of IMAGES) {
    try {
      await processImage(img);
    } catch (e) {
      console.error(`Failed to process ${img.name}:`, e);
    }
  }
  console.log("All images processed successfully.");
}

main();
