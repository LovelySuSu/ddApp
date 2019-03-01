import { onShowCustomThemeView, onThemeChange, onThemeInit } from "./theme"
import { onLoadPopularData,onLoadMorePopular,onFlushRefreshPopular } from "./popular"
import { onFlushRefreshTrending, onLoadMoreTrending, onTrendingRefresh } from "./trending"
import { onLoadFavoriteData } from './favorite'
import { loadLanguage } from "./language"
import { onLoadMoreSearch, onSearch, onSearchCancel } from "./search"

export default {
    onThemeChange,
    onThemeInit,
    onShowCustomThemeView,
    onLoadPopularData,
    onLoadMorePopular,
    onFlushRefreshPopular,
    onFlushRefreshTrending,
    onTrendingRefresh,
    onLoadMoreTrending,
    onLoadFavoriteData,
    loadLanguage,
    onSearch,
    onLoadMoreSearch,
    onSearchCancel
}
