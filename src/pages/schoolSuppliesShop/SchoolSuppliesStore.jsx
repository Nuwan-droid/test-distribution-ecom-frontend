import React from 'react';
import StorePageLayout from '../../components/common/StorePageLayout';
import products from '../../data/products';

export default function SchoolSuppliesStore() {
  const getProducts = (predicate, count = 5) => {
    const filtered = products.filter(p => p.stock !== 0 && predicate(p));
    if (filtered.length >= count) return filtered.slice(0, count);
    const others = products.filter(p => p.stock !== 0 && !filtered.includes(p));
    return [...filtered, ...others].slice(0, count);
  };

  const newArrivals = getProducts(p =>
    (p.category && p.category.toLowerCase().includes('school')) ||
    (p.category && p.category.toLowerCase().includes('stationery')) ||
    (p.name && p.name.toLowerCase().includes('school')) ||
    (p.name && p.name.toLowerCase().includes('pen')) ||
    (p.name && p.name.toLowerCase().includes('notebook'))
  );

  const featured = getProducts(p =>
    (p.isFeatured || p.rating >= 4.5) &&
    ((p.category && p.category.toLowerCase().includes('school')) ||
     (p.category && p.category.toLowerCase().includes('stationery')) ||
     (p.name && p.name.toLowerCase().includes('school')) ||
     (p.name && p.name.toLowerCase().includes('book')))
  );

  const banners = [
    {
      id: 1,
      title: 'School Supplies Essentials',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=school',
      cta: 'Shop Back to School',
    },
    {
      id: 2,
      title: 'STATIONERY, BACKPACKS & ACCESSORIES',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=600&fit=crop&q=90',
      link: '/products?search=stationery',
      cta: 'Explore All',
    },
  ];

  const categories = [
    { title: 'School Backpacks', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', filterVal: 'backpack' },
    { title: 'Notebooks', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=500&fit=crop', filterVal: 'notebook' },
    { title: 'Stationery & Pens', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=500&fit=crop', filterVal: 'pen' },
    { title: 'Organizers', image: 'https://images.unsplash.com/photo-1507842229356-51c618c64115?w=400&h=500&fit=crop', filterVal: 'organizer' },
    { title: 'Art Supplies', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=500&fit=crop', filterVal: 'art' },
    { title: 'Study Gadgets', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=500&fit=crop', filterVal: 'gadget' },
  ];

  return (
    <StorePageLayout
      banners={banners}
      newArrivals={newArrivals}
      featuredProducts={featured}
      categories={categories}
      mainCategory="School Supplies"
      storeName="SCHOOL SUPPLIES"
      tagline="ESSENTIALS FOR EVERY STUDENT"
    />
  );
}
