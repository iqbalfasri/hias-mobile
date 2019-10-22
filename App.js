import React, {Fragment, useEffect} from 'react';
import {StatusBar, Text, Slider, AsyncStorage} from 'react-native';
import {
  Router,
  Scene,
  ActionConst,
  Actions,
  Tabs,
  Stack,
} from 'react-native-router-flux';

import SplashScreen from './src/screens/Splash.screen';
import SliderInfoScreen from './src/screens/SliderInfo.screen';
import SigninScreen from './src/screens/Signin.screen';
import SignupScreen from './src/screens/Signup.screen';
import SignupVerifScreen from './src/screens/_SignupVerif.screen';
import SignupSuccessScreen from './src/screens/SignupSuccess.screen';
import ProductDetailScreen from './src/screens/ProductDetail.screen';
import OrderScreen from './src/screens/Order.screen';
import SearchScreen from './src/screens/Search.screen';

// Tab Bar Component
import CustomTabBar, {CustomTopBar} from './src/components/CustomTabBar';

// Tab Bar Screen Component
import HomeScreen from './src/screens/Home.screen';
import CartScreen from './src/screens/Cart.screen';
import DrawerContent from './src/components/Drawer';

// Products
import HotProducts from './src/screens/HotProducts.screen';
import BestProdcuts from './src/screens/BestProduct.screen';

// Orders
import AddressOrderScreen from './src/screens/AddressOrder.screen';
import BillingOrderScreen from './src/screens/BillingDetailOrder.screen';
import PaymentOrderScreen from './src/screens/PaymentOrder.screen';
import StatusOrderScreen from './src/screens/StatusOrder.screen';

// FIXME: Refactore route
const App = props => {
  // for hide warning
  console.disableYellowBox = true;

  return (
    <Fragment>
      <StatusBar />
      <Router {...props}>
        <Scene key="root">
          <Scene
            init
            key="Splash"
            component={SplashScreen}
            type={ActionConst.RESET}
            hideNavBar
          />
          <Scene
            key="SliderInfo"
            component={SliderInfoScreen}
            type={ActionConst.RESET}
            hideNavBar
          />

          {/* Authentications */}
          <Scene
            key="Signin"
            component={SigninScreen}
            type={ActionConst.RESET}
            hideNavBar
          />
          <Scene
            key="Signup"
            component={SignupScreen}
            type={ActionConst.RESET}
            hideNavBar
          />
          {/* <Scene key="SignupVerif" component={SignupVerifScreen} hideNavBar /> */}
          <Scene
            type={ActionConst.RESET}
            key="SignupSuccess"
            component={SignupSuccessScreen}
            hideNavBar
          />

          <Scene key="Order" component={OrderScreen} hideNavBar />

          {/* Main */}
          <Scene
            type={ActionConst.RESET}
            drawer
            drawerPosition="right"
            contentComponent={DrawerContent}
            drawerWidth={250}
            hideDrawerButton={true}
            hideNavBar={true}>
            {/* Tabbar Scene Stack */}
            <Scene tabs key="tabbar" tabBarComponent={CustomTabBar} hideNavBar>
              <Scene key="HomeStack" hideNavBar title="Home">
                <Scene key="Home" component={HomeScreen} initial hideNavBar />
                <Scene
                  key="ProductDetail"
                  component={ProductDetailScreen}
                  hideNavBar
                />
                <Scene key="HotProducts" component={HotProducts} hideNavBar />
                <Scene key="BestProducts" component={BestProdcuts} hideNavBar />
                <Scene key="Search" component={SearchScreen} hideNavBar />
              </Scene>

              <Scene key="Cart" component={CartScreen} hideNavBar />
            </Scene>

            {/* Order tabbar */}
            <Scene
              tabs
              showLabel={true}
              key="toptabbar"
              tabBarPosition="top"
              tabBarComponent={CustomTopBar}
              hideNavBar>
              <Scene
                key="AddressDetail"
                component={AddressOrderScreen}
                initial
                hideNavBar
                title="Address"
              />
              <Scene
                key="BillingDetail"
                component={BillingOrderScreen}
                hideNavBar
                title="Billing Detail"
              />
              <Scene
                key="Payment"
                component={PaymentOrderScreen}
                hideNavBar
                title="Payment"
              />
              <Scene
                key="OrderStatus"
                component={StatusOrderScreen}
                hideNavBar
                title="Order Status"
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    </Fragment>
  );
};

export default App;
