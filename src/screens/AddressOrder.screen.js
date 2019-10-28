import React, {useState, useEffect, Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

// Own component
import {Layout} from '../components/HiasLayout';
import TopBar from '../components/HiasTopBar';
import {Actions} from 'react-native-router-flux';

const temproraryData = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Black',
    company_name: 'Hias House',
    town_city: 'DKI Jakarta',
    post_code: '1234',
    address:
      'Lorem Ipsum is simply dummy text of the printing and typesetting indu',
    email: 'johnblack@gmail.com',
    phone_number: '08960542423',
  },
];

const data = [
  {
    label: 'jln kubis III dalam B',
    value: {
      firstName: 'daffaa',
      lastName: 'akhlaric',
      country: 'indonesia',
      address: 'jln kubis III dalam B',
      city: 'akhlaric@gmail.com',
      phone: '087757185033',
      company: null,
      postCode: '15368',
      idAddress: 3,
      email: 'akhlaric@gmail.com',
    },
  },
  {
    label: 'jln kubis III dalam A',
    value: {
      firstName: 'daffaa',
      lastName: 'akhlaric',
      country: 'indonesia',
      address: 'jln kubis III dalam A',
      city: 'akhlaric@gmail.com',
      phone: '087757185033',
      company: null,
      postCode: '15368',
      idAddress: 3,
      email: 'akhlaric@gmail.com',
    },
  },
];
class AddressOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <View style={styles.addressRow}>
          <RadioForm
            radio_props={data}
            initial={0}
            onPress={value =>
              this.setState({value}, () => alert(JSON.stringify(this.state.value)))
            }
          />
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  addressRow: {
    flexDirection: 'row',
  },
});

export default AddressOrder;
