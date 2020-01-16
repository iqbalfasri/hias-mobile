import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

import HIASLoadingModal from '../components/HIASLoadingModal';

class WebViewScreen extends Component {
  render() {
    return (
      <>
        <WebView
          startInLoadingState={true}
          renderLoading={() => <HIASLoadingModal />}
          source={{uri: this.props.uri}}
        />
      </>
    );
  }
}

export default WebViewScreen;
