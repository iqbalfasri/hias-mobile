import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBarStyle,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Collapsible from 'react-native-collapsible';
import {Actions} from 'react-native-router-flux';
import {Header} from 'react-native-elements';
import {
  deviceWidth,
  UrlAPI,
  requestParameter,
  localStorage,
  KEY_STORAGE,
  toRupiah,
} from '../lib';

// Own component
import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';
import Button, {ButtonAnimated} from '../components/HiasButton';

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
  }, []);

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
                <Text style={styles.productInfoTitle}>
                  {product.productName}
                </Text>
                <Text style={styles.productInfoDesc}>{product.overview}</Text>
                <View style={{paddingVertical: 15}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    {`Rp ${toRupiah(product.price)}`}
                  </Text>
                </View>
                {/* Button group */}
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-between',
                  }}>
                  <ButtonAnimated
                    style={{
                      paddingHorizontal: 13,
                      paddingVertical: 13,
                      width: null,
                      borderRadius: 5,
                      backgroundColor: '#292929',
                    }}
                    type="transparent">
                    <Text style={{color: '#fff'}}>ADD TO REGISTRY</Text>
                  </ButtonAnimated>

                  <ButtonAnimated
                    onPress={() => _handleAddToCart()}
                    style={{
                      paddingHorizontal: 25,
                      paddingVertical: 13,
                      borderRadius: 5,
                      backgroundColor: '#00B1DB',
                    }}
                    type="transparent">
                    <Text style={{color: '#fff', textAlign: 'center'}}>
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
                  <Text style={{fontWeight: 'bold'}}>DESCRIPTION DETAIL</Text>
                  <Icon type="feather" name="chevron-down" />
                </View>
              </Button>

              <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
                <Collapsible collapsed={collapsed}>
                  <Text style={{fontSize: 12, lineHeight: 18}}>
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
  },
  productInfoDesc: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    lineHeight: 20,
  },
});

export default ProductDetail;
