import React, {Component} from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';

export default class TrendingPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Trending Page!</Text>
                <Button
                    title={'改变主题颜色'}
                    onPress={() => this.props.navigation.setParams({
                        theme: {
                            tintColor: 'red',
                            updateTime: new Date().getTime()
                        }
                    })}
                />
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
