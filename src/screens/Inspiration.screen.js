import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

import TopBar from '../components/HiasTopBar';
import Container from '../components/Layout/Container';

import globalStyles from '../styles/globalStyles';

const exampleData = [
  {
    title: 'Beautiful Living Inspiration',
    sub_title: 'by HIAS HOUSE',
  },
  {
    title: 'Beautiful Dining Inspiration',
    sub_title: 'by HIAS HOUSE',
  },
  {
    title: 'Beautiful Kitchen Inspiration',
    sub_title: 'by HIAS HOUSE',
  },
  {
    title: 'Beautiful Bedroom Inspiration',
    sub_title: 'by HIAS HOUSE',
  },
];

function InspirationScreen(props) {
  function _renderContent() {
    return exampleData.map(inspiration => {
      return (
        <>
          <View style={styles.inspirationImage}>
            <Text style={globalStyles.fontNormal}>IMAGE HERE</Text>
          </View>
          <View style={styles.inspirationInfoWrapper}>
            <Text
              style={[
                globalStyles.fontBold,
                styles.inspirationInfoWrapperTitle,
              ]}>
              {inspiration.title}
            </Text>
            <Text
              style={[
                globalStyles.fontMedium,
                styles.inspirationInfoWrapperSubTitle,
              ]}>
              {inspiration.sub_title}
            </Text>
          </View>
        </>
      );
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <TopBar title="Inspiration" />
      <ScrollView>{_renderContent()}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inspirationImage: {
    flex: 1,
    height: 175,
    minHeight: 175,
    maxHeight: 175,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  inspirationInfoWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  inspirationInfoWrapperTitle: {
    textAlign: 'center',
    fontSize: 14,
  },
  inspirationInfoWrapperSubTitle: {
    fontSize: 12,
    color: '#585858',
    textAlign: 'center',
  },
});

export default InspirationScreen;
