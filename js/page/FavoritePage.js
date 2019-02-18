import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from 'react-navigation'
import actions from "../action";
import PopularItem from "../common/PopularItem";
import Toast from 'react-native-easy-toast'
import { THEME_COLOR, FLAG_STORAGE } from '../constant'
import NavigationBar from "../common/NavigationBar"
import NavigationUtil from "../navigator/NavigationUtil"
import Utils from "../util/Utils";
import TrendingItem from "../common/TrendingItem";
import FavoriteDao from "../expand/dao/FavoriteDao";

export default class FavoritePage extends Component<Props> {
    constructor(props){
        super(props)
        this.tabNames = ['最热','趋势']
    }
    genTabs() {
        const tabs = {}
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = {
                screen: props => <FavoriteTabPage {...props} tabLabel={index === 0 ? FLAG_STORAGE.flag_popular : FLAG_STORAGE.flag_trending}/>,
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
                style: {
                    backgroundColor: THEME_COLOR, // tabBar 背景颜色
                    height: 30 //设置高度，修复Android上显示问题
                },
                indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
                labelStyle: styles.labelStyle
            }
        })
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    title={'收藏'}
                    statusBar={statusBar}
                    style={{ backgroundColor: THEME_COLOR }}
                />
                <TabTopNavigator/>
            </View>

        );
    }
}

class FavoriteTab extends Component<Props> {
    constructor(props){
        super(props)
        const { tabLabel } = this.props
        this.storeName = tabLabel
        this.favoriteDao = new FavoriteDao(tabLabel)
    }
    componentDidMount() {
        this.onLoadData()
    }
    onLoadData() {
        const { onLoadFavoriteData } = this.props
        onLoadFavoriteData(this.storeName)
    }
    getStore() {
        const { favorite } = this.props
        let store = favorite[this.storeName]
        if(!store) {
            store = {
                projectModes: [],
                isLoading: false
            }
        }
        return store
    }
    renderItem(item) {
        let Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem
        return <Item
            item={item}
            onSelect={(callback) => NavigationUtil.goPage('DetailPage',{
                navigation: this.props.navigation,
                projectMode: item,
                flag: this.storeName,
                callback: callback
            })}
            onFavorite={(item,isFavorite)=> { Utils.onFavorite(this.favoriteDao,item,isFavorite,this.storeName)} }
        />
    }
    render() {
        let store = this.getStore()
        return (<View>
            <FlatList
                data={store.projectModes}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={item => item.id && item.id.toString() || item.fullName}
                refreshControl={
                    <RefreshControl
                        title={'loading'}
                        titleColor={ THEME_COLOR }
                        colors={ [THEME_COLOR] }
                        tintColor={ THEME_COLOR }
                        refreshing={store.isLoading}
                        onRefresh={() => this.onLoadData(false)}
                    />
                }
            />
            <Toast
                ref={'toast'}
                position={'center'}
            />
        </View>)
    }
}
const mapStateToProps = state => ({
    favorite: state.favorite
})
const mapDispatchToProps = dispatch => ({
    onLoadFavoriteData: (flag) => dispatch(actions.onLoadFavoriteData(flag)),
})
const FavoriteTabPage = connect(mapStateToProps,mapDispatchToProps)(FavoriteTab)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        // minWidth: 50, 修复android上tabBar首次渲染闪烁问题
        padding: 0,
        flex: 1
    },
    indicatorStyle: {
        height: 2,
        backgroundColor:'#fff'
    },
    labelStyle: {
        fontSize: 13,
        // marginVertical: 6,
        textAlign: 'center',
        margin: 0
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
