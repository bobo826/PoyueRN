import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
export default class Mine extends Component {
    //这是对象方式配置tab
    // static navigationOptions = {
    //     tabBarLabel:'我的'
    // };
    render() {
        return (
            <View style={styles.container}>
                <Text>mine</Text>
            </View>
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
