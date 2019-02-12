import React, {Component} from 'react';
import { BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import DynamicNavigator from "../navigator/DynamicNavigator"
import { connect } from "react-redux"
// react-native-vector-icons安装后要 react-native link react-native-vector-icons
class HomePage extends Component<Props> {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress',this.onBackPress)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',this.onBackPress)
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
    render() {
        NavigationUtil.navigation = this.props.navigation
        return <DynamicNavigator/>
    }
}
const mapStateToProps = state => ({
    nav: state.nav
})

export default connect(mapStateToProps)(HomePage)
