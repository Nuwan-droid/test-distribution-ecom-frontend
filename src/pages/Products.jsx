import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Slider, FormControlLabel, Checkbox,
  Chip, Select, MenuItem, FormControl, InputLabel, Divider, Button,
  Accordion, AccordionSummary, AccordionDetails, Drawer, IconButton,
  Badge, useTheme, useMediaQuery, Breadcrumbs, Paper, Rating, Pagination,
  InputBase, InputAdornment,
} from '@mui/material';
import {
  ExpandMore, FilterList, Search, Close, GridView, ViewList, Sort,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import products, { categories } from '../data/products';

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
];

const ITEMS_PER_PAGE = 12;

function FilterPanel({ filters, setFilters, onClose }) {
  const priceRange = [0, 10000];

  return (
    <Box sx={{ width: { xs: 240, md: '100%' } }}>
      {onClose && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={700}>Filters</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
      )}

      {/* Category Filter */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={700}>Category</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          {categories.map(cat => (
            <FormControlLabel
              key={cat.id}
              label={<Box sx={{ display: 'flex', gap: 0.5 }}><span>{cat.icon}</span>{cat.name}</Box>}
              control={
                <Checkbox
                  size="small"
                  checked={filters.categories.includes(cat.name)}
                  onChange={e => {
                    const updated = e.target.checked
                      ? [...filters.categories, cat.name]
                      : filters.categories.filter(c => c !== cat.name);
                    setFilters(f => ({ ...f, categories: updated }));
                  }}
                  color="primary"
                />
              }
              sx={{ display: 'flex', mb: 0.3 }}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Divider />

      {/* Price Range */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={700}>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={filters.priceRange}
              onChange={(_, v) => setFilters(f => ({ ...f, priceRange: v }))}
              min={0}
              max={10000}
              step={100}
              valueLabelDisplay="auto"
              valueLabelFormat={v => `${v.toLocaleString()}$`}
              color="primary"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">{filters.priceRange[0].toLocaleString()}$</Typography>
              <Typography variant="caption" color="text.secondary">{filters.priceRange[1].toLocaleString()}$</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider />

      {/* Rating Filter */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={700}>Minimum Rating</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          {[4, 3, 2].map(rating => (
            <FormControlLabel
              key={rating}
              label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Rating value={rating} size="small" readOnly /> & up</Box>}
              control={
                <Checkbox
                  size="small"
                  checked={filters.minRating === rating}
                  onChange={e => setFilters(f => ({ ...f, minRating: e.target.checked ? rating : 0 }))}
                  color="primary"
                />
              }
              sx={{ display: 'flex', mb: 0.3 }}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Divider />

      {/* Tags */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={700}>Offers</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {[{ label: 'On Sale', key: 'onSale' }, { label: 'New Arrivals', key: 'isNew' }, { label: 'Best Sellers', key: 'isBestSeller' }].map(opt => (
            <FormControlLabel
              key={opt.key}
              label={opt.label}
              control={
                <Checkbox
                  size="small"
                  checked={!!filters[opt.key]}
                  onChange={e => setFilters(f => ({ ...f, [opt.key]: e.target.checked }))}
                  color="primary"
                />
              }
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => setFilters({ categories: [], priceRange: [0, 10000], minRating: 0, onSale: false, isNew: false, isBestSeller: false })}
          id="clear-filters-btn"
        >
          Clear All Filters
        </Button>
      </Box>
    </Box>
  );
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sort, setSort] = useState(searchParams.get('sort') || 'popularity');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    priceRange: [0, 10000],
    minRating: 0,
    onSale: searchParams.get('sort') === 'discount' || false,
    isNew: searchParams.get('filter') === 'new' || false,
    isBestSeller: false,
  });

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [filters, sort, search]);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (filters.categories.length > 0) list = list.filter(p => filters.categories.includes(p.category));
    list = list.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (filters.minRating > 0) list = list.filter(p => p.rating >= filters.minRating);
    if (filters.onSale) list = list.filter(p => p.discount > 0);
    if (filters.isNew) list = list.filter(p => p.isNew);
    if (filters.isBestSeller) list = list.filter(p => p.isBestSeller);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'discount': list.sort((a, b) => b.discount - a.discount); break;
      case 'newest': list = list.filter(p => p.isNew).concat(list.filter(p => !p.isNew)); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [filters, sort, search]);

  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const activeFilterCount = filters.categories.length + (filters.minRating > 0 ? 1 : 0) + (filters.onSale ? 1 : 0) + (filters.isNew ? 1 : 0) + (filters.isBestSeller ? 1 : 0);

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs sx={{ mb: 1 }}>
            <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: 'text.secondary', fontSize: '0.875rem' }}>Home</Typography>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Products</Typography>
          </Breadcrumbs>
          <Typography variant="h4" fontWeight={800}>
            {filters.categories.length === 1 ? filters.categories[0] : 'All Products'}
          </Typography>
          <Typography color="text.secondary">{filteredProducts.length} products found</Typography>
        </Box>

        {/* Active Filters */}
        {(filters.categories.length > 0 || search) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {search && (
              <Chip
                label={`Search: "${search}"`}
                onDelete={() => setSearch('')}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {filters.categories.map(c => (
              <Chip
                key={c}
                label={c}
                onDelete={() => setFilters(f => ({ ...f, categories: f.categories.filter(x => x !== c) }))}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        )}

        {/* Main layout: sidebar (left) + products (right) using Flexbox */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <Box sx={{ width: 240, flexShrink: 0 }}>
              <Paper sx={{ borderRadius: 3, overflow: 'hidden', position: 'sticky', top: 90 }}>
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight={700}>Filters</Typography>
                </Box>
                <FilterPanel filters={filters} setFilters={(f) => { setFilters(f); setPage(1); }} />
              </Paper>
            </Box>
          )}

          {/* Product Section */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Toolbar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {isMobile && (
                  <Button
                    variant="outlined"
                    startIcon={<Badge badgeContent={activeFilterCount} color="primary"><FilterList /></Badge>}
                    onClick={() => setFilterDrawerOpen(true)}
                    size="small"
                    id="mobile-filter-btn"
                  >
                    Filters
                  </Button>
                )}
                {/* Search within results */}
                <Paper sx={{ display: 'flex', alignItems: 'center', px: 1.5, py: 0.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                  <Search sx={{ color: 'text.secondary', fontSize: 18, mr: 0.5 }} />
                  <InputBase
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    sx={{ fontSize: '0.875rem', width: { xs: 120, sm: 200 } }}
                    inputProps={{ id: 'product-search-input' }}
                  />
                  {search && <IconButton size="small" onClick={() => setSearch('')}><Close fontSize="small" /></IconButton>}
                </Paper>
              </Box>

              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Sort by</InputLabel>
                <Select value={sort} label="Sort by" onChange={e => { setSort(e.target.value); setPage(1); }} id="sort-select">
                  {SORT_OPTIONS.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Products */}
            {loading ? (
              <Grid container spacing={3}>
                {[...Array(8)].map((_, i) => (
                  <Grid item xs={6} sm={4} md={4} key={i}>
                    <ProductCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : paginatedProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>No products found</Typography>
                <Typography color="text.secondary" gutterBottom>Try adjusting your filters or search term</Typography>
                <Button variant="contained" onClick={() => { setFilters({ categories: [], priceRange: [0, 10000], minRating: 0, onSale: false, isNew: false, isBestSeller: false }); setSearch(''); }}>
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedProducts.map((product, i) => (
                    <Grid item xs={6} sm={4} md={4} key={product.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>

                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(_, v) => { setPage(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      color="primary"
                      size={isMobile ? 'small' : 'large'}
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
        PaperProps={{ sx: { borderRadius: '0 16px 16px 0' } }}
      >
        <FilterPanel filters={filters} setFilters={(f) => { setFilters(f); setPage(1); }} onClose={() => setFilterDrawerOpen(false)} />
      </Drawer>
    </Box>
  );
}