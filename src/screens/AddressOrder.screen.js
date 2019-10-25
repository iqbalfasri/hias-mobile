import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

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

function AddressOrder(props) {
  const [addressDetail, setAddressDetail] = useState(temproraryData);

  useEffect(() => {
    console.log(addressDetail, 'Detail data');
  }, []);

  return (
    <Layout>
      <View style={styles.addressRow}>
        
      </View>
      <TouchableOpacity
        onPress={() => Actions.jump('BillingDetail', {test: 'halo'})}>
        <Text>Next</Text>
      </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  addressRow: {
    flexDirection: 'row',
  },
});

export default AddressOrder;
