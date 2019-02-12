import TYPES from "../../action/types";

const defaultState = {
    theme: 'blue'
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
