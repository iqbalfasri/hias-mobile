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

import HIASLoadingModal from '../components/HIASLoadingModal';

import Container from '../components/Layout/Container';
import {Layout} from '../components/HiasLayout';
import TopBar from '../components/HiasTopBar';
import globalStyle, {color} from '../styles/globalStyles';

import {
  requestParameter,
  localStorage,
  KEY_STORAGE,
  UrlAPI,
  getShortString,
  requireLogin,
} from '../lib';

import {toRupiah, isEmptyObject} from '../lib/utils';
import {fetchGetCart} from '../lib/api';
import globalStyles from '../styles/globalStyles';
import {Icon} from 'react-native-eva-icons';
import {withContext} from '../context/withContext';

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

const _handleOrder = async () => {
  Actions.toptabbar();
};

const Cart = props => {
  const [loading, setLoading] = useState(false);
  const carts = props.store.cart;

  useEffect(() => {
    console.log(props, 'Props');
  }, []);

  if (props.store.cart === null) {
    return <Text>Cart kosong</Text>;
  }

  const renderEmptyCart = () => {
    return <Text>Cart anda kosong.</Text>;
  };

  const renderCartItems = () => {
    return (
      <>
        {carts.listItems.map((item, index) => (
          <View
            key={index}
            style={[
              styles.productWrapper,
              globalStyle.elevationShadowStyle(1.5),
            ]}>
            <View style={styles.productDetailWrapper}>
              <View style={styles.productThumbnail}>
                <Image
                  style={{flex: 1, width: null, height: null}}
                  source={{uri: item.thumbnail}}
                />
              </View>

              <View style={[styles.productInfo, {flex: 1}]}>
                <Text style={styles.productInfoTitle}>
                  {getShortString(item.name, 22)}
                </Text>
                <Text style={styles.productInfoSubTitle}>
                  Rp {toRupiah(item.qty * item.price)}
                </Text>
              </View>

              <View style={styles.qtyWrapper}>
                <Button style={styles.qtyButton}>
                  <Icon width={10} height={10} name="plus" />
                </Button>
                <Text
                  style={[
                    globalStyles.fontMedium,
                    {
                      fontSize: 10,
                      color: color.darkBlue,
                      alignSelf: 'center',
                    },
                  ]}>
                  {item.qty}
                </Text>
                <Button style={styles.qtyButton}>
                  <Icon width={10} height={10} name="minus" />
                </Button>
              </View>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <Layout>
      <TopBar title="Cart" />
      <ScrollView>
        <View style={{paddingHorizontal: 30}}>
          {isEmptyObject(carts) ? renderEmptyCart() : renderCartItems()}
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
            onPress={() => Actions.toptabbar()}>
            <Text style={{textAlign: 'center', color: '#fff'}}>ORDER</Text>
          </Button>
        </Container>
      </View>
      {/* Loading Modal */}
      {loading && <HIASLoadingModal isVisible={loading} />}
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
    paddingVertical: 10,
    paddingHorizontal: 15,
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

export default withContext(Cart);
