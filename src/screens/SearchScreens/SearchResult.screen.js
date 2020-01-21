import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import TopBar from '../../components/HiasTopBar';
import {Layout} from '../../components/HiasLayout';
import Button from '../../components/HiasButton';
import {UrlAPI, deviceHeight, getShortString} from '../../lib';
import SkeletonPlaceholder from '../../components/SkeletonPlaceholder';
import globalStyles from '../../styles/globalStyles';
import {fetchSearchByName} from '../../lib/api';
import LargeCard from '../../components/Card/LargeCard';

const LoadSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <Text>Yuhu</Text>
    </SkeletonPlaceholder>
  );
};

const ProductCard = props => {
  const {data} = props;

  return (
    <React.Fragment>
      {data.map(data => (
        <Button
          key={data.id}
          type="transparent"
          style={styles.cardWrapper}
          onPress={() => Actions.ProductDetail({id_product: data.id})}>
          <View
            style={[globalStyles.elevationShadowStyle(5), styles.imageWrapper]}>
            <Image style={styles.imageProduct} source={{uri: data.thumbnail}} />
          </View>
          <View style={styles.productInfoWrapper}>
            <Text style={styles.productTitle}>
              {getShortString(data.productName, 16)}
            </Text>
            <View style={styles.productDetailInfo}>
              <Text style={styles.productPrice}>Rp {data.price}</Text>
              <Icon
                color="#969696"
                style={{alignSelf: 'center'}}
                name="heart"
                type="evilicon"
                size={28}
                onPress={() => alert('liked')}
              />
            </View>
          </View>
        </Button>
      ))}
    </React.Fragment>
  );
};

const SearchResult = props => {
  const [searchResult, setSearchResult] = useState([]);
  const {category_id, keyword} = props;

  useEffect(() => {
    // check search
    if (keyword === undefined) {
      getSearchWithCategory();
      return;
    }

    getSearchWithKeyword();
  }, [category_id, keyword]);

  async function getSearchWithCategory() {
    let response = await fetch(UrlAPI(`/product/categoryId/${category_id}`));
    let {data} = await response.json();

    setSearchResult(data);
  }

  async function getSearchWithKeyword() {
    try {
      let {data} = await fetchSearchByName(keyword);
      setSearchResult(data);
    } catch (error) {
      console.log(error, 'Something went wrong');
    }
  }

  return (
    <Layout>
      <TopBar title="Products" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <LargeCard data={searchResult} />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardWrapper: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 8,
  },
  imageWrapper: {
    width: '100%',
    height: deviceHeight / 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 4,
  },
  imageProduct: {
    width: 115,
    height: 115,
    alignSelf: 'center',
  },
  productInfoWrapper: {
    flexDirection: 'column',
    paddingVertical: 13,
  },
  productDetailInfo: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    color: '#2C272D',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#969696',
    lineHeight: 22,
    fontWeight: 'bold',
  },
});

export default SearchResult;
