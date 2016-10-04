import React from 'react';
import {Provider} from 'react-redux';
import{View,Text} from 'react-native';
import configureStore from './store/configureStore';
import App from './containers/App';
const store = configureStore();
class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
        <App />
      </Provider>
		)
	}
}

export default Root;
