#!/usr/bin/env node
/**
 * Create valid JPEG images with solid colors and text
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  { name: 'whale-watching.jpg', color: '#0066cc', title: 'Whale Watching' },
  { name: 'fernkloof-nature.jpg', color: '#228B22', title: 'Fernkloof Nature' },
  { name: 'wine-tasting.jpg', color: '#8B0000', title: 'Wine Tasting' },
  { name: 'cliff-path.jpg', color: '#1a472a', title: 'Cliff Path' },
  { name: 'grotto-beach.jpg', color: '#0d5c7a', title: 'Grotto Beach' },
  { name: 'shark-cage-diving.jpg', color: '#0a1f3a', title: 'Shark Diving' },
  { name: 'old-harbour.jpg', color: '#5a3a1a', title: 'Old Harbour' },
  { name: 'walker-bay-sunset.jpg', color: '#8B4513', title: 'Walker Bay Sunset' },
  { name: 'fynbos-flowers.jpg', color: '#6B2C6F', title: 'Fynbos Flowers' },
  { name: 'local-market.jpg', color: '#D2691E', title: 'Local Markets' },
];

const outputDir = path.join(__dirname, 'public', 'images', 'hermanus');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function createImage(imageDef) {
  const width = 1200;
  const height = 800;
  
  // Create SVG with gradient and text
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${imageDef.color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#000;stop-opacity:0.7" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <text x="50%" y="50%" font-size="60" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-weight="bold">${imageDef.title}</text>
    </svg>
  `;

  const filepath = path.join(outputDir, imageDef.name);
  
  try {
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(filepath);
    
    const stats = fs.statSync(filepath);
    console.log(`✓ ${imageDef.name} (${(stats.size / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err) {
    console.log(`✗ ${imageDef.name}: ${err.message}`);
    return false;
  }
}

async function createAllImages() {
  console.log('Creating valid JPEG images...\n');
  
  let count = 0;
  for (const imageDef of images) {
    if (await createImage(imageDef)) {
      count++;
    }
  }
  
  console.log(`\n✓ Successfully created ${count}/${images.length} JPEG images`);
  console.log(`Images saved to: ${outputDir}\n`);
  
  // Verify files can be opened
  console.log('Verifying JPEG headers...');
  for (const imageDef of images) {
    const filepath = path.join(outputDir, imageDef.name);
    const buffer = fs.readFileSync(filepath);
    // JPEG files start with FFD8 and end with FFD9
    const isValidJPEG = buffer[0] === 0xFF && buffer[1] === 0xD8 && 
                        buffer[buffer.length - 2] === 0xFF && 
                        buffer[buffer.length - 1] === 0xD9;
    console.log(`${isValidJPEG ? '✓' : '✗'} ${imageDef.name} - ${isValidJPEG ? 'Valid JPEG' : 'Invalid'}`);
  }
}

createAllImages();
