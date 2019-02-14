import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {BASE_URL, THEME_COLOR} from "../constant";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class DetailPage extends Component<Props> {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        const { projectMode } = this.params
        let url = projectMode.html_url || BASE_URL + projectMode.fullName
        let title = projectMode.full_name || projectMode.fullName
        this.state = {
            title: title,
            url: url,
            canGoBack: false
        }
    }
    renderRightButton(){
        return (<View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={()=>{}}>
                    <FontAwesome
                        name={'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {})}
            </View>
        )
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
                    leftButton={ViewUtil.getLeftBackButton(()=> {
                        NavigationUtil.goBack(this.props.navigation)
                    })}
                    rightButton={this.renderRightButton()}
                    style={{ backgroundColor: THEME_COLOR }}
                />
                <Text>Detail Page!</Text>
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
