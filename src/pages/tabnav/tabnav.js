import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';//使用时需要配置或者react-native link
import {createBottomTabNavigator} from 'react-navigation';
import HomePage from '../home/home';
import ParkPage from '../park/park';
import MinePage from '../mine/mine';
export default TabNav = createBottomTabNavigator(
    {
        Home:  {
            screen:HomePage,
            navigationOptions: () => ({
                tabBarLabel:'首页'
            })
        },
        Park:  {
            screen:ParkPage,
            navigationOptions: () => ({
                tabBarLabel:'找车位'
            })
        },
        Mine:  {
            screen:MinePage,
            navigationOptions: () => ({
                tabBarLabel:'我的'
            })
        }
    },
    
    {
        navigationOptions:({ navigation }) => ({
            tabBarIcon:({focused,tintColor}) => {
                const routeNme = navigation.state.routeName;
                let iconName;
                switch (routeNme) {
                    case 'Home':
                        iconName = `ios-home${focused ? '':''}`
                        break;
                    case 'Park':
                        iconName = `ios-ice-cream${focused ? '':''}`
                        break;
                    case 'Mine':
                        iconName = `ios-contact${focused ? '':''}`
                        break; 
                    default:
                        break;
                }
                return <Ionicons name={iconName} size={25} color={tintColor} />;      
            },
            tabBarOptions: {
                activeTintColor: global.theme.color,//选中图标颜色为橙色
                inactiveTintColor: 'gray' //未选中则显示灰色
            },
            
        })
    }
);