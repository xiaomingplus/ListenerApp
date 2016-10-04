
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import SplashPage from '../pages/SplashPage';
import * as SplashActions from '../actions/splash';
class SplashContainer extends React.Component {

  render() {
    return (
      <SplashPage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {user} = state;
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SplashActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SplashContainer);
