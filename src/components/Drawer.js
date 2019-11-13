import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity as Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {ButtonAnimated} from '../components/HiasButton';

import {localStorage, KEY_STORAGE} from '../lib';

import {fetchUserProfile} from '../lib/api';

const Drawer = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    _getProfile();
  }, []);

  const _getProfile = async () => {
    try {
      const getToken = await localStorage.getItem(KEY_STORAGE.TOKEN);
      const {data} = await fetchUserProfile(getToken);
      const {user} = data.login;
      setUser(user);
    } catch (error) {
      console.error(error, 'Error get user profile');
    }
  };

  const _handleLogout = () => {
    localStorage.removeItem(KEY_STORAGE.TOKEN);
    localStorage.removeItem(KEY_STORAGE.USER_ID);

    // FIXME:
    // when success remove local storage
    // redirect to splash screen, or
    // to signin screen
    Actions.Splash();
    // Actions.WebView({
    //   uri: 'https://my.ipaymu.com/payment/47F1B77B-B797-444C-A737-9A0C4B30A351',
    //   title: 'Pembayaran',
    //   onDonePress: function() {
    //     Actions.orderNavBar();
    //   },
    // });
    return;
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
              {user.fullName}
            </Text>
            <Text style={[styles.drawerText, {lineHeight: 24, fontSize: 12}]}>
              Balance: IDR 999.000
            </Text>
          </View>
        </View>
        <View style={styles.bottomDrawer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => Actions.SearchStack()}>
            <Text
              style={{
                paddingVertical: 10,
                fontSize: 16,
                paddingHorizontal: 10,
              }}>
              Category
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => Actions.Inspiration()}>
            <Text
              style={{
                paddingVertical: 10,
                fontSize: 16,
                paddingHorizontal: 10,
              }}>
              Inspiration
            </Text>
          </TouchableOpacity>
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
