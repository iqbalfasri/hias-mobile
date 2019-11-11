import React, {useEffect, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {ButtonAnimated} from '../components/HiasButton';
import Container from '../components/Layout/Container';

import globalStyles, {color} from '../styles/globalStyles';

const dummy_data = [
  {
    date: '21 Oct',
    id_order: '1923948123',
    total_product: 1,
    status_order: 'Waiting for Payment',
    status_order_code: 'WAIT_PAYMENT',
  },
  {
    date: '20 Oct',
    id_order: '1831230532',
    total_product: 3,
    status_order: 'Packing',
    status_order_code: 'PACKING',
  },
];

function OrderStatusOnProgress(props) {
  // create card componnent, for a while
  function _renderOrderCardProgress() {
    return (
      <Fragment>
        <TouchableOpacity style={[styles.cardWrapper]}>
          <View style={styles.cardCircleDate}>
            <Text style={[globalStyles.fontMedium, styles.cardCircleDateText]}>
              {'21\nOct'}
            </Text>
          </View>
          <View style={styles.cardDetailWrapper}>
            <Text style={[globalStyles.fontMedium, {fontSize: 14}]}>
              ID 12908390128
            </Text>
            <Text style={[globalStyles.fontMedium, {fontSize: 10}]}>
              1 Product
            </Text>
            <Text
              style={[
                globalStyles.fontMedium,
                {color: color.red, fontSize: 10},
              ]}>
              Waiting for Payment
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cardWrapper]}>
          <View style={styles.cardCircleDate}>
            <Text style={[globalStyles.fontMedium, styles.cardCircleDateText]}>
              {'21\nOct'}
            </Text>
          </View>
          <View style={styles.cardDetailWrapper}>
            <Text style={[globalStyles.fontMedium, {fontSize: 14}]}>
              ID 12908390128
            </Text>
            <Text style={[globalStyles.fontMedium, {fontSize: 10}]}>
              2 Product
            </Text>
            <Text
              style={[
                globalStyles.fontMedium,
                {color: color.primaryColor, fontSize: 10},
              ]}>
              Packing
            </Text>
          </View>
        </TouchableOpacity>
      </Fragment>
    );
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
      <Container>{_renderOrderCardProgress()}</Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 25,
    flexDirection: 'column',
  },

  // card style
  cardWrapper: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  cardCircleDate: {
    width: 64,
    height: 64,
    padding: null,
    overflow: 'hidden',
    borderRadius: 64 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primaryColor,
  },
  cardCircleDateText: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
  },
  cardDetailWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
});

export default OrderStatusOnProgress;
