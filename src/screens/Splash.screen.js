import React, {Component, useEffect} from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {withContext} from '../context/withContext';

// next step use this new localstorage
import Storage, {STORAGE_KEY} from '../lib/storage';

import {requireLogin, getDeviceWidth, isEmptyObject} from '../lib/utils';

import {fetchGetCart} from '../lib/api';

const HiasHouseWhiteLogo = require('../assets/images/splash-logo.jpeg');

function SplashScreen(props) {
  const {cart} = props.store;
  const {setCart} = props.actions;

  useEffect(() => {
    _checkIsUserLogin();
  }, [cart]);

  const _checkIsUserLogin = async () => {
    try {
      const isSigned = await requireLogin();
      const token = await Storage.getItem(STORAGE_KEY.TOKEN);
      const userId = await Storage.getItem(STORAGE_KEY.USER_ID);

      // if user already signin, setCart state
      if (isSigned) {
        const {data} = await fetchGetCart(userId, token);
        setCart(data);

        Actions.HomeStack();
      } else {
        Actions.SliderInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(props, "props");

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.fullHeight}>
        <Image style={styles.imageWidth} source={HiasHouseWhiteLogo} />
      </View>
    </>
  );
}

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

export default withContext(SplashScreen);
