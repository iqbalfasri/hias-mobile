import {createContext} from 'react';

export const context = createContext({
  store: {
    wishlist: [],
    hotProducts: [],
    bestProducts: [],
    cart: [],
    hotProductHome: [],
    bestProductHome: [],
    productDetail: null,
  },

  actions: {
    setWishlist: () => {},
    setHotProducts: () => {},
    setBestProducts: () => {},
    setCart: () => {},
    setHotProductHome: () => {},
    setBestProductHome: () => {},
    setProductDetail: () => {},
  },
});
