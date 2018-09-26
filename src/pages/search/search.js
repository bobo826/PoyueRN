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
//引入api配置json
import API from '../../api/api.json'
class SegmentedControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            activecolor:global.theme.color,
            color:'grey',
            selected:false,
            key:'',
        }
    }


    render() {
        return (
            <View style={styles.control}>
               {
                    this.props.cells.map(
                        (cell,index) => {
                            return (
                                <TouchableOpacity
                                    key={cell.key}
                                    style={[styles.control_cell,{borderRightWidth:cell.borderrightwidth}]} 
                                    onPress = {
                                        ()=>{
                                            

                                            const obj = this.props.cells;
                                            
                                            
                                            this.setState({color:'grey'});
                                            obj[0].activecolor = this.state.color;
                                            obj[1].activecolor = this.state.color;
                                            obj[2].activecolor = this.state.color;
                                            console.warn(obj[0].activecolor);
                                            
                                            this.setState({activecolor:global.theme.color});
                                            obj[index].activecolor= this.state.activecolor;
                                            

                                        }
                                    }
                                >
                                    <Text style={{color:cell.activecolor}}>{cell.value}</Text>
                                    <EvilIcons name='chevron-up' size={25} color={cell.activecolor} /> 
                                </TouchableOpacity>
                            )
                            
                        } 
                    )
                }
            </View>
        )
    }
}




class search extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
             //地图与列表图层冲突解决方法
            //marginTop:400,
            //分页功能所需参数
            start_row:1,//页面索引
            page_size:1,//页面显示数据条数
            lat:0,//经度
            lng:0,//纬度
            distance:1000,

            dataSource:{},
            //搜索相关
            search_value:'停车场',
            //导航相关
            bgcolor:'rgba(0, 0, 0, 0)',//表示搜索框背景色为透明
            selectshow:true,//是否显示筛选器，默认true不显示
            left_content: null,
            centershow:true,
            center_content:null,
            //地图相关
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

    
   
    static defaultProps = {
        is_show_goback: true,
         //地图与列表图层冲突解决方法
        
    }
    
    //上拉刷新事件
    onEndReached  (event) {
        //console.warn("上拉触发")
    }


    Post(url){
        const param = {
                start_row:this.state.start_row,
                page_size:this.state.page_size,
                lat:this.state.lat,
                lng:this.state.lng,
                distance:this.state.distance
            };
        const paramStr = JSON.stringify(param);
        // post请求描述
        const requestDesc = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:paramStr
        };
        // 发送post请求
        fetch(url,requestDesc)
            .then((response)=>response.json())
            .then((json)=>{
                if (json.code===0) {
                    this.setState({dataSource:json.data.items})
                } else {
                    
                }
            })
            .catch((error)=>{
                console.warn(error)
            })
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
        //获取当前定位
        this.getPosition();
        // 第一次页面加载时发送post请求
        
        this.Post(API.search);
    }

    getPosition () {
        Geolocation.getCurrentPosition()
        .then(data => {
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
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent = {
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
                            // onMapClick={(e) => {
                            //     this.props.navigation.navigate('Search')
                            // }}

                            onMapStatusChange = {(e) => {
                                //console.warn(JSON.stringify(e));
                            }}
                        >
                        </MapView>
                    }
                    //style = {{marginTop:400}}
                    onScroll = {(e)=>{
                        //console.warn(e.nativeEvent);
                        if(e.nativeEvent.contentOffset.y > 250){
                            this.setState({
                                bgcolor:'white',
                                selectshow:false,
                                left_content:this.props.is_show_goback ? <EvilIcons name='chevron-left' size={30} color='grey' onPress = {() => this.props.navigation.goBack()}/> : null,
                                centershow:false,
                                center_content:<Text style={styles.center_title}>停车场列表</Text>,
                                //marginTop:0
                            })
                        } else {
                            this.setState({
                                bgcolor:'rgba(0, 0, 0, 0)',
                                selectshow:true,
                                left_content:null,
                                center_content:null,
                                centershow:true,
                                center_content:null,
                                //marginTop:400
                            })
                        }
                    }}
                    data={this.state.dataSource}
                    renderItem={({item}) => <ListItem key={item.key} goods_name={item.goods_name}/>}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold = {0.5}
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
                            cells={
                                [
                                    {value:'距离优先',key:1,borderrightwidth:0.5,activecolor:global.theme.color},
                                    {value:'空位优先',key:2,borderrightwidth:0.5,activecolor:'grey'},
                                    {value:'价格优先',key:3,borderrightwidth:0,activecolor:'grey'}
                                ]
                            }
                        />
                    }
                </View>
            </View>    
        )
    }
}





const styles = StyleSheet.create({
    container:{
        
    },
    // flatList:{
    //     marginTop:400,
    // },
    header:{
        position:'absolute',
        top:0,
        height:44,
        width:'100%',
    },
    map: {
        width: Dimensions.get('window').width,
        height: 400,
        // position:'absolute',
        // top:0,
        // zIndex:-1
    },
    center_title:{
        color:'#222',
        fontSize:18
    },
    control:{
        height:44,
        backgroundColor:'white',
        width:'100%',
        borderTopWidth:.5,
        borderTopColor:'#eee',
        borderBottomWidth:.5,
        borderBottomColor:'#eee',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    control_cell:{
        flexDirection:'row',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor:'#eee',
    }
});

export default search;