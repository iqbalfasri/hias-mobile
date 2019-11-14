import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity as Button,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Layout from '../components/Layout/Layout';
import Container from '../components/Layout/Container';

import globalStyles, {color} from '../styles/globalStyles';

import {toRupiah, getDeviceWidth} from '../lib/utils';
import {fetchOngkir} from '../lib/api';

function BillingDetail(props) {
  const couriers = ['jne', 'pos', 'tiki'];
  const [ongkir, setOngkir] = useState(0);
  const [courierSelected, setCourierSelected] = useState(0);

  const ONGKIR_EXAMPLE = (courierType = 'jne') => {
    return {
      origin: '155',
      destination: '153',
      weight: '302',
      courier: courierType,
    };
  };

  useEffect(() => {
    _handleOngkir(courierSelected);
  }, [ongkir]);

  function _handleOngkir(index) {
    setCourierSelected(index);
    switch (index) {
      case 0: // jne
        _handleOngkirJNE(ONGKIR_EXAMPLE(couriers[index]));
        console.log(couriers[index]);
        break;

      case 1: // pos
        _handleOngkirJNE(ONGKIR_EXAMPLE(couriers[index]));
        console.log(couriers[index]);
        break;

      case 2: // tiki
        _handleOngkirJNE(ONGKIR_EXAMPLE(couriers[index]));
        console.log(couriers[index]);
        break;

      default:
        _handleOngkirJNE(ONGKIR_EXAMPLE(couriers[index]));
        break;
    }
  }

  function _handleOngkirJNE(data) {
    fetchOngkir(data)
      .then(ongkir => {
        setOngkir(ongkir);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function _renderCourier() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 40,
          // marginBottom: 20,
        }}>
        {couriers.map((courier, index) => {
          return (
            <View key={index}>
              {courierSelected == index ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={styles.outerCirlceActive}>
                    <View style={styles.innerCircleActive} />
                  </View>
                  <View style={{paddingHorizontal: 10}}>
                    <Text>{courier.toUpperCase()}</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}
                  onPress={() => _handleOngkir(index)}>
                  <View style={styles.outerCirlce}>
                    <View style={styles.innerCircle} />
                  </View>
                  <View style={{paddingHorizontal: 10}}>
                    <Text>{courier.toUpperCase()}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <Layout>
      <ScrollView>
        <View style={styles.wrapper}>
          <>
            <Text
              style={[styles.shipingAddressTextTitle, globalStyles.fontNormal]}>
              Shiping Address
            </Text>

            <View
              style={[
                styles.shipingAddressCard,
                globalStyles.elevationShadowStyle(1.5),
              ]}>
              <Text
                style={[
                  styles.shipingAddressTextName,
                  globalStyles.fontMedium,
                ]}>
                Nama pembeli
              </Text>
              <Text
                style={[
                  styles.shipingAddressTextAddress,
                  globalStyles.fontNormal,
                ]}>
                Alamat pembeli
              </Text>
            </View>
          </>

          {_renderCourier()}

          <>
            <View style={styles.detailOrderWrapper}>
              <View style={[styles.detailOrderRows, {paddingTop: 30}]}>
                <Text style={globalStyles.fontBold}>Shiping </Text>
                <Text style={globalStyles.fontNormal}>
                  IDR {toRupiah(ongkir)}
                </Text>
              </View>
              <View style={[styles.detailOrderRows]}>
                <Text style={globalStyles.fontBold}>Total</Text>
                <Text style={globalStyles.fontNormal}>IDR 3.598.000</Text>
              </View>
            </View>
          </>
        </View>
      </ScrollView>

      <View style={styles.buttonBottom}>
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
  buttonBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },

  // Radio Styling
  outerCirlceActive: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircleActive: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    alignSelf: 'center',
    backgroundColor: color.primaryColor,
  },
  outerCirlce: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: color.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    alignSelf: 'center',
    backgroundColor: color.white,
  },
});

export default BillingDetail;
