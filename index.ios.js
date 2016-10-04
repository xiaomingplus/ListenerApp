console.ignoredYellowBox = [
  // https://github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation',
];
import React,{Component} from 'react';
import {AppRegistry} from 'react-native';
import Root from './src/root';
AppRegistry.registerComponent('ListenerApp', () => Root);
