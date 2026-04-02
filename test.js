import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:5173', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'test_se.png' });
  
  await page.setViewport({ width: 414, height: 896 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'test_max.png' });

  await browser.close();
})();
