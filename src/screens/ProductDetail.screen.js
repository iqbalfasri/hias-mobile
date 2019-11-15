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
  Modal,
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

import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';
import {ButtonAnimated} from '../components/HiasButton';

import Card from '../components/HiasCard';

import globalStyle, {color} from '../styles/globalStyles';

import {fetchBestSeller} from '../lib/api';

const sofa1 = require('../assets/images/products/sofa1.jpg');

const ProductDetail = props => {
  const [detailProduct, setDetailProduct] = useState([]);
  const [otherVarian, setOtherVarian] = useState([]);

  // collapse state
  const [collapsed, setCollapsed] = useState(true);
  const [overviewCollapsed, setOverviewCollapsed] = useState(false);
  const [detailCollapsed, setDetailCollapsed] = useState(false);
  const [deliveryCollapsed, setDeliveryCollapsed] = useState(false);
  const [varianCollapsed, setVarianCollapsed] = useState(false);
  const [reviewCollapsed, setReviewCollapsed] = useState(false);
  const [modalImagePreview, setModalImagePreview] = useState(false);

  const {id_product} = props;

  useEffect(() => {
    _getDetailProduct();
    _getOtherVarian();
  }, [id_product]);

  async function _getDetailProduct() {
    let response = await fetch(UrlAPI(`/product/${id_product}`));
    let {data, success, error} = await response.json();
    if (!success) {
      alert('Server internal error');
    }

    setDetailProduct(data);

    console.log(data, 'Data');
  }

  async function _getOtherVarian() {
    fetchBestSeller()
      .then(res => {
        setOtherVarian(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

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
        // Actions.Cart();
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
      <View style={styles.wishListButton}>
        <Button style={{width: 28, height: 28}} onPress={() => alert('Liked')}>
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


  function _handlePreviewImage() {
    
  }

  // this function to create modal button for preview image products
  const PreviewImage = () => {
    return (
      <View style={styles.previewImageWrapper}>
        <Button
          onPress={() => _handlePreviewImage()}
          activeOpacity={0.5}
          style={[
            styles.previewImageButton,
            globalStyle.elevationShadowStyle(3),
          ]}>
          <Icon fill="#fff" width={22} height={22} name="grid-outline" />
        </Button>
      </View>
    );
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

  // Overview collapsed
  const OverView = ({description}) => {
    return (
      <>
        <Button
          activeOpacity={0.5}
          style={styles.collapsedButton}
          onPress={() => setOverviewCollapsed(!overviewCollapsed)}>
          <View style={styles.collapsedButtonContent}>
            <Text style={globalStyle.fontBold}>OVERVIEW</Text>
            <Icon width={24} height={24} name="chevron-down-outline" />
          </View>
        </Button>

        <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
          <Collapsible collapsed={overviewCollapsed}>
            <Text
              style={[globalStyle.fontNormal, {fontSize: 12, lineHeight: 18}]}>
              {description}
            </Text>
          </Collapsible>
        </View>
      </>
    );
  };

  // Details collapsed
  const Details = ({sku, dimensions}) => {
    return (
      <>
        <Button
          activeOpacity={0.5}
          style={styles.collapsedButton}
          onPress={() => setDetailCollapsed(!detailCollapsed)}>
          <View style={styles.collapsedButtonContent}>
            <Text style={globalStyle.fontBold}>DETAILS</Text>
            <Icon width={24} height={24} name="chevron-down-outline" />
          </View>
        </Button>

        <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
          <Collapsible collapsed={detailCollapsed}>
            <View style={styles.detailsRow}>
              <Text style={[globalStyle.fontMedium, {fontSize: 10, flex: 1}]}>
                SKU
              </Text>
              <Text style={[globalStyle.fontNormal, {fontSize: 10, flex: 1}]}>
                {sku}
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={[globalStyle.fontMedium, {fontSize: 10, flex: 1}]}>
                Ukuran
              </Text>
              <Text style={[globalStyle.fontNormal, {fontSize: 10, flex: 1}]}>
                {dimensions}
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={[globalStyle.fontMedium, {fontSize: 10, flex: 1}]}>
                Material
              </Text>
              <Text style={[globalStyle.fontNormal, {fontSize: 10, flex: 1}]}>
                Polywood
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={[globalStyle.fontMedium, {fontSize: 10, flex: 1}]}>
                Material Dudukan
              </Text>
              <Text style={[globalStyle.fontNormal, {fontSize: 10, flex: 1}]}>
                Busa
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={[globalStyle.fontMedium, {fontSize: 10, flex: 1}]}>
                Gaya
              </Text>
              <Text style={[globalStyle.fontNormal, {fontSize: 10, flex: 1}]}>
                Urban Elegan
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={[globalStyle.fontMedium, {fontSize: 10, flex: 1}]}>
                Cara Perawatan
              </Text>
              <Text
                style={[
                  globalStyle.fontNormal,
                  {fontSize: 10, flex: 1, lineHeight: 16},
                ]}>
                {
                  'Bersihkan dengan lap kering \nuntuk bagian kayu, dan lap basah \nuntuk bagian kulit.'
                }
              </Text>
            </View>
          </Collapsible>
        </View>
      </>
    );
  };

  // delivery service collapsed
  const DeliverService = () => {
    const jne = require('../assets/images/jne.png');
    return (
      <>
        <Button
          activeOpacity={0.5}
          style={styles.collapsedButton}
          onPress={() => setDeliveryCollapsed(!deliveryCollapsed)}>
          <View style={styles.collapsedButtonContent}>
            <Text style={globalStyle.fontBold}>DELIVERY SERVICES</Text>
            <Icon width={24} height={24} name="chevron-down-outline" />
          </View>
        </Button>

        <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
          <Collapsible collapsed={deliveryCollapsed}>
            <View style={styles.detailsRow}>
              <Image source={jne} />
              <Image source={jne} />
              <Image source={jne} />
            </View>
          </Collapsible>
        </View>
      </>
    );
  };

  // Other varian products
  const OtherVarian = () => {
    return (
      <>
        <Button
          activeOpacity={0.5}
          style={styles.collapsedButton}
          onPress={() => setDeliveryCollapsed(!deliveryCollapsed)}>
          <View style={styles.collapsedButtonContent}>
            <Text style={globalStyle.fontBold}>OTHER VARIAN</Text>
            <Icon width={24} height={24} name="chevron-down-outline" />
          </View>
        </Button>

        <View style={{paddingHorizontal: 30, paddingVertical: 15}}>
          <Collapsible collapsed={deliveryCollapsed}>
            {/* FIXME: buat sementara menggunakan data bestSeller */}
            <ScrollView horizontal style={{padding: 5}}>
              <View style={styles.detailsRow}>
                <Card data={otherVarian} />
              </View>
            </ScrollView>
          </Collapsible>
        </View>
      </>
    );
  };

  // Customer Review
  const CustomerReview = () => {
    return <></>;
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

                {/* Title Product */}
                <View style={{alignItems: 'center'}}>
                  <Text style={[styles.productInfoTitle, globalStyle.fontBold]}>
                    {product.productName}
                  </Text>
                </View>
                {/* END: Title Product */}

                {/* Button Preview Image */}
                <PreviewImage />
                {/* END: Button Preview Image */}

                <View style={{paddingVertical: 10}}>
                  <Text
                    style={[
                      globalStyle.fontBold,
                      {
                        textAlign: 'center',
                        fontSize: 18,
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

            {/* Overview */}
            <OverView description={product.description} />
            {/* END: Overview */}

            {/* Details */}
            <Details
              sku={product.productCode}
              dimensions={product.dimensions}
            />
            {/* END: Details */}

            {/* Delivery Service */}
            <DeliverService />
            {/* END: Delivery Service */}

            {/* Other Varian */}
            <OtherVarian />
            {/* END: Other Varian */}
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
  wishListButton: {
    position: 'absolute',
    top: 30,
    left: 0,
  },
  previewImageWrapper: {
    top: -25,
    right: 0,
    position: 'absolute',
  },
  previewImageButton: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.softGreen,
  },

  // Collapsed style
  collapsedButton: {
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#222',
    width: '100%',
  },
  collapsedButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  // details
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
});

export default ProductDetail;
