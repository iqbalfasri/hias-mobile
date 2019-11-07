import React, { useEffect } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import TopBar from '../components/HiasTopBar';

function OrderStatusOnProgress(props) {
  useEffect(() => {
    console.log("Page OrderStatusOnProgress")
  })
  return (
    <SafeAreaView>
      <View>
        <Text>OrderStatusOnProgress</Text>
      </View>
    </SafeAreaView>
  );
}

export default OrderStatusOnProgress;
