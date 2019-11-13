import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import LoadingModal from '../components/Modal/LoadingModal';

class WebViewScreen extends Component {
  render() {
    return (
      <>
        <WebView
          renderLoading={() => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator />
            </View>
          )}
          source={{uri: this.props.uri}}
        />
      </>
    );
  }
}

export default WebViewScreen;
