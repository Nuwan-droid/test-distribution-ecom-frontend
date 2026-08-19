const fs = require('fs');

const badUrls = [
  "https://images.unsplash.com/photo-1559591935-6dc1aa90862c?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1606229365455-870aa34f0c8e?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1624222247344-550fb8fc826d?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585241936227-183424574c8a?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1623609163859-ca93c959b98f?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1558171813-0d853f9e5f4a?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1551163943-3f7253a97845?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1594938298603-c8148c4b4e68?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1548863227-3af5d5a5b84f?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1565084888279-aca607bb8427?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1599058917765-a780eda9f3a4?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1558969479-a8a1f11bd4db?w=600&h=600&fit=crop&q=85",
  "https://images.unsplash.com/photo-1515347619362-6734f7117584?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1564257631407-4ebd1f9266f4?w=600&h=800&fit=crop"
];

const fallbackUrls = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80", // headphones
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80", // watch
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop&q=80", // polaroid
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80", // shoe
  "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=600&fit=crop&q=80"  // bag
];

let fileContent = fs.readFileSync('src/data/products.js', 'utf8');
let replacedCount = 0;

for (let i = 0; i < badUrls.length; i++) {
  const badUrl = badUrls[i];
  const fallbackUrl = fallbackUrls[i % fallbackUrls.length];
  
  // Use string replace all
  if (fileContent.includes(badUrl)) {
    fileContent = fileContent.split(badUrl).join(fallbackUrl);
    replacedCount++;
  }
}

fs.writeFileSync('src/data/products.js', fileContent, 'utf8');
console.log(`Replaced ${replacedCount} broken URLs in products.js`);
