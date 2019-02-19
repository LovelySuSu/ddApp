import React, {Component} from 'react'
import {
    View,
    Linking
} from 'react-native'
import ViewUtil from "../../util/ViewUtil"
import NavigationUtil from "../../navigator/NavigationUtil"
import AboutCommon from "./AboutCommon"
import { FLAG_ABOUT, THEME_COLOR } from "../../constant"
import GlobalStyles from "../../res/GlobalStyles"
import config from '../../res/data/config'
import { MORE_MENU } from "../../common/MoreMenu"
import Ionicons from "react-native-vector-icons/Ionicons";


export default class AboutMePage extends Component<Props> {
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
            data: config,
            showTutorial: false,
            showBlog: false,
            showQQ: false,
            showContact: false
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
        }
        if(RouteName){
            NavigationUtil.goPage(RouteName,params)
        }
    }
    getItem(data, isShow, key) {
        return ViewUtil.getSettingItem(() => {
            this.setState({
                [key]: !this.state[key]
            });
        }, data.name, THEME_COLOR, Ionicons, data.icon, isShow ? 'ios-arrow-up' : 'ios-arrow-down')
    }
    /**
     * 显示列表数据
     * @param dic
     * @param isShowAccount
     */
    renderItems(dic, isShowAccount) {
        if (!dic) return null
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtil.getSettingItem(() => this.onClick(dic[i]), title, THEME_COLOR)}
                    <View style={GlobalStyles.line}/>
                </View>
            )
        }
        return views;
    }
    render() {
        const content = <View>
            {this.getItem(this.state.data.aboutMe.Tutorial, this.state.showTutorial, 'showTutorial')}
            <View style={GlobalStyles.line}/>
            {this.state.showTutorial ? this.renderItems(this.state.data.aboutMe.Tutorial.items) : null}

            {this.getItem(this.state.data.aboutMe.Blog, this.state.showBlog, 'showBlog')}
            <View style={GlobalStyles.line}/>
            {this.state.showBlog ? this.renderItems(this.state.data.aboutMe.Blog.items) : null}

            {this.getItem(this.state.data.aboutMe.QQ, this.state.showQQ, 'showQQ')}
            <View style={GlobalStyles.line}/>
            {this.state.showQQ ? this.renderItems(this.state.data.aboutMe.QQ.items, true) : null}

            {this.getItem(this.state.data.aboutMe.Contact, this.state.showContact, 'showContact')}
            <View style={GlobalStyles.line}/>
            {this.state.showContact ? this.renderItems(this.state.data.aboutMe.Contact.items, true) : null}
        </View>
        return (
            this.aboutCommon.render(content,this.state.data.author)
        )
    }
}
