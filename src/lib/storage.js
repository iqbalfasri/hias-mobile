import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const STORAGE_KEY = {
  CART: 'CART',
  USER_ID: 'USER_ID',
  USER_DATA: 'USER_DATA',
  TOKEN: 'TOKEN',
};

class Localstorage {
  async saveItem(key, value) {}

  async getItem(key) {}

  async removeItem(key) {}
}

const storage = new Localstorage();
