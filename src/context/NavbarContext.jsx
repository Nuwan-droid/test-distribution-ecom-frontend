import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardGiftcard } from '@mui/icons-material';

/* -------------------------------------------------------------
   STATIC DATA
------------------------------------------------------------- */
export const ALL_DEPARTMENTS = [
  'All Categories',
  'Electronics',
  'Home & Kitchen',
  'Fashion',
  'Sports & Fitness',
  'Books & Stationery',
  'Beauty & Care',
  'Food & Beverages',
  'Toys & Kids',
  'Automotive'
];

export const DEPT_SELECT_OPTIONS = [
  'All',
  'Electronics',
  'Home & Kitchen',
  'Fashion',
  'Sports & Fitness',
  'Books & Stationery',
  'Beauty & Care',
  'Food & Beverages',
  'Toys & Kids',
  'Automotive'
];

export const NAVIGATION_CATEGORIES = {
  'Electronics': ['Audio', 'Wearables', 'Accessories', 'Gaming'],
  'Home & Kitchen': ['Kitchen Appliances', 'Drinkware', 'Kitchenware'],
  'Fashion': ['Accessories', 'Eyewear', 'Bags', 'Shoes', 'Clothing'],
  'Sports & Fitness': ['Yoga', 'Workout Equipment', 'Cardio', 'Hydration'],
  'Books & Stationery': ['Notebooks', 'Pens', 'Accessories'],
  'Beauty & Care': ['Skincare', 'Oral Care', 'Hair Care'],
  'Food & Beverages': ['Tea & Coffee', 'Pantry', 'Snacks'],
  'Toys & Kids': ['Building Blocks', 'RC Vehicles', 'Games', 'Arts & Crafts', 'Plush'],
  'Automotive': ['Accessories', 'Cameras', 'Car Care']
};

export const CATEGORY_STRIP = [
  { label: 'Electronics',    path: '/products?category=Electronics' },
  { label: 'Home & Kitchen', path: '/products?category=Home+%26+Kitchen' },
  { label: 'Fashion',        path: '/products?category=Fashion' },
  { label: 'Sports & Fitness', path: '/products?category=Sports+%26+Fitness' },
  { label: 'Stationery',     path: '/products?category=Books+%26+Stationery' },
  { label: 'Beauty & Care',  path: '/products?category=Beauty+%26+Care' },
  { label: 'Food & Beverages', path: '/products?category=Food+%26+Beverages' },
  { label: 'Toys & Kids',    path: '/products?category=Toys+%26+Kids' },
  { label: 'Automotive',     path: '/products?category=Automotive' },
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
   SAFE DEFAULT — prevents throws if a consumer renders outside
   the provider (returns no-op functions instead of crashing).
------------------------------------------------------------- */
const SAFE_DEFAULT = {
  drawerOpen: false,     setDrawerOpen: () => {},
  searchQuery: '',       setSearchQuery: () => {},
  selectedDept: 'All',  setSelectedDept: () => {},
  deptMenuAnchor: null,  setDeptMenuAnchor: () => {},
  allDeptsAnchor: null,  setAllDeptsAnchor: () => {},
  accountAnchor: null,   setAccountAnchor: () => {},
  scrolled: false,
  authModalOpen: false,  setAuthModalOpen: () => {},
  authModalTab: 'login', setAuthModalTab: () => {},
  handleSearch: () => {},
  handleSearchClick: () => {},
  handleDeptNavigate: () => {},
};

const NavbarContext = createContext(SAFE_DEFAULT);

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
   HOOK — never throws; warns in dev if used outside provider
   so the app stays alive instead of crashing.
------------------------------------------------------------- */
export function useNavbar() {
  const ctx = useContext(NavbarContext);
  if (ctx === SAFE_DEFAULT && process.env.NODE_ENV !== 'production') {
    // Only warn (don't throw) — keeps the app alive
    console.warn('[NavbarContext] useNavbar() called outside <NavbarProvider>. Using safe defaults.');
  }
  return ctx;
}
