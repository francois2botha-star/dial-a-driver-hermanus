#!/usr/bin/env node
/**
 * Create placeholder SVG images for Hermanus attractions
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'src', 'assets', 'hermanus');

// SVG placeholders for missing images
const placeholders = {
  'cliff-path.jpg': {
    title: 'Cliff Path & Coastal Views',
    color: '#1a472a',
    icon: '🏔️',
    width: 1200,
    height: 800
  },
  'grotto-beach.jpg': {
    title: 'Grotto Beach',
    color: '#0d5c7a',
    icon: '🏖️',
    width: 1200,
    height: 800
  },
  'shark-cage-diving.jpg': {
    title: 'Shark Cage Diving',
    color: '#0a1f3a',
    icon: '🦈',
    width: 1200,
    height: 800
  },
  'old-harbour.jpg': {
    title: 'Old Harbour Museum',
    color: '#5a3a1a',
    icon: '⚓',
    width: 1200,
    height: 800
  },
  'walker-bay-sunset.jpg': {
    title: 'Walker Bay Sunset',
    color: '#8B4513',
    icon: '🌅',
    width: 1200,
    height: 800
  },
  'fynbos-flowers.jpg': {
    title: 'Fynbos Flowers',
    color: '#6B2C6F',
    icon: '🌸',
    width: 1200,
    height: 800
  },
  'local-market.jpg': {
    title: 'Local Markets',
    color: '#D2691E',
    icon: '🛍️',
    width: 1200,
    height: 800
  }
};

function createSVGPlaceholder(filename, metadata) {
  const svg = `<svg width="${metadata.width}" height="${metadata.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${metadata.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000;stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <rect width="${metadata.width}" height="${metadata.height}" fill="url(#grad-${filename})"/>
  <text x="50%" y="40%" font-size="120" fill="white" text-anchor="middle" font-family="Arial, sans-serif" opacity="0.8">${metadata.icon}</text>
  <text x="50%" y="65%" font-size="48" fill="white" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold">${metadata.title}</text>
  <text x="50%" y="80%" font-size="24" fill="rgba(255,255,255,0.7)" text-anchor="middle" font-family="Arial, sans-serif">Coming Soon</text>
</svg>`;

  const filepath = path.join(outputDir, filename.replace('.jpg', '.svg'));
  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created ${filename}`);
}

console.log('Creating placeholder SVG images for missing Hermanus photos...\n');

for (const [filename, metadata] of Object.entries(placeholders)) {
  createSVGPlaceholder(filename, metadata);
}

console.log('\n✓ Placeholder images created successfully!');
console.log('Note: For production, replace these with actual Hermanus photos.');
