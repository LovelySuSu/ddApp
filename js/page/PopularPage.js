import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from 'react-navigation'
import actions from "../action";

const THEME_COLOR = 'red'
export default class PopularPage extends Component<Props> {
    constructor(props){
        super(props)
        this.tabNames = ['JS','React','IOS','React Native','Vue']
    }
    genTabs() {
        const tabs = {}
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
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
    constructor(props){
        super(props)
        const { tabLabel } = this.props
        this.storeName = tabLabel
    }
    componentDidMount() {
        this.onLoadData()
    }
    onLoadData() {
        const { onLoadPopularData } = this.props
        const url = this.genFetchUrl(this.storeName)
        onLoadPopularData(this.storeName,url)
    }
    genFetchUrl(key) {
        return `https://api.github.com/search/repositories?q=${key}`
    }
    renderItem(item) {
        return <View style={{marginTop: 10}}>
            <Text>{JSON.stringify(item)}</Text>
        </View>
    }
    render() {
        const { popular } = this.props
        let store = popular[this.storeName]
        if(!store) {
            store = {
                items: [],
                isLoading: false
            }
        }
        return (<View>
            <FlatList
                data={store.items}
                renderItem={item => this.renderItem(item)}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        title={'loading'}
                        titleColor={ THEME_COLOR }
                        colors={ [THEME_COLOR] }
                        tintColor={ THEME_COLOR }
                        refreshing={store.isLoading}
                        onRefresh={() => this.onLoadData()}
                    />
                }
            />
        </View>)
    }
}
const mapStateToProps = state => ({
    popular: state.popular
})
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName,url) => dispatch(actions.onLoadPopularData(storeName,url))
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
