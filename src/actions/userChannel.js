'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {requestWithAuth} from '../utils/RequestUtils';

export function fetchUserChannelList({isRefreshing=false, isLoading=false, isLoadingTail=false, start=0}={}) {
	return dispatch => {
		dispatch(fetchChannelList({isRefreshing, isLoading, isLoadingTail}));
		return requestWithAuth(`channels?start=${start}`)
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

function fetchChannelList({isRefreshing=false, isLoading=false, isLoadingTail=false}={}) {

	return {
		type: types.FETCH_USER_CHANNEL_LIST,
		isRefreshing: isRefreshing,
		isLoading: isLoading,
		isLoadingTail: isLoadingTail
	};
}

function receiveChannelList({list=[],isLoading=false}={}) {
	return {
		type: types.RECEIVE_USER_CHANNEL_LIST,
		list,
    isLoading
	};
}
