// 420+ new curated products across the 5 new shops and their subcategories
const templates = {
  'Bags & Luggage': {
    brands: ['Samsonite', 'American Tourister', 'Herschel', 'Tumi', 'Wildcraft', 'Delsey'],
    subcategories: {
      'Backpacks': {
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop',
        ],
        names: ['Urban Explorer Tech Backpack', 'Pro Commuter Travel Backpack', 'Waterproof Trekking Daypack', 'Minimalist Everyday Rucksack', 'Ergonomic Laptop Backpack', 'Voyager Multi-Pocket Pack', 'Tactical Gear Backpack', 'Classic Canvas College Bag'],
      },
      'Travel Luggage': {
        images: [
          'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=600&fit=crop',
        ],
        names: ['Hardside Spinner Luggage 28in', 'Lightweight Carry-on Trolley Case', 'Premium Aluminum Cabin Luggage', 'Expandable Hardshell Suitcase', 'Featherlight TSA Luggage', 'Executive Travel Spinner Case', 'Ultra-Durable Polycarbonate Suitcase', 'Classic 2-Piece Travel Set'],
      },
      'Handbags': {
        images: [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
        ],
        names: ['Luxury Leather Tote Bag', 'Designer Crossbody Shoulder Bag', 'Quilted Evening Handbag', 'Classic Structured Satchel Bag', 'Chic Woven Leather Tote', 'Minimalist Bucket Bag', 'Elegant Top-Handle purse', 'Soft Suede Hobo Bag'],
      },
      'Duffel Bags': {
        images: [
          'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
        ],
        names: ['Heavy-Duty Gym Duffel Bag', 'Weekend Travel Leather Duffel', 'Water-Resistant Sports Holdall', 'Convertible Duffel Backpack', 'Classic Canvas Weekender Bag', 'Compact Flight Duffel', 'Adventure Travel Holdall', 'Pro Athlete Locker Bag'],
      },
      'Messenger Bags': {
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
        ],
        names: ['Executive Leather Messenger Bag', 'Rugged Canvas Courier Bag', 'Slim Tech Laptop Satchel', 'Waterproof Cycling Messenger Bag', 'Vintage Flap-Over Crossbody Bag', 'Modern Urban Shoulder Bag', 'Business Commuter Portfolio Bag', 'Compact Crossbody Organizer'],
      },
      'Accessories': {
        images: [
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop',
        ],
        names: ['Digital Luggage Scale & Strap', 'Premium Leather Passport Holder', 'TSA Approved Cable Lock Set', 'Waterproof Travel Packing Cubes', 'Memory Foam Travel Neck Pillow', 'RFID Blocking Travel Wallet', 'Universal Airport Adapter Kit', 'Compression Packing Pouch Set'],
      },
    },
  },
  'Footwear': {
    brands: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok', 'Vans', 'Clarks'],
    subcategories: {
      'Sneakers': {
        images: [
          'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop',
        ],
        names: ['Air Velocity Urban Sneakers', 'Classic Retro Low-Top Sneakers', 'Street Style High-Top Kicks', 'Minimalist Leather Court Shoes', 'Pro Cushioned Lifestyle Sneakers', 'Vintage Suede Walkers', 'Chunky Sole Street Kicks', 'Ultra-Light Breathable Sneakers'],
      },
      'Running Shoes': {
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
        ],
        names: ['Ultra Boost Marathon Runners', 'Gel Cushioning Trail Shoes', 'Carbon Plate Racing Footwear', 'Responsive Foam Jogging Shoes', 'All-Terrain Trail Running Kicks', 'Featherlight Speed Runners', 'Endurance Stride Shoes', 'Dynamic Cushion Running Shoes'],
      },
      'Boots': {
        images: [
          'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=600&h=600&fit=crop',
        ],
        names: ['Rugged All-Weather Hiking Boots', 'Classic Chelsea Leather Boots', 'Waterproof Combat Boots', 'Suede Ankle Dress Boots', 'Insulated Winter Snow Boots', 'Handcrafted Welted Boots', 'Tactical Patrol Footwear', 'Urban Utility Lace-Up Boots'],
      },
      'Casual Loafers': {
        images: [
          'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=600&fit=crop',
        ],
        names: ['Premium Suede Driving Loafers', 'Classic Penny Leather Loafers', 'Slip-on Breathable Boat Shoes', 'Hand-Stitched Leather Loafers', 'Flexible Comfort Moc Shoes', 'Smart Casual Tassel Loafers', 'Ultra-Soft Velour Slip-ons', 'Weekend Casual Leather Shoes'],
      },
      'Sandals & Sliders': {
        images: [
          'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop',
        ],
        names: ['Ergonomic Comfort Slide Sandals', 'Leather Strap Beach Sandals', 'Cushioned Recovery Sliders', 'All-Terrain Adventure Sandals', 'Minimalist Urban Flip-Flops', 'Contoured Footbed Sandals', 'Water-Resistant Pool Sliders', 'Classic Buckle Sandals'],
      },
      'Formal Shoes': {
        images: [
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=600&fit=crop',
        ],
        names: ['Handcrafted Oxford Formal Shoes', 'Classic Leather Derby Dress Shoes', 'Double Monk Strap Italian Shoes', 'Brogue Detail Leather Oxfords', 'Executive Cap-Toe Formal Shoes', 'Full-Grain Calfskin Dress Shoes', 'Slim Profile Wedding Oxfords', 'Luxury Patent Leather Shoes'],
      },
    },
  },
  'Birthday Gifts': {
    brands: ['Archies', 'Ferns N Petals', 'Fossil', 'Titan', 'Swarovski', 'Cadbury'],
    subcategories: {
      'Gift Hampers': {
        images: [
          'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=600&fit=crop',
        ],
        names: ['Deluxe Gourmet Celebration Hamper', 'Luxury Chocolate & Truffle Gift Box', 'Wellness & Spa Pamper Set', 'Artisan Coffee & Mug Gift Hamper', 'Birthday Party Surprise Box', 'Premium Tea & Honey Selection Set', 'Custom Engraved Keepsake Box', 'Organic Fruit & Nuts Gift Treat'],
      },
      'Watches': {
        images: [
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop',
        ],
        names: ['Classic Stainless Chronograph Watch', 'Minimalist Gold-Plated Dress Watch', 'Luxury Skeleton Automatic Watch', 'Elegant Rose Gold Diamond Watch', 'Vintage Leather Strap Chronograph', 'Ultra-Slim Quartz Designer Watch', 'Sporty Multi-Function Wristwatch', 'Titanium Case Sapphire Crystal Watch'],
      },
      'Jewelry': {
        images: [
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
        ],
        names: ['Sterling Silver Solitaire Pendant', 'Diamond Accent Huggie Earrings', '925 Silver Charm Bracelet', 'Rose Gold Infinity Necklace', 'Classic Cultured Pearl Set', 'Minimalist Geometric Gold Ring', 'Layered Chain Dangle Bracelet', 'Sparkling Cubic Zirconia Necklace'],
      },
      'Perfumes': {
        images: [
          'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=600&fit=crop',
        ],
        names: ['Eau De Parfum Luxury Bloom 100ml', 'Midnight Amber Cologne 75ml', 'Citrus Breeze Intense Perfume', 'Oud Wood Royal Essence Eau De Parfum', 'Velvet Vanilla & Rose Fragrance', 'Ocean Mist Refreshing Cologne', 'Sensual Musk Eau De Toilette', 'Signature Blend Fragrance Gift Box'],
      },
      'Smart Gadgets': {
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop',
        ],
        names: ['Wireless Charging LED Desk Lamp', 'Smart Bluetooth Speaker with Clock', 'Pocket Instant Photo Printer', 'Aroma Diffuser with Mood Lights', 'Compact Ergonomic Power Bank', 'Smart Home Sensor Kit', 'Portable Mini Video Projector', 'Digital Photo Frame with Wi-Fi'],
      },
      'Accessories': {
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop',
        ],
        names: ['Engraved Wooden Keepsake Album', 'Personalized Leather Keychain Set', 'Luxury Silk Eye Mask & Pillowcase', 'Crystal Tabletop Centerpiece', 'Hand-Poured Scented Soy Candle Set', 'Luxury Monogrammed Travel Wallet', 'Gold Accent Desk Accessory Tray', 'Velvet Jewelry Storage Box'],
      },
    },
  },
  'Pet Supplies': {
    brands: ['Pedigree', 'Royal Canin', 'Whiskas', 'Kong', 'FurHaven', 'PetSafe'],
    subcategories: {
      'Pet Food': {
        images: [
          'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=600&fit=crop',
        ],
        names: ['Premium Salmon Dog Kibble 5kg', 'Organic Grain-Free Adult Cat Food', 'Nutritious Beef & Rice Dog Meal', 'High-Protein Puppy Starter Kibble', 'Specialty Hairball Control Cat Diet', 'Dental Health Chews for Dogs 500g', 'Gourmet Tuna Wet Cat Food 12-Pack', 'Natural Freeze-Dried Dog Treats'],
      },
      'Dog Toys': {
        images: [
          'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&h=600&fit=crop',
        ],
        names: ['Indestructible Rubber Chew Toy', 'Interactive Treat Dispensing Ball', 'Plush Squeaker Toy Dog Pack', 'Heavy-Duty Cotton Rope Tug Toy', 'Flying Disc Fetch Toy for Dogs', 'Dental Clean Rubber Bone', 'Agility Training Ring Toy', 'Interactive Puzzle Toy for Dogs'],
      },
      'Cat Care': {
        images: [
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop',
        ],
        names: ['Multi-Level Cat Tree & Scratching Post', 'Self-Cleaning Litter Box Enclosure', 'Feather Wand & Laser Toy Set', 'Natural Clumping Clay Cat Litter 10kg', 'Catnip Infused Interactive Plush Toy', 'Wall-Mounted Cat Hammock Shelf', 'Ergonomic Elevated Cat Feeding Bowl', 'Automatic Water Fountain for Cats'],
      },
      'Pet Beds': {
        images: [
          'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
        ],
        names: ['Orthopedic Memory Foam Pet Bed', 'Donut Calming Plush Dog Bed', 'Self-Warming Cozy Cat Cave Bed', 'Waterproof Outdoor Kennel Bed', 'Elevated Cooling Cot for Dogs', 'Luxury Velvet Sofa Bed for Pets', 'Washable Sherpa Fleece Blanket', 'Soft Nest Bed for Puppies'],
      },
      'Grooming': {
        images: [
          'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
        ],
        names: ['Self-Cleaning Slicker Deshedding Brush', 'Gentle Oatmeal Pet Shampoo 500ml', 'Professional Stainless Nail Clipper Set', 'Dual-Sided Undercoat Rake Comb', 'Cordless Quiet Pet Hair Clippers', 'Absorbent Microfiber Dog Bath Towel', 'Herbal Ear & Eye Wipe Wash Tub', 'Leave-In Conditioning Pet Spray'],
      },
      'Pet Collars': {
        images: [
          'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
        ],
        names: ['Reflective Padded Nylon Dog Collar', 'Reflective No-Pull Dog Harness Set', 'Genuine Leather Personalized Pet Collar', 'Retractable Dog Leash 5-Meter', 'LED Safety Glowing Night Collar', 'Air-Mesh Breathable Puppy Harness', 'Heavy-Duty Tactical Dog Leash', 'Soft Neoprene Comfort Collar'],
      },
    },
  },
  'School Supplies': {
    brands: ['Faber-Castell', 'Pilot', 'Mead', 'JanSport', 'Casio', 'Staedtler', 'Oxford'],
    subcategories: {
      'School Backpacks': {
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=600&fit=crop',
        ],
        names: ['Ergonomic Student Backpack with Tablet Pocket', 'Classic Multi-Compartment School Bag', 'Waterproof College Backpack with USB', 'Lightweight Daypack for Students', 'Reflective Safety Junior Backpack', 'Roller Trolley School Backpack', 'Minimalist Laptop School Bag', 'Heavy-Duty Campus Book Bag'],
      },
      'Notebooks': {
        images: [
          'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop',
        ],
        names: ['Hardcover Ruled Subject Notebook 5-Pack', 'Spiral College-Ruled Journal 200 Pages', 'Premium Composition Book Set', 'Dotted Grid Bullet Journal 160gsm', 'Recycled Eco-Friendly Notepad Bundle', 'Leatherette Bound Academic Planner', 'Lab Record Book with Numbered Pages', 'Pocket Memo Pad 10-Pack'],
      },
      'Stationery & Pens': {
        images: [
          'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
        ],
        names: ['Gel Ink Pens 0.5mm 12-Color Set', 'Retractable Ballpoint Pen Economy Box', 'Pastel Highlighter Markers 6-Pack', 'Mechanical Pencil Set with Refills', 'Permanent Marker Precision Set', 'Fine-Liner Drawing Pens 10-Pack', 'Dust-Free Eraser & Sharpener Kit', 'Metallic Gel Pen Assorted Box'],
      },
      'Organizers': {
        images: [
          'https://images.unsplash.com/photo-1507842229356-51c618c64115?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
        ],
        names: ['Expandable Accordion Document Folder', '3-Ring Binder Organizer with Tabs', 'Desktop Mesh Pencil Holder Box', 'Transparent Exam Pencil Case Pouch', 'Desk Drawer Storage Organizer Tray', 'Wall Calendar Academic Year Planner', 'Magnetic Whiteboard Organizer Sheet', 'Zippered Canvas Pencil Case'],
      },
      'Art Supplies': {
        images: [
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=600&fit=crop',
        ],
        names: ['Watercolor Artist Paint Set 24-Colors', 'Professional Soft Pastel Crayon Box', 'Colored Pencils 48-Shade Tin Case', 'Artist Sketchbook 300gsm Heavy Paper', 'Acrylic Paint Tubes 12x20ml Kit', 'Assorted Paint Brushes Synthetic Set', 'Calligraphy Brush Pens 8-Pack', 'Charcoal Drawing Pencil Set'],
      },
      'Study Gadgets': {
        images: [
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
        ],
        names: ['Advanced Scientific Calculator FX-Pro', 'Rechargeable LED Desk Study Lamp', 'Digital Voice Recorder for Lectures', 'Noise-Isolating Study Headphones', 'Ergonomic Adjustable Laptop Stand', 'Digital Countdown Timer for Focus', 'Wireless Ergonomic Mouse for Students', 'Compact USB Flash Drive 64GB 2-Pack'],
      },
    },
  },
};

