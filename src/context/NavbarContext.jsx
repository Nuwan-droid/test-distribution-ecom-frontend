import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardGiftcard } from '@mui/icons-material';

/* -------------------------------------------------------------
   STATIC DATA
------------------------------------------------------------- */
export const ALL_DEPARTMENTS = [
  'All Categories',
  'Arts & Crafts',
  'Automotive',
  'Baby',
  'Beauty & Personal Care',
  'Books',
  "Boys' Fashion",
  'Cameras & Photo',
  'Cell Phones & Accessories',
  'Clothing',
  'Computers',
  'Deals',
  'Digital Music',
  'Electronics',
  'Garden & Outdoor',
  "Girls' Fashion",
  'Grocery',
  'Health & Household',
  'Home & Kitchen',
  'Industrial & Scientific',
  'Jewelry',
  'Kindle Store',
  'Luggage',
  "Men's Fashion",
  'Movies & TV',
  'Music, CDs & Vinyl',
  'Office Products',
  'Pet Supplies',
  'Smart Home',
  'Sports & Outdoors',
  'Tools & Home Improvement',
  'Toys & Games',
  'Video Games',
  "Women's Fashion",
];

export const DEPT_SELECT_OPTIONS = [
  'All',
  'Electronics',
  'Fashion',
  'Home',
  'Sports',
  'Beauty',
  'Books',
  'Toys',
];

export const CATEGORY_STRIP = [
  { label: 'Gifts', icon: CardGiftcard, path: '/products?category=Gifts' },
  { label: 'Home Favorites', path: '/products?category=Home+Favorites' },
  { label: 'Fashion Finds',  path: '/products?category=Fashion+Finds' },
  { label: 'Wedding Ideas',  path: '/products?category=Wedding' },
  { label: 'Electronics',    path: '/products?category=Electronics' },
  { label: 'Home & Kitchen', path: '/products?category=Home' },
  { label: 'Beauty',         path: '/products?category=Beauty' },
  { label: 'Toys',           path: '/products?category=Toys' },
  { label: 'Grocery',        path: '/products?category=Grocery' },
  { label: 'Pet Supplies',   path: '/products?category=Pet+Supplies' },
];

/* -------------------------------------------------------------
   COLOUR TOKENS  (minimalistic white-first palette)
------------------------------------------------------------- */
export const NAV_COLORS = {
  white:       '#FFFFFF',
  bg:          '#F5F5F5',
  border:      '#E8E8E8',
  textPrimary: '#111111',
  textSecond:  '#555555',
  accent:      '#1A56DB',
  accentHover: '#EEF2FF',
};

/* -------------------------------------------------------------
   CONTEXT
------------------------------------------------------------- */
const NavbarContext = createContext(null);

export function NavbarProvider({ children }) {
  const navigate = useNavigate();

  const [drawerOpen,     setDrawerOpen]     = useState(false);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedDept,   setSelectedDept]   = useState('All');
  const [deptMenuAnchor, setDeptMenuAnchor] = useState(null);
  const [allDeptsAnchor, setAllDeptsAnchor] = useState(null);
  const [accountAnchor,  setAccountAnchor]  = useState(null);
  const [scrolled,       setScrolled]       = useState(false);
  const [authModalOpen,  setAuthModalOpen]  = useState(false);
  const [authModalTab,   setAuthModalTab]   = useState('login'); // 'login' | 'register'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const catParam = selectedDept !== 'All' ? `&category=${encodeURIComponent(selectedDept)}` : '';
      navigate(`/products?search=${encodeURIComponent(searchQuery)}${catParam}`);
      setSearchQuery('');
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      const catParam = selectedDept !== 'All' ? `&category=${encodeURIComponent(selectedDept)}` : '';
      navigate(`/products?search=${encodeURIComponent(searchQuery)}${catParam}`);
      setSearchQuery('');
    }
  };

  const handleDeptNavigate = (dept, idx) => {
    setAllDeptsAnchor(null);
    navigate(idx === 0 ? '/products' : `/products?category=${encodeURIComponent(dept)}`);
  };

  return (
    <NavbarContext.Provider
      value={{
        drawerOpen,     setDrawerOpen,
        searchQuery,    setSearchQuery,
        selectedDept,   setSelectedDept,
        deptMenuAnchor, setDeptMenuAnchor,
        allDeptsAnchor, setAllDeptsAnchor,
        accountAnchor,  setAccountAnchor,
        scrolled,
        authModalOpen,  setAuthModalOpen,
        authModalTab,   setAuthModalTab,
        handleSearch,
        handleSearchClick,
        handleDeptNavigate,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

/* -------------------------------------------------------------
   HOOK
------------------------------------------------------------- */
export function useNavbar() {
  const ctx = useContext(NavbarContext);
  if (!ctx) throw new Error('useNavbar must be used inside <NavbarProvider>');
  return ctx;
}
