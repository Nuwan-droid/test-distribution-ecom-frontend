const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '../src/data/products.js');
let content = fs.readFileSync(FILE, 'utf8');
const normalized = content.replace(/\r\n/g, '\n');
const lines = normalized.split('\n');

let inWF = false;
let enterCount = 0;
let exitCount = 0;
let exitLines = [];

lines.forEach((raw, i) => {
  const line = raw.replace(/\r$/, '');
  
  if (line.includes("category: 'Women fashion'")) {
    if (!inWF) enterCount++;
    inWF = true;
  } else if (inWF && /category:\s*'(?!Women fashion)/.test(line)) {
    exitCount++;
    if (exitLines.length < 5) exitLines.push({lineNum: i+1, line});
    inWF = false;
  }
});

console.log('Enter count:', enterCount);
console.log('Exit count:', exitCount);
console.log('Exit examples:', JSON.stringify(exitLines, null, 2));
