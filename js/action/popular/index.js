import Types from "../types"
import DataStore from "../../expand/dao/DataStore"
import { FLAG_STORAGE } from "../../constant";
import {dealItems, handleData} from "../ActionUtil";
/**
 * 获取最热数据的异步action
 */
export function onLoadPopularData(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName
        })
        let dataStore = new DataStore()
        dataStore.fetchData(url,FLAG_STORAGE.flag_popular)
            .then(data => handleData(Types.POPULAR_LOAD_SUCCESS,dispatch,storeName,data,pageSize,favoriteDao))
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
/**
 * 加载更多
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @returns {function(*)}
 */
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray = [],favoriteDao,callBack) {
    return dispatch => {
        setTimeout(()=> { // 模拟网络请求
            if ((pageIndex-1) * pageSize >= dataArray.length) { // 已加载完全部数据
                if(typeof callBack === 'function') {
                    callBack('已无更多数据')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more data',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                // 本次可载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
                dealItems(dataArray.slice(0,max),favoriteDao,projectModes => {
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName: storeName,
                        pageIndex: pageIndex,
                        projectModes: projectModes
                    })
                })

            }
        },500)
    }
}

/**
 * 收藏页面数据更新刷新popular页面
 */
export function onFlushRefreshPopular(storeName,pageIndex,pageSize,dataArray = [],favoriteDao) {
    return dispatch => {
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        dealItems(dataArray.slice(0,max),favoriteDao,projectModes => {
            dispatch({
                type: Types.FLUSH_REFRESH_POPULAR,
                storeName: storeName,
                pageIndex: pageIndex,
                projectModes: projectModes
            })
        })
    }
}

