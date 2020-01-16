import {Subject} from 'rxjs';
import {localStorage, KEY_STORAGE} from '../lib';

import {fetchWishlist} from '../lib/api';

const subject = new Subject();

// Initial State
const initialState = {
  loading: false,
  wishlist: [],
};
let state = initialState;

const productStore = {
  init: () => subject.next(state),
  subscribe: setState => subject.subscribe(setState),

  getWishlist: async () => {
    try {
      state = {
        ...state,
        loading: true,
      };

      const userId = await localStorage.getItem(KEY_STORAGE.USER_ID);
      const token = await localStorage.getItem(KEY_STORAGE.TOKEN);

      const response = await fetchWishlist(userId, token);
      const {data} = response;

      state = {
        ...state,
        wishlist: data,
      };

      subject.next(state);
    } catch (error) {
      console.log(error);
    }
  },

  initialState,
};

export default productStore;
