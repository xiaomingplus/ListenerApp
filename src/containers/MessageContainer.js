
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import MessagePage from '../pages/MessagePage';
import * as MessageActions from '../actions/message'
class MessageContainer extends React.Component {

  render() {
    return (
      <MessagePage {...this.props} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MessageActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer);
