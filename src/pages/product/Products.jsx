import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Slider, Chip, Select, MenuItem,
  FormControl, Button, Accordion, AccordionSummary, AccordionDetails,
  Drawer, IconButton, Badge, useTheme, useMediaQuery, Breadcrumbs,
  Paper, Rating, Pagination, Divider,
} from '@mui/material';
import {
  ExpandMore, FilterList, Close, Tune,
  CheckBox, CheckBoxOutlineBlank,
  RadioButtonChecked, RadioButtonUnchecked,
  NavigateNext,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProductGrid from '../../components/Products/ProductGrid';
import CategoryStrip from '../../components/common/CategoryStrip';
import { CATEGORY_STRIP, NAVIGATION_CATEGORIES } from '../../context/NavbarContext';
import products, { categories } from '../../data/products';

/* ─── Constants ──────────────────────────────────────────────────────────── */

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
];

const OFFERS = [
  { label: 'On Sale', key: 'onSale' },
  { label: 'New Arrivals', key: 'isNew' },
  { label: 'Best Sellers', key: 'isBestSeller' },
  { label: 'Featured', key: 'isFeatured' },
];

const ITEMS_PER_PAGE = 12;

/* ─── FilterPanel ────────────────────────────────────────────────────────── */

function FilterPanel({ filters, setFilters, sort, setSort, onClose }) {
  const clearAll = () => setFilters({
    categories: [], subcategories: [], priceRange: [0, 10000],
    minRating: 0, onSale: false, isNew: false, isBestSeller: false, isFeatured: false
  });

  const activeCount =
    filters.categories.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.isNew ? 1 : 0) +
    (filters.isBestSeller ? 1 : 0) +
    (filters.isFeatured ? 1 : 0);

  return (
    <Box sx={{ width: { xs: 250, md: '100%' }, bgcolor: 'transparent' }}>
      
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 2 }}>
        <Typography variant="subtitle1" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          Filters
          {activeCount > 0 && (
            <Box component="span" sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: 10, px: 1, py: 0.25, fontSize: '0.7rem', fontWeight: 700, lineHeight: 1 }}>
              {activeCount}
            </Box>
          )}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {activeCount > 0 && (
            <Button size="small" onClick={clearAll} sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'text.secondary', textTransform: 'none', minWidth: 0, p: 0, '&:hover': { color: 'error.main' } }}>
              Clear
            </Button>
          )}
          {onClose && (
            <IconButton size="small" onClick={onClose} sx={{ ml: 1, p: 0.5 }}>
              <Close sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider sx={{ mx: 2, mb: 3 }} />

      {/* Sort By */}
      <Box sx={{ px: 2, mb: 4 }}>
        <Typography fontSize="0.75rem" textTransform="uppercase" letterSpacing="0.05em" color="text.secondary" sx={{ mb: 1.5, fontWeight: 700 }}>
          Sort By
        </Typography>
        <FormControl fullWidth variant="standard">
          <Select
            value={sort}
            onChange={e => setSort(e.target.value)}
            disableUnderline
            sx={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'text.primary',
              '& .MuiSelect-select': { py: 0.5, px: 0 },
            }}
          >
            {SORT_OPTIONS.map(opt => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Categories */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />} sx={{ px: 2, minHeight: '40px !important', '& .MuiAccordionSummary-content': { my: '0 !important' } }}>
          <Typography fontSize="0.75rem" textTransform="uppercase" letterSpacing="0.05em" color="text.secondary" fontWeight={700}>
            Categories
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {categories.map(cat => {
              const active = filters.categories.includes(cat.name);
              return (
                <Typography
                  key={cat.id}
                  onClick={() => {
                    const updated = active
                      ? filters.categories.filter(c => c !== cat.name)
                      : [...filters.categories, cat.name];
                    setFilters(f => ({ ...f, categories: updated }));
                  }}
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'secondary.main' : 'text.primary',
                    cursor: 'pointer',
                    py: 0.75,
                    px: 1,
                    mx: -1,
                    borderRadius: 1.5,
                    bgcolor: active ? 'rgba(11, 31, 91, 0.04)' : 'transparent',
                    borderLeft: active ? '3px solid' : '3px solid transparent',
                    borderColor: active ? 'secondary.main' : 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: active ? 'rgba(11, 31, 91, 0.06)' : 'rgba(0,0,0,0.02)',
                    }
                  }}
                >
                  {cat.name}
                </Typography>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Price Range */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />} sx={{ px: 2, minHeight: '40px !important', '& .MuiAccordionSummary-content': { my: '0 !important' } }}>
          <Typography fontSize="0.75rem" textTransform="uppercase" letterSpacing="0.05em" color="text.secondary" fontWeight={700}>
            Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
          <Box sx={{ px: 1 }}>
            <Slider
              value={filters.priceRange}
              onChange={(_, v) => setFilters(f => ({ ...f, priceRange: v }))}
              min={0} max={10000} step={100}
              color="secondary"
              sx={{
                '& .MuiSlider-thumb': { 
                  width: 14, height: 14, 
                  bgcolor: 'white', 
                  border: '2px solid', 
                  borderColor: 'secondary.main',
                  boxShadow: 'none',
                  '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 4px rgba(11, 31, 91, 0.1)' }
                },
                '& .MuiSlider-track': { height: 3 },
                '& .MuiSlider-rail': { height: 3, opacity: 0.2 },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 0.5 }}>
            <Typography fontSize="0.75rem" fontWeight={600} color="text.secondary">
              ${filters.priceRange[0].toLocaleString()}
            </Typography>
            <Typography fontSize="0.75rem" fontWeight={600} color="text.secondary">
              ${filters.priceRange[1].toLocaleString()}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Deals (Chips) */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />} sx={{ px: 2, minHeight: '40px !important', '& .MuiAccordionSummary-content': { my: '0 !important' } }}>
          <Typography fontSize="0.75rem" textTransform="uppercase" letterSpacing="0.05em" color="text.secondary" fontWeight={700}>
            Deals & Offers
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {OFFERS.map(opt => {
              const active = !!filters[opt.key];
              return (
                <Chip
                  key={opt.key}
                  label={opt.label}
                  onClick={() => setFilters(f => ({ ...f, [opt.key]: !f[opt.key] }))}
                  sx={{
                    borderRadius: '6px',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.75rem',
                    bgcolor: active ? 'secondary.main' : 'rgba(0,0,0,0.04)',
                    color: active ? 'white' : 'text.primary',
                    transition: 'all 0.2s',
                    border: 'none',
                    '&:hover': {
                      bgcolor: active ? 'secondary.dark' : 'rgba(0,0,0,0.08)',
                    }
                  }}
                />
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Customer Rating */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />} sx={{ px: 2, minHeight: '40px !important', '& .MuiAccordionSummary-content': { my: '0 !important' } }}>
          <Typography fontSize="0.75rem" textTransform="uppercase" letterSpacing="0.05em" color="text.secondary" fontWeight={700}>
            Minimum Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[4, 3, 2].map(rating => {
              const active = filters.minRating === rating;
              const anyActive = filters.minRating > 0;
              return (
                <Box
                  key={rating}
                  onClick={() => setFilters(f => ({ ...f, minRating: active ? 0 : rating }))}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    cursor: 'pointer',
                    opacity: anyActive && !active ? 0.4 : 1,
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 1 }
                  }}
                >
                  <Rating value={rating} size="small" readOnly precision={1} sx={{ color: active ? 'secondary.main' : '#faaf00' }} />
                  <Typography
                    fontSize="0.8rem"
                    fontWeight={active ? 700 : 500}
                    color={active ? 'secondary.main' : 'text.secondary'}
                  >
                    & up
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>

    </Box>
  );
}

/* ─── Products Page ──────────────────────────────────────────────────────── */

export default function Products() {
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sort, setSort] = useState(searchParams.get('sort') || 'popularity');
  const [page, setPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    subcategories: searchParams.get('subcategory') ? [searchParams.get('subcategory')] : [],
    priceRange: [0, 10000],
    minRating: 0,
    onSale: searchParams.get('sort') === 'discount' || searchParams.get('filter') === 'sale' || false,
    isNew: searchParams.get('filter') === 'new' || false,
    isBestSeller: searchParams.get('filter') === 'bestseller' || false,
    isFeatured: searchParams.get('filter') === 'featured' || false,
  });

  useEffect(() => {
    const urlCat = searchParams.get('category');
    const urlSub = searchParams.get('subcategory');
    if (urlCat || urlSub) {
      setFilters(prev => {
        const newCats = urlCat ? [urlCat] : prev.categories;
        const newSubs = urlSub ? [urlSub] : (urlCat ? [] : prev.subcategories);
        
        if (JSON.stringify(prev.categories) === JSON.stringify(newCats) && 
            JSON.stringify(prev.subcategories) === JSON.stringify(newSubs)) {
          return prev;
        }
        
        return {
          ...prev,
          categories: newCats,
          subcategories: newSubs
        };
      });
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [filters, sort]);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (filters.categories.length > 0) list = list.filter(p => filters.categories.includes(p.category));
    if (filters.subcategories && filters.subcategories.length > 0) list = list.filter(p => filters.subcategories.some(sub => p.subcategory?.toLowerCase() === sub.toLowerCase()));
    list = list.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (filters.minRating > 0) list = list.filter(p => p.rating >= filters.minRating);
    if (filters.onSale) list = list.filter(p => p.discount > 0);
    if (filters.isNew) list = list.filter(p => p.isNew);
    if (filters.isBestSeller) list = list.slice(0, 8);
    if (filters.isFeatured) list = list.filter(p => p.isFeatured);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'discount': list.sort((a, b) => b.discount - a.discount); break;
      case 'newest': list = list.filter(p => p.isNew).concat(list.filter(p => !p.isNew)); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [filters, sort]);

  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const activeFilterCount =
    filters.categories.length +
    (filters.subcategories ? filters.subcategories.length : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.isNew ? 1 : 0) +
    (filters.isBestSeller ? 1 : 0) +
    (filters.isFeatured ? 1 : 0);

  const handleSetFilters = f => { setFilters(f); setPage(1); };
  const handleSetSort = v => { setSort(v); setPage(1); };

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pt: 0 }}>
      <Container maxWidth="xl" sx={{ pt: 0, pb: { xs: 1.5, md: 2 } }}>

        {/* Page Header */}
        <Box sx={{
          mb: 1.5,
          position: 'sticky',
          top: { xs: '70px', sm: '90px' }, // Match actual Navbar height exactly
          zIndex: 10,
          bgcolor: '#F8FAFC',
          pt: 1,
          pb: 1,
          mt: -1, // Negate the pt so it doesn't push down the initial layout
        }}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 0.5 }}>
            <Typography
              component={Link} to="/"
              sx={{ textDecoration: 'none', color: 'primary.main', fontSize: '0.8rem' }}
            >
              Home
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Products</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
              <Typography variant="h5" fontWeight={800}>
                {(filters.subcategories && filters.subcategories.length === 1) ? filters.subcategories[0] : (filters.categories.length === 1 ? filters.categories[0] : 'All Products')}
              </Typography>
              <Typography fontSize="0.85rem" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                {filteredProducts.length} results
              </Typography>
            </Box>

            {/* Category Strip */}
            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 300 }, bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
              <CategoryStrip 
                items={
                  (filters.categories.length === 1 && NAVIGATION_CATEGORIES[filters.categories[0]]) 
                    ? NAVIGATION_CATEGORIES[filters.categories[0]] 
                    : CATEGORY_STRIP
                }
                parentCategory={filters.categories.length === 1 ? filters.categories[0] : null}
              />
            </Box>
          </Box>

          {/* Active category chips */}
          {(filters.categories.length > 0 || (filters.subcategories && filters.subcategories.length > 0)) && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1 }}>
              {filters.categories.map(c => (
                <Chip
                  key={c} label={c} size="small"
                  onDelete={() => setFilters(f => ({ ...f, categories: f.categories.filter(x => x !== c) }))}
                  color="secondary" variant="outlined"
                  sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                />
              ))}
              {filters.subcategories && filters.subcategories.map(c => (
                <Chip
                  key={c} label={c} size="small"
                  onDelete={() => setFilters(f => ({ ...f, subcategories: f.subcategories.filter(x => x !== c) }))}
                  color="secondary" variant="outlined"
                  sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* ── Main Layout ── */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>

          {/* Desktop Sidebar — sticky freeze */}
          {!isMobile && (
            <Box
              sx={{
                width: 210,
                flexShrink: 0,
                /* alignSelf:flex-start is REQUIRED for sticky to work in a flex container */
                alignSelf: 'flex-start',
                /* Sticky freeze — sidebar stays put, only the products column scrolls */
                position: 'sticky',
                top: 68,
                /* If filter panel is taller than viewport, allow internal scroll */
                maxHeight: 'calc(100vh - 80px)',
                overflowY: 'auto',
                /* NOTE: NO overflowX here — any overflow value other than visible
                   creates a new scroll container which breaks position:sticky */
                '&::-webkit-scrollbar': { width: 3 },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#D1D5DB', borderRadius: 4 },
                '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <FilterPanel
                  filters={filters}
                  setFilters={handleSetFilters}
                  sort={sort}
                  setSort={handleSetSort}
                />
              </Paper>
            </Box>
          )}

          {/* Product Section */}
          <Box sx={{ flex: 1, minWidth: 0 }}>

            {/* Mobile top bar */}
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Button
                  variant="outlined" size="small"
                  startIcon={<Badge badgeContent={activeFilterCount} color="primary"><FilterList /></Badge>}
                  onClick={() => setFilterDrawerOpen(true)}
                  id="mobile-filter-btn"
                  sx={{ fontWeight: 700 }}
                >
                  Filter & Sort
                </Button>
              </Box>
            )}

            {/* Products Grid */}
            {loading ? (
              <ProductGrid loading={true} skeletonCount={8} />
            ) : paginatedProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>No products found</Typography>
                <Typography color="text.secondary" gutterBottom fontSize="0.9rem">
                  Try adjusting your filters
                </Typography>
                <Button
                  variant="contained" sx={{ mt: 1 }}
                  onClick={() => setFilters({
                    categories: [], subcategories: [], priceRange: [0, 10000],
                    minRating: 0, onSale: false, isNew: false, isBestSeller: false, isFeatured: false
                  })}
                >
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <>
                <ProductGrid products={paginatedProducts} loading={false} />

                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(_, v) => { setPage(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      color="secondary"
                      size={isMobile ? 'small' : 'medium'}
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{ sx: { borderRadius: '0 12px 12px 0', maxWidth: 260 } }}
      >
        <FilterPanel
          filters={filters}
          setFilters={handleSetFilters}
          sort={sort}
          setSort={handleSetSort}
          onClose={() => setFilterDrawerOpen(false)}
        />
      </Drawer>
    </Box>
  );
}