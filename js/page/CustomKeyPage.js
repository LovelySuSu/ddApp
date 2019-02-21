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
import {FLAG_LANGUAGE, THEME_COLOR} from "../constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalStyles from "../res/GlobalStyles";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressHandler from "../common/BackPressHandler";
import LanguageDao from "../expand/dao/LanguageDao";
import CheckBox from 'react-native-check-box'


class CustomKeyPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.backPress = new BackPressHandler({ backPress:() => this.goBack })
        this.changeValues = []
        this.isRemoveKey = this.params.isRemoveKey
        this.languageDao = new LanguageDao(this.params.flag)
        this.state = {
            keys: []
        }
    }
    goBack() {
        NavigationUtil.goBack(this.props.navigation)
    }
    componentDidMount() {
        this.backPress.componentDidMount()
        //如果props中标签为空则从本地存储中获取标签
        if (CustomKeyPage._keys(this.props).length === 0) {
            let { loadLanguage } = this.props
            loadLanguage(this.params.flag)
        }
        this.setState({
            keys: CustomKeyPage._keys(this.props),
        })
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.keys !== CustomKeyPage._keys(nextProps, null, prevState)) {
            return {
                keys: CustomKeyPage._keys(nextProps, null, prevState)
            }
        }
        return null
    }
    /**
     * 获取标签
     * @param props
     * @param original 移除标签时使用，是否从props获取原始对的标签
     * @param state 移除标签时使用
     * @returns {*}
     * @private
     */
    static _keys(props, original, state) {
        const {flag, isRemoveKey} = props.navigation.state.params
        let key = flag === FLAG_LANGUAGE.flag_key ? "keys" : "languages"
        if (isRemoveKey && !original) {

        } else {
            return props.language[key]
        }
    }
    onSave() {

    }
    onClick(data, index) {
        data.checked = !data.checked
        let i = this.changeValues.indexOf(data)
        if(i !== -1) {
            this.changeValues.splice(i,1)
        } else {
            this.changeValues.push(data)
        }
        let keys = this.state.keys.slice()
        keys[index] = data
        this.state.keys[index] = data
        this.setState({
            keys
        })
    }
    renderView() {
        let dataArray = this.state.keys
        if(!dataArray || dataArray.length === 0) return
        let len = dataArray.length
        let views = []
        for(let i = 0;i<len;i+=2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i], i)}
                        {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views

    }
    checkImage(checked){
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: THEME_COLOR,
            }}/>
    }
    renderCheckBox(data,index){
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(data, index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this.checkImage(true)}
            unCheckedImage={this.checkImage(false)}
        />
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        let title = this.isRemoveKey ? '移除标签': this.flag === FLAG_LANGUAGE.flag_key ? '自定义标签' : '自定义语言'
        let rightButtonTitle = this.isRemoveKey ? '移除': '保存'
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    title={title}
                    statusBar={statusBar}
                    style={{ backgroundColor: THEME_COLOR }}
                    rightButton={ViewUtil.getRightButton(rightButtonTitle,()=>{
                        this.onSave()
                    })}
                    leftButton={ViewUtil.getLeftBackButton(()=>{
                        this.goBack()
                    })}
                />
                <ScrollView>
                    {
                        this.renderView()
                    }
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    language: state.language
})
const mapDispatchToProps = dispatch => ({
    loadLanguage: (flagKey) => dispatch(actions.loadLanguage(flagKey)),
})
export default connect(mapStateToProps,mapDispatchToProps)(CustomKeyPage)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    }
})
