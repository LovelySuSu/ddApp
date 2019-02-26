import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableHighlight
} from 'react-native';
import actions from "../action";
import { connect } from "react-redux";
import NavigationBar from "../common/NavigationBar";
import {FLAG_LANGUAGE, THEME_COLOR} from "../constant";
import GlobalStyles from "../res/GlobalStyles";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressHandler from "../common/BackPressHandler";
import SortableListView from  'react-native-sortable-listview'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ArrayUtil from "../util/ArrayUtil";
import LanguageDao from "../expand/dao/LanguageDao";



class SortKeyPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.flag = this.params.flag
        this.backPress = new BackPressHandler({ backPress:() => this.goBack })
        this.languageDao = new LanguageDao(this.flag)
        this.state = {
            checkedArray: SortKeyPage._keys(this.props)
        }
    }
    goBack() {
        if (!ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
            Alert.alert('提示', '要保存修改吗？',
                [
                    {
                        text: '否', onPress: () => {
                            NavigationUtil.goBack(this.props.navigation)
                        }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave(true);
                    }
                }
                ])
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }
    componentDidMount() {
        this.backPress.componentDidMount()
        if (SortKeyPage._keys(this.props).length === 0) {
            let { loadLanguage } = this.props
            loadLanguage(this.flag)
        }
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // loadLanguage时更新checkedArray
        const checkedArray = SortKeyPage._keys(nextProps)
        if (prevState.checkedArray.length === 0) {
            return {
                checkedArray: checkedArray,
            }
        }
        return null;
    }
    /**
     * 获取标签
     * @param props
     * @returns {*}
     * @private
     */
    static _keys(props,state) {
        if(state && state.checkedArray && state.checkedArray.length > 0) return state.checkedArray
        const { flag } = props.navigation.state.params
        let key = flag === FLAG_LANGUAGE.flag_key ? 'keys' : 'languages'
        let dataArray = props.language[key] || []
        return dataArray.filter(val => val.checked)
    }
    onSave() {
        //保存排序后的数据
        //获取排序后的数据
        //更新本地数据
        this.languageDao.save(this.getSortResult())

        //重新加载排序后的标签，以便其他页面能够及时更新
        const {loadLanguage} = this.props
        //更新store
        loadLanguage(this.flag)
        NavigationUtil.goBack(this.props.navigation)
    }
    /**
     * 获取排序后的标签结果
     * @returns {Array}
     */
    getSortResult() {
        const { flag } = this.props.navigation.state.params
        let key = flag === FLAG_LANGUAGE.flag_key ? 'keys' : 'languages'
        //从原始数据中复制一份数据出来，以便对这份数据进行进行排序
        let sortResultArray = this.props.language[key].slice()
        //获取排序之前的排列顺序
        const originalCheckedArray = SortKeyPage._keys(this.props)
        //遍历排序之前的数据，用排序后的数据checkedArray进行替换
        for (let i = 0, j = originalCheckedArray.length; i < j; i++) {
            let item = originalCheckedArray[i]
            //找到要替换的元素所在位置
            let index = this.props.language[key].indexOf(item)
            //进行替换
            sortResultArray.splice(index, 1, this.state.checkedArray[i])
        }
        return sortResultArray
    }
    renderView() {
        return <SortableListView
            data={this.state.checkedArray}
            order={Object.keys(this.state.checkedArray)}
            onRowMoved={e => {
                this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                this.forceUpdate()
            }}
            renderRow={row => <SortCell data={row} {...this.params}/>}
        />
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        let title = this.flag === FLAG_LANGUAGE.flag_key ? '标签排序' : '语言排序'
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    title={title}
                    statusBar={statusBar}
                    style={{ backgroundColor: THEME_COLOR }}
                    leftButton={ViewUtil.getLeftBackButton(()=>{
                        this.goBack()
                    })}
                    rightButton={ViewUtil.getRightButton('保存',()=>{
                        this.onSave()
                    })}
                />
                <View style={{flex: 1}}>
                    {
                        this.renderView()
                    }
                </View>
            </View>
        )
    }
}
class SortCell extends Component {
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <MaterialCommunityIcons
                    name={'sort'}
                    size={16}
                    style={{marginRight: 10, color: THEME_COLOR}}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
const mapStateToProps = state => ({
    language: state.language
})
const mapDispatchToProps = dispatch => ({
    loadLanguage: (flagKey) => dispatch(actions.loadLanguage(flagKey)),
})
export default connect(mapStateToProps,mapDispatchToProps)(SortKeyPage)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    hidden: {
      height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
})
