import TYPES from "../../action/types"

const defaultState = {}

export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case TYPES.FAVORITE_LOAD_DATA:
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: true,
                }
            }
            break
        case TYPES.FAVORITE_LOAD_SUCCESS:
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    isLoading: false
                }
            }
            break
        case TYPES.FAVORITE_LOAD_FAIL:
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
            break
        default:
            return state
    }
}
