import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserChannelContainer from '../containers/UserChannelContainer';
export default class UserPage extends Component{
  _onPress(){
    const {navigator} = this.props;
    navigator.push({
      component:UserChannelContainer,
      name:"我的主题",
      type:'right'
    });
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri:"http://tva4.sinaimg.cn/crop.0.0.1242.1242.180/006bEpFbjw8eztmzf8bphj30yi0yiabf.jpg"}} style={styles.avatar}/>
          <Text style={styles.nickname}>小明plus</Text>
        </View>
        <View style={styles.itemList}>
        <TouchableOpacity onPress={this._onPress.bind(this)}>
        <View style={styles.firstItem}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemText}>全部主题</Text>
          </View>
          <View style={styles.itemRight}>
            <Icon name="ios-arrow-forward" size={25}></Icon>
          </View>
        </View>
        </TouchableOpacity>

      </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"column",
    paddingTop:70,
    backgroundColor:"#f7f7f7"
  },
  header:{
    alignItems:"center",
    paddingTop:10,
    paddingBottom:50,
    height:130

  },
  itemList:{

  },
  avatar:{
    width:60,
    height:60,
    borderRadius:30
  },
  nickname:{
    lineHeight:25
  },
  firstItem:{
    flex:1,
    flexDirection:"row",
    paddingLeft:15,
    paddingRight:15,
    height:50,
    backgroundColor:"#fff"
  },
  itemLeft:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center"
  },
  itemText:{
    fontSize:16
  },
  itemRight:{
    flex:1,
    alignItems:"flex-end",
    justifyContent:"center"

  }
})
