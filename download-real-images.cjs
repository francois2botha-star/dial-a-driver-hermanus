#!/usr/bin/env node
/**
 * Download real stock photos from Unsplash for Hermanus attractions
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Real image URLs from Unsplash (high quality, royalty-free)
const realImages = {
  'whale-watching.jpg': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&auto=format&fit=crop',
  'fernkloof-nature.jpg': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=85&auto=format&fit=crop',
  'wine-tasting.jpg': 'https://images.unsplash.com/photo-1554118811-1e0d58224d09?w=1200&q=85&auto=format&fit=crop',
  'cliff-path.jpg': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop',
  'grotto-beach.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85&auto=format&fit=crop',
  'shark-cage-diving.jpg': 'https://images.unsplash.com/photo-1583212192454-1fe6229603b7?w=1200&q=85&auto=format&fit=crop',
  'old-harbour.jpg': 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=85&auto=format&fit=crop',
  'walker-bay-sunset.jpg': 'https://images.unsplash.com/photo-1495567720989-cebf7d89d46c?w=1200&q=85&auto=format&fit=crop',
  'fynbos-flowers.jpg': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=85&auto=format&fit=crop',
  'local-market.jpg': 'https://images.unsplash.com/photo-1488854216446-ad6174a8b5cc?w=1200&q=85&auto=format&fit=crop',
};

const outputDir = path.join(__dirname, 'src', 'assets', 'hermanus');

function downloadImage(filename, url) {
  return new Promise((resolve) => {
    const filepath = path.join(outputDir, filename);
    const file = fs.createWriteStream(filepath);

    const request = https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000 
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        downloadImage(filename, response.headers.location).then(resolve);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filepath, () => {});
        process.stdout.write(`✗ (HTTP ${response.statusCode})\n`);
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
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      process.stdout.write(`✗ (${err.message})\n`);
      resolve(false);
    });

    request.on('timeout', () => {
      request.abort();
      file.close();
      fs.unlink(filepath, () => {});
      process.stdout.write('✗ (Timeout)\n');
      resolve(false);
    });
  });
}

async function downloadAll() {
  console.log('Downloading real stock photos from Unsplash...\n');

  let count = 0;
  for (const [filename, url] of Object.entries(realImages)) {
    process.stdout.write(`Downloading ${filename}... `);
    if (await downloadImage(filename, url)) {
      count++;
    }
  }

  console.log(`\n✓ Downloaded ${count}/${Object.keys(realImages).length} real stock images`);
  console.log(`Images saved to: ${outputDir}\n`);
}

downloadAll();
