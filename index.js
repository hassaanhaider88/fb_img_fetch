const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.get('/fetch-images', async (req, res) => {
//   const postUrl = 'https://web.facebook.com/share/p/15jQMrTzTT';
const postUrl = req.query.post_url;
  

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(postUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await autoScroll(page);
    const imageUrls = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images
          .map(img => img.src)
          .filter(src => !src.endsWith('.png'));
      });
      const validImageUrls = imageUrls.filter(url => !url.startsWith('data:image')); 
      await browser.close();
      res.json({ images: validImageUrls });
    
    
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Function to scroll the page slowly to load lazy-loaded images
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

