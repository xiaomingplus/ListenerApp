import * as types from '../constants/ActionTypes';

const initialState = {
    userIds: [],
    userIndex:{},
    data: {},
    userState:{
    isLoading: false,
    isLoadingTail: false,
    isEmpty: false,
    isRefreshing: false,
    hasMore: true,
    start:0
  }
};

export default function message(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MESSAGE_LIST:
      return {
        ...state,
        userState:{
          isRefreshing: action.isRefreshing,
          isLoading: action.isLoading,
          isLoadingTail: action.isLoadingTail
        }
      };
    case types.RECEIVE_MESSAGE_LIST:
    let userCache = state.userState.isLoadingTail ? loadingTailCache("user",state, action) : (state.userState.isRefreshing ? refreshCache("user",state, action) : initCache("user",state, action));
      return {
        ...state,
        data:userCache.data,
        userIds:userCache.userIds,
        userIndex:userCache.userIndex,
        userState:{
          isRefreshing: false,
          isLoadingTail: false,
          hasMore: action.list.length != 0,
          isLoading: false,
          isEmpty:action.isLoading?(action.list.length===0?true:false):false,
          start:userCache.start
        }
      };
    default:
      return state;
  }
}

function initCache(type,state, action) {
  const data = {
    ...state.data
  };

  const ids =[
    ...state[`${type}Ids`]
  ]
  const index ={
    ...state[`${type}Index`]
  }
  for (let i = 0; i < action.list.length; i++) {
    data[action.list[i].id] = action.list[i];
    data[action.list[i].id].isSubscribedButtonLoading = false;
    ids.push(action.list[i].id);
    index[action.list[i].id] = true;
  }
  const start = action.list.length;
  const newCache = {
    data
  };
  newCache[`${type}Ids`]=ids;
  newCache[`${type}Index`] = index;
  newCache['start'] = start;
  return newCache;
}

function refreshCache(type,state, action) {
  let newDataCount = 0;
  const data = {
    ...state.data
  };
  const index ={
    ...state[`${type}Index`]
  }
  const ids =[
    ...state[`${type}Ids`]
  ]

  for (let i = action.list.length - 1; i >= 0; i--) {
    if (!state[`${type}Index`][action.list[i].id]) {
      console.log('yes');
      newDataCount++;
      data[action.list[i].id] = action.list[i];
      data[action.list[i].id].isSubscribedButtonLoading = false;
      ids.unshift(action.list[i].id);
      index[action.list[i].id] = true;
    }
  }
  const start = state[`${type}State`].start + newDataCount;
  const newCache = {
    data
  };
  newCache[`${type}Ids`]=ids;
  newCache[`${type}Index`] = index;
  newCache['start'] = start
  return newCache;
}

function loadingTailCache(type,state, action) {
  const data = {
    ...state.data
  };

  const ids =[
    ...state[`${type}Ids`]
  ]
  const index ={
    ...state[`${type}Index`]
  }
  for (let i = 0; i < action.list.length; i++) {
    data[action.list[i].id] = action.list[i];
    data[action.list[i].id].isSubscribedButtonLoading = false;
    ids.push(action.list[i].id);
    index[action.list[i].id] = true;
  }
  const start = state[`${type}State`].start + action.list.length;
  const newCache = {
    data
  };
  newCache[`${type}Index`] = index;
  newCache[`${type}Ids`]=ids;
  newCache["start"] = start;
  return newCache;
}
