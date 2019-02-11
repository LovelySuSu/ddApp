import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class WelcomePage extends Component<Props> {
    componentDidMount() {
        this.timer = setTimeout(() => {
            const { navigation } = this.props
            navigation.navigate('Main')
        },2000)
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome Page!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
