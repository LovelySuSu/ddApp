import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    ViewPropTypes,
    View,
    StatusBar,
    StyleSheet,
    Platform,
    Text,
    DeviceInfo
} from "react-native"
import {NAV_BAR_HEIGHT_ANDROID, NAV_BAR_HEIGHT_IOS, STATUS_BAR_HEIGHT} from "../constant";
const StatusBarShape = { // 设置状态栏接受的属性
    barStyle: PropTypes.oneOf(['light-content','default']),
    hidden: PropTypes.boolean,
    backgroundColor: PropTypes.string
}
export default class NavigationBar extends Component {
    // 类型检查
    static PropTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
    }
    // 设置默认属性
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false
        }
    }
    getButtonElement(Button) {
        return <View style={S.navBarButton}>
            { Button ? Button : null }
        </View>
    }
    render() {
        let statusBar = !this.props.statusBar.hidden ? (
            <View style={S.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View>
        ) : null
        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode="head" numberOfLines={1} style={S.title}>{this.props.title}</Text>
        let content = this.props.hide ? null :
            (<View style={S.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[S.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>)
        return (
            <View style={[S.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
}

const S = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    container: {
        backgroundColor: '#2196f3',
        paddingTop: DeviceInfo.isIPhoneX_deprecated ? 10: 0
    },
    navBarButton: {
        alignItems: 'center'
    }
})
