import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

import {Actions} from 'react-native-router-flux';

// Own component
import Button from '../components/HiasButton';
import {Layout} from '../components/HiasLayout';
import globalStyles from '../styles/globalStyles';
import Container from '../components/Layout/Container';

/**
 * Component for detail item products
 * @param {*} props receive all props
 */
function ItemCard(props) {
  return (
    <View style={[styles.orderItemCard, globalStyles.elevationShadowStyle(3)]}>
      {/* Item Image */}
      <View style={styles.itemImageWrapper}>
        <Image
          style={styles.itemImage}
          source={require('../assets/images/products/sofa1.jpg')}
        />
      </View>

      {/* Item detail */}
      <View style={styles.itemDetail}>
        <Text style={styles.itemName}>Relaxing Chair</Text>
        <Text style={styles.itemPrice}>IDR 999.000</Text>
        <Text style={styles.itemAmount}>1 Item</Text>
      </View>
    </View>
  );
}

/**
 * Main Screen
 */
function BillingDetail(props) {
  return (
    <Layout>
      <ScrollView>
        <View style={styles.wrapper}>
          {/* Shiping address */}
          <View>
            <Text style={styles.shipingAddressTextTitle}>Shipping Address</Text>
            {/* Shipping address card */}
            <View
              style={[
                styles.shipingAddressCard,
                globalStyles.elevationShadowStyle(3),
              ]}>
              <Text style={styles.shipingAddressTextName}>Nama pembeli</Text>
              <Text style={styles.shipingAddressTextAddress}>
                {props.addressData}
              </Text>
            </View>
          </View>

          {/*Order items */}
          {/* <View style={styles.orderItemWrapper}>
            <Text style={styles.orderItemTitle}>Billing Items</Text> */}

          {/* Order items card */}
          {/* <ItemCard />
            <ItemCard />
          </View> */}

          {/* Coupon code form */}
          <View />

          {/* Detail order */}
          <View style={styles.detailOrderWrapper}>
            {/* <View style={styles.detailOrderRows}>
              <Text>Subtotal</Text>
              <Text>IDR 3.598.000</Text>
            </View>
            <View style={styles.detailOrderRows}>
              <Text>Discount</Text>
              <Text>IDR 0</Text>
            </View>
            <View style={styles.detailOrderRows}>
              <Text>Shipping</Text>
              <Text>Free</Text>
            </View> */}
            <View style={[styles.detailOrderRows, {paddingVertical: 50}]}>
              <Text style={{fontWeight: 'bold'}}>Total</Text>
              <Text>IDR 3.598.000</Text>
            </View>
          </View>
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
            style={globalStyles.buttonPrimary}
            onPress={() => Actions.jump('Payment')}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Next</Text>
          </Button>
        </Container>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    // backgroundColor: 'lightblue',
  },
  buttonStyle: {
    width: '100%',
    paddingVertical: 13,
    borderRadius: 5,
    backgroundColor: '#00B1DB',
  },
  shipingAddressTextTitle: {
    paddingBottom: 12,
    fontWeight: '500',
  },
  shipingAddressTextName: {
    fontSize: 14,
    paddingBottom: 8,
    fontWeight: 'bold',
  },
  shipingAddressTextAddress: {
    fontSize: 12,
    lineHeight: 14,
  },
  shipingAddressCard: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 4,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  orderItemWrapper: {
    marginVertical: 30,
  },
  orderItemTitle: {
    paddingBottom: 12,
    fontWeight: '500',
  },
  orderItemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 15,
  },
  itemImageWrapper: {
    width: 80,
    height: 80,
    padding: 5,
    borderRadius: 4,
    marginRight: 15,
  },
  itemImage: {
    flex: 1,
    width: null,
    height: null,
  },
  itemDetail: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 12,
    fontWeight: '400',
    paddingBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  itemAmount: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  detailOrderWrapper: {
    width: '100%',
    flexDirection: 'column',
  },
  detailOrderRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});

export default BillingDetail;
