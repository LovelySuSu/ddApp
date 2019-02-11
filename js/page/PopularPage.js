import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation'
import NavigationUtil from "../navigator/NavigationUtil";
export default class PopularPage extends Component<Props> {
    render() {
        const TabTopNavigator = createMaterialTopTabNavigator({
            PopularTab1: {
                screen: PopularTab,
                navigationOptions:{
                    title: 'tab1'
                }
            },
            PopularTab2: {
                screen: PopularTab,
                navigationOptions:{
                    title: 'tab2'
                }
            },
        })
        return (
            <View style={{ flex: 1,marginTop: 30 }}>
                <TabTopNavigator/>
            </View>

        );
    }
}

class PopularTab extends Component<Props> {
    render() {
        const { tabLabel } = this.props
        return (<View>
            <Text>{tabLabel}</Text>
            <Text onPress={() => NavigationUtil.goPage('DetailPage',{})}>跳转到详情页</Text>
        </View>)
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
