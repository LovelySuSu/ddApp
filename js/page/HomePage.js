import React, {Component} from 'react';
import DynamicNavigator from "../navigator/DynamicNavigator";
// react-native-vector-icons安装后要 react-native link react-native-vector-icons
export default class HomePage extends Component<Props> {
    render() {
        return <DynamicNavigator/>
    }
}
