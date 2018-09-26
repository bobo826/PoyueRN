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



export default class BaiduMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 14,
            center: {
              longitude: 113.981718,
              latitude: 22.542449
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            park_num:88,
            tname:'奥克斯广场停车场'
        };
    }

    

    componentDidMount(){
        this.setState({
            //zoom:14,
            markers: [{
                longitude: 104.069467,
                latitude: 30.584607,
                title: "Window of the world"
              },{
                longitude: 104.069473,
                latitude: 30.584603,
                title: ""
              }]
        });
        this.getPosition()
    }

    getPosition () {
        //console.warn('center', this.state.center);
        Geolocation.getCurrentPosition()
        .then(data => {
            //console.warn(JSON.stringify(data));
            this.setState({
            //zoom: 14,
            tname:data.address,    
            marker: {
                latitude: data.latitude,
                longitude: data.longitude,
                title: 'Your location'
            },
            center: {
                latitude: data.latitude,
                longitude: data.longitude,
                rand: Math.random()
            }
            });
        })
        .catch(e =>{
            console.warn(e, 'error');
        })
    }

    render() {
       
        return (
            <View>
                <View style={styles.title}>
                    <Text style={styles.park_num}>
                        附近有
                        <Text style={[ styles.park_num, {color:global.theme.color}]}>{this.state.park_num}</Text>
                        个停车场
                    </Text>
                    <View style={styles.tname}>
                        <Text 
                            style={styles.tname_text}
                            numberOfLines={1}
                            //ellipsizeMode = 'tail' 
                        >
                            {this.state.tname}
                        </Text>
                        <TouchableOpacity
                            onPress={this.getPosition.bind(this)}
                        >
                            <EvilIcons 
                                name='refresh' 
                                size={28} 
                                color={global.theme.color}
                            />
                        </TouchableOpacity>
                    </View>
                   
                </View>
                <MapView 
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    markers={this.state.markers}
                    style={styles.map}
                    onMarkerClick={(e) => {
                        console.warn(JSON.stringify(e));
                    }}
                    onMapClick={(e) => {
                        this.props.navigation.navigate('Search')
                    }}

                    onMapStatusChange = {(e) => {
                        //console.warn(JSON.stringify(e));
                    }}
                >
                </MapView>
                <Text style={styles.footer}>
                推荐停车场</Text>
            </View>
        );
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
        paddingLeft:10,
        paddingRight:10,
        width: Dimensions.get('window').width-20,
        height: 180
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