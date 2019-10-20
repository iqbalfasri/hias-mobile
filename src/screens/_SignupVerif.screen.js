import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

// Own component
import Button from '../components/HiasButton';
import {Layout, Container} from '../components/HiasLayout';
import {deviceWidth} from '../lib';
import {color} from '../styles/globalStyles';

const RenderIcon = () => (
  <Icon type="font-awesome" name="heartbeat" color="#000" />
);

const SignupVerif = _props => {
  return (
    <Layout>
      <ScrollView>
        <Container>
          <View style={styles.topHeader}>
            <Text style={styles.title}>VERIFY YOUR ACCOUNT</Text>
          </View>
          {/* Separator */}
          <View style={styles.separator} />
          {/* Form */}
          <View style={styles.formWrapper}>
            {/* Form for front camera */}
            <View style={styles.formGroup}>
              <Text>FACE PHOTO</Text>
              <Button
                style={{
                  backgroundColor: 'transparent',
                  paddingVertical: 50,
                  borderWidth: 0.5,
                  borderColor: '#4E4E4E',
                  borderRadius: 5,
                  marginTop: 13,
                }}>
                <Icon
                  color="#444"
                  type="font-awesome"
                  name="camera"
                  size={36}
                />
                <Text style={styles.labelPhoto}>Take a photo</Text>
              </Button>
            </View>
            {/* Form for back camera */}
            <View style={styles.formGroup}>
              <Text>IDENTITY CARD</Text>
              <Button
                style={{
                  backgroundColor: 'transparent',
                  paddingVertical: 50,
                  borderWidth: 0.5,
                  borderColor: '#4E4E4E',
                  borderRadius: 5,
                  marginTop: 13,
                }}>
                <Icon
                  color="#444"
                  type="font-awesome"
                  name="camera"
                  size={36}
                />
                <Text style={styles.labelPhoto}>Take a photo</Text>
              </Button>
            </View>
            {/* Text note */}
            <View>
              <Text style={{lineHeight: 20}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
            {/* Button group */}
            <View style={styles.buttonGroup}>
              {/* Form for button */}
              <Button
                onPress={() => Actions.SignupSuccess()}
                style={[
                  styles.customButton,
                  {backgroundColor: color.primaryColor, marginTop: 18},
                ]}>
                <Text style={styles.textButton}>Next Step</Text>
              </Button>
              {/* Form for already exist button */}
              <Button
                onPress={() => Actions.Signin({type: 'reset'})}
                style={[
                  styles.customButton,
                  {marginBottom: 50, marginTop: 13},
                ]}>
                <Text style={{textAlign: 'center', color: '#4F6AA3'}}>
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
  formGroup: {
    marginTop: 8,
    marginBottom: 20,
  },
  labelPhoto: {
    fontSize: 14,
    paddingVertical: 5,
    textAlign: 'center',
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
    paddingVertical: 25,
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
});

export default SignupVerif;
