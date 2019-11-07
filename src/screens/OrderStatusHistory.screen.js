import React, { useEffect } from 'react';
import {View, Text, SafeAreaView} from 'react-native';

function OrderStatusOnHistory(props) {
  useEffect(() => {
    console.log("Page OrderStatusOnHistory")
  })
  return (
    <SafeAreaView>
      <View>
        <Text>OrderStatusOnHistory</Text>
      </View>
    </SafeAreaView>
  );
}

export default OrderStatusOnHistory;
