import TYPES from "../../action/types";
import { THEME_COLOR } from "../../constant";

const defaultState = {
    theme: THEME_COLOR
}
export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case TYPES.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme
            }
            break
        default:
            return state
    }
}
