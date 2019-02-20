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
import {PAGE_SIZE, THEME_COLOR, POPULAR_URL, FLAG_STORAGE, FLAG_LANGUAGE} from '../constant'
import NavigationBar from "../common/NavigationBar";
import NavigationUtil from "../navigator/NavigationUtil";
import FavoriteDao from "../expand/dao/FavoriteDao";
import Utils from "../util/Utils";
import EventBus from "react-native-event-bus";
import { BOTTOM_TAB_SELECT, FAVORITE_CHANGED_POPULAR } from "../emit";
import ArrayUtil from "../util/ArrayUtil";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)
class PopularPage extends Component<Props> {
    constructor(props){
        super(props)
        const { loadLanguage } = this.props
        loadLanguage(FLAG_LANGUAGE.flag_key)
        this.preKeys = []
    }
    genTabs() {
        const tabs = {}
        const { keys } = this.props
        this.preKeys = keys
        keys.filter(item => item.checked).forEach((item,index)=>{
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item.name}/>,
                navigationOptions:{
                    title: item.name
                }
            }
        })
        return tabs
    }
    navBar() {
        const { keys } = this.props
        if(!this.tabBar && !ArrayUtil.isEqual(this.preKeys,keys)) {
            this.tabBar = keys.length ? createMaterialTopTabNavigator(this.genTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false, // 是否使用标签大写，默认为true
                    scrollEnabled: true, // 是否支持选项卡滚动，默认为false
                    style: {
                        backgroundColor: THEME_COLOR, // tabBar 背景颜色
                        height: 30 //设置高度，修复Android上显示问题
                    },
                    indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
                    labelStyle: styles.labelStyle
                }
            }) : null
        }
        return this.tabBar
    }
    render() {
        const TabTopNavigator = this.navBar()
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    title={'最热'}
                    statusBar={statusBar}
                    style={{ backgroundColor: THEME_COLOR }}
                />
                { TabTopNavigator && <TabTopNavigator/> }
            </View>

        );
    }
}
const mapPopularStateToProps = state => ({
    keys: state.language.keys
})
const mapPopularDispatchToProps = dispatch => ({
    loadLanguage: (flagKey) => dispatch(actions.loadLanguage(flagKey)),
})
export default connect(mapPopularStateToProps,mapPopularDispatchToProps)(PopularPage)

class PopularTab extends Component<Props> {
    constructor(props){
        super(props)
        const { tabLabel } = this.props
        this.storeName = tabLabel
        this.isFavoriteChanged = false
    }
    componentDidMount() {
        this.onLoadData(false)
        EventBus.getInstance().addListener(FAVORITE_CHANGED_POPULAR, this.favoriteChangeListener = () => {
            this.isFavoriteChanged = true
        });
        EventBus.getInstance().addListener(BOTTOM_TAB_SELECT, this.bottomTabSelectListener = (data) => {
            if (data.to === 0 && this.isFavoriteChanged) {
                this.onLoadData(false, true)
            }
        })
    }
    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.favoriteChangeListener)
        EventBus.getInstance().removeListener(this.bottomTabSelectListener)
    }
    onLoadData(isLoadMore,isFlushRefresh = false) {
        const { onLoadPopularData,onLoadMorePopular,onFlushRefreshPopular } = this.props
        const url = this.genFetchUrl(this.storeName)
        let store = this.getStore()
        if(isLoadMore) {
            onLoadMorePopular(this.storeName,++store.pageIndex,PAGE_SIZE,store.items,favoriteDao,callBack => {
                this.refs.toast.show('已无更多数据')
            })
        } else if(isFlushRefresh) {
            onFlushRefreshPopular(this.storeName,++store.pageIndex,PAGE_SIZE,store.items,favoriteDao)
        } else {
            onLoadPopularData(this.storeName,url,PAGE_SIZE,favoriteDao)
        }
    }
    genFetchUrl(key) {
        return `${POPULAR_URL}${key}`
    }
    renderItem(item) {
        return <PopularItem
                item={item}
                onSelect={(callback) => NavigationUtil.goPage('DetailPage',{
                    navigation: this.props.navigation,
                    projectMode: item,
                    flag: FLAG_STORAGE.flag_popular,
                    callback: callback
                })}
                onFavorite={(item,isFavorite)=> Utils.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)}
            />
    }
    getStore() {
        const { popular } = this.props
        let store = popular[this.storeName]
        if(!store) {
            store = {
                items: [],
                projectModes: [],
                pageIndex: 1,
                isLoading: false,
                hideLoadingMore: true
            }
        }
        return store
    }
    genIndicator() {
        return this.getStore().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }
    render() {
        let store = this.getStore()
        return (<View>
            <FlatList
                data={store.projectModes}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={item => item.id.toString()}
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
                onEndReached={() => {
                    setTimeout(()=>{
                        if(this.canLoadMore){
                            this.onLoadData(true)
                            this.canLoadMore = false
                        }
                    })
                }}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => {
                    this.canLoadMore = true
                }}
                ListFooterComponent={() => this.genIndicator()}
            />
            <Toast
                ref={'toast'}
                position={'center'}
            />
        </View>)
    }
}
const mapStateToProps = state => ({
    popular: state.popular
})
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName,url,pageSize,favoriteDao) => dispatch(actions.onLoadPopularData(storeName,url,pageSize,favoriteDao)),
    onLoadMorePopular: (storeName,pageIndex,pageSize,dataArray,favoriteDao,callBack) => dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,dataArray,favoriteDao,callBack)),
    onFlushRefreshPopular: (storeName,pageIndex,pageSize,dataArray,favoriteDao) => dispatch(actions.onFlushRefreshPopular(storeName,pageIndex,pageSize,dataArray,favoriteDao))
})
const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        // minWidth: 50, 修复android上tabBar首次渲染闪烁问题
        padding: 0
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
