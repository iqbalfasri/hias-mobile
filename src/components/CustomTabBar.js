import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';

import globalStyle, {color} from '../styles/globalStyles';

import {isAndroid, requireLogin} from '../lib';
import TopBar from './HiasTopBar';
import {ButtonAnimated} from './HiasButton';

class CustomTabBar extends Component {
  render() {
    const {state} = this.props.navigation;
    const activeTabIndex = state.index;
    const SCENE_KEY = {
      Home: 'HomeStack',
      Cart: 'Cart',
      Inbox: 'Inbox',
    };

    _renderIcon = elementKey => {
      switch (elementKey) {
        case SCENE_KEY.Home:
          return 'home';

        case SCENE_KEY.Cart:
          return 'shopping-bag';

        case SCENE_KEY.Inbox:
          return 'inbox';

        default:
          return null;
      }
    };

    _activeScreen = index => {
      if (index == activeTabIndex) {
        return color.primaryColor;
      }

      // Semi dark / abu2
      return '#545454';
    };

    return (
      <View
        style={[styles.tabBarWrapper, globalStyle.elevationShadowStyleTop(2)]}>
        {state.routes.map((element, index) => {
          return (
            <ButtonAnimated
              key={element.key}
              onPress={() => {
                Actions[element.key]();
              }}>
              <Icon
                color={_activeScreen(index)}
                type="feather"
                name={_renderIcon(element.key)}
              />
            </ButtonAnimated>
          );
        })}
        {/* This button for open drawer */}
        <ButtonAnimated onPress={() => Actions.drawerOpen()}>
          <Icon type="feather" name="menu" />
        </ButtonAnimated>
      </View>
    );
  }
}

export class CustomTopBar extends Component {
  render() {
    const {state} = this.props.navigation;
    const activeTabIndex = state.index;

    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <TopBar title="Order" />
        <View style={styles.topBarWrapper}>
          {state.routes.map((route, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.topBarButton,
                  {
                    borderBottomColor:
                      index === activeTabIndex ? '#000' : '#fff',
                  },
                ]}
                key={route.key}
                onPress={() => Actions[route.key]()}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: index === activeTabIndex ? '#000' : '#969696',
                  }}>
                  {route.routes[0].params.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: isAndroid ? 30 : 30,
    paddingBottom: isAndroid ? 20 : 50,
    paddingTop: isAndroid ? 20 : 30,
  },
  topBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  topBarButton: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
  },
});

export default CustomTabBar;
