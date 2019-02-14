import TimeSpan from "../modal/TimeSpan";

export const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
export const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
export const STATUS_BAR_HEIGHT = 20; // IOS中状态栏高度
export const POPULAR_URL = 'https://api.github.com/search/repositories?q=' // 热门页面请求链接
export const TRENDING_URL = 'https://github.com/trending'
export const BASE_URL = 'https://github.com/'
export const THEME_COLOR = '#2E2C38' // 主题颜色
export const PAGE_SIZE = 10 // 请求条数
export const FLAG_STORAGE = {
    flag_popular: 'popular', flag_trending: 'trending'
} // 数据请求判断是来自popular模块还是trending模块
export const TimeSpans = [new TimeSpan('今 天', 'daily'), new TimeSpan('本 周', 'weekly'), new TimeSpan('本 月', 'monthly')]
