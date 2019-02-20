import Types from "../types"
import LanguageDao from "../../expand/dao/LanguageDao";

export function loadLanguage(flagKey) {
    return async dispatch =>  {
        try {
            let languages = await new LanguageDao(flagKey).fetch()
            dispatch({
                type: Types.LOAD_LANGUAGE_SUCCESS,
                flagKey: flagKey,
                languages: languages
            })
        } catch (e) {
            console.log(e)
        }
    }
}
