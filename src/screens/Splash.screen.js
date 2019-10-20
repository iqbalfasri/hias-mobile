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

const HiasHouseWhiteLogo = require('../assets/images/hiashouse-circle-logo.png');

const Splashpage = () => {
  useEffect(() => {
    // After 2 second redirect to slider info page
    setTimeout(() => {
      Actions.SliderInfo();
    }, 2000);
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
    backgroundColor: '#fff',
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
    width: 272,
    height: 272,
  },
});

export default Splashpage;
