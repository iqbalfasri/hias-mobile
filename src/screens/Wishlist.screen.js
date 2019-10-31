import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// own component
import {Layout} from '../components/HiasLayout';
import TopBar from '../components/HiasTopBar';
import Button from '../components/HiasButton';
import {UrlAPI, localStorage, KEY_STORAGE, requestParameter} from '../lib';

function Wishlist(props) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function getWishlist() {
      try {
        const getUserId = await localStorage.getItem(KEY_STORAGE.USER_ID);
        const getToken = await localStorage.getItem(KEY_STORAGE.TOKEN);

        let response = await fetch(
          `/product/wishList/${getUserId}`,
          requestParameter(null, 'GET', getToken),
        );

        let responseJson = await response.json();
        alert(responseJson, 'Data wishlist');
      } catch (error) {}
    }

    getWishlist();

    return () => {
      return;
    };
  }, [wishlist]);

  return (
    <Layout>
      <TopBar title="Wishlist" />
      <ScrollView>
        <Text>Wishlist</Text>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default Wishlist;
