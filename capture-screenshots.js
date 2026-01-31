const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// First, start a simple HTTP server to serve the dist folder
const http = require('http');
const { createReadStream } = require('fs');

const PORT = 8888;
let serverInstance;

// Simple HTTP server
function startServer() {
  return new Promise((resolve) => {
    serverInstance = http.createServer((req, res) => {
      let filePath = path.join(__dirname, 'dist', req.url);
      
      if (req.url === '/') {
        filePath = path.join(__dirname, 'dist', 'index.html');
      }

      const ext = path.extname(filePath);
      let contentType = 'text/html';
      
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.js') contentType = 'application/javascript';
      if (ext === '.png') contentType = 'image/png';
      if (ext === '.jpg') contentType = 'image/jpeg';

      if (fs.existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': contentType });
        createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    serverInstance.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      resolve();
    });
  });
}

async function captureScreenshots() {
  try {
    // Start the server
    await startServer();
    
    // Wait a moment for server to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Launch browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set viewport to capture full page
    await page.setViewport({ width: 1024, height: 768 });

    const baseUrl = `http://localhost:${PORT}`;
    const screenshots = [];

    // Define pages to screenshot
    const pages = [
      { name: 'home', hash: '#home', filename: 'home.png' },
      { name: 'fleet', hash: '#vehicles', filename: 'fleet.png' },
      { name: 'activities', hash: '#activities', filename: 'activities.png' },
      { name: 'booking', hash: '#booking', filename: 'booking.png' },
      { name: 'contact', hash: '#contact', filename: 'contact.png' },
    ];

    // Capture each page
    for (const pageConfig of pages) {
      console.log(`Capturing ${pageConfig.name}...`);
      await page.goto(`${baseUrl}${pageConfig.hash}`, { waitUntil: 'networkidle2' });
      
      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const screenshotPath = path.join(__dirname, 'screenshots', pageConfig.filename);
      
      // Ensure screenshots directory exists
      if (!fs.existsSync(path.join(__dirname, 'screenshots'))) {
        fs.mkdirSync(path.join(__dirname, 'screenshots'));
      }
      
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`✓ Captured ${pageConfig.filename}`);
      
      // Convert to base64
      const imageBuffer = fs.readFileSync(screenshotPath);
      const base64 = imageBuffer.toString('base64');
      screenshots.push({
        name: pageConfig.name,
        base64: `data:image/png;base64,${base64}`
      });
    }

    await browser.close();
    
    // Close server
    serverInstance.close();
    
    // Save base64 data to a JSON file for embedding
    fs.writeFileSync(
      path.join(__dirname, 'screenshot-data.json'),
      JSON.stringify(screenshots, null, 2)
    );
    
    console.log('✓ All screenshots captured!');
    console.log('✓ Base64 data saved to screenshot-data.json');
    
  } catch (error) {
    console.error('Error capturing screenshots:', error);
    if (serverInstance) serverInstance.close();
    process.exit(1);
  }
}

captureScreenshots();
