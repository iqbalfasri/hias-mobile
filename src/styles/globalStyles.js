import {StyleSheet} from 'react-native';
import {isAndroid, deviceWidth} from '../lib';

export const color = {
  white: '#ffff',
  primaryColor: '#00B1DB',
  darkBlue: '#4F6AA3',
  orange: '#FE7865',
  dark: '#292929',
  red: '#E93E08',
};

const globalStyles = StyleSheet.create({
  /**
   * Fonts styles
   */
  fontNormal: {
    fontFamily: 'Gotham-Book',
  },
  fontMedium: {
    fontFamily: 'Gotham-Medium',
  },
  fontBold: {
    fontFamily: 'Gotham-Bold',
  },

  /**
   * Button styles
   */
  buttonPrimary: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: color.primaryColor,
  },
  buttonWhite: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: color.white,
  },
  buttonDark: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: color.dark,
  },
  buttonTransparent: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  buttonFacebook: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#3B5998',
  },
  buttonGoogle: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#DD4B39',
  },
  buttonDisable: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#ababab',
  },

  /**
   * Shadow effect
   */
  elevationShadowStyle: elevation => {
    if (isAndroid) {
      return {elevation};
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0.5 * elevation},
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * elevation,
      };
    }
  },
  elevationShadowStyleTop: elevation => {
    if (isAndroid) {
      return {elevation};
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -0.5 * elevation},
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * elevation,
      };
    }
  },
});

export default globalStyles;
