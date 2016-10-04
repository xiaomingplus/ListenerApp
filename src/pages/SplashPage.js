'use strict';
import React from 'react';
import {
  Image,
  View,
  Text,
  InteractionManager,
  NativeAppEventEmitter
} from 'react-native';
import MainContainer from '../containers/MainContainer';
import JPushModule from 'jpush-react-native';
class SplashPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    // NativeAppEventEmitter.addListener('ReceiveNotification',message=>{
    //   console.log('test');
    //   console.log(message);
    // });
  }
   componentDidMount() {
    const {loadUser} = this.props;
    // console.log(DeviceInfo.getUniqueID());
    loadUser();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.user.user && nextProps.user.user.id){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: MainContainer,
          name: 'Main'
        });
      });
    }
  }
  componentWillUnmount() {
      // NativeAppEventEmitter.removeAllListeners();
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>监听者</Text>
      <Image
        source={require('../assets/images/splash.png')}
      />
      </View>
    );
  }
}

export default SplashPage;
