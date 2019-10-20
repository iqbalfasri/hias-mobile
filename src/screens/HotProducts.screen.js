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
import {UrlAPI} from '../lib';

const HotProducts = props => {
  const [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    async function getAllHotProducts() {
      let response = await fetch(UrlAPI('/product/hotItems'));
      let {data, success, error} = await response.json();

      setHotProducts(data);
    }

    getAllHotProducts();
  }, []);

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
