import React, { Component } from 'react';
import { createBottomTabNavigator } from "react-navigation";
import PopularPage from "../page/PopularPage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TrendingPage from "../page/TrendingPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import FavoritePage from "../page/FavoritePage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyPage from "../page/MyPage";
import NavigationUtil from "./NavigationUtil";
import { BottomTabBar } from 'react-navigation-tabs'
const TABS = { // 在这里配置页面的路由
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor,focused}) => {
                return <FontAwesome5
                    name={'hotjar'}
                    size={26}
                    style={{color: tintColor}}
                />
            }
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor,focused}) => {
                return <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            }
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor,focused}) => {
                return <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            }
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor,focused}) => {
                return <MaterialIcons
                    name={'person'}
                    size={26}
                    style={{color: tintColor}}
                />
            }
        }
    }
}
export default class DynamicNavigator extends Component<Props>{
    constructor(props){
        super(props)
        console.disableYellowBox = true
    }
    tabNavigator() {
        const { PopularPage,TrendingPage,FavoritePage,MyPage } = TABS
        const tabs = { PopularPage,TrendingPage,FavoritePage,MyPage } //根据需要定制所需的tabs
        /**
         * 可以动态修改，比如文案是由后台返回，这里拿到后即可做更改
         */
        // PopularPage.navigationOptions.tabBarLabel = '最新'
        return createBottomTabNavigator(tabs,{
            tabBarComponent: TabBarComponent
        })
    }

    render() {
        const Tab = this.tabNavigator()
        return <Tab/>
    }
}
class TabBarComponent extends Component{
    constructor(props){
        super(props)
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }
    render() {
        const {routes,index} = this.props.navigation.state
        if(routes[index].params) {
            const { theme } = routes[index].params
            // 以最新的更新时间为主，防止被其他tab覆盖掉
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor = {this.theme.tintColor || this.props.activeTintColor}
        />
    }
}
