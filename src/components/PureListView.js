import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  View,
  Platform,
  RefreshControl
} from 'react-native';
import Loading from '../components/Loading';
import TextTips from '../components/TextTips';
class PureListView extends React.Component {
  constructor(props: Props) {
    super(props);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource: cloneWithData(dataSource, props.data,props.ids),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data,nextProps.ids),
      });

  }
  _onRefresh(){
    if(this.props.state.isRefreshing){
      return;
    }
    this.props.onRefresh();
  }
  renderRefreshControl(){
    return (
  <RefreshControl
    refreshing={this.props.state.isRefreshing}
    onRefresh={this._onRefresh.bind(this)}
    />
)
  }
  _onEndReached(){
    if(!this.props.state.hasMore){
      return;
    }
    if(this.props.state.isLoadingTail){
      return;
    }
    if(this.props.state.isLoading){
      return;
    }
    this.props.onEndReached();
  }
  render(){
    return (
      <ListView
        {...this.props}
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter.bind(this)}
        refreshControl={this.props.onRefresh?this.renderRefreshControl():null}
        enableEmptySections={true}
        onEndReachedThreshold={this.props.onEndReachedThreshold?this.props.onEndReachedThreshold:40}
        onEndReached={this.props.onEndReached?this._onEndReached.bind(this):null}
      />
    );
  }


  renderFooter() {
    if (this.state.dataSource.getRowCount() === 0) {
      if(this.props.state.isLoading){
        if(this.props.renderLoading){
          return this.props.renderLoading;
        }else{
          return <Loading text="加载中..." />
        }
      }else{
        return <TextTips text="没有数据" />
      }
    }else{
        if(this.props.state.hasMore && this.props.state.isLoadingTail){
          if(this.props.renderLoadingTail){
            return this.props.renderLoadingTail;
          }else{
            return <Loading text="加载更多中..."/>
          }
        }
        if(!this.props.state.hasMore){
          if(this.props.renderNoMore){
            return this.props.renderNoMore;
          }else{
            return <TextTips text="没有更多了" />
          }
        }
        return this.props.renderFooter?this.props.renderFooter:null;

      }


  }
}

PureListView.defaultProps = {
  data: []
};

function cloneWithData(dataSource,data,ids){
  const listData = [];
  for(let i=0;i<ids.length;i++){
    listData.push(data[ids[i]])
  }
  return dataSource.cloneWithRows(listData);
}

module.exports = PureListView;
