import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

import globalStyles, {color} from '../styles/globalStyles';
import * as vars from '../styles/variables';

function HIASLoadingModal(props) {
  return (
    <Modal isVisible={props.isVisible}>
      <View style={styles.modalWrapper}>
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color={color.primaryColor} />
          <Text style={[styles.loadingText, globalStyles.fontNormal]}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingWrapper: {
    padding: 20,
    maxWidth: Dimensions.get('window').width - 180,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: vars.color.white,
    borderRadius: 4,
  },
  loadingText: {
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 15,
  },
});

export default HIASLoadingModal;
