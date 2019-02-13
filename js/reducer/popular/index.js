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
                    ...[action.storeName],
                    isLoading: true
                }
            }
            break
        case TYPES.POPULAR_LOAD_SUCCESS:
            return {
                ...state,
                [action.storeName] : {
                    ...[action.storeName],
                    items: action.items,
                    isLoading: false
                }
            }
            break
        case TYPES.POPULAR_LOAD_FAIL:
            return {
                ...state,
                [action.storeName] : {
                    ...[action.storeName],
                    isLoading: false
                }
            }
            break
        default:
            return state
    }
}

