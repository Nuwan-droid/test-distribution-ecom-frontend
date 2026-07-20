import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import {
  ThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/product/Products";
import ProductDetail from "./pages/product/ProductDetail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import Cart from "./pages/cart and checkout/Cart";
import Checkout from "./pages/cart and checkout/Checkout";
import OrderSuccess from "./pages/orders/OrderSuccess";
import Account from "./pages/auth/Account";
import OrderTracking from "./pages/orders/OrderTracking";
import Wishlist from "./pages/product/Wishlist";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true,                  element: <Home /> },
      { path: "products",             element: <Products /> },
      { path: "products/:id",         element: <ProductDetail /> },
      { path: "cart",                 element: <Cart /> },
      { path: "checkout",             element: <Checkout /> },
      { path: "order-success",        element: <OrderSuccess /> },
      { path: "account",              element: <Account /> },
      { path: "track",                element: <OrderTracking /> },
      {path: "birthday-gifts",        element: <Products /> },
      { path: "wishlist",             element: <Wishlist /> },
      /* Auth flow pages — inside MainLayout so they share Navbar,
         Footer, NavbarProvider, and AuthModal */
      { path: "forgot-password",      element: <ForgotPassword /> },
      { path: "verify-otp",           element: <VerifyOtp /> },
      { path: "reset-password",       element: <ResetPassword /> },
    ],
  },
  /* These immediately redirect back to "/" with state that auto-opens the modal */
  { path: "/login",    element: <Navigate to="/" replace state={{ openAuth: 'login' }}    /> },
  { path: "/register", element: <Navigate to="/" replace state={{ openAuth: 'register' }} /> },
  { path: "*",         element: <Navigate to="/" replace /> },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
      dark: "#1D4ED8",
      light: "#3B82F6",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0B1F5B",
      light: "#18317A",
      contrastText: "#FFFFFF",
    },
    error: { main: "#EF4444" },
    success: { main: "#10B981" },
    warning: { main: "#F59E0B" },
    info: { main: "#0EA5E9" },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
      disabled: "#94A3B8",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    divider: "#E5E7EB",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    /* Ensure Container always centres itself with auto horizontal margins */
    MuiContainer: {
      styleOverrides: {
        root: {
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;