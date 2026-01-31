#!/usr/bin/env node
/**
 * Download and optimize Hermanus images from Unsplash
 * Usage: node download-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Image URLs from Unsplash
const images = {
  'whale-watching.jpg': 'https://unsplash.com/napi/photos/2vPGGOU-wLA/download?w=1200',
  'cliff-path.jpg': 'https://unsplash.com/napi/photos/1bO6O2Y3lGk/download?w=1200',
  'grotto-beach.jpg': 'https://unsplash.com/napi/photos/2QGgkQJYv6k/download?w=1200',
  'fernkloof-nature.jpg': 'https://unsplash.com/napi/photos/6QnEf_b47eA/download?w=1200',
  'wine-tasting.jpg': 'https://unsplash.com/napi/photos/2d4lAQAlbDA/download?w=1200',
  'shark-cage-diving.jpg': 'https://unsplash.com/napi/photos/v7dumpxJlw/download?w=1200',
  'old-harbour.jpg': 'https://unsplash.com/napi/photos/xK48smJXHPg/download?w=1200',
  'walker-bay-sunset.jpg': 'https://unsplash.com/napi/photos/xG8Z9nRgMEE/download?w=1200',
  'fynbos-flowers.jpg': 'https://unsplash.com/napi/photos/OT0r3KRJqE4/download?w=1200',
  'local-market.jpg': 'https://unsplash.com/napi/photos/XkMK7WmzMdI/download?w=1200',
};

const outputDir = path.join(__dirname, 'src', 'assets', 'hermanus');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Download a single image from URL and save it
 */
function downloadImage(filename, url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    // Add redirect handling headers
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const filepath = path.join(outputDir, filename);
    const file = fs.createWriteStream(filepath);

    protocol
      .get(url, options, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          downloadImage(filename, response.headers.location).then(resolve);
          return;
        }

        if (response.statusCode !== 200) {
          process.stdout.write(`✗ (HTTP ${response.statusCode})\n`);
          fs.unlink(filepath, () => {});
          resolve(false);
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          const sizeKb = (fs.statSync(filepath).size / 1024).toFixed(1);
          process.stdout.write(`✓ (${sizeKb} KB)\n`);
          resolve(true);
        });

        file.on('error', () => {
          fs.unlink(filepath, () => {});
          process.stdout.write('✗ (Write error)\n');
          resolve(false);
        });
      })
      .on('error', () => {
        process.stdout.write('✗ (Download error)\n');
        fs.unlink(filepath, () => {});
        resolve(false);
      });
  });
}

/**
 * Download all images sequentially
 */
async function downloadAll() {
  console.log('Downloading and caching Hermanus images from Unsplash...\n');

  let successCount = 0;
  let totalCount = Object.keys(images).length;

  for (const [filename, url] of Object.entries(images)) {
    process.stdout.write(`Downloading ${filename}... `);
    const success = await downloadImage(filename, url);
    if (success) successCount++;
  }

  console.log(`\nCompleted: ${successCount}/${totalCount} images downloaded`);
  console.log(`Images saved to: ${outputDir}`);

  if (successCount === totalCount) {
    console.log('\n✓ All images downloaded successfully!');
    process.exit(0);
  } else {
    console.log(`\n⚠ ${totalCount - successCount} images failed. Check your internet connection.`);
    process.exit(1);
  }
}

downloadAll();
