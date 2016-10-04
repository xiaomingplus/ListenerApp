import * as types from '../constants/ActionTypes';
import {
  removeArray
} from '../utils/CommonUtils';
const initialState = {
  data: {},
  timelineIds: [],
  timelineIndex: {},
  timelineState: {
    start: 0,
    isLoading: false,
    isLoadingTail: false,
    isEmpty: false,
    isRefreshing: false,
    hasMore: true,
  },
  userIds: [],
  userIndex: {},
  userState: {
    start: 0,
    isLoading: false,
    isLoadingTail: false,
    isEmpty: false,
    isRefreshing: false,
    hasMore: true,
  }


};

export default function channel(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TIMELINE_CHANNEL_LIST:
      return {
        ...state,
        timelineState: {
          ...state.timelineState,
          isRefreshing: action.isRefreshing,
          isLoading: action.isLoading,
          isLoadingTail: action.isLoadingTail
        }
      };
    case types.RECEIVE_TIMELINE_CHANNEL_LIST:
      let cache = state.timelineState.isLoadingTail ? loadingTailCache("timeline", state, action) : (state.timelineState.isRefreshing ? refreshCache("timeline", state, action) : initCache("timeline", state, action));
      return {
        ...state,
        data: cache.data,
        timelineIds: cache.timelineIds,
        timelineIndex: cache.timelineIndex,
        timelineState: {
          ...state.timelineState,
          isRefreshing: false,
          isLoadingTail: false,
          hasMore: action.list.length != 0,
          isLoading: false,
          isEmpty: action.isLoading ? (action.list.length === 0 ? true : false) : false,
          start: cache.start
        }

      };
    case types.FETCH_USER_CHANNEL_LIST:
      return {
        ...state,
        userState: {
          ...state.userState,
          isRefreshing: action.isRefreshing,
          isLoading: action.isLoading,
          isLoadingTail: action.isLoadingTail
        }
      };
    case types.RECEIVE_USER_CHANNEL_LIST:
      let userCache = state.userState.isLoadingTail ? loadingTailCache("user", state, action) : (state.userState.isRefreshing ? refreshCache("user", state, action) : initCache("user", state, action));
      return {
        ...state,
        data: userCache.data,
        userIds: userCache.userIds,
        userIndex: userCache.userIndex,
        userState: {
          ...state.userState,
          isRefreshing: false,
          isLoadingTail: false,
          hasMore: action.list.length != 0,
          isLoading: false,
          isEmpty: action.isLoading ? (action.list.length === 0 ? true : false) : false,
          start: userCache.start
        }

      };
    case types.FETCH_ONE_CHANNEL:
      return {
        ...state,
        isChannelLoading: true
      };
    case types.RECEIVE_ONE_CHANNEl:
      return {
        ...state,
        data: addOneChannelData(state, action)
      };
    case types.FETCH_SUBSCRIPTION:
      return {
        ...state,
        data: makeSubscribedButtonLoading(state, action)
      }
    case types.RECEIVE_SUBSCRIPTION:
      let subscripbedCache = receiveSubscription(state, action);
      return {
        ...state,
        data: subscripbedCache.data,
        userIds: subscripbedCache.ids,
        userIndex: subscripbedCache.index
      }

    default:
      return state;
  }
}

function addOneChannelData(state, action) {
  const data = {
    ...state.data
  }

  data[action.data.id] = action.data;
  data[action.data.id].isSubscribedButtonLoading = false;

  return data

}

function makeSubscribedButtonLoading(state, action) {
  const data = {
    ...state.data
  };

  const channel = {
    ...state.data[action.channelId]
  }

  channel.isSubscribedButtonLoading = true;

  data[channel.id] = channel;
  return data;
}

function receiveSubscription(state, action) {
  const data = {
    ...state.data
  };

  const channel = {
    ...state.data[action.data.id]
  };

  const ids = [
    ...state.userIds
  ];

  const index = {
    ...state.userIndex
  };
  channel.isSubscribedButtonLoading = false;
  channel.following = action.data.following;
  channel.followers_count = action.data.followers_count;
  data[channel.id] = channel;
  if (channel.following === false) {
    removeArray(ids, channel.id);
    delete index[channel.id];
  }
  return {
    data,
    ids,
    index
  };
}

function initCache(type, state, action) {
  const data = {
    ...state.data
  };

  const ids = [
    ...state[`${type}Ids`]
  ]
  const index = {
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
  newCache[`${type}Ids`] = ids;
  newCache[`${type}Index`] = index;
  newCache['start'] = start;
  return newCache;
}

function refreshCache(type, state, action) {
  let newDataCount = 0;
  const data = {
    ...state.data
  };
  const index = {
    ...state[`${type}Index`]
  }
  const ids = [
    ...state[`${type}Ids`]
  ]

  for (let i = action.list.length - 1; i >= 0; i--) {
    if (!state[`${type}Index`][action.list[i].id]) {
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
  newCache[`${type}Ids`] = ids;
  newCache[`${type}Index`] = index;
  newCache['start'] = start
  return newCache;
}

function loadingTailCache(type, state, action) {
  const data = {
    ...state.data
  };

  const ids = [
    ...state[`${type}Ids`]
  ]
  const index = {
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
  newCache[`${type}Ids`] = ids;
  newCache["start"] = start;
  return newCache;
}
