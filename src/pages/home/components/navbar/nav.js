import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';//使用时需要配置或者react-native link
import {WhiteSpace,Grid} from 'antd-mobile-rn';
const data = [
    {icon: 'compass',text: '车位预约',nav_route:'clfd'},
    {icon: 'instagram',text: '车位出租',nav_route:'pycc'},
    {icon: 'filter',text: '我要合作',nav_route:'yzxf'},
    {icon: 'grid',text: '全部',nav_route:'cwzp'}
]
export default class Nav extends Component {
    render() {
        return (
            <Grid data={data}
                itemStyle={styles.grid}
                hasLine={false}
                columnNum  = {4}
                renderItem={dataItem => (
                    <TouchableOpacity style={styles.item}>
                        <Feather name={dataItem.icon} size={25} color='tomato' />
                        <View>
                            <Text>{dataItem.text}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
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
})
