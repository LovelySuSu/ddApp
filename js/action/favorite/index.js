
import Types from "../types";
import FavoriteDao from "../../expand/dao/FavoriteDao";
/**
 * 获取收藏模块数据的异步action
 */
export function onLoadFavoriteData(flag,isShowLoading) {
    return dispatch => {
        if(isShowLoading){
            dispatch({
                type: Types.FAVORITE_LOAD_DATA,
                storeName: flag
            })
        }
        new FavoriteDao(flag).getAllItems()
            .then(items => {
                items = items.map(item => {
                    item.isFavorite = true
                    return item
                })
                dispatch({
                    type: Types.FAVORITE_LOAD_SUCCESS,
                    projectModes: items,
                    storeName: flag
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: Types.FAVORITE_LOAD_FAIL,
                    error: error,
                    storeName: flag})
            })
    }
}
