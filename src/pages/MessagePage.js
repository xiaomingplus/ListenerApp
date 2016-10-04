import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text,
  RefreshControl,
  TabBarIOS,
  Linking
} from 'react-native';
import Message from '../components/Message';
import {fetchList} from '../actions/message';
import PureListView from '../components/PureListView';
import ChannelDetailContainer from '../containers/ChannelDetailContainer';
import WebViewContainer from '../containers/WebViewContainer';
class MessagePage extends Component {
    constructor(props){
      super(props);
    }
    componentDidMount(){
      const {fetchList} = this.props;
      fetchList({isRefreshing:false, isLoading:true,isLoadingTail:false});
    }

    onEndReached(){
      const {fetchList,message} = this.props;
      fetchList({isRefreshing:false, isLoading:false,isLoadingTail:true,start:message.userState.start});
    }
    onRefresh(){
      const {fetchList} = this.props;
      fetchList({isRefreshing:true, isLoading:false,isLoadingTail:false});

    }

    _onPress(messageId){
        const {navigator,message} = this.props;

        if(message.data[messageId].type==='link'){
          navigator.push({
            component:WebViewContainer,
            params:{
              uri:message.data[messageId].link_url
            },
            name:"链接",
            type:'right'
          });
          // (async ()=>{
          //   var x = await Linking.openURL(message.data[messageId].link_url);
          // })()
        }


      }
      _onPressChannel(id){
        const {navigator} = this.props;
        navigator.push({
          component:ChannelDetailContainer,
          params:{
            channelId:id
          },
          name:"主题详情",
          type:'right'
        });
      }
    render() {
      const {message} = this.props;
        return (
          <View style = {style.container}>
          <PureListView style={style.list}
                    data = {message.data}
                    ids = {message.userIds}
                    state = {message.userState}
                    contentContainerStyle={style.listContent}
                    renderRow={(data) => <Message onPressChannel={this._onPressChannel.bind(this,data.channel.id)} onPress={this._onPress.bind(this,data.id)} data={data} />}
                    enableEmptySections={true}
                    onEndReachedThreshold={40}
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
      flex:1,
      flexDirection:"column"
    },
    container:{
      flex:1,
      flexDirection:"column",
      paddingTop:60,
      backgroundColor:"#f7f7f7"

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
export default MessagePage;
