import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity as Button,
} from 'react-native';
import {Icon} from 'react-native-elements';

// Own component
import {deviceWidth, isAndroid} from '../lib';
import globalStyle from '../styles/globalStyles';
import {getBanner} from '../lib/api';

const image1 = require('../assets/images/carousel/crs1.jpg');
const image2 = require('../assets/images/carousel/crs2.jpg');
const image3 = require('../assets/images/carousel/crs3.jpg');

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselData: props.data,
      banner: [],
    };
  }

  async componentDidMount() {
    const {data} = await getBanner();
    this.setState({banner: data.banner});
  }

  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        decelerationRate={0}
        horizontal={true}>
        {/* Carousel wrapper */}
        <View style={styles.carouselWrapper}>
          {/* Carousel content */}
          {this.state.banner.map((banner, index) => {
            return (
              <View style={[styles.item1]}>
                <Image
                  style={styles.carouselImageFull}
                  source={{uri: banner.imageUrl}}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item1: {
    width: deviceWidth,
    paddingHorizontal: 15,
    height: 163,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  carouselOverlay: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  carouselImageFull: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  carouselTitle: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  carouselSubTitle: {
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
  },
  carouselWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: isAndroid ? 30 : null,
    paddingTop: 20,
    paddingBottom: 30,
  },
});

export default Carousel;
