import TYPES from "../../action/types"
import { FLAG_LANGUAGE } from "../../constant"

const defaultState = {
    languages: [],
    keys: []
}

export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case TYPES.LOAD_LANGUAGE_SUCCESS:
            if(FLAG_LANGUAGE.flag_language === action.flagKey) {
                return {
                    ...state,
                    languages: action.languages,
                }
            } else {
                return {
                    ...state,
                    keys: action.languages,
                }
            }
            break
        default:
            return state
    }
}
