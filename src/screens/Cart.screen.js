import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

// Own component
import {Container} from '../styles/styled';
import {Layout} from '../components/HiasLayout';
import TopBar from '../components/HiasTopBar';
import globalStyle from '../styles/globalStyles';
import {requestParameter, localStorage, KEY_STORAGE, UrlAPI} from '../lib';
import Button from '../components/HiasButton';
import {Actions} from 'react-native-router-flux';

const exampleDataCart = {
  image: require('../assets/images/products/sofa1.jpg'),
  product_name: 'Valencia Sofa',
  price: 'Rp 2.949.000',
  qty: 1,
};

// Images
const productSofa = require('../assets/images/products/sofa1.jpg');

const QtyButton = props => {
  return (
    <View style={styles.qtyWrapper}>
      <TouchableOpacity onPress={() => props.addQty} style={styles.qtyButton}>
        <Text>+</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 10, color: '#6979F8', fontWeight: 'bold'}}>
        {props.qty}
      </Text>
      <TouchableOpacity
        onPress={() => props.removeQty}
        style={styles.qtyButton}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const CartCard = props => {
  const [qty, setQty] = useState(1);
  const {data} = props;

  const handleAddQty = () => {
    alert('ASU');
    setQty(qty + 1);
  };

  return (
    <View
      style={[styles.productWrapper, globalStyle.elevationShadowStyle(5)]}
      {...props}>
      <View style={styles.productDetailWrapper}>
        <View style={styles.productThumbnail}>
          <Image
            style={{flex: 1, width: null, height: null}}
            source={data.image}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productInfoTitle}>{data.product_name}</Text>
          <Text style={styles.productInfoSubTitle}>{data.price}</Text>
        </View>
        <View>
          <QtyButton
            addQty={() => handleAddQty}
            removeQty={() => setQty(qty - 1)}
            qty={qty}
          />
        </View>
      </View>
    </View>
  );
};

const _handleOrder = async () => {};

const Cart = props => {
  useEffect(() => {
    async function getCart() {
      try {
        const getToken = await localStorage.getItem(KEY_STORAGE.TOKEN);
        const getCartId = await localStorage.getItem(KEY_STORAGE.USER_ID);

        let response = await fetch(
          UrlAPI(`/product/${getCartId}/getCartByUserId`),
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken}`,
            },
          },
        );

        let responseJson = await response.json();
        let {data} = responseJson;
        let {listItems} = data;

        let subTotal = 0;
        listItems.map(list => {
          subTotal += list.price
        });

        // console.log(subTotal, "harusnya bisa!")
      } catch (error) {
        console.log(error);
      }
    }

    getCart();

    return () => {
      return;
    };
  }, []);

  return (
    <Layout>
      <TopBar title="Cart" />
      <ScrollView>
        <Container>
          <CartCard data={exampleDataCart} />
          {/* <CartCard /> */}
        </Container>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 25,
        }}>
        <Button
          onPress={() => _handleOrder()}
          style={{
            width: '100%',
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: '#00B1DB',
          }}>
          <Text style={{textAlign: 'center', color: '#fff'}}>ORDER</Text>
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  productThumbnail: {
    width: 70,
    height: 70,
    backgroundColor: 'red',
    // overflow: 'hidden',
    position: 'relative',
  },
  productWrapper: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  productDetailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
  },
  productInfo: {
    marginLeft: 25,
    flexDirection: 'column',
  },
  productInfoTitle: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 22,
  },
  productInfoSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  qtyWrapper: {
    flex: 1,
    // backgroundColor: 'red',
    // paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyButton: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ECEBED',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;
