const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const wfStart = content.indexOf("  // Women's Fashion Products");
const wfEnd = content.indexOf("];\n\n\nexport default products;");
if (wfEnd === -1) {
  console.log("Could not find wfEnd");
}

if (wfStart !== -1) {
  // Extract the wf products
  let endOfBanners = content.indexOf("];", wfStart);
  if (endOfBanners !== -1) {
    const wfProductsStr = content.substring(wfStart, endOfBanners);
    
    // Remove it from banners
    content = content.replace(wfProductsStr, "");
    
    // Insert into products array.
    // Let's find the end of products array
    const productsEnd = content.indexOf("];\n\nproducts.push(...newCategoryProducts);");
    if (productsEnd !== -1) {
      content = content.substring(0, productsEnd) + ",\n" + wfProductsStr + "\n" + content.substring(productsEnd);
      fs.writeFileSync('src/data/products.js', content, 'utf8');
      console.log("Fixed products.js");
    } else {
      console.log("Could not find products end");
    }
  }
}
