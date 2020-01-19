import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';

function HIASImagePreview({isOpen, onCloseModal}) {
  return (
    <Modal
      swipeDirection="down"
      isVisible={isOpen}
      onSwipeComplete={() => onCloseModal()}>
      <Swiper>
        <View style={styles.wrapper}>
          <Text>Slide 1</Text>
        </View>
        <View style={styles.wrapper}>
          <Text>Slide 2</Text>
        </View>
        <View style={styles.wrapper}>
          <Text>Slide 3</Text>
        </View>
      </Swiper>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'salmon',
  },
});

export default HIASImagePreview;
