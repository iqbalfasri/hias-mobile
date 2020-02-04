import {createContext} from 'react';

export const context = createContext({
  store: {
    wishlist: [],
    hotProducts: [],
    bestProducts: [],
    cart: null,
    hotProductHome: [],
    bestProductHome: [],
    productDetail: null,
    mainCategory: [],
    subCategory: [],
    secondSubCategory: [],
  },

  actions: {
    setWishlist: () => {},
    setHotProducts: () => {},
    setBestProducts: () => {},
    setCart: () => {},
    setHotProductHome: () => {},
    setBestProductHome: () => {},
    setProductDetail: () => {},
    setMainCategory: () => {},
    setSubCategory: () => {},
    setSecondSubCategory: () => {},
  },
});
