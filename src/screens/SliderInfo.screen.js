import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity as Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Container from '../components/Layout/Container';

import globalStyles from '../styles/globalStyles';

const HiasHouseMasterLogo = require('../assets/images/hiashouse-master-logo.png');
const backgroundImage = require('../assets/images/background-sliderinfo.png');

const SliderInfopage = () => {
  return (
    <View style={styles.mainLayout}>
      <Image style={styles.background} source={backgroundImage} />
      <View>
        <Image style={styles.masterLogo} source={HiasHouseMasterLogo} />
      </View>
      <Container>
        <View style={styles.contentText}>
          <Text
            style={[
              styles.centeredText,
              styles.titleText,
              styles.textWhite,
              globalStyles.fontBold,
            ]}>
            Find Your Needs
          </Text>
          <Text
            style={[
              styles.centeredText,
              styles.subTitleText,
              styles.textWhite,
              globalStyles.fontMedium,
            ]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
        <View
          style={{
            marginVertical: 30,
          }}>
          <Button
            activeOpacity={0.8}
            onPress={() => Actions.Signin()}
            style={globalStyles.buttonWhite}>
            <Text
              style={[
                styles.textBlueLight,
                styles.centeredText,
                styles.textUppercase,
                globalStyles.fontBold,
              ]}>
              Next
            </Text>
          </Button>
          <Button
            activeOpacity={0.8}
            onPress={() => Actions.HomeStack()}
            style={globalStyles.buttonTransparent}>
            <Text
              style={[
                styles.textWhite,
                styles.centeredText,
                styles.textUppercase,
                globalStyles.fontBold,
              ]}>
              Skip this
            </Text>
          </Button>
        </View>
      </Container>
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
    borderRadius: 5,
  },
  customButtonTp: {
    padding: 10,
    marginVertical: 20,
    width: Dimensions.get('window').width - 80,
    borderRadius: 13,
  },
});

export default SliderInfopage;
