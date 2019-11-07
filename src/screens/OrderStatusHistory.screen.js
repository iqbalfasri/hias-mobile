import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';

import globalStyles from '../styles/globalStyles';

function OrderStatusOnHistory(props) {
  const under_construct = require('../assets/images/under-construct.png');

  useEffect(() => {
    console.log('Page OrderStatusOnHistory');
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View>
        <Image style={{width: 260, height: 260}} source={under_construct} />
        <Text style={[globalStyles.fontMedium, {textAlign: 'center'}]}>
          Masih development
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default OrderStatusOnHistory;
