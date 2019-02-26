import React, {Component} from 'react';
import { BackHandler,View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import DynamicNavigator from "../navigator/DynamicNavigator"
import { connect } from "react-redux"
import BackPressHandler from "../common/BackPressHandler";
import ViewUtil from "../util/ViewUtil";
import CustomTheme from "./CustomTheme";
import actions from "../action";
// react-native-vector-icons安装后要 react-native link react-native-vector-icons
class HomePage extends Component<Props> {
    constructor(props){
        super(props)
        this.backPress = new BackPressHandler({backPress:this.onBackPress})
    }
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    /**
     * 处理Android的物理返回键
     * */
    onBackPress = () => {
        const { nav,dispatch } = this.props
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false // 不处理物理返回键，原生会直接关闭App
        }
        dispatch(NavigationActions.back())
        return true // 返回true表示RN把物理返回键响应消费掉了，原生不会再做处理
    }
    renderCustomThemeView() {
        const { customThemeViewVisible, onShowCustomThemeView } = this.props
        return (<CustomTheme
            visible={customThemeViewVisible}
            {...this.props}
            onClose={() => onShowCustomThemeView(false)}
        />)
    }
    render() {
        NavigationUtil.navigation = this.props.navigation
        return <View style={{flex: 1}}>
            <DynamicNavigator/>
            {this.renderCustomThemeView()}
        </View>
    }
}
const mapStateToProps = state => ({
    nav: state.nav,
    customThemeViewVisible: state.theme.customThemeViewVisible,
})

const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
})

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)
