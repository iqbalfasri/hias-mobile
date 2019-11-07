import React, {Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity as Button,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import TopBar from '../components/HiasTopBar';

import OrderStatusHistory from '../screens/OrderStatusHistory.screen';
import OrderStatusOnProgress from '../screens/OrderStatusOnProgress.screen';

import globalStyle from '../styles/globalStyles';

import {getDeviceWidth} from '../lib/utils';

const FirstScene = () => (
  <View>
    <Text>First</Text>
  </View>
);

const SeconScene = () => (
  <View>
    <Text>Secod</Text>
  </View>
);

class OrderStatus extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'orderProgress', title: 'On Progress'},
      {key: 'orderHistory', title: 'History'},
    ],
  };

  handleChangeIndex = index => this.setState({index});

  // renderScene = SceneMap({
  //   orderHistory: firsScene,
  //   orderProgress: secondScene,
  // });
  renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'orderProgress':
        return <OrderStatusOnProgress jumpTo={jumpTo} />;

      case 'orderHistory':
        return <OrderStatusHistory jumpTo={jumpTo} />;

      default:
        return null;
    }
  };

  renderTabBar = props => {
    const {routes, index} = props.navigationState;
    let activeIndex = index;
    const inputRange = routes.map((x, i) => i);

    return (
      <View style={styles.topBarWrapper}>
        {routes.map((route, index) => {
          return (
            <Button
              key={index}
              activeOpacity={0.5}
              style={[
                styles.topbarButton,
                {borderBottomColor: activeIndex == index ? '#000' : '#fff'},
              ]}
              onPress={() => this.setState({index})}>
              <Animated.Text style={[globalStyle.fontMedium]}>
                {route.title}
              </Animated.Text>
            </Button>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TopBar title="Order Status" />
        <TabView
          lazy
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.handleChangeIndex}
          initialLayout={{width: getDeviceWidth}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  topbarButton: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
});

export default OrderStatus;
