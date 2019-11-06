import React, { useEffect } from 'react';
import {View, Text, SafeAreaView} from 'react-native';

function OrderStatusOnProgress(props) {
  useEffect(() => {
    alert("Page OrderStatusOnProgress")
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
