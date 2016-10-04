'use strict';

import * as types from '../constants/ActionTypes';
import {requestWithAuth} from '../utils/RequestUtils';

export function fetchTimelineChannelList({isRefreshing=false, isLoading=false, isLoadingTail=false, start=0}={}) {
	return dispatch => {
		dispatch(fetchChannelList({isRefreshing, isLoading, isLoadingTail}));
		return requestWithAuth(`timelines?start=${start}`)
      .then((data) => {
        dispatch(receiveChannelList({list:data.list,isLoading}));
      })
      .catch((error) => {
        //todo
        console.log(error);
        console.log('请求错误');
      });
	};
}

export function fetchPostSubscription({channelId=""}={}){
  return dispatch =>{
    dispatch(fetchOneSubscription(channelId));
    return requestWithAuth(`channels/${channelId}/subscriptions`,"post").then((data)=>{
    dispatch(receiveOneSubscription(data.channel));
  }).catch((error)=>{
    console.log(error);
  })
  }
}
export function fetchDelSubscription({channelId=""}={}){
  return dispatch =>{
    dispatch(fetchOneSubscription(channelId));
    return requestWithAuth(`channels/${channelId}/subscriptions`,"delete").then((data)=>{
    dispatch(receiveOneSubscription(data.channel));
  }).catch((error)=>{
    console.log(error);
  })
  }
}
function fetchOneSubscription (id){
  return {
    type:types.FETCH_SUBSCRIPTION,
    channelId:id
  }
}
function receiveOneSubscription(data){
  return {
    type:types.RECEIVE_SUBSCRIPTION,
    data:data
  }
}
function fetchChannelList({isRefreshing=false, isLoading=false, isLoadingTail=false}={}) {

	return {
		type: types.FETCH_TIMELINE_CHANNEL_LIST,
		isRefreshing: isRefreshing,
		isLoading: isLoading,
		isLoadingTail: isLoadingTail
	};
}

function receiveChannelList({list=[],isLoading=false}={}) {
	return {
		type: types.RECEIVE_TIMELINE_CHANNEL_LIST,
		list,
    isLoading
	};
}
