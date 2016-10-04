import {combineReducers} from 'redux';
import channel from './channel';
import channelDetail from './channelDetail';
import message from './message';
import user from './user';
const rootReducer = combineReducers({
	channel,
	channelDetail,
	message,
	user
});

export default rootReducer;
