import {createContext} from 'react';

export const context = createContext({
  store: {
    wishlist: [],
    setWishlist: () => {},
  },
});
