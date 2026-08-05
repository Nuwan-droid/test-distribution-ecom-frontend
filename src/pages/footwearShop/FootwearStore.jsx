import React from 'react';
import StorePageLayout from '../../components/common/StorePageLayout';
import products from '../../data/products';

export default function FootwearStore() {
  const getProducts = (predicate, count = 5) => {
    const filtered = products.filter(predicate);
    if (filtered.length >= count) return filtered.slice(0, count);
    const others = products.filter(p => !filtered.includes(p));
    return [...filtered, ...others].slice(0, count);
  };

  const newArrivals = getProducts(p =>
    (p.category && p.category.toLowerCase().includes('footwear')) ||
    (p.subcategory && p.subcategory.toLowerCase().includes('shoe')) ||
    (p.name && p.name.toLowerCase().includes('shoe')) ||
    (p.name && p.name.toLowerCase().includes('sneaker')) ||
    (p.name && p.name.toLowerCase().includes('boot'))
  );

  const featured = getProducts(p =>
    (p.isFeatured || p.rating >= 4.5) &&
    ((p.category && p.category.toLowerCase().includes('footwear')) ||
     (p.name && p.name.toLowerCase().includes('shoe')) ||
     (p.name && p.name.toLowerCase().includes('sneaker')) ||
     (p.name && p.name.toLowerCase().includes('running')))
  );

  const banners = [
    {
      id: 1,
      title: 'Trending Footwear & Sneakers',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=sneaker',
      cta: 'Explore Footwear',
    },
  ];

  const categories = [
    { title: 'Sneakers', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=500&fit=crop', filterVal: 'sneaker' },
    { title: 'Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', filterVal: 'running' },
    { title: 'Boots', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=500&fit=crop', filterVal: 'boot' },
    { title: 'Casual Loafers', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=500&fit=crop', filterVal: 'loafer' },
    { title: 'Sandals & Sliders', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=500&fit=crop', filterVal: 'sandal' },
    { title: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=500&fit=crop', filterVal: 'shoe' },
  ];

  return (
    <StorePageLayout
      banners={banners}
      newArrivals={newArrivals}
      featuredProducts={featured}
      categories={categories}
      mainCategory="Footwear"
      storeName="FOOTWEAR & SNEAKERS"
      tagline="PREMIUM ATHLETIC & CASUAL SHOES"
    />
  );
}
