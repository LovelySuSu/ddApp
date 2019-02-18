import TYPES from "../../action/types";

const defaultState = {}
/**
 * trending:{
 *     js:{
 *         items:[],
 *         isLoading:false
 *     },
 *     react:{
 *         items:[],
 *         isLoading:false
 *     }
 * }
 */
export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case TYPES.TRENDING_REFRESH:
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    pageIndex: action.pageIndex,
                    isLoading: true,
                }
            }
            break
        case TYPES.TRENDING_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    items: action.items,
                    pageIndex: action.pageIndex,
                    projectModes: action.projectModes,
                    isLoading: false
                }
            }
            break
        case TYPES.TRENDING_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: false,
                    hideLoadingMore: true,
                }
            }
            break
        case TYPES.TRENDING_LOAD_MORE_SUCCESS: {
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        }
        case TYPES.TRENDING_LOAD_MORE_FAIL: {
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            }
        }
        case TYPES.FLUSH_REFRESH_TRENDING: {
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName]
                }
            }
        }
        default:
            return state
    }
}

