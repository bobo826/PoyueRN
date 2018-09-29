import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    NativeModules,
    Button
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';//使用时需要配置或者react-native link
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map'
const HomeMap = ()=>new MapView();


export default class BaiduMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showmap:true//是否显示地图
        }
    }

// addListener – 订阅导航生命周期事件变化
// React Navigation 会向做了订阅的screen屏组件发送事件: 
// willBlur – 屏幕将要被取消聚焦
// didBlur – 屏幕被取消了聚焦(如果有过渡动画，在过渡完成时)
// willFocus – 屏幕将要被聚焦
// didFocus – 屏幕被聚焦(如果有过渡动画，在过渡完成时)

    willFocusSubscription(){
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                payload = {
                    action: { type: 'Navigation/COMPLETE_TRANSITION', key: 'StackRouterRoot' },
                    context: 'id-1518521010538-2:Navigation/COMPLETE_TRANSITION_Root',
                    lastState: undefined,
                    state: undefined,
                    type: 'willFocus',
                };
                console.log("willFocus",payload);
                this.setState({
                    showmap:true
                })
                
            }
        );
    }

  

    willBlurSubscription(){
        this.props.navigation.navigate('Search');
        this.props.navigation.addListener(
            'willBlur',
            payload => {
                payload = {
                    action: { type: 'Navigation/COMPLETE_TRANSITION', key: 'StackRouterRoot' },
                    context: 'id-1518521010538-2:Navigation/COMPLETE_TRANSITION_Root',
                    lastState: undefined,
                    state: undefined,
                    type: 'willBlur',
                };
                console.log("willBlur",payload);
                this.setState({showmap:false})
                
                
            }
        );
    }


    render() {
        return (
                <View>
                    {
                        this.state.showmap ?
                        <HomeMap 
                            trafficEnabled={this.props.trafficEnabled}
                            baiduHeatMapEnabled={this.props.baiduHeatMapEnabled}
                            zoom={this.props.zoom}
                            mapType={this.props.mapType}
                            center={this.props.center}
                            //marker={this.props.marker}
                            markers={this.props.markers}

                            style={[styles.map,{width:this.props.width,height:this.props.height}]}
                            onMarkerClick={(e) => {
                                //console.warn(JSON.stringify(e));
                            }}
                            onMapClick={(e) => {
                                this.willBlurSubscription();//addListener – 订阅导航生命周期事件变化
                                this.willFocusSubscription();//addListener – 订阅导航生命周期事件变化
                            }}

                            onMapStatusChange = {(e) => {
                                //console.warn(JSON.stringify(e));
                            }}
                        >
                        </HomeMap> 
                        :
                        null
                    }
                    
                </View>
            )
    }
}

const styles = StyleSheet.create({
    title:{
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:10
    },
    park_num:{
        fontSize:18,
        color:'grey',
    },
    tname:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex:1,
        paddingLeft:40
    },
    tname_text:{
        color:'#bcbcbc'
    },
    map: {
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    footer:{
        paddingTop:15,
        fontSize:16
    },
    btn: {
        position: 'absolute',
        left: 10,
        bottom: 10,
    }
  });