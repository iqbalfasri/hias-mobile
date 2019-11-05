import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

// own component
import {ButtonAnimated} from '../components/HiasButton';

// lib
import {localStorage, KEY_STORAGE} from '../lib';

const Drawer = () => {
  const _handleLogout = () => {
    localStorage.removeItem(KEY_STORAGE.TOKEN);
    localStorage.removeItem(KEY_STORAGE.USER_ID);

    // FIXME:
    // when success remove local storage
    // redirect to splash screen, or
    // to signin screen
    Actions.Splash();
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.topDrawer}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#ddd',
              borderRadius: 100,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={[styles.drawerText, {lineHeight: 16, fontSize: 16}]}>
              John Doe
            </Text>
            <Text style={[styles.drawerText, {lineHeight: 24, fontSize: 12}]}>
              Balance: IDR 999.000
            </Text>
          </View>
        </View>
        <View style={styles.bottomDrawer}>
          <Text
            style={{paddingVertical: 10, fontSize: 16, paddingHorizontal: 10}}>
            Category
          </Text>
          {/* <Text
            style={{paddingVertical: 10, fontSize: 16, paddingHorizontal: 10}}>
            Blog
          </Text> */}
          <Text
            style={{paddingVertical: 10, fontSize: 16, paddingHorizontal: 10}}>
            My Wallet
          </Text>
          <Text
            style={{paddingVertical: 10, fontSize: 16, paddingHorizontal: 10}}>
            Inspiration
          </Text>
          {/* <Text
            style={{paddingVertical: 10, fontSize: 16, paddingHorizontal: 10}}>
            Hias Bisnis Unit
          </Text> */}
          <Text
            style={{paddingVertical: 10, fontSize: 16, paddingHorizontal: 10}}>
            Careers
          </Text>
          <Text
            style={{paddingVertical: 10, fontSize: 16, paddingHorizontal: 10}}>
            Store Locator
          </Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: 50,
        }}>
        <ButtonAnimated
          onPress={() => _handleLogout()}
          style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </ButtonAnimated>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  drawerText: {
    color: '#fff',
  },
  topDrawer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottomDrawer: {
    flex: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  logoutButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: '100%',
  },
  logoutText: {
    color: '#BF0F0F',
    textTransform: 'uppercase',
  },
});
export default Drawer;
