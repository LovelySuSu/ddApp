import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    WebView
} from 'react-native';
import {BASE_URL, FLAG_STORAGE, THEME_COLOR} from "../constant";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BackPressHandler from "../common/BackPressHandler";
import FavoriteDao from "../expand/dao/FavoriteDao";
import Utils from "../util/Utils";

export default class DetailPage extends Component<Props> {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.backPress = new BackPressHandler({backPress:() => this.goBack})
        const { projectMode,flag } = this.params
        this.favoriteDao = new FavoriteDao(flag)
        let url = projectMode.html_url || BASE_URL + projectMode.fullName
        let title = projectMode.full_name || projectMode.fullName
        this.state = {
            title: title,
            url: url,
            canGoBack: false,
            isFavorite: projectMode.isFavorite
        }
    }
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    onFavoriteButtonClick(isFavorite) {
        const { projectMode,flag } = this.params
        projectMode.isFavorite = isFavorite
        Utils.onFavorite(this.favoriteDao,projectMode,projectMode.isFavorite,flag)
    }
    renderRightButton () {
        return (<View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={()=> {
                        let isFavorite = !this.state.isFavorite
                        this.setState({
                            isFavorite: isFavorite
                        },() => this.onFavoriteButtonClick(this.state.isFavorite))
                    }}>
                    <FontAwesome
                        name={this.state.isFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {})}
            </View>
        )
    }
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }
    goBack() {
        if(this.state.canGoBack) {
            this.webview.goBack()
        } else NavigationUtil.goBack(this.props.navigation)
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    statusBar={statusBar}
                    leftButton={ViewUtil.getLeftBackButton(()=> this.goBack())}
                    rightButton={this.renderRightButton()}
                    style={{ backgroundColor: THEME_COLOR }}
                    titleLayoutStyle={{ paddingHorizontal: 30 }}
                />
                <WebView
                    ref={(webview) => this.webview = webview}
                    startInLoadingState={true}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
