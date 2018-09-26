import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';//使用时需要配置或者react-native link
import Feather from 'react-native-vector-icons/Feather';//使用时需要配置或者react-native link
import {BoxShadow} from 'react-native-shadow';
import {Grid,WhiteSpace} from 'antd-mobile-rn';

class ListCell extends Component {
    constructor(props, context) {
        super(props, context)
        this.state={
            deviceW:Dimensions.get('window').width,
      
            
        }
    }
    render() {
        
        return (
            <BoxShadow 
                setting={{
                    width:this.state.deviceW-10,
                    height:this.props.height,
                    color:"#bbb",
                    borderB:15,
                    radius:15,
                    opacity:0.1,
                    x:7,
                    y:-5
                }}
            >
                <View style={styles.listcell}>
                    <Text style={{paddingTop:10,paddingBottom:15,fontSize:18}}>{this.props.title}</Text>
                    <View style={{borderTopColor:'#eee',borderTopWidth:.5,paddingBottom:10}}>
                    <Grid data={this.props.data}
                        itemStyle={styles.grid}
                        hasLine={false}
                        columnNum  = {4}
                        renderItem={dataItem => (
                            <TouchableOpacity style={styles.item}>
                                <Feather name={dataItem.icon} size={25} color='grey' />
                                <View>
                                    <Text>{dataItem.text}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    </View>
                </View>
            </BoxShadow>
        )
    }
}


export default class Mine extends Component {
    //这是对象方式配置tab
    // static navigationOptions = {
    //     tabBarLabel:'我的'
    // };

    constructor(props, context) {
        super(props, context)
        this.state = {
            mine_recode:[
                {icon: 'compass',text: '我的预约',nav_route:'clfd'},
                {icon: 'instagram',text: '停车记录',nav_route:'pycc'},
                {icon: 'filter',text: '我的发布',nav_route:'yzxf'},
                {icon: 'grid',text: '共享记录',nav_route:'cwzp'}
            ],
            mine_wallet:[
                {icon: 'compass',text: '钱包',nav_route:'clfd'},
                {icon: 'instagram',text: '停车券',nav_route:'pycc'},
                {icon: 'filter',text: '银行卡',nav_route:'yzxf'},
                {icon: 'grid',text: '扫一扫',nav_route:'cwzp'}
            ],
            mine_service:[
                {icon: 'compass',text: '车辆管理',nav_route:'clfd'},
                {icon: 'instagram',text: '我要出租',nav_route:'pycc'},
                {icon: 'filter',text: '我要合作',nav_route:'yzxf'},
                {icon: 'grid',text: '关于泊悦',nav_route:'cwzp'},
                {icon: 'grid',text: '意见反馈',nav_route:'cwzp'}
            ]
        }
    }
    
    
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}> 
                    <View style={styles.row}>
                        <View style={styles.row_center}>
                            <View style={styles.pic}></View>
                            <View>
                                <Text style={[styles.text,{fontSize:18}]}>个人中心</Text>
                                <Text style={styles.text}>181440264798</Text>
                            </View>
                        </View>

                        <View style={styles.right}>
                            <View style={styles.row}>
                                <EvilIcons name='comment' size={30} color='white' style={{paddingRight:5}} />
                                <EvilIcons name='gear' size={30} color='white' />
                            </View>
                            <View style={styles.bage}>
                                <Text style={styles.bage_text}>签到</Text>
                                <View style={styles.bage_before}></View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.row,{paddingTop:10}]}>
                        <View style={styles.row_cell}>
                            <Text style={styles.text}>10</Text>
                            <Text style={styles.text}>泊悦币</Text>
                        </View>
                        <View style={[styles.row_cell,{flex:1}]}>
                            <Text style={styles.line}>|</Text>
                        </View>
                        <View style={styles.row_cell}>
                            <Text style={styles.text}>10</Text>
                            <Text style={styles.text}>收藏夹</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:-40}}>
                    <ListCell 
                        height={180}
                        title='我的记录' 
                        data = {this.state.mine_recode}
                    />
                    <WhiteSpace size='lg'/>
                    <ListCell 
                        height={180}
                        title='泊悦服务'
                        data = {this.state.mine_wallet}
                    />
                    <WhiteSpace size='lg'/>
                    <ListCell 
                        height={300}
                        title='泊悦钱包' 
                        data = {this.state.mine_service}
                    />
                    <WhiteSpace size='lg'/>
                   
                </View>
             
               
              
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    header:{
        backgroundColor:global.theme.color,
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:60
    },
    row:{
        flexDirection:'row'
    },
    row_center:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    pic:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:'white',
        marginRight:10
    },
    right:{
        alignItems:'flex-end',
        flex:1
    },

    text:{
        color:'white'
    },
    bage:{
        position:'relative',
        right:-10,
        marginTop:20,
        backgroundColor:global.theme.color_orange
    },
    bage_text:{
        paddingLeft:20,
        paddingRight:10,
        paddingTop:3,
        paddingBottom:3,
        color:'white'
    },
    bage_before:{
        width: 18,
        height:18,
        position: 'absolute',
        left: -10,
        top: 4,
        backgroundColor: global.theme.color,
        alignItems: 'center',
        transform: [{rotate:'45deg'}]
    },
    row_cell:{
        flex:20,
        alignItems:'center',
        justifyContent:'center'
    },
    line:{
        color:'rgba(255,255,255,0.3)',
        fontSize:24
    },
    listcell:{
        backgroundColor:'white',
        borderRadius:12,
        width:Dimensions.get('window').width-20,
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
        marginLeft:10,
        paddingBottom:20,
    },
    grid:{
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'white',
        height:80
    },
    item:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'
    }
});
