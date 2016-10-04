'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {requestWithAuth} from '../utils/RequestUtils';

export function fetchList({isRefreshing=false, isLoading=false, isLoadingTail=false, start=0}={}) {
	return dispatch => {
		dispatch(fetchMessageList({isRefreshing, isLoading, isLoadingTail}));
		return requestWithAuth(`messages?limit=7&start=${start}`)
      .then((data) => {
        dispatch(receiveMessageList({list:data.list,isLoading:isLoading}));
      })
      .catch((error) => {
        //todo
        console.log(error);
        console.log('请求错误');
      });
	};
}

function fetchMessageList({isRefreshing=false, isLoading=false, isLoadingTail=false}={}) {

	return {
		type: types.FETCH_MESSAGE_LIST,
		isRefreshing: isRefreshing,
		isLoading: isLoading,
		isLoadingTail: isLoadingTail
	};
}

function receiveMessageList({list=[],isLoading=false}={}) {
	return {
		type: types.RECEIVE_MESSAGE_LIST,
    isLoading:isLoading,
		list: list
	};
}
