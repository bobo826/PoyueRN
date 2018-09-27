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
            currentPage:1,//页面索引
            pageSize:1,//页面显示数据条数
            lat:0,//经度
            lng:0,//纬度
            distance:1000,
            dataSource:{},

            bgcolor:'rgba(0, 0, 0, 0)',
        }
    }


    success(json) {
        if (json.code===0) {
            this.setState({dataSource:json.data.list})
        } else { }
    }

    componentWillMount(){
        const param = {
            currentPage:this.state.currentPage,
            pageSize:this.state.pageSize,
            lat:this.state.lat,
            lng:this.state.lng,
            distance:this.state.distance
        };
        tools.Post(API.search,param,this.success.bind(this));
        //console.warn(tools.Post);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
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
                            <TouchableOpacity 
                                activeOpacity = {1}
                                style={styles.map}
                                //onPress = {() => this.props.navigation.navigate('Search')}
                            >
                                <MapView navigation = {this.props.navigation}/>
                            </TouchableOpacity>
                            <WhiteSpace size='sm'/>
                        </View>
                    }
                    data={this.state.dataSource}
                    renderItem={
                        ({item}) => <ListItem 
                            key={item.key} 
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
        alignItems: 'center',
        backgroundColor:'white',
        height:280
    }
});
