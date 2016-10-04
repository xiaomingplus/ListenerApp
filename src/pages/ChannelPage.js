import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text,
  RefreshControl,
  TabBarIOS
} from 'react-native';
import Channel from '../components/Channel';
import Loading from '../components/Loading';
import TextTips from '../components/TextTips';
import ChannelDetailContainer from '../containers/ChannelDetailContainer';
import PureListView from '../components/PureListView'
class ChannelPage extends Component {
    constructor(props){
      super(props);
    }


    componentDidMount(){
      const {fetchTimelineChannelList,user} = this.props;
      fetchTimelineChannelList({isRefreshing:false, isLoading:true,isLoadingTail:false});
    }

    onEndReached(){
      const {fetchTimelineChannelList,channel,user} = this.props;
      fetchTimelineChannelList({isRefreshing:false, isLoading:false,isLoadingTail:true,start:channel.timelineState.start});
    }
    onRefresh(){
      const {fetchTimelineChannelList,user} = this.props;
      fetchTimelineChannelList({isRefreshing:true, isLoading:false,isLoadingTail:false});

    }
    _onPress(channelId){
        const {navigator} = this.props;
        navigator.push({
          component:ChannelDetailContainer,
          params:{
            channelId
          },
          name:"主题详情",
          type:'right'
        });

      }
    _onPressSubscribedButton(id,following){
      if(this.props.channel.data[id].isSubscribedButtonLoading){
        return;
      }
      const {fetchPostSubscription,fetchDelSubscription} = this.props;
      if(following){
        fetchDelSubscription({channelId:id});
      }else{
        fetchPostSubscription({channelId:id});
      }
    }
    render() {
      const {channel} = this.props;
        return (
          <View style = {style.container}>
                    <PureListView style={style.list}
                              data = {channel.data}
                              ids = {channel.timelineIds}
                              state = {channel.timelineState}
                              contentContainerStyle={style.listContent}
                              renderRow={(data) => <Channel onPressSubscribedButton={this._onPressSubscribedButton.bind(this,data.id,data.following)} onPress={this._onPress.bind(this,data.id)} data={data} />}
                              enableEmptySections={true}
                              onRefresh={this.onRefresh.bind(this)}
                              onEndReached={this.onEndReached.bind(this)}
                              />
          </View>

        );
    }
}



const style = StyleSheet.create(
  {
    list:{
      paddingLeft:25,
      paddingRight:25,
      flex:1,
      flexDirection:"column"
    },
    container:{
      flex:1,
      flexDirection:"column",
      paddingTop:60
    },
    hr:{
      height:1,
      backgroundColor:"red"
    },
    listContent:{
      paddingBottom:70
    }
  }
)
export default ChannelPage;
