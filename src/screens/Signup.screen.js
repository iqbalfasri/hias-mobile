import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
// import {CheckBox} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

// Own component
import Button from '../components/HiasButton';
import {FormWithLabel} from '../components/HiasForm';
import {Container, Layout} from '../components/HiasLayout';
import {deviceWidth} from '../lib';
import globalStyle, {color} from '../styles/globalStyles';

const SigupScreen = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Layout>
      <ScrollView>
        <Container>
          <View style={styles.topHeader}>
            <Text style={styles.title}>SIGN UP YOUR ACCOUNT</Text>
          </View>
          {/* Separator */}
          <View style={styles.separator} />
          {/* Form */}
          <View style={styles.formWrapper}>
            {/* Form for full name */}
            <FormWithLabel
              label="Full Name"
              placeholder="Enter your full name"
            />
            {/* Form for email address */}
            <FormWithLabel label="Email Address" placeholder="Type your mail" />
            {/* Form for phone number */}
            <FormWithLabel label="Phone Number" placeholder="+62" />
            {/* Form for password */}
            <FormWithLabel
              label="Password"
              placeholder="Type your password"
              isPassword={true}
            />
            {/* Form for Re type Password */}
            <FormWithLabel
              label="Re-type Password"
              placeholder="Re-type your password"
              isPassword={true}
            />
            {/* Form for agree terms */}
            {/* TODO: fix style */}
            <View>
              {/* <CheckBox
                checked={checked}
                onPress={() => setChecked(!checked)}
                title="I agree with term and condition from Hias House, view terms and condition."
              /> */}
              <CheckBox
                rightText={
                  'I agree with term and condition from Hias House, view terms and condition.'
                }
                isChecked={checked}
                onClick={() => setChecked(!checked)}
                style={{flex: 1, paddingVertical: 25}}
                // checkBoxColor="#00B1DB"
                checkedCheckBoxColor="#000"
                uncheckedCheckBoxColor="#C6C6C5"
              />
            </View>
            {/* Button group */}
            <View style={styles.buttonGroup}>
              {/* Form for Next Step */}
              <Button
                disabled={!checked}
                onPress={() => Actions.SignupSuccess()}
                style={[globalStyle.primaryButton, {marginBottom: 5}]}>
                <Text
                  style={[
                    globalStyle.textWhite,
                    globalStyle.textBold,
                    globalStyle.textCenter,
                  ]}>
                  Next Step
                </Text>
              </Button>
              {/* Form for already exist button */}
              <Button
                type="transparent"
                onPress={() => Actions.Signin()}
                style={[globalStyle.buttonTransparent, {marginTop: 5}]}>
                <Text style={[globalStyle.textCenter, {color: color.darkBlue}]}>
                  Already have an account? Sign In
                </Text>
              </Button>
            </View>
          </View>
        </Container>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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
