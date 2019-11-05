import React, {Component, useState} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

import globalStyles, {color} from '../../styles/globalStyles';

function LoadingModal(props) {
  return (
    <Overlay
      width="auto"
      height="auto"
      fullScreen={props.isFullScreen}
      visible={props.isVisible}
      windowBackgroundColor="rgba(0, 0, 0, 0.7)">
      <View style={styles.loadingWrapper}>
        <ActivityIndicator color={color.primaryColor} />
        <Text style={[styles.loadingText, globalStyles.fontNormal]}>
          Loading...
        </Text>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  loadingWrapper: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  loadingText: {
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 15,
  },
});

export default LoadingModal;
