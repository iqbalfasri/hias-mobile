import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import globalStyles from '../styles/globalStyles';

function Inbox(props) {
  const inboxImage = require('../assets/images/inbox-construct.png');
  return (
    <View style={styles.fullScreen}>
      <View style={styles.imageWrapper}>
        <Image
          style={{width: null, height: null, flex: 1}}
          source={inboxImage}
        />
      </View>
      <Text style={[styles.text, globalStyles.fontMedium]}>Fiturnya masih dibuat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width: 250,
    height: 250,
  },
  textWrapper: {
    height: 120,
    // backgroundColor: "red",
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default Inbox;
