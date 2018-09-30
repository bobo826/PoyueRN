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
    Button,
    SectionList
} from 'react-native';
import {SearchBar } from 'antd-mobile-rn'
import ParkHeader from '../common/header/header';
import ListItem from '../common/listitem/item';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
import MapView from './components/map/map';
import Tools from '../../tools/tools';
import API  from '../../api/api.json';
const tools = new Tools();//实例化工具;
//const geolocation = new Geolocation();
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
    
            //post提交参数
            page_index:1,//页面索引
            page_size:3,//页面显示数据条数
            lat:0,//经度
            lng:0,//纬度
            distance:1000,//搜索半径
            sort:1,//筛选标志

            //post请求到的参数
            dataSource:[],//放置post请求到的参数
            isloading:false,//数据是否已经加载完毕标志默认为未加载完毕

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
            center:null,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            point:[]
        };



        
    }

    static defaultProps = {
        is_show_goback: true,
    }
    
    //上拉刷新事件
    onEndReached  (event) {
       
        if (!this.state.isloading) {
            //console.warn("onEndReached")
            const param = {
                page_index:this.state.page_index,
                page_size:this.state.page_size,
                lat:this.state.lat,
                lng:this.state.lng,
                distance:this.state.distance
            };
            tools.Post(API.search,param,this.success.bind(this));
        } else {
            console.warn("数据已加载所有");
        }
        
    }


    success(json) {
        if (json.code===0) {
            this.setState({dataSource:[...this.state.dataSource,...json.data.list]});
            //console.warn(this.state.dataSource);
            
            let pointarr = [];
            json.data.list.map((item)=>{
                pointarr.push(
                    {
                        latitude: parseFloat(item.lat),
                        longitude: parseFloat(item.lng),
                        title:item.goods_name
                    }
                )
                return pointarr;
            })
            //console.warn(...pointarr);
            this.setState({
                point:pointarr
            });
            //console.warn(...this.state.point);
           
            if (json.data.hasNextPage) {
                this.setState({page_index:this.state.page_index+1})
                //console.warn(this.state.page_index);
            } else {
                //this.setState({page_index:this.state.page_index})
                this.setState({isloading:true})
                
            }
        } else {

        }
    }

    

    componentWillMount(){
        //console.warn('search')
        //获取当前定位
        this.getPosition();
        // 第一次页面加载时发送post请求
        const param = {
            page_index:this.state.page_index,
            page_size:this.state.page_size,
            lat:this.state.lat,
            lng:this.state.lng,
            distance:this.state.distance
        };
        tools.Post(API.search,param,this.success.bind(this));

        // 通过addListener开启监听，可以使用上面的四个属性

        //console.warn(this.props.navigation.addListener)
        this.willFocusSubscription = tools.ListenRouteLife(
            this.props.navigation.addListener,
            "willFocus",
            ()=>console.warn("willFocusSubscription")
        );

    }

    componentWillUnmount(){
        // 在页面消失的时候，取消监听
        this.willFocusSubscription && this.willFocusSubscription.remove();
    }
    
     




    getPosition () {
        Geolocation.getCurrentPosition().then(
            (data) => {
            
            this.setState({
            zoom:14,
            markers: [
                ...this.state.point,
                {
                    latitude: parseFloat(data.latitude),
                    longitude: parseFloat(data.longitude),
                    title: data.address
                }
                
            ],
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
                   
                        <MapView
                            mayType ={this.state.mayType}
                            zoom = {this.state.zoom}
                            center = {this.state.center}
                            trafficEnabled = {this.state.trafficEnabled}
                            baiduHeatMapEnabled = {this.state.baiduHeatMapEnabled}
                           
                            markers = {this.state.markers}//自定义添加markers
                            width = {Dimensions.get('window').width}
                            height = {Dimensions.get('window').height-250}
                            
                            navigation = {this.props.navigation}//导航属性传递
                            
                        />
                    
                        
                    }
                    //style = {{marginTop:400}}
                    onScroll = {(e)=>{
                        //console.warn(e.nativeEvent);
                        if(e.nativeEvent.contentOffset.y > 250){
                            this.setState({
                                bgcolor:'white',
                                selectshow:false,
                                left_content:this.props.is_show_goback ? <EvilIcons name='chevron-left' size={30} color='grey' onPress = {()=>this.props.navigation.goBack()}/> : null,
                                centershow:false,
                                center_content:<Text style={styles.center_title}>停车场列表</Text>,
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
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold = {0.2}
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
        height: '100%'//父元素的样式设成{height: '100%'}，这样就可以正确的触发onEndReached监听次数。
    },
    header:{
        position:'absolute',
        top:0,
        height:44,
        width:'100%',
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