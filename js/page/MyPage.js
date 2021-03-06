import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import actions from "../action";
import { connect } from "react-redux";
import NavigationBar from "../common/NavigationBar";
import { FLAG_LANGUAGE } from "../constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MORE_MENU } from "../common/MoreMenu";
import GlobalStyles from "../res/style/GlobalStyles";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";


class MyPage extends Component<Props> {
    onClick(menu) {
        let RouteName, params = {}
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage'
                params.title = '教程'
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89'
                break
            case MORE_MENU.About:
                RouteName = 'AboutPage'
                break
            case MORE_MENU.About_Author:
                RouteName = 'AboutMePage'
                break
            case MORE_MENU.Custom_Key:
            case MORE_MENU.Custom_Language:
            case MORE_MENU.Remove_Key:
            case MORE_MENU.Remove_Language:
                RouteName = 'CustomKeyPage'
                params.isRemoveKey = (menu === MORE_MENU.Remove_Key || menu === MORE_MENU.Remove_Language)
                params.flag = (menu === MORE_MENU.Custom_Key || menu === MORE_MENU.Remove_Key) ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language
                break
            case MORE_MENU.Sort_Key:
            case MORE_MENU.Sort_Language:
                RouteName = 'SortKeyPage'
                params.flag = menu === MORE_MENU.Sort_Key ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language
                break
            case MORE_MENU.Custom_Theme:
                const { onShowCustomThemeView } = this.props
                onShowCustomThemeView(true)
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
        let statusBar = {
            backgroundColor: this.props.theme.themeColor,
            barStyle: 'light-content'
        }
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    title={'我的'}
                    statusBar={statusBar}
                    style={{ backgroundColor: this.props.theme.themeColor }}
                />
                <ScrollView>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.onClick(MORE_MENU.About)}
                    >
                        <View style={styles.about_left}>
                            <Ionicons
                                name={MORE_MENU.About.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: this.props.theme.themeColor,
                                }}
                            />
                            <Text>丁酥酥的小应用</Text>
                        </View>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={16}
                            style={{
                                marginRight: 10,
                                alignSelf: 'center',
                                color: this.props.theme.themeColor,
                            }}/>
                    </TouchableOpacity>
                    <View style={GlobalStyles.line}/>
                    {
                        this.getItem(MORE_MENU.Tutorial)
                    }
                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this.getItem(MORE_MENU.Custom_Language)}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Language)}
                    {/*语言移除*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Remove_Language)}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    {this.getItem(MORE_MENU.Custom_Key)}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Key)}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Remove_Key)}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MORE_MENU.Custom_Theme)}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.About_Author)}
                    <View style={GlobalStyles.line}/>
                    {/*反馈*/}
                    {this.getItem(MORE_MENU.Feedback)}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.CodePush)}

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    about_left: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
});
const mapStateToProps = state => ({
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch =>({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
})

export default connect(mapStateToProps,mapDispatchToProps)(MyPage)
