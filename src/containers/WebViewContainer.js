
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import WebViewPage from '../pages/WebViewPage';
class WebViewContainer extends React.Component {

  render() {
    return (
      <WebViewPage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {message,user} = state;
  return {
    message,
    user
  };
}

export default connect(mapStateToProps)(WebViewContainer);
