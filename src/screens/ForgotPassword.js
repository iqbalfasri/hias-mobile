import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {ButtonAnimated} from '../components/HiasButton';

import globalStyles, {color} from '../styles/globalStyles';
import {TextInput} from 'react-native-gesture-handler';
import {doForgotPassword} from '../lib/api';
import { Actions } from 'react-native-router-flux';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setsuccess] = useState(false);

  const _sendLink = async () => {
    setSending(true);
    let {success} = await doForgotPassword(email);
    setsuccess(success);

    if (success) {
      setSending(false);
      return;
    }
  };

  return (
    <View style={[styles.wrapper, globalStyles.container]}>
      <Text style={[globalStyles.fontBold, styles.title]}>
        {'Forgot your password?'}
      </Text>
      <Text style={[globalStyles.fontNormal, styles.description]}>
        {
          'Enter your password below to receive your password reset Intructions.'
        }
      </Text>

      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={email => setEmail(email)}
          keyboardType="email-address"
          style={styles.inputStyle}
          autoCapitalize={'none'}
          placeholder="Input your email"
        />

        <ButtonAnimated
          onPress={() => _sendLink()}
          style={[globalStyles.buttonPrimary, {marginTop: 20}]}>
          <Text
            style={[
              globalStyles.fontBold,
              {textAlign: 'center', color: color.white},
            ]}>
            {sending ? 'Sending...' : 'Send link confirmation'}
          </Text>
        </ButtonAnimated>

        <ButtonAnimated
          onPress={() => Actions.pop()}
          style={[globalStyles.buttonTransparent, {marginTop: 10}]}>
          <Text
            style={[
              globalStyles.fontNormal,
              {textAlign: 'center', color: color.dark, fontSize: 12},
            ]}>
            {'Back to signin screen'}
          </Text>
        </ButtonAnimated>
      </View>

      {success && (
        <Text style={[styles.textSuccess, globalStyles.fontNormal]}>
          {'Link recovery has been sent, please check your email'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    backgroundColor: 'red',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  description: {
    paddingVertical: 10,
    fontSize: 14,
    textAlign: 'center',
    color: color.grey,
    lineHeight: 18,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
  inputStyle: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 5,
    color: '#000',
  },
  inputWrapper: {
    paddingVertical: 15,
    width: '100%',
  },
  textSuccess: {
    marginVertical: 15,
    fontSize: 14,
    textAlign: 'center',
    color: color.orange,
  },
});

export default ForgotPassword;
