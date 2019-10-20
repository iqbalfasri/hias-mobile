import React, {useEffect, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';

// Own component
import {isAndroid, deviceWidth} from '../lib';

/**
 * Render back button
 */
const BackButton = props => {
  const {hideBackButton} = props;
  return !hideBackButton ? (
    <TouchableOpacity
      style={{width: 100}}
      onPress={() => Actions.pop()}
      style={{}}>
      <Icon size={16} name="chevron-left" type="font-awesome" />
      {/* <Text>{'<'}</Text> */}
    </TouchableOpacity>
  ) : (
    <View style={{width: 50, backgroundColor: 'transparent'}} />
  );
};

/**
 * Render title
 */
const Title = props => (
  <View style={styles.titleWrapper}>
    <Text style={styles.titleText}>{props.title}</Text>
  </View>
);

/**
 * Render right icon
 */
const RightIcon = props => (
  <View
    style={{width: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
    <Icon name="heart" type="evilicon" size={24} />
    <Icon onPress={() => Actions.Cart()} name="cart" type="evilicon" size={24} />
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
    // use percent fluid device
    paddingHorizontal: '8.5%',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopBar;
