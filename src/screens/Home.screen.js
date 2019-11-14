import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity as Button,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {Actions} from 'react-native-router-flux';

import Card from '../components/HiasCard';
import Carousel from '../components/HiasCarousel';
import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';

import globalStyle from '../styles/globalStyles';

import {fetchBestSeller, fetchHotProduct} from '../lib/api';

const renderHotItems = hotItems => {
  return (
    <View>
      <Button
        activeOpacity={0.5}
        onPress={() => Actions.HotProducts()}
        style={styles.buttonSeeAll}>
        <Text style={[styles.titleSeeAll, globalStyle.fontMedium]}>
          Hot Items
        </Text>
        <Text style={[styles.seeAllText, globalStyle.fontNormal]}>See all</Text>
      </Button>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.rowProductsWrapper}>
          <Card data={hotItems} />
        </View>
      </ScrollView>
    </View>
  );
};

const renderBestSeller = bestItems => {
  return (
    <View>
      <Button
        activeOpacity={0.5}
        onPress={() => Actions.BestProducts({test: 'Halo'})}
        style={styles.buttonSeeAll}>
        <Text style={[styles.titleSeeAll, globalStyle.fontMedium]}>
          Best Seller
        </Text>
        <Text style={[styles.seeAllText, globalStyle.fontNormal]}>See all</Text>
      </Button>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.rowProductsWrapper}>
          <Card data={bestItems} />
        </View>
      </ScrollView>
    </View>
  );
};

const renderSearch = () => {
  return (
    <Button style={styles.searchBar} onPress={() => Actions.SearchStack()}>
      <View style={styles.searchIcon}>
        <Icon name="search-outline" fill="#9F9F9F" width={18} height={18} />
      </View>
      <View style={styles.searchInput}>
        <Text
          style={[globalStyle.fontNormal, {color: '#9F9F9F', padding: null}]}>
          Search
        </Text>
      </View>
    </Button>
  );
};

function Home(props) {
  const [hotItems, setHotItems] = useState([]);
  const [bestSeller, setbestSeller] = useState([]);

  useEffect(() => {
    async function getHotItems() {
      let {data, success} = await fetchHotProduct();
      if (!success) {
        alert('Hot product bermasalah');
      }
      // set state hot items
      setHotItems(data);
    }

    async function getBestSeller() {
      let {data, success} = await fetchBestSeller();
      if (!success) {
        alert('Best seller error');
      }
      // set state best seller
      setbestSeller(data);
    }

    // run function
    getHotItems();
    getBestSeller();
  }, []);

  return (
    <Layout>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TopBar hideBackButton={true} title="Home" />
      {renderSearch()}
      <ScrollView>
        <Carousel />
        {renderHotItems(hotItems)}
        {renderBestSeller(bestSeller)}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  searchBar: {
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '8.5%',
  },
  searchInput: {
    width: '100%',
    paddingVertical: 15,
    paddingRight: 25,
    paddingLeft: 10,
  },
  searchIcon: {
    paddingHorizontal: 8,
  },
  buttonSeeAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  rowProductsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 5,
    paddingBottom: 30,
  },
  titleSeeAll: {
    fontSize: 16,
  },
  seeAllText: {
    fontSize: 12,
  },
});

export default Home;
