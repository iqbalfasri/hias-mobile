import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

function Inbox(props) {
  const inboxImage = require('../assets/images/inbox-illustration.png');
  return (
    <View style={styles.fullScreen}>
      <View style={styles.imageWrapper}>
        <Image
          style={{width: null, height: null, flex: 1}}
          source={inboxImage}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Fiturnya masih dibuat</Text>
      </View>
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
    width: 205.5,
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
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Inbox;
