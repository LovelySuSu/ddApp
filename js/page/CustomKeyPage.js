import React, {Component} from 'react';
import {
    StyleSheet,
    Alert,
    View,
    ScrollView
} from 'react-native';
import actions from "../action";
import { connect } from "react-redux";
import NavigationBar from "../common/NavigationBar";
import {FLAG_LANGUAGE, THEME_COLOR} from "../constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalStyles from "../res/style/GlobalStyles";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressHandler from "../common/BackPressHandler";
import LanguageDao from "../expand/dao/LanguageDao";
import CheckBox from 'react-native-check-box'
import ArrayUtil from "../util/ArrayUtil";


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
        if(this.changeValues.length > 0) {
            Alert.alert('提示', '要保存修改吗？',
                [
                    {
                        text: '否', onPress: () => {
                            NavigationUtil.goBack(this.props.navigation)
                        }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave()
                    }
                }
                ])
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }

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
        let key = flag === FLAG_LANGUAGE.flag_key ? 'keys' : 'languages'
        if (isRemoveKey && !original) {
            //如果state中的keys为空则从props中取
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(val => {
                return {//注意：不直接修改props，copy一份
                    ...val,
                    checked: false
                }
            })
        } else {
            return props.language[key]
        }
    }
    onSave() {
        let keys
        if (this.isRemoveKey) { // 移除标签的特殊处理
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtil.remove(keys = CustomKeyPage._keys(this.props, true), this.changeValues[i], 'name')
            }
        }
        // 更新本地数据
        this.languageDao.save(keys || this.state.keys)
        const { loadLanguage } = this.props
        // 更新store
        loadLanguage(this.params.flag)
        NavigationUtil.goBack(this.props.navigation)
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
