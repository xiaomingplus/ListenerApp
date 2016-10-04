
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import UserChannelPage from '../pages/UserChannelPage';
import * as ChannelActions from '../actions/channel'
import * as UserChannelActions from '../actions/userChannel';
class UserChannelContainer extends React.Component {

  render() {
    return (
      <UserChannelPage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {channel,user} = state;
  return {
    user,
    channel
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...ChannelActions,
    ...UserChannelActions
  }
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserChannelContainer);
