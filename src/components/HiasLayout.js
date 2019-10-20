import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {deviceWidth, isAndroid} from '../lib';

export const Layout = props => {
  return isAndroid ? (
    <View style={styles.layout}>{props.children}</View>
  ) : (
    <SafeAreaView style={styles.layout}>{props.children}</SafeAreaView>
  );
};

export const Container = props => (
  <View style={[styles.containerWrapper, props.style]} {...props}>
    <View style={styles.container}>{props.children}</View>
  </View>
);

export const ShadowView = props => {
  return <View style={styles.shadowView}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    width: deviceWidth - 70,
  },
  layout: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
