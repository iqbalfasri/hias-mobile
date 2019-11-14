import React, {useEffect, Fragment, Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {localStorage, KEY_STORAGE} from '../lib';

// next step use this new localstorage
import Storage, {STORAGE_KEY} from '../lib/storage';

import {requireLogin, getDeviceWidth} from '../lib/utils';

const HiasHouseWhiteLogo = require('../assets/images/splash-logo.jpeg');

class SplashScreen extends Component {
  componentDidMount() {
    this._checkToken();
  }

  async _checkToken() {
    const isSigned = await requireLogin();

    setTimeout(() => {
      if (isSigned) {
        Actions.HomeStack();
      } else {
        Actions.SliderInfo();
      }
    }, 1500);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.fullHeight}>
          <Image style={styles.imageWidth} source={HiasHouseWhiteLogo} />
        </View>
      </>
    );
  }
}

// const Splashpage = () => {
//   useEffect(() => {
//     // get token from localstorage

//     const getLocalData = localStorage.getItem('TOKEN');
//     const getUserId = localStorage.getItem(KEY_STORAGE.USER_ID);
//     getLocalData.then(token => {
//       console.log(token);
//       setTimeout(() => {
//         if (token !== null) {
//           Actions.HomeStack();
//         } else {
//           Actions.SliderInfo();
//         }
//       }, 1500);
//     });
//   }, []);

//   return (
//     <Fragment>
//       <StatusBar barStyle="dark-content" />
//       <View style={styles.fullHeight}>
//         <Image style={styles.imageWidth} source={HiasHouseWhiteLogo} />
//       </View>
//     </Fragment>
//   );
// };

let styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
    width: getDeviceWidth,
    // height: getHeightDevice,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  textWhite: {
    color: 'white',
  },
  imageWidth: {
    width: 106.1,
    height: 155,
  },
});

export default SplashScreen;
