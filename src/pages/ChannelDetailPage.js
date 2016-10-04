import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text,
  RefreshControl,
  TabBarIOS
} from 'react-native';
import Loading from '../components/Loading';
import TextTips from '../components/TextTips';
import NavigationBar from 'react-native-navbar';
import {fetchList} from '../actions/channelDetail';
import Channel from '../components/Channel';
import ChannelDetailHeader from '../components/ChannelDetailHeader';
import WebViewContainer from '../containers/WebViewContainer';

class ChannelDetailPage extends Component {
    constructor(props){
      super(props);
    }
    componentWillMount() {
      const {fetchOne,channel,channelId,user} = this.props;
      if(!channelId){
        this.setState({
          isChannelNotFound:true
        })
        return;
      }
      if(channel.data[channelId]){
        this.setState({
          channel:channel.data[channelId],
          isChannelLoading:false
        });
      }else{
        this.setState({
          isChannelLoading:true
        });
        fetchOne({id:channelId});
      }
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
      if(nextProps.channel.data[this.props.channelId]){
        this.setState({
          channel:nextProps.channel.data[this.props.channelId],
          isChannelLoading:false
        });
      }

    }

    _onPressSubscribedButton(id,following){
      if(this.state.channel.isSubscribedButtonLoading){
        return;
      }
      const {fetchPostSubscription,fetchDelSubscription,user} = this.props;
      if(following){
        fetchDelSubscription({channelId:id,userId:user.user.id});
      }else{
        fetchPostSubscription({channelId:id,userId:user.user.id});
      }
    }

    _onPressConfig(url){
      const {navigator} = this.props;
      navigator.push({
        component:WebViewContainer,
        params:{
          uri:url
        },
        name:"设置页",
        type:'right'
      });
    }


    render() {
      const {channelDetail,channel,channelId} = this.props;
      let name="",description="",followerCount=0;
      if(this.state.isChannelLoading){
        return (
          <View>
            <Loading style={{paddingTop:90}}  text="数据加载中..." />
          </View>
        )
      }
      if(this.state.isChannelNotFound){
        return (
          <View>
            <TextTips style={{paddingTop:90}}  text="该主题不存在" />
          </View>
        )
      }
        return (
          <View style = {style.container}>
          <ChannelDetailHeader onPressConfig={this._onPressConfig.bind(this,this.state.channel.config_url)} config_url={this.state.channel.config_url} allow_config={this.state.channel.allow_config} avatar={this.state.channel.avatar} isSubscribedButtonLoading={this.state.channel.isSubscribedButtonLoading} onPressSubscribedButton = {this._onPressSubscribedButton.bind(this,this.state.channel.id,this.state.channel.following)} channelId={channelId} name={this.state.channel.name} description={this.state.channel.description} followers_count={this.state.channel.followers_count} following={this.state.channel.following}/>
          </View>
        );
    }
}
const style = StyleSheet.create(
  {
    container:{
      paddingTop:60
    },
    navigator:{
      borderBottomColor:"#e0e0e0",
      borderBottomWidth:0.5,
      borderStyle:"solid"
    }
  }
);
export default ChannelDetailPage;
