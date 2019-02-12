import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux'
import actions from "../action";
import NavigationUtil from "../navigator/NavigationUtil";

class TrendingPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Trending Page!</Text>
                <Button
                    title={'改变主题颜色'}
                    onPress={() => this.props.onThemeChange('red')}
                />
                <Button
                    title={'fetch Demo'}
                    onPress={() => NavigationUtil.goPage('FetchDemo',{})}
                />
                <Button
                    title={'async storage Demo'}
                    onPress={() => NavigationUtil.goPage('AsyncStorageDemo',{})}
                />
                <Button
                    title={'data storage Demo'}
                    onPress={() => NavigationUtil.goPage('DataStoreDemo',{})}
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

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps,mapDispatchToProps)(TrendingPage)
