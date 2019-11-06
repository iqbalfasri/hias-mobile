import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity as Button,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {Actions} from 'react-native-router-flux';

import SkeletonPlaceholder from '../../components/SkeletonPlaceholder';

import {Layout} from '../../components/HiasLayout';
import TopBar from '../../components/HiasTopBar';

import globalStyle from '../../styles/globalStyles';

import {UrlAPI} from '../../lib';

function RenderSkeleton() {
  return (
    <React.Fragment>
      {[0, 1, 2, 3, 4].map((_, index) => {
        return (
          <View key={index} style={styles.skeletonWrapper}>
            <SkeletonPlaceholder>
              <View style={styles.skeletonStyle} />
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </React.Fragment>
  );
}

function Search(props) {
  const [mainCategory, setMainCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMainCategory() {
      try {
        const response = await fetch(UrlAPI('/product/mainCategory'));
        const responseJson = await response.json();

        const {data} = responseJson;

        setMainCategory(data);
      } catch (error) {
        alert('Error ambil data main category');
      }
    }

    getMainCategory().finally(() => setLoading(false));

    // call back for component will unMount
    return () => {
      return;
    };
  }, []);

  const renderCategory = () => {
    if (loading) {
      return <RenderSkeleton />;
    } else {
      return (
        <React.Fragment>
          {mainCategory.map((category, i) => {
            let isLastItem = mainCategory.length - 1 === i;
            return (
              <Button
                key={category.id}
                onPress={() =>
                  Actions.SubCategory({
                    idMainCategory: category.id,
                    mainCategoryName: category.mainCategoryName,
                  })
                }
                style={[
                  styles.listCategory,
                  {borderBottomWidth: isLastItem ? 0.5 : 0},
                ]}>
                <Text style={globalStyle.fontNormal}>
                  {category.mainCategoryName}
                </Text>
              </Button>
            );
          })}
        </React.Fragment>
      );
    }
  };

  return (
    <Layout>
      <TopBar title="Search" />
      {/* Search form */}
      <View style={styles.searchBar}>
        <View style={styles.searchIcon}>
          <Icon name="search-outline" fill="#9F9F9F" width={18} height={18} />
        </View>
        <View style={styles.searchInput}>
          <TextInput style={globalStyle.fontNormal} placeholder="Search" />
        </View>
      </View>

      {/* Product Category */}
      <ScrollView>
        <View>
          <View style={styles.productCategoryTitleWrapper}>
            <Text
              style={[styles.productCategoryTitleText, globalStyle.fontMedium]}>
              Product Category
            </Text>
          </View>

          {/* List Main Category */}
          <View style={styles.listCategoryWrapper}>{renderCategory()}</View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
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
  // product category
  productCategoryTitleWrapper: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  productCategoryTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listCategoryWrapper: {
    paddingVertical: 20,
  },
  listCategory: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderTopColor: '#000',
    borderTopWidth: 0.5,
    borderBottomColor: '#000',
  },
  // skeleton
  skeletonWrapper: {
    borderRadius: 5,
    paddingHorizontal: 30,
  },
  skeletonStyle: {
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
});
export default Search;
