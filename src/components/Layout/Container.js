import React from 'react';
import {View, StyleSheet} from 'react-native';

import {getDeviceWidth} from '../../lib/utils';

const Container = props => (
  <View {...props} style={styles.container}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth - 70,
    alignSelf: 'center',
  },
});

export default Container;
