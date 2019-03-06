import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Platform,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    DeviceInfo
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from "../common/NavigationBar"
import NavigationUtil from "../navigator/NavigationUtil"
import BackPressHandler from "../common/BackPressHandler"
import actions from "../action"
import ViewUtil from "../util/ViewUtil"
import FavoriteDao from "../expand/dao/FavoriteDao"
import {FLAG_LANGUAGE, FLAG_STORAGE, PAGE_SIZE} from "../constant"
import Toast from 'react-native-easy-toast'
import PopularItem from "../common/PopularItem"
import Utils from "../util/Utils"
import LanguageDao from "../expand/dao/LanguageDao";
import {loadLanguage} from "../action/language";
import EventBus from "react-native-event-bus";
import { FAVORITE_CHANGED_POPULAR } from "../emit";
class SearchPage extends Component<Props> {
    constructor(props){
        super(props)
        this.inputKey = ''
        this.params = this.props.navigation.state.params
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.isKeyChange = false
        this.backPress = new BackPressHandler({ backPress:() => this.goBack })
    }
    goBack() {
        if(this.isKeyChange) {
            this.props.loadLanguage(FLAG_LANGUAGE.flag_key)
        }
        NavigationUtil.goBack(this.props.navigation)
    }
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
        this.props.search.projectModes = []
    }
    loadData(loadMore) {
        const {onLoadMoreSearch, onSearch, search, keys} = this.props
        if (loadMore) {
            onLoadMoreSearch(++search.pageIndex, PAGE_SIZE, search.items, this.favoriteDao, callback => {
                this.refs.toast.show('已无更多数据')
            })
        } else {
            onSearch(this.inputKey, PAGE_SIZE, this.searchToken = new Date().getTime(), this.favoriteDao, keys, message => {
                this.refs.toast.show(message)
            })
        }
    }
    renderTitleView() {
        return (
            <TextInput
                ref="input"
                placeholder={this.props.search.inputKey || '请输入'}
                onChangeText={text => this.inputKey = text}
                style={styles.textInput}
                placeholderTextColor={'rgba(255,255,255,0.6)'}
            />)
    }
    onRightButtonClick() {
        const { onSearchCancel, search } = this.props
        if (search.showText === '搜索') {
            this.loadData()
        } else {
            onSearchCancel(this.searchToken)
        }

    }
    onFavorite(item,isFavorite) {
        Utils.onFavorite(this.favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)
        setTimeout(()=> EventBus.getInstance().fireEvent(FAVORITE_CHANGED_POPULAR),100)
    }
    renderRightButton() {
        const { search } = this.props
        return (<TouchableOpacity
                onPress={() => {
                    this.refs.input.blur() // 收起键盘
                    this.onRightButtonClick()
                }}
            >
                <View style={{ marginRight: 10 }}>
                    <Text style={styles.title}>{search.showText}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    renderItem(item) {
        return <PopularItem
            item={item}
            theme={this.props.theme}
            onSelect={(callback) => NavigationUtil.goPage('DetailPage',{
                navigation: this.props.navigation,
                projectMode: item,
                flag: FLAG_STORAGE.flag_popular,
                callback: callback
            })}
            onFavorite={(item,isFavorite)=> this.onFavorite(item,isFavorite)}
        />
    }
    genIndicator() {
        return this.props.search.hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }
    saveKey() {
        if(!this.inputKey) return
        if (Utils.checkKeyIsExist(this.props.keys,this.inputKey)) {
            this.refs.toast.show(this.inputKey + '已存在')
            return
        }
        let key = {
            "path": this.inputKey,
            "name": this.inputKey,
            "checked": true
        }
        this.props.keys.unshift(key) // 将key添加到数组的开头
        this.languageDao.save(this.props.keys)
        this.refs.toast.show(key.name + '保存成功')
        this.isKeyChange = true
    }
    render() {
        const { projectModes,isLoading } = this.props.search
        let statusBar = {
            backgroundColor: this.props.theme.themeColor,
            barStyle: 'light-content',
        }
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    titleView={this.renderTitleView()}
                    leftButton={ViewUtil.getLeftBackButton(()=> this.goBack())}
                    rightButton={this.renderRightButton()}
                    statusBar={statusBar}
                    style={{ backgroundColor: this.props.theme.themeColor }}
                />
                <FlatList
                    data={projectModes}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                    style={{
                        marginBottom : 45 + (DeviceInfo.isIPhoneX_deprecated ? 34 : 0)
                    }}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={ this.props.theme.themeColor }
                            colors={ [this.props.theme.themeColor] }
                            tintColor={ this.props.theme.themeColor }
                            refreshing={isLoading}
                            onRefresh={() => this.loadData(false)}
                        />
                    }
                    onEndReached={() => {
                        setTimeout(()=>{
                            if(this.canLoadMore){
                                this.loadData(true)
                                this.canLoadMore = false
                            }
                        })
                    }}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true
                    }}
                    ListFooterComponent={() => this.genIndicator()}
                />
                {
                    this.props.search.showBottomButton ? <TouchableOpacity
                        style={[styles.bottomButton, { backgroundColor: this.props.theme.themeColor }]}
                        onPress={() => {
                            this.saveKey();
                        }}
                    >
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.title}>朕收下了</Text>
                        </View>
                    </TouchableOpacity> : null
                }
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>

        );
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme,
    search: state.search,
    keys: state.language.keys
})
const mapDispatchToProps = dispatch => ({
    onSearch: (inputKey, pageSize, token, favoriteDao, popularKeys, callBack) => dispatch(actions.onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callBack)),
    onLoadMoreSearch: (pageIndex,pageSize,dataArray,favoriteDao,callBack) => dispatch(actions.onLoadMoreSearch(pageIndex,pageSize,dataArray,favoriteDao,callBack)),
    onSearchCancel: (searchToken) => dispatch(actions.onSearchCancel(searchToken)),
    loadLanguage: (flagKey) => dispatch(loadLanguage(flagKey))
})
export default connect(mapStateToProps,mapDispatchToProps)(SearchPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        // minWidth: 50, 修复android上tabBar首次渲染闪烁问题
        padding: 0
    },
    indicatorStyle: {
        height: 2,
        backgroundColor:'#fff'
    },
    labelStyle: {
        fontSize: 13,
        // marginVertical: 6,
        textAlign: 'center',
        margin: 0
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    textInput: {
        width: '100%',
        height: 26,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: "white",
        borderRadius: 6,
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        opacity: 0.7,
        color: 'white'
    },
    title: {
        fontSize: 14,
        color: "white",
        fontWeight: '500'
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: Dimensions.get('window').height - 45 - (DeviceInfo.isIPhoneX_deprecated ? 34 : 0),
        right: 10,
        borderRadius: 3
    },
});
