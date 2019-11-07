import React, {useEffect, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity as Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-eva-icons';

import globalStyle from '../styles/globalStyles'

import {isAndroid, deviceWidth} from '../lib';

/**
 * Render back button
 */
const BackButton = props => {
  const {hideBackButton} = props;
  return !hideBackButton ? (
    <Button
      activeOpacity={0.5}
      style={{width: 100}}
      onPress={() => Actions.pop()}
      style={styles.leftBar}>
      <Icon name="arrow-back-outline" width={24} height={24} />
    </Button>
  ) : (
    <View style={{flex: 1, backgroundColor: 'transparent'}} />
  );
};

/**
 * Render title
 */
const Title = props => (
  <View style={styles.titleWrapper}>
    <Text style={[styles.titleText, globalStyle.fontBold]}>{props.title}</Text>
  </View>
);

/**
 * Render right icon
 */
const RightIcon = props => (
  <View style={styles.rightBar}>
    <Button activeOpacity={0.5} onPress={() => Actions.push('Wishlist')}>
      <Icon name="heart-outline" width={24} height={24} />
    </Button>
    <Button activeOpacity={0.5} onPress={() => Actions.Cart()}>
      <Icon name="shopping-bag-outline" width={24} height={24} />
    </Button>
  </View>
);

/**
 * Render full top bar
 */
const TopBar = props => {
  return isAndroid ? (
    <View style={styles.topBarWrapper}>
      <BackButton {...props} />
      <Title {...props} />
      <RightIcon {...props} />
    </View>
  ) : (
    // is ios device
    <SafeAreaView>
      <View style={styles.topBarWrapper}>
        <BackButton {...props} />
        <Title {...props} />
        <RightIcon {...props} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBarWrapper: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    // use percent fluid device
    paddingHorizontal: '8.5%',
  },
  titleWrapper: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#000',
    fontSize: 16,
  },
  rightBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftBar: {
    flex: 1,
    alignItems: 'flex-start',
  },
});

export default TopBar;
