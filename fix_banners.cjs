const fs = require('fs');

let content = fs.readFileSync('src/data/products.js', 'utf8');

// Find the start of the wf-1 object
const wfStart = content.indexOf("// Women's Fashion Products");

if (wfStart !== -1) {
  // Extract the wf objects up to the end of the banners array
  const endOfBanners = content.lastIndexOf("];", content.length);
  // Wait, there might be other ]; at the very end. Let's find the specific block.
  
  // Actually, we can just replace the whole banners block.
  const bannersStart = content.indexOf('export const banners = [');
  const bannersEnd = content.indexOf('];\n\n\nexport default products;', bannersStart);
  
  if (bannersStart !== -1 && bannersEnd !== -1) {
    const bannersContent = content.substring(bannersStart, bannersEnd + 2);
    
    // We want to keep hero-banner-2 to hero-banner-5.
    const newBannersContent = `export const banners = [
  {
    id: 'hero-banner-2',
    categoryId: 'Electronics',
    title: 'Tech Essentials',
    subtitle: 'Upgrade your lifestyle with the latest gadgets and smart devices.',
    cta: 'Explore Electronics',
    link: '/products?category=Electronics',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1600&h=600&fit=crop&q=90',
  },
  {
    id: 'hero-banner-3',
    categoryId: 'Women fashion',
    title: 'New Arrivals 2026',
    subtitle: 'Explore the hottest trends and seasonal collections for your wardrobe.',
    cta: 'Discover New',
    link: '/products?category=Women+fashion',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1600&h=600&fit=crop&q=90',
  },
  {
    id: 'hero-banner-4',
    categoryId: 'Home',
    title: 'Free Delivery on $150+',
    subtitle: 'Upgrade your living space with our premium home collections.',
    cta: 'Start Shopping',
    link: '/products',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=600&fit=crop&q=90',
  },
  {
    id: 'hero-banner-5',
    categoryId: 'Sports',
    title: 'Built for Every Season',
    subtitle: 'Gear up for your next adventure with our top-rated sports equipment.',
    cta: 'Shop Outdoors',
    link: '/products?category=Sports',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&h=600&fit=crop&q=90',
  }
];`;

    // Extract the women's fashion products string
    const wfProductsStr = `  // Women's Fashion Products
  {
    id: 'wf-1',
    name: 'Elegant Summer Dress',
    category: 'Women fashion',
    price: 89,
    originalPrice: 129,
    discount: 31,
    rating: 4.8,
    reviews: 124,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80'],
    description: 'A beautiful and breathable summer dress.',
    brand: 'Luxe Wear',
    isFeatured: true,
    isNew: true,
    tags: ['dress', 'summer', 'fashion'],
  },
  {
    id: 'wf-2',
    name: 'Classic Trench Coat',
    category: 'Women fashion',
    price: 199,
    originalPrice: 250,
    discount: 20,
    rating: 4.9,
    reviews: 312,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop'],
    description: 'A timeless trench coat for any season.',
    brand: 'Chic Style',
    isFeatured: true,
    isNew: true,
    tags: ['coat', 'outerwear', 'fashion'],
  },
  {
    id: 'wf-3',
    name: 'Casual Denim Jacket',
    category: 'Women fashion',
    price: 75,
    originalPrice: 95,
    discount: 21,
    rating: 4.7,
    reviews: 89,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=800&fit=crop'],
    description: 'Comfortable denim jacket perfect for layering.',
    brand: 'Urban Denim',
    isFeatured: true,
    isNew: true,
    tags: ['jacket', 'denim', 'casual'],
  },
  {
    id: 'wf-4',
    name: 'Silk Blouse',
    category: 'Women fashion',
    price: 120,
    originalPrice: 150,
    discount: 20,
    rating: 4.6,
    reviews: 45,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80'],
    description: 'Premium silk blouse for professional wear.',
    brand: 'Luxe Wear',
    isFeatured: true,
    isNew: true,
    tags: ['blouse', 'silk', 'workwear'],
  },
  {
    id: 'wf-5',
    name: 'Floral Midi Skirt',
    category: 'Women fashion',
    price: 65,
    originalPrice: 85,
    discount: 23,
    rating: 4.8,
    reviews: 112,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop'],
    description: 'Lightweight floral midi skirt.',
    brand: 'Chic Style',
    isFeatured: true,
    isNew: true,
    tags: ['skirt', 'floral', 'summer'],
  },
  {
    id: 'wf-6',
    name: 'Leather Crossbody Bag',
    category: 'Women fashion',
    price: 145,
    originalPrice: 180,
    discount: 19,
    rating: 4.9,
    reviews: 200,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=800&fit=crop'],
    description: 'Genuine leather crossbody bag for daily use.',
    brand: 'Luxe Wear',
    isFeatured: true,
    isNew: true,
    tags: ['bag', 'accessories', 'leather'],
  }`;

    // Replace the banners block
    content = content.replace(bannersContent, newBannersContent);

    // Insert the wf products into the main products array, just before it closes
    const productsEnd = content.indexOf('];\n\nproducts.push(...newCategoryProducts);');
    if (productsEnd !== -1) {
      content = content.substring(0, productsEnd) + ",\n" + wfProductsStr + "\n" + content.substring(productsEnd);
    }

    fs.writeFileSync('src/data/products.js', content, 'utf8');
    console.log("Successfully fixed products.js banners and women's products!");
  } else {
    console.log("Could not find banners block.");
  }
} else {
  console.log("Could not find Women's Fashion Products.");
}
