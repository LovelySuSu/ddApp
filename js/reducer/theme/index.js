import TYPES from "../../action/types";
import ThemeFactory, {ThemeFlags} from "../../res/style/ThemeFactory";

const defaultState = {
    theme: ThemeFactory.createTheme(ThemeFlags.Default),
    customThemeViewVisible: false
}
export default function onAction(state=defaultState,action) {
    switch (action.type) {
        case TYPES.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme
            }
            break
        case TYPES.SHOW_THEME_VIEW:
            return {
                ...state,
                customThemeViewVisible: action.customThemeViewVisible,
            }
        default:
            return state
    }
}
