import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

// Own component
import Button from '../components/HiasButton';
import {Layout, Container} from '../components/HiasLayout';
import {isAndroid} from '../lib';
import globalStyle, {color} from '../styles/globalStyles';

const SuccessIlustration = require('../assets/images/hiashouse-succes-signup.png');
const HiasLogoWithText = require('../assets/images/hiashouse-logo-text.png');

const SignupSuccess = () => {
  return (
    <Layout>
      <Container>
        {/* Image logo with text */}
        <Image style={styles.imageLogo} source={HiasLogoWithText} />
        {/* Image ilustration */}
        <Image style={styles.imageSuccess} source={SuccessIlustration} />
        {/* Content group */}
        <View style={styles.contentTextWrapper}>
          <Text style={[styles.textTitle, globalStyle.textBold]}>
            CONGRATULATIONS!
          </Text>
          <Text style={[styles.textSubTitle]}>
            Your Hias House Account has been successfuly registered.
          </Text>
        </View>
        {/* Button group */}
        <View style={styles.buttonGroup}>
          {/* Button for continue */}
          <Button
            style={[globalStyle.primaryButton, {marginBottom: 5}]}
            onPress={() => Actions.HomeStack()}>
            <Text
              style={[
                globalStyle.textWhite,
                globalStyle.textBold,
                globalStyle.textCenter,
              ]}>
              CONTINUE
            </Text>
          </Button>
          {/* Button for signin */}
          <Button
            type="transparent"
            style={[globalStyle.buttonTransparent, {marginTop: 5}]}>
            <Text style={[globalStyle.textCenter, {color: color.darkBlue}]}>
              Already have an account? Sign In
            </Text>
          </Button>
        </View>
      </Container>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSuccess: {
    width: 220,
    height: 210,
    alignSelf: 'center',
  },
  imageLogo: {
    width: 177,
    height: 63,
    marginTop: !isAndroid ? 100 : 50,
    marginBottom: 25,
    alignSelf: 'center',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 20,
  },
  textSubTitle: {
    textAlign: 'center',
    paddingHorizontal: 15,
    lineHeight: 22,
    fontWeight: '300',
  },
  contentTextWrapper: {
    flexDirection: 'column',
  },
  buttonGroup: {
    paddingVertical: 25,
    flexDirection: 'column',
  },
});

export default SignupSuccess;
