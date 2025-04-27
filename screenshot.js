const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to high resolution
  await page.setViewport({ 
    width: 3840, 
    height: 2160,
    deviceScaleFactor: 2  // This doubles the resolution
  });
  
  // Capture English version
  await page.goto('http://localhost:3000');
  // Wait for network to be idle and add a small delay
  await page.waitForNetworkIdle();
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({ 
    path: 'homepage-en.png',
    fullPage: true,
    type: 'png'
  });

  // Capture Nepali version
  await page.goto('http://localhost:3000/np');
  // Wait for network to be idle and add a small delay
  await page.waitForNetworkIdle();
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({ 
    path: 'homepage-np.png',
    fullPage: true,
    type: 'png'
  });

  await browser.close();
})(); 