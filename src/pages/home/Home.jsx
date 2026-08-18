import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Paper, Avatar,
} from '@mui/material';
import {
  ArrowForwardIos, ArrowBackIos, FlashOn, ArrowForward, Star, TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SpotlightBanner from '../../components/home/SpotlightBanner';


import FeaturedProducts from '../../components/home/FeaturedProducts';
import NewArrivals from '../../components/home/NewArrivals';
import HotSellingProducts from '../../components/home/HotSellingProducts';
import HomeImageSlider from '../../components/common/ImageSlider';
import ShopByCategory from '../../components/home/ShopByCategory';

import products, { banners } from '../../data/products';



export default function Home() {

  // Exclude out-of-stock items from homepage — they remain visible on the All Products page
  const inStock = products.filter(p => p.stock !== 0);

  // Shuffle for a mixed variety across sections
  const shuffled = [...inStock].sort(() => Math.random() - 0.5);

  // New Arrivals — only newly added items
  const newArrivals = inStock.filter(p => p.isNew);

  // Hot Selling & Featured — mixed variety from all in-stock products
  const hotSellingProducts = shuffled.slice(0, 8);
  const featuredProducts = shuffled.slice(8, 16);

  return (
    <Box>
      <HomeImageSlider customBanners={banners} />

      {/* ===== Spotlight Feature Banner (Top) ===== */}
      <SpotlightBanner layout="left-large" />

       {/* ===== Hot Selling Products ===== */}
      <HotSellingProducts products={hotSellingProducts} />

      {/* ===== New Spotlight Feature Banner (Bags & Luggage, School Supplies, Pet Supplies) ===== */}
      <SpotlightBanner layout="right-large" />

    

      {/* ===== Featured Products ===== */}
      <FeaturedProducts products={featuredProducts} />

      {/* ===== New Arrivals ===== */}
      <NewArrivals products={newArrivals} />

      {/* ===== Shop By Category ===== */}
      <ShopByCategory />



    </Box>
  );
}
