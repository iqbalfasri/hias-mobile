import AsyncStorage from '@react-native-community/async-storage';

export const STORAGE_KEY = {
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
      await JSON.parse(AsyncStorage.getItem(key));
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
