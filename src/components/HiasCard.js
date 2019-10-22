import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

// Own component
import Button from '../components/HiasButton';
import {color} from '../styles/globalStyles';
import {deviceWidth, getShortString} from '../lib';
import globalStyles from '../styles/globalStyles';
import SkeletonPlaceholder from './SkeletonPlaceholder';

// Image
const sofa1 = require('../assets/images/products/sofa1.jpg');

const _renderSkeleton = props => {
  {
    new Array(4).map((_, index) => {
      return (
        <View
          key={index}
          style={{height: 30, backgroundColor: 'red', width: '100%'}}>
          <SkeletonPlaceholder>
            <View style={styles.cardWrapper} />
          </SkeletonPlaceholder>
        </View>
      );
    });
  }
};

const Card = props => {
  if (props.data.length === 0) {
    return (
      <View style={{paddingVertical: 8}}>
        <Text style={{fontSize: 12, color: '#555'}}>Loading...</Text>
      </View>
    );
  }
  return props.data.map(data => (
    <Button
      key={data.id}
      type="transparent"
      style={[styles.cardWrapper]}
      onPress={() => Actions.ProductDetail({id_product: data.id})}
      {...props}>
      <View
        style={[
          globalStyles.elevationShadowStyle(5),
          styles.imageProductWrapper,
        ]}>
        {/* TODO: change hardcode image source */}
        <Image
          style={styles.imageProduct}
          onLoad={e => console.log(e, 'Loading gambar...')}
          onLoadEnd={e => console.log(e, 'Loading gambar done')}
          source={{uri: data.thumbnail}}
        />
        <RenderBadgesRate bestProduct={data.bestProduct} />
      </View>
      <View style={{flexDirection: 'column', paddingVertical: 13}}>
        <Text style={{fontSize: 16, color: '#2C272D', fontWeight: 'bold'}}>
          {getShortString(data.productName, 20)}
        </Text>
        <View style={styles.infoProductWrapper}>
          <Text style={styles.price}>Rp {data.price}</Text>
          <Icon
            style={{alignSelf: 'center'}}
            name="heart"
            type="evilicon"
            size={24}
            onPress={() => alert('liked')}
          />
        </View>
      </View>
    </Button>
  ));
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
    width: deviceWidth / 3,
    marginRight: 20,
  },
  imageProductWrapper: {
    width: 115,
    height: 115,
    padding: 20,
    // overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
    zIndex: 3000,
  },
  imageProduct: {
    flex: 1,
    width: null,
    height: null,
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
