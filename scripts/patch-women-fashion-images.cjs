/**
 * patch-women-fashion-images.cjs  (v2 - uses whole-file regex)
 * Replaces all Women fashion product images with unique, varied,
 * light-background images per subcategory.
 * Run:  node scripts/patch-women-fashion-images.cjs
 */

const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '../src/data/products.js');

// Curated Unsplash image pools per subcategory — light/white backgrounds for mix-blend-mode:multiply
const SUBCATEGORY_IMAGES = {
  'Dresses': [
    'https://images.unsplash.com/photo-1623609163859-ca93c959b98f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1558171813-0d853f9e5f4a?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop&q=85',
  ],
  'Tops': [
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1551163943-3f7253a97845?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=85',
  ],
  'Jeans': [
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1565084888279-aca607bb8427?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1594938298603-c8148c4b4e68?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=600&fit=crop&q=85',
  ],
  'Skirts': [
    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=600&fit=crop&q=85',
  ],
  'Pants': [
    'https://images.unsplash.com/photo-1594938298603-c8148c4b4e68?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1548863227-3af5d5a5b84f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=600&fit=crop&q=85',
  ],
  'Shorts': [
    'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1565084888279-aca607bb8427?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop&q=85',
  ],
  'Jackets & Outerwear': [
    'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop&q=85',
  ],
  'Activewear': [
    'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1599058917765-a780eda9f3a4?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1556816214-59f4add9b550?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=600&fit=crop&q=85',
  ],
  'Loungewear & Sleepwear': [
    'https://images.unsplash.com/photo-1617952236317-0bd127407984?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1558969479-a8a1f11bd4db?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1540206395-68808572332f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop&q=85',
  ],
  'Lingerie & Innerwear': [
    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1617952236317-0bd127407984?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1540206395-68808572332f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1558969479-a8a1f11bd4db?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&q=85',
  ],
  'Froks': [
    'https://images.unsplash.com/photo-1623609163859-ca93c959b98f?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1558171813-0d853f9e5f4a?w=600&h=600&fit=crop&q=85',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop&q=85',
  ],
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop&q=85',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop&q=85',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop&q=85',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop&q=85',
];

// ─── Parse & Patch ──────────────────────────────────────────────────────────
let content = fs.readFileSync(FILE, 'utf8');

// Detect line endings
const hasCRLF = content.includes('\r\n');
// Normalize to LF for clean processing
const normalized = content.replace(/\r\n/g, '\n');

const subCounters = {};
const lines = normalized.split('\n');

let inWomenFashion = false;
let currentSub = null;

const result = lines.map((rawLine) => {
  // Trim trailing \r just in case
  const line = rawLine.replace(/\r$/, '');

  // Detect entering a Women fashion product
  if (line.includes("category: 'Women fashion'")) {
    inWomenFashion = true;
  } else if (inWomenFashion && /(?<![a-z])category:\s*'(?!Women fashion)/.test(line)) {
    // Leaving Women fashion
    inWomenFashion = false;
    currentSub = null;
  }

  if (inWomenFashion) {
    // Capture subcategory
    const subMatch = line.match(/subcategory:\s*'(.+?)'/);
    if (subMatch) {
      currentSub = subMatch[1];
      if (!(currentSub in subCounters)) subCounters[currentSub] = 0;
    }

    if (currentSub) {
      const pool = SUBCATEGORY_IMAGES[currentSub] || FALLBACK_IMAGES;

      // Replace `images: [...]` line
      if (/images:\s*\[/.test(line)) {
        const idx = subCounters[currentSub] % pool.length;
        const idx2 = (subCounters[currentSub] + 1) % pool.length;
        const img1 = pool[idx];
        const img2 = pool[idx2];
        subCounters[currentSub]++;
        return rawLine.replace(/images:\s*\[.*?\]/, `images: ['${img1}', '${img2}']`);
      }

      // Replace `image: '...'` line (single image field, not images array)
      if (/^\s+image:\s*'https?:\/\//.test(line)) {
        const idx = subCounters[currentSub] % pool.length;
        const img = pool[idx];
        subCounters[currentSub]++;
        return rawLine.replace(/image:\s*'[^']*'/, `image: '${img}'`);
      }
    }
  }

  return rawLine;
});

// Restore CRLF if original had it
const output = result.join(hasCRLF ? '\r\n' : '\n');
fs.writeFileSync(FILE, output, 'utf8');

console.log('✅ Women fashion images patched successfully!');
console.log('Subcategory counters:', subCounters);
