import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity as Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import LoadingModal from '../components/Modal/LoadingModal';

import Container from '../components/Layout/Container';
import {Layout} from '../components/HiasLayout';
import TopBar from '../components/HiasTopBar';
import globalStyle from '../styles/globalStyles';

import {
  requestParameter,
  localStorage,
  KEY_STORAGE,
  UrlAPI,
  getShortString,
  requireLogin,
} from '../lib';

import {toRupiah} from '../lib/utils';
import {fetchGetCart} from '../lib/api';

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
      <Button onPress={() => props.addQty} style={styles.qtyButton}>
        <Text>+</Text>
      </Button>
      <Text style={{fontSize: 10, color: '#6979F8', fontWeight: 'bold'}}>
        {props.qty}
      </Text>
      <Button onPress={() => props.removeQty} style={styles.qtyButton}>
        <Text>-</Text>
      </Button>
    </View>
  );
};

const CartCard = props => {
  const [qty, setQty] = useState(1);
  const {data} = props;

  const handleAddQty = () => {
    setQty(qty + 1);
  };

  return (
    <>
      {data !== undefined
        ? data.map((item, index) => {
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
                    <Text style={styles.productInfoSubTitle}>
                      Rp {toRupiah(item.price)}
                    </Text>
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
    </>
  );
};

const _handleOrder = async () => {
  Actions.toptabbar();
};

const Cart = props => {
  const [cartItems, setCartItems] = useState([]);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _getCart();

    return () => {
      return;
    };
  }, [length]);

  const _getCart = async () => {
    try {
      // fetch cart
      const getToken = await localStorage.getItem(KEY_STORAGE.TOKEN);
      const getCartId = await localStorage.getItem(KEY_STORAGE.USER_ID);

      setLoading(true);

      const {data, success} = await fetchGetCart(getCartId, getToken);
      const {listItems} = data;
      if (success) {
        setLoading(false);
      }

      setLoading(false);

      setCartItems(listItems);
      if (listItems.length === undefined) {
        return;
      }
      setLength(listItems.length);
    } catch (error) {
      console.log(error);
    }
  };

  function renderEmptyCart() {
    const emptyCartImg = require('../assets/images/empty-cart.png');
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 250, height: 250, marginTop: 150}}
          source={emptyCartImg}
        />
        <Text
          style={[globalStyle.fontMedium, {textAlign: 'center', fontSize: 18}]}>
          Keranjangmu masih kosong.
        </Text>
      </View>
    );
  }

  return (
    <Layout>
      <TopBar title="Cart" />
      <ScrollView>
        <View style={{paddingHorizontal: 30}}>
          {cartItems == undefined ? (
            renderEmptyCart()
          ) : (
            <>
              <CartCard data={cartItems} />
            </>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
        }}>
        <Container>
          <Button
            activeOpacity={0.5}
            style={globalStyle.buttonPrimary}
            onPress={() => _handleOrder()}>
            <Text style={{textAlign: 'center', color: '#fff'}}>ORDER</Text>
          </Button>
        </Container>
      </View>
      {/* Loading Modal */}
      <LoadingModal isVisible={loading} />
      {/* END: Loading Modal */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  productThumbnail: {
    width: 70,
    height: 70,
    position: 'relative',
  },
  productWrapper: {
    backgroundColor: '#fff',
    // flex: 1,
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
