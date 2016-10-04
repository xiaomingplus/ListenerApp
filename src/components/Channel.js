import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Button from '../libs/react-native-button';
class Channel extends Component {
    constructor(props){
      super(props);
    }
    renderButton(){
      if(this.props.data.following){
        return (<Button isLoading={this.props.data.isSubscribedButtonLoading} onPress={this.props.onPressSubscribedButton} style={[styles.button,styles.subscribedButton]} textStyle={[styles.buttonText,styles.subscribedButtonText]}>√ 已监听</Button>);
      }else{
        return (<Button isLoading={this.props.data.isSubscribedButtonLoading} onPress={this.props.onPressSubscribedButton} style={[styles.button,styles.unsubscribedButton]} textStyle={[styles.buttonText,styles.unsubscribedButtonText]}>+ 监听</Button>);
      }
    }
    render() {
      const {data,onPress} = this.props;
      return (
        <TouchableOpacity onPress={onPress}>
        <View style = {styles.container}>
        <View style = {styles.header}>
        <View style = {styles.left}>
          <View style = {styles.leftHeader}>
            <Text style = {styles.name} >{data.name}</Text>
          </View>
          <View style={styles.leftFooter}>
            <Text style = {styles.followerCount}>{data.followers_count}人</Text>
          </View>
        </View>
        <View style = {styles.right}>
          {this.renderButton()}
        </View>
        </View>
        <View style = {styles.footer}>
        <Text style = {styles.description}>{data.description}</Text>
        </View>
        </View>
        </TouchableOpacity>
      );
    }
}
const styles = StyleSheet.create(
{

  container:{
    flex:1,
    borderColor:"#f1f1f1",
    borderWidth:1,
    borderStyle:"solid",
    marginBottom:15,
    borderRadius:5,
    flexDirection:"column"
  },
  header:{
    flex:1,
    flexDirection:"row"
  },
  left:{
    flex:3,
    paddingLeft:15,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:10
  },
  leftHeader:{
    flex:1
  },
  leftFooter:{
    flex:1
  },
  name:{
    fontWeight:"500",
    fontSize:18,
    paddingTop:10,
    paddingBottom:5
  },
  followerCount:{
    color:"#b2b2b2",
    paddingTop:10,
  },
  right:{
    paddingTop:15,
    flex:1,
    paddingRight:15,
    paddingBottom:10
  },
  footer:{
    backgroundColor:"#fbfbfb",
    flex:1
  },
  description:{
    color:"#737373",
    lineHeight:20,
    paddingTop:10,
    paddingBottom:15,
    paddingLeft:15,
    paddingRight:15
  },
  button:{
    borderRadius:3,
    paddingTop:1,
    width:70,
    height:30,
  },
  buttonText:{
    fontSize:14
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
}
);
export default Channel;
