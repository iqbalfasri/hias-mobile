import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// module component
import TopBar from '../components/HiasTopBar';
import {Layout} from '../components/HiasLayout';

class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <TopBar title="Order" />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  pagerWrapper: {
    flex: 1,
    backgroundColor: 'salmon',
  },
});

export default OrderScreen;
