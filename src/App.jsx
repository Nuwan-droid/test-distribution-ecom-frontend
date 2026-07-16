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
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Account from "./pages/Account";
import OrderTracking from "./pages/OrderTracking";
import Wishlist from "./pages/Wishlist";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "account", element: <Account /> },
      { path: "track", element: <OrderTracking /> },
      { path: "wishlist", element: <Wishlist /> },
    ],
  },
  { path: "/login", element: <Navigate to="/" replace state={{ openAuth: 'login' }} /> },
  { path: "/register", element: <Navigate to="/" replace state={{ openAuth: 'register' }} /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <Navigate to="/" replace /> },
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