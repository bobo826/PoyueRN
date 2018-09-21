import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button
} from 'react-native';
class login extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            phone:'',
            password:''
        }
    }
    render() {
        return (
            <View style={styles.login}>
                <Text>login</Text>
                <Button
                    title="Index"
                    onPress={() => this.props.navigation.navigate('Index')}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    login: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default login;