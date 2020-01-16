import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// own component
import {Layout} from '../components/HiasLayout';
import TopBar from '../components/HiasTopBar';
import Button from '../components/HiasButton';
import {UrlAPI, localStorage, KEY_STORAGE, requestParameter} from '../lib';
import {fetchWishlist} from '../lib/api';

import styles from '../styles';

import LargeCard from '../components/Card/LargeCard';
import {withContext} from '../context/withContext';

function Wishlist(props) {
  const {setWishlist, wishlist} = props.store;

  useEffect(() => {
    const getWishlist = async () => {
      try {
        let userId = await localStorage.getItem(KEY_STORAGE.USER_ID);
        let token = await localStorage.getItem(KEY_STORAGE.TOKEN);
        let {data} = await fetchWishlist(userId, token);
        // console.log(getWish);
        setWishlist(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWishlist();
  }, []);

  // useEffect(() => {
  //   productStore.subscribe(setProductState);
  //   productStore.init();
  // }, []);

  // useEffect(() => {
  //   productStore.getWishlist();
  // }, []);

  return (
    <Layout>
      <TopBar title="Wishlist" />
      <ScrollView>
        <View style={styles.container}>
          <LargeCard data={wishlist} />
        </View>
      </ScrollView>
    </Layout>
  );
}

export default withContext(Wishlist);
