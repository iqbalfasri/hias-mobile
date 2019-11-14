import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

// Own component
import {ButtonAnimated} from '../components/HiasButton';

import globalStyles, {color} from '../styles/globalStyles';

import {toRupiah, getShortString, getDeviceWidth} from '../lib/utils';

const Card = props => {
  if (props.data.length === 0) {
    return (
      <View style={{paddingVertical: 8}}>
        <Text style={{fontSize: 12, color: '#555'}}>Loading...</Text>
      </View>
    );
  }
  return props.data.map((data, index) => (
    <ButtonAnimated
      key={index}
      type="transparent"
      style={[styles.cardWrapper]}
      onPress={() => Actions.ProductDetail({id_product: data.id})}
      {...props}>
      <View
        style={[
          globalStyles.elevationShadowStyle(1.5),
          styles.imageProductWrapper,
        ]}>
        {/* TODO: change hardcode image source */}
        <Image
          resizeMethod="resize"
          style={styles.imageProduct}
          source={{uri: data.thumbnail}}
        />
        <RenderBadgesRate bestProduct={data.bestProduct} />
      </View>
      <View style={{flexDirection: 'column', paddingVertical: 13}}>
        <Text style={[globalStyles.fontBold, {fontSize: 16, color: '#2C272D'}]}>
          {getShortString(data.productName, 20)}
        </Text>
        <View style={styles.infoProductWrapper}>
          <Text style={[globalStyles.fontNormal, {lineHeight: 28}]}>
            {`Rp ${toRupiah(data.price)}`}
          </Text>
          <Icon
            style={{alignSelf: 'center'}}
            name="heart"
            type="evilicon"
            size={24}
            onPress={() => alert('liked')}
          />
        </View>
      </View>
    </ButtonAnimated>
  ));
};

export const LargeCard = props => {
  const {data} = props;
  return (
    <React.Fragment>
      {data.map(data => {
        return (
          <ButtonAnimated
            key={data.id}
            type="transparent"
            style={styles.cardWrapper}
            onPress={() => Actions.ProductDetail({id_product: data.productId})}>
            <View
              style={[
                globalStyles.elevationShadowStyle(5),
                styles.imageWrapper,
              ]}>
              <Image
                style={styles.imageProduct}
                source={{uri: data.thumbnail}}
              />
            </View>
            <View style={styles.productInfoWrapper}>
              <Text style={styles.productTitle}>
                {getShortString(data.productName, 16)}
              </Text>
              <View style={styles.productDetailInfo}>
                <Text style={styles.productPrice}>Rp {data.price}</Text>
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
          </ButtonAnimated>
        );
      })}
    </React.Fragment>
  );
};

/**
 *
 * Rating best product
 */
const RenderBadgesRate = ({bestProduct}) => {
  if (bestProduct) {
    return (
      <View
        style={[
          globalStyles.elevationShadowStyle(5),
          styles.bestProductWrapper,
        ]}>
        <Icon
          name="star"
          type="font-awesome"
          color={color.white}
          size={10}
          style={{alignSelf: 'center'}}
        />
        <Text style={styles.bestProductText}>5.0</Text>
      </View>
    );
  }

  return false;
};

RenderBadgesRate.defaultProps = {
  bestProduct: false,
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: getDeviceWidth / 3,
    marginRight: 20,
  },
  imageProductWrapper: {
    width: 115,
    height: 115,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
    zIndex: 3000,
  },
  imageProduct: {
    flex: 1,
    width: 110,
    height: 110,
    alignSelf: 'center',
  },
  infoProductWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 5,
  },
  priceText: {
    fontSize: 12,
    color: '#969696',
    fontWeight: '600',
    textAlign: 'center',
  },
  bestProductWrapper: {
    top: 5,
    right: 5,
    position: 'absolute',
    padding: 4,
    borderRadius: 5,
    backgroundColor: color.primaryColor,
  },
  bestProductText: {
    fontSize: 10,
    color: color.white,
    lineHeight: 16,
  },
});

export default Card;
