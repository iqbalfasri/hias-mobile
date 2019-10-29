import React, {useEffect, Fragment} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {localStorage, KEY_STORAGE} from '../lib';

const HiasHouseWhiteLogo = require('../assets/images/splash-logo.jpeg');

const Splashpage = () => {
  useEffect(() => {
    // get token from localstorage

    const getLocalData = localStorage.getItem('TOKEN');
    const getUserId = localStorage.getItem(KEY_STORAGE.USER_ID);
    getLocalData.then(token => {
      console.log(token)
      setTimeout(() => {
        if (token !== null) {
          Actions.HomeStack();
        } else {
          Actions.SliderInfo();
        }
      }, 1500);
    });
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <View style={styles.fullHeight}>
        <Image style={styles.imageWidth} source={HiasHouseWhiteLogo} />
      </View>
    </Fragment>
  );
};

const getHeightDevice = Dimensions.get('window').height;
const getWidthDevice = Dimensions.get('window').width;

let styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
    width: getWidthDevice,
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

export default Splashpage;
