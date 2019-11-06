import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';

import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';
import LargeCard from '../components/Card/LargeCard';

import {UrlAPI, deviceHeight} from '../lib';

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

  console.log(hotProducts);

  return (
    <Layout>
      <TopBar title="Hot Items" />
      <ScrollView>
        <View style={styles.container}>
          <LargeCard data={hotProducts} />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardWrapper: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 8,
  },
  imageWrapper: {
    width: '100%',
    height: deviceHeight / 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 4,
  },
  imageProduct: {
    width: 115,
    height: 115,
    alignSelf: 'center',
  },
  productInfoWrapper: {
    flexDirection: 'column',
    paddingVertical: 13,
  },
  productDetailInfo: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    color: '#2C272D',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#969696',
    lineHeight: 22,
    fontWeight: 'bold',
  },
});

export default HotProducts;
