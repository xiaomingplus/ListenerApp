import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
const style = StyleSheet.create(
{
  tips:{
    alignItems:"center",
    justifyContent:"center",
    paddingTop:30
  }
}
);


class TextTips extends Component {
    render() {
      if(this.props.text){
        return (
          <View style={[style.tips,this.props.style]}>
          <Text>
            {this.props.text}
          </Text>
          </View>
        );
      }else{
        return (
          <View style={[style.tips,this.props.style]}>
          </View>
        );
      }

    }
}

export default TextTips;
