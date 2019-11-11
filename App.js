import React, {Fragment, useEffect} from 'react';
import {
  StatusBar,
  Text,
  Slider,
  AsyncStorage,
  SafeAreaView,
} from 'react-native';
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
import InboxScreen from './src/screens/Inbox.screen';

// Tab Bar Component
import CustomTabBar, {CustomTopBar} from './src/components/CustomTabBar';

// Tab Bar Screen Component
import HomeScreen from './src/screens/Home.screen';
import CartScreen from './src/screens/Cart.screen';
import DrawerContent from './src/components/Drawer';

// Products
import HotProducts from './src/screens/HotProducts.screen';
import BestProdcuts from './src/screens/BestProduct.screen';
import Wishlist from './src/screens/Wishlist.screen';

// Orders
import AddressOrderScreen from './src/screens/AddressOrder.screen';
import BillingOrderScreen from './src/screens/BillingDetailOrder.screen';
import PaymentOrderScreen from './src/screens/PaymentOrder.screen';
import StatusOrderScreen from './src/screens/StatusOrder.screen';

// Order Status
import OrderStatusScreen from './src/screens/OrderStatus.screen';
import OrderStatusOnProgressScreen from './src/screens/OrderStatusOnProgress.screen';
import OrderStatusHistoryScreen from './src/screens/OrderStatusHistory.screen';

// Search
import SearchScreen from './src/screens/SearchScreens/Search.screen';
import SubCategory from './src/screens/SearchScreens/SubCategory.screen';
import SecondSubCategory from './src/screens/SearchScreens/SecondSubCategory.screen';
import ThirdSubCategory from './src/screens/SearchScreens/ThirdSubCategory.screen';
import SearchResult from './src/screens/SearchScreens/SearchResult.screen';
import CustomNavBar from './src/components/Layout/NavBar';
import TopBar from './src/components/HiasTopBar';

// FIXME: Refactore route
const App = props => {
  // for hide warning
  console.disableYellowBox = true;

  return (
    <Fragment>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Router {...props}>
        <Scene key="root">
          <Scene
            initial
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

          {/* Main */}
          <Scene
            drawer
            drawerPosition="right"
            contentComponent={DrawerContent}
            drawerWidth={250}
            hideNavBar
            hideDrawerButton={true}>
            {/* Tabbar Scene Stack */}
            <Scene
              tabs
              key="tabbar"
              tabBarComponent={CustomTabBar}
              type={ActionConst.RESET}>
              <Stack key="HomeStack" hideNavBar title="Home">
                <Scene
                  key="Home"
                  type={ActionConst.RESET}
                  component={HomeScreen}
                  initial
                />
                <Scene
                  title={'Detail'}
                  navBar={CustomNavBar}
                  key="ProductDetail"
                  component={ProductDetailScreen}
                  hideNavBar
                />

                <Scene key="HotProducts" component={HotProducts} hideNavBar />
                <Scene key="BestProducts" component={BestProdcuts} hideNavBar />
                <Scene key="Wishlist" component={Wishlist} hideNavBar />
                <Scene key="Cart" component={CartScreen} hideNavBar />
                <Scene key="Order" component={OrderScreen} hideNavBar />

                {/* Search Category */}
                <Stack key="SearchStack">
                  <Scene
                    initial
                    key="Search"
                    component={SearchScreen}
                    hideNavBar
                  />
                  <Scene key="SubCategory" component={SubCategory} hideNavBar />
                  <Scene
                    key="SecondSubCategory"
                    component={SecondSubCategory}
                    hideNavBar
                  />
                  <Scene
                    key="ThirdSubCategory"
                    component={ThirdSubCategory}
                    hideNavBar
                  />
                  <Scene
                    key="SearchResult"
                    component={SearchResult}
                    hideNavBar
                  />
                </Stack>
              </Stack>

              <Scene
                hideNavBar
                key="orderNavBar"
                title="Order Status"
                component={OrderStatusScreen}
              />

              {/* <Scene /> */}

              {/* <Scene
                tabs
                showLabel={true}
                key="orderNavBar"
                tabBarPosition="top"
                tabStyle={{backgroundColor: 'red'}}>
                <Scene
                  lazy
                  initial
                  hideNavBar
                  title="On Progress"
                  key="OrderStatusOnProgress"
                  component={OrderStatusOnProgressScreen}
                />

                <Scene
                  lazy
                  hideNavBar
                  title="History"
                  key="OrderStatusHistory"
                  component={OrderStatusHistoryScreen}
                />
              </Scene> */}

              <Scene key="Inbox" component={InboxScreen} hideNavBar />
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
                lazy
                initial
                hideNavBar
                title="Address"
                key="AddressDetail"
                component={AddressOrderScreen}
              />
              <Scene
                lazy
                hideNavBar
                key="BillingDetail"
                title="Billing Detail"
                component={BillingOrderScreen}
              />
              <Scene
                lazy
                hideNavBar
                key="Payment"
                title="Payment"
                component={PaymentOrderScreen}
              />
              <Scene
                lazy
                hideNavBar
                key="OrderStatus"
                title="Order Status"
                component={StatusOrderScreen}
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    </Fragment>
  );
};

export default App;
