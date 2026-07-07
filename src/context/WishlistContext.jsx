import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  });

  const addToWishlist = (product) => {
    const updated = [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(i => i.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const isInWishlist = (id) => wishlist.some(i => i.id === id);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
