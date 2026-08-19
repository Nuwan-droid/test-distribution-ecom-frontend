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


import NewArrivals from '../../components/home/NewArrivals';
import HotSellingProducts from '../../components/home/HotSellingProducts';
import HomeImageSlider from '../../components/common/ImageSlider';
import ShopByCategory from '../../components/home/ShopByCategory';
import FlashDeals from '../../components/home/FlashDeals';

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

  return (
    <Box>
      <HomeImageSlider customBanners={banners} />

      {/* ===== Shop By Category ===== */}
      <ShopByCategory />

      {/* ===== Flash Deals ===== */}
      <FlashDeals />

      {/* ===== Hot Selling Products ===== */}
      <HotSellingProducts products={hotSellingProducts} />

      {/* ===== Category Spotlight Banners ===== */}
      <SpotlightBanner layout="three-columns" />

      {/* ===== New Arrivals ===== */}
      <NewArrivals products={newArrivals} />

    </Box>
  );
}
