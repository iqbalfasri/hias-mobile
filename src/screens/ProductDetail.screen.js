import React, {useState} from 'react';
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
import {deviceWidth, LocalStorage} from '../lib';

// Own component
import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';
import Button from '../components/HiasButton';

const sofa1 = require('../assets/images/products/sofa1.jpg');

const ProductDetail = props => {
  const [collapsed, setCollapsed] = useState(true);
  const _renderImageSlider = () => (
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
  );

  const _renderPrice = props => (
    <View style={{paddingVertical: 15}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          color: ' #000',
        }}>
        Rp 2.949.000
      </Text>
    </View>
  );

  /**
   * EXAMPLE DATA CART
   */
  const exampleDataCart = {
    image: require('../assets/images/products/sofa1.jpg'),
    product_name: 'Valencia Sofa',
    price: 'Rp 2.949.000',
    qty: 1,
  };

  const storage = new LocalStorage();

  const _renderButtonProduct = props => (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
      }}>
      <Button
        style={{
          paddingHorizontal: 13,
          paddingVertical: 13,
          width: null,
          borderRadius: 5,
          backgroundColor: '#292929',
        }}
        type="transparent">
        <Text style={{color: '#fff'}}>ADD TO REGISTRY</Text>
      </Button>

      <Button
        onPress={() => Actions.Cart()}
        style={{
          paddingHorizontal: 25,
          paddingVertical: 13,
          borderRadius: 5,
          backgroundColor: '#00B1DB',
        }}
        type="transparent">
        <Text style={{color: '#fff', textAlign: 'center'}}>ADD TO CART</Text>
      </Button>
    </View>
  );

  const _renderDetailInfo = props => (
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it.
          </Text>
        </Collapsible>
      </View>
    </View>
  );

  const _renderProductInfo = props => (
    <View style={styles.productInfoWrapper}>
      <Text style={styles.productInfoTitle}>Valencia Sofa</Text>
      <Text style={styles.productInfoDesc}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      {_renderPrice(props)}
      {_renderButtonProduct(props)}
    </View>
  );

  return (
    <Layout>
      <StatusBar />
      <TopBar title={null} />
      <ScrollView>
        <View style={{paddingHorizontal: 30}}>
          {_renderImageSlider(props)}
          {_renderProductInfo(props)}
        </View>
        {_renderDetailInfo(props)}
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
    fontSize: 24,
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
