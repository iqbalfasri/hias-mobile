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
import CustomTabBar from './src/components/CustomTabBar';

// Tab Bar Screen Component
import HomeScreen from './src/screens/Home.screen';
import CartScreen from './src/screens/Cart.screen';
import DrawerContent from './src/components/Drawer';

// Products
import HotProducts from './src/screens/HotProducts.screen';
import BestProdcuts from './src/screens/BestProduct.screen';

const TabIcon = ({title}) => <Text>{title}</Text>;

import {LocalStorage} from './src/lib';

const App = () => {
  // for hide warning
  console.disableYellowBox = true;

  return (
    <Fragment>
      <StatusBar backgroundColor="#5BC6E2" />
      <Router>
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

              <Scene
                key="Cart"
                component={sceneProps => (
                  <CartScreen test={sceneProps} {...sceneProps} />
                )}
                hideNavBar
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    </Fragment>
  );
};

export default App;
