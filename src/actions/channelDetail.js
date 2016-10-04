'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {requestWithAuth} from '../utils/RequestUtils';

export function fetchOne({id=""}={}){
	return dispatch=>{
		dispatch(fetchOneChannel({id:id}));
		return requestWithAuth(`channels/${id}`).then((data)=>{
			setTimeout(()=>{
				dispatch(receiveOneChannel(data));
			},3000);
		}).catch((error) =>{
			console.log(error);
		});
	}
}

function fetchOneChannel() {
	return {
		type: types.FETCH_ONE_CHANNEL
	};
}

function receiveOneChannel(data) {
	return {
		type: types.RECEIVE_ONE_CHANNEl,
		data: data
	};
}