const newCategoryProducts = [];
let nextId = 2600;

Object.entries(templates).forEach(([category, catData]) => {
  const { brands, subcategories } = catData;

  Object.entries(subcategories).forEach(([subcategory, subData]) => {
    const { images, names } = subData;

    // Generate 14 distinct products per subcategory => 14 * 6 subcategories = 84 per category => 84 * 5 = 420 products total!
    for (let i = 0; i < 14; i++) {
      const baseName = names[i % names.length];
      const editionNumber = Math.floor(i / names.length) + 1;
      const productName = editionNumber > 1 ? `${baseName} - Ed. ${editionNumber}` : baseName;
      const img = images[i % images.length];
      const brand = brands[i % brands.length];

      const price = Math.floor(Math.random() * 120) + 18;
      const originalPrice = price + Math.floor(Math.random() * 60) + 15;
      const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
      const rating = Number((4.1 + Math.random() * 0.8).toFixed(1));
      const reviews = Math.floor(Math.random() * 850) + 24;
      const stock = Math.floor(Math.random() * 80) + 12;
      const isFeatured = i === 0 || i === 3 || i === 7;
      const isNew = i === 1 || i === 4 || i === 8;
      const isBestSeller = i === 2 || i === 5 || i === 9;

      newCategoryProducts.push({
        id: nextId++,
        name: productName,
        category: category,
        subcategory: subcategory,
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        rating: rating,
        reviews: reviews,
        stock: stock,
        image: img,
        images: [img, images[(i + 1) % images.length]],
        description: `Premium quality ${productName.toLowerCase()} designed for durability, style, and everyday comfort. Built with top-grade materials for outstanding performance.`,
        features: ['High durability materials', 'Ergonomic functional design', 'Easy care & maintenance', 'Backed by brand warranty'],
        brand: brand,
        isFeatured: isFeatured,
        isNew: isNew,
        isBestSeller: isBestSeller,
        tags: [category.toLowerCase(), subcategory.toLowerCase(), 'new-collection', brand.toLowerCase()],
      });
    }
  });
});

export default newCategoryProducts;
