import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Button
} from 'react-native';
import {SearchBar } from 'antd-mobile-rn'
import ParkHeader from '../common/header/header';
import ListItem from '../common/listitem/item';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map'
class SegmentedControl extends Component {
    constructor(props){
        super(props);
    }
    renderCell(cells){
        let cells_view = [];
        for (let iterator of cells) {
            cells_view.push(<Text>{iterator}</Text>)
        }
        return cells_view;
    }

    
    render() {
       
        return (
            <View style={styles.control}>
                {this.renderCell(this.props.cells)}
            </View>
        )
    }
}


class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgcolor:'rgba(0, 0, 0, 0)',//表示搜索框背景色为透明
            selectshow:true,//是否显示筛选器，默认true不显示
            left_content: null,
            centershow:true,
            center_content:null,
            search_value:'',
            mayType: MapTypes.NORMAL,
            zoom: 15,
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
            zoom:14,
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
            zoom: 14,
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
            <View style={styles.container}>
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
                <FlatList
                    style = {styles.flatList}
                    onScroll = {(e)=>{
                        //console.warn(e.nativeEvent);
                        if(e.nativeEvent.contentOffset.y > 250){
                            this.setState({
                                bgcolor:'white',
                                selectshow:false,
                                left_content:<EvilIcons name='chevron-left' size={25} color='grey' />,
                                centershow:false,
                                center_content:<Text style={styles.center_title}>停车场列表</Text>
                            })
                        } else {
                            this.setState({
                                bgcolor:'rgba(0, 0, 0, 0)',
                                selectshow:true,
                                left_content:null,
                                center_content:null,
                                centershow:true,
                                center_content:null
                            })
                        }
                    }}
                    data={
                        [
                            {key: 'a'}, 
                            {key: 'b'},
                            {key: 'c'}, 
                            {key: 'd'},
                            {key: 'e'}, 
                            {key: 'f'},
                            {key: 'h'}, 
                            {key: 'i'}
                        ]
                    }
                    renderItem={({item}) => <ListItem key={item.key}/>}
                />
                <View style={styles.header}>
                    <ParkHeader 
                        bgcolor = {this.state.bgcolor}
                        left = {false}
                        left_content = {this.state.left_content}
                        center = {this.state.centershow}
                        center_content = {this.state.center_content}
                        right = {false}
                        right_content = {null}
                        onSubmit={value => console.warn(value)}
                    />
                    
                    {
                        this.state.selectshow ? 
                        null 
                        : 
                        <SegmentedControl 
                            cells={['距离优先', '空位优先','价位优先']}
                        />
                        // <SegmentedControl selectedIndex={1} values={['距离优先','空位优先','价位优先']} />
                    }
                </View>
            </View>    
        )
    }
}





const styles = StyleSheet.create({
    container:{
        
    },
    flatList:{
        paddingTop:400
    },
    header:{
        position:'absolute',
        top:0,
        height:44,
        width:'100%',
    },
    map: {
        width: Dimensions.get('window').width,
        height: 400,
        position:'absolute',
        top:0,
        zIndex:-1
        
    },
    center_title:{
        color:'#222',
        fontSize:18
    },
    control:{
        height:44,
        backgroundColor:'#eee',
        width:'100%',
        borderTopWidth:1,
        borderTopColor:'grey',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default search;