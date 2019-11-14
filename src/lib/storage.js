import AsyncStorage from '@react-native-community/async-storage';

export let STORAGE_KEY = {
  CART: 'CART',
  USER_ID: 'USER_ID',
  USER_DATA: 'USER_DATA',
  TOKEN: 'TOKEN',
};

class Localstorage {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  }

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null || value !== undefined) {
        return JSON.parse(value);
      }
    } catch (error) {
      throw error;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }
}

const storage = new Localstorage();
export default storage;
