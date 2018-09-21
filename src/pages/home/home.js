import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    WebView,
    Dimensions
} from 'react-native';
import { WhiteSpace , Card , WingBlank , List ,Badge  } from 'antd-mobile-rn'
import HomeHeader from '../common/header/header';
import Slider from './components/swiper/slider';
import NvaBar from './components/navbar/nav';
import MapView from './components/map/map';
import ListItem from "./components/listitem/item";

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            bgcolor:'rgba(0, 0, 0, 0)',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    onScroll = {(e)=>{
                        //console.warn(e.nativeEvent);
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
                >
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
                        onPress = {() => this.props.navigation.navigate('Search')}
                    >
                        <MapView navigation = {this.props.navigation}/>
                    </TouchableOpacity>
                    <WhiteSpace size='sm'/>
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    
                </ScrollView>

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
