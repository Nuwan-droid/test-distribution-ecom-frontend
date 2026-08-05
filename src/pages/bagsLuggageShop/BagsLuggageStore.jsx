import React from 'react';
import StorePageLayout from '../../components/common/StorePageLayout';
import products from '../../data/products';

export default function BagsLuggageStore() {
  const getProducts = (predicate, count = 5) => {
    const filtered = products.filter(predicate);
    if (filtered.length >= count) return filtered.slice(0, count);
    const others = products.filter(p => !filtered.includes(p));
    return [...filtered, ...others].slice(0, count);
  };

  const newArrivals = getProducts(p =>
    (p.category && p.category.toLowerCase().includes('bag')) ||
    (p.name && p.name.toLowerCase().includes('bag')) ||
    (p.name && p.name.toLowerCase().includes('backpack')) ||
    (p.name && p.name.toLowerCase().includes('luggage'))
  );

  const featured = getProducts(p =>
    (p.isFeatured || p.rating >= 4.5) &&
    ((p.category && p.category.toLowerCase().includes('bag')) ||
     (p.name && p.name.toLowerCase().includes('bag')) ||
     (p.name && p.name.toLowerCase().includes('travel')) ||
     (p.name && p.name.toLowerCase().includes('case')))
  );

  const banners = [
    {
      id: 1,
      title: 'Bags & Luggage Collections',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=bag',
      cta: 'Explore Bags',
    },
    {
      id: 2,
      title: 'TRAVEL & UTILITY ESSENTIALS',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=luggage',
      cta: 'Shop Now',
    },
  ];

  const categories = [
    { title: 'Backpacks', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', filterVal: 'backpack' },
    { title: 'Travel Luggage', image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=500&fit=crop', filterVal: 'luggage' },
    { title: 'Handbags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop', filterVal: 'handbag' },
    { title: 'Duffel Bags', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=500&fit=crop', filterVal: 'duffel' },
    { title: 'Messenger Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop', filterVal: 'messenger' },
    { title: 'Accessories', image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=500&fit=crop', filterVal: 'travel' },
  ];

  return (
    <StorePageLayout
      banners={banners}
      newArrivals={newArrivals}
      featuredProducts={featured}
      categories={categories}
      mainCategory="Bags & Luggage"
      storeName="BAGS & LUGGAGE STORE"
      tagline="LUXURY TRAVEL & EVERYDAY CARRY"
    />
  );
}
