import {StyleSheet} from 'react-native';
import {isAndroid} from '../lib';

export const color = {
  white: '#ffff',
  primaryColor: '#00B1DB',
  darkBlue: '#4F6AA3',
};

const globalStyles = StyleSheet.create({
  /**
   * Text styles
   */
  textWhite: {
    color: color.white,
  },
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textUpp: {
    textTransform: 'uppercase',
  },

  /**
   * Button styles
   */
  buttonTransparent: {
    borderRadius: 5,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  primaryButton: {
    borderRadius: 5,
    paddingVertical: 15,
    backgroundColor: color.primaryColor,
  },

  /**
   * Shadow effect
   */
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,

    elevation: 8,
    zIndex: 1319,
  },
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
