import React, {Component} from 'react';
import AppNavigator from "./navigator/AppNavigator";
import { Provider } from "react-redux";
import store from './store/index'

export default class App extends Component<Props> {
  render() {
    return (
        /**
         * 将store传递给APP框架
         * */
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}

