import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';
import LargeCard from '../components/Card/LargeCard';
import {fetchBestSeller} from '../lib/api';
import {withContext} from '../context/withContext';

function BestProduct(props) {
  const {bestProducts} = props.store;
  const {setBestProducts} = props.actions;

  useEffect(() => {
    const getAllBestProduct = async () => {
      try {
        let {data} = await fetchBestSeller();

        setBestProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBestProduct();
  }, []);

  return (
    <Layout>
      <TopBar title="Best Seller" />
      <ScrollView>
        <View style={styles.container}>
          <LargeCard data={bestProducts} />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
});

export default withContext(BestProduct);
