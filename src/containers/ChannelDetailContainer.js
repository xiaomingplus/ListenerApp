
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ChannelDetailPage from '../pages/ChannelDetailPage';
import * as ChannelActions from '../actions/channel'
import * as ChannelDetailActions from '../actions/channelDetail';
class ChannelDetailContainer extends React.Component {

  render() {
    return (
      <ChannelDetailPage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {channelDetail,channel,user} = state;
  return {
    channelDetail,
    channel,
    user
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...ChannelActions,
    ...ChannelDetailActions
  }
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ChannelDetailContainer);
