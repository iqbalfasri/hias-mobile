import {Dimensions, Platform} from 'react-native';
import axios from 'axios';

import Storage, {STORAGE_KEY} from '../lib/storage';

// get device width
export const getDeviceWidth = Dimensions.get('window').width;

// get device height
export const getDeviceHeight = Dimensions.get('window').height;

// cek device is android
export const isAndroid = Platform.OS === 'android';

// rupiah formatter
export const toRupiah = price => {
  return Math.abs(price)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

// shorten long text
export const getShortString = (longString, maxLength) => {
  return longString.length > maxLength
    ? longString.substring(0, maxLength) + '...'
    : longString;
};

// require login method
export const requireLogin = async () => {
  // TODO: do this when localstorage already finish
  const {TOKEN} = STORAGE_KEY;
  let token = await Storage.getItem(TOKEN);

  return token == null ? false : true;
};

// with params request
export const withParams = (requestObj, method = 'GET') => {
  return axios({method: method})
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log('Something went error when request data with object');
      throw err;
    });
};
