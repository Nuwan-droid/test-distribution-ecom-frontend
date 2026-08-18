import React from 'react';
import StorePageLayout from '../../components/common/StorePageLayout';
import products from '../../data/products';

export default function PetSuppliesStore() {
  const getProducts = (predicate, count = 5) => {
    const filtered = products.filter(p => p.stock !== 0 && predicate(p));
    if (filtered.length >= count) return filtered.slice(0, count);
    const others = products.filter(p => p.stock !== 0 && !filtered.includes(p));
    return [...filtered, ...others].slice(0, count);
  };

  const newArrivals = getProducts(p =>
    (p.category && p.category.toLowerCase().includes('pet')) ||
    (p.name && p.name.toLowerCase().includes('pet')) ||
    (p.name && p.name.toLowerCase().includes('dog')) ||
    (p.name && p.name.toLowerCase().includes('cat'))
  );

  const featured = getProducts(p =>
    (p.isFeatured || p.rating >= 4.5) &&
    ((p.category && p.category.toLowerCase().includes('pet')) ||
     (p.name && p.name.toLowerCase().includes('pet')) ||
     (p.name && p.name.toLowerCase().includes('dog')) ||
     (p.name && p.name.toLowerCase().includes('cat')))
  );

  const banners = [
    {
      id: 1,
      title: 'Pet Supplies & Accessories',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=pet',
      cta: 'Shop Pet Care',
    },
    {
      id: 2,
      title: 'EVERYTHING FOR YOUR BEST FRIENDS',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=dog',
      cta: 'Explore All',
    },
  ];

  const categories = [
    { title: 'Pet Food', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=500&fit=crop', filterVal: 'food' },
    { title: 'Dog Toys', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=500&fit=crop', filterVal: 'toy' },
    { title: 'Cat Care', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=500&fit=crop', filterVal: 'cat' },
    { title: 'Pet Beds', image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=400&h=500&fit=crop', filterVal: 'bed' },
    { title: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=500&fit=crop', filterVal: 'groom' },
    { title: 'Pet Collars', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=500&fit=crop', filterVal: 'collar' },
  ];

  return (
    <StorePageLayout
      banners={banners}
      newArrivals={newArrivals}
      featuredProducts={featured}
      categories={categories}
      mainCategory="Pet Supplies"
      storeName="PET CARE & LUXURY SUPPLIES"
      tagline="NUTRITION, COMFORT & PLAYTIME"
    />
  );
}
