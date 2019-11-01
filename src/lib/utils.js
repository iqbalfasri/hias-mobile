import {Dimensions, Platform} from 'react-native';

// rupiah formatter
export const toRupiah = price => {
  return Math.abs(price)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

// get device width
export const getDeviceWidth = Dimensions.get('window').width;

// get device height
export const getDeviceHeight = Dimensions.get('window').height;

// cek device is android
export const isAndroid = Platform.OS === 'android';

// shorten long text
export const getShortString = (longString, maxLength) => {
  return longString.length > maxLength
    ? longString.substring(0, maxLength) + '...'
    : longString;
};

// require login method
export const requireLogin = () => {
  // TODO: do this when localstorage already finish
  return;
};
