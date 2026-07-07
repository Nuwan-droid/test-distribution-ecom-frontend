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
import Login from "./pages/Login";
import Register from "./pages/Register";
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
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B35",
    },
    secondary: {
      main: "#16A34A",
    },
    text: {
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
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