import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Snackbar, Alert } from '@mui/material';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

import ProductHeaderSection from './productinfo/ProductHeaderSection';
import SizeSelector from './productinfo/SizeSelector';
import AddToCartSection from './productinfo/AddToCartSection';

export default function ProductInfo({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, msg: '', error: false });

  useEffect(() => {
    setSelectedSize(null);
    setQuantity(1);
  }, [product.id]);

  const inWishlist = isInWishlist(product.id);
  const isApparelOrHasSizes = product.category === 'Women fashion' ||
                              product.category === 'Women' ||
                              product.category === 'Fashion' ||
                              product.category === 'Men' ||
                              (product.sizes && product.sizes.length > 0);

  const currentStock = isApparelOrHasSizes ? (selectedSize?.stock || 0) : (product.stock || 10);

  const handleAddToCart = () => {
    if (isApparelOrHasSizes && !selectedSize) {
      setSnackbar({ open: true, msg: 'Please select a size first.', error: true });
      return;
    }
    const cartProduct = isApparelOrHasSizes
      ? { ...product, selectedSize: selectedSize.size, name: `${product.name} (${selectedSize.size})` }
      : product;
    for (let i = 0; i < quantity; i++) addToCart(cartProduct);
    setSnackbar({ open: true, msg: `${quantity}x ${product.name} added to cart!`, error: false });
  };

  const handleBuyNow = () => {
    if (isApparelOrHasSizes && !selectedSize) {
      setSnackbar({ open: true, msg: 'Please select a size first.', error: true });
      return;
    }
    const cartProduct = isApparelOrHasSizes
      ? { ...product, selectedSize: selectedSize.size, name: `${product.name} (${selectedSize.size})` }
      : product;
    for (let i = 0; i < quantity; i++) addToCart(cartProduct);
    navigate('/checkout');
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: { xs: '100%', sm: '100%', md: 480, lg: 520, xl: 560 } }}>
      {/* Product Details Header Section (Breadcrumbs, Title, Price, Description, Features, Wishlist / Size Guide) */}
      <Box>
        <ProductHeaderSection
          product={product}
          inWishlist={inWishlist}
          toggleWishlist={toggleWishlist}
        />

        {/* Size Selector Section (XS, SM, LG, XL selecting buttons without size type) */}
        <SizeSelector
          product={product}
          selectedSize={selectedSize}
          onSelectSize={(sizeObj) => {
            setSelectedSize(sizeObj);
            setQuantity(1);
          }}
        />

        {/* Add To Cart & Proceed to Checkout Section (Quantity, Add to Cart, Buy Now) */}
        <AddToCartSection
          quantity={quantity}
          setQuantity={setQuantity}
          currentStock={currentStock}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.error ? "error" : "success"} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ borderRadius: 0 }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
