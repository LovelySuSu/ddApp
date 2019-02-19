import React, {Component} from 'react'
import {
    View
} from 'react-native'
import ViewUtil from "../../util/ViewUtil"
import NavigationUtil from "../../navigator/NavigationUtil"
import AboutCommon from "./AboutCommon"
import {FLAG_ABOUT, THEME_COLOR} from "../../constant"
import GlobalStyles from "../../res/GlobalStyles"
import config from '../../res/data/config'
import {MORE_MENU} from "../../common/MoreMenu"


export default class AboutPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.aboutCommon = new AboutCommon({
            ...this.params,
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
        }
        if(RouteName){
            NavigationUtil.goPage(RouteName,params)
        }
    }
    getItem(menu) {
        return ViewUtil.getMenuItem(() => {
            this.onClick(menu)
        },menu,THEME_COLOR)
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
