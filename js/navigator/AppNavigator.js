import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation'
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import { connect } from 'react-redux'
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from "react-navigation-redux-helpers";
import FetchDemo from "../page/FetchDemo";
import AsyncStorageDemo from "../page/AsyncStorageDemo";
import DataStoreDemo from "../page/DataStoreDemo";
import WebViewPage from "../page/WebViewPage";
import AboutPage from "../page/about/AboutPage";
import AboutMePage from "../page/about/AboutMePage";

export const rootCom = 'Init'//设置根路由

const initNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null // 禁用navigation bar,全屏显示
        }
    }
})

const mainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null // 禁用navigation bar,全屏显示
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            header: null // 禁用navigation bar,全屏显示
        }
    },
    FetchDemo: {
        screen: FetchDemo,
        navigationOptions: {
            title: 'Fetch Demo'
        }
    },
    AsyncStorageDemo: {
        screen: AsyncStorageDemo,
        navigationOptions: {
            title: 'AsyncStorage Demo'
        }
    },
    DataStoreDemo: {
        screen: DataStoreDemo,
        navigationOptions: {
            title: 'DataStore Demo'
        }
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            header: null // 禁用navigation bar,全屏显示
        }
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            header: null
        }
    },
    AboutMePage: {
        screen: AboutMePage,
        navigationOptions: {
            header: null
        }
    }
})

export const RootNavigator =  createSwitchNavigator({
    Init: initNavigator,
    Main: mainNavigator
},{
    navigationOptions:{
        header: null
    }
})
/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
)

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,
})
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState)
