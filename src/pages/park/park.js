import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
export default class Park extends Component {
    // static navigationOptions = {
    //     tabBarLabel:'找车位'
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text>park</Text>
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
