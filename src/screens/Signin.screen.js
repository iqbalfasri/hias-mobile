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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from '../components/HiasButton';
import globalStyles from '../styles/globalStyles';
import {
  deviceWidth,
  requestParameter,
  UrlAPI,
  localStorage,
  KEY_STORAGE,
} from '../lib';

const OnlyLogo = require('../assets/images/only-logo.png');

const isIos = Platform.OS == 'ios';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  _handleSignin = async () => {
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
        let response = await fetch(
          UrlAPI('/authenticate/login'),
          requestParameter(params, 'POST'),
        );
        let responseJson = await response.json();
        let {success, error, data} = responseJson;

        if (success) {
          // save token to local storage
          localStorage.saveItem(KEY_STORAGE.TOKEN, data.login.token);

          // save user id to local storage
          localStorage.saveItem(KEY_STORAGE.USER_ID, data.login.user.id);

          // save user data to local storage
          localStorage.saveItem(KEY_STORAGE.USER_DATA, data.login.user);

          // redirect to home screen
          Actions.HomeStack();
        } else {
          alert(error.errorMessage);
        }
      }
    } catch (error) {
      alert('Email atau Password salah');
      console.log(error, 'Error catch');
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
              <Text style={styles.formGroupLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.formGroupInput}
                placeholder="email@yourmail.mail"
                onChangeText={email => setEmail(email)}
              />
            </View>
            {/* Form for password */}
            <View style={styles.formGroup}>
              <Text style={styles.formGroupLabel}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.formGroupInput}
                placeholder="Type your password"
                onChangeText={password => setPassword(password)}
              />
            </View>
            {/* Form for button */}
            <View style={styles.formGroup}>
              <Button
                style={styles.customButton}
                onPress={() => localStorage.removeItem('TOKEN')}>
                <Text style={styles.customButtonForget}>
                  Forgot your password?
                </Text>
              </Button>
            </View>
            <View style={styles.formGroup}>
              <Button
                onPress={() => _handleSignin()}
                style={[styles.customButton, styles.customButtonSignin]}>
                <Text
                  style={[
                    styles.textWhite,
                    globalStyles.textUpp,
                    globalStyles.textBold,
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
                onPress={() => Actions.HomeStack()}
                style={[styles.customButton, styles.customButtomFb]}>
                <Text style={[styles.textWhite]}>Sign in with Facebook</Text>
              </Button>
            </View>
            <View style={styles.formGroup}>
              <Button
                onPress={() => Actions.HomeStack()}
                style={[styles.customButton, styles.customButtonGoogle]}>
                <Text style={[styles.textWhite]}>Sign in with Google</Text>
              </Button>
            </View>
            {/* Form for create account */}
            <View style={styles.formGroup}>
              <Button
                onPress={() => Actions.Signup()}
                style={[styles.customButton, {paddingVertical: 30}]}>
                <Text style={styles.customButtonRegist}>
                  Create a new account
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
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
