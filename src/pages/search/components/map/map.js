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
const SearchMap = ()=>new MapView();


export default class BaiduMap extends Component {
    constructor(props) {
        super(props);
        
    }

   
  
    render() {
        return (
                <View>
                    <SearchMap 
                        //setMarker = {this.props.marker}
                        trafficEnabled={this.props.trafficEnabled}
                        baiduHeatMapEnabled={this.props.baiduHeatMapEnabled}
                        zoom={this.props.zoom}
                        mapType={this.props.mapType}
                        center={this.props.center}
                        markers={this.props.markers}
                        style={[styles.map,{width:this.props.width,height:this.props.height}]}
                        onMarkerClick={(e) => {
                            console.warn(JSON.stringify(e));
                        }}
                        onMapClick={(e) => {
                            // this.willBlurSubscription();
                            // this.didBlurSubscription();
                        }}

                        onMapStatusChange = {(e) => {
                            //console.warn(JSON.stringify(e));
                        }}
                    >
                    </SearchMap> 
                    
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