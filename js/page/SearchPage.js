import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Platform,
    FlatList,
    RefreshControl,
    ActivityIndicator, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import NavigationBar from "../common/NavigationBar";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressHandler from "../common/BackPressHandler"
import actions from "../action";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ViewUtil from "../util/ViewUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";
class SearchPage extends Component<Props> {
    constructor(props){
        super(props)
        this.inputKey = ''
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
    renderTitleView() {
        return (
            <TextInput
                ref="input"
                placeholder={'C#'}
                onChangeText={text => this.inputKey = text}
                style={styles.textInput}
                placeholderTextColor={'rgba(255,255,255,0.6)'}
            />)
    }
    renderRightButton() {
        return (<TouchableOpacity
                onPress={() => {
                    this.refs.input.blur()//收起键盘
                }}
            >
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.title}>{'搜索'}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        let statusBar = {
            backgroundColor: this.props.theme.themeColor,
            barStyle: 'light-content',
        }
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    titleView={this.renderTitleView()}
                    leftButton={ViewUtil.getLeftBackButton(()=> this.goBack())}
                    rightButton={this.renderRightButton()}
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
    },
    textInput: {
        width: '100%',
        height: 26,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: "white",
        borderRadius: 6,
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        opacity: 0.7,
        color: 'white'
    },
    title: {
        fontSize: 14,
        color: "white",
        fontWeight: '500'
    }
});
