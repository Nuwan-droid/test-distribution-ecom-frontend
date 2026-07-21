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
import FashionRow from '../../components/home/FashionRow';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import NewArrivals from '../../components/home/NewArrivals';
import HotSellingProducts from '../../components/home/HotSellingProducts';
import HomeImageSlider from '../../components/common/ImageSlider';
import ShopByCategory from '../../components/home/ShopByCategory';
import TrustBadges from '../../components/home/TrustBadges';
import products, { banners } from '../../data/products';



export default function Home() {

  const featuredProducts = products.filter(p => p.isFeatured);
  const newArrivals = products.filter(p => p.isNew);
  const hotSellingProducts = products.slice(0, 8); // Grab first 8 items for Hot Selling, includes out-of-stock items

  return (
    <Box>
      <HomeImageSlider customBanners={banners} />

      {/* ===== Trust Badges ===== */}
      <TrustBadges />

      {/* ===== Spotlight Feature Banner ===== */}
      <SpotlightBanner />

      {/* ===== Fashion Row ===== */}
      <FashionRow />

      {/* ===== Hot Selling Products ===== */}
      <HotSellingProducts products={hotSellingProducts} />

      {/* ===== Featured Products ===== */}
      <FeaturedProducts products={featuredProducts} />

      {/* ===== New Arrivals ===== */}
      <NewArrivals products={newArrivals} />

      {/* ===== Shop By Category ===== */}
      <ShopByCategory />


    </Box>
  );
}
