import React, {Component} from 'react'
import {
    View,
    Linking
} from 'react-native'
import ViewUtil from "../../util/ViewUtil"
import NavigationUtil from "../../navigator/NavigationUtil"
import AboutCommon from "./AboutCommon"
import { FLAG_ABOUT } from "../../constant"
import GlobalStyles from "../../res/style/GlobalStyles"
import config from '../../res/data/config'
import { MORE_MENU } from "../../common/MoreMenu"
import { connect } from "react-redux"


class AboutPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.aboutCommon = new AboutCommon({
            ...this.params,
            theme: this.props.theme,
            navigation: this.props.navigation,
            flagAbout: FLAG_ABOUT.flag_about
        },data => {
            this.setState({
                ...data
            })
        })
        this.state = {
            data: config
        }
    }
    onClick(menu) {
        let RouteName, params = {}
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage'
                params.title = '教程'
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89'
                break
            case MORE_MENU.Feedback:
                let url = '1060340716@qq.com'
                Linking.canOpenURL(url)
                    .then(support => {
                        if(!support) {
                            console.log('不支持发送邮件')
                        } else {
                            Linking.openURL(url)
                        }
                    }).catch(error => console.log(error))
                break
            case MORE_MENU.About_Author:
                RouteName = 'AboutMePage'
                break
        }
        if(RouteName){
            NavigationUtil.goPage(RouteName,params)
        }
    }
    getItem(menu) {
        return ViewUtil.getMenuItem(() => {
            this.onClick(menu)
        },menu,this.props.theme.themeColor)
    }
    render() {
        const content = <View>
            {this.getItem(MORE_MENU.Tutorial)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.About_Author)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Feedback)}
        </View>
        return (
            this.aboutCommon.render(content,this.state.data.app)
        )
    }
}
const mapStateToProp = state => ({
    theme: state.theme.theme
})
export default connect(mapStateToProp)(AboutPage)
