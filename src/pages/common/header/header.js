import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';//使用时需要配置或者react-native link
import {SearchBar} from 'antd-mobile-rn';
export default class Header extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            search_value:''
        }
    }
    render() {
        return (
            <View>
                <View style={[styles.header,{backgroundColor:this.props.bgcolor}]}>
                    <TouchableOpacity style={styles.left}>
                        {this.props.left ? null : this.props.left_content}
                    </TouchableOpacity>
                    <View style={styles.center}>
                        {
                        this.props.center ? 
                        <SearchBar
                            value={this.state.search_value}
                            placeholder=""
                            cancelText = ' '
                            //showCancelButton = {true}
                            onSubmit={this.props.onSubmit}
                            onChange={(value) => this.setState({ search_value:value })}
                        />
                        : 
                        this.props.center_content
                        }
                    </View>
                    
                    <TouchableOpacity style={styles.right}>
                        {this.props.right ? <EvilIcons name='comment' size={25} color='white' /> : this.props.right_content}
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    header: {
        height:44,
        flexDirection: 'row'
    },
    center: {
        flex:10,
        alignItems: 'center',
        justifyContent:'center'
    },

    left:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
       
    },
    right:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    }
});
