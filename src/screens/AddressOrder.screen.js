import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Own component
import {Layout} from '../components/HiasLayout';
import TopBar from '../components/HiasTopBar';
import {Actions} from 'react-native-router-flux';

function AddressOrder(props) {
  console.log(props, "Address prop")

  return (
    <Layout>
      <Text>AddressOrder</Text>
      <TouchableOpacity onPress={() => Actions.jump('BillingDetail', { test: "halo" })}>
        <Text>Next</Text>
      </TouchableOpacity>
    </Layout>
  );
}

export default AddressOrder;
