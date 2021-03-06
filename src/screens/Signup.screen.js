import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity as Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

import {FormWithLabel} from '../components/HiasForm';
import {Container, Layout} from '../components/HiasLayout';
import LoadingModal from '../components/Modal/LoadingModal';

import {
  deviceWidth,
  UrlAPI,
  requestParameter,
  localStorage,
  KEY_STORAGE,
} from '../lib';
import globalStyle, {color} from '../styles/globalStyles';

// Main screen
const SigupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumer, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // function for handle signup
  _handleSignUp = async () => {
    try {
      const params = {
        name: name,
        email: email,
        username: email,
        password: confirmPassword,
        telp: phoneNumer,
      };

      setModalVisible(true);

      let response = await fetch(
        UrlAPI('/register'),
        requestParameter(params, 'POST'),
      );
      let responseJson = await response.json();
      let {success, error, data} = responseJson;

      let {token} = data.register;
      let {user} = data.register;

      // save token to local storage
      localStorage.saveItem(KEY_STORAGE.TOKEN, token);

      // save userid to local storage
      localStorage.saveItem(KEY_STORAGE.USER_ID, user.id);

      if (success) {
        // close modal
        setModalVisible(false);

        // Regis cart, baru nanti redierect success
        _registCartId(user.id);
      } else {
        // if username / email is already exist
        alert(error.errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert('Server internal error');
    }
  };

  const _registCartId = async userId => {
    try {
      const getToken = await localStorage.getItem(KEY_STORAGE.TOKEN);
      // const getUserId = await localStorage.getItem(KEY_STORAGE.USER_ID);
      const getUserId = userId;
      const params = {
        userId: getUserId,
      };

      let response = await fetch(
        UrlAPI('/product/addToCart'),
        requestParameter(params, 'POST', getToken),
      );

      let responseJson = await response.json();
      if (responseJson.success) {
        Actions.SignupSuccess();
      } else {
        alert('ada kendala saat daftarkan cart id');
      }
    } catch (error) {
      alert('Server Internal error');
    }
  };

  function renderLoadingModal() {
    return <LoadingModal isVisible={modalVisible} />;
  }

  return (
    <Layout>
      <ScrollView>
        <Container>
          <View style={styles.topHeader}>
            <Text style={[styles.title, globalStyle.fontBold]}>
              SIGN UP YOUR ACCOUNT
            </Text>
          </View>
          {/* Separator */}
          <View style={styles.separator} />
          {/* Form */}
          <View style={styles.formWrapper}>
            {/* Form for full name */}
            <FormWithLabel
              label="Full Name"
              placeholder="Enter your full name"
              onChangeText={fullName => setName(fullName)}
            />
            {/* Form for email address */}
            <FormWithLabel
              type="email-address"
              label="Email Address"
              placeholder="Type your mail"
              onChangeText={email => setEmail(email)}
            />
            {/* Form for phone number */}
            <FormWithLabel
              type="number-pad"
              label="Phone Number"
              placeholder="+62"
              onChangeText={phoneNum => setPhoneNumber(phoneNum)}
            />
            {/* Form for password */}
            <FormWithLabel
              label="Password"
              placeholder="Type your password"
              isPassword={true}
              onChangeText={password => setPassword(password)}
            />
            {/* Form for Re type Password */}
            <FormWithLabel
              label="Re-type Password"
              placeholder="Re-type your password"
              isPassword={true}
              onChangeText={confirmPass => setConfirmPassword(confirmPass)}
            />
            {/* Form for agree terms */}
            {/* TODO: fix style */}
            <View>
              <CheckBox
                rightText={
                  'I agree with term and condition from Hias House, view terms and condition.'
                }
                isChecked={checked}
                onClick={() => setChecked(!checked)}
                style={[globalStyle.fontNormal, {flex: 1, paddingVertical: 25}]}
                checkedCheckBoxColor="#000"
                uncheckedCheckBoxColor="#C6C6C5"
              />
            </View>
            {/* Button group */}
            <View style={styles.buttonGroup}>
              {/* Form for Next Step */}
              <Button
                activeOpacity={0.8}
                disabled={!checked}
                onPress={() => _handleSignUp()}
                style={[
                  !checked
                    ? globalStyle.buttonDisable
                    : globalStyle.buttonPrimary,
                  {marginBottom: 5},
                ]}>
                <Text
                  style={[
                    globalStyle.fontBold,
                    {textAlign: 'center', color: '#fff'},
                  ]}>
                  Next Step
                </Text>
              </Button>
              {/* Form for already exist button */}
              <Button
                activeOpacity={0.8}
                onPress={() => Actions.Signin()}
                style={[globalStyle.buttonTransparent, {marginTop: 5}]}>
                <Text
                  style={[
                    globalStyle.fontNormal,
                    {color: color.darkBlue, textAlign: 'center'},
                  ]}>
                  Already have an account? Sign In
                </Text>
              </Button>
            </View>
          </View>
        </Container>
      </ScrollView>
      {/* Modal */}
      {renderLoadingModal()}
      {/* End Modal */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
  },
  separator: {
    maxWidth: deviceWidth - 280,
    height: 2,
    backgroundColor: '#333',
  },
  formWrapper: {
    paddingVertical: 15,
  },
  customButton: {
    paddingVertical: 13,
    borderRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
  },
  buttonGroup: {
    // paddingVertical: 25,
    flexDirection: 'column',
    // backgroundColor: 'yellow',
  },
});

export default SigupScreen;
