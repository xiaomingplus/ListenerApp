import React from 'react';
import {
  Navigator,
  TabBarIOS,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import ChannelContainer from '../containers/ChannelContainer';
import UserContainer from '../containers/UserContainer';
import MessageContainer from '../containers/MessageContainer';
import ChannelDetailContainer from '../containers/ChannelDetailContainer';
import Icon from "react-native-vector-icons/Ionicons";


const NavigationBarRouteMapper = {
  // 左键
  LeftButton(route, navigator, index, navState) {
    // ...
    if (index > 0) {
    return (
      <View style={styles.navButton}>
        <TouchableOpacity
          underlayColor='transparent'
          onPress={() => {if (index > 0) {navigator.pop()}}}>
          <Icon name="ios-arrow-back" size={30} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
  },
  // 右键
  RightButton(route, navigator, index, navState) {
    // ...
  },
  // 标题
  Title(route, navigator, index, navState) {

    return (
      <View style={styles.navBarTitle}>
        <Text style={styles.navTitle}>
          {route.name}
        </Text>
      </View>
    );
  }
};

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    selectedTab: "channels"
  };

  }
  _renderContent(tab) {

    let tabRoute = {};
    if(tab=='messages'){
      tabRoute = {
      component:MessageContainer,
      name: '消息'
      }
    }else if(tab=='users'){
      tabRoute={
      component:UserContainer,
      name: '我'
      }
    }else{
      tabRoute = {
      component:ChannelContainer,
      name: '主题推荐'
      }
    }
    const titleConfig = {
      title: '主题推荐',
    };
      return (
        <Navigator
        initialRoute={tabRoute}
        configureScene = {(route) =>{

          if(route.type && route.type==='left'){
            return Navigator.SceneConfigs.FloatFromLeft;
          }else{
            return Navigator.SceneConfigs.PushFromRight;
          }

        }}
        renderScene = {
        (route,navigator)=>{
         let Component = route.component;
         return <Component route={route} {...route.params} navigator = {navigator} />
        }
      }
      navigationBar={
        <Navigator.NavigationBar
                    style={styles.navContainer}
                    routeMapper={NavigationBarRouteMapper}/>
        }

        />
      );

    }

  render() {
      return (
        <TabBarIOS
          barTintColor="#ffffff"
          tintColor={"#2ebaa3"}
          >
          <Icon.TabBarItem
            title="发现"
            iconName="ios-compass-outline"
            selectedIconName="ios-compass"
            selected={this.state.selectedTab === "channels"}
            onPress={() => {
              this.setState({
                selectedTab: "channels",
              });
            }}>
            {this._renderContent("channels")}
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="消息"
            iconName="ios-mail-open-outline"
            selectedIconName="ios-mail-open"

            selected={this.state.selectedTab === "messages"}
            onPress={() => {
              this.setState({
                selectedTab: "messages",
              });
            }}>
            {this._renderContent("messages")}
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="我"
            iconName="ios-person-outline"
            selectedIconName="ios-person"
            selected={this.state.selectedTab === "users"}
            onPress={() => {
              this.setState({
                selectedTab: "users",
              });
            }}>
            {this._renderContent("users")}
          </Icon.TabBarItem>
        </TabBarIOS>
      );
  }
}
const NAV_BAR_HEIGHT = 44;
const STATUS_BAR_HEIGHT = 20;
const styles = StyleSheet.create({
  navContainer:{
    flex:1,
    backgroundColor: 'white',
    borderBottomColor:"#e0e0e0",
    borderBottomWidth:0.5,
    borderStyle:"solid"
  },
  navBarTitle:{
    height:NAV_BAR_HEIGHT,
    paddingTop:10,

  },
  navTitle:{
    fontSize:17,
    letterSpacing:0.5,
    color:"#333",
    fontWeight:"500"
  },
  navButton:{
    height:NAV_BAR_HEIGHT,
    paddingTop:5,
    paddingLeft:15
  }

})
export default MainContainer;
