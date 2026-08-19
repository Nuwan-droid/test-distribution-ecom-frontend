const fs = require('fs');

const fileContent = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /image:\s*['"`]([^'"`]+)['"`]/g;
let match;
const urls = new Set();

while ((match = regex.exec(fileContent)) !== null) {
  urls.add(match[1]);
}

const urlArray = Array.from(urls);
console.log(`Found ${urlArray.length} unique image URLs.`);

async function checkUrls() {
  const badUrls = [];
  let checked = 0;

  for (const url of urlArray) {
    if (!url.startsWith('http')) {
      checked++;
      continue;
    }
    try {
      const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      if (!response.ok) {
        badUrls.push(url);
      }
    } catch (e) {
      // maybe 404 or network error
      try {
        const getResp = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(5000) });
        if (!getResp.ok) {
          badUrls.push(url);
        }
      } catch (e2) {
        badUrls.push(url);
      }
    }
    checked++;
    if (checked % 10 === 0) {
      console.log(`Checked ${checked} / ${urlArray.length}`);
    }
  }

  console.log('--- BAD URLS ---');
  console.log(JSON.stringify(badUrls, null, 2));
}

checkUrls();
