import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function Layout(props) {
  return (
    <SafeAreaView style={styles.mainLayout}>{props.children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Layout;
