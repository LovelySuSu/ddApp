import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation'
import NavigationUtil from "../navigator/NavigationUtil";
export default class PopularPage extends Component<Props> {
    constructor(props){
        super(props)
        this.tabNames = ['JS','React','IOS','React Native','Vue']
    }
    genTabs() {
        const tabs = {}
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={item}/>,
                navigationOptions:{
                    title: item
                }
            }
        })
        return tabs
    }
    render() {
        const TabTopNavigator = createMaterialTopTabNavigator(this.genTabs(),{
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false, // 是否使用标签大写，默认为true
                scrollEnabled: true, // 是否支持选项卡滚动，默认为false
                style: {
                    backgroundColor: '#678' // tabBar 背景颜色
                },
                indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
                labelStyle: styles.labelStyle
            }
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
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor:'#fff'
    },
    labelStyle: {
        fontSize: 13,
        marginVertical: 6,
        textAlign: 'center',
    }
});