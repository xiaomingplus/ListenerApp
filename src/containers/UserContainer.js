
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import UserPage from '../pages/UserPage';
class UserContainer extends React.Component {

  render() {
    return (
      <UserPage {...this.props} />
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
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps)(UserContainer);
