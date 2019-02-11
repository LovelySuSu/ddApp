import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation'
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";

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
        screen: DetailPage
    }
})

export default createSwitchNavigator({
    Init: initNavigator,
    Main: mainNavigator
},{
    navigationOptions:{
        header: null
    }
})
