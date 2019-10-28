import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from '../components/HiasButton';

const HiasHouseMasterLogo = require('../assets/images/hiashouse-master-logo.png');
const backgroundImage = require('../assets/images/background-sliderinfo.png');

const SliderInfopage = () => {
  return (
    <View style={styles.mainLayout}>
      <Image style={styles.background} source={backgroundImage} />
      <View>
        <Image style={styles.masterLogo} source={HiasHouseMasterLogo} />
      </View>
      <View style={styles.contentText}>
        <Text style={[styles.centeredText, styles.titleText, styles.textWhite]}>
          Find Your Needs
        </Text>
        <Text
          style={[styles.centeredText, styles.subTitleText, styles.textWhite]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </View>
      <View
        style={{
          marginVertical: 30,
        }}>
        <Button onPress={() => Actions.Signin()} style={styles.customButton}>
          <Text
            style={[
              styles.textBlueLight,
              styles.centeredText,
              styles.textUppercase,
              styles.textBold,
            ]}>
            Next
          </Text>
        </Button>
        <Button onPress={() => Actions.HomeStack()} style={styles.customButtonTp}>
          <Text
            style={[
              styles.textWhite,
              styles.centeredText,
              styles.textUppercase,
              styles.textBold,
            ]}>
            Skip this
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    zIndex: -1,
    position: 'absolute',
  },
  mainLayout: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  masterLogo: {
    width: 135,
    height: 198,
  },
  contentText: {
    padding: 20,
    maxWidth: Dimensions.get('window').width - 30,
  },
  centeredText: {
    textAlign: 'center',
  },
  titleText: {
    paddingVertical: 10,
    fontSize: 20,
  },
  subTitleText: {
    paddingVertical: 5,
    fontSize: 14,
    lineHeight: 21,
  },
  textWhite: {
    color: '#ffffff',
  },
  textBlueLight: {
    color: '#23ABCE',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  textBold: {
    fontWeight: 'bold',
  },
  customButton: {
    backgroundColor: 'white',
    padding: 10,
    width: Dimensions.get('window').width - 80,
    borderRadius: 13,
  },
  customButtonTp: {
    padding: 10,
    marginVertical: 20,
    width: Dimensions.get('window').width - 80,
    borderRadius: 13,
  },
});

export default SliderInfopage;
