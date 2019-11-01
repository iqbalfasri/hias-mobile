import React from 'react';
import {View, StyleSheet} from 'react-native';

import {deviceWidth} from '../../lib';

const Container = props => (
  <View {...props} style={styles.container}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 70,
  },
});

export default Container;
