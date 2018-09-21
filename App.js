/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  YellowBox
} from 'react-native';
//导入主题
import './src/theme.js';
//使用React-Navigation出现以下问题的解决办法如下，即忽略警告
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import {createStackNavigator} from 'react-navigation';
import LoginPage from './src/pages/login/login';
import TabNav from './src/pages/tabnav/tabnav';
import SearchPage from './src/pages/search/search';

export default App = createStackNavigator(
  {
    // 登录页
    Login: {
      screen:LoginPage,
      navigationOptions: () => ({
        header:null
      })
    },
    //首页
    Index: {
      screen:TabNav,
      navigationOptions: () => ({
        header:null
      })
    },
    // 搜索页面
    Search: {
      screen:SearchPage,
      navigationOptions: () => ({
        header:null
      })
    },
  },
  {
    initialRouteName: 'Index',
  }
);