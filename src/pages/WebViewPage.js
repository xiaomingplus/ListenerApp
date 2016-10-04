'use strict';
import React from 'react';
import {oauth2Domain} from '../config';
import urlJoinQuery from 'url-join-query';
import urlUtils from 'url';
import { 
  WebView,
  StyleSheet,
  View
} from 'react-native';
import {getRootUrl} from '../utils/CommonUtils';
class WebViewPage extends React.Component {
  constructor(props) {
    super(props);
    if(getRootUrl(this.props.uri)=== oauth2Domain){
      const {user}  = this.props;
      this.state = {
        uri:urlUtils.parse(this.props.uri,true).query.token?this.props.uri:urlJoinQuery(this.props.uri,{
          token:user.user.token,
          expire:user.user.expire
        }),
        headers:{
        }
      }
    }else{
      this.state = {
        uri:this.props.uri,
        headers:{

        }
      };
    }
  }
   componentDidMount() {

  }
  componentWillReceiveProps(nextProps){

  }
_OnNavigationStateChange(navState){
  console.log('nav changed');
  console.log(navState.url);
  console.log(oauth2Domain);
  if(getRootUrl(navState.url)===oauth2Domain){
    const {user} = this.props;
    let url = urlUtils.parse(this.props.uri,true).query.token?this.props.uri:urlJoinQuery(navState.url,{
      token:user.user.token,
      expire:user.user.expire
    });
    console.log(url);
    this.setState({
      uri:url
    })
  }
}
  render() {
    return (
    <WebView
      contentInset={{
        top:60,
        bottom:40
      }}
       source={
        {uri:this.state.uri,
         headers:this.state.headers
       }}
        onNavigationStateChange = {this._OnNavigationStateChange.bind(this)}
     />
    );
  }
}
const styles = StyleSheet.create({
  container:{
    paddingTop:180,
    paddingBottom:60
  }
})
export default WebViewPage;
