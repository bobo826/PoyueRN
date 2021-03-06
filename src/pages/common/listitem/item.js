import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    NativeModules,
    Alert
} from 'react-native';
import {ActionSheet, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile-rn'
// const deviceH = Dimensions.get('window').height
// const deviceW = Dimensions.get('window').width
import {BoxShadow} from 'react-native-shadow';
import Feather from 'react-native-vector-icons/Feather';//使用时需要配置或者react-native link


let lon = '121.2477511168';  // ---经度 121.248078
let lat = '31.0913734181';   // ---纬度 31.091769
let name = '上海松江王家厍路55弄';//
 
let UtilMapManager = NativeModules.UtilMap;

export default class ListItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            deviceW:Dimensions.get('window').width
        }
    }
  

    iosmap() {
        let array = [];
        
        UtilMapManager.findEvents(lon, lat, name, (events) => {
            events.map((index, item) => {
            array.push(index.title);
            })
            if (array.length > 2) {
            ActionSheet.showActionSheetWithOptions({
                options: array,
                cancelButtonIndex: array.length - 1,
                maskClosable: true,
            },
                (buttonIndex) => {
                //跳到原生方法对应的app地图导航内
                UtilMapManager.addEvent(events[buttonIndex].title, events[buttonIndex].url, lon, lat, name);//lon是经度，，，log是维度
                });
            } else if (array.length == 2) {
            if (events.length == 2 && events[0].url == 'ios') {
                //只针对ios平台
                UtilMapManager.addEvent(events[0].title, events[0].url, lon, lat, name);
            } else {
                ActionSheet.showActionSheetWithOptions({
                options: array,
                cancelButtonIndex: array.length - 1,
                maskClosable: true,
                },
                (buttonIndex) => {
                    //跳到原生方法对应的app地图导航内
                    UtilMapManager.addEvent(events[buttonIndex].title, events[buttonIndex].url, lon, lat, name);//lon是经度，log是维度
                });
            }
            } else {//只适用于android平台
                Alert.alert('没有可用的地图软件！');
            }
        })
    
    }
    
    paytype(){
        let pay_type ='';
        if (this.props.pay_type=='1') {
            pay_type = '现金支付';
        } else if(this.props.pay_type=='2'){
            pay_type = '自动支付';
        }else{
            pay_type = '现金支付,自动支付';
        }
        return pay_type;
    }

    render() {
        const shadowOpt = {
            width:this.state.deviceW,
            height:160,
            color:"#eee",
            borderB:15,
            radius:8,
            opacity:0.1,
            x:0,
            y:0
        }
        return (
            <BoxShadow setting={shadowOpt}>
                <View style={styles.list_cell}>
                    <Text style={styles.list_cell_title}>
                        {this.props.goods_name}
                    </Text>
                    <View style={styles.list_cell_adress}>
                        <Feather name='map-pin' size={14} color='grey' style={{paddingTop:3}}/>
                        <Text style={{paddingLeft:5,color:'grey'}}>{this.props.dz}</Text>
                    </View>
                    <View style={styles.list_cell_time}>
                        <Text>{this.paytype()}</Text>
                        <Text style={{paddingRight:10,paddingLeft:10}}>|</Text>
                        <Text>{this.props.park_label}</Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={{paddingRight:10,color:'#598eff'}} >{this.props.distance}m</Text>
                        <Text style={{paddingRight:10,color:'green'}} >空车位:113</Text>
                        <Text style={{color:global.theme.color_orange}} >￥6.00/2h</Text>
                        <View style={styles.btn}>
                            <TouchableOpacity
                                style={[styles.child_btn,{backgroundColor:global.theme.color}]}
                            >
                                <Text style={{color:'white'}}>预约</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.child_btn,{backgroundColor:global.theme.color_orange}]}
                                onPress={this.iosmap.bind(this)}
                            >
                                <Text style={{color:'white'}}>导航</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    {
                        this.props.istj === 1 ?
                        <View style={styles.badge}>
                            <Text style={{color:'white'}}>推荐</Text>
                        </View>
                        :
                        null
                    }
                    
                </View>
            </BoxShadow>
            
        )
    }
}

const styles = StyleSheet.create({
    list_cell:{
        paddingLeft:10,
        paddingTop:20,
        paddingBottom:10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:'white',
        
    },
    list_cell_title:{
        fontSize:18,
        color:'black'
    },
    list_cell_adress:{
        paddingTop:10,
        flexDirection:'row'
    },
    list_cell_time:{
        paddingTop:10,
        flexDirection:'row'
    },
    price:{
        
        paddingTop:10,
        flexDirection:'row'
    },
    badge:{
        width: 100,
        padding: 8,
        position: 'absolute',
        right: -32,
        top: 0,
        backgroundColor: global.theme.color_orange,
        alignItems: 'center',
        transform: [{rotate:'45deg'}]
    },
    btn:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    child_btn:{
        paddingLeft:15,
        paddingRight:15,
        marginRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:5
    }
});
