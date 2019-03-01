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
import {FLAG_STORAGE} from '../constant'
import NavigationBar from "../common/NavigationBar";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressHandler from "../common/BackPressHandler"
import actions from "../action";
class SearchPage extends Component<Props> {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.backPress = new BackPressHandler({backPress:() => this.goBack})
    }
    goBack() {
        NavigationUtil.goBack(this.props.navigation)
    }
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    loadData() {

    }
    render() {
        let statusBar = {
            backgroundColor: this.props.theme.themeColor,
            barStyle: 'light-content'
        }
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    title={'搜索'}
                    statusBar={statusBar}
                    style={{ backgroundColor: this.props.theme.themeColor }}
                />
            </View>

        );
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme,
    search: state.search
})
const mapDispatchToProps = dispatch => ({
    onSearch: (inputKey, pageSize, token, favoriteDao, popularKeys, callBack) => dispatch(actions.onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callBack)),
    onLoadMoreSearch: (pageIndex,pageSize,dataArray,favoriteDao,callBack) => dispatch(actions.onLoadMoreSearch(pageIndex,pageSize,dataArray,favoriteDao,callBack))
})
export default connect(mapStateToProps,mapDispatchToProps)(SearchPage)

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
