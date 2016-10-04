
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ChannelPage from '../pages/ChannelPage';
import * as ChannelActions from '../actions/channel';
class ChannelContainer extends React.Component {

  render() {
    return (
      <ChannelPage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {channel,user} = state;
  return {
    channel,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChannelActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ChannelContainer);
