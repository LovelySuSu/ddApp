import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    WebView
} from 'react-native';
import NavigationBar from "../common/NavigationBar"
import ViewUtil from "../util/ViewUtil"
import NavigationUtil from "../navigator/NavigationUtil"
import BackPressHandler from "../common/BackPressHandler"
import { connect } from "react-redux"

class WebViewPage extends Component<Props> {
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
            backgroundColor: this.props.theme.themeColor,
            barStyle: 'light-content'
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    statusBar={statusBar}
                    leftButton={ViewUtil.getLeftBackButton(()=> this.goBack())}
                    style={{ backgroundColor: this.props.theme.themeColor }}
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
const mapStateToProps = state => ({
    theme: state.theme.theme
})
export default connect(mapStateToProps)(WebViewPage)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
