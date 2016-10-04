import * as types from '../constants/ActionTypes';

const initialState = {
  user:{

  }
};

export default function channel(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_LOAD_USER:
    return {
      ...state
    }
    case types.RECEIVE_LOAD_USER:
    console.log(action);
    return {
      ...state,
      user:{
        ...state.user,
        id:action.data.user.id,
        account:action.data.user.account,
        avatar:action.data.user.avatar,
        name:action.data.user.name,
        token:action.data.token,
        expire:action.data.expire
      }
    }
    default:
      return state;
  }
}
