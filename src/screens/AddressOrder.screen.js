import React, {useState, useEffect, Component} from 'react';
import {View, Text, TouchableOpacity as Button, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

// refrensi buat bikin radio button
// https://stackoverflow.com/questions/31889921/how-to-implement-radio-button-in-react-native
// https://reactnativecode.com/custom-radio-button-group-component/

import {Layout} from '../components/HiasLayout';
import Container from '../components/Layout/Container';

import {localStorage, KEY_STORAGE} from '../lib';
import {fetchGetAddress} from '../lib/api';
import {getDeviceWidth} from '../lib/utils';
import globalStyles, {color} from '../styles/globalStyles';
import {ScrollView} from 'react-native-gesture-handler';

class AddressOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioData: [],
      selectedValue: 0,
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    this._getAddress();
  }

  async _getAddress() {
    try {
      const {radioData} = this.state;
      const getToken = await localStorage.getItem(KEY_STORAGE.TOKEN);
      const getUserId = await localStorage.getItem(KEY_STORAGE.USER_ID);

      const {data} = await fetchGetAddress(8, getToken);
      data.map((data, index) => {
        radioData.push({
          label: `${data.firstName} ${data.lastName} \n${data.address} \n${
            data.phone
          }`,
          value: data,
        });
      });

      // radioData.push(obj);

      this.setState({
        radioData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {radioData} = this.state;
    return (
      <Layout>
        <ScrollView>
          <View style={styles.addressRow}>
            <RadioForm buttonColor={color.primaryColor}>
              {radioData.map((object, index) => {
                const onPress = (value, index) => {
                  this.setState({
                    selectedValue: value,
                    selectedIndex: index,
                  });
                };
                return (
                  <RadioButton
                    wrapStyle={{
                      width: getDeviceWidth,
                      paddingHorizontal: 30,
                      paddingBottom: 15,
                    }}
                    labelHorizontal={true}
                    key={index}>
                    <RadioButtonInput
                      buttonInnerColor={color.primaryColor}
                      buttonOuterColor={color.primaryColor}
                      buttonOuterSize={18}
                      buttonSize={12}
                      obj={object}
                      index={index}
                      isSelected={this.state.selectedIndex === index}
                      onPress={onPress}
                      buttonWrapStyle={{marginRight: 25, alignSelf: 'center'}}
                    />
                    <RadioButtonLabel
                      obj={object}
                      index={index}
                      labelHorizontal={true}
                      onPress={onPress}
                      labelStyle={[
                        globalStyles.fontNormal,
                        {fontSize: 12, lineHeight: 14},
                      ]}
                      labelWrapStyle={{
                        width: getDeviceWidth - 120,
                        borderWidth: 1,
                        borderColor: '#979797',
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        padding: 15,
                      }}
                    />
                  </RadioButton>
                );
              })}
            </RadioForm>
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
          }}>
          <Container>
            <Button
              style={globalStyles.buttonPrimary}
              onPress={() =>
                Actions.jump('BillingDetail', {
                  dataAddress: this.state.selectedValue,
                })
              }>
              <Text style={{textAlign: 'center', color: '#fff'}}>Next</Text>
            </Button>
          </Container>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  addressRow: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
});

export default AddressOrder;
