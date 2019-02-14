import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from 'react-navigation'
import actions from "../action";
import TrendingItem from "../common/TrendingItem";
import Toast from 'react-native-easy-toast'
import {navBarMargin, PAGE_SIZE, THEME_COLOR, TRENDING_URL} from '../constant'
import NavigationBar from "../common/NavigationBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
export default class TrendingPage extends Component<Props> {
    constructor(props){
        super(props)
        this.tabNames = ['All','Java','Javascript','C#','PHP']
    }
    genTabs() {
        const tabs = {}
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} tabLabel={item}/>,
                navigationOptions:{
                    title: item
                }
            }
        })
        return tabs
    }
    renderTitleView() {
        return (
            <View>
                <TouchableOpacity
                    underlayColor='transparent'
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 18,
                            color: '#FFFFFF',
                            fontWeight: '400'
                        }}>趋势 {'今天'}</Text>
                        <MaterialIcons
                            name={'arrow-drop-down'}
                            size={22}
                            style={{color: 'white'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const TabTopNavigator = createMaterialTopTabNavigator(this.genTabs(),{
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
        })
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    titleView={this.renderTitleView()}
                    statusBar={statusBar}
                    style={{ backgroundColor: THEME_COLOR }}
                />
                <TabTopNavigator/>
            </View>

        );
    }
}

class TrendingTab extends Component<Props> {
    constructor(props){
        super(props)
        const { tabLabel } = this.props
        this.storeName = tabLabel
    }
    componentDidMount() {
        this.onLoadData(false)
    }
    onLoadData(isLoadMore) {
        const { onTrendingRefresh,onLoadMoreTrending } = this.props
        const url = this.genFetchUrl(this.storeName)
        let store = this.getStore()
        if(isLoadMore) {
            onLoadMoreTrending(this.storeName,++store.pageIndex,PAGE_SIZE,store.items,callBack => {
                this.refs.toast.show('已无更多数据')
            })
        } else {
            onTrendingRefresh(this.storeName,url,PAGE_SIZE)
        }
    }
    genFetchUrl(key) {
        if(key === 'All') key=''
        return `${TRENDING_URL}${key?'/'+key : ''}?since=daily`
    }
    renderItem(item) {
        return <TrendingItem
            item={item}
            onSelect={()=>console.log('123')}
        />
    }
    getStore() {
        const { trending } = this.props
        let store = trending[this.storeName]
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
                keyExtractor={item => item.full_name}
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
    trending: state.trending
})
const mapDispatchToProps = dispatch => ({
    onTrendingRefresh: (storeName,url,pageSize) => dispatch(actions.onTrendingRefresh(storeName,url,pageSize)),
    onLoadMoreTrending: (storeName,pageIndex,pageSize,dataArray,callBack) => dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray,callBack))
})
const TrendingTabPage = connect(mapStateToProps,mapDispatchToProps)(TrendingTab)
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
