import React, {Component} from 'react'
import {
    View,
    Linking,
    Clipboard
} from 'react-native'
import ViewUtil from "../../util/ViewUtil"
import NavigationUtil from "../../navigator/NavigationUtil"
import AboutCommon from "./AboutCommon"
import { FLAG_ABOUT, THEME_COLOR } from "../../constant"
import GlobalStyles from "../../res/style/GlobalStyles"
import config from '../../res/data/config'
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-easy-toast";


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
    onClick(tab) {
        if(!tab) return
        if(tab.url) {
            NavigationUtil.goPage('WebViewPage',{
                title: tab.title,
                url: tab.url
            })
            return
        }
        if(tab.account && tab.account.includes('@')) {
            let url = tab.account
            Linking.canOpenURL(url)
                .then(support => {
                    if(!support) {
                        console.log('不支持发送邮件')
                    } else {
                        Linking.openURL(url)
                    }
                }).catch(error => console.log(error))
            return
        }
        if(tab.account) {
            Clipboard.setString(tab.account)
            this.refs.toast.show(tab.title + tab.account + '已复制到剪切板。')
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
        let views = []
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtil.getSettingItem(() => this.onClick(dic[i]), title, THEME_COLOR)}
                    <View style={GlobalStyles.line}/>
                </View>
            )
        }
        return views
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
            <View style={{flex: 1}}>
                {this.aboutCommon.render(content,this.state.data.author)}
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>

        )
    }
}
