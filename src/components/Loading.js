import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
const style = StyleSheet.create(
{
  loading:{
    textAlign:"center",
  }
}
);


class Loading extends Component {
    render() {
      const titleConfig = {
        title: '主题推荐',
      };
      if(this.props.text){
        return (
          <View style={this.props.style?this.props.style:{}}>
          <Text style={style.loading}>
            {this.props.text}
          </Text>
          <ActivityIndicator
              size="large"
          />
          </View>
        );
      }else{
        return (
          <View>
          <ActivityIndicator
              size="large"
          />
          </View>
        );
      }

    }
}

export default Loading;
