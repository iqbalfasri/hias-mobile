import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity as Button} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Layout from '../components/Layout/Layout';
import Container from '../components/Layout/Container';

import globalStyles from '../styles/globalStyles';

class BillingDetail extends Component {
  render() {
    return (
      <Layout>
        <ScrollView>
          <View style={styles.wrapper}>
            <>
              <Text style={[styles.shipingAddressTextTitle, globalStyles.fontNormal]}>
                Shiping Address
              </Text>

              <View
                style={[
                  styles.shipingAddressCard,
                  globalStyles.elevationShadowStyle(1.5),
                ]}>
                <Text style={[styles.shipingAddressTextName, globalStyles.fontMedium]}>Nama pembeli</Text>
                <Text style={[styles.shipingAddressTextAddress, globalStyles.fontNormal]}>
                  Alamat pembeli
                </Text>
              </View>
            </>

            <>
              <View style={styles.detailOrderWrapper}>
                <View style={[styles.detailOrderRows, {paddingTop: 30}]}>
                  <Text style={globalStyles.fontBold}>Shiping </Text>
                  <Text style={globalStyles.fontNormal}>IDR 12.000</Text>
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
});

export default BillingDetail;
