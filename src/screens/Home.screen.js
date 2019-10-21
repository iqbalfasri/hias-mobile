import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';

// Own component
import {deviceWidth, requestParameter, UrlAPI, LocalStorage} from '../lib';
import Card from '../components/HiasCard';
import Carousel from '../components/HiasCarousel';
import TopBar from '../components/HiasTopBar';
import {Container, Layout} from '../components/HiasLayout';
import Button from '../components/HiasButton';

// Skeleton placeholder
import Skeleton from '../components/SkeletonPlaceholder';
import {Actions} from 'react-native-router-flux';

const Home = () => {
  const [search, setsearch] = useState('');
  const [hotItems, setHotItems] = useState([]);
  const [bestSeller, setbestSeller] = useState([]);

  useEffect(() => {
    async function getHotItems() {
      let response = await fetch(UrlAPI('/product/hotItems'));
      let {data, success} = await response.json();
      if (!success) {
        alert('Hot products error');
      }
      // set state hot items
      setHotItems(data);
    }

    async function getBestSeller() {
      let response = await fetch(UrlAPI('/product/bestSeller'));
      let {data, success} = await response.json();
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
      {_renderSearch()}
      <ScrollView>
        <Carousel />
        {_renderHotItems(hotItems)}
        {_renderBestSeller(hotItems)}
      </ScrollView>
    </Layout>
  );
};

/**
 * Hot items
 */
const _renderHotItems = hotItems => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => Actions.HotProducts({test: 'Halo'})}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 30,
          paddingBottom: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Hot Items</Text>
        <Text style={{fontSize: 12}}>See all</Text>
      </TouchableOpacity>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingHorizontal: 30,
            paddingTop: 5,
            paddingBottom: 30,
          }}>
          <Card data={hotItems} />
        </View>
      </ScrollView>
    </View>
  );
};

/**
 * Hot items
 */
const _renderBestSeller = bestItems => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => Actions.BestProducts({test: 'Halo'})}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 30,
          paddingBottom: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Best Seller</Text>
        <Text style={{fontSize: 12}}>See all</Text>
      </TouchableOpacity>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingHorizontal: 30,
            paddingTop: 5,
            paddingBottom: 30,
          }}>
          <Card data={bestItems} />
        </View>
      </ScrollView>
    </View>
  );
};

const _renderSearch = () => {
  return (
    <Button
      type="transparent"
      style={styles.searchBar}
      onPress={() => Actions.Search()}>
      <View style={styles.searchIcon}>
        <Icon color="#9F9F9F" size={16} name="search" type="font-awesome" />
      </View>
      <View style={styles.searchInput}>
        <Text style={{color: '#9F9F9F'}}>Search</Text>
      </View>
    </Button>
  );
};

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
});

export default Home;
