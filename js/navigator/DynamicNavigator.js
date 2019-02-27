import React, { Component } from 'react';
import { createBottomTabNavigator } from "react-navigation";
import PopularPage from "../page/PopularPage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TrendingPage from "../page/TrendingPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import FavoritePage from "../page/FavoritePage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyPage from "../page/MyPage";
import { connect } from 'react-redux'
import { BottomTabBar } from 'react-navigation-tabs'
import EventBus from 'react-native-event-bus'
import { BOTTOM_TAB_SELECT } from "../emit";
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
class DynamicNavigator extends Component<Props>{
    constructor(props){
        super(props)
        console.disableYellowBox = true
    }
    tabNavigator() {
        // 防止重复创建底部导航栏
        if (this.Tabs) return this.Tabs
        const { PopularPage,TrendingPage,FavoritePage,MyPage } = TABS
        const tabs = { PopularPage,TrendingPage,FavoritePage,MyPage } //根据需要定制所需的tabs
        /**
         * 可以动态修改，比如文案是由后台返回，这里拿到后即可做更改
         */
        // PopularPage.navigationOptions.tabBarLabel = '最新'
        return this.Tabs = createBottomTabNavigator(tabs,{
            tabBarComponent: props => <TabBarComponent {...props} theme={this.props.theme}/>
        })
    }

    render() {
        const Tab = this.tabNavigator()
        return <Tab
            onNavigationStateChange={(preState,nextState,action) => {
                EventBus.getInstance().fireEvent(BOTTOM_TAB_SELECT,{
                    from: preState.index,
                    to: nextState.index
                })
            }}
        />
    }
}
class TabBarComponent extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor = {this.props.theme.themeColor}
        />
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme
})
export default connect(mapStateToProps)(DynamicNavigator)
