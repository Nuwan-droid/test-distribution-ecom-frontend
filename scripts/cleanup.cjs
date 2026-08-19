const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src');

// Delete files
const filesToDelete = [
  'pages/admin/ProductUploadDemo.jsx',
  'hooks/useProcessedImage.js',
  'utils/imageCache.js'
];

for (const file of filesToDelete) {
  const fullPath = path.join(srcPath, file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Deleted ${file}`);
  }
}

// Delete directory
const dirToDelete = path.join(srcPath, 'components/3d');
if (fs.existsSync(dirToDelete)) {
  fs.rmSync(dirToDelete, { recursive: true, force: true });
  console.log(`Deleted components/3d`);
}

// Update products.js
const productsJsPath = path.join(srcPath, 'data/products.js');
if (fs.existsSync(productsJsPath)) {
  let content = fs.readFileSync(productsJsPath, 'utf8');
  // Remove "modelUrl: '/models/...'," line and any leading comment like "// 3D model..."
  content = content.replace(/\s*\/\/\s*3D model.*?\n/g, '\n');
  content = content.replace(/\s*modelUrl:\s*'.*?',?\n/g, '\n');
  fs.writeFileSync(productsJsPath, content);
  console.log(`Updated products.js`);
}

console.log('Cleanup script finished.');
