import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const cartItemId = action.payload.selectedSize ? `${action.payload.id}-${action.payload.selectedSize}` : action.payload.id;
      const existing = state.items.find(i => (i.cartItemId || i.id) === cartItemId);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            (i.cartItemId || i.id) === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1, cartItemId }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(i => (i.cartItemId || i.id) !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => (i.cartItemId || i.id) !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          (i.cartItemId || i.id) === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const savedCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
  const [state, dispatch] = useReducer(cartReducer, savedCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = useCallback((product) => dispatch({ type: 'ADD_TO_CART', payload: product }), []);
  const removeFromCart = useCallback((id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }), []);
  const updateQuantity = useCallback((id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const contextValue = useMemo(() => ({
    ...state, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice
  }), [state, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
