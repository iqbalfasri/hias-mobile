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
import {ButtonAnimated} from '../components/HiasButton';
import {
  requestParameter,
  localStorage,
  KEY_STORAGE,
  UrlAPI,
  getShortString,
  requireLogin,
} from '../lib';
import Button from '../components/HiasButton';
import {Actions} from 'react-native-router-flux';
import {getDeviceHeight} from '../lib/utils';

const exampleDataCart = {
  image: require('../assets/images/products/sofa1.jpg'),
  product_name: 'Valencia Sofa',
  price: 'Rp 2.949.000',
  qty: 1,
};

// Images

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
    <React.Fragment>
      {data !== undefined
        ? data.map((item, index) => {
            console.log(item, 'Item card');
            return (
              <View
                key={index}
                style={[
                  styles.productWrapper,
                  globalStyle.elevationShadowStyle(5),
                ]}
                {...props}>
                <View style={styles.productDetailWrapper}>
                  <View style={styles.productThumbnail}>
                    <Image
                      style={{flex: 1, width: null, height: null}}
                      source={{uri: item.thumbnail}}
                    />
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productInfoTitle}>
                      {getShortString(item.name, 10)}
                    </Text>
                    <Text style={styles.productInfoSubTitle}>{item.price}</Text>
                  </View>
                  <View>
                    <QtyButton
                      addQty={() => handleAddQty}
                      removeQty={() => setQty(qty - 1)}
                      qty={item.qty}
                    />
                  </View>
                </View>
              </View>
            );
          })
        : null}
    </React.Fragment>
  );
};

const _handleOrder = async () => {
  Actions.toptabbar();
};

const Cart = props => {
  const [cartItems, setCartItems] = useState([]);
  const [length, setLength] = useState(0);

  useEffect(() => {
    async function getCart() {
      try {
        // Check if user not login
        // if (requireLogin()) {
        //   Actions.Signin();
        //   return;
        // }

        // console.log(requireLogin(), 'require login');

        // fetch cart
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
        let {data, success} = responseJson;
        let {listItems} = data;

        setCartItems(listItems);
        if (listItems.length === undefined) {
          return;
        }
        setLength(listItems.length);

        console.log(Object.values(listItems).length, 'val');
      } catch (error) {
        console.log(error);
      }
    }

    getCart();

    return () => {
      return;
    };
  }, [length]);

  function renderEmptyCart() {
    const emptyCartImg = require('../assets/images/empty-cart.png');
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={{width: 250, height: 250, marginTop: 150}} source={emptyCartImg} />
        <Text style={[globalStyle.fontMedium, {textAlign: 'center', fontSize: 18}]}>
          Keranjangmu masih kosong.
        </Text>
      </View>
    );
  }

  return (
    <Layout>
      <TopBar title="Cart" />
      <ScrollView>
        <Container>
          {cartItems == undefined ? (
            renderEmptyCart()
          ) : (
            <CartCard data={cartItems} />
          )}
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
        <View style={{paddingHorizontal: 30}}>
          <ButtonAnimated onPress={() => _handleOrder()}>
            <Text style={{textAlign: 'center', color: '#fff'}}>ORDER</Text>
          </ButtonAnimated>
        </View>
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
