import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';

const HotProducts = props => {
  console.log(props, "Props hot products screen");
  return (
    <Layout>
      <TopBar title="Products" />
      <ScrollView>
        <View>
          <Text>Hallo</Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HotProducts;
