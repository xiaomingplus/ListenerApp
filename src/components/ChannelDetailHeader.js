import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  TabBarIOS
} from 'react-native';
import Button from '../libs/react-native-button';
import Icon from "react-native-vector-icons/Ionicons";

export default class ChannelDetailHeader extends Component{
  renderButton(){
    if(this.props.following){
      return (<Button isLoading={this.props.isSubscribedButtonLoading} onPress={this.props.onPressSubscribedButton} style={[styles.button,styles.subscribedButton]} textStyle={[styles.buttonText,styles.subscribedButtonText]}>√ 已监听</Button>);
    }else{
      return (<Button isLoading={this.props.isSubscribedButtonLoading} onPress={this.props.onPressSubscribedButton} style={[styles.button,styles.unsubscribedButton]} textStyle={[styles.buttonText,styles.unsubscribedButtonText]}>+ 监听</Button>);
    }
  }
  renderIcon(){
    if(this.props.allow_config && this.props.config_url){
      return (<TouchableOpacity onPress={this.props.onPressConfig}><Icon style={styles.setting} name="ios-settings" size={40} color="#e0e0e0"/></TouchableOpacity>)
    }
  }
  render(){
    const {name,description,followers_count,avatar} = this.props;
  return (
    <View sytle={styles.container}>
    <View style={styles.header}>
    <View style={styles.headerLeft}>
    <Image source={{uri:avatar}} style={styles.avatar} />
    </View>
    <View style={styles.headerRight}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.description}>{description}</Text>
    </View>
    </View>
    <View style = {styles.footer}>
    <View style={styles.footerLeft}>
    <Text style={styles.followerCount}>{followers_count}人关注</Text>
    </View>
    <View style={styles.footerRight}>
      {this.renderIcon()}
      {this.renderButton()}
    </View>
    </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  header:{
    paddingLeft:25,
    flex:1,
    flexDirection:"row",

  },
  headerLeft:{
    paddingTop:20,
    flex:1
  },
  headerRight:{
    paddingTop:25,
    flex:2.5,
    paddingRight:30
  },
  avatar:{
    width:80,
    height:80,
    borderRadius:40
  },
  name:{
    marginBottom:5,
    fontWeight:"700",
    fontSize:20
  },
  description:{
    color:"#5c5c5c",
    fontSize:14,
    lineHeight:18
  },
  footer:{
    flex:1,
    flexDirection:"row",
    paddingBottom:10,
    borderBottomColor:"#e0e0e0",
    borderBottomWidth:0.5,
    borderStyle:"solid"
  },
  footerLeft:{
    flex:1,
    paddingLeft:25,
    paddingTop:25

  },
  followerCount:{
    color:"#292929",
    fontSize:18
  },
  footerRight:{
    flex:2,
    flexDirection:"row",
    justifyContent:"flex-end",
    paddingRight:30,
    paddingTop:15,

  },
  button:{
    borderRadius:3,
    paddingTop:1,
    width:90,
    height:40,
  },
  buttonText:{
    fontSize:16
  },
  unsubscribedButton:{
    borderColor:"#2ebaa3",
    borderWidth:1
  },
  subscribedButton:{
    backgroundColor:"#2ebaa3",
    borderWidth:0
  },
  unsubscribedButtonText:{
    color:"#2ebaa3",
  },
  subscribedButtonText:{
    color:"#fff",
  },
  setting:{
    marginRight:25
  }
});
