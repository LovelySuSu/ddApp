/**
*  全局导航跳转工具类
*
*/
export default class NavigationUtil {
    /**
     *  重置到首页
     */
    static resetToHomePage(params) {
        const { navigation } = params
        navigation.navigate('Main')
    }
    /**
     *  返回上一页
     */
    static goBack(navigation) {
        navigation.goBack()
    }
    /**
     *  跳转到指定页面
     */
    static goPage(page,params) {
        const navigation = NavigationUtil.navigation
        if (!navigation) {
            console.log('navigation cannot be null')
            return
        }
        navigation.navigate(page,{
            ...params
        })
    }
}
