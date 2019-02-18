import { onThemeChange } from "./theme"
import { onLoadPopularData,onLoadMorePopular,onFlushRefreshPopular } from "./popular"
import { onFlushRefreshTrending, onLoadMoreTrending, onTrendingRefresh } from "./trending"
import { onLoadFavoriteData } from './favorite'

export default {
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopular,
    onFlushRefreshPopular,
    onFlushRefreshTrending,
    onTrendingRefresh,
    onLoadMoreTrending,
    onLoadFavoriteData
}
