'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { CartItem, Cart, Product, Color } from '@/types/product';
import { formatBDT } from '@/data/products';

// ── State ────────────────────────────────────────────────────
interface CartState extends Cart {
  isOpen: boolean;
  wishlist: string[]; // product IDs
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string; color: Color; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string; colorId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; colorId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'SET_COUPON'; payload: string }
  | { type: 'REHYDRATE'; payload: CartState };

const initialState: CartState = {
  items: [],
  couponCode: undefined,
  discountAmount: 0,
  isOpen: false,
  wishlist: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color, quantity } = action.payload;
      const existingIdx = state.items.findIndex(
        (i) => i.product.id === product.id && i.size === size && i.color.id === color.id
      );
      if (existingIdx >= 0) {
        const updated = [...state.items];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return { ...state, items: updated, isOpen: true };
      }
      return {
        ...state,
        items: [...state.items, { product, size, color, quantity }],
        isOpen: true,
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.product.id === action.payload.productId &&
              i.size === action.payload.size &&
              i.color.id === action.payload.colorId
            )
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, size, colorId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color.id === colorId)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === productId && i.size === size && i.color.id === colorId
            ? { ...i, quantity }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...initialState, wishlist: state.wishlist };
    case 'TOGGLE_DRAWER':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_DRAWER':
      return { ...state, isOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, isOpen: false };
    case 'TOGGLE_WISHLIST': {
      const id = action.payload;
      const inList = state.wishlist.includes(id);
      return {
        ...state,
        wishlist: inList ? state.wishlist.filter((w) => w !== id) : [...state.wishlist, id],
      };
    }
    case 'SET_COUPON':
      return { ...state, couponCode: action.payload };
    case 'REHYDRATE':
      return action.payload;
    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────
interface CartContextValue {
  state: CartState;
  addItem: (product: Product, size: string, color: Color, quantity?: number) => void;
  removeItem: (productId: string, size: string, colorId: string) => void;
  updateQuantity: (productId: string, size: string, colorId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
  subtotal: number;
  formattedSubtotal: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Rehydrate from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nafisae-cart');
      if (saved) {
        const parsed = JSON.parse(saved) as CartState;
        dispatch({ type: 'REHYDRATE', payload: { ...parsed, isOpen: false } });
      }
    } catch {
      // Ignore parse errors — start fresh
    }
  }, []);

  // Persist to LocalStorage on every change
  useEffect(() => {
    localStorage.setItem('nafisae-cart', JSON.stringify(state));
  }, [state]);

  const addItem = useCallback(
    (product: Product, size: string, color: Color, quantity = 1) => {
      dispatch({ type: 'ADD_ITEM', payload: { product, size, color, quantity } });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, size: string, colorId: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { productId, size, colorId } });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, colorId: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, colorId, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const toggleDrawer = useCallback(() => dispatch({ type: 'TOGGLE_DRAWER' }), []);
  const openDrawer = useCallback(() => dispatch({ type: 'OPEN_DRAWER' }), []);
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), []);

  const toggleWishlist = useCallback((productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => state.wishlist.includes(productId),
    [state.wishlist]
  );

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const formattedSubtotal = formatBDT(subtotal);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleDrawer,
        openDrawer,
        closeDrawer,
        toggleWishlist,
        isInWishlist,
        itemCount,
        subtotal,
        formattedSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
