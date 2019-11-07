import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ColorPropType,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-eva-icons';

import TopBar from './HiasTopBar';
import {ButtonAnimated} from './HiasButton';

import globalStyle, {color} from '../styles/globalStyles';

import {isAndroid} from '../lib/utils';

class CustomTabBar extends Component {
  render() {
    const {state} = this.props.navigation;
    const activeTabIndex = state.index;
    const SCENE_KEY = {
      Home: 'HomeStack',
      Cart: 'Cart',
      ORDER_STATUS: 'orderNavBar',
      Inbox: 'Inbox',
    };

    renderIcon = (elementKey, index) => {
      switch (elementKey) {
        case SCENE_KEY.Home:
          if (index == activeTabIndex) {
            return (
              <Icon
                width={24}
                height={24}
                name="home"
                fill={color.primaryColor}
              />
            );
          }
          return (
            <Icon width={24} height={24} name="home-outline" fill="#545454" />
          );

        case SCENE_KEY.ORDER_STATUS:
          if (index == activeTabIndex) {
            return (
              <Icon
                width={24}
                height={24}
                name="archive"
                fill={color.primaryColor}
              />
            );
          }
          return <Icon width={24} height={24} name="archive" fill="#545454" />;

        case SCENE_KEY.Inbox:
          if (index == activeTabIndex) {
            return (
              <Icon
                width={24}
                height={24}
                name="inbox"
                fill={color.primaryColor}
              />
            );
          }
          return (
            <Icon width={24} height={24} name="inbox-outline" fill="#545454" />
          );

        default:
          return null;
      }
    };

    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <View
          style={[
            styles.tabBarWrapper,
            globalStyle.elevationShadowStyleTop(2),
          ]}>
          {state.routes.map((element, index) => {
            return (
              <ButtonAnimated
                style={styles.iconTabBar}
                key={element.key}
                onPress={() => {
                  Actions[element.key]();
                }}>
                {renderIcon(element.key, index)}
              </ButtonAnimated>
            );
          })}
          {/* This button for open drawer */}
          <ButtonAnimated
            style={styles.iconTabBar}
            onPress={() => Actions.drawerOpen()}>
            <Icon width={24} height={24} name="menu-outline" />
          </ButtonAnimated>
        </View>
      </SafeAreaView>
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
    paddingVertical: 20,
    // paddingHorizontal: 30,
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
  iconTabBar: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomTabBar;
