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
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProductCard, { ProductCardSkeleton } from '../../components/ProductCard';
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
];

const ITEMS_PER_PAGE = 12;

const SEC_SX = {
  '&::before': { display: 'none' },
  bgcolor: 'transparent',
  borderBottom: '1px solid',
  borderColor: 'divider',
};

const SUM_SX = {
  px: 1.5,
  minHeight: '44px !important',
  '& .MuiAccordionSummary-content': { my: '11px !important' },
  '& .MuiAccordionSummary-expandIconWrapper': { color: 'text.secondary' },
};

/* ─── FilterPanel ────────────────────────────────────────────────────────── */

function FilterPanel({ filters, setFilters, sort, setSort, onClose }) {
  const clearAll = () => setFilters({
    categories: [], priceRange: [0, 10000],
    minRating: 0, onSale: false, isNew: false, isBestSeller: false,
  });

  const activeCount =
    filters.categories.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.isNew ? 1 : 0) +
    (filters.isBestSeller ? 1 : 0);

  return (
    <Box sx={{ width: { xs: 250, md: '100%' }, bgcolor: 'white' }}>

      {/* Header */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 1.5, py: 1.25,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>

          {activeCount > 0 && (
            <Box
              component="span"
              sx={{
                bgcolor: 'secondary.main', color: 'white',
                borderRadius: 10, px: 0.75,
                fontSize: '0.68rem', fontWeight: 800, lineHeight: '17px',
              }}
            >
              {activeCount}
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {activeCount > 0 && (
            <Button
              size="small" onClick={clearAll}
              sx={{
                fontSize: '0.7rem', fontWeight: 700, color: 'secondary.main',
                textTransform: 'none', minWidth: 0, p: 0,
                textDecoration: 'underline',
              }}
            >
              Clear all
            </Button>
          )}
          {onClose && (
            <IconButton size="small" onClick={onClose} sx={{ p: 0.25 }}>
              <Close sx={{ fontSize: 17 }} />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* ── Sort By (inside filter panel) ── */}
      <Box sx={{ px: 1.5, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography  fontSize="0.8rem" color="text.primary"sx={{ mb: 0.75, fontWeight: 700 }} >
          Sort By
        </Typography>
        <FormControl size="small" fullWidth>
          <Select
            value={sort}
            onChange={e => setSort(e.target.value)}
            id="sort-select"
            displayEmpty
            sx={{
              fontSize: '0.8rem',
              fontWeight: 600,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
            }}
          >
            {SORT_OPTIONS.map(opt => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* ── Category ── */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={SEC_SX}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />} sx={SUM_SX}>
          <Typography  fontSize="0.82rem" color="text.primary" sx={{ mb: 0.75, fontWeight: 700 }}>
            Category
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.25 }}>
          {categories.map(cat => {
            const active = filters.categories.includes(cat.name);
            return (
              <Box
                key={cat.id}
                onClick={() => {
                  const updated = active
                    ? filters.categories.filter(c => c !== cat.name)
                    : [...filters.categories, cat.name];
                  setFilters(f => ({ ...f, categories: updated }));
                }}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  py: 0.55, cursor: 'pointer',
                  '&:hover .label-text': { color: 'secondary.main' },
                }}
              >
                {/* Checkbox-style icon — filled when active */}
                {active
                  ? <CheckBox sx={{ fontSize: 16, color: 'secondary.main', flexShrink: 0 }} />
                  : <CheckBoxOutlineBlank sx={{ fontSize: 16, color: 'text.disabled', flexShrink: 0 }} />
                }
                <Typography
                  className="label-text"
                  fontSize="0.82rem"
                  fontWeight={active ? 700 : 600}
                  color={active ? 'secondary.main' : 'text.primary'}
                  sx={{ transition: 'color 0.15s' }}
                >
                  {cat.name}
                </Typography>
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>

      {/* ── Price Range ── */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={SEC_SX}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />} sx={SUM_SX}>
          <Typography fontSize="0.82rem" color="text.primary" sx={{ mb: 0.75, fontWeight: 700 }}>
            Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 1.75, pt: 0.5, pb: 1.5 }}>
          <Slider
            value={filters.priceRange}
            onChange={(_, v) => setFilters(f => ({ ...f, priceRange: v }))}
            min={0} max={10000} step={100}
            valueLabelDisplay="auto"
            valueLabelFormat={v => `$${v.toLocaleString()}`}
            color="secondary.main"
            sx={{
              '& .MuiSlider-thumb': { width: 12, height: 12 },
              '& .MuiSlider-track': { height: 2 },
              '& .MuiSlider-rail': { height: 2 },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.25 }}>
            <Typography fontSize="0.75rem" fontWeight={700} color="text.secondary">
              ${filters.priceRange[0].toLocaleString()}
            </Typography>
            <Typography fontSize="0.75rem" fontWeight={700} color="text.secondary">
              ${filters.priceRange[1].toLocaleString()}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* ── Customer Rating ── */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={SEC_SX}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />} sx={SUM_SX}>
          <Typography fontSize="0.82rem" color="text.primary" sx={{ mb: 0.75, fontWeight: 700 }}>
            Customer Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.25 }}>
          {[4, 3, 2].map(rating => {
            const active = filters.minRating === rating;
            return (
              <Box
                key={rating}
                onClick={() => setFilters(f => ({ ...f, minRating: active ? 0 : rating }))}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  py: 0.55, cursor: 'pointer',
                  '&:hover .label-text': { color: 'secondary.main' },
                }}
              >
                {/* Radio-style icon — distinct from category checkboxes */}
                {active
                  ? <RadioButtonChecked sx={{ fontSize: 16, color: 'secondary.main', flexShrink: 0 }} />
                  : <RadioButtonUnchecked sx={{ fontSize: 16, color: 'text.disabled', flexShrink: 0 }} />
                }
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <Rating value={rating} size="small" readOnly precision={1} />
                  <Typography
                    className="label-text"
                    fontSize="0.78rem"
                    fontWeight={active ? 700 : 600}
                    color={active ? 'secondary.main' : 'text.secondary'}
                    sx={{ transition: 'color 0.15s' }}
                  >
                    & up
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>

      {/* ── Offers ── */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ ...SEC_SX, borderBottom: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />} sx={SUM_SX}>
          <Typography fontSize="0.82rem" color="text.primary" sx={{ mb: 0.75, fontWeight: 700 }}>
            Deals
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
          {OFFERS.map(opt => {
            const active = !!filters[opt.key];
            return (
              <Box
                key={opt.key}
                onClick={() => setFilters(f => ({ ...f, [opt.key]: !f[opt.key] }))}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  py: 0.55, cursor: 'pointer',
                  '&:hover .label-text': { color: 'secondary.main' },
                }}
              >
                {/* Toggle-checkbox style — same icon family as Category but different key */}
                {active
                  ? <CheckBox sx={{ fontSize: 16, color: 'secondary.main', flexShrink: 0 }} />
                  : <CheckBoxOutlineBlank sx={{ fontSize: 16, color: 'text.disabled', flexShrink: 0 }} />
                }
                <Typography
                  className="label-text"
                  fontSize="0.82rem"
                  fontWeight={active ? 700 : 600}
                  color={active ? 'secondary.main' : 'text.primary'}
                  sx={{ transition: 'color 0.15s' }}
                >
                  {opt.label}
                </Typography>
              </Box>
            );
          })}
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
    priceRange: [0, 10000],
    minRating: 0,
    onSale: searchParams.get('sort') === 'discount' || false,
    isNew: searchParams.get('filter') === 'new' || false,
    isBestSeller: false,
  });

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [filters, sort]);

  const filteredProducts = useMemo(() => {
    let list = [...products];
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
  }, [filters, sort]);

  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const activeFilterCount =
    filters.categories.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.isNew ? 1 : 0) +
    (filters.isBestSeller ? 1 : 0);

  const handleSetFilters = f => { setFilters(f); setPage(1); };
  const handleSetSort = v => { setSort(v); setPage(1); };

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>

        {/* Page Header */}
        <Box sx={{ mb: 2.5 }}>
          <Breadcrumbs sx={{ mb: 0.5 }}>
            <Typography
              component={Link} to="/"
              sx={{ textDecoration: 'none', color: 'text.secondary', fontSize: '0.8rem' }}
            >
              Home
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Products</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography variant="h5" fontWeight={800}>
              {filters.categories.length === 1 ? filters.categories[0] : 'All Products'}
            </Typography>
            <Typography fontSize="0.85rem" color="text.secondary">
              {filteredProducts.length} results
            </Typography>
          </Box>

          {/* Active category chips */}
          {filters.categories.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1 }}>
              {filters.categories.map(c => (
                <Chip
                  key={c} label={c} size="small"
                  onDelete={() => setFilters(f => ({ ...f, categories: f.categories.filter(x => x !== c) }))}
                  color="secondary" variant="outlined"
                  sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* ── Main Layout ── */}
        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>

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
              <Grid container spacing={2}>
                {[...Array(8)].map((_, i) => (
                  <Grid item xs={6} sm={4} md={3} key={i} sx={{ display: 'flex' }}>
                    <ProductCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : paginatedProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>No products found</Typography>
                <Typography color="text.secondary" gutterBottom fontSize="0.9rem">
                  Try adjusting your filters
                </Typography>
                <Button
                  variant="contained" sx={{ mt: 1 }}
                  onClick={() => setFilters({
                    categories: [], priceRange: [0, 10000],
                    minRating: 0, onSale: false, isNew: false, isBestSeller: false,
                  })}
                >
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {paginatedProducts.map((product) => (
                    <Grid item xs={6} sm={4} md={3} key={product.id}>
                      <ProductCard product={product} />
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