import Types from "../types"
import DataStore from "../../expand/dao/DataStore"
/**
 * 获取最热数据的异步action
 */
export function onLoadPopularData(storeName, url) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName
        })
        let dataStore = new DataStore()
        dataStore.fetchData(url)
            .then(data => handleData(dispatch,storeName,data))
            .catch(error => {
                error && console.log(error)
                dispatch({
                    type: Types.POPULAR_LOAD_FAIL,
                    error: error,
                    storeName
                })
            })
    }
}

function handleData(dispatch,storeName,data) {
    dispatch({
        type: Types.POPULAR_LOAD_SUCCESS,
        items: data && data.data && data.data.items
    })
}
