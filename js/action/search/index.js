import Types from "../types"
import { dealItems, handleData } from "../ActionUtil";
import { API_URL, QUERY_STR } from "../../constant";
import ArrayUtil from "../../util/ArrayUtil";

const CANCEL_TOKEN = []
/**
 * 发起搜索
 * @param inputKey 搜索key
 * @param pageSize
 * @param token 与该搜索关联的唯一token
 * @param favoriteDao
 * @param popularKeys 最热模块下所有标签
 * @param callBack
 * @returns {function(*=)}
 */
export function onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callBack) {
    return dispatch => {
        dispatch({type: Types.SEARCH_REFRESH})
        fetch(genFetchUrl(inputKey)).then(response => { //如果任务取消，则不做任何处理
            return hasCancel(token) ? null : response.json()
        }).then(responseData => {
            if (hasCancel(token, true)) {
                console.log('user canceled')
                return
            }
            if (!responseData && !responseData.items && responseData.items.length == 0) {
                dispatch({type: Types.SEARCH_FAIL, message: `没找到关于${inputKey}的项目`})
                if (typeof callBack === 'function') {
                    callBack(`没找到关于${inputKey}的项目`)
                    return
                }
            }
            let items = responseData.items
            handleData(Types.SEARCH_REFRESH_SUCCESS, dispatch, "", {data: items}, pageSize, favoriteDao, {
                inputKey
            })
        }).catch(e => {
            console.log(e)
            dispatch({type: Types.SEARCH_FAIL, error: e})
        })
    }
}

function genFetchUrl(key) {
    return API_URL + key + QUERY_STR
}

/**
 * 取消异步任务
 */

export function onSearchCancel(token) {
    return dispatch => {
        CANCEL_TOKEN.push(token)
        dispatch({type: Types.SEARCH_CANCEL})
    }
}
/**
 * 检查指定token是否已经取消
 * @param token
 * @param isRemove
 * @returns {boolean}
 */
function hasCancel(token, isRemove) {
    if (CANCEL_TOKEN.includes(token)) {
        if(isRemove) {
            ArrayUtil.remove(CANCEL_TOKEN,token)
        }
        return true
    } else return false
}
/**
 * 加载更多
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @returns {function(*)}
 */
export function onLoadMoreSearch(pageIndex,pageSize,dataArray = [],favoriteDao,callBack) {
    return dispatch => {
        setTimeout(()=> { // 模拟网络请求
            if ((pageIndex-1) * pageSize >= dataArray.length) { // 已加载完全部数据
                if(typeof callBack === 'function') {
                    callBack('已无更多数据')
                }
                dispatch({
                    type: Types.SEARCH_LOAD_MORE_FAIL,
                    error: 'no more data',
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                // 本次可载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
                dealItems(dataArray.slice(0,max),favoriteDao,projectModes => {
                    dispatch({
                        type: Types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex: pageIndex,
                        projectModes: projectModes
                    })
                })

            }
        },500)
    }
}
