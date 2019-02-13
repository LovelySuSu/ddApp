import TYPES from "../../action/types";

const defaultState = {}
/**
 * popular:{
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
        case TYPES.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    pageIndex: action.pageIndex,
                    isLoading: true
                }
            }
            break
        case TYPES.POPULAR_LOAD_SUCCESS:
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
        case TYPES.POPULAR_LOAD_FAIL:
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
            break
        case TYPES.POPULAR_LOAD_MORE_SUCCESS: {
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
        case TYPES.POPULAR_LOAD_MORE_FAIL: {
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            }
        }
        default:
            return state
    }
}

