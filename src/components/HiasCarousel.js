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

const image1 = require('../assets/images/carousel/crs1.jpg');
const image2 = require('../assets/images/carousel/crs2.jpg');
const image3 = require('../assets/images/carousel/crs3.jpg');

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselData: props.data,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // scroll view position fix
      this.scrollView.scrollTo({x: -30});
    }, 1);
  }

  render() {
    return (
      <ScrollView
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={deviceWidth - (isAndroid ? 90 : 70)}
        snapToAlignment={'center'}
        decelerationRate={0}
        horizontal={true}>
        {/* Carousel wrapper */}
        <View style={styles.carouselWrapper}>
          {/* Carousel content */}
          <View>
            <Button onPress={() => alert('Press')} style={[styles.item1]}>
              <Image style={styles.carouselImageFull} source={image1} />
              <View style={styles.carouselOverlay}>
                <Text style={styles.carouselTitle}>Special Promo</Text>
                <Text style={styles.carouselSubTitle}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Text>
                <View style={{alignSelf: 'flex-end'}}>
                  <Icon
                    name="arrow-right"
                    type="feather"
                    size={24}
                    color="white"
                  />
                </View>
              </View>
            </Button>
          </View>
          {/* Carousel */}
          <Button
            type={'transparent'}
            onPress={() => alert('Pressed')}
            style={styles.item1}>
            <Image style={styles.carouselImageFull} source={image2} />
            <View style={styles.carouselOverlay}>
              <Text style={styles.carouselTitle}>Special Promo</Text>
              <Text style={styles.carouselSubTitle}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
              <View style={{alignSelf: 'flex-end'}}>
                <Icon
                  name="arrow-right"
                  type="feather"
                  size={24}
                  color="white"
                />
              </View>
            </View>
          </Button>
          {/* Carousel */}
          <Button
            type={'transparent'}
            onPress={() => alert('Pressed')}
            style={styles.item1}>
            <Image style={styles.carouselImageFull} source={image3} />
            <View style={styles.carouselOverlay}>
              <Text style={styles.carouselTitle}>Special Promo</Text>
              <Text style={styles.carouselSubTitle}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
              <View style={{alignSelf: 'flex-end'}}>
                <Icon
                  name="arrow-right"
                  type="feather"
                  size={24}
                  color="white"
                />
              </View>
            </View>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item1: {
    width: deviceWidth - 80,
    marginRight: 15,
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
