import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
} from 'react-native';
import actions from "../action";
import { connect } from "react-redux";
import NavigationBar from "../common/NavigationBar";
import { THEME_COLOR } from "../constant";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";


class MyPage extends Component<Props> {
    getRightButton() {
        return (
            <TouchableOpacity
                onPress={() => {}}
            >
                <View
                    style={{ padding: 5,marginRight: 8 }}
                >
                    <AntDesign
                        name={'search1'}
                        size={24}
                        color={'#fff'}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    getLeftButton(callBack) {
        return (
            <TouchableOpacity
                onPress={callBack}
            >
                <View
                    style={{ padding: 5,paddingLeft: 22 }}
                >
                    <Ionicons
                        name={'ios-arrow-back'}
                        size={26}
                        color={'#fff'}
                    />
                </View>
            </TouchableOpacity>
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
                    title={'我的'}
                    statusBar={statusBar}
                    style={{ backgroundColor: THEME_COLOR }}
                    leftButton={this.getLeftButton(()=>{})}
                    rightButton={this.getRightButton()}
                />
                <Text style={styles.welcome}>My Page</Text>
                <Button
                    title={'改变主题颜色'}
                    onPress={() => this.props.onThemeChange('orange')}
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
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyPage)
