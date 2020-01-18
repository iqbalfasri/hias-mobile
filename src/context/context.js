import {createContext} from 'react';

export const context = createContext({
  store: {
    wishlist: [],
    setWishlist: () => {},
    hotProducts: [],
    setHotProducts: () => {},
    bestProducts: [],
    setBestProducts: () => {},
    cart: [],
    setCart: () => {},
  },
});
