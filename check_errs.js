const puppeteer = require('/tmp/node_modules/puppeteer');
const express = require('/tmp/node_modules/express');
const app = express();
app.use(express.static('/Users/adityatripathi/Desktop/Aditya_Portfolio/public'));
const server = app.listen(8081, async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('LOG:', msg.text()));
    page.on('pageerror', err => console.log('ERR:', err.message));
    await page.goto('http://localhost:8081/prototype.html', { waitUntil: 'networkidle0' });
    await browser.close();
  } catch (e) {
    console.error(e);
  } finally {
    server.close();
  }
});
