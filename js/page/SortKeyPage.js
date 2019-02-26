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



class SortKeyPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.flag = this.params.flag
        this.backPress = new BackPressHandler({ backPress:() => this.goBack })
        this.state = {
            checkedArray: SortKeyPage._keys(this.props)
        }
    }
    goBack() {
        NavigationUtil.goBack(this.props.navigation)
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
        if (prevState.keys !== checkedArray) {
            return {
                keys: checkedArray,
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
        // 更新本地数据
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
