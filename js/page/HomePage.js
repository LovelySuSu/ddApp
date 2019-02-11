import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation'
import PopularPage from "./PopularPage";
import TrendingPage from "./TrendingPage";
import FavoritePage from "./FavoritePage";
import MyPage from "./MyPage";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// react-native-vector-icons安装后要 react-native link react-native-vector-icons
export default class HomePage extends Component<Props> {
    tabNavigator() {
        return createBottomTabNavigator({
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
        })
    }
    render() {
        const Tab = this.tabNavigator()
        return <Tab/>
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
