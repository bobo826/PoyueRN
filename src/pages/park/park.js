import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import Search from '../search/search';


export default class Park extends Component {
    // static navigationOptions = {
    //     tabBarLabel:'找车位'
    // };

    render() {
        return (
            <Search 
                is_show_goback={false}
            />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
