import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity as Button,
} from 'react-native';

import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import globalStyles from '../../styles/globalStyles';

import {getShortString, getDeviceHeight, toRupiah} from '../../lib/utils';

function LargeCard(props) {
  const {data} = props;

  function eachProduct() {
    return data.map(data => {
      return (
        <Button
          key={data.id}
          style={styles.cardWrapper}
          onPress={() => Actions.ProductDetail({id_product: data.id})}>
          <View
            style={[globalStyles.elevationShadowStyle(5), styles.imageWrapper]}>
            <Image style={styles.imageProduct} source={{uri: data.thumbnail}} />
          </View>
          <View style={styles.productInfoWrapper}>
            <Text style={[styles.productTitle, globalStyles.fontBold]}>
              {getShortString(data.productName, 16)}
            </Text>
            <View style={styles.productDetailInfo}>
              <Text style={[styles.productPrice, globalStyles.fontMedium]}>
                Rp {toRupiah(data.price)}
              </Text>
              <Icon
                color="#969696"
                style={{alignSelf: 'center'}}
                name="heart"
                type="evilicon"
                size={28}
                onPress={() => alert('liked')}
              />
            </View>
          </View>
        </Button>
      );
    });
  }

  return <View style={styles.cardContainer}>{eachProduct()}</View>;
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardWrapper: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 8,
  },
  imageWrapper: {
    width: '100%',
    height: getDeviceHeight / 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 4,
  },
  imageProduct: {
    width: 115,
    height: 115,
    alignSelf: 'center',
  },
  productInfoWrapper: {
    flexDirection: 'column',
    paddingVertical: 13,
  },
  productDetailInfo: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    color: '#2C272D',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#969696',
    lineHeight: 22,
  },
});

export default LargeCard;
