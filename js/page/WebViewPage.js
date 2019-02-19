import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    WebView
} from 'react-native';
import { THEME_COLOR } from "../constant"
import NavigationBar from "../common/NavigationBar"
import ViewUtil from "../util/ViewUtil"
import NavigationUtil from "../navigator/NavigationUtil"
import BackPressHandler from "../common/BackPressHandler"

export default class WebViewPage extends Component<Props> {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.backPress = new BackPressHandler({backPress:() => this.goBack})
        const { title,url } = this.params
        this.state = {
            title: title,
            url: url,
            canGoBack: false
        }
    }
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
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
    }
});
