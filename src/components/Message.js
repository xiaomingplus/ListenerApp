import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {formatTimeString} from '../utils/FormatUtils';
class Message extends Component {
    static propTypes = {};
    constructor(props) {
        super(props);
    }

    render() {
        const {data, onPress,onPressChannel} = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.header}>
                      <View style={styles.headerLeft}>
                      <TouchableOpacity onPress={onPressChannel}>
                            <Image source={{
                                uri: data.channel.avatar
                            }} style={styles.avatar}/>
                      </TouchableOpacity>
                    </View>
                        <View style={styles.headerRight}>
                          <TouchableOpacity onPress={onPressChannel}>
                            <View>
                          <Text style={styles.channelName}>{data.channel.name}</Text>
                          <Text style = {styles.time}>{formatTimeString(data.created)}</Text>
                          </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.content}>
                      <Text>
                        {data.text}
                      </Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.text}>

                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff",
        marginBottom:10,
        borderTopWidth:0.5,
        borderStyle:"solid",
        borderColor:"#f1f1f1",
        borderBottomWidth:0.5,
    },
    header: {
        flex: 1,
        flexDirection: "row"
    },
    headerLeft: {
        flex: 1,
        paddingLeft:15,
        paddingTop:10
    },
    headerRight: {
        flex: 9,
        paddingTop:10

    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    channelName:{
      fontSize:12,
      color:"#2ebaa3",
      lineHeight:15
    },
    time:{
      color:"#adadad",
      fontSize:11,
      lineHeight:15
    },
    name: {},

    content: {
      paddingTop:15,
      paddingLeft:15,
      paddingBottom:15
    },
    text: {},
    footer: {}
});
export default Message;
