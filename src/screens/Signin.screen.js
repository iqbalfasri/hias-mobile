import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity as Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import HIASLoadingModal from '../components/HIASLoadingModal';

import globalStyles from '../styles/globalStyles';
import {
  deviceWidth,
  requestParameter,
  UrlAPI,
  localStorage,
  KEY_STORAGE,
} from '../lib';

import Storage, { STORAGE_KEY } from '../lib/storage'


const OnlyLogo = require('../assets/images/only-logo.png');

const isIos = Platform.OS == 'ios';

const SigninScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const _handleSignin = async () => {
    try {
      const params = {
        username: email,
        password: password,
      };

      if (email === '' || email === null) {
        alert('Email belum diisi');
      } else if (password === '' || password === null) {
        alert('Password belum diisi');
      } else {
        setModalVisible(true);
        let response = await fetch(
          UrlAPI('/authenticate/login'),
          requestParameter(params, 'POST'),
        );
        let responseJson = await response.json();
        let {success, error, data} = responseJson;

        if (success) {
          // save token to local storage
          Storage.saveItem(KEY_STORAGE.TOKEN, data.login.token);

          // save user id to local storage
          Storage.saveItem(KEY_STORAGE.USER_ID, data.login.user.id);

          // save user data to local storage
          Storage.saveItem(KEY_STORAGE.USER_DATA, data.login.user);

          // Close modal
          setModalVisible(false);

          // redirect to home screen
          setTimeout(() => {
            Actions.HomeStack();
          }, 100);
        } else {
          setModalVisible(false);
          alert(error.errorMessage);
        }
      }
    } catch (error) {
      alert('Email atau Password salah');
      // setModalVisible(false);
    }
  };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.signinWrapper}>
          <Image style={styles.logo} source={OnlyLogo} />
          <View style={{marginVertical: 40}}>
            {/* Form for email */}
            <View style={styles.formGroup}>
              <Text style={[styles.formGroupLabel, globalStyles.fontMedium]}>
                Email address
              </Text>
              <TextInput
                autoCapitalize="none"
                style={[styles.formGroupInput, globalStyles.fontNormal]}
                placeholder="email@yourmail.mail"
                onChangeText={email => setEmail(email)}
              />
            </View>
            {/* Form for password */}
            <View style={styles.formGroup}>
              <Text style={[styles.formGroupLabel, globalStyles.fontMedium]}>
                Password
              </Text>
              <TextInput
                secureTextEntry={true}
                style={[styles.formGroupInput, globalStyles.fontNormal]}
                placeholder="Type your password"
                onChangeText={password => setPassword(password)}
              />
            </View>
            {/* Form for button */}
            <View style={styles.formGroup}>
              <Button
                activeOpacity={0.8}
                style={[
                  globalStyles.buttonTransparent,
                  {paddingHorizontal: null},
                ]}
                onPress={() => Actions.ForgotPassword()}>
                <Text
                  style={[styles.customButtonForget, globalStyles.fontNormal]}>
                  Forgot your password?
                </Text>
              </Button>
            </View>
            <View style={styles.formGroup}>
              <Button
                activeOpacity={0.8}
                onPress={() => _handleSignin()}
                style={globalStyles.buttonPrimary}>
                <Text
                  style={[
                    styles.textWhite,
                    globalStyles.fontBold,
                    {textTransform: 'uppercase'},
                  ]}>
                  Sign in
                </Text>
              </Button>
            </View>
            {/* Form separator */}
            <View
              style={{
                position: 'relative',
                marginVertical: 18,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: deviceWidth - 260,
                  height: 1,
                  backgroundColor: '#000',
                }}
              />
              <Text>Or</Text>
              <View
                style={{
                  width: deviceWidth - 260,
                  height: 1,
                  backgroundColor: '#000',
                }}
              />
            </View>
            {/* Form for social media */}
            <View style={styles.formGroup}>
              <Button
                activeOpacity={0.8}
                onPress={() => Actions.HomeStack()}
                style={globalStyles.buttonFacebook}>
                <Text style={[styles.textWhite, globalStyles.fontNormal]}>
                  Sign in with Facebook
                </Text>
              </Button>
            </View>
            <View style={styles.formGroup}>
              <Button
                activeOpacity={0.8}
                onPress={() => Actions.HomeStack()}
                style={globalStyles.buttonGoogle}>
                <Text style={[styles.textWhite, globalStyles.fontNormal]}>
                  Sign in with Google
                </Text>
              </Button>
            </View>
            {/* Form for create account */}
            <View style={styles.formGroup}>
              <Button
                activeOpacity={0.8}
                onPress={() => Actions.Signup()}
                style={globalStyles.buttonTransparent}>
                <Text
                  style={[styles.customButtonRegist, globalStyles.fontNormal]}>
                  Create a new account
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      {modalVisible && <HIASLoadingModal isVisible={modalVisible} />}
      {/* End Modal */}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 170,
    height: 60.5,
    marginTop: isIos ? 100 : 50,
  },
  signinWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formGroup: {
    width: deviceWidth - 70,
    marginBottom: 8,
  },
  formGroupLabel: {
    textAlign: 'left',
    paddingVertical: 13,
  },
  formGroupInput: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 5,
    color: '#000',
  },
  customButtonForget: {
    color: '#4F6AA3',
    textAlign: 'right',
  },
  customButtonRegist: {
    color: '#4F6AA3',
    textAlign: 'center',
  },
  customButtonSignin: {
    backgroundColor: '#00B1DB',
  },
  customButtomFb: {
    backgroundColor: '#3B5998',
  },
  customButtonGoogle: {
    backgroundColor: '#DD4B39',
  },
  customButton: {
    paddingVertical: 13,
    borderRadius: 5,
  },
  textWhite: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default SigninScreen;
