import React from 'react';
import StorePageLayout from '../../components/common/StorePageLayout';
import products from '../../data/products';

export default function BirthdayStore() {
  const getProducts = (predicate, count = 5) => {
    const filtered = products.filter(predicate);
    if (filtered.length >= count) return filtered.slice(0, count);
    const others = products.filter(p => !filtered.includes(p));
    return [...filtered, ...others].slice(0, count);
  };

  const newArrivals = getProducts(p =>
    (p.category && p.category.toLowerCase().includes('gift')) ||
    (p.category && p.category.toLowerCase().includes('jewel')) ||
    (p.category && p.category.toLowerCase().includes('watch')) ||
    (p.name && p.name.toLowerCase().includes('gift')) ||
    (p.name && p.name.toLowerCase().includes('watch'))
  );

  const featured = getProducts(p =>
    (p.isFeatured || p.rating >= 4.6) &&
    ((p.category && p.category.toLowerCase().includes('gift')) ||
     (p.category && p.category.toLowerCase().includes('electronics')) ||
     (p.name && p.name.toLowerCase().includes('gift')) ||
     (p.name && p.name.toLowerCase().includes('watch')))
  );

  const banners = [
    {
      id: 1,
      title: 'Make Birthdays Extra Special',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=gift',
      cta: 'Explore Gifts',
    },
    {
      id: 2,
      title: 'THOUGHTFUL & UNIQUE GIFTS',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1530103862676-de8892b12fa4?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=gift',
      cta: 'Shop Gifts Now',
    },
  ];

  const categories = [
    { title: 'Gift Hampers', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=500&fit=crop', filterVal: 'gift' },
    { title: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop', filterVal: 'watch' },
    { title: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop', filterVal: 'jewelry' },
    { title: 'Perfumes', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop', filterVal: 'perfume' },
    { title: 'Smart Gadgets', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop', filterVal: 'gadget' },
    { title: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop', filterVal: 'accessory' },
  ];

  return (
    <StorePageLayout
      banners={banners}
      newArrivals={newArrivals}
      featuredProducts={featured}
      categories={categories}
      mainCategory="Birthday Gifts"
      storeName="BIRTHDAY GIFTS BOUTIQUE"
      tagline="CELEBRATE IN LUXURY & STYLE"
    />
  );
}
