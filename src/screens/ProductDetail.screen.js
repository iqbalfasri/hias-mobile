import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity as Button,
  StatusBarStyle,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import Swiper from 'react-native-swiper';
import Collapsible from 'react-native-collapsible';
import {Actions} from 'react-native-router-flux';

import {toRupiah, getDeviceWidth} from '../lib/utils';

import {
  deviceWidth,
  UrlAPI,
  requestParameter,
  localStorage,
  KEY_STORAGE,
} from '../lib';

// Own component
import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';
import {ButtonAnimated} from '../components/HiasButton';

import globalStyle, {color} from '../styles/globalStyles';

const sofa1 = require('../assets/images/products/sofa1.jpg');

const ProductDetail = props => {
  const [detailProduct, setDetailProduct] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const {id_product} = props;

  useEffect(() => {
    async function getDetailProduct() {
      let response = await fetch(UrlAPI(`/product/${id_product}`));
      let {data, success, error} = await response.json();
      if (!success) {
        alert('Server internal error');
      }

      setDetailProduct(data);
    }

    getDetailProduct();
  }, [id_product]);

  const _handleAddToCart = async () => {
    try {
      const getToken = await localStorage.getItem(KEY_STORAGE.TOKEN);
      const getCartId = await localStorage.getItem(KEY_STORAGE.USER_ID);
      const params = {
        cartId: getCartId,
        productId: id_product,
        amount: 1,
      };

      let response = await fetch(
        UrlAPI('/product/addItemToCart'),
        requestParameter(params, 'POST', getToken),
      );

      const responseJson = await response.json();
      if (responseJson.success) {
        alert('Berhasil tambah cart');
        Actions.Cart();
      } else {
        alert('Ada masalah saat tambah cart');
      }
    } catch (error) {
      alert('Server internal error');
    }
  };

  // Add to wishlist button
  const AddToWishList = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 30,
          left: 0,
        }}>
        <Button onPress={() => alert('Liked')}>
          <Icon
            onPress={() => alert('Icon Liked')}
            width={28}
            height={28}
            name="heart-outline"
          />
        </Button>
      </View>
    );
  };

  // this function to create modal button for preview image products
  const PreviewImage = () => {
    return;
  };

  // color option selection
  const ColorOptions = () => {
    return (
      <View style={styles.colorOptionsWrapper}>
        <View>
          <Text
            style={[globalStyle.fontNormal, {color: '#9191AF', fontSize: 15}]}>
            Color Options
          </Text>
        </View>
        <View style={styles.optionDotWrapper}>
          <View style={[styles.optionDot, {backgroundColor: color.red}]} />
          <View style={[styles.optionDot, {backgroundColor: color.darkBlue}]} />
          <View style={[styles.optionDot, {backgroundColor: color.dark}]} />
          <View style={[styles.optionDot, {backgroundColor: color.orange}]} />
        </View>
      </View>
    );
  };

  // tone option selection
  const ToneOptions = () => {
    return (
      <View style={styles.toneOptionsWrapper}>
        <View>
          <Text
            style={[globalStyle.fontNormal, {color: '#9191AF', fontSize: 15}]}>
            Tone Options
          </Text>
        </View>
        <View style={styles.optionDotWrapper}>
          <View style={[styles.optionDot, {backgroundColor: color.red}]} />
          <View style={[styles.optionDot, {backgroundColor: color.darkBlue}]} />
          <View style={[styles.optionDot, {backgroundColor: color.dark}]} />
          <View style={[styles.optionDot, {backgroundColor: color.orange}]} />
        </View>
      </View>
    );
  };

  const DetailProduct = ({data}) => {
    // FIXME: SELANJUTNYA BUATKAN SKELETON UNTUK HANDLE LOAD DATA
    if (data.length == null || data == null || data == undefined) {
      return null;
    }
    return (
      <React.Fragment>
        {data.map(product => (
          <React.Fragment key={product.id}>
            <View style={{paddingHorizontal: 30}}>
              {/* Image slider */}
              <View style={styles.imageSliderWrapper}>
                <Swiper
                  activeDotColor="#fff"
                  dotColor="transparent"
                  dotStyle={{borderColor: '#fff', borderWidth: 1}}
                  height={200}
                  containerStyle={{width: deviceWidth}}>
                  <View style={styles.slideContent}>
                    <View style={styles.overlay} />
                    <Image
                      source={sofa1}
                      style={{flex: 1, width: '60%', height: null, zIndex: -1}}
                    />
                  </View>
                  <View style={styles.slideContent}>
                    <View style={styles.overlay} />
                    <Image
                      source={sofa1}
                      style={{flex: 1, width: '60%', height: null, zIndex: -1}}
                    />
                  </View>
                  <View style={styles.slideContent}>
                    <View style={styles.overlay} />
                    <Image
                      source={sofa1}
                      style={{flex: 1, width: '60%', height: null, zIndex: -1}}
                    />
                  </View>
                  <View style={styles.slideContent}>
                    <View style={styles.overlay} />
                    <Image
                      source={sofa1}
                      style={{flex: 1, width: '60%', height: null, zIndex: -1}}
                    />
                  </View>
                </Swiper>
              </View>

              {/* Product info */}
              <View style={styles.productInfoWrapper}>
                {/* Add to wishlist Button */}
                <AddToWishList />
                {/* END: Add to wishlist button */}
                <View style={{alignItems: 'center'}}>
                  <Text style={[styles.productInfoTitle, globalStyle.fontBold]}>
                    {product.productName}
                  </Text>
                </View>
                <View style={{paddingVertical: 10}}>
                  <Text
                    style={[
                      globalStyle.fontBold,
                      {
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: color.orange,
                      },
                    ]}>
                    {`Rp ${toRupiah(product.price)}`}
                  </Text>
                </View>

                {/* Options color and tone */}
                <View style={styles.optionsWrapper}>
                  <ColorOptions />
                  <ToneOptions />
                </View>

                {/* Button group */}
                <View>
                  <ButtonAnimated
                    onPress={() => _handleAddToCart()}
                    style={globalStyle.buttonPrimary}>
                    <Text
                      style={[
                        globalStyle.fontMedium,
                        {color: '#fff', textAlign: 'center'},
                      ]}>
                      ADD TO CART
                    </Text>
                  </ButtonAnimated>
                </View>
              </View>
            </View>
            <View>
              <Button
                style={{
                  paddingVertical: 15,
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderColor: '#222',
                  width: '100%',
                }}
                onPress={() => setCollapsed(!collapsed)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 30,
                  }}>
                  <Text style={globalStyle.fontBold}>DESCRIPTION DETAIL</Text>
                  <Icon width={24} height={24} name="chevron-down-outline" />
                </View>
              </Button>

              <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
                <Collapsible collapsed={collapsed}>
                  <Text
                    style={[
                      globalStyle.fontNormal,
                      {fontSize: 12, lineHeight: 18},
                    ]}>
                    {product.description}
                  </Text>
                </Collapsible>
              </View>
            </View>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <StatusBar />
      <TopBar title={null} />
      <ScrollView>
        <DetailProduct data={detailProduct} />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flexScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSliderWrapper: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: -1,
    position: 'relative',
    padding: 20,
  },
  overlay: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  productInfoWrapper: {
    paddingVertical: 30,
  },
  productInfoTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: 15,
    maxWidth: getDeviceWidth - 120,
  },
  productInfoDesc: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    lineHeight: 20,
  },
  optionsWrapper: {
    flexDirection: 'row',
    marginVertical: 25,
    justifyContent: 'space-around',
    // backgroundColor: 'red',
  },
  optionDot: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    marginRight: 8,
  },
  optionDotWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    // backgroundColor: 'yellow',
  },
  colorOptionsWrapper: {
    // backgroundColor: 'red',
    // flex: 1,
  },
  toneOptionsWrapper: {
    // backgroundColor: 'yellow',
    // flex: 1,
  },
});

export default ProductDetail;
