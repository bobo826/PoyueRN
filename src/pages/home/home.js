import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    WebView,
    Dimensions,
    FlatList
} from 'react-native';
import { WhiteSpace , Card , WingBlank , List ,Badge  } from 'antd-mobile-rn'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { MapTypes, MapModule, Geolocation } from 'react-native-baidu-map'
import HomeHeader from '../common/header/header';
import Slider from './components/swiper/slider';
import NvaBar from './components/navbar/nav';
import MapView from './components/map/map';
import ListItem from "../common/listitem/item";
import Tools from '../../tools/tools';
import API  from '../../api/api.json';
const tools = new Tools();//实例化工具;

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //分页功能所需参数
            page_index:1,//页面索引
            page_size:1,//页面显示数据条数
            lat:0,//经度
            lng:0,//纬度
            distance:1000,
            dataSource:[],
            bgcolor:'rgba(0, 0, 0, 0)',//滚动监听设置透明背景
            park_num:null, //停车场个数

            //地图相关
            mayType: MapTypes.NORMAL,
            zoom: 14,
            center:null,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            park_num:null,
            tname:null,
            showmap:this.props.navigation.isFocused()
        }
    }



    


    success(json) {
        if (json.code===0) {
            this.setState({dataSource:json.data.list})
        } else {
            return;
        }
    }




    componentWillMount(){

        const param = {
            page_index:this.state.page_index,
            page_size:this.state.page_size,
            lat:this.state.lat,
            lng:this.state.lng,
            distance:this.state.distance
        };
        tools.Post(API.search,param,this.success.bind(this));
        //console.warn(tools.Post);

        this.getPosition();
    }


    getPosition () {
        Geolocation.getCurrentPosition().then(
            (data) => {
            
            this.setState({
            zoom:14,
            tname:data.address,
            markers: [
                {
                    latitude: parseFloat(data.latitude),
                    longitude: parseFloat(data.longitude),
                    title: data.address
                }
            ],
            marker:{} ,
            center: {
                latitude: parseFloat(data.latitude),
                longitude: parseFloat(data.longitude)
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
                    keyExtractor={(item, index) => item.key}
                    ListHeaderComponent = {
                        <View>
                            <Slider />
                            <NvaBar />
                            <WhiteSpace size='sm'/>
                            <View style={styles.islogin}>
                                <Text style={styles.text}>登陆后可停车缴费,查看订单</Text>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => this.props.navigation.navigate('Login')}
                                >
                                    <Text style={styles.btn_text}>立即登录</Text>
                                </TouchableOpacity>
                            </View>
                            <WhiteSpace size='sm'/>
                            <View style={styles.map}>
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
                                                onPress={()=>this.getPosition()}
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
                                            mayType ={this.state.mayType}
                                            zoom = {this.state.zoom}
                                            center = {this.state.center}
                                            trafficEnabled = {this.state.trafficEnabled}
                                            baiduHeatMapEnabled = {this.state.baiduHeatMapEnabled}
                                            
                                            //marker = {this.state.marker}//当前位置marker
                                            markers = {this.state.markers}//自定义添加markers
                                            navigation = {this.props.navigation}//导航属性传递
                                            width = {Dimensions.get('window').width-20}
                                            height = {180}
                                            
                                        />
                                    <Text style={styles.footer}>推荐停车场</Text>
                                </View>
                            </View>
                            


                            <WhiteSpace size='sm'/>
                        </View>
                    }
                    data={this.state.dataSource}
                    renderItem={
                        ({item}) => <ListItem 
                            //key={item.key} 
                            goods_name={item.goods_name}//停车场名称
                            distance={item.distance}//距离
                            dz={item.dz}//地址
                            park_label={item.park_label}//营业时间
                            pay_type = {item.pay_type}//支付方式
                            istj = {item.istj}//是否推荐，0表示不推荐
                        />
                    }
                    onScroll = {(e)=>{
                        if(e.nativeEvent.contentOffset.y > 100){
                            this.setState({
                                bgcolor:'#eee'
                            })
                        } else {
                            this.setState({
                                bgcolor:'rgba(0, 0, 0, 0)'
                            })
                        }
                    }}
                />
                    
                <View style={[styles.header]}>
                    <HomeHeader
                        bgcolor = {this.state.bgcolor}
                        left = {true}
                        center = {true}
                        right = {true}
                        onSubmit={value => console.warn(value)}
                    />
                </View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
       
    },
    header:{
        position:'absolute',
        top:0,
        height:44,
        width:'100%'
    },
    islogin: {
        paddingBottom:30,
        paddingTop:30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },
    text:{
        fontSize:12,
        color:'grey',
        paddingBottom:20
    },
    btn:{
        backgroundColor:global.theme.color,
        paddingLeft:30,
        paddingRight:30,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:5
    },
    btn_text:{
        color:'white'
    },
    map:{
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:'white',
        height:280
    },

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
    footer:{
        paddingTop:15,
        fontSize:16
    }
});
