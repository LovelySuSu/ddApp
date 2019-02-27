import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import actions from "../action";
import { connect } from "react-redux"

class WelcomePage extends Component<Props> {
    componentDidMount() {
        this.props.onThemeInit()
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        },2000)
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer) // 在timeout内如果杀进程可能会造成页面泄露，因此要在componentWillUnmount周期clearTimeout

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome Page!</Text>
            </View>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    onThemeInit: () => dispatch(actions.onThemeInit()),
})
export default connect(null,mapDispatchToProps)(WelcomePage)
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
