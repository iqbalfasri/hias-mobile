import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';

// Own component
import {Layout} from '../../components/HiasLayout';
import TopBar from '../../components/HiasTopBar';
import SkeletonPlaceholder from '../../components/SkeletonPlaceholder';

// libs
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

function SearchSubCategory(props) {
  const [subCategory, setSubcategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSubCategory() {
      try {
        const response = await fetch(
          UrlAPI(
            `/product/subCategoryByMainCategoryId/${props.idMainCategory}`,
          ),
        );
        const responseJson = await response.json();

        const {data, success} = responseJson;
        setSubcategory(data);
      } catch (error) {
        alert('Something went wrong');
      }
    }

    getSubCategory().finally(() => setLoading(false));

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
          {subCategory.map((category, i) => {
            let isLastItem = subCategory.length - 1 === i;
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() =>
                  Actions.SecondSubCategory({
                    subCategoryId: category.id,
                    mainCategoryName: props.mainCategoryName,
                    subCategoryName: category.subCategoryName,
                  })
                }
                style={[
                  styles.listCategory,
                  {borderBottomWidth: isLastItem ? 0.5 : 0},
                ]}>
                <Text>{category.subCategoryName}</Text>
              </TouchableOpacity>
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
          <Icon color="#9F9F9F" size={16} name="search" type="font-awesome" />
        </View>
        <View style={styles.searchInput}>
          <TextInput placeholder="Search" />
        </View>
      </View>

      {/* Product Category */}
      <ScrollView>
        <View>
          <View style={styles.productCategoryTitleWrapper}>
            <Text style={styles.productCategoryTitleText}>
              {props.mainCategoryName}
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

export default SearchSubCategory;
