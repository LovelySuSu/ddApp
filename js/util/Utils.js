import { FLAG_STORAGE } from "../constant";

export default class Utils {
    /**
     * 检查该item是否被收藏
     * */
    static checkFavorite(item,keys=[]) {
        if(!keys) return false
        else {
            let key = item.id || item.fullName
            if (keys.includes(key.toString())) return true
            else return false
        }
    }
    /**
     * favoriteIcon单击回调函数
     * @param favoriteDao
     * @param item
     * @param isFavorite
     * @param flag
     */
    static onFavorite(favoriteDao, item, isFavorite, flag) {
        const key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString();
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(key);
        }
    }
    /**
     * 检查key是否存在于keys中
     * @param keys
     * @param key
     */
    static checkKeyIsExist(keys, key) {
        return keys.map(item => item.name.toLowerCase()).includes(key.toLowerCase())
    }
}
