import React from 'react';
import {Dimensions, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Get device width
 */
export const deviceWidth = Dimensions.get('window').width;

/**
 * Get device heihgt
 */
export const deviceHeight = Dimensions.get('window').height;

/**
 * Check device is android
 */
export const isAndroid = Platform.OS == 'android';

/**
 * Url api
 */
export const UrlAPI = endpoint => {
  const MAIN_URL = 'https://apicore-hias.herokuapp.com';
  return `${MAIN_URL}${endpoint}`;
};

/**
 * Request data with
 * example: fetch(@var UrlAPI, requestParameter(variableData))
 * example with axios: soon.
 *
 * @param requestObj for object data
 * @param method is POST or http request
 */
export function requestParameter(requestObj = null, method = 'GET', authToken) {
  if (requestObj === null) {
    return false;
  }

  const appJson = 'application/json';
  const withToken = authToken ? {Authorization: `Bearer ${authToken}`} : null;

  const obj = {
    method: method,
    headers: {Accept: appJson, 'Content-Type': appJson, withToken},
    body: JSON.stringify(requestObj),
  };

  console.log(obj);
  return obj;
}

/**
 * Save to storage use Async Storage
 */

export const KEY_STORAGE = {
  CART: 'CART',
  USER_ID: 'USER_ID',
  USER_DATA: 'USER_DATA',
  TOKEN: 'TOKEN',
};
class LocalStorage {
  /**
   *
   * @param {*} key key store, example: "TOKEN" || "CART"
   * @param {*} value value or data to save for local storage
   */
  async saveItem(key, value) {
    const valueToJson = JSON.stringify(value);
    AsyncStorage.setItem(key, valueToJson, error => {
      if (error) {
        console.log('error save item to local');
        throw error;
      }

      console.log('Success');
    }).catch(err => {
      console.log('Error is ' + err);
    });
  }

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null || value !== undefined) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.log('Error get storage');
    }
  }

  async removeItem(key) {
    AsyncStorage.removeItem(key, error => {
      if (error) {
        alert('Error remove');
      }

      // TODO: Success code here
    });
  }
}
export const localStorage = new LocalStorage();

/**
 * To shortener long string
 * @param {*} longString
 * @param {*} maxLength
 */
export function getShortString(longString, maxLength) {
  if (longString.length > maxLength) {
    return longString.substring(0, maxLength) + '...';
  } else {
    return longString;
  }
}

/**
 * format to idr
 * @param {*} angka
 * @param {*} prefix
 */
export function toIdr(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
}

/**
 * this method to secure screen with login
 */
export const requireLogin = async () => {
  const getToken = await localStorage.getItem(KEY_STORAGE.TOKEN);
  return getToken === null;
};
